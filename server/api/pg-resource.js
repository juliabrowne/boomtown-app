const strs = require('stringstream');

function tagsQueryString(tags, itemid, result) {
  const length = tags.length;
  for (let i = 0; i < length; i++) {
    tags.shift();
    result += `($${tags.length + 1}, ${itemid})`;
    if (tags.length === 0) {
      result += '';
    } else {
      result += ',';
    }
  }
  return result;
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text:
          'INSERT INTO "public"."users" ("email", "fullname", "password") VALUES($1, $2, $3) RETURNING "id", "email", "fullname", "password";',
        values: [email, fullname, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        console.log('da user', user);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.';
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.';
          default:
            throw e;
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw 'User was not found.';
        return user.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        text: 'select * from users where users.id = $1',
        values: [id]
      };

      const user = await postgres.query(findUserQuery);
      return user.rows[0];
    },
    async getItems(idToOmit) {
      try {
        const items = await postgres.query({
          text: `select * from items where items.ownerid <> $1`,
          values: idToOmit ? [idToOmit] : []
        });
        return items.rows;
      } catch (error) {
        throw error;
      }
    },
    async getItemById(id) {
      try {
        const items = await postgres.query({
          text: `select * from items where items.id = $1`,
          values: [id]
        });
        return items.rows[0];
      } catch (error) {
        throw error;
      }
    },
    async getItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `select * from items where items.ownerid = $1;`,
          values: [id]
        });
        return items.rows;
      } catch (error) {
        throw error;
      }
    },
    async getBorrowedItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `select * from items where items.borrowerid = $1`,
          values: [id]
        });
        return items.rows;
      } catch (error) {
        throw error;
      }
    },
    async getTags() {
      try {
        const tags = await postgres.query('select * from tags');
        return tags.rows;
      } catch (error) {
        throw error;
      }
    },
    async getTagsForItem(id) {
      const tagsQuery = {
        text: `select itemtags.tag_id, tags.title, tags.id from itemtags INNER JOIN tags ON (itemtags.tag_id = tags.id) where item_id = $1;`, // @TODO: Advanced queries
        values: [id]
      };

      try {
        const tags = await postgres.query(tagsQuery);
        return tags.rows;
      } catch (error) {
        throw error;
      }
    },
    async saveNewItem({ item, user, tags }) {
      console.log('tags 1', tags);

      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            client.query('BEGIN', async err => {
              const { title, description } = item;
              const itemQuery = {
                text:
                  'INSERT INTO items(title, description, ownerid) VALUES($1, $2, $3) RETURNING *',
                values: [title, description, user.id]
              };

              const newItem = await client.query(itemQuery);
              console.log('tags 2', tags);

              const tagIds = tags.map(tag => parseInt(tag.id));

              const tagItemPair = tagsQueryString(
                tagIds,
                newItem.rows[0].id,
                ''
              );

              const tagRelationships = {
                text: `INSERT INTO itemtags (tag_id, item_id) VALUES ${tagItemPair}`,
                values: [...tags]
              };

              await client.query(tagRelationships);
              client.query('COMMIT', err => {
                if (err) {
                  throw err;
                }
                done();
                resolve(newItem.rows[0]);
              });
            });
          } catch (e) {
            client.query('ROLLBACK', err => {
              if (err) {
                throw err;
              }
              done();
            });
            switch (true) {
              case /uploads_itemid_key/.test(e.message):
                throw 'This item already has an image.';
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};

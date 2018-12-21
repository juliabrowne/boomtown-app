const { ApolloError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const authMutations = require('./auth');
const { UploadScalar, DateScalar } = require('../custom-types');

module.exports = app => {
  return {
    Query: {
      viewer(root, args, context) {
        if (context.token) {
          return jwt.decode(context.token, app.get('JWT_SECRET'));
        }
        return null;
      },
      //Get user by ID
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);
          return user;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      //Get Items that != User ID
      async items(parent, { filter }, { pgResource }) {
        try {
          const item = pgResource.getItems(filter);
          return item;
        } catch (error) {
          throw new ApolloError();
        }
      },
      async item(parent, { id }, { pgResource }) {
        const item = pgResource.getItemById(id);
        return item;
      },
      //Get Tags
      async tags(parent, { id }, { pgResource }) {
        try {
          return pgResource.getTags();
        } catch (error) {
          throw new ApolloError();
        }
      }
    },

    User: {
      //Get items owned by specififc user
      items(root, _, { pgResource }) {
        try {
          return pgResource.getItemsForUser(root.id);
        } catch (error) {
          new ApolloError();
        }
      },
      //Get items borrowed by user
      borrowed(root, _, { pgResource }) {
        try {
          return pgResource.getBorrowedItemsForUser(root.id);
        } catch (error) {
          new ApolloError();
        }
      }
    },

    Item: {
      //Get user that owns item
      async ownerid(root, _, { pgResource }) {
        try {
          return pgResource.getUserById(root.ownerid);
        } catch (error) {
          new ApolloError();
        }
      },
      //Get Tags for item
      async tags(root, _, { pgResource }) {
        try {
          return pgResource.getTagsForItem(root.id);
        } catch (error) {
          new ApolloError();
        }
      },
      //Get user that borrows item
      async borrower(root, _, { pgResource }) {
        try {
          return pgResource.getUserById(root.borrowerid);
        } catch (error) {
          new ApolloError();
        }
      }
    },

    Mutation: {
      ...authMutations(app),
      async addItem(parent, args, context, info) {
        const user = await jwt.decode(context.token, app.get('JWT_SECRET'));
        const newItem = await context.pgResource.saveNewItem({
          item: args.item,
          user: user,
          tags: args.item.tags
        });
        return newItem;
      }
    }
  };
};

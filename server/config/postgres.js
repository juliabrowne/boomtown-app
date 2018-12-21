const { Pool } = require('pg');

module.exports = app => {
  return new Pool({
    database: app.get('PG_DB'),
    host: app.get('PG_HOST'),
    user: app.get('PG_USER'),
    password: app.get('PG_PASSWORD'),
    idleTimeoutMillis: 1000,
    connectionTimeoutMillis: 1000
  });
};
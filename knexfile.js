// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

// require("./Migrations/migrations/20230113110618_vouchers")
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: "localhost",
      user: "root",
      password: "root",
      database: 'voucherdb'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: "./Migrations/migrations",
     
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

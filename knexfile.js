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
  }



};

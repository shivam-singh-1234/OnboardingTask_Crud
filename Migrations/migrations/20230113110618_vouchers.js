/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// exports.up = function(knex) {
  
// };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// exports.down = function(knex) {
  
// };

// const knex=require("knex");

exports.up = function(knex) {
    return knex.schema.createTable('vouchers', (table) => {
        table.increments('id');
        table.string('code', 255).notNullable();
        table.integer('discount').notNullable();
        table.string('logo');
        table.string('icon');
        table.date('expire_date');
        table.boolean('is_deleted').defaultTo(false);
        table.timestamps(true, true);
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable("vouchers");
};

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
    return knex.schema
    .createTable('users', (table) => {
            table.increments('id').primary();
            table.integer('phone',12).unique().notNullable();
            table.string('name').notNullable();
            table.string('password',255).notNullable();
            table.string('token',255); 
          })
          
    .createTable('vouchers', (table) => {
            table.increments('id');
            table.string('voucherName')
            table.string('code', 255).notNullable();
            table.integer('discount');
            table.string('logo');
            table.string('icon');
            table.date('expire_date');
            table.boolean('is_deleted').defaultTo(false);
            table.boolean('is_reedem').defaultTo(false);
            table.integer('reedemUser',11).unsigned();
            table.foreign('reedemUser').references('users.id');
            table.timestamps(true, true);
          })
          .then(()=>console.log("voucher table created"))
          .catch((err)=>{console.log(err);throw err})
    
    };
    
    exports.down = function(knex) {
        return knex.schema
            .dropTable("vouchers")
            .dropTable("users")
    };
    
    
 
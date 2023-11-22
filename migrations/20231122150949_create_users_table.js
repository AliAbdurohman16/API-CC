/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('photo', 255);
    table.string('fullname', 255);
    table.string('telephone', 15);
    table.string('email', 255).unique().notNullable();
    table.string('password', 255);
    table.timestamp('ktp_verified').nullable();
    table.enum('role', ['admin', 'user', 'recruiter']);
    table.enum('is_online', ['0', '1']).defaultTo('1');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
 return knex.schema.dropTable('users'); 
};

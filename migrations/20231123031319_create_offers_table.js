/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('offers', function(table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.integer('work_id').unsigned().notNullable();
    table.integer('address_id').unsigned().notNullable();
    table.string('tariff', 255);
    table.text('experience');
    table.enum('status', ['Pending', 'Diterima', 'Ditolak']);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.foreign('user_id').references('id').inTable('users');
    table.foreign('work_id').references('id').inTable('works');
    table.foreign('address_id').references('id').inTable('addresses');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

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
    table.enum('status', ['Pending', 'Diterima', 'Ditolak']).defaultTo('Pending');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.foreign('user_id', 'offers_user_id_foreign').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.foreign('work_id', 'offers_work_id_foreign').references('id').inTable('works').onDelete('CASCADE').onUpdate('CASCADE');
    table.foreign('address_id', 'offers_address_id_foreign').references('id').inTable('addresses').onDelete('CASCADE').onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('offers'); 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('chats', function(table) {
    table.increments('id').primary();
    table.integer('sender_id').unsigned().notNullable();
    table.integer('recipient_id').unsigned().notNullable();
    table.text('message');
    table.string('attachment', 255);
    table.enum('is_read', ['0', '1']).defaultTo('0');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.foreign('sender_id', 'chats_sender_id_foreign').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.foreign('recipient_id', 'chats_recipient_id_foreign').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('chats'); 
};

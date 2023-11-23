/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('ratings', function(table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.integer('work_id').unsigned().notNullable();
        table.text('comment');
        table.string('star', 5);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    
        table.foreign('user_id', 'ratings_user_id_foreign').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('work_id', 'ratings_work_id_foreign').references('id').inTable('works').onDelete('CASCADE').onUpdate('CASCADE');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('ratings'); 
  };
  
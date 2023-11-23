/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('works', function(table) {
    table.increments('id').primary();
    table.string('image', 255);
    table.string('title', 255);
    table.integer('category_id').unsigned().notNullable();
    table.string('telephone', 15);
    table.string('budget', 255);
    table.enum('type_of_work', ['Kerja Lepas', 'Part Time', 'Full Time', 'Kontrak']);
    table.date('start_date');
    table.text('description');
    table.string('latitude', 255);
    table.string('longitude', 255);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table
      .foreign('category_id', 'works_category_id_foreign')
      .references('id')
      .inTable('categories')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('works'); 
};

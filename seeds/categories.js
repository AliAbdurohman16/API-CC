/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    {title: 'Pertukangan', slug:'pertukangan'},
    {title: 'Cuci Baju', slug:'cuci-baju'},
    {title: 'Cuci Piring', slug:'cuci-piring'},
    {title: 'Setrika', slug:'setrika'},
    {title: 'Menyapu', slug:'menyapu'},
    {title: 'Mengepel', slug:'mengepel'},
    {title: 'Service Elektronik', slug:'service-elektronik'},
    {title: 'Tani Harian', slug:'tani-harian'},
    {title: 'Memasak', slug:'memasak'},
    {title: 'Baby Sitter', slug:'baby-sitter'}
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  // Hash passwords
  const hashedPasswords = await Promise.all([
    bcrypt.hash('admin123', 10),
    bcrypt.hash('recruiter123', 10),
    bcrypt.hash('user123', 10),
  ]);

  // Insert hashed passwords
  await knex('users').insert([
    {
      photo: 'default.jpg',
      fullname: 'Admin',
      telephone: '082323123',
      email: 'admin@gmail.com',
      password: hashedPasswords[0],
      role: 'admin'
    },
    {
      photo: 'default.jpg',
      fullname: 'Recruiter',
      telephone: '086328328',
      email: 'recruiter@gmail.com',
      password: hashedPasswords[1],
      role: 'recruiter'
    },
    {
      photo: 'default.jpg',
      fullname: 'User',
      telephone: '08343487834',
      email: 'user@gmail.com',
      password: hashedPasswords[2],
      role: 'user'
    }
  ]);
};

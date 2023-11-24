const pool = require('../../config/database');

const createUser = (userData) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO users SET ?', userData, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.insertId);
            }
        });
    });
};

const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE email = ?', email, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
};

module.exports = { createUser, findUserByEmail };
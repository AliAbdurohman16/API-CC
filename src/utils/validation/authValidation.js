const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
    fullname: Joi.string().required(),
    telephone: Joi.string().max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.string().valid(Joi.ref('password')).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
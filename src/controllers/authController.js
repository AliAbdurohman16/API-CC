const Bcrypt = require('bcrypt');
const Config = require('../../config/config');
const UserModel = require('../models/User');
const Validation = require('../utils/validation/authValidation');
const JWT = require('@hapi/jwt');

const registerUser = async (request, h) => {
    try {
        const validatedData = await Validation.registerSchema.validateAsync(request.payload);

        // Hash password before saving to the database
        const hashedPassword = await Bcrypt.hash(validatedData.password, 10);
        delete validatedData.confirm_password;
        validatedData.password = hashedPassword;
        validatedData.role = 'user';

        const userId = await UserModel.createUser(validatedData);

        // Create JWT token
        const token = JWT.token.generate({ userId, role: 'user' }, Config.jwtSecret);

        return h.response({
            code: 201,
            message: 'success',
            token: token,
        }).code(201);
    } catch (error) {
        return h.response({ message: error.message }).code(400);
    }
};

const loginUser = async (request, h) => {
    try {
        const validatedData = await Validation.loginSchema.validateAsync(request.payload);

        const user = await UserModel.findUserByEmail(validatedData.email);
        if (!user || user.role !== 'user') {
            throw new Error('Invalid email credentials');
        }
        
        const isPasswordValid = await Bcrypt.compare(validatedData.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password credentials');
        }

        const token = JWT.token.generate({ userId: user.id, role: user.role }, Config.jwtSecret);

        return h.response({
            code: 200,
            message: 'success',
            token: token,
        }).code(200);
    } catch (error) {
        return h.response({ message: error.message }).code(401);
    }
};

const registerRecruiter = async (request, h) => {
    try {
        const validatedData = await Validation.registerSchema.validateAsync(request.payload);

        // Hash password before saving to the database
        const hashedPassword = await Bcrypt.hash(validatedData.password, 10);
        delete validatedData.confirm_password;
        validatedData.password = hashedPassword;
        validatedData.role = 'recruiter';

        const recruiterId = await UserModel.createUser(validatedData);

        // Create JWT token
        const token = JWT.token.generate({ recruiterId, role: 'recruiter' }, Config.jwtSecret);

        return h.response({
            code: 201,
            message: 'success',
            token: token,
        }).code(201);
    } catch (error) {
        return h.response({ message: error.message }).code(400);
    }
};

const loginRecruiter = async (request, h) => {
    try {
        const validatedData = await Validation.loginSchema.validateAsync(request.payload);

        const recruiter = await UserModel.findUserByEmail(validatedData.email);
        if (!recruiter || recruiter.role !== 'recruiter') {
            throw new Error('Invalid email credentials');
        }

        const isPasswordValid = await Bcrypt.compare(validatedData.password, recruiter.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password credentials');
        }

        const token = JWT.token.generate({ recruiterId: recruiter.id, role: recruiter.role }, Config.jwtSecret);

        return h.response({
            code: 200,
            message: 'success',
            token: token,
        }).code(200);
    } catch (error) {
        return h.response({ message: error.message }).code(401);
    }
}

module.exports = { registerUser, loginUser, registerRecruiter, loginRecruiter };
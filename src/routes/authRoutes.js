const AuthController = require('../controllers/authController');

const routes = [
    {
        method: 'POST',
        path: '/register/user',
        handler: AuthController.registerUser,
    },
    {
        method: 'POST',
        path: '/login/user',
        handler: AuthController.loginUser,
    },
];

module.exports = routes;
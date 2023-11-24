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
    {
        method: 'POST',
        path: '/register/recruiter',
        handler: AuthController.registerRecruiter,
    },
    {
        method: 'POST',
        path: '/login/recruiter',
        handler: AuthController.loginRecruiter,
    }
];

module.exports = routes;
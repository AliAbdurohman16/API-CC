require('dotenv').config

const Hapi = require('@hapi/hapi');
const AuthRoutes = require('./routes/authRoutes');

const init = async () => {
    const server = Hapi.server({
        port: process.env.SERVER_PORT,
        host: process.env.SERVER_HOST,
    });

    server.route(AuthRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
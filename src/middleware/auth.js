const checkUserRole = async (request, h) => {
    try {
        const { role } = request.auth.credentials;

        if (role !== 'user' && role !== 'recruiter') {
            throw new Error('Unauthorized');
        }

        return h.continue();
    } catch (error) {
        return h.response({ message: error.message }).code(401);
    }
};

module.exports = checkUserRole;
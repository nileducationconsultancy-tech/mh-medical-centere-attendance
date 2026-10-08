const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mh_medical_centre_jwt_secret_token_secure_2026';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: '30d'
    });

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: isProduction, // HTTPS in production
        sameSite: isProduction ? 'none' : 'lax', // 'none' required for cross-domain cookies (Vercel <-> Render)
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    return token;
};

module.exports = generateToken;

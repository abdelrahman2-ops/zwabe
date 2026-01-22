// middlewares/auth.js
import { AppError } from '../utils/appError.js';
import { verifySignToken } from '../utils/jwt.js';
import { getOneById } from '../services/user.js';

export const protect = async (req, res, next) => {
    console.log('body', req.body)

    // 1- check if there is a token and get it
    let token;
    // Check for token in Authorization header or cookies
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token || typeof token !== 'string' || token.length < 10) {
        console.warn('Auth failed: No or invalid token');
        return next(new AppError('Please Login to get access', 401))
    }
    const decoded = await verifySignToken(token)
    const user = await getOneById(decoded.id)
    if (!user) {
        console.warn('Auth failed: User not found');
        return next(new AppError('the user belonging to this token does not exist', 401))
    }
    // Sanitize user object
    req.user = { _id: user._id, role: user.role, email: user.email, name: user.name };
    next()
}

export const restrictTo = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.some(role => role === req.user.role)) {
            console.warn('Auth failed: Insufficient permissions');
            return next(new AppError('you do not have permission to perform this action', 403))
        }
        next()
    }
}

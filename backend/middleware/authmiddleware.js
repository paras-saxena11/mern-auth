import jwt from 'jsonwebtoken'
import AsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = AsyncHandler(async(req, res, next) => {
    let token;
    token = req.cookies.jwtToken;
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.SECRET);

            req.usero = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not Authorized, invalid token')
        }
    }
    else{
        res.status(401);
        throw new Error('Not Authorized, no token');
    }
});

export {protect}
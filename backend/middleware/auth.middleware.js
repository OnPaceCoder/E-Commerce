import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

//User must be authenticated to access proteceted routes


const protect = async (req, res, next) => {
    let token;


    //React JWT from the 'jwt' cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized , token failed')
        }
    }
    else {
        res.status(401);
        throw new Error('Not authrorized , no token');
    }


}
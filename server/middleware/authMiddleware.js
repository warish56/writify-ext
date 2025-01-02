const { getUserWithEmail } = require("../db/user");
const { getTokenFromCookie } = require("../services/token");
const { verifyJwtToken } = require("../utils/jwt");

const silenceAuthMiddleware = async (req, res, next) => {
    try{
        const token = getTokenFromCookie(req); //req.headers['authorization']?.split(' ')[1]; 
        const userData = verifyJwtToken(token, false);
        let userDocument = null;
        if(userData){
            userDocument = await getUserWithEmail(userData.email);
        }
        req.user = userDocument || null;
        next();
    }catch(err){
        res.status(err.status ?? 500).json({
            error:{
                message: err?.message || 'Failed to authenticate'
            }
        })
    }
    
}


const authMiddleware = async (req, res, next) => {
    try{
        const token =  getTokenFromCookie(req); //req.headers['authorization']?.split(' ')[1];
        const userData = verifyJwtToken(token);
        const userDocument = await getUserWithEmail(userData.email);
        if(!userDocument){
            throw {message: 'Inavlaid token', status: '403'}
        }
        req.user = userDocument;
        next();
    }catch(err){
        res.status(err.status ?? 500).json({
            error:{
                message: err?.message || 'Failed to authenticate'
            }
        })
    }
    
}

module.exports = {
    authMiddleware,
    silenceAuthMiddleware
}
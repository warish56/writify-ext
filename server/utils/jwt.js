const jwt = require('jsonwebtoken');


const generateJwtToken = (userId, email) => {
  const token = jwt.sign({ userId, email}, process.env.JWT_SECRET, {
    expiresIn: '60d', // Token expiration time
  });
  return token;
}

const verifyJwtToken = (token, throwErrors = true) => {
    try{
        const data = jwt.verify(token, process.env.JWT_SECRET);
        return data;
    }catch(err){
      if(throwErrors){
        if (err.name === "TokenExpiredError") {
          throw {message: 'Invalid token', status:401}
        } else if (err.name === "JsonWebTokenError") {
          throw {message: 'Invalid token', status:401}
        } else {
          throw {message: 'Invalid token', status:500}
        }
      }
    }
}

module.exports = {
    generateJwtToken,
    verifyJwtToken
}
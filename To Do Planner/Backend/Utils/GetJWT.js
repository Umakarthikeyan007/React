const jwt = require('jsonwebtoken');

const SECRET_KEY = "!@#$%^&*(qwertyuio1234567890))(*&^%$#)"

const getToken=(username)=>{
    const token = jwt.sign({user:username},SECRET_KEY);
    return token;
}

const verifyToken=(token)=>{
    const flag=jwt.verify(token,SECRET_KEY);
    return flag;
}

module.exports={getToken,verifyToken};
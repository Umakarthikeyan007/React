const jwtServices = require('../Utils/GetJWT');

const auth =(req,res,next)=>{
try {
    console.log(req.cookies.authtoken);
    if(req.cookies.authtoken){
        if(jwtServices.verifyToken(req.cookies.authtoken)){
            next();
        }
        else{
            const err=new Error();
            err.statusCode=401;
            err.message="Unauthorized";
            next(err);
        }
    }
    else{
            const err=new Error();
            err.statusCode=401;
            err.message="Unauthorized";
            next(err);
    }
    
} catch (error) {
    const err=new Error();
            err.statusCode=500;
            err.message="Service Error";
            next(err);
}
}
module.exports=auth;
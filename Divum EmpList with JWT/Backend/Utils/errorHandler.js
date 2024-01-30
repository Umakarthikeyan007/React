const ErrorHandler = (error,req,res,next)=>{
    error.statusCode = error.statusCode || 500;
    error.message=error.message;
    res.status(error.statusCode).json(error.message);
}
module.exports=ErrorHandler;
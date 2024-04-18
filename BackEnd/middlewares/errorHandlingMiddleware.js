


const errorHandlingMiddleware=(err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    console.log(err)
    if (err.statusCode === 404) {
        res.status(err.statusCode).json({ errors: err.status, errorMessage: err.message })
    } else {
        console.log("inside middlware : ", err.statusCode,err.message,err.status);
        res.status(err.statusCode).json({
            
            status: err.status,
            message: err.message
        })
    } 
}
 
export default errorHandlingMiddleware;
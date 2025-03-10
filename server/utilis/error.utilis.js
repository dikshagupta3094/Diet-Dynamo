class AppError extends Error{
    constructor(message,errorcode){
        super(message)
        this.statusCode = statusCode;
  
        Error.captureStackTrace(this, this.constructor);
    }
    
}

export default AppError
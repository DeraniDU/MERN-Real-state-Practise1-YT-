export const errorHandler = (statusCode,message) => {
    const error = new Error();
    error.statusCodeq = statusCode;
    error.message = message;
    return error;
};

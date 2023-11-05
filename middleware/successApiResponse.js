
const sendSuccessApiResponse = (data,statusCode = 200,message = 'success' ) => {
    return {
        message,
        error : false,
        code : statusCode,
        data
    };
};

module.exports = { sendSuccessApiResponse};

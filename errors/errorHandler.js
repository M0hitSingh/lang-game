const errorHandler = (err, req, res, next) => {
    res.status(err.code || 500).json({
        status: err.code,
        error: err.data,
        message: err.message,
        stack: err.stack,
    });
};
module.exports = errorHandler;
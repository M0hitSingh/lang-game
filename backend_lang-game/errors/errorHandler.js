const errorHandler = (err, req, res, next) => {
    res.status(err.code || 500).json({
        status: err.status,
        error: err,
        message: err.data,
        stack: err.stack,
    });
};
module.exports = errorHandler;
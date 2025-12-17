import ErrorHandler from "../utils/errorHandler.js";

const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    // 🔹 Mongoose CastError (invalid MongoDB ID)
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // 🔹 Mongoose Validation Error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
            .map((value) => value.message)
            .join(", ");
        err = new ErrorHandler(message, 400);
    }

    // 🔹 Mongoose Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // 🔹 JWT Errors
    if (err.name === "JsonWebTokenError") {
        err = new ErrorHandler("Invalid token, please login again", 401);
    }

    if (err.name === "TokenExpiredError") {
        err = new ErrorHandler("Token expired, please login again", 401);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export default errorMiddleware;
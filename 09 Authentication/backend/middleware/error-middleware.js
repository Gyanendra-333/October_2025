

// Custom Error Class
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        // Maintain proper stack trace (optional but good practice)
        Error.captureStackTrace(this, this.constructor);
    }
}

// Global Error Middleware
export const errorMiddleware = (err, req, res, next) => {

    // Default values
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error (Backend)";

    console.log("🔥 Error Log:", err);

    // ==============================
    // ❌ Mongoose CastError
    // ==============================
    if (err.name === "CastError") {
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // ==============================
    // ❌ Mongoose Duplicate Key Error
    // ==============================
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // ==============================
    // ❌ Json Web Token Error
    // ==============================
    if (err.name === "JsonWebTokenError") {
        const message = "Invalid token, please login again";
        err = new ErrorHandler(message, 401);
    }

    // ==============================
    // ❌ JWT Expired Error
    // ==============================
    if (err.name === "TokenExpiredError") {
        const message = "Your token has expired, please login again";
        err = new ErrorHandler(message, 401);
    }

    // Final Response
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

// Export class for other files
export default ErrorHandler;

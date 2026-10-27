"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error("Error detectado", err.message);
    const statusCode = err.starusCode || 500;
    const message = err.message || "Error del servidor";
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
};
exports.errorHandler = errorHandler;

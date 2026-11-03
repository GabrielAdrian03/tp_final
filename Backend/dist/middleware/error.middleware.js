"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../utils/logger");
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Error del servidor";
    logger_1.Logger.error(`${req.method} ${req.originalUrl} - ${message}`, {
        method: req.method,
        endpoint: req.originalUrl,
        statusCode
    });
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
};
exports.errorHandler = errorHandler;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const logger_1 = require("../utils/logger");
const requestLogger = (req, res, next) => {
    // Registrar la hora de inicio de la solicitud
    const start = Date.now();
    // Registrar un evento cuando la respuesta se envía
    res.on("finish", () => {
        const duration = Date.now() - start;
        const { method, originalUrl } = req;
        const { statusCode } = res;
        const severity = statusCode >= 500 ? "ERROR" :
            statusCode >= 400 ? "WARN" :
                "INFO";
        const userId = req.admin?.userId;
        const message = `${method} ${originalUrl} - Estado ${statusCode} - ${duration}ms`;
        const options = {
            method,
            endpoint: originalUrl,
            statusCode,
            duration,
            userId
        };
        if (severity === "ERROR") {
            logger_1.Logger.error(message, options);
        }
        else if (severity === "WARN") {
            logger_1.Logger.warn(message, options);
        }
        else {
            logger_1.Logger.info(message, options);
        }
    });
    next();
};
exports.requestLogger = requestLogger;

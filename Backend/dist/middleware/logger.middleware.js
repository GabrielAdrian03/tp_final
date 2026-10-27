"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const requestLogger = (req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        const { method, originalUrl } = req;
        const { statusCode } = res;
        const statusIcon = statusCode >= 400 ? "⚠️" : "🟩";
        console.log(statusIcon, [method, originalUrl], "Estado", statusCode, "Tiempo", duration);
    });
    next();
};
exports.requestLogger = requestLogger;

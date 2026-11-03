
import { Request, Response, NextFunction } from "express";
import { Logger } from "../utils/logger";
import { AutenticateRequest } from "./auth.middleware";
// Middleware para registrar las solicitudes HTTP y sus respuestas
export const requestLogger = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Registrar la hora de inicio de la solicitud
    const start = Date.now();
    // Registrar un evento cuando la respuesta se envía
    res.on("finish", () => {
        const duration = Date.now() - start;
        const { method, originalUrl } = req;
        const { statusCode } = res;
        const severity =
            statusCode >= 500 ? "ERROR" :
            statusCode >= 400 ? "WARN" :
            "INFO";
        const userId = (req as AutenticateRequest).admin?.userId;
        const message = `${method} ${originalUrl} - Estado ${statusCode} - ${duration}ms`;
        const options = {
            method,
            endpoint: originalUrl,
            statusCode,
            duration,
            userId
        };
        if (severity === "ERROR") {
            Logger.error(message, options);
        } else if (severity === "WARN") {
            Logger.warn(message, options);
        } else {
            Logger.info(message, options);
        }
    });
    next();
};

import { Request, Response, NextFunction } from "express";
import { Logger } from "../utils/logger";
// Middleware para manejar errores en la aplicación
export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Determina el código de estado y el mensaje del error
    const statusCode = err.statusCode || 500;
    const message = err.message || "Error del servidor";
    // Log the error using the Logger utility
    Logger.error(`${req.method} ${req.originalUrl} - ${message}`, {
        method: req.method,
        endpoint: req.originalUrl,
        statusCode
    });
    // Envía la respuesta de error al cliente
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
};

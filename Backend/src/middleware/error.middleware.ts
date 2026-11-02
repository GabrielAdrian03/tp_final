import { Request, Response, NextFunction } from "express";
import { Logger } from "../utils/logger";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Error del servidor";

    Logger.error(`${req.method} ${req.originalUrl} - ${message}`, {
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

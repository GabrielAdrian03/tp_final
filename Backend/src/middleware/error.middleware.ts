import { Request, Response, NextFunction } from "express";
import { Logger } from "../utils/logger";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    Logger.error(`${req.method} ${req.originalUrl} - ${err.message}`)
    
    const statusCode = err.starusCode || 500;
    const message = err.message || "Error del servidor" 

    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
}
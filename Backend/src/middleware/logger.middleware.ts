import { Request, Response, NextFunction } from "express";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const start= Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        const { method, originalUrl } = req;
        const { statusCode } = res;

        const statusIcon = statusCode >= 400 ? "⚠️" : "🟩";

        console.log(statusIcon, [method, originalUrl], "Estado", statusCode, "Tiempo", duration);
        
    });
    next();
}
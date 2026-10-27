import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AutenticateRequest extends Request {
    admin?: {
        userId: number;
        email: string
    };
}

export const authenticateJWT = (req: AutenticateRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    const [scheme, token] = authHeader?.split(" ") ?? [];
    if (scheme?.toLowerCase() !== "bearer" || !token) {
        return res.status(401).json({ message: "No hay token, no puede entrar" })
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || process.env.SECRET_KEY || "token_de_autenticacion"
        ) as { userId: number, email: string };
        req.admin = decoded
        next();

    } catch (error) {
        return res.status(403).json({ message: "Token inválido o expirado." })
            
    }   
};

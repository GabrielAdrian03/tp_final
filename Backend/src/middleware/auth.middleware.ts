import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AutenticateRequest extends Request {
    admin?: {
        userId: number;
        email: string
    };
}
// Middleware para autenticar el token JWT
export const authenticateJWT = (req: AutenticateRequest, res: Response, next: NextFunction) => {
    // Obtener el token del encabezado de autorización
    const authHeader = req.headers.authorization;
    // Dividir el encabezado en esquema y token
    const [scheme, token] = authHeader?.split(" ") ?? [];
    if (scheme?.toLowerCase() !== "bearer" || !token) {
        return res.status(401).json({ message: "No hay token, no puede entrar" })
    }

    try {
        // Verificar y decodificar el token
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

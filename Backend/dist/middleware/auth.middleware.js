"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const [scheme, token] = authHeader?.split(" ") ?? [];
    if (scheme?.toLowerCase() !== "bearer" || !token) {
        return res.status(401).json({ message: "No hay token, no puede entrar" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || process.env.SECRET_KEY || "token_de_autenticacion");
        req.admin = decoded;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: "Token inválido o expirado." });
    }
};
exports.authenticateJWT = authenticateJWT;

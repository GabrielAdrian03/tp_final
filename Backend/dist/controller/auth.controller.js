"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../service/auth.service");
//inicialización del servicio
const authService = new auth_service_1.AuthService();
class AuthController {
    async register(req, res) {
        try {
            const { email, password } = req.body;
            //validacion
            if (!email || !password) {
                return res.status(400).json({ message: "Los campos son obligatorios" });
            }
            const savedUser = await authService.registerUser(email, password);
            //devuelve el usuario creado
            const { password: _, ...userResponse } = savedUser;
            return res.status(201).json({
                message: "Has sido registrado",
                user: userResponse
            });
        }
        catch (error) {
            //captura cualquier error que surja
            return res.status(400).json({ message: error.message || "Ha ocurrido un errror" });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Email y contraseñas obligatorio." });
            }
            //llamada al servicio del login
            const result = await authService.loginUser(email, password);
            return res.status(200).json({
                message: "Ingresado con exito",
                ...result
            });
        }
        catch (error) {
            return res.status(401).json({ message: error.message || "Error al iniciar sesion" });
        }
    }
}
exports.AuthController = AuthController;

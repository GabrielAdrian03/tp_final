import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";

//inicialización del servicio
const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;

            //validacion
            if (!email || !password) {
                return res.status(400).json({ message: "Los campos son obligatorios" })
            }

            const savedUser = await authService.registerUser(email, password);

            //devuelve el usuario creado
            const { password: _, ...userResponse } = savedUser;
            return res.status(201).json({
                message: "Has sido registrado",
                user: userResponse
            });
            
        } catch (error: any) {
            //captura cualquier error que surja
            return res.status(400).json({ message: error.message || "Ha ocurrido un errror" })
            
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Email y contraseñas obligatorio." })
            
            }

            //llamada al servicio del login
            const result = await authService.loginUser(email, password);

            return res.status(200).json({ 
                message: "Ingresado con exito",
                ...result
             });

        }catch (error: any) {
            return res.status(401).json({ message: error.message || "Error al iniciar sesion"});

        }
    }

}



import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";

export class AuthService {
    // Obtener repositorio de los usuarios
    private userRepository = AppDataSource.getRepository(User);

    async registerUser(email: string, password: string): Promise<User> {
        // Valida si existe el correo
        const mailExist = await this.userRepository.findOneBy({ email });
        if (mailExist) {
            throw new Error("El correo ya esta registrado en el sistema");
        }
        
        // Encriptar la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crear el usuario
        const newUser = this.userRepository.create({
            email,
            password: hashedPassword
        });
        
        // Guarda el usuario con la contraseña hasheada
        return await this.userRepository.save(newUser);
    }

    // 🛠️ CORREGIDO: Cambiado 'User' por 'user' en minúscula para cumplir con los estándares
    async loginUser(email: string, password: string): Promise<{ user: any, token: string }> {
        // Busca al usuario por su Email
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new Error("Selecciona un usuario válido");
        }

        // Hace match con la contraseña ingresada con la hasheada
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error("La contraseña no concuerda");
        }

        // 🛠️ CORREGIDO: Se cambió 'userFound' por 'user', que es el nombre real de tu constante arriba
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || process.env.SECRET_KEY || "token_de_autenticacion", // Alineado 100% con tu middleware
            { expiresIn: "24h" }
        );

        const { password: _, ...userResponse } = user;
        
        // 🛠️ CORREGIDO: Retornamos 'user' en minúscula para coincidir con la Promesa
        return { user: userResponse, token };
    }
}

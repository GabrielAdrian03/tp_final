"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = require("../config/data-source");
const user_entity_1 = require("../entities/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthService {
    constructor() {
        // Obtener repositorio de los usuarios
        this.userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    }
    async registerUser(email, password) {
        // Valida si existe el correo
        const mailExist = await this.userRepository.findOneBy({ email });
        if (mailExist) {
            throw new Error("El correo ya esta registrado en el sistema");
        }
        // Encriptar la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        // Crear el usuario
        const newUser = this.userRepository.create({
            email,
            password: hashedPassword
        });
        // Guarda el usuario con la contraseña hasheada
        return await this.userRepository.save(newUser);
    }
    // 🛠️ CORREGIDO: Cambiado 'User' por 'user' en minúscula para cumplir con los estándares
    async loginUser(email, password) {
        // Busca al usuario por su Email
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new Error("Selecciona un usuario válido");
        }
        // Hace match con la contraseña ingresada con la hasheada
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            throw new Error("La contraseña no concuerda");
        }
        // 🛠️ CORREGIDO: Se cambió 'userFound' por 'user', que es el nombre real de tu constante arriba
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || process.env.SECRET_KEY || "token_de_autenticacion", // Alineado 100% con tu middleware
        { expiresIn: "24h" });
        const { password: _, ...userResponse } = user;
        // 🛠️ CORREGIDO: Retornamos 'user' en minúscula para coincidir con la Promesa
        return { user: userResponse, token };
    }
}
exports.AuthService = AuthService;

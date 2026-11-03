"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const user_entity_1 = require("../entities/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function createAdmin() {
    try {
        console.log("🌱 Inicializando conexión para crear el Administrador...");
        await data_source_1.AppDataSource.initialize();
        console.log("¡Conectado a MySQL en XAMPP!");
        const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
        // Configura aquí las credenciales que desees utilizar
        const adminEmail = "admin@admin.com";
        const adminPassword = "admin1234";
        // Verificar si el correo ya está registrado para evitar duplicados
        const exists = await userRepository.findOneBy({ email: adminEmail });
        if (exists) {
            console.log(`seeder ya hecho.`);
        }
        else {
            //hashea la contraseña con bcrypt
            const hashedPassword = await bcrypt_1.default.hash(adminPassword, 10);
            const newAdmin = userRepository.create({
                nombre: "Administrador Principal",
                email: adminEmail,
                password: hashedPassword
            });
            await userRepository.save(newAdmin);
            console.log("🟩 ¡Usuario Administrador creado con éxito!");
            console.log(`🔑 Email: ${adminEmail}`);
            console.log(`🔒 Contraseña: ${adminPassword}`);
        }
    }
    catch (error) {
        console.error("Error al intentar crear el administrador:", error);
    }
    finally {
        // Cerramos la conexión limpiamente
        await data_source_1.AppDataSource.destroy();
        console.log("Conexión cerrada con la base de datos.");
        process.exit(0);
    }
}
createAdmin();

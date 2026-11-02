import { AppDataSource } from "../config/data-source";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";

async function createAdmin() {
    try {
        console.log("🌱 Inicializando conexión para crear el Administrador...");
        await AppDataSource.initialize();
        console.log("¡Conectado a MySQL en XAMPP!");

        const userRepository = AppDataSource.getRepository(User);
        
        // Configura aquí las credenciales que desees utilizar
        const adminEmail = "admin@admin.com";
        const adminPassword = "admin1234";

        // Verificar si el correo ya está registrado para evitar duplicados
        const exists = await userRepository.findOneBy({ email: adminEmail });
        
        if (exists) {
            console.log(`seeder ya hecho.`);
        } else {
            //hashea la contraseña con bcrypt
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            
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

    } catch (error) {
        console.error("Error al intentar crear el administrador:", error);
    } finally {
        // Cerramos la conexión limpiamente
        await AppDataSource.destroy();
        console.log("Conexión cerrada con la base de datos.");
        process.exit(0);
    }
}

createAdmin();

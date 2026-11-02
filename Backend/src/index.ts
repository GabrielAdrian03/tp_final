import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";

import { User } from "./entities/user.entity";
import { AppDataSource } from "./config/data-source";
import { requestLogger } from "./middleware/logger.middleware";
import { errorHandler } from "./middleware/error.middleware";

import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
import crudRoutes from "./routes/crud.routes";

const app = express();
const PORT = process.env.PORT || 8080;

// ==========================================
// 1. MIDDLEWARES GLOBALES (Siempre van PRIMERO)
// ==========================================

// Configuración de CORS estricta y segura para tu Frontend en Vite
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Permite a Express leer los cuerpos (body) de los POST/PUT en formato JSON
app.use(express.json());

// Logger de peticiones
app.use(requestLogger);

// ==========================================
// 2. RUTAS DEL SISTEMA (Van DESPUÉS de los middlewares)
// ==========================================
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api", crudRoutes);

// ==========================================
// 3. MANEJADOR DE ERRORES (Siempre va al FINAL de las rutas)
// ==========================================
app.use(errorHandler);

// ==========================================
// 4. CONEXIÓN A LA BASE DE DATOS Y ARRANQUE
// ==========================================
AppDataSource.initialize()
    .then(async () => {
        console.log("Conectado a la BD de forma exitosa.");
        const userRepository = AppDataSource.getRepository(User);
        const adminCount = await userRepository.count();

        if (adminCount === 0) {
            const hashedPassword = await bcrypt.hash("admin1234", 10);
            const defaultAdmin = userRepository.create({ 
                nombre: "Antonio",
                email: "admin@admin.com",
                password: hashedPassword
             });
             await userRepository.save(defaultAdmin);
             console.log("Se creó el usuario admin de prueba");
        }
        
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en: http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.error("Error al inicializar Data Source: ", error));

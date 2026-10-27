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
const PORT = process.env.PORT || 4000;

//cors para la seguridad
app.use(cors())
app.use(express.json())
app.use(requestLogger);

//ruta de autenticacion
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api", crudRoutes);
app.use(errorHandler)

//conexion a la BD
AppDataSource.initialize()
    .then(async () => {
        console.log("conectado a la BD. Puerto:", PORT)
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
             console.log("Se creó el usuario admin de prueba")
        }
        app.listen(PORT, () => {
            console.log(`Conectese en http://localhost:${PORT}`)
        });
    })
    .catch((error) => console.error("Error: ", error))


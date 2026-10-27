"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_entity_1 = require("./entities/user.entity");
const data_source_1 = require("./config/data-source");
const logger_middleware_1 = require("./middleware/logger.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const crud_routes_1 = __importDefault(require("./routes/crud.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
//cors para la seguridad
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(logger_middleware_1.requestLogger);
//ruta de autenticacion
app.use("/api/auth", auth_routes_1.default);
app.use("/api/books", book_routes_1.default);
app.use("/api", crud_routes_1.default);
app.use(error_middleware_1.errorHandler);
//conexion a la BD
data_source_1.AppDataSource.initialize()
    .then(async () => {
    console.log("conectado a la BD. Puerto:", PORT);
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const adminCount = await userRepository.count();
    if (adminCount === 0) {
        const hashedPassword = await bcrypt_1.default.hash("admin1234", 10);
        const defaultAdmin = userRepository.create({
            nombre: "Antonio",
            email: "admin@admin.com",
            password: hashedPassword
        });
        await userRepository.save(defaultAdmin);
        console.log("Se creó el usuario admin de prueba");
    }
    app.listen(PORT, () => {
        console.log(`Conectese en http://localhost:${PORT}`);
    });
})
    .catch((error) => console.error("Error: ", error));

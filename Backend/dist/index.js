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
const log_routes_1 = __importDefault(require("./routes/log.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
// Configuración de CORS estricta y segura para tu Frontend en Vite
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
// Permite a Express leer los cuerpos (body) de los POST/PUT en formato JSON
app.use(express_1.default.json());
// Logger de peticiones
app.use(logger_middleware_1.requestLogger);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/books", book_routes_1.default);
app.use("/api", crud_routes_1.default);
app.use("/api/logs", log_routes_1.default);
app.get("/api/test", (req, res) => {
    res.json({ message: "API funcionando correctamente." });
});
app.use(error_middleware_1.errorHandler);
data_source_1.AppDataSource.initialize()
    .then(async () => {
    console.log("Conectado a la BD de forma exitosa.");
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
        console.log(`Servidor corriendo en: http://localhost:${PORT}`);
    });
})
    .catch((error) => console.error("Error al inicializar Data Source: ", error));

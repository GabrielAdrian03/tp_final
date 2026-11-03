"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const user_entity_1 = require("../entities/user.entity");
const book_entity_1 = require("../entities/book.entity");
const author_entity_1 = require("../entities/author.entity");
const genere_entity_1 = require("../entities/genere.entity");
const shelf_entity_1 = require("../entities/shelf.entity");
const sage_entity_1 = require("../entities/sage.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function runSeeder() {
    try {
        console.log("🌱 Inicializando conexión para sembrar datos...");
        await data_source_1.AppDataSource.initialize();
        console.log("💾 ¡Conectado a MySQL en XAMPP!");
        // 1. 👑 SEED ADMINISTRADOR
        const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
        const adminCount = await userRepository.count();
        if (adminCount === 0) {
            const hashedPassword = await bcrypt_1.default.hash("admin1234", 10);
            await userRepository.save(userRepository.create({
                nombre: "Administrador Principal",
                email: "admin@admin.com",
                password: hashedPassword
            }));
            console.log("👑 Usuario administrador creado (admin@admin.com / admin1234).");
        }
        // 2. 📚 SEED DE CATÁLOGO Y LIBROS
        const bookRepository = data_source_1.AppDataSource.getRepository(book_entity_1.Book);
        const bookCount = await bookRepository.count();
        if (bookCount === 0) {
            const authorRepo = data_source_1.AppDataSource.getRepository(author_entity_1.Author);
            const genereRepo = data_source_1.AppDataSource.getRepository(genere_entity_1.Genere);
            const shelfRepo = data_source_1.AppDataSource.getRepository(shelf_entity_1.Shelf);
            const sageRepo = data_source_1.AppDataSource.getRepository(sage_entity_1.Sage);
            // Crear Autores
            const tolkien = await authorRepo.save(authorRepo.create({ name: "J.R.R. Tolkien" }));
            const rowling = await authorRepo.save(authorRepo.create({ name: "J.K. Rowling" }));
            const king = await authorRepo.save(authorRepo.create({ name: "Stephen King" }));
            // Crear Géneros
            const fantasia = await genereRepo.save(genereRepo.create({ name: "Fantasía" }));
            const terror = await genereRepo.save(genereRepo.create({ name: "Terror" }));
            // Crear Estantes
            const estanteA = await shelfRepo.save(shelfRepo.create({ name: "Estante A-1" }));
            const estanteB = await shelfRepo.save(shelfRepo.create({ name: "Estante B-3" }));
            // Crear Sages
            const esdaSaga = await sageRepo.save(sageRepo.create({ name: "El Señor de los Anillos" }));
            const hpSaga = await sageRepo.save(sageRepo.create({ name: "Harry Potter" }));
            // Crear Libros
            const librosDePrueba = bookRepository.create([
                { title: "La Comunidad del Anillo", yearPublication: 1954, author: tolkien, genere: fantasia, shelf: estanteA, sage: esdaSaga },
                { title: "Las Dos Torres", yearPublication: 1954, author: tolkien, genere: fantasia, shelf: estanteA, sage: esdaSaga },
                { title: "El Resplandor", yearPublication: 1977, author: king, genere: terror, shelf: estanteB, sage: null }
            ]);
            await bookRepository.save(librosDePrueba);
            console.log("🟩 ¡Catálogo de ejemplo inyectado con éxito!");
        }
        else {
            console.log("⚠️ El catálogo ya tiene libros. No se ejecutaron los cambios para evitar duplicados.");
        }
    }
    catch (error) {
        console.error("❌ Error durante el proceso de seeding:", error);
    }
    finally {
        // Cerramos la conexión para que el comando termine limpiamente en la consola
        await data_source_1.AppDataSource.destroy();
        console.log("🔌 Conexión cerrada. Proceso terminado.");
        process.exit(0);
    }
}
// Ejecutamos la función
runSeeder();

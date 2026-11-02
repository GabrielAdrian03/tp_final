import { AppDataSource } from "../config/data-source";
import { User } from "../entities/user.entity";
import { Book } from "../entities/book.entity";
import { Author } from "../entities/author.entity";
import { Genere } from "../entities/genere.entity";
import { Shelf } from "../entities/shelf.entity";
import { Sage } from "../entities/sage.entity";
import bcrypt from "bcrypt";

async function runSeeder() {
    try {
        console.log("🌱 Inicializando conexión para sembrar datos...");
        await AppDataSource.initialize();
        console.log("💾 ¡Conectado a MySQL en XAMPP!");

        // 1. 👑 SEED ADMINISTRADOR
        const userRepository = AppDataSource.getRepository(User);
        const adminCount = await userRepository.count();

        if (adminCount === 0) {
            const hashedPassword = await bcrypt.hash("admin1234", 10);
            await userRepository.save(
                userRepository.create({
                    nombre: "Administrador Principal",
                    email: "admin@admin.com",
                    password: hashedPassword
                })
            );
            console.log("👑 Usuario administrador creado (admin@admin.com / admin1234).");
        }

        // 2. 📚 SEED DE CATÁLOGO Y LIBROS
        const bookRepository = AppDataSource.getRepository(Book);
        const bookCount = await bookRepository.count();

        if (bookCount === 0) {
            const authorRepo = AppDataSource.getRepository(Author);
            const genereRepo = AppDataSource.getRepository(Genere);
            const shelfRepo = AppDataSource.getRepository(Shelf);
            const sageRepo = AppDataSource.getRepository(Sage);

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
        } else {
            console.log("⚠️ El catálogo ya tiene libros. No se ejecutaron los cambios para evitar duplicados.");
        }

    } catch (error) {
        console.error("❌ Error durante el proceso de seeding:", error);
    } finally {
        // Cerramos la conexión para que el comando termine limpiamente en la consola
        await AppDataSource.destroy();
        console.log("🔌 Conexión cerrada. Proceso terminado.");
        process.exit(0);
    }
}

// Ejecutamos la función
runSeeder();

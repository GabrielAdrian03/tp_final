"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_service_1 = require("../service/book.service");
//inicializa lo de book.service
const bookService = new book_service_1.BookService();
class BookController {
    //Crud recibir crear un libro
    async create(req, res) {
        try {
            const newBook = await bookService.createBook(req.body);
            return res.status(201).json({ message: "Libro registrado", book: newBook });
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    //cRud leer 1 libro
    async getOne(req, res) {
        try {
            const bookId = Number(req.params.id);
            if (isNaN(bookId)) {
                return res.status(400).json({ message: "el id debe ser un numero valido" });
            }
            const book = await bookService.getBookById(bookId);
            return res.status(200).json(book);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    //crUd actualizar el libro
    async update(req, res) {
        try {
            const bookId = Number(req.params.id);
            if (isNaN(bookId)) {
                return res.status(400).json({ message: "el id debe ser un numero valido" });
            }
            const updateBook = await bookService.updateBook(bookId, req.body);
            return res.status(200).json({ message: "Actualizaste el libro ", book: updateBook });
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    //cruD borrar un libro
    async delete(req, res) {
        try {
            const bookId = Number(req.params.id);
            if (isNaN(bookId)) {
                return res.status(400).json({ message: "El ID provisto debe ser un número válido." });
            }
            await bookService.deleteBook(bookId);
            return res.status(200).json({ message: "Libro borrado" });
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
exports.BookController = BookController;

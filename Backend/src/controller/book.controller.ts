import { Request, Response } from "express";
import { BookService } from "../service/book.service"

//inicializa lo de book.service
const bookService = new BookService();

export class BookController {
    async getAll(req: Request, res: Response): Promise<Response> {
        const parseFilter = (value: unknown): number | undefined | null => {
            if (value === undefined || value === "") return undefined;
            if (typeof value !== "string") return null;

            const parsedValue = Number(value);
            return Number.isInteger(parsedValue) ? parsedValue : null;
        };

        const genreId = parseFilter(req.query.genreId);
        const authorId = parseFilter(req.query.authorId);
        const year = parseFilter(req.query.year);

        if (genreId === null || authorId === null || year === null) {
            return res.status(400).json({ message: "Los filtros deben ser números enteros válidos." });
        }

        const books = await bookService.getFilteredBooks(genreId, authorId, year);
        return res.status(200).json(books);
    }

    //Crud crear 1 libro
    async create(req: Request, res: Response): Promise<Response> {
        try {const newBook = await bookService.createBook(req.body);
            return res.status(201).json({ message: "Libro registrado", book: newBook });
            
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    //cRud leer 1 libro
    async getOne(req: Request, res: Response): Promise<Response> {
        try {

            const bookId = Number(req.params.id);
            if (isNaN(bookId)){ 
            return res.status(400).json({ message: "el id debe ser un numero valido" });
            }
            const book = await bookService.getBookById(bookId);
            return res.status(200).json(book);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    //crUd actualizar el libro
    async update(req: Request, res: Response): Promise<Response> {
        try {
            const bookId = Number(req.params.id);
            if (isNaN(bookId)){ 
            return res.status(400).json({ message: "el id debe ser un numero valido" });
            }
            const updateBook = await bookService.updateBook(bookId, req.body);
            return res.status(200).json({ message: "Actualizaste el libro ", book: updateBook });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    //cruD borrar un libro
    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const bookId = Number(req.params.id);
        if (isNaN(bookId)) {
            return res.status(400).json({ message: "El ID provisto debe ser un número válido." });
        }
        await bookService.deleteBook(bookId);
        return res.status(200).json({ message: "Libro borrado" });
        } catch (error: any) {
             return res.status(400).json({ message: error.message });
        }
    }
}   
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const data_source_1 = require("../config/data-source");
const book_entity_1 = require("../entities/book.entity");
const author_entity_1 = require("../entities/author.entity");
const genere_entity_1 = require("../entities/genere.entity");
const sage_entity_1 = require("../entities/sage.entity");
const shelf_entity_1 = require("../entities/shelf.entity");
class BookService {
    constructor() {
        this.bookRepository = data_source_1.AppDataSource.getRepository(book_entity_1.Book);
        this.authorRepository = data_source_1.AppDataSource.getRepository(author_entity_1.Author);
        this.genereRepository = data_source_1.AppDataSource.getRepository(genere_entity_1.Genere);
        this.shelfRepository = data_source_1.AppDataSource.getRepository(shelf_entity_1.Shelf);
        this.sageRepository = data_source_1.AppDataSource.getRepository(sage_entity_1.Sage);
    }
    //Crud registrar un nuevo libro
    async createBook(bookData) {
        const relationId = (relation, id) => typeof relation === "number" ? relation : relation?.id ?? id;
        const authorId = relationId(bookData.author, bookData.authorId);
        const genereId = relationId(bookData.genere, bookData.genereId);
        const shelfId = relationId(bookData.shelf, bookData.shelfId);
        const sageId = relationId(bookData.sage, bookData.sageId ?? bookData.sagaId);
        if (!bookData.title?.trim() || !Number.isInteger(bookData.yearPublication)) {
            throw new Error("El título y el año de publicación son obligatorios.");
        }
        if (!authorId || !genereId || !shelfId) {
            throw new Error("Debes indicar authorId, genereId y shelfId.");
        }
        const [author, genere, shelf, sage] = await Promise.all([
            this.authorRepository.findOneBy({ id: authorId }),
            this.genereRepository.findOneBy({ id: genereId }),
            this.shelfRepository.findOneBy({ id: shelfId }),
            sageId ? this.sageRepository.findOneBy({ id: sageId }) : Promise.resolve(null),
        ]);
        if (!author || !genere || !shelf || (sageId && !sage)) {
            throw new Error("El autor, género, estante o saga indicado no existe.");
        }
        const newBook = this.bookRepository.create({
            title: bookData.title.trim(),
            yearPublication: bookData.yearPublication,
            author,
            genere,
            shelf,
            sage,
        });
        return await this.bookRepository.save(newBook);
    }
    //cRud obtener todos los libros con caracteristicas
    async getFilteredBooks(generId, authorId, year) {
        const query = this.bookRepository.createQueryBuilder("book")
            .leftJoinAndSelect("book.author", "author")
            .leftJoinAndSelect("book.genere", "genere")
            .leftJoinAndSelect("book.shelf", "shelf")
            .leftJoinAndSelect("book.sage", "sage");
        if (generId) {
            query.andWhere("genere.id = :generId", { generId });
        }
        if (authorId) {
            query.andWhere("author.id = :authorId", { authorId });
        }
        if (year) {
            query.andWhere("book.yearPublication = :year", { year });
        }
        return await query.getMany();
    }
    //cRud obtener libro por id
    async getBookById(id) {
        const book = await this.bookRepository.findOneBy({ id });
        if (!book)
            throw new Error("Libro no encontrado");
        return book;
    }
    //crUd actualizar el libro
    async updateBook(id, bookData) {
        const book = await this.getBookById(id);
        const updateBook = this.bookRepository.merge(book, bookData);
        return await this.bookRepository.save(updateBook);
    }
    //cruD borrar libro
    async deleteBook(id) {
        const book = await this.getBookById(id);
        await this.bookRepository.remove(book);
    }
}
exports.BookService = BookService;

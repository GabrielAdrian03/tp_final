import { AppDataSource } from "../config/data-source";
import { Book } from "../entities/book.entity";
import { Author } from "../entities/author.entity";
import { Genere } from "../entities/genere.entity";
import { Sage } from "../entities/sage.entity";
import { Shelf } from "../entities/shelf.entity";

type RelationInput = number | { id: number } | null | undefined;

interface BookCreateInput {
    title: string;
    yearPublication: number;
    author?: RelationInput;
    authorId?: number;
    genere?: RelationInput;
    genereId?: number;
    shelf?: RelationInput;
    shelfId?: number;
    sage?: RelationInput;
    sagaId?: number;
    sageId?: number;
}

export class BookService {
    private bookRepository = AppDataSource.getRepository(Book);
    private authorRepository = AppDataSource.getRepository(Author);
    private genereRepository = AppDataSource.getRepository(Genere);
    private shelfRepository = AppDataSource.getRepository(Shelf);
    private sageRepository = AppDataSource.getRepository(Sage);

    //Crud registrar un nuevo libro
    async createBook(bookData: BookCreateInput): Promise<Book> {
        const relationId = (relation: RelationInput, id?: number): number | undefined =>
            typeof relation === "number" ? relation : relation?.id ?? id;
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
    async getFilteredBooks(generId?: number, authorId?: number, year?: number): Promise<Book[]> {
        const query = this.bookRepository.createQueryBuilder("book")
        .leftJoinAndSelect("book.author", "author")
        .leftJoinAndSelect("book.genere", "genere")
        .leftJoinAndSelect("book.shelf", "shelf")
        .leftJoinAndSelect("book.sage", "sage")
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
    async getBookById(id: number): Promise<Book> {
        const book = await this.bookRepository.findOneBy({ id });
        if (!book) throw new Error("Libro no encontrado");
        return book
    }

    //crUd actualizar el libro
    async updateBook(id: number, bookData: Partial<Book>): Promise<Book> {
        const book =await this.getBookById(id);
        const updateBook = this.bookRepository.merge(book, bookData);
        return await this.bookRepository.save(updateBook);
    }

    //cruD borrar libro
    async deleteBook(id: number): Promise<void> {
        const book = await this.getBookById(id);
        await this.bookRepository.remove(book);
    }
}
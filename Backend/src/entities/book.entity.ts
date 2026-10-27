import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Author } from "./author.entity";
import { Genere } from "./genere.entity";
import { Sage } from "./sage.entity"
import { Shelf } from "./shelf.entity"

@Entity({ name: "books" })
export class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    yearPublication!: number;

    //relaciones al autor
    @ManyToOne(() => Author, (author) => author.books, { eager: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "authorId" })
    author!: Author;

    //relaciones a los generos
    @ManyToOne(() => Genere, (genere) => genere.books, { eager: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "genereId" })
    genere!: Genere;

    //relaciones con los estantes
    @ManyToOne(() => Shelf, (shelf) => shelf.books, { eager: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "shelfId" })
    shelf!: Shelf;

    //relaciones con las sagas
    @ManyToOne(() => Sage, (sage) => sage.books, { eager: true, nullable: true, onDelete: "SET NULL" })
    @JoinColumn({ name: "sagaId" })
    sage!: Sage | null;
}
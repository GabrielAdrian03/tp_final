import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Book } from "./book.entity";

@Entity({ name: "shelfs" })
export class Shelf {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @OneToMany(() => Book, (book) => book.shelf)
    books!: Book[];

}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
import { Book } from "./book.entity"

@Entity({ name: "authors" })
export class Author {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @CreateDateColumn()
    createAt!: Date;

    @OneToMany(() => Book, (book) => book.author )
    books!: Book[];
}
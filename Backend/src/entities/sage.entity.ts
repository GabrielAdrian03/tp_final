import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Book } from "./book.entity";

@Entity({ name: "sages" })
export class Sage {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Book, (book) => book.sage)
    books!: Book[];
}
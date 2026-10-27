import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"; 

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: String;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @CreateDateColumn()
    createAt!: Date;
}
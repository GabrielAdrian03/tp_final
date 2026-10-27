import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Author } from "../entities/author.entity";
import { Book } from "../entities/book.entity";
import { Genere } from "../entities/genere.entity";
import { Sage } from "../entities/sage.entity";
import { Shelf } from "../entities/shelf.entity";
import { User } from "../entities/user.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || process.env.DB_USERNAME || "root",
  password: process.env.DB_PASS || process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || process.env.DB_DATABASE || "biblioteca",
  synchronize: true,
  logging: false,
  entities: [User, Book, Author, Genere, Sage, Shelf],
});
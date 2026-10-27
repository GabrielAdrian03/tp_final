"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const author_entity_1 = require("../entities/author.entity");
const book_entity_1 = require("../entities/book.entity");
const genere_entity_1 = require("../entities/genere.entity");
const sage_entity_1 = require("../entities/sage.entity");
const shelf_entity_1 = require("../entities/shelf.entity");
const user_entity_1 = require("../entities/user.entity");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || process.env.DB_USERNAME || "root",
    password: process.env.DB_PASS || process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || process.env.DB_DATABASE || "biblioteca",
    synchronize: true,
    logging: false,
    entities: [user_entity_1.User, book_entity_1.Book, author_entity_1.Author, genere_entity_1.Genere, sage_entity_1.Sage, shelf_entity_1.Shelf],
});

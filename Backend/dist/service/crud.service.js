"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudService = void 0;
const data_source_1 = require("../config/data-source");
const author_entity_1 = require("../entities/author.entity");
const genere_entity_1 = require("../entities/genere.entity");
const sage_entity_1 = require("../entities/sage.entity");
const shelf_entity_1 = require("../entities/shelf.entity");
//clase genérica para el crud de todas las entidades
class CrudService {
    //obtener todos los registros de las entidades cRud
    async getAll(entity) {
        return await data_source_1.AppDataSource.getRepository(entity).find();
    }
    //funcion generica para crear (Crud)
    async create(entity, name) {
        const repository = data_source_1.AppDataSource.getRepository(entity);
        const exist = await repository.findOne({ where: { name } });
        if (exist)
            throw new Error("Ese nombre ya existe");
        const newItem = repository.create({ name });
        return await repository.save(newItem);
    }
    //actualizar cualquier registro crUd
    async update(entity, id, name) {
        const repository = data_source_1.AppDataSource.getRepository(entity);
        //buscar
        const item = await repository.findOne({ where: { id } });
        if (!item)
            throw new Error("No encontrado");
        // validar que al actualizar no sea el mismo que uno que ya existe
        const duplicate = await repository.findOne({ where: { id } });
        if (duplicate && duplicate.id !== id) {
            throw new Error("Ese nombre ya existe!");
        }
        //actualizar
        const update = repository.merge(item, { name });
        return await repository.save(update);
    }
    //funcion para eliminar cualquier registro
    async delete(entity, id) {
        const repository = data_source_1.AppDataSource.getRepository(entity);
        const exist = await repository.findOne({ where: { id } });
        if (!exist)
            throw new Error("No se encontró el registro");
        await repository.remove(exist);
    }
    //expositores
    // Autores
    async getAuthors() { return this.getAll(author_entity_1.Author); }
    async createAuthor(name) { return this.create(author_entity_1.Author, name); }
    async updateAuthor(id, name) { return this.update(author_entity_1.Author, id, name); }
    async deleteAuthor(id) { return this.delete(author_entity_1.Author, id); }
    // Géneros
    async getGeneres() { return this.getAll(genere_entity_1.Genere); }
    async createGenere(name) { return this.create(genere_entity_1.Genere, name); }
    async updateGenere(id, name) { return this.update(genere_entity_1.Genere, id, name); }
    async deleteGenere(id) { return this.delete(genere_entity_1.Genere, id); }
    // Sagas
    async getSages() { return this.getAll(sage_entity_1.Sage); }
    async createSage(name) { return this.create(sage_entity_1.Sage, name); }
    async updateSage(id, name) { return this.update(sage_entity_1.Sage, id, name); }
    async deleteSage(id) { return this.delete(sage_entity_1.Sage, id); }
    // Estantes
    async getShelves() { return this.getAll(shelf_entity_1.Shelf); }
    async createShelf(name) { return this.create(shelf_entity_1.Shelf, name); }
    async updateShelf(id, name) { return this.update(shelf_entity_1.Shelf, id, name); }
    async deleteShelf(id) { return this.delete(shelf_entity_1.Shelf, id); }
}
exports.CrudService = CrudService;

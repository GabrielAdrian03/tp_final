import { error } from "node:console";
import { AppDataSource } from "../config/data-source";
import { Author } from "../entities/author.entity";
import { Genere } from "../entities/genere.entity";
import { Sage } from "../entities/sage.entity";
import { Shelf } from "../entities/shelf.entity";
import { EntityTarget, ObjectLiteral } from "typeorm";

//clase genérica para el crud de todas las entidades
export class CrudService {
    //obtener todos los registros de las entidades cRud
    private async getAll<T extends ObjectLiteral>(entity: EntityTarget<T>): Promise<T[]> {
        return await AppDataSource.getRepository(entity).find();
    }
    
    //funcion generica para crear (Crud)
    private async create<T extends ObjectLiteral>(entity: EntityTarget<T>, name: string): Promise <T> {
        const repository = AppDataSource.getRepository(entity);
        const exist = await repository.findOne({ where: {name} as any });
        if (exist) throw new Error("Ese nombre ya existe");

        const newItem = repository.create({ name } as any);
        return await repository.save(newItem as any)
    }
    
    //actualizar cualquier registro crUd
    private async update<T extends ObjectLiteral>(entity: EntityTarget<T>, id: number, name: string): Promise <T> {
        const repository = AppDataSource.getRepository(entity);
    
        //buscar
        const item = await repository.findOne({ where: { id } as any })
        if (!item) throw new Error("No encontrado");

        // validar que al actualizar no sea el mismo que uno que ya existe
        const duplicate = await repository.findOne({ where: { id } as any });
        if (duplicate && (duplicate as any).id !== id) {
            throw new Error("Ese nombre ya existe!");
        }

        //actualizar
        const update = repository.merge(item, {name} as any);
        return await repository.save(update as any);
        }

    //funcion para eliminar cualquier registro
    private async delete<T extends ObjectLiteral>(entity: EntityTarget<T>, id: number): Promise <void> {
    const repository = AppDataSource.getRepository(entity);
    const exist = await repository.findOne({ where: {id} as any });
    if (!exist) throw new Error("No se encontró el registro");

    await repository.remove(exist)
    }
    //expositores
        // Autores
        async getAuthors() { return this.getAll(Author); }
        async createAuthor(name: string) { return this.create(Author, name); }
        async updateAuthor(id: number, name: string) { return this.update(Author, id, name); }
        async deleteAuthor(id: number) { return this.delete(Author, id); }
    
        // Géneros
        async getGeneres() { return this.getAll(Genere); }
        async createGenere(name: string) { return this.create(Genere, name); }
        async updateGenere(id: number, name: string) { return this.update(Genere, id, name); }
        async deleteGenere(id: number) { return this.delete(Genere, id); }
    
        // Sagas
        async getSages() { return this.getAll(Sage); }
        async createSage(name: string) { return this.create(Sage, name); }
        async updateSage(id: number, name: string) { return this.update(Sage, id, name); }
        async deleteSage(id: number) { return this.delete(Sage, id); }
    
        // Estantes
        async getShelves() { return this.getAll(Shelf); }
        async createShelf(name: string) { return this.create(Shelf, name); }
        async updateShelf(id: number, name: string) { return this.update(Shelf, id, name); }
        async deleteShelf(id: number) { return this.delete(Shelf, id); }
}


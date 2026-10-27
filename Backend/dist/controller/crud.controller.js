"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudController = void 0;
const crud_service_1 = require("../service/crud.service");
const crudService = new crud_service_1.CrudService();
class CrudController {
    constructor() {
        // Mapeo final de rutas a los métodos del controlador
        this.getAuthors = this.handleGet(() => crudService.getAuthors());
        this.createAuthor = this.handleCreate((name) => crudService.createAuthor(name));
        this.updateAuthor = this.handleUpdate((id, name) => crudService.updateAuthor(id, name));
        this.deleteAuthor = this.handleDelete((id) => crudService.deleteAuthor(id));
        this.getGeneres = this.handleGet(() => crudService.getGeneres());
        this.createGenere = this.handleCreate((name) => crudService.createGenere(name));
        this.updateGenere = this.handleUpdate((id, name) => crudService.updateGenere(id, name));
        this.deleteGenere = this.handleDelete((id) => crudService.deleteGenere(id));
        this.getSages = this.handleGet(() => crudService.getSages());
        this.createSage = this.handleCreate((name) => crudService.createSage(name));
        this.updateSage = this.handleUpdate((id, name) => crudService.updateSage(id, name));
        this.deleteSage = this.handleDelete((id) => crudService.deleteSage(id));
        this.getShelves = this.handleGet(() => crudService.getShelves());
        this.createShelf = this.handleCreate((name) => crudService.createShelf(name));
        this.updateShelf = this.handleUpdate((id, name) => crudService.updateShelf(id, name));
        this.deleteShelf = this.handleDelete((id) => crudService.deleteShelf(id));
    }
    //Crud crear
    handleCreate(method) {
        return async (req, res, next) => {
            try {
                const { name } = req.body;
                if (!name)
                    return res.status(400).json({ message: "Complete el nombre" });
                const item = await method(name);
            }
            catch (error) {
                next(error);
            }
        };
    }
    //cRud obtener
    handleGet(method) {
        return async (req, res, next) => {
            try {
                const data = await method();
                res.status(200).json(data);
            }
            catch (error) {
                next(error);
            }
        };
    }
    handleUpdate(method) {
        return async (req, res, next) => {
            try {
                const id = Number(req.params.id);
                const { name } = req.body;
                if (isNaN(id))
                    return res.status(400).json({ message: "Id no existe" });
                if (!name)
                    return res.status(400).json({ message: "Inserte un nombre válido" });
                const updateItem = await method(id, name);
                res.status(200).json({ message: "Se actualizó ", data: updateItem });
            }
            catch (error) {
                next(error);
            }
        };
    }
    //cruD borrar
    handleDelete(method) {
        return async (req, res, next) => {
            try {
                const id = Number(req.params.id);
                if (isNaN(id))
                    return res.status(400).json({ message: "Id no existe" });
                await method(id);
                res.status(200).json({ message: "Eliminado" });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.CrudController = CrudController;

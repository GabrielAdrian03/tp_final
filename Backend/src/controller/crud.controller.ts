import { Request, Response, NextFunction } from "express";
import { CrudService } from "../service/crud.service";

const crudService = new CrudService();

export class CrudController {
    //Crud crear
    private handleCreate(method: (name: string) => Promise<any>) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const {name} = req.body;
                if (!name) return res.status(400).json({ message: "Complete el nombre" });
                const item = await method(name);
            } catch (error) {
                next(error);
            }
        }
    }
    //cRud obtener
    private handleGet(method: () => Promise<any>) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const data= await method();
                res.status(200).json(data);
            } catch (error) {
                next(error);
            }
        }

    }

    private handleUpdate(method: (id: number, name: string) => Promise<any>) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const id= Number(req.params.id);
                const { name } = req.body;
                if (isNaN(id)) return res.status(400).json({ message: "Id no existe" });
                if (!name) return res.status(400).json({ message: "Inserte un nombre válido" });

                const updateItem = await method(id, name);
                res.status(200).json({ message: "Se actualizó ", data: updateItem });
            } catch (error) {
                next(error);
            }
        }
    }
    //cruD borrar
    private handleDelete(method: (id: number) => Promise<any>) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const id= Number(req.params.id);
                if (isNaN(id)) return res.status(400).json({ message: "Id no existe" });
                await method(id);
                res.status(200).json({ message: "Eliminado" });
            } catch (error) {
                next(error);
            }
        }

    }
      // Mapeo final de rutas a los métodos del controlador
    getAuthors = this.handleGet(() => crudService.getAuthors());
    createAuthor = this.handleCreate((name) => crudService.createAuthor(name));
    updateAuthor = this.handleUpdate((id, name) => crudService.updateAuthor(id, name));
    deleteAuthor = this.handleDelete((id) => crudService.deleteAuthor(id));

    getGeneres = this.handleGet(() => crudService.getGeneres());
    createGenere = this.handleCreate((name) => crudService.createGenere(name));
    updateGenere  = this.handleUpdate((id, name) => crudService.updateGenere(id, name));
    deleteGenere = this.handleDelete((id) => crudService.deleteGenere(id));

    getSages = this.handleGet(() => crudService.getSages());
    createSage = this.handleCreate((name) => crudService.createSage(name));
    updateSage   = this.handleUpdate((id, name) => crudService.updateSage(id, name));
    deleteSage = this.handleDelete((id) => crudService.deleteSage(id));

    getShelves = this.handleGet(() => crudService.getShelves());
    createShelf = this.handleCreate((name) => crudService.createShelf(name));
    updateShelf  = this.handleUpdate((id, name) => crudService.updateShelf(id, name));
    deleteShelf = this.handleDelete((id) => crudService.deleteShelf(id));
}
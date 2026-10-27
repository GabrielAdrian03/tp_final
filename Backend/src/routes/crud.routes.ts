import { Router } from "express";
import { CrudController } from "../controller/crud.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();
const controller = new CrudController();

// ✍️ CRUD AUTORES
router.get("/authors", controller.getAuthors);
router.post("/authors", authenticateJWT, controller.createAuthor);
router.put("/authors/:id", authenticateJWT, controller.updateAuthor);
router.delete("/authors/:id", authenticateJWT, controller.deleteAuthor);

// ✍️ CRUD GÉNEROS
router.get("/generes", controller.getGeneres);
router.post("/generes", authenticateJWT, controller.createGenere);
router.put("/genres/:id", authenticateJWT, controller.updateGenere);
router.delete("/generes/:id", authenticateJWT, controller.deleteGenere);

// ✍️ CRUD SAGAS
router.get("/sages", controller.getSages);
router.post("/sages", authenticateJWT, controller.createSage);
router.put("/sagas/:id", authenticateJWT, controller.updateSage);
router.delete("/sages/:id", authenticateJWT, controller.deleteSage);

// ✍️ CRUD ESTANTES
router.get("/shelves", controller.getShelves);
router.post("/shelves", authenticateJWT, controller.createShelf);
router.put("/shelves/:id", authenticateJWT, controller.updateShelf);
router.delete("/shelves/:id", authenticateJWT, controller.deleteShelf);

export default router;

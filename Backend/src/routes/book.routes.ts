import { Router } from "express";
import { BookController } from "../controller/book.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();
const bookController = new BookController();

//vista publicas solo get
router.get("/:id", bookController.getOne);

//rutas privadas que se ven si se valida el token
router.post("/", authenticateJWT, bookController.create)
router.put("/:id", authenticateJWT, bookController.update)
router.delete("/:id", authenticateJWT, bookController.delete)

export default router;
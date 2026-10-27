"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crud_controller_1 = require("../controller/crud.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new crud_controller_1.CrudController();
// ✍️ CRUD AUTORES
router.get("/authors", controller.getAuthors);
router.post("/authors", auth_middleware_1.authenticateJWT, controller.createAuthor);
router.put("/authors/:id", auth_middleware_1.authenticateJWT, controller.updateAuthor);
router.delete("/authors/:id", auth_middleware_1.authenticateJWT, controller.deleteAuthor);
// ✍️ CRUD GÉNEROS
router.get("/generes", controller.getGeneres);
router.post("/generes", auth_middleware_1.authenticateJWT, controller.createGenere);
router.put("/genres/:id", auth_middleware_1.authenticateJWT, controller.updateGenere);
router.delete("/generes/:id", auth_middleware_1.authenticateJWT, controller.deleteGenere);
// ✍️ CRUD SAGAS
router.get("/sages", controller.getSages);
router.post("/sages", auth_middleware_1.authenticateJWT, controller.createSage);
router.put("/sagas/:id", auth_middleware_1.authenticateJWT, controller.updateSage);
router.delete("/sages/:id", auth_middleware_1.authenticateJWT, controller.deleteSage);
// ✍️ CRUD ESTANTES
router.get("/shelves", controller.getShelves);
router.post("/shelves", auth_middleware_1.authenticateJWT, controller.createShelf);
router.put("/shelves/:id", auth_middleware_1.authenticateJWT, controller.updateShelf);
router.delete("/shelves/:id", auth_middleware_1.authenticateJWT, controller.deleteShelf);
exports.default = router;

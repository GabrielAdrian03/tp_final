"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("../controller/book.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const bookController = new book_controller_1.BookController();
//vista publicas solo get
router.get("/:id", bookController.getOne);
router.get("/:id", bookController.getOne);
//rutas privadas que se ven si se valida el token
router.post("/", auth_middleware_1.authenticateJWT, bookController.create);
router.put("/:id", auth_middleware_1.authenticateJWT, bookController.update);
router.delete("/:id", auth_middleware_1.authenticateJWT, bookController.delete);
exports.default = router;

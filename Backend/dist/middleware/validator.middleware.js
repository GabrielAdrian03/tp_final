"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBookData = void 0;
const constants_js_1 = require("../config/constants.js");
const validateBookData = (req, res, next) => {
    const { title, publicationYear, authorId, genreId, shelfId } = req.body;
    if (!title || typeof title !== "string" || title.trim() === "") {
        return res.status(constants_js_1.HTTP_STATUS.BAD_REQUEST).json({
            status: "error",
            message: "El título es obligatorio y debe ser un texto válido."
        });
    }
    const year = Number(publicationYear);
    if (isNaN(year) || year < constants_js_1.BOOK_CONSTRAINTS.MIN_YEAR || year > constants_js_1.BOOK_CONSTRAINTS.MAX_YEAR) {
        return res.status(constants_js_1.HTTP_STATUS.BAD_REQUEST).json({
            status: "error",
            message: `El año de publicación debe ser un número entre ${constants_js_1.BOOK_CONSTRAINTS.MIN_YEAR} y ${constants_js_1.BOOK_CONSTRAINTS.MAX_YEAR}.`
        });
    }
    if (!authorId || isNaN(Number(authorId))) {
        return res.status(constants_js_1.HTTP_STATUS.BAD_REQUEST).json({ status: "error", message: "Se requiere un ID de autor válido." });
    }
    if (!genreId || isNaN(Number(genreId))) {
        return res.status(constants_js_1.HTTP_STATUS.BAD_REQUEST).json({ status: "error", message: "Se requiere un ID de género válido." });
    }
    if (!shelfId || isNaN(Number(shelfId))) {
        return res.status(constants_js_1.HTTP_STATUS.BAD_REQUEST).json({ status: "error", message: "Se requiere un ID de estante válido." });
    }
    next(); // Si pasa todas las pruebas, va al controlador
};
exports.validateBookData = validateBookData;

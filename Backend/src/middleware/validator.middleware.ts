import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS, BOOK_CONSTRAINTS } from "../config/constants.js";

export const validateBookData = (req: Request, res: Response, next: NextFunction) => {
    const { title, publicationYear, authorId, genreId, shelfId } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            status: "error",
            message: "El título es obligatorio y debe ser un texto válido."
        });
    }

    const year = Number(publicationYear);
    if (isNaN(year) || year < BOOK_CONSTRAINTS.MIN_YEAR || year > BOOK_CONSTRAINTS.MAX_YEAR) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            status: "error",
            message: `El año de publicación debe ser un número entre ${BOOK_CONSTRAINTS.MIN_YEAR} y ${BOOK_CONSTRAINTS.MAX_YEAR}.`
        });
    }

    if (!authorId || isNaN(Number(authorId))) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: "error", message: "Se requiere un ID de autor válido." });
    }

    if (!genreId || isNaN(Number(genreId))) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: "error", message: "Se requiere un ID de género válido." });
    }

    if (!shelfId || isNaN(Number(shelfId))) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ status: "error", message: "Se requiere un ID de estante válido." });
    }

    next(); // Si pasa todas las pruebas, va al controlador
};

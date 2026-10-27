import { useState, useEffect } from "react";
import { CatalogService } from "../services/api.service.js";

export function useFetchCatalog(filters = {}) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBooks = async () => {
            setLoading(true);
            try {
                const data = await CatalogService.getBooks(filters);
                setBooks(data);
                setError(null);
            } catch (err) {
                setError("Error al cargar los libros del catálogo.");
            } finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, [filters.genreId, filters.authorId, filters.year]); // Se dispara al mutar los filtros

    return { books, loading, error };
}

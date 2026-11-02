import { useState, useEffect, useCallback } from "react";

import CatalogHeader from "../components/CatalogComponent/CatalogHeader";
import CatalogFilters from "../components/CatalogComponent/CatalogFilters";
import BookGrid from "../components/CatalogComponent/BookGrid";
import BookDetailModal from "../components/CatalogComponent/BookDetailModal";
import LoadingState from "../components/CatalogComponent/LoadingState";
import EmptyState from "../components/CatalogComponent/EmptyState";

const API_URL = "http://localhost:8080/api";

export default function Catalog() {
  //usestates para almacenar los datos de libros, autores y géneros
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [generes, setGeneres] = useState([]);

  //usestates para almacenar los filtros seleccionados por el usuario
  const [selectedGenere, setSelectedGenere] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  //usestates para almacenar el libro seleccionado para ver detalles
  const [selectedBook, setSelectedBook] = useState(null);

  //usestates para manejar el estado de carga y errores
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cargar autores y géneros
  useEffect(() => {
    const loadCatalogs = async () => {
      try {
        const [authorsRes, generesRes] = await Promise.all([
          fetch(`${API_URL}/authors`),
          fetch(`${API_URL}/generes`),
        ]);

        if (!authorsRes.ok || !generesRes.ok) {
          throw new Error("Error al cargar los catálogos");
        }
        // Parsear las respuestas JSON
        const authorsData = await authorsRes.json();
        const generesData = await generesRes.json();

        // Actualizar los estados con los datos obtenidos
        setAuthors(authorsData);
        setGeneres(generesData);

      } catch (err) {
        setError(err.message);
      }
    };

    loadCatalogs();
  }, []);

  // Obtener libros
  useEffect(() => {
    const controller = new AbortController();

    const loadBooks = async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams();
        // Agregar filtros a la URL si están seleccionados
        if (selectedGenere) params.append("genreId", selectedGenere);
        if (selectedAuthor) params.append("authorId", selectedAuthor);
        if (selectedYear) params.append("year", selectedYear);
        // Realizar la solicitud fetch con los filtros aplicados
        const response = await fetch(
          `${API_URL}/books?${params.toString()}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Error al cargar los libros");
        }

        const data = await response.json();
        setBooks(data);

      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setBooks([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
    // Llamar a la función para cargar los libros
    loadBooks();
    // Limpiar la solicitud fetch si el componente se desmonta
    return () => controller.abort();
    //dependencias para recargar los libros cuando cambian los filtros
  }, [selectedGenere, selectedAuthor, selectedYear]);

  // Limpiar filtros
  const clearFilters = () => {
    setSelectedGenere("");
    setSelectedAuthor("");
    setSelectedYear("");
  };

  // Cerrar modal
  const closeModal = useCallback(() => {
    setSelectedBook(null);
  }, []);

  // Determinar si hay filtros aplicados
  const hasFilters = selectedGenere || selectedAuthor || selectedYear;

  return (
  <main className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-10">
    <div className="mx-auto max-w-7xl">
      <CatalogHeader totalBooks={books.length} />
      <CatalogFilters
        authors={authors}
        generes={generes}
        selectedAuthor={selectedAuthor}
        selectedGenere={selectedGenere}
        selectedYear={selectedYear}
        setSelectedAuthor={setSelectedAuthor}
        setSelectedGenere={setSelectedGenere}
        setSelectedYear={setSelectedYear}
        onClear={clearFilters}
      />

      {error ? (
        <div className="rounded-xl border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-400">
          {"No se encontraron Resultados"}
        </div>

      ) : loading ? (
        <LoadingState />
      ) : books.length === 0 ? (
        <EmptyState
          onClear={clearFilters}
          hasFilters={hasFilters}
        />
      ) : (
        <BookGrid
          books={books}
          onViewDetails={setSelectedBook}
        />
      )}
    </div>

    {selectedBook && (
      <BookDetailModal
        book={selectedBook}
        onClose={closeModal}
      />
    )}
  </main>
)};

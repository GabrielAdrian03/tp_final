import { useState, useEffect } from "react";

export default function Catalog() {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    
    // Estados de los filtros
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedAuthor, setSelectedAuthor] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    
    // Estado para ver el detalle de un libro específico
    const [selectedBook, setSelectedBook] = useState(null);

    // Cargar catálogos iniciales para los filtros desplegables
    useEffect(() => {
        fetch("http://localhost:8080/api/authors").then(res => res.json()).then(data => setAuthors(data));
        fetch("http://localhost:8080/api/genres").then(res => res.json()).then(data => setGenres(data));
    }, []);

    // Cargar y filtrar libros de forma combinada (Efecto reactivo)
    useEffect(() => {
        let url = "http://localhost:8080/api/books?";
        if (selectedGenre) url += `genreId=${selectedGenre}&`;
        if (selectedAuthor) url += `authorId=${selectedAuthor}&`;
        if (selectedYear) url += `year=${selectedYear}&`;

        fetch(url)
            .then(res => res.json())
            .then(data => setBooks(data));
    }, [selectedGenre, selectedAuthor, selectedYear]);

    return (
        <div style={{ padding: "20px" }}>
            <h2>📚 Catálogo de Libros</h2>
            
            {/* BARRA DE FILTROS */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <select onChange={e => setSelectedAuthor(e.target.value)}>
                    <option value="">Todos los Autores</option>
                    {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>

                <select onChange={e => setSelectedGenre(e.target.value)}>
                    <option value="">Todos los Géneros</option>
                    {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>

                <input type="number" placeholder="Filtrar por Año" value={selectedYear} onChange={e => setSelectedYear(e.target.value)} />
            </div>

            {/* GRILLA DE LIBROS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
                {books.map(book => (
                    <div key={book.id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "5px" }}>
                        <h3>{book.title}</h3>
                        <p>Autor: {book.author?.name}</p>
                        <button onClick={() => setSelectedBook(book)}>Ver Detalle Completo</button>
                    </div>
                ))}
            </div>

            {/* MODAL: VISUALIZACIÓN DEL DETALLE DE UN LIBRO */}
            {selectedBook && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ background: "#fff", padding: "30px", borderRadius: "8px", maxWidth: "500px", width: "100%" }}>
                        <h2>{selectedBook.title}</h2>
                        <hr />
                        <p><strong>Autor:</strong> {selectedBook.author?.name}</p>
                        <p><strong>Género:</strong> {selectedBook.genre?.name}</p>
                        <p><strong>Año:</strong> {selectedBook.publicationYear}</p>
                        <p><strong>📍 UBICACIÓN EN ESTANTE:</strong> {selectedBook.shelf?.name}</p>
                        {selectedBook.saga && <p><strong>📖 Saga:</strong> {selectedBook.saga?.name}</p>}
                        <button onClick={() => setSelectedBook(null)} style={{ marginTop: "15px" }}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

import { useState, useEffect } from "react";
import { useAuth } from "../context/authcontext.jsx";
import BookForm from "../components/dashboard/BookForm.jsx";
import BookTable from "../components/dashboard/BookTable.jsx";
import MasterForm from "../components/dashboard/MasterForm.jsx";
import MasterList from "../components/dashboard/MasterList.jsx";

export default function AdminDashboard() {
    const { token } = useAuth();
    const [activeTab, setActiveTab] = useState("books");

    // Listas de datos globales
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [sagas, setSagas] = useState([]);
    const [shelves, setShelves] = useState([]);

    // Control de Edición Compartido
    const [editingId, setEditingId] = useState(null);
    const [selectedItemData, setSelectedItemData] = useState(null);

    const fetchData = async () => {
        try {
            const [b, a, g, s, sh] = await Promise.all([
                fetch("http://localhost:8080/api/books").then(res => res.json()),
                fetch("http://localhost:8080/api/authors").then(res => res.json()),
                fetch("http://localhost:8080/api/genres").then(res => res.json()),
                fetch("http://localhost:8080/api/sagas").then(res => res.json()),
                fetch("http://localhost:8080/api/shelves").then(res => res.json())
            ]);
            setBooks(b); setAuthors(a); setGenres(g); setSagas(s); setShelves(sh);
        } catch (error) {
            console.error("Error cargando el panel:", error);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const resetSelection = () => { setEditingId(null); setSelectedItemData(null); };

    // 🛠️ CONTROL DE ABM GENÉRICO (Autores, Géneros, Sagas, Estantes)
    const handleMasterSubmit = async (name) => {
        const url = `http://localhost:8080/api/${activeTab}${editingId ? `/${editingId}` : ""}`;
        try {
            const res = await fetch(url, {
                method: editingId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ name })
            });
            if (res.ok) { resetSelection(); fetchData(); }
        } catch (e) { alert("Error al procesar."); }
    };

    const handleMasterDelete = async (id) => {
        if (!window.confirm("¿Deseas eliminar este registro?")) return;
        try {
            const res = await fetch(`http://localhost:8080/api/${activeTab}/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) fetchData();
            else alert("Error: Registro enlazado a un libro activo.");
        } catch (e) { alert("Error de conexión."); }
    };

    // 📚 CONTROL DE ABM DE LIBROS
    const handleBookSubmit = async (payload) => {
        const url = `http://localhost:8080/api/books${editingId ? `/${editingId}` : ""}`;
        try {
            const res = await fetch(url, {
                method: editingId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(payload)
            });
            if (res.ok) { resetSelection(); fetchData(); }
        } catch (e) { alert("Error de red."); }
    };

    // Determinar qué lista inyectar al componente Master genérico
    const getActiveMasterItems = () => {
        if (activeTab === "authors") return authors;
        if (activeTab === "genres") return genres;
        if (activeTab === "sagas") return sagas;
        return shelves;
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>🎛️ Panel de Administración (ABM)</h2>

            {/* CONTROL DE PESTAÑAS */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                {["books", "authors", "genres", "sagas", "shelves"].map(tab => (
                    <button 
                        key={tab} onClick={() => { setActiveTab(tab); resetSelection(); }}
                        style={{ padding: "10px", backgroundColor: activeTab === tab ? "#3498db" : "#eee", color: activeTab === tab ? "#fff" : "#000", border: "none", cursor: "pointer" }}
                    >
                        {tab.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* MÓDULO REACTIVO DE LIBROS */}
            {activeTab === "books" ? (
                <>
                    <BookForm 
                        onSubmit={handleBookSubmit} editingId={editingId} initialData={selectedItemData}
                        authors={authors} genres={genres} shelves={shelves} sagas={sagas} onCancel={resetSelection}
                    />
                    <BookTable 
                        books={books} onDelete={handleMasterDelete} 
                        onEdit={(b) => { setEditingId(b.id); setSelectedItemData(b); }} 
                    />
                </>
            ) : (
                /* MÓDULO REACTIVO GENÉRICO */
                <>
                    <MasterForm 
                        activeTab={activeTab} editingId={editingId} initialName={selectedItemData?.name || ""}
                        onSubmit={handleMasterSubmit} onCancel={resetSelection}
                    />
                    <MasterList 
                        items={getActiveMasterItems()} onDelete={handleMasterDelete}
                        onEdit={(item) => { setEditingId(item.id); setSelectedItemData(item); }}
                    />
                </>
            )}
        </div>
    );
}

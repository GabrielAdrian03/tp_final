import { useState, useEffect } from "react";

export default function BookForm({ onSubmit, editingId, initialData, authors, genres, shelves, sagas, onCancel }) {
    const [form, setForm] = useState({
        title: "", publicationYear: "", authorId: "", genreId: "", shelfId: "", sagaId: ""
    });

    useEffect(() => {
        if (editingId && initialData) {
            setForm({
                title: initialData.title || "",
                publicationYear: initialData.publicationYear || "",
                authorId: initialData.author?.id || "",
                genreId: initialData.genre?.id || "",
                shelfId: initialData.shelf?.id || "",
                sagaId: initialData.saga?.id || ""
            });
        } else {
            setForm({ title: "", publicationYear: "", authorId: "", genreId: "", shelfId: "", sagaId: "" });
        }
    }, [editingId, initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            title: form.title,
            publicationYear: Number(form.publicationYear),
            author: Number(form.authorId),
            genre: Number(form.genreId),
            shelf: Number(form.shelfId),
            saga: form.sagaId ? Number(form.sagaId) : null
        });
    };

    return (
        <div>
            <h3>{editingId ? "📝 Editar Libro" : "➕ Alta de Libro"}</h3>
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px", maxWidth: "400px", marginBottom: "30px" }}>
                <input type="text" placeholder="Título" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
                <input type="number" placeholder="Año" value={form.publicationYear} onChange={e => setForm({...form, publicationYear: e.target.value})} required />
                
                <select value={form.authorId} onChange={e => setForm({...form, authorId: e.target.value})} required>
                    <option value="">Seleccionar Autor</option>
                    {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>

                <select value={form.genreId} onChange={e => setForm({...form, genreId: e.target.value})} required>
                    <option value="">Seleccionar Género</option>
                    {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>

                <select value={form.shelfId} onChange={e => setForm({...form, shelfId: e.target.value})} required>
                    <option value="">Seleccionar Estante</option>
                    {shelves.map(sh => <option key={sh.id} value={sh.id}>{sh.name}</option>)}
                </select>

                <select value={form.sagaId} onChange={e => setForm({...form, sagaId: e.target.value})}>
                    <option value="">Ninguna Saga (Opcional)</option>
                    {sagas.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>

                <button type="submit">{editingId ? "Guardar Cambios" : "Registrar Libro"}</button>
                {editingId && <button type="button" onClick={onCancel}>Cancelar</button>}
            </form>
        </div>
    );
}

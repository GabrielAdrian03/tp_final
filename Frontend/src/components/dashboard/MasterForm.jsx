import { useState, useEffect } from "react";

export default function MasterForm({ activeTab, editingId, initialName, onSubmit, onCancel }) {
    const [name, setName] = useState("");

    useEffect(() => {
        setName(editingId ? initialName : "");
    }, [editingId, initialName, activeTab]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSubmit(name);
        setName("");
    };

    return (
        <div style={{ marginBottom: "30px" }}>
            <h3>{editingId ? `📝 Editar en ${activeTab}` : `➕ Agregar a ${activeTab}`}</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nombre / Descripción" value={name} onChange={e => setName(e.target.value)} required />
                <button type="submit">{editingId ? "Actualizar" : "Guardar"}</button>
                {editingId && <button type="button" onClick={() => { setName(""); onCancel(); }}>Cancelar</button>}
            </form>
        </div>
    );
}

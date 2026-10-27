export default function BookTable({ books, onEdit, onDelete }) {
    return (
        <div>
            <h4>Listado del Inventario</h4>
            <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                        <th>Título</th><th>Autor</th><th>Género</th><th>Estante</th><th>Saga</th><th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(b => (
                        <tr key={b.id}>
                            <td>{b.title}</td>
                            <td>{b.author?.name || "-"}</td>
                            <td>{b.genre?.name || "-"}</td>
                            <td>{b.shelf?.name || "-"}</td>
                            <td>{b.saga ? b.saga.name : "-"}</td>
                            <td>
                                <button onClick={() => onEdit(b)} style={{ marginRight: "5px" }}>✏️</button>
                                <button onClick={() => onDelete(b.id)}>❌</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

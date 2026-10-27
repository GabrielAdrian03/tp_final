export default function MasterList({ items, onEdit, onDelete }) {
    return (
        <div>
            <h4>Registros Existentes</h4>
            <ul>
                {items.map(item => (
                    <li key={item.id} style={{ marginBottom: "10px" }}>
                        {item.name} {" "}
                        <button onClick={() => onEdit(item)} style={{ marginLeft: "10px", marginRight: "5px" }}>✏️</button>
                        <button onClick={() => onDelete(item.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

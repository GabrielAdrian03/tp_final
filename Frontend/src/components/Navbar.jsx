import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext.jsx";

export default function Navbar() {
    const { token, logout } = useAuth();

    return (
        <nav style={{ display: "flex", justifyContent: "space-between", padding: "15px", backgroundColor: "#333", color: "#fff" }}>
            <div>
                <Link to="/" style={{ color: "#fff", marginRight: "15px", textDecoration: "none" }}>Catálogo Público</Link>
                {token && <Link to="/admin" style={{ color: "#fff", marginRight: "15px", textDecoration: "none" }}>Panel ABM Admin</Link>}
                {token && <Link to="/logs" style={{ color: "#fff", textDecoration: "none" }}>Ver Logs</Link>}
            </div>
            <div>
                {token ? (
                    <button onClick={logout} style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>
                        🚪 Cierre de Sesión
                    </button>
                ) : (
                    <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>Ingresar</Link>
                )}
            </div>
        </nav>
    );
}

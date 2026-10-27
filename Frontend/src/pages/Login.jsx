import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                login(data.token);
                navigate("/admin"); // Redirige al panel de administración
            } else {
                alert(data.message || "Credenciales incorrectas");
            }
        } catch (error) {
            alert("Error al conectar con el servidor.");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px", border: "1px solid #ccc" }}>
            <h2>Login Administrador</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{width:"100%", marginBottom:"10px"}} />
                <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required style={{width:"100%", marginBottom:"20px"}} />
                <button type="submit" style={{width:"100%"}}>Ingresar</button>
            </form>
        </div>
    );
}

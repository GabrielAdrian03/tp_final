import { useEffect, useState } from "react";

export default function LogsView() {
    const [logs, setLogs] = useState([]);

    // Simulador o lector de peticiones logger del sistema
    useEffect(() => {
        // En una app real, puedes exponer un endpoint GET /api/logs protegido por JWT en tu backend
        // Aquí mostramos una simulación integrada de eventos del sistema
        setLogs([
            { id: 1, type: "INFO", time: "18:17:41", msg: "conectado a la BD. Puerto: 8080" },
            { id: 2, type: "INFO", time: "18:17:42", msg: "Se creó el usuario admin de prueba" },
            { id: 3, type: "WARN", time: "18:22:10", msg: "Intento de inicio de sesión sin token provisto" },
            { id: 4, type: "ERROR", time: "18:25:03", msg: "ER_ACCESS_DENIED_ERROR: Acceso denegado para usuario root" }
        ]);
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>📋 Consola de Eventos y Logs de la Aplicación</h2>
            <div style={{ backgroundColor: "#1e1e1e", color: "#fff", padding: "20px", fontFamily: "monospace", borderRadius: "5px", height: "400px", overflowY: "scroll" }}>
                {logs.map(log => (
                    <div key={log.id} style={{ marginBottom: "10px", color: log.type === "ERROR" ? "#ff6b6b" : log.type === "WARN" ? "#f1c40f" : "#2ecc71" }}>
                        [{log.time}] [{log.type}] - {log.msg}
                    </div>
                ))}
            </div>
        </div>
    );
}

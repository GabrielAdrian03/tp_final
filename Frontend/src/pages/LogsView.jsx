
import { useEffect, useState } from "react";
import { LogsService } from "../services/api.service.js";

const severityStyles = {
    INFO: "text-green-400",
    WARN: "text-yellow-400",
    ERROR: "text-red-400",
    DEBUG: "text-blue-400",
};

export default function LogsView() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [severity, setSeverity] = useState("ALL");
    const [search, setSearch] = useState("");

    const fetchLogs = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await LogsService.getLogs();

            // Acepta tanto un array como { data: [...] }
            const records = Array.isArray(response)
                ? response
                : response.data ?? [];

            setLogs(records);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "No se pudieron cargar los registros."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const filteredLogs = logs.filter(log => {
        const matchesSeverity =
            severity === "ALL" || log.severity === severity;

        const matchesSearch =
            (log.message || "")
                .toLowerCase()
                .includes(search.toLowerCase());

        return matchesSeverity && matchesSearch;
    });

    const formatDate = (date) => {
        if (!date) return "--";

        return new Date(date).toLocaleString("es-AR", {
            dateStyle: "short",
            timeStyle: "medium",
        });
    };

    return (
        <main className="p-4 md:p-6 space-y-5">
            <header className="flex flex-wrap justify-between items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Logs del sistema
                    </h1>
                    <p className="text-sm text-slate-500">
                        Registro de eventos y errores de la aplicación
                    </p>
                </div>

                <button
                    onClick={fetchLogs}
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white
                    hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Actualizando..." : "Actualizar"}
                </button>
            </header>

            {/* Contadores */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["INFO", "WARN", "ERROR", "DEBUG"].map(type => (
                    <div
                        key={type}
                        className="bg-white border border-slate-200 rounded-xl p-4"
                    >
                        <p className="text-sm text-slate-500">{type}</p>
                        <p className="text-2xl font-bold text-slate-800">
                            {logs.filter(log => log.severity === type).length}
                        </p>
                    </div>
                ))}
            </section>

            {/* Filtros */}
            <section className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    placeholder="Buscar en los mensajes..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="flex-1 border border-slate-300 rounded-lg px-3 py-2"
                />

                <select
                    value={severity}
                    onChange={e => setSeverity(e.target.value)}
                    className="border border-slate-300 rounded-lg px-3 py-2"
                >
                    <option value="ALL">Todas las severidades</option>
                    <option value="INFO">INFO</option>
                    <option value="WARN">WARN</option>
                    <option value="ERROR">ERROR</option>
                    <option value="DEBUG">DEBUG</option>
                </select>
            </section>

            {/* Consola */}
            <section className="bg-slate-950 rounded-xl overflow-hidden shadow-lg">
                <div className="px-4 py-3 border-b border-slate-700 flex justify-between">
                    <span className="text-slate-300 text-sm font-mono">
                        application.log
                    </span>
                    <span className="text-slate-400 text-xs">
                        {filteredLogs.length} registros
                    </span>
                </div>

                <div className="p-4 h-[450px] overflow-y-auto font-mono text-sm">
                    {loading && (
                        <p className="text-slate-400">
                            Cargando registros...
                        </p>
                    )}

                    {!loading && error && (
                        <p className="text-red-400">{error}</p>
                    )}

                    {!loading && !error && filteredLogs.length === 0 && (
                        <p className="text-slate-400">
                            No hay registros para mostrar.
                        </p>
                    )}

                    {!loading && !error && filteredLogs.map(log => (
                        <div
                            key={log.id}
                            className="grid grid-cols-1 md:grid-cols-[170px_75px_1fr]
                            gap-2 py-2 border-b border-slate-800"
                        >
                            <span className="text-slate-400">
                                {formatDate(log.timestamp)}
                            </span>

                            <span className={`font-bold ${
                                severityStyles[log.severity] || "text-white"
                            }`}>
                                [{log.severity}]
                            </span>

                            <span className="text-slate-200 break-words">
                                {log.message}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

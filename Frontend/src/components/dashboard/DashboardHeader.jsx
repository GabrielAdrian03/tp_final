
import { LayoutDashboard, RefreshCw } from "lucide-react";

export default function DashboardHeader({ loading, onRefresh }) {
    return (
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <div className="mb-3 flex items-center gap-2 text-indigo-600">
                    <LayoutDashboard size={22} />
                    <span className="text-sm font-semibold uppercase tracking-wide">
                        Panel de control
                    </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    Administración
                </h1>

                <p className="mt-2 text-sm text-slate-500 sm:text-base">
                    Gestioná los libros y los datos de tu biblioteca.
                </p>
            </div>

            <button
                onClick={onRefresh}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <RefreshCw
                    size={17}
                    className={loading ? "animate-spin" : ""}
                />
                Actualizar datos
            </button>
        </header>
    );
}

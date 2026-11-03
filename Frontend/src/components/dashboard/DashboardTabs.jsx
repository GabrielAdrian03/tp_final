
import {
    BookOpen,
    Users,
    Tags,
    Library,
    Archive,
} from "lucide-react";

const tabs = [
    { id: "books", label: "Libros", icon: BookOpen },
    { id: "authors", label: "Autores", icon: Users },
    { id: "generes", label: "Géneros", icon: Tags },
    { id: "sages", label: "Sagas", icon: Library },
    { id: "shelves", label: "Estantes", icon: Archive },
];

export default function DashboardTabs({ activeTab, onTabChange }) {
    return (
        <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
                <h2 className="font-bold text-slate-800">
                    Gestión de biblioteca
                </h2>
                <p className="mt-1 text-sm text-black/70">
                    Seleccioná una sección para administrar sus registros.
                </p>
            </div>

            <nav className="flex gap-1 overflow-x-auto p-2">
                {tabs.map(({ id, label, icon: Icon }) => {
                    const isActive = activeTab === id;

                    return (
                        <button
                            key={id}
                            onClick={() => onTabChange(id)}
                            className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                                isActive
                                    ? "bg-indigo-600 text-white shadow-sm"
                                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                            }`}
                        >
                            <Icon size={18} />
                            {label}
                        </button>
                    );
                })}
            </nav>
        </section>
    );
}

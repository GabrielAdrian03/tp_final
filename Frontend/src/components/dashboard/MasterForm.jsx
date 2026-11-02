
import { useState, useEffect } from "react";
import { Save, X, PlusCircle } from "lucide-react";

const labels = {
    authors: "autor",
    generes: "género",
    sages: "saga",
    shelves: "estante",
};

export default function MasterForm({
    activeTab,
    editingId,
    initialName,
    onSubmit,
    onCancel,
}) {
    const [name, setName] = useState("");

    const entityName = labels[activeTab] || "registro";

    useEffect(() => {
        setName(editingId ? initialName : "");
    }, [editingId, initialName, activeTab]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) return;

        const saved = await onSubmit(name.trim());

        if (saved !== false) {
            setName("");
        }
    };

    return (
        <div className="mb-8">
            <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                    <PlusCircle size={22} />
                </div>

                <div>
                    <h3 className="text-xl font-bold text-slate-900">
                        {editingId
                            ? `Editar ${entityName}`
                            : `Agregar ${entityName}`}
                    </h3>

                    <p className="text-sm text-slate-500">
                        Ingresá el nombre del registro.
                    </p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex max-w-2xl flex-col gap-3 sm:flex-row"
            >
                <input
                    type="text"
                    placeholder={`Nombre del ${entityName}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    required
                />

                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                    <Save size={17} />
                    {editingId ? "Actualizar" : "Guardar"}
                </button>

                {editingId && (
                    <button
                        type="button"
                        onClick={() => {
                            setName("");
                            onCancel();
                        }}
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                        <X size={17} />
                        Cancelar
                    </button>
                )}
            </form>
        </div>
    );
}

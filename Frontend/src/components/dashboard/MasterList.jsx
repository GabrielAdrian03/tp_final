
import { Pencil, Trash2, FolderOpen } from "lucide-react";

export default function MasterList({ items, onEdit, onDelete }) {
    return (
        <div>
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-slate-900">
                        Registros existentes
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        {items.length} registros disponibles.
                    </p>
                </div>

                <FolderOpen size={24} className="text-indigo-500" />
            </div>

            {items.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">
                    <FolderOpen
                        size={32}
                        className="mx-auto mb-3 text-slate-400"
                    />
                    <p className="font-medium text-slate-600">
                        No hay registros disponibles.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-xl border border-slate-200">
                    <ul className="divide-y divide-slate-100">
                        {items.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-slate-50"
                            >
                                <span className="min-w-0 break-words font-medium text-slate-700">
                                    {item.name}
                                </span>

                                <div className="flex shrink-0 gap-2">
                                    <button
                                        onClick={() => onEdit(item)}
                                        title="Editar registro"
                                        className="rounded-lg bg-indigo-50 p-2 text-indigo-600 transition hover:bg-indigo-100"
                                    >
                                        <Pencil size={17} />
                                    </button>

                                    <button
                                        onClick={() => onDelete(item.id)}
                                        title="Eliminar registro"
                                        className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                                    >
                                        <Trash2 size={17} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

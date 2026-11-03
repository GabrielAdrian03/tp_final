
import { Pencil, Trash2, BookOpen } from "lucide-react";

export default function BookTable({ books, onEdit, onDelete }) {
    return (
        <div>
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-slate-900">
                        Libros en el inventario
                    </h3>
                    <p className="mt-1 text-sm text-black/70">
                        {books.length} libros registrados.
                    </p>
                </div>

                <BookOpen className="text-indigo-500" size={24} />
            </div>

            {books.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">
                    <BookOpen className="mx-auto mb-3 text-slate-400" size={32} />
                    <p className="font-medium text-slate-600">
                        No hay libros registrados.
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                        Los libros que agregues aparecerán aquí.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full min-w-[750px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-5 py-4">Título</th>
                                <th className="px-5 py-4">Autor</th>
                                <th className="px-5 py-4">Género</th>
                                <th className="px-5 py-4">Estante</th>
                                <th className="px-5 py-4">Saga</th>
                                <th className="px-5 py-4 text-center">Acciones</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {books.map((book) => (
                                <tr
                                    key={book.id}
                                    className="transition hover:bg-slate-50"
                                >
                                    <td className="px-5 py-4 font-semibold text-white">
                                        {book.title}
                                    </td>

                                    <td className="px-5 py-4 text-slate-600">
                                        {book.author?.name || "-"}
                                    </td>

                                    <td className="px-5 py-4 text-slate-600">
                                        {book.genere?.name || "-"}
                                    </td>

                                    <td className="px-5 py-4 text-slate-600">
                                        {book.shelf?.name || "-"}
                                    </td>

                                    <td className="px-5 py-4 text-slate-600">
                                        {book.sage?.name || "-"}
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => onEdit(book)}
                                                title="Editar libro"
                                                className="rounded-lg bg-indigo-50 p-2 text-indigo-600 transition hover:bg-indigo-100"
                                            >
                                                <Pencil size={17} />
                                            </button>

                                            <button
                                                onClick={() => onDelete(book.id)}
                                                title="Eliminar libro"
                                                className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                                            >
                                                <Trash2 size={17} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

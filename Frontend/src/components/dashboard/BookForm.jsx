
import { useState, useEffect } from "react";
import { Save, X, BookPlus } from "lucide-react";

export default function BookForm({
    onSubmit,
    editingId,
    initialData,
    authors,
    generes,
    shelves,
    sages,
    onCancel,
}) {
    const emptyForm = {
        title: "",
        publicationYear: "",
        authorId: "",
        genereId: "",
        shelfId: "",
        sageId: "",
    };

    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
        if (editingId && initialData) {
            setForm({
                title: initialData.title || "",
                publicationYear: initialData.yearPublication || "",
                authorId: initialData.author?.id || "",
                genereId: initialData.genere?.id || "",
                shelfId: initialData.shelf?.id || "",
                sageId: initialData.sage?.id || "",
            });
        } else {
            setForm(emptyForm);
        }
    }, [editingId, initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            title: form.title.trim(),
            yearPublication: Number(form.publicationYear),
            author: Number(form.authorId),
            genere: Number(form.genereId),
            shelf: Number(form.shelfId),
            sage: form.sageId ? Number(form.sageId) : null,
        });
    };

    const inputClass =
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

    const labelClass =
        "mb-2 block text-sm font-semibold text-slate-700";

    return (
        <div>
            <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                    <BookPlus size={22} />
                </div>

                <div>
                    <h3 className="text-xl font-bold text-slate-900">
                        {editingId ? "Editar libro" : "Registrar libro"}
                    </h3>

                    <p className="text-sm text-black/70">
                        Completá los datos del libro.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-3xl">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label className={labelClass}>
                            Título del libro
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="Ej: Cien años de soledad"
                            value={form.title}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className={labelClass}>
                            Año de publicación
                        </label>

                        <input
                            type="number"
                            name="publicationYear"
                            placeholder="Ej: 1967"
                            value={form.publicationYear}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Autor</label>

                        <select
                            name="authorId"
                            value={form.authorId}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        >
                            <option value="">Seleccionar autor</option>
                            {authors.map((author) => (
                                <option key={author.id} value={author.id}>
                                    {author.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className={labelClass}>Género</label>

                        <select
                            name="genereId"
                            value={form.genereId}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        >
                            <option value="">Seleccionar género</option>
                            {generes.map((genere) => (
                                <option key={genere.id} value={genere.id}>
                                    {genere.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className={labelClass}>Estante</label>

                        <select
                            name="shelfId"
                            value={form.shelfId}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        >
                            <option value="">Seleccionar estante</option>
                            {shelves.map((shelf) => (
                                <option key={shelf.id} value={shelf.id}>
                                    {shelf.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className={labelClass}>
                            Saga
                            <span className="ml-2 font-normal text-slate-400">
                                (Opcional)
                            </span>
                        </label>

                        <select
                            name="sageId"
                            value={form.sageId}
                            onChange={handleChange}
                            className={inputClass}
                        >
                            <option value="">Ninguna saga</option>
                            {sages.map((sage) => (
                                <option key={sage.id} value={sage.id}>
                                    {sage.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <button
                        type="submit"
                        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                    >
                        <Save size={17} />
                        {editingId ? "Guardar cambios" : "Registrar libro"}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                        >
                            <X size={17} />
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

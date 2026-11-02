import { User, Tags, Calendar, SlidersHorizontal } from "lucide-react";

export default function CatalogFilters({
  authors,
  generes,
  selectedAuthor,
  selectedGenere,
  selectedYear,
  setSelectedAuthor,
  setSelectedGenere,
  setSelectedYear,
  onClear,
}) {
  const hasFilters = selectedAuthor || selectedGenere || selectedYear;

  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-semibold text-black dark:text-black">
          <SlidersHorizontal size={19} className="text-indigo-600" />
          Filtrar catálogo
        </h2>

        {hasFilters && (
          <button
            onClick={onClear}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <User size={16} />
            Autor
          </label>

          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Todos los autores</option>

            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Tags size={16} />
            Género
          </label>

          <select
            value={selectedGenere}
            onChange={(e) => setSelectedGenere(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Todos los géneros</option>

            {generes.map((genere) => (
              <option key={genere.id} value={genere.id}>
                {genere.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Calendar size={16} />
            Año de publicación
          </label>

          <input
            type="number"
            placeholder="Ej: 2020"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

      </div>
    </section>
  );
}
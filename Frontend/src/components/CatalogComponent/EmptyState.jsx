import { Book } from "lucide-react";

export default function EmptyState({ onClear, hasFilters }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">

      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Book size={30} />
      </div>

      <h3 className="text-lg font-semibold text-slate-800">
        No encontramos libros
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Probá modificando los filtros de búsqueda.
      </p>

      {hasFilters && (
        <button
          onClick={onClear}
          className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
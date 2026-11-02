import { BookOpen, Library } from "lucide-react";

export default function CatalogHeader({ totalBooks }) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="mb-3 flex items-center gap-2 text-indigo-600">
          <BookOpen size={22} />
          <span className="text-sm font-semibold uppercase">
            Biblioteca digital Antonio
          </span>
        </div>
        <h1 className="text-3xl font-bold text-red">
          Catálogo de libros
        </h1>
        <p className="mt-2 text-slate-500">
          Los mejores materiales para tus estudios y tu entretenimiento.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border bg-white p-4 shadow-sm">
        <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
          <Library size={23} />
        </div>

        <div>
          <p className="text-xs text-slate-500">Libros en el inventario</p>
          <p className="text-2xl font-bold text-slate-900">
            {totalBooks}
          </p>
        </div>
      </div>
    </header>
  );
}
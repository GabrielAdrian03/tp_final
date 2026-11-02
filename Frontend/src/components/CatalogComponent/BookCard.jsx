import { BookOpen, User, BookMarked } from "lucide-react";

export default function BookCard({ book, onViewDetails }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">

      <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-indigo-100 to-slate-100">
        <BookOpen
          size={55}
          strokeWidth={1.2}
          className="text-indigo-300 transition group-hover:scale-110 group-hover:text-indigo-500"
        />

        <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm">
          {book.publicationYear || "Sin año"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">

        <span className="mb-3 w-fit rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
          {book.genre?.name || "Sin género"}
        </span>

        <h3 className="line-clamp-2 text-lg font-bold text-slate-900 group-hover:text-indigo-700">
          {book.title}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          <User size={15} />
          <span className="truncate">
            {book.author?.name || "Autor desconocido"}
          </span>
        </div>

        <button
          onClick={() => onViewDetails(book)}
          className="mt-auto mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
        >
          <BookMarked size={17} />
          Ver detalles
        </button>

      </div>
    </article>
  );
}
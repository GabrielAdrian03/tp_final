import { useEffect } from "react";
import {
  BookOpen,
  User,
  Tags,
  Calendar,
  MapPin,
  Layers,
  X,
} from "lucide-react";

export default function BookDetailModal({ book, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  
  // Crear un arreglo de detalles del libro para renderizar dinámicamente
  const details = [
    {
      label: "Autor",
      value: book.author?.name,
      icon: User,
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      label: "Género",
      value: book.genre?.name,
      icon: Tags,
      color: "text-violet-600 bg-violet-50",
    },
    {
      label: "Año de publicación",
      value: book.publicationYear,
      icon: Calendar,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Ubicación en estante",
      value: book.shelf?.name,
      icon: MapPin,
      color: "text-emerald-600 bg-emerald-50",
    },
  ];
  // Agregar la saga si existe
  if (book.saga) {
    details.push({
      label: "Saga",
      value: book.saga.name,
      icon: Layers,
      color: "text-amber-600 bg-amber-50",
    });
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <div className="relative bg-gradient-to-br from-indigo-600 to-violet-700 px-7 py-9 text-white">
          <button
            onClick={onClose}
            aria-label="Cerrar detalles"
            className="absolute right-5 top-5 rounded-full bg-white/15 p-2 hover:bg-white/30"
          >
            <X size={20} />
          </button>

          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
            <BookOpen size={30} />
          </div>

          <p className="mb-2 text-sm text-indigo-100">
            Información del libro
          </p>

          <h2 id="book-modal-title" className="pr-8 text-2xl font-bold">
            {book.title}
          </h2>
        </div>

        <div className="max-h-[55vh] space-y-5 overflow-y-auto p-7">
          {details.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="flex items-center gap-4">
              <div className={`rounded-xl p-3 ${color}`}>
                <Icon size={20} />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  {label}
                </p>

                <p className="font-semibold text-slate-800">
                  {value || "No especificado"}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-100 bg-slate-50 p-5">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Cerrar detalles
          </button>
        </div>

      </div>
    </div>
  );
}
import { LoaderCircle } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <LoaderCircle
        size={38}
        className="animate-spin text-indigo-600"
      />

      <p className="mt-4 text-sm font-medium text-slate-500">
        Cargando libros...
      </p>
    </div>
  );
}
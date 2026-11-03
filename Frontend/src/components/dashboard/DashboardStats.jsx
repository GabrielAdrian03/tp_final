import {
    BookOpen,
    Users,
    Tags,
    Archive,
} from "lucide-react";

export default function DashboardStats({
    books,
    authors,
    generes,
    shelves,
}) {
    const stats = [
        {
            label: "Libros registrados",
            value: books,
            icon: BookOpen,
            color: "bg-indigo-50 text-indigo-600",
        },
        {
            label: "Autores",
            value: authors,
            icon: Users,
            color: "bg-blue-50 text-blue-600",
        },
        {
            label: "Géneros",
            value: generes,
            icon: Tags,
            color: "bg-violet-50 text-violet-600",
        },
        {
            label: "Estantes",
            value: shelves,
            icon: Archive,
            color: "bg-emerald-50 text-emerald-600",
        },
    ];

    return (
        <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map(({ label, value, icon: Icon, color }) => (
                <div
                    key={label}
                    className="rounded-2xl border border-slate-200 bg-red-100 p-5 shadow-sm transition hover:shadow-md"
                >
                    <div className="flex items-center justify-between gap-2">
                        <div className={`rounded-xl p-3 ${color}`}>
                            <Icon size={22} />
                        </div>

                        <span className="text-2xl font-bold text-slate-900">
                            {value}
                        </span>
                    </div>

                    <p className="mt-4 text-sm font-medium text-slate-500">
                        {label}
                    </p>
                </div>
            ))}
        </section>
    );
}

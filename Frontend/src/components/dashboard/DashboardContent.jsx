
import {
    RefreshCw,
    BookOpen,
    Users,
    Tags,
    Library,
    Archive,
} from "lucide-react";

import BookForm from "./BookForm.jsx";
import BookTable from "./BookTable.jsx";
import MasterForm from "./MasterForm.jsx";
import MasterList from "./MasterList.jsx";

const tabs = {
    books: {
        label: "Libros",
        icon: BookOpen,
    },
    authors: {
        label: "Autores",
        icon: Users,
    },
    generes: {
        label: "Géneros",
        icon: Tags,
    },
    sages: {
        label: "Sagas",
        icon: Library,
    },
    shelves: {
        label: "Estantes",
        icon: Archive,
    },
};
export default function DashboardContent({
    activeTab,
    loading,
    books,
    authors,
    generes,
    sages,
    shelves,
    editingId,
    selectedItemData,
    onBookSubmit,
    onMasterSubmit,
    onCancel,
    onBookEdit,
    onMasterEdit,
    onDelete,
}) {
    const currentTab = tabs[activeTab];
    const masterItems = {
        authors,
        generes,
        sages,
        shelves,
    };
    const items = masterItems[activeTab] || [];
    const Icon = currentTab.icon;
    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                        <Icon size={22} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            Gestión de {currentTab.label.toLowerCase()}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            {activeTab === "books"
                                ? "Registrá, editá y eliminá libros."
                                : `Administrá los registros de ${currentTab.label.toLowerCase()}.`}
                        </p>
                    </div>
                </div>
            </div>
            <div className="space-y-8 p-5 sm:p-7">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <RefreshCw
                            size={32}
                            className="animate-spin text-indigo-600"
                        />
                        <p className="mt-4 text-sm text-slate-500">
                            Cargando información...
                        </p>
                    </div>
                ) : activeTab === "books" ? (
                    <>
                        <BookForm
                            onSubmit={onBookSubmit}
                            editingId={editingId}
                            initialData={selectedItemData}
                            authors={authors}
                            generes={generes}
                            shelves={shelves}
                            sages={sages}
                            onCancel={onCancel}
                        />
                        <div className="border-t border-slate-100 pt-8">
                            <BookTable
                                books={books}
                                onEdit={onBookEdit}
                                onDelete={onDelete}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <MasterForm
                            activeTab={activeTab}
                            editingId={editingId}
                            initialName={selectedItemData?.name || ""}
                            onSubmit={onMasterSubmit}
                            onCancel={onCancel}
                        />
                        <div className="border-t border-slate-100 pt-8">
                            <MasterList
                                items={items}
                                onEdit={onMasterEdit}
                                onDelete={onDelete}
                            />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

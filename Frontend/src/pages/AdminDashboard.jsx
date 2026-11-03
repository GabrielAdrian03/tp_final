import { useEffect, useState } from "react";
import { AlertCircle, X } from "lucide-react";

import { CatalogService } from "../services/api.service.js";

import DashboardHeader from "../components/dashboard/DashboardHeader.jsx";
import DashboardTabs from "../components/dashboard/DashboardTabs.jsx";
import DashboardStats from "../components/dashboard/DashboardStats.jsx";
import DashboardContent from "../components/dashboard/DashboardContent.jsx";

export default function AdminDashboard() {
    // Estado de la pestaña activa y carga de datos
    const [activeTab, setActiveTab] = useState("books");
    //loaderror es para mostrar errores de carga de datos
    const [loadError, setLoadError] = useState("");
    //loading es para mostrar un spinner mientras se cargan los datos
    const [loading, setLoading] = useState(true);

    // Datos de libros y registros maestros
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [generes, setGeneres] = useState([]);
    const [sages, setSages] = useState([]);
    const [shelves, setShelves] = useState([]);
    //editingId es para saber si se está editando un libro o registro maestro
    const [editingId, setEditingId] = useState(null);
    const [selectedItemData, setSelectedItemData] = useState(null);

    // Cargar información
    const fetchData = async () => {
        try {
            setLoading(true);
            setLoadError("");
            const [b, a, g, s, sh] = await Promise.all([
                CatalogService.getBooks(),
                CatalogService.getItems("authors"),
                CatalogService.getItems("generes"),
                CatalogService.getItems("sages"),
                CatalogService.getItems("shelves"),
            ]);
            setBooks(b);
            setAuthors(a);
            setGeneres(g);
            setSages(s);
            setShelves(sh);
        } catch (error) {
            console.error("Error cargando el panel:", error);
            setLoadError(
                error.response?.data?.message ||
                error.message ||
                "No se pudieron cargar los datos."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    // Limpiar selección
    const resetSelection = () => {
        setEditingId(null);
        setSelectedItemData(null);
    };
    // Cambiar pestaña
    const changeTab = (tab) => {
        setActiveTab(tab);
        resetSelection();
        setLoadError("");
    };
    // Seleccionar registro para editar
    const handleEdit = (item) => {
        setEditingId(item.id);
        setSelectedItemData(item);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    // Crear o editar libro
    const handleBookSubmit = async (payload) => {
        try {
            if (editingId) {
                await CatalogService.updateBook(editingId, payload);
            } else {
                await CatalogService.createBook(payload);
            }
            resetSelection();
            await fetchData();
        } catch (error) {
            console.error("Error guardando libro:", error);
            setLoadError(
                error.response?.data?.message ||
                "No se pudo guardar el libro."
            );
        }
    };
    // Crear o editar registro maestro
    const handleMasterSubmit = async (name) => {
        try {
            if (editingId) {
                await CatalogService.updateItem(activeTab, editingId, name);
            } else {
                await CatalogService.createItem(activeTab, name);
            }
            resetSelection();
            await fetchData();
            return true;
        } catch (error) {
            console.error("Error guardando registro:", error);
            setLoadError(
                error.response?.data?.message ||
                "No se pudo guardar el registro."
            );
            return false;
        }
    };
    // Eliminar libro o registro maestro
    const handleDelete = async (id) => {
        if (!window.confirm("¿Deseas eliminar este registro?")) return;
        try {
            if (activeTab === "books") {
                await CatalogService.deleteBook(id);
            } else {
                await CatalogService.deleteItem(activeTab, id);
            }
            if (editingId === id) {
                resetSelection();
            }
            await fetchData();
        } catch (error) {
            console.error("Error eliminando registro:", error);
            setLoadError(
                error.response?.data?.message ||
                "No se pudo eliminar el registro."
            );
        }
    };
    return (
        <main className="min-h-screen bg-black px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">
                <DashboardHeader
                    loading={loading}
                    onRefresh={fetchData}
                />
                <DashboardStats
                    books={books.length}
                    authors={authors.length}
                    generes={generes.length}
                    shelves={shelves.length}
                />
                <DashboardTabs
                    activeTab={activeTab}
                    onTabChange={changeTab}
                />
                {loadError && (
                    <div
                        role="alert"
                        className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                        <AlertCircle size={20} className="shrink-0" />
                        <div className="flex-1">
                            <p className="font-semibold">
                                Ocurrió un problema
                            </p>
                            <p className="mt-1">{loadError}</p>
                        </div>
                        <button
                            onClick={() => setLoadError("")}
                            aria-label="Cerrar mensaje"
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}
                <DashboardContent
                    activeTab={activeTab}
                    loading={loading}
                    books={books}
                    authors={authors}
                    generes={generes}
                    sages={sages}
                    shelves={shelves}
                    editingId={editingId}
                    selectedItemData={selectedItemData}
                    onBookSubmit={handleBookSubmit}
                    onMasterSubmit={handleMasterSubmit}
                    onCancel={resetSelection}
                    onBookEdit={handleEdit}
                    onMasterEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </main>
    );
}

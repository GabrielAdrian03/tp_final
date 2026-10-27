import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authcontext.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <AppRoutes />
            </BrowserRouter>
        </AuthProvider>
    );
}

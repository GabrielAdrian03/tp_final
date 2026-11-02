import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("admin_token"));

    const login = (newToken) => {
        localStorage.setItem("admin_token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("admin_token"); //quita el token
        setToken(null);
        window.location.href = "/login"; //redirige al login
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAdmin: !!token }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

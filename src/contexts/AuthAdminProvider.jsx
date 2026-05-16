import { createContext, useState, useEffect } from "react";
import apiAdmin from "../lib/axios";

export const AuthAdminContext = createContext();

export const AuthAdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const res = await apiAdmin.get(`/auth/admin/protected`);
                setAdmin(res.data.data);
                setRole(res.data.data.role);
            } catch (error) {
                console.error("Admin not authenticated:", error);
                setAdmin(null);
            } finally {
                setLoading(false);
            }
        };
        checkAdmin();
    }, []);

    const logout = async () => {
        try {
            await apiAdmin.post("/auth/admin/logout");
            setAdmin(null);
        } catch (error) {
            console.error(error.response?.data?.message || "Logout failed");
        }
    };

    return (
        <AuthAdminContext.Provider
            value={{
                admin,
                role,
                loading,
                logout,
            }}
        >
            {children}
        </AuthAdminContext.Provider>
    );
};

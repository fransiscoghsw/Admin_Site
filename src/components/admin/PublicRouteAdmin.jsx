import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAdminContext } from "../../contexts/AuthAdminProvider";
import LoadingPage from "../LoadingPage";

const PublicRouteAdmin = ({ children, restrictedRoles = [] }) => {
    const { admin, role, loading } = useContext(AuthAdminContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (admin && restrictedRoles.includes(role)) {
                // Jika sudah login dan memiliki role yang dibatasi, arahkan ke dashboard admin
                navigate("/dashboard");
            }
        }
    }, [admin, role, loading, navigate, restrictedRoles]);

    if (loading) {
        return <LoadingPage />;
    }

    // Tampilkan halaman publik jika tidak ada admin yang login
    if (!admin || !restrictedRoles.includes(role)) {
        return children;
    }

    return null;
};

export default PublicRouteAdmin;

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAdminContext } from "../../contexts/AuthAdminProvider";
import LoadingPage from "../LoadingPage";

const ProtectedRouteAdmin = ({ children, requiredRoles = [] }) => {
  const { admin, role, loading } = useContext(AuthAdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!admin) {
        // Jika tidak login, arahkan ke halaman login
        navigate("/masuk");
      } else if (!requiredRoles.includes(role)) {
        // Jika role utama tidak cocok, arahkan berdasarkan role
        if (role === "Public Relation") {
          navigate("/cms/artikel");
        } else {
          navigate("/dashboard");
        }
      }
    }
  }, [admin, role, loading, navigate, requiredRoles]);

  if (loading) {
    return <LoadingPage />;
  }

  if (admin && requiredRoles.includes(role)) {
    return children;
  }

  return null;
};

export default ProtectedRouteAdmin;

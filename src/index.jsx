import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./assets/style/index.css";

import { AuthAdminProvider } from "./contexts/AuthAdminProvider";
import ProtectedRouteAdmin from "./components/admin/ProtectedRouteAdmin";

// Dashboard
import Dashboard from "./pages/Dashboard";
// Profile
import Admin from "./pages/admin/Admin";
import AdminProfil from "./pages/admin/AdminProfil";

// AUTH
import Login from "./pages/Login";
import UserLupaPassword from "./pages/UserLupaPassword";
import UserResetPassword from "./pages/UserResetPassword";

// START CMS
import Utama from "./pages/cms/halaman_depan/Utama";
import MediaSosial from "./pages/cms/halaman_depan/MediaSosial";
import Profil from "./pages/cms/tentang_kami/Profil";
import Dokumentasi from "./pages/cms/tentang_kami/Dokumentasi";
import Customer from "./pages/cms/tentang_kami/Customer";
import Partner from "./pages/cms/tentang_kami/Partner";
import Kontak from "./pages/cms/tentang_kami/Kontak";
import AdminArtikel from "./pages/cms/artikel/Index";
import ArticleDetail from "./pages/cms/artikel/ArticleDetail";
import ArticleEdit from "./pages/cms/artikel/ArticleEdit";
import ArticleAdd from "./pages/cms/artikel/ArticleAdd";
import Faq from "./pages/cms/Faq";
import Nilai from "./pages/cms/NilaiPerusahaan";
// END CMS

import PageNotFound from "./pages/PageNotFound";
import Product from "./pages/cms/Product";
import { AdminDataProvider } from "./contexts/AdminData";

const router = createBrowserRouter([
    // admin start
    {
        path: "/masuk",
        element: (
            // <AuthAdminProvider>
            //     <PublicRouteAdmin
            //         restrictedRoles={[
            //             "Admin",
            //             "Super Admin",
            //             "Public Relation",
            //             "Finance",
            //         ]}
            //     >
            <Login />
            //     </PublicRouteAdmin>
            // </AuthAdminProvider>
        ),
    },
    {
        path: "/admin/lupa-password",
        element: <UserLupaPassword />,
    },
    {
        path: "/admin/reset-password",
        element: <UserResetPassword />,
    },
    {
        path: "/dashboard",
        element: (
            <AuthAdminProvider>
                <ProtectedRouteAdmin
                    requiredRoles={[
                        "Super Admin",
                        "Admin",
                        // "Public Relation",
                        "Finance",
                    ]}
                >
                    <Dashboard />
                </ProtectedRouteAdmin>
            </AuthAdminProvider>
        ),
    },

    {
        path: "/admin/admins",
        element: (
            <AuthAdminProvider>
                <ProtectedRouteAdmin requiredRoles={["Super Admin"]}>
                    <Admin />
                </ProtectedRouteAdmin>
            </AuthAdminProvider>
        ),
    },

    {
        path: "/profil",
        element: (
            <AuthAdminProvider>
                <ProtectedRouteAdmin requiredRoles={["Super Admin", "Admin"]}>
                    <AdminDataProvider>
                        <AdminProfil />
                    </AdminDataProvider>
                </ProtectedRouteAdmin>
            </AuthAdminProvider>
        ),
    },
    {
        path: "/cms/header",
        element: (
            <AuthAdminProvider>
                <ProtectedRouteAdmin requiredRoles={["Super Admin", "Admin"]}>
                    <Utama />
                </ProtectedRouteAdmin>
            </AuthAdminProvider>
        ),
    },
    {
        path: "/cms/media-sosial",
        element: (
            <AuthAdminProvider>
                <ProtectedRouteAdmin requiredRoles={["Super Admin", "Admin"]}>
                    <MediaSosial />
                </ProtectedRouteAdmin>
            </AuthAdminProvider>
        ),
    },

    {
        path: "/cms/profil",
        element: (
            <AuthAdminProvider>
                <ProtectedRouteAdmin requiredRoles={["Super Admin", "Admin"]}>
                    <Profil />
                </ProtectedRouteAdmin>
            </AuthAdminProvider>
        ),
    },
    {
        path: "/cms/dokumentasi",
        element: (
            <AuthAdminProvider>
                <ProtectedRouteAdmin requiredRoles={["Super Admin", "Admin"]}>
                    <Dokumentasi />
                </ProtectedRouteAdmin>
            </AuthAdminProvider>
        ),
    },
    {
        path: "/cms/customer",
        element: (
            <AuthAdminProvider>
                <ProtectedRouteAdmin requiredRoles={["Super Admin", "Admin"]}>
                    <Customer />
                </ProtectedRouteAdmin>
            </AuthAdminProvider>
        ),
    },
    {
        path: "/cms/partner",
        element: (
            <AuthAdminProvider>
                <ProtectedRouteAdmin requiredRoles={["Super Admin", "Admin"]}>
                    <Partner />
                </ProtectedRouteAdmin>
            </AuthAdminProvider>
        ),
    },
    {
        path: "/cms/kontak",
        element: (
            <AuthAdminProvider>
                <ProtectedRouteAdmin requiredRoles={["Super Admin", "Admin"]}>
                    <Kontak />
                </ProtectedRouteAdmin>
            </AuthAdminProvider>
        ),
    },

    {
        path: "/cms/artikel",
        element: (
            <AuthAdminProvider>
                <ProtectedRouteAdmin requiredRoles={["Super Admin", "Admin"]}>
                    <AdminArtikel />
                </ProtectedRouteAdmin>
            </AuthAdminProvider>
        ),
    },
    {
        path: "/cms/artikel/:slug",
        element: (
            <AuthAdminProvider>
                <ProtectedRouteAdmin requiredRoles={["Super Admin", "Admin"]}>
                    <ArticleDetail />
                </ProtectedRouteAdmin>
            </AuthAdminProvider>
        ),
    },
    {
        path: "/cms/artikel/:id/edit",
        element: (
            <AuthAdminProvider>
                <ProtectedRouteAdmin requiredRoles={["Super Admin", "Admin"]}>
                    <ArticleEdit />
                </ProtectedRouteAdmin>
            </AuthAdminProvider>
        ),
    },
    {
        path: "/cms/artikel/add",
        element: (
            <AuthAdminProvider>
                <ProtectedRouteAdmin requiredRoles={["Super Admin", "Admin"]}>
                    <ArticleAdd />
                </ProtectedRouteAdmin>
            </AuthAdminProvider>
        ),
    },

    {
        path: "/cms/faq",
        element: (
            <AuthAdminProvider>
                <ProtectedRouteAdmin requiredRoles={["Super Admin", "Admin"]}>
                    <Faq />
                </ProtectedRouteAdmin>
            </AuthAdminProvider>
        ),
    },
    {
        path: "/cms/nilai-perusahaan",
        element: (
            <AuthAdminProvider>
                <ProtectedRouteAdmin requiredRoles={["Super Admin", "Admin"]}>
                    <Nilai />
                </ProtectedRouteAdmin>
            </AuthAdminProvider>
        ),
    },
    {
        path: "/cms/product",
        element: (
            <AuthAdminProvider>
                <ProtectedRouteAdmin requiredRoles={["Super Admin", "Admin"]}>
                    <Product />
                </ProtectedRouteAdmin>
            </AuthAdminProvider>
        ),
    },
    {
        path: "/admin/halaman-depan/profil",
        element: (
            <AuthAdminProvider>
                <ProtectedRouteAdmin requiredRoles={["Super Admin", "Admin"]}>
                    <Profil />
                </ProtectedRouteAdmin>
            </AuthAdminProvider>
        ),
    },
    // admin end
    {
        path: "*",
        element: <PageNotFound />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HelmetProvider>
            <RouterProvider router={router} />
        </HelmetProvider>
    </React.StrictMode>,
);

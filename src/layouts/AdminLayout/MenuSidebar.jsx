import { LuLayoutDashboard } from "react-icons/lu";
import {
    PiBrowsers,
    PiUserCircleGear,
    PiHouse,
    PiQuestion,
    PiArticle,
    PiStar,
    PiFarm,
} from "react-icons/pi";

export const menuItems = [
    {
        name: "Dashboard",
        path: "/dashboard",
        roles: ["Super Admin", "Admin", "Finance"],
        icon: (
            <LuLayoutDashboard className="flex-shrink-0 w-7 h-7 text-white " />
        ),
    },
    {
        name: "Admin",
        roles: ["Super Admin", "Admin"],
        icon: (
            <PiUserCircleGear className="flex-shrink-0 w-7 h-7 text-white " />
        ),
        subMenu: [
            {
                name: "Admins",
                path: "/admin/admins",
                roles: ["Super Admin"],
            },
        ],
    },
    {
        name: "CMS",
        roles: ["Super Admin", "Admin"],
        icon: <PiBrowsers className="flex-shrink-0 w-7 h-7 text-white " />,
        subMenu: [
            {
                name: "Home",
                roles: ["Super Admin", "Admin"],
                icon: <PiHouse className="flex-shrink-0 w-7 h-7 text-white " />,
                subMenu: [
                    {
                        name: "Header",
                        path: "/cms/header",
                        roles: ["Super Admin", "Admin"],
                    },
                    {
                        name: "Media Sosial",
                        path: "/cms/media-sosial",
                        roles: ["Super Admin", "Admin"],
                    },
                ],
            },
            // {
            //     name: "Artikel",
            //     path: "/cms/artikel",
            //     roles: ["Super Admin", "Admin"],
            //     icon: (
            //         <PiArticle className="flex-shrink-0 w-7 h-7 text-white " />
            //     ),
            // },
            {
                name: "Tentang Kami",
                roles: ["Super Admin", "Admin"],
                icon: <PiHouse className="flex-shrink-0 w-7 h-7 text-white " />,
                subMenu: [
                    {
                        name: "Profil",
                        path: "/cms/profil",
                        roles: ["Super Admin", "Admin"],
                    },
                    {
                        name: "Dokumentasi",
                        path: "/cms/dokumentasi",
                        roles: ["Super Admin", "Admin"],
                    },
                    {
                        name: "Customer",
                        path: "/cms/customer",
                        roles: ["Super Admin", "Admin"],
                    },
                    {
                        name: "Partner",
                        path: "/cms/partner",
                        roles: ["Super Admin", "Admin"],
                    },
                    {
                        name: "Dokumen",
                        path: "/cms/dokumen",
                        roles: ["Super Admin", "Admin"],
                    },
                    {
                        name: "Kontak",
                        path: "/cms/kontak",
                        roles: ["Super Admin", "Admin"],
                    },
                ],
            },
            {
                name: "Nilai Perusahaan",
                path: "/cms/nilai-perusahaan",
                roles: ["Super Admin", "Admin"],
                icon: <PiStar className="flex-shrink-0 w-7 h-7 text-white " />,
            },
            {
                name: "FAQ",
                path: "/cms/faq",
                roles: ["Super Admin", "Admin"],
                icon: (
                    <PiQuestion className="flex-shrink-0 w-7 h-7 text-white " />
                ),
            },
            {
                name: "Produk",
                path: "/cms/product",
                roles: ["Super Admin", "Admin"],
                icon: <PiFarm className="flex-shrink-0 w-7 h-7 text-white " />,
            },
        ],
    },
];

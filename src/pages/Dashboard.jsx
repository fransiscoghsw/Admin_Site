import AdminLayout from "../layouts/AdminLayout";
// import { getAdmins } from "../services/admin.service";
// import { getFaqs } from "../services/faq.service";
// import { getAllProduct } from "../services/product.service";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// import {
//     PiChartLineUpBold,
//     PiShoppingBagBold,
//     PiUsersBold,
// } from "react-icons/pi";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

ChartJS.defaults.font.family = "Quicksand, sans-serif";

// const StatCard = ({ title, total, icon, link, color }) => {
//     return (
//         <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
//             <div className="flex items-center justify-between">
//                 <div>
//                     <Link
//                         to={link}
//                         className="text-gray-500 text-sm font-medium hover:text-black transition"
//                     >
//                         {title}
//                     </Link>

//                     <h2 className="text-3xl font-bold text-gray-800 mt-2">
//                         {total}
//                     </h2>
//                 </div>

//                 <div
//                     className={`w-16 h-16 rounded-2xl flex items-center justify-center ${color}`}
//                 >
//                     {icon}
//                 </div>
//             </div>
//         </div>
//     );
// };

const AdminDashboard = () => {
    // const [admins, setAdmins] = useState([]);
    // const [faqs, setFaqs] = useState([]);
    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const adminData = await getAdmins();
    //             console.log("ADMINS :", adminData);
    //             setAdmins(adminData);

    //             const faqData = await getFaqs();
    //             console.log("FAQS :", faqData);
    //             setFaqs(faqData);

    //             const productData = await getAllProduct();
    //             console.log("PRODUCTS :", productData);
    //             setProducts(productData);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    return (
        <AdminLayout pageTitle={"Halaman Beranda"}>
            <div className="space-y-8">
                {/* Header */}
                {/* <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Dashboard Admin
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Selamat datang kembali 👋
                    </p>
                </div> */}

                {/* Statistik */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Admin"
                        total={admins.length}
                        link="/admin"
                        color="bg-blue-100 text-blue-600"
                        icon={<PiChartLineUpBold className="text-3xl" />}
                    />

                    <StatCard
                        title="Total FAQ"
                        total={faqs.length}
                        link="/faqs"
                        color="bg-green-100 text-green-600"
                        icon={<PiUsersBold className="text-3xl" />}
                    />

                    <StatCard
                        title="Total Produk"
                        total={products.length}
                        link="/cms/produk"
                        color="bg-purple-100 text-purple-600"
                        icon={<PiShoppingBagBold className="text-3xl" />}
                    />
                </div> */}
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;

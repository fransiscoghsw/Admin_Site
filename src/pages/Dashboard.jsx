import AdminLayout from "../layouts/AdminLayout";
import { getArticles } from "../services/article.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { PiArticleNyTimesBold } from "react-icons/pi";

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
ChartJS.defaults.font.color = "red";

const AdminDashboard = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getArticles((data) => {
            setArticles(data);
        });
    }, []);

    // Filter investments based on selected titles

    return (
        <AdminLayout pageTitle={"Halaman Beranda"}>
            <div className="flex gap-10">
                <div className="w-[65%]">
                    <div className="bg-[#F5F5F7] rounded-xl py-4 px-6 shadow-md">
                        <div className="flex font-semibold py-6">
                            <div className="flex w-1/3 justify-center items-center gap-5">
                                <div className="bg-white w-14 h-14 p-3 rounded-full overflow-hidden">
                                    <PiArticleNyTimesBold className="w-full h-full" />
                                </div>
                                <div>
                                    <Link
                                        to={"/cms/artikel"}
                                        className="text-lg hover:underline"
                                    >
                                        Total Artikel
                                    </Link>
                                    <p className="text-2xl">
                                        {articles.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;

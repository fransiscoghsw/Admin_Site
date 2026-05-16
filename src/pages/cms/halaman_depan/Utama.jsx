import AdminLayout from "../../../layouts/AdminLayout";
import { showToast } from "../../../utils/toast";
import {
    getDashboardFrontpage,
    saveDashboardFrontpage,
} from "../../../services/dashboard-frontpage.service";
import { useEffect, useState } from "react";
import Form from "../../../components/form/Form";

const Utama = () => {
    // const [header, setHeader] = useState([]);
    const [currentData, setCurrentData] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await getDashboardFrontpage();

            setCurrentData(data);
        } catch (error) {
            console.log("Error fetching datas:", error);
        }
    };

    // START CRUD Operations
    const handleUpsert = (header) => {
        setCurrentData(header);
    };

    // Input Validations: End
    const handleSubmit = async (formData) => {
        try {
            if (currentData) {
                await saveDashboardFrontpage(formData);
                showToast("Master E-Commerce berhasil diperbaharui");
            } else {
                await saveDashboardFrontpage(formData);
                showToast("Master E-Commerce berhasil ditambahkan");
            }
            await loadData();
        } catch (error) {
            console.error("Error creating/updating unit:", error);
        }
    };

    const formFields = [
        {
            label: "Upload Gambar",
            name: "image",
            type: "image",
        },
        {
            label: "Judul",
            name: "title",
            type: "text",
        },
        {
            label: "Sub Judul",
            name: "subTitle",
            type: "text",
        },
    ];

    return (
        <AdminLayout pageTitle={"Halaman Depan / Utama"}>
            <Form
                // title={currentData ? "Edit Master Unit" : "Tambah Master Unit"}
                fields={formFields}
                initialData={currentData}
                onSubmit={handleSubmit}
                onClose={handleUpsert}
                initialImage={
                    currentData
                        ? `${import.meta.env.VITE_API_URL}/homepage/image/${
                              currentData.image
                          }`
                        : null
                }
            />
        </AdminLayout>
    );
};

export default Utama;

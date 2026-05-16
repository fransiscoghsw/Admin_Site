import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import Label from "../common/Label";
import Input from "../common/Input";
import InputError from "../common/InputError";
import Alert from "../common/Alert";
import ActionButton from "../common/ActionButton";
import { showToast } from "../../utils/toast";
import Modal from "../admin/Modal";
import { PiPlus, PiMinusBold } from "react-icons/pi";
import { getProductById } from "../../services/product.service";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ProductForm = ({ initialData = {}, onSubmit, onClose }) => {
    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: null,
    });

    // Reset form data setiap kali initialData berubah
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                // Set data awal
                setFormData({
                    name: initialData?.name || "",
                    description: initialData?.description || "",
                    image: null,
                });
            } catch (error) {
                console.error("Gagal mengambil data produk:", error);
            }
        };

        fetchProductData();
    }, [initialData]);

    // Validation function
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = "Nama produk wajib diisi";
        }
        if (!formData.description.trim()) {
            newErrors.description = "Deskripsi produk wajib diisi";
        }
        if (!formData.image) {
            newErrors.image = "Gambar produk wajib diupload";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // ambil file pertama dari input
        setFormData((prevData) => ({
            ...prevData,
            image: file, // simpan file di formData
        }));

        // jika ingin membuat preview gambar
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        if (file) reader.readAsDataURL(file);
    };

    // Form handling

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Hapus error jika input sudah diperbaiki
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleQuillChange = (value, field) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);

        // Tambahkan gambar ke FormData
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        // Kirim form data dengan FormData
        onSubmit(formDataToSend);
        onClose();
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "clean"],
        ],
    };

    return (
        <div>
            <Modal.Header title={"Tambah Akun Admin"} onClose={onClose} />
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="name" value="Nama Produk" />
                        <Input
                            type="text"
                            name="name"
                            placeholder="Masukkan nama produk.."
                            variant="primary-outline"
                            value={formData.name}
                            handleChange={handleChange}
                            isError={!!errors.name}
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div>
                        <Label htmlFor="description" value="Deskripsi Produk" />
                        <ReactQuill
                            theme="snow"
                            value={formData.description}
                            onChange={(value) =>
                                handleQuillChange(value, "description")
                            }
                            modules={modules}
                            className={`bg-white ${
                                errors.description
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div>
                        <Label htmlFor="image" value="Gambar Produk" />
                        <Input
                            type="file"
                            name="image"
                            accept="image/*"
                            variant="primary-outline"
                            handleChange={handleFileChange}
                            isError={!!errors.image}
                        />
                        <InputError message={errors.image} />
                        {previewImage && (
                            <div className="mt-2">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-20 h-20 object-cover rounded"
                                    onError={(e) => {
                                        e.target.src = "/placeholder-image.png"; // Gambar placeholder jika error
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer
                action={initialData ? "Ubah" : "Tambah"}
                onAction={handleSubmit}
                onClose={onClose}
            />
        </div>
    );
};

export default ProductForm;

import Button from "../../components/common/Button.jsx";
import Label from "../../components/common/Label.jsx";
import Input from "../../components/common/Input.jsx";
import InputError from "../../components/common/InputError.jsx";
import Modal from "../../components/common/Modal.jsx";
import NilaiList from "../../components/admin/NilaiList.jsx";
import AdminLayout from "../../layouts/AdminLayout/index.jsx";
import { showToast } from "../../utils/toast.js";
import {
    getNilaiNilais,
    addNilaiNilai,
    updateNilaiNilai,
    deleteNilaiNilai,
} from "../../services/nilainilai.service.js";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PiPlus } from "react-icons/pi";

const NilaiPerusahaan = () => {
    const [nilais, setNilais] = useState([]);
    const [formData, setFormData] = useState({
        judul: "",
        gambar: null,
    });
    const [selectedNilai, setSelectedNilai] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    const [filteredNilais, setFilteredNilais] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [errors, setErrors] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");

    useEffect(() => {
        getNilaiNilais((data) => {
            setNilais(data);
            setFilteredNilais(data);
        });
    }, []);

    // Input Validation: Start
    const validateForm = () => {
        let newErrors = {};
        if (!formData.gambar && modalType === "add_nilai") {
            newErrors.gambar = "Gambar nilai wajib diunggah";
        }
        if (!formData.judul.trim()) {
            newErrors.judul = "Judul nilai wajib diisi";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const clearError = (fieldName) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[fieldName];
            return newErrors;
        });
    };
    // Input Validation: End

    // CRUD: Start
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const validTypes = [
                "image/svg+xml",
                "image/png",
                "image/jpeg",
                "image/jpg",
            ];
            if (validTypes.includes(file.type)) {
                setFormData({ ...formData, gambar: file });
                setPreviewImage(URL.createObjectURL(file));
                clearError("gambar");
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    gambar: "Gambar nilai harus berupa SVG, PNG, JPG, atau JPEG",
                }));

                e.target.value = null;
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (!value.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: `${
                    name.charAt(0).toUpperCase() + name.slice(1)
                } nilai wajib diisi`,
            }));
        } else {
            clearError(name);
        }
    };

    const handleAddNilai = () => {
        if (validateForm()) {
            const form = new FormData();
            form.append("judul", formData.judul);
            form.append("gambar", formData.gambar);

            addNilaiNilai(form, (response) => {
                setNilais([...nilais, response]);
                closeModal();
                showToast("Nilai berhasil ditambahkan");
            });
        }
    };

    const handleUpdateNilai = () => {
        if (validateForm()) {
            const form = new FormData();
            form.append("judul", formData.judul);
            if (formData.gambar instanceof File) {
                form.append("gambar", formData.gambar);
            }

            updateNilaiNilai(selectedNilai.id, form, (updateData) => {
                setNilais((prevNilais) =>
                    prevNilais.map((item) =>
                        item.id === updateData.id ? updateData : item,
                    ),
                );
                closeModal();
                showToast("Nilai berhasil diubah");
            });
        }
    };

    const handleDeleteNilai = () => {
        deleteNilaiNilai(selectedNilai.id, () => {
            setNilais(nilais.filter((nilai) => nilai.id !== selectedNilai.id));
            closeModal();
            showToast("Nilai berhasil dihapus");
        });
    };
    // CRUD: End

    // Search: Start
    const searchQuery = searchParams.get("search") || "";

    useEffect(() => {
        if (searchQuery) {
            const filtered = nilais.filter((nilai) =>
                nilai.judul.toLowerCase().includes(searchQuery.toLowerCase()),
            );
            setFilteredNilais(filtered);
        } else {
            setFilteredNilais(nilais);
        }
    }, [searchQuery, nilais]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        if (value) {
            setSearchParams({ search: value });
        } else {
            setSearchParams({});
        }
    };
    // Search: End

    // Modal: Start
    const openModal = (type, nilai = null) => {
        setModalType(type);
        setIsModalOpen(true);
        if (type === "update_nilai" && nilai) {
            setSelectedNilai(nilai);
            setFormData({
                judul: nilai.judul,
                gambar: nilai.gambar,
            });
            setPreviewImage(
                `${import.meta.env.VITE_API_URL}/nilai-nilai-perusahaan/image/${nilai.gambar}`,
            );
        } else if (type === "delete_nilai" && nilai) {
            setSelectedNilai(nilai);
        }
    };

    const closeModal = () => {
        setModalType("");
        setIsModalOpen(false);
        resetForm();
        setErrors({});
    };

    const resetForm = () => {
        setFormData({
            judul: "",
            gambar: null,
        });
        setPreviewImage("");
        setSelectedNilai(null);
    };
    // Modal: End

    return (
        <AdminLayout pageTitle={"Tentang Kami / Nilai"}>
            <div className="flex flex-col">
                <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
                    <div className="flex mb-6 justify-between">
                        <div className="max-w-md grow">
                            <div className="flex rounded-2xl shadow">
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 start-1 flex items-center ps-3 pointer-events-none">
                                        <svg
                                            className="w-4 h-4 text-gray-500"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                            />
                                        </svg>
                                    </div>

                                    <input
                                        type="text"
                                        className="block p-2.5 w-full z-20 ps-11 text-gray-900 bg-gray-50 rounded-2xl  border border-gray-300 focus:ring-[#B87817] focus:border-[#B87817] focus:outline-none"
                                        placeholder="Masukkan judul nilai ..."
                                        value={searchQuery}
                                        onChange={(e) => handleSearchChange(e)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            variant="create"
                            size="md"
                            onClick={() => openModal("add_nilai")}
                        >
                            <PiPlus className="w-5 h-5" />
                            Tambah
                        </Button>

                        {/* MODAL */}
                        <Modal
                            open={isModalOpen}
                            onClose={closeModal}
                            size={modalType === "delete_nilai" ? "sm" : ""}
                        >
                            {(modalType === "add_nilai" ||
                                modalType === "update_nilai") && (
                                <>
                                    <Modal.Header
                                        title={
                                            modalType === "add_nilai"
                                                ? "Tambah Nilai"
                                                : "Ubah Nilai"
                                        }
                                        onClose={closeModal}
                                    />
                                    <Modal.Body>
                                        <Label
                                            htmlFor={"gambar"}
                                            value={"Gambar"}
                                        />
                                        <div className="mb-4">
                                            <div
                                                className={`flex flex-col items-center justify-center w-full py-4 h-full border-2 rounded-2xl bg-gray-50 shadow ${
                                                    errors.gambar
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                }`}
                                            >
                                                {previewImage && (
                                                    <img
                                                        src={previewImage}
                                                        alt="Preview"
                                                        className="object-top w-56 h-52 mb-4 object-cover rounded-xl border-2 border-gray-300"
                                                    />
                                                )}

                                                <label
                                                    htmlFor="gambar"
                                                    className={`flex flex-col items-center justify-center w-full cursor-pointer ${
                                                        !previewImage && "h-32"
                                                    }`}
                                                >
                                                    <div className="flex flex-col items-center justify-center">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <svg
                                                                className="w-8 h-8 text-gray-500 dark:text-gray-400"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 20 16"
                                                            >
                                                                <path
                                                                    stroke="currentColor"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                                />
                                                            </svg>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                <span className="font-semibold">
                                                                    Unggah
                                                                    gambar di
                                                                    sini
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            SVG, PNG, JPG atau
                                                            JPEG
                                                        </p>
                                                    </div>
                                                    <input
                                                        id="gambar"
                                                        type="file"
                                                        className="hidden"
                                                        onChange={
                                                            handleFileChange
                                                        }
                                                        accept=".svg,.png,.jpg,.jpeg"
                                                    />
                                                </label>
                                            </div>
                                            <InputError
                                                message={errors.gambar}
                                            />
                                        </div>

                                        <Label
                                            htmlFor={"judul"}
                                            value={"Judul"}
                                        />
                                        <Input
                                            type={"text"}
                                            name={"judul"}
                                            placeholder={
                                                "Masukkan judul gambar.."
                                            }
                                            variant={"primary-outline"}
                                            value={formData.judul}
                                            handleChange={handleInputChange}
                                            isError={!!errors.judul}
                                        />
                                        <InputError message={errors.judul} />
                                    </Modal.Body>
                                    <Modal.Footer
                                        action={
                                            modalType === "add_nilai"
                                                ? "Tambah"
                                                : "Ubah"
                                        }
                                        onAction={
                                            modalType === "add_nilai"
                                                ? handleAddNilai
                                                : handleUpdateNilai
                                        }
                                        onClose={closeModal}
                                    />
                                </>
                            )}

                            {modalType === "delete_nilai" && (
                                <>
                                    <Modal.Header
                                        title="Hapus Nilai"
                                        onClose={closeModal}
                                    />
                                    <Modal.Body>
                                        <p>
                                            Apakah Anda yakin ingin menghapus
                                            nilai ini?
                                        </p>
                                    </Modal.Body>
                                    <Modal.Footer
                                        action="Hapus"
                                        onAction={handleDeleteNilai}
                                        onClose={closeModal}
                                    />
                                </>
                            )}
                        </Modal>
                    </div>

                    <NilaiList nilais={filteredNilais} openModal={openModal} />
                </div>
            </div>
        </AdminLayout>
    );
};

export default NilaiPerusahaan;

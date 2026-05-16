import Button from "../../../components/common/Button";
import { useState, useEffect } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import {
    getAbouts,
    getAboutSejarahs,
    getFounder,
} from "../../../services/about.service";

import {
    getFounders,
    addFounder,
    updateFounder,
    deleteFounder,
} from "../../../services/founder.service";
import apiAdmin from "../../../lib/axios";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { PiNotePencil, PiPlus, PiTrash } from "react-icons/pi";

const Profil = () => {
    // Define these at the top of your file, outside the component
    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    const quillFormats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "background",
        "script",
        "list",
        "bullet",
        "indent",
        "direction",
        "align",
        "blockquote",
        "code-block",
        "link",
        "image",
        "video",
    ];

    const [formData, setFormData] = useState({
        judul: "",
        judul_en: "",
        image_background: null,
        deskripsi_tentang_kami: "",
        deskripsi_tentang_kami_en: "",
    });

    const [sejarahData, setSejarahData] = useState({
        judul_sejarah: "",
        judul_sejarah_en: "",
        deskripsi_sejarah: "",
        deskripsi_sejarah_en: "",
    });

    const [founders, setFounders] = useState([]);
    const [formFounder, setFormFounder] = useState({
        nama: "",
        jabatan: "",
        jabatanEn: "",
        deskripsi: "",
        deskripsiEn: "",
        gambar: null,
    });
    const [showFormFounder, setShowFormFounder] = useState(false);
    const [selectedFounder, setSelectedFounder] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [founderData, setFounderData] = useState([]);
    const [editMode, setEditMode] = useState({
        tentangKami: false,
        sejarah: false,
        founder: false,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [imagePreviewFounder, setImagePreviewFounder] = useState({});
    const [imagePreviewForm, setImagePreviewForm] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [founderToDelete, setFounderToDelete] = useState(null);

    useEffect(() => {
        getAbouts((data) => {
            setFormData({
                judul: data.judul || "",
                judul_en: data.judulEn || "", // Perhatikan mapping dari judulEn ke judul_en
                image_background: data.image_background || "",
                deskripsi_tentang_kami: data.deskripsi || "",
                deskripsi_tentang_kami_en: data.deskripsiEn || "",
            });
            setImagePreview(
                `${import.meta.env.VITE_API_URL}/tentang-kami/image/${
                    data.image_background
                }`,
            );
        });

        getAboutSejarahs((data) => {
            setSejarahData({
                judul_sejarah: data.judul || "",
                judul_sejarah_en: data.judulEn || "",
                deskripsi_sejarah: data.deskripsi || "",
                deskripsi_sejarah_en: data.deskripsiEn || "",
            });
        });

        getFounder((data) => {
            const foundersData = data.data.map((founder) => ({
                nama: founder.nama || "",
                jabatan: founder.jabatan || "",
                jabatan_en: founder.jabatanEn || "",
                deskripsi_founder: founder.deskripsi || "",
                deskripsi_founder_en: founder.deskripsiEn || "",
                gambar: founder.gambar || null,
                gambarPreview: `${import.meta.env.VITE_API_URL}/founder/image/${
                    founder.gambar
                }`,
                id: founder.id || null,
            }));
            setFounderData(foundersData);
        });
    }, []);

    useEffect(() => {
        // Mengambil data founder dan URL gambar
        getFounders(async (data) => {
            setFounders(data);

            // Ambil preview gambar untuk setiap founder
            const previews = {};
            for (const founder of data) {
                if (founder.gambar) {
                    try {
                        const imageUrl = `${
                            import.meta.env.VITE_API_URL
                        }/founder/image/${founder.gambar}`;
                        previews[founder.id] = imageUrl;
                    } catch (error) {
                        console.error(
                            `Error fetching image for founder with id ${founder.id}:`,
                            error,
                        );
                    }
                }
            }
            setImagePreviewFounder(previews);
        });
    }, []);

    const handleToggleFormFounder = () => {
        setShowFormFounder(!showFormFounder);
    };

    const handleFounderInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "gambar" && files.length > 0) {
            const file = files[0];
            setImagePreviewForm(URL.createObjectURL(file)); // Set preview URL
            setFormFounder({ ...formFounder, [name]: file });
        } else {
            setFormFounder({ ...formFounder, [name]: value });
        }
    };

    const handleAddFounder = () => {
        const form = new FormData();
        form.append("nama", formFounder.nama);
        form.append("jabatan", formFounder.jabatan);
        form.append("jabatanEn", formFounder.jabatanEn);
        form.append("deskripsi", formFounder.deskripsi);
        form.append("deskripsiEn", formFounder.deskripsiEn);
        form.append("gambar", formFounder.gambar);

        addFounder(form, (response) => {
            // Perbarui daftar founders
            setFounders([response, ...founders]);

            // Perbarui imagePreviewFounder dengan URL gambar yang baru
            setImagePreviewFounder((prev) => ({
                ...prev,
                [response.id]: `${import.meta.env.VITE_API_URL}/founder/image/${
                    response.gambar
                }`,
            }));

            // Reset form
            setFormFounder({
                nama: "",
                jabatan: "",
                jabatanEn: "",
                deskripsi: "",
                deskripsiEn: "",
                gambar: null,
            });
            setImagePreviewForm(null);

            // Tutup form
            setShowFormFounder(false);
        });
    };

    const handleEditFounder = (founder) => {
        setSelectedFounder(founder.id);
        setIsEditing(true);
        setFormFounder({
            nama: founder.nama,
            jabatan: founder.jabatan,
            jabatanEn: founder.jabatanEn,
            deskripsi: founder.deskripsi,
            deskripsiEn: founder.deskripsiEn,
            gambar: founder.gambar,
        });
    };

    // Fungsi untuk menangani update founder
    const handleUpdateFounders = (id) => {
        const form = new FormData();
        form.append("nama", formFounder.nama);
        form.append("jabatan", formFounder.jabatan);
        form.append("jabatanEn", formFounder.jabatanEn);
        form.append("deskripsi", formFounder.deskripsi);
        form.append("deskripsiEn", formFounder.deskripsiEn);
        if (formFounder.gambar instanceof File) {
            form.append("gambar", formFounder.gambar);
        }

        // Update founder API
        updateFounder(id, form, (updateData) => {
            setFounders((prevFounders) =>
                prevFounders.map((item) =>
                    item.id === updateData.id ? updateData : item,
                ),
            );
        });

        // Reset state setelah penyimpanan
        setIsEditing(false);
        setSelectedFounder(null);
    };

    const handleChange = (name, index = null, editor = null) => {
        // Handling ReactQuill input
        if (editor) {
            const value = editor.getHTML();

            if (
                [
                    "deskripsi_tentang_kami",
                    "deskripsi_tentang_kami_en",
                ].includes(name)
            ) {
                setFormData((prevData) => ({ ...prevData, [name]: value }));
            } else if (
                ["deskripsi_sejarah", "deskripsi_sejarah_en"].includes(name)
            ) {
                setSejarahData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            } else if (name === "deskripsi_founder" && index !== null) {
                const updatedFounderData = [...founderData];
                updatedFounderData[index] = {
                    ...updatedFounderData[index],
                    [name]: value,
                };
                setFounderData(updatedFounderData);
            }
            return;
        }

        // Handling standard HTML input
        const { value, files } = name.target;
        const inputName = name.target.name;

        if (files && files[0]) {
            const file = files[0];
            if (inputName === "image_background") {
                setFormData((prevData) => ({ ...prevData, [inputName]: file }));
                handleImagePreview(file, setImagePreview);
            } else if (inputName === "gambar" && index !== null) {
                const updatedFounderData = [...founderData];
                updatedFounderData[index] = {
                    ...updatedFounderData[index],
                    gambar: file,
                    gambarPreview: URL.createObjectURL(file),
                };
                setFounderData(updatedFounderData);
            }
        } else {
            // Handle text inputs for Tentang Kami
            if (
                [
                    "judul",
                    "judul_en",
                    "deskripsi_tentang_kami",
                    "deskripsi_tentang_kami_en",
                ].includes(inputName)
            ) {
                setFormData((prevData) => ({
                    ...prevData,
                    [inputName]: value,
                }));
            }
            // Handle text inputs for Sejarah
            else if (
                [
                    "judul_sejarah",
                    "judul_sejarah_en",
                    "deskripsi_sejarah",
                    "deskripsi_sejarah_en",
                ].includes(inputName)
            ) {
                setSejarahData((prevData) => ({
                    ...prevData,
                    [inputName]: value,
                }));
            }
            // Handle Founder inputs
            else if (
                inputName === "nama" ||
                inputName === "jabatan" ||
                inputName === "deskripsi_founder"
            ) {
                if (index === null) {
                    setFounderData((prevData) => [
                        ...prevData,
                        {
                            nama: inputName === "nama" ? value : "",
                            jabatan: inputName === "jabatan" ? value : "",
                            deskripsi_founder:
                                inputName === "deskripsi_founder" ? value : "",
                            gambar: null,
                            gambarPreview: null,
                        },
                    ]);
                } else {
                    const updatedFounderData = [...founderData];
                    updatedFounderData[index] = {
                        ...updatedFounderData[index],
                        [inputName]: value,
                    };
                    setFounderData(updatedFounderData);
                }
            }
        }
    };

    const handleImagePreview = (file, setPreview) => {
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleDeleteClick = (founder) => {
        setFounderToDelete(founder);
        setShowConfirmDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (!founderToDelete) return;

        try {
            setIsDeleting(true);
            await deleteFounder(founderToDelete.id);

            setFounders((prevData) => {
                const updatedData = prevData.filter(
                    (founder) => founder.id !== founderToDelete.id,
                );
                return updatedData;
            });
        } catch (error) {
            console.error("Error deleting founder:", error);
        } finally {
            setIsDeleting(false);
            setShowConfirmDialog(false);
            setFounderToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmDialog(false);
        setFounderToDelete(null);
    };

    const handleEdit = (section, index = null) => {
        if (section === "founder") {
            if (index === null) {
                // Menambahkan founder baru
                setFounderData((prevData) => [
                    ...prevData,
                    {
                        nama: "",
                        jabatan: "",
                        deskripsi_founder: "",
                        gambar: null,
                        gambarPreview: null,
                    },
                ]);
                setCurrentFounderIndex(founderData.length); // Menetapkan index founder baru
            } else {
                setCurrentFounderIndex(index); // Mengatur index jika mengedit founder yang ada
            }
            setEditMode((prevMode) => ({ ...prevMode, [section]: true }));
            setActionType(index === null ? "create" : "update");
        } else {
            setEditMode((prevMode) => ({ ...prevMode, [section]: true }));
            setActionType("create");
        }
    };

    const handleSaveTentangKami = async () => {
        const form = new FormData();

        form.append("judul", formData.judul);
        form.append("judulEn", formData.judul_en); // Make sure this matches your state
        form.append("deskripsi", formData.deskripsi_tentang_kami);
        form.append("deskripsiEn", formData.deskripsi_tentang_kami_en);

        if (formData.image_background) {
            form.append("image_background", formData.image_background);
        }

        try {
            const response = await apiAdmin.post("/tentang-kami", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("API Response:", response.data);
            console.log("State formData:", formData);
            console.log("Form data being sent:", Object.fromEntries(form));
            setEditMode((prevMode) => ({ ...prevMode, tentangKami: false }));
        } catch (error) {
            console.error("Error saving Tentang Kami:", error);
        }
    };

    const handleSaveSejarah = async () => {
        const form = new FormData();
        console.log("Data sebelum dikirim:", sejarahData);
        form.append("judul", sejarahData.judul_sejarah);
        form.append("deskripsi", sejarahData.deskripsi_sejarah);
        form.append("judulEn", sejarahData.judul_sejarah_en);
        form.append("deskripsiEn", sejarahData.deskripsi_sejarah_en);

        try {
            // Menggunakan instance apiAdmin untuk mengirimkan request
            await apiAdmin.post("/sejarah", form, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Reset edit mode after save
            setEditMode((prevMode) => ({ ...prevMode, sejarah: false }));
        } catch (error) {
            console.error("Error saving Sejarah:", error);
        }
    };

    return (
        <AdminLayout pageTitle={"Tentang Kami / Profil"}>
            <div className="flex flex-col space-y-8">
                {/* Tentang Kami */}
                <Section
                    title="Profil"
                    formData={formData}
                    editMode={editMode.tentangKami}
                    handleEdit={() => handleEdit("tentangKami")}
                    handleSave={() => handleSaveTentangKami()} // Panggil handleSaveTentangKami
                    handleChange={handleChange}
                    imagePreview={imagePreview}
                    imageFieldName="image_background"
                    textAreaFieldName="deskripsi_tentang_kami"
                    textAreaFieldNameEn="deskripsi_tentang_kami_en"
                />

                <Section
                    title="Sejarah"
                    formData={sejarahData}
                    editMode={editMode.sejarah}
                    handleEdit={() => handleEdit("sejarah")}
                    handleSave={() => handleSaveSejarah()} // Panggil handleSaveSejarah
                    handleChange={handleChange}
                    textAreaFieldName="deskripsi_sejarah"
                    textAreaFieldNameEn="deskripsi_sejarah_en"
                />

                {/* Founder */}
                <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
                    <div className="flex flex-col md:flex-row md:justify-between mb-5">
                        <h1 className="font-bold text-[#000080] text-xl mb-2 md:mb-0">
                            Founder
                        </h1>

                        <Button
                            variant={
                                showFormFounder ? "primary_outline" : "create"
                            }
                            size="md"
                            onClick={handleToggleFormFounder}
                        >
                            {showFormFounder ? null : (
                                <PiPlus className="w-5 h-5 shrink-0" />
                            )}
                            {showFormFounder ? "Tutup Form" : "Tambah"}
                        </Button>
                    </div>

                    {showFormFounder && (
                        <div className="mb-6">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Nama Founder
                                </label>
                                <input
                                    type="text"
                                    name="nama"
                                    placeholder="Masukkan nama founder.."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#000080]"
                                    onChange={handleFounderInputChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Jabatan Founder
                                </label>
                                <input
                                    type="text"
                                    name="jabatan"
                                    placeholder="Masukkan jabatan founder.."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#000080]"
                                    onChange={handleFounderInputChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Deskripsi Founder
                                </label>
                                <ReactQuill
                                    value={formFounder.deskripsi || ""}
                                    onChange={(
                                        content,
                                        delta,
                                        source,
                                        editor,
                                    ) => {
                                        setFormFounder({
                                            ...formFounder,
                                            deskripsi: editor.getHTML(),
                                        });
                                    }}
                                    modules={quillModules}
                                    formats={quillFormats}
                                    className="bg-white"
                                />
                            </div>

                            {/* Add an English description field with ReactQuill */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Deskripsi Founder (Bahasa Inggris)
                                </label>
                                <ReactQuill
                                    value={formFounder.deskripsiEn || ""}
                                    onChange={(
                                        content,
                                        delta,
                                        source,
                                        editor,
                                    ) => {
                                        setFormFounder({
                                            ...formFounder,
                                            deskripsiEn: editor.getHTML(),
                                        });
                                    }}
                                    modules={quillModules}
                                    formats={quillFormats}
                                    className="bg-white"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Gambar Founder
                                </label>
                                <input
                                    type="file"
                                    name="gambar"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#000080]"
                                    onChange={handleFounderInputChange}
                                />
                            </div>

                            {imagePreviewForm && (
                                <div className="mt-3 mb-5">
                                    <p>Preview Gambar:</p>
                                    <img
                                        src={imagePreviewForm}
                                        alt="Preview Founder"
                                        className="h-32 w-32 object-cover rounded-lg"
                                    />
                                </div>
                            )}

                            <Button
                                variant="primary"
                                size="md"
                                onClick={handleAddFounder}
                            >
                                Simpan
                            </Button>
                        </div>
                    )}

                    <div className="mt-10 mb-8">
                        {founders.map((founder) => (
                            <div
                                key={founder.id}
                                className="bg-white rounded-lg shadow-md p-4 mb-4"
                            >
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Nama Founder
                                    </label>
                                    <input
                                        type="text"
                                        name="nama"
                                        value={
                                            selectedFounder === founder.id
                                                ? formFounder.nama
                                                : founder.nama
                                        }
                                        disabled={
                                            selectedFounder !== founder.id
                                        }
                                        onChange={(e) =>
                                            setFormFounder({
                                                ...formFounder,
                                                nama: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#000080] disabled:bg-gray-100"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Jabatan Founder
                                    </label>
                                    <input
                                        type="text"
                                        name="jabatan"
                                        value={
                                            selectedFounder === founder.id
                                                ? formFounder.jabatan
                                                : founder.jabatan
                                        }
                                        disabled={
                                            selectedFounder !== founder.id
                                        }
                                        onChange={(e) =>
                                            setFormFounder({
                                                ...formFounder,
                                                jabatan: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#000080] disabled:bg-gray-100"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Jabatan Founder (Bahasa Inggris)
                                    </label>
                                    <input
                                        type="text"
                                        name="jabatanEn"
                                        value={
                                            selectedFounder === founder.id
                                                ? formFounder.jabatanEn
                                                : founder.jabatanEn
                                        }
                                        disabled={
                                            selectedFounder !== founder.id
                                        }
                                        onChange={(e) =>
                                            setFormFounder({
                                                ...formFounder,
                                                jabatanEn: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#000080] disabled:bg-gray-100"
                                    />
                                </div>
                                {/* Modifikasi bagian ReactQuill di dalam kondisi selectedFounder */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Deskripsi Founder
                                    </label>
                                    {selectedFounder === founder.id ? (
                                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                                            <ReactQuill
                                                value={
                                                    formFounder.deskripsi || ""
                                                }
                                                onChange={(
                                                    content,
                                                    delta,
                                                    source,
                                                    editor,
                                                ) => {
                                                    setFormFounder({
                                                        ...formFounder,
                                                        deskripsi:
                                                            editor.getHTML(),
                                                    });
                                                }}
                                                modules={quillModules}
                                                formats={quillFormats}
                                                className="bg-white"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                                            dangerouslySetInnerHTML={{
                                                __html: founder.deskripsi || "",
                                            }}
                                        />
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Deskripsi Founder (Bahasa Inggris)
                                    </label>
                                    {selectedFounder === founder.id ? (
                                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                                            <ReactQuill
                                                value={
                                                    formFounder.deskripsiEn ||
                                                    ""
                                                }
                                                onChange={(
                                                    content,
                                                    delta,
                                                    source,
                                                    editor,
                                                ) => {
                                                    setFormFounder({
                                                        ...formFounder,
                                                        deskripsiEn:
                                                            editor.getHTML(),
                                                    });
                                                }}
                                                modules={quillModules}
                                                formats={quillFormats}
                                                className="bg-white"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    founder.deskripsiEn || "",
                                            }}
                                        />
                                    )}
                                </div>
                                {selectedFounder === founder.id ? (
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Gambar Founder
                                        </label>
                                        <input
                                            type="file"
                                            name="gambar"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    setFormFounder({
                                                        ...formFounder,
                                                        gambar: file,
                                                    });
                                                    setImagePreviewFounder({
                                                        ...imagePreviewFounder,
                                                        [founder.id]:
                                                            URL.createObjectURL(
                                                                file,
                                                            ),
                                                    });
                                                }
                                            }}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#000080]"
                                        />
                                        {imagePreviewFounder[founder.id] && (
                                            <div className="mt-3 mb-5">
                                                <p>Preview Gambar:</p>
                                                <img
                                                    src={
                                                        imagePreviewFounder[
                                                            founder.id
                                                        ]
                                                    }
                                                    alt="Preview Founder"
                                                    className="h-32 w-32 object-cover rounded-lg"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="mt-3 mb-5">
                                        <p>Gambar Founder:</p>
                                        <img
                                            src={
                                                imagePreviewFounder[
                                                    founder.id
                                                ] || founder.gambar
                                            }
                                            alt={`Founder ${founder.nama}`}
                                            className="h-32 w-32 object-cover rounded-lg"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src =
                                                    "/placeholder-image.jpg";
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="flex justify-start">
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button
                                            variant="delete"
                                            size="md"
                                            onClick={() =>
                                                handleDeleteClick(founder)
                                            }
                                            disabled={isDeleting}
                                        >
                                            <PiTrash className="w-5 h-5 shrink-0" />
                                            Hapus
                                        </Button>

                                        {selectedFounder === founder.id &&
                                        isEditing ? (
                                            <Button
                                                variant="primary"
                                                size="md"
                                                onClick={() =>
                                                    handleUpdateFounders(
                                                        founder.id,
                                                    )
                                                }
                                            >
                                                Simpan
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="update"
                                                size="md"
                                                onClick={() =>
                                                    handleEditFounder(founder)
                                                }
                                            >
                                                <PiNotePencil className="w-5 h-5 shrink-0" />
                                                Ubah
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Custom Confirmation Dialog */}
                    {showConfirmDialog && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                                <h2 className="text-xl font-bold mb-4">
                                    Konfirmasi Hapus
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Apakah Anda yakin ingin menghapus data
                                    founder {founderToDelete?.nama}? Tindakan
                                    ini tidak dapat dibatalkan.
                                </p>
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={handleCancelDelete}
                                        disabled={isDeleting}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleConfirmDelete}
                                        disabled={isDeleting}
                                        className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                                    >
                                        {isDeleting ? "Menghapus..." : "Hapus"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

const InputField = ({ label, name, value, onChange, isDisabled }) => (
    <div className="mb-4">
        <label className="block text-[#000080] font-semibold mb-2">
            {label}
        </label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            disabled={isDisabled}
            className={`w-full px-4 py-2 rounded-md shadow-sm ${
                isDisabled
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white border border-gray-300"
            } focus:outline-none focus:border-brown-500 transition`}
        />
    </div>
);

const ImageUpload = ({ label, name, onChange }) => (
    <div className="mb-4">
        <label className="block text-[#000080] font-semibold mb-2">
            {label}
        </label>
        <input
            type="file"
            name={name}
            onChange={onChange}
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
        />
    </div>
);

const Section = ({
    title,
    formData,
    editMode,
    handleEdit,
    handleSave,
    handleChange,
    imagePreview,
    imageFieldName,
    textAreaFieldName,
    textAreaFieldNameEn,
    includeFields = [],
}) => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "background",
        "script",
        "list",
        "bullet",
        "indent",
        "direction",
        "align",
        "blockquote",
        "code-block",
        "link",
        "image",
        "video",
    ];

    return (
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
            <div className="flex justify-between mb-5">
                <h1 className="font-bold text-[#000080] text-xl">{title}</h1>

                <Button
                    variant={editMode ? "primary" : "update"}
                    size="md"
                    onClick={editMode ? handleSave : handleEdit}
                >
                    {editMode ? null : (
                        <PiNotePencil className="w-5 h-5 shrink-0" />
                    )}
                    {editMode ? "Simpan" : "Ubah"}
                </Button>
            </div>

            {["Profil", "Sejarah"].includes(title) && (
                <InputField
                    label={`Judul ${title}`}
                    name={title === "Profil" ? "judul" : "judul_sejarah"}
                    value={
                        title === "Profil"
                            ? formData.judul
                            : formData.judul_sejarah
                    }
                    onChange={handleChange}
                    isDisabled={!editMode}
                />
            )}

            {["Profil", "Sejarah"].includes(title) && (
                <InputField
                    label={`Judul ${title} Bahasa Inggris`}
                    name={title === "Profil" ? "judul_en" : "judul_sejarah_en"}
                    value={
                        title === "Profil"
                            ? formData.judul_en
                            : formData.judul_sejarah_en
                    }
                    onChange={handleChange}
                    isDisabled={!editMode}
                />
            )}

            {includeFields.includes("nama") && (
                <InputField
                    label="Nama Founder"
                    name="nama"
                    value={formData.nama || ""}
                    onChange={handleChange}
                    isDisabled={!editMode}
                />
            )}

            {includeFields.includes("jabatan") && (
                <InputField
                    label="Jabatan Founder"
                    name="jabatan"
                    value={formData.jabatan || ""}
                    onChange={handleChange}
                    isDisabled={!editMode}
                />
            )}

            {includeFields.includes("jabatanEn") && (
                <InputField
                    label="Jabatan Founder (Bahasa Inggris)"
                    name="jabatanEn"
                    value={formData.jabatanEn || ""}
                    onChange={handleChange}
                    isDisabled={!editMode}
                />
            )}

            {imagePreview && (
                <div className="w-80 h-56 rounded-md overflow-hidden mb-4">
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {editMode && imageFieldName && (
                <ImageUpload
                    label={`Gambar ${title}`}
                    name={imageFieldName}
                    onChange={handleChange}
                />
            )}

            <div className="mb-4">
                <label
                    htmlFor={textAreaFieldName}
                    className="block text-[#000080] font-semibold mb-2"
                >
                    {`Deskripsi ${title}`}
                </label>
                <div
                    className={`
          border rounded-md overflow-hidden transition-colors duration-300
          ${
              editMode
                  ? "border-yellow-400 bg-white"
                  : "border-gray-300 bg-gray-100"
          }
        `}
                >
                    <ReactQuill
                        id={textAreaFieldName}
                        value={formData[textAreaFieldName] || ""}
                        onChange={(content, delta, source, editor) =>
                            handleChange(textAreaFieldName, null, editor)
                        }
                        modules={modules}
                        formats={formats}
                        readOnly={!editMode}
                        className={`
              ${!editMode && "quill-readonly"}
            `}
                    />
                </div>
            </div>

            <div className="mb-4">
                <label
                    htmlFor={textAreaFieldNameEn}
                    className="block text-[#000080] font-semibold mb-2"
                >
                    {`Deskripsi ${title} Bahasa Inggris`}
                </label>
                <div
                    className={`
          border rounded-md overflow-hidden transition-colors duration-300
          ${
              editMode
                  ? "border-yellow-400 bg-white"
                  : "border-gray-300 bg-gray-100"
          }
        `}
                >
                    <ReactQuill
                        id={textAreaFieldNameEn}
                        value={formData[textAreaFieldNameEn] || ""}
                        onChange={(content, delta, source, editor) =>
                            handleChange(textAreaFieldNameEn, null, editor)
                        }
                        modules={modules}
                        formats={formats}
                        readOnly={!editMode}
                        className={`
              ${!editMode && "quill-readonly"}
            `}
                    />
                </div>
            </div>
        </div>
    );
};

export default Profil;

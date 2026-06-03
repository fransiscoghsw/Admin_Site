import Button from "../../../components/common/Button";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AdminLayout from "../../../layouts/AdminLayout";
import { getAbouts } from "../../../services/about.service";
import apiAdmin from "../../../lib/axios";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { PiNotePencil } from "react-icons/pi";

const Profil = () => {
    const [formData, setFormData] = useState({
        judul: "",
        image_background: null,
        deskripsi_tentang_kami: "",
    });

    const [editMode, setEditMode] = useState({
        tentangKami: false,
    });

    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        getAbouts((data) => {
            setFormData({
                judul: data.judul || "",
                image_background: data.image_background || "",
                deskripsi_tentang_kami: data.deskripsi || "",
            });
            setImagePreview(
                `${import.meta.env.VITE_API_URL}/tentang-kami/image/${
                    data.image_background
                }`,
            );
        });
    }, []);

    const handleChange = (name, editor = null) => {
        if (editor) {
            const value = editor.getHTML();
            setFormData((prevData) => ({ ...prevData, [name]: value }));
            return;
        }

        const { value, files } = name.target;
        const inputName = name.target.name;

        if (files && files[0]) {
            const file = files[0];
            if (inputName === "image_background") {
                setFormData((prevData) => ({ ...prevData, [inputName]: file }));
                handleImagePreview(file, setImagePreview);
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [inputName]: value,
            }));
        }
    };

    const handleImagePreview = (file, setPreview) => {
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleEdit = (section) => {
        setEditMode((prevMode) => ({ ...prevMode, [section]: true }));
    };

    const handleSaveTentangKami = async () => {
        const form = new FormData();

        form.append("judul", formData.judul);
        form.append("deskripsi", formData.deskripsi_tentang_kami);

        if (formData.image_background instanceof File) {
            form.append("image_background", formData.image_background);
        }

        try {
            const response = await apiAdmin.post("/tentang-kami", form);
            const savedData = response.data?.data || response.data;

            if (savedData) {
                setFormData((prevData) => ({
                    ...prevData,
                    judul: savedData.judul || prevData.judul,
                    deskripsi_tentang_kami:
                        savedData.deskripsi || prevData.deskripsi_tentang_kami,
                    image_background:
                        savedData.image_background || prevData.image_background,
                }));

                if (savedData.image_background) {
                    setImagePreview(
                        `${import.meta.env.VITE_API_URL}/tentang-kami/image/${savedData.image_background}`,
                    );
                }
            }

            setEditMode((prevMode) => ({ ...prevMode, tentangKami: false }));
        } catch (error) {
            console.error("Error saving Tentang Kami:", error);
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
                />
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

ImageUpload.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

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

            <InputField
                label={`Judul ${title}`}
                name="judul"
                value={formData.judul}
                onChange={handleChange}
                isDisabled={!editMode}
            />

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
                            handleChange(textAreaFieldName, editor)
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

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
};

Section.propTypes = {
    title: PropTypes.string.isRequired,
    formData: PropTypes.object.isRequired,
    editMode: PropTypes.bool.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    imagePreview: PropTypes.string,
    imageFieldName: PropTypes.string,
    textAreaFieldName: PropTypes.string.isRequired,
};

export default Profil;

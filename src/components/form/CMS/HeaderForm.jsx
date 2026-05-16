import Button from "../../../components/common/Button";
import Label from "../../../components/common/Label";
import Input from "../../../components/common/Input";
import InputError from "../../../components/common/InputError";
import { showToast } from "../../../utils/toast";
import {
    getDashboardFrontpage,
    saveDashboardFrontpage,
} from "../../../services/dashboard-frontpage.service";
import { useEffect, useState } from "react";
import { PiNotePencil } from "react-icons/pi";

const HeaderForm = () => {
    const [dashboardFrontpage, setDasboardFrontpage] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        subTitle: "",
        image: null,
    });
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getDashboardFrontpage(
            (data) => {
                setDasboardFrontpage(data);

                if (data) {
                    setFormData({
                        title: data.title || "",
                        subTitle: data.subTitle || "",
                        image: data.image || "",
                    });

                    setPreviewImage(
                        `${import.meta.env.VITE_API_URL}/homepage/image/${
                            data.image
                        }`,
                    );
                }
            },
            "id",
            "en",
        );
    }, []);

    // Input Validations: Start
    const validateForm = () => {
        let newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = "Judul wajib diisi";
        }
        if (!formData.subTitle.trim()) {
            newErrors.subTitle = "Sub judul wajib diisi";
        }
        if (!formData.image) {
            newErrors.image = "Gambar wajib diunggah";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const getErrorMessage = (fieldName) => {
        const fieldNames = {
            title: "Judul",
            subTitle: "Sub judul",
        };

        return `${fieldNames[fieldName] || fieldName} wajib diisi`;
    };

    const clearError = (fieldName) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[fieldName];
            return newErrors;
        });
    };
    // Input Validations: End

    // UPSERT: Start
    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (!value.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: getErrorMessage(name),
            }));
        } else {
            clearError(name);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = [
                "image/svg+xml",
                "image/png",
                "image/jpeg",
                "image/jpg",
            ];
            if (validTypes.includes(file.type)) {
                setFormData({ ...formData, image: file });
                setPreviewImage(URL.createObjectURL(file));
                clearError("image");
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    image: "Gambar harus berupa SVG, PNG, JPG, atau JPEG",
                }));
                e.target.value = null;
            }
        }
    };

    const handleInputSave = () => {
        if (validateForm()) {
            const dataToSend = new FormData();
            dataToSend.append("title", formData.title);
            dataToSend.append("subTitle", formData.subTitle);
            if (formData.image) {
                dataToSend.append("image", formData.image);
            }

            saveDashboardFrontpage(dataToSend, (newData) => {
                setDasboardFrontpage([newData]);
                setEditMode(false);
                setPreviewImage(
                    `${import.meta.env.VITE_API_URL}/homepage/image/${newData}`,
                );

                if (isDataEmpty) {
                    showToast("Data berhasil dibuat");
                } else {
                    showToast("Data berhasil diubah");
                }
            });
        }
    };

    const handleInputEdit = () => {
        setEditMode(true);
    };
    // UPSERT: End

    const isDataEmpty = !dashboardFrontpage;

    return (
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md ml-3 md:ml-0 py-4 px-6 sm:px-4">
            <div className="flex justify-end">
                <Button
                    variant={isDataEmpty || editMode ? "primary" : "update"}
                    size="md"
                    onClick={
                        isDataEmpty || editMode
                            ? handleInputSave
                            : handleInputEdit
                    }
                >
                    {isDataEmpty || editMode ? null : (
                        <PiNotePencil className="w-5 h-5" />
                    )}
                    {isDataEmpty || editMode ? "Simpan" : "Ubah"}
                </Button>
            </div>

            <Label htmlFor={"image"} value={"Gambar Header"} />
            <div className="mb-4">
                <div
                    className={`flex flex-col items-center justify-center w-full py-4 h-full border-2 rounded-2xl bg-gray-50 shadow ${
                        !isDataEmpty && !editMode
                            ? "border-gray-50"
                            : errors.image
                              ? "border-red-500"
                              : "border-gray-300"
                    }`}
                >
                    {/* Preview image yang dipilih */}
                    {previewImage && (
                        <div
                            className={`w-full sm:w-80 h-56 rounded-md overflow-hidden`}
                        >
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {isDataEmpty || editMode ? (
                        <>
                            <label
                                htmlFor="image"
                                className={`flex flex-col items-center justify-center w-full cursor-pointer ${
                                    !previewImage ? "h-56" : "mt-3"
                                }`}
                            >
                                <div
                                    className={`flex flex-col items-center justify-center`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg
                                            className="w-8 h-8 text-gray-500"
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
                                        <p className="text-sm text-gray-500">
                                            <span className="font-semibold">
                                                Unggah image di sini
                                            </span>
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        SVG, PNG, JPG atau JPEG
                                    </p>
                                </div>
                                <input
                                    id="image"
                                    type="file"
                                    className="hidden"
                                    onChange={handleImageChange}
                                    accept=".svg,.png,.jpg,.jpeg"
                                />
                            </label>
                        </>
                    ) : (
                        ""
                    )}
                </div>
                <InputError message={errors.image} />
            </div>

            <Label htmlFor={"title"} value={"Judul"} />
            <Input
                type={"text"}
                name={"title"}
                placeholder={"Masukkan title.."}
                variant={
                    isDataEmpty || editMode ? "primary-outline" : "disabled"
                }
                value={formData.title}
                handleChange={handleTextChange}
                isDisabled={!isDataEmpty && !editMode}
                isError={!!errors.title}
            />
            <InputError message={errors.title} />

            <Label htmlFor={"subTitle"} value={"Sub Judul"} />
            <Input
                type={"text"}
                name={"subTitle"}
                placeholder={"Masukkan sub title.."}
                variant={
                    isDataEmpty || editMode ? "primary-outline" : "disabled"
                }
                value={formData.subTitle}
                handleChange={handleTextChange}
                isDisabled={!isDataEmpty && !editMode}
                isError={!!errors.subTitle}
            />
            <InputError message={errors.subTitle} />
        </div>
    );
};

export default HeaderForm;

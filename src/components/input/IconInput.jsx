import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FiUpload, FiX, FiImage } from "react-icons/fi";
import Label from "../common/Label";
import Input from "../common/Input";
import InputError from "../common/InputError";

const IconInput = ({
    label,
    name,
    errorMessage,
    required = true,
    onChange,
    reset = false, // Perbaiki default menjadi false
    initialIcon = null, // Gambar awal
    initialData = null, // Data gambar awal dari props
}) => {
    const [iconPreview, setIconPreview] = useState(null);
    const [dragOver, setDragOver] = useState(false);

    const handleIconChange = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    setIconPreview(reader.result); // Menampilkan preview gambar setelah load
                    onChange(file);
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        handleIconChange(file);
    };

    const handleRemoveIcon = (e) => {
        e.stopPropagation();
        setIconPreview(null);
        onChange(null); // Menghapus file dari form
    };

    useEffect(() => {
        // Reset preview icon jika reset true
        if (reset) {
            setIconPreview(null);
        } else if (initialData) {
            // Jika ada gambar awal, tampilkan gambar tersebut
            setIconPreview(initialIcon);
        }
    }, [reset, initialIcon, initialData]);

    return (
        <div className="w-full">
            <Label
                htmlFor={name}
                value={
                    <>
                        {label}{" "}
                        {required && <span className="text-red-500">*</span>}
                    </>
                }
            />

            <div
                className={`relative mt-2 flex flex-col items-center justify-center w-full border-2 rounded-lg p-6 transition ${
                    dragOver
                        ? "border-blue-500 bg-blue-50"
                        : "border-dashed border-gray-300 hover:border-gray-500"
                } cursor-pointer`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById(name).click()}
            >
                {iconPreview ? (
                    <div className="relative w-full flex justify-center">
                        <img
                            src={iconPreview}
                            alt="Preview"
                            className="rounded-lg shadow-md"
                            style={{
                                maxWidth: "100%",
                                maxHeight: "300px",
                                objectFit: "contain",
                            }}
                        />
                        <button
                            type="button"
                            onClick={handleRemoveIcon}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition"
                        >
                            <FiX size={16} />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center w-full text-center">
                        {dragOver ? (
                            <>
                                <FiImage
                                    size={32}
                                    className="text-blue-500 mb-2"
                                />
                                <span className="text-sm text-blue-500 font-semibold">
                                    Lepaskan untuk mengunggah
                                </span>
                            </>
                        ) : (
                            <>
                                <FiUpload
                                    size={32}
                                    className="text-gray-400 mb-2"
                                />
                                <span className="text-sm text-gray-500">
                                    Klik atau seret & lepaskan gambar ke sini
                                </span>
                            </>
                        )}
                    </div>
                )}

                <Input
                    type="file"
                    name={name}
                    id={name}
                    className="hidden"
                    isError={!!errorMessage}
                    required={required}
                    handleChange={(e) => handleIconChange(e.target.files[0])}
                />
            </div>

            <InputError message={errorMessage} />
        </div>
    );
};

IconInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    reset: PropTypes.bool,
    initialIcon: PropTypes.string, // Gambar awal
    initialData: PropTypes.string, // Gambar awal untuk data
};

export default IconInput;

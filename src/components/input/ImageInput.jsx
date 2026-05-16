import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FiUpload, FiX, FiImage } from "react-icons/fi";
import Label from "../common/Label";
import Input from "../common/Input";
import InputError from "../common/InputError";

const ImageInput = ({
    label,
    name,
    errorMessage,
    required = true,
    onChange,
    reset = false, // Perbaiki default menjadi false
    initialImage = null, // Gambar awal
    initialData = null, // Data gambar awal dari props
    isDisabled = false, // Tambahkan prop untuk disable input
}) => {
    const [imagePreview, setImagePreview] = useState(null);
    const [dragOver, setDragOver] = useState(false);

    const handleImageChange = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    setImagePreview(reader.result); // Menampilkan preview gambar setelah load
                    onChange(file);
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        if (isDisabled) return; // Cegah drop jika input disabled
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        handleImageChange(file);
    };

    const handleRemoveImage = (e) => {
        e.stopPropagation();
        if (isDisabled) return; // Cegah menghapus gambar jika disabled
        setImagePreview(null);
        onChange(null); // Menghapus file dari form
    };

    useEffect(() => {
        // Reset preview image jika reset true
        if (reset) {
            setImagePreview(null);
        } else if (initialData) {
            // Jika ada gambar awal, tampilkan gambar tersebut
            setImagePreview(initialImage);
        }
    }, [reset, initialImage, initialData]);

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
                    isDisabled
                        ? "border-gray-300 bg-gray-100 cursor-not-allowed opacity-50"
                        : dragOver
                        ? "border-blue-500 bg-blue-50"
                        : "border-dashed border-gray-300 hover:border-gray-500 cursor-pointer"
                }`}
                onDragOver={(e) => {
                    if (isDisabled) return;
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => {
                    if (!isDisabled) document.getElementById(name).click();
                }}
            >
                {imagePreview ? (
                    <div className="relative w-full flex justify-center">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="rounded-lg shadow-md"
                            style={{
                                maxWidth: "100%",
                                maxHeight: "300px",
                                objectFit: "contain",
                            }}
                        />
                        {!isDisabled && (
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition"
                            >
                                <FiX size={16} />
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center w-full text-center">
                        {dragOver ? (
                            <FiImage size={32} className="text-blue-500 mb-2" />
                        ) : (
                            <FiUpload
                                size={32}
                                className="text-gray-400 mb-2"
                            />
                        )}
                        <span className="text-sm text-gray-500">
                            {isDisabled
                                ? "Upload gambar dinonaktifkan"
                                : "Klik atau seret & lepaskan gambar ke sini"}
                        </span>
                    </div>
                )}

                <Input
                    type="file"
                    name={name}
                    id={name}
                    className="hidden"
                    isError={!!errorMessage}
                    required={required}
                    handleChange={(e) => handleImageChange(e.target.files[0])}
                    disabled={isDisabled} // Disabled input file
                />
            </div>

            <InputError message={errorMessage} />
        </div>
    );
};

ImageInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    reset: PropTypes.bool,
    initialImage: PropTypes.string, // Gambar awal
    initialData: PropTypes.string, // Gambar awal untuk data
    isDisabled: PropTypes.bool, // Tambahkan prop baru untuk disabled state
};

export default ImageInput;

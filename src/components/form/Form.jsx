import { useState, useEffect } from "react";
import Text from "../input/Text";
import ImageInput from "../input/ImageInput";
import IconInput from "../input/IconInput";
import Button from "../common/Button";
import { PiNotePencil } from "react-icons/pi";

const Form = ({
    title,
    fields,
    initialImage = null,
    initialData = {},
    onSubmit,
    onClose,
}) => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [resetImage, setResetImage] = useState(false);

    useEffect(() => {
        // Hanya set ulang state jika initialData berbeda dengan formData, tapi tidak mengubah editMode
        if (JSON.stringify(initialData) !== JSON.stringify(formData)) {
            setFormData(initialData || {});
            setErrors({});
            setResetImage(false);
        }
    }, [initialData]); // Hanya memantau initialData

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleImageChange = (file) => {
        setFormData((prev) => ({ ...prev, image: file }));
    };

    const handleIconChange = (file) => {
        setFormData((prev) => ({ ...prev, icon: file }));
    };

    const validateForm = () => {
        let newErrors = {};
        fields.forEach(({ name, required }) => {
            if (required && !formData[name]) {
                newErrors[name] = "Field ini wajib diisi";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        let formDataToSend;
        let isMultipart = false;

        console.log("formData", formData);

        // Cek apakah ada file yang diunggah (image atau icon)
        if (formData.image instanceof File || formData.icon instanceof File) {
            isMultipart = true;
            formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });
        } else {
            // Kirim sebagai JSON jika tidak ada file
            formDataToSend = JSON.stringify(formData);
        }

        onSubmit(formDataToSend, isMultipart ? "multipart" : "json");

        // Reset form setelah submit
        setFormData({});
        setResetImage(true);
        setEditMode(false);
        setTimeout(() => setResetImage(false), 100);
        onClose();
    };

    // Handle perubahan editMode saat mengklik tombol Edit
    const handleInputEdit = () => {
        setEditMode(true);
    };

    return (
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md ml-3 md:ml-0 py-4 px-6 sm:px-4">
            <div className="flex justify-end">
                <Button
                    variant={initialData && editMode ? "primary" : "update"}
                    size="md"
                    onClick={
                        initialData && editMode ? handleSubmit : handleInputEdit
                    }
                >
                    {initialData && editMode ? null : (
                        <PiNotePencil className="w-5 h-5" />
                    )}
                    {initialData && editMode ? "Simpan" : "Ubah"}
                </Button>
            </div>
            <form onSubmit={handleSubmit}>
                {fields.map(({ label, name, type }) => (
                    <div key={name}>
                        {type === "image" ? (
                            <ImageInput
                                label={label}
                                name={name}
                                accept="image/*"
                                onChange={handleImageChange}
                                errorMessage={errors[name]}
                                isError={!!errors[name]}
                                reset={resetImage}
                                initialImage={initialImage}
                                initialData={initialData?.image}
                                isDisabled={!editMode} // Disable if editMode is false
                            />
                        ) : (
                            <Text
                                label={label}
                                name={name}
                                type={type}
                                variant={!editMode ? "disabled" : "primary"}
                                value={formData[name] || ""}
                                handleChange={handleChange}
                                errorMessage={errors[name]}
                                isError={!!errors[name]}
                                isDisabled={!editMode} // Disable if editMode is false
                            />
                        )}
                    </div>
                ))}
            </form>
        </div>
    );
};

export default Form;

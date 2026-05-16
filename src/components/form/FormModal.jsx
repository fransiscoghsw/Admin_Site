import { useState, useEffect } from "react";
import Modal from "../admin/Modal";
import Text from "../input/Text";
import EmailInput from "../input/EmailInput";
import PasswordInput from "../input/PasswordInput";
import SelectInput from "../input/SelectInput";
import ImageInput from "../input/ImageInput";
import IconInput from "../input/IconInput";

const FormModal = ({
    title,
    fields,
    initialImage = null,
    initialData = {},
    onSubmit,
    onClose,
}) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [resetImage, setResetImage] = useState(false);

    useEffect(() => {
        setFormData(initialData || {});
        setErrors({});
        setResetImage(false);
    }, [initialData]);

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

    const validateForm = (backendErrors = {}) => {
        let newErrors = { ...backendErrors }; // Gunakan error dari backend sebagai dasar

        fields.forEach(({ name, type, required = true }) => {
            const value = formData[name];

            // Jika sudah ada error dari backend, tidak perlu validasi tambahan
            if (newErrors[name]) {
                return;
            }

            // Validasi required field untuk text, email, dan password
            if (required && !value && type !== "image" && type !== "icon") {
                newErrors[name] = "Field ini wajib diisi";
                return;
            }

            // Validasi required untuk image
            if (required && type === "image" && !formData.image) {
                newErrors[name] = "Gambar wajib di-upload";
                return;
            }

            // Validasi required untuk icon
            if (required && type === "icon" && !formData.icon) {
                newErrors[name] = "Ikon wajib di-upload";
                return;
            }

            // Validasi email
            if (type === "email" && value) {
                const emailRegex =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(value)) {
                    newErrors[name] = "Format email tidak valid";
                }
            }

            // Validasi password
            if (type === "password" && value) {
                if (value.length < 8) {
                    newErrors[name] =
                        "Password harus terdiri dari minimal 8 karakter";
                }
                if (!/[a-z]/.test(value)) {
                    newErrors[name] = "Password harus mengandung huruf kecil";
                }
                if (!/[0-9]/.test(value)) {
                    newErrors[name] = "Password harus mengandung angka";
                }
                if (!/[^A-Za-z0-9]/.test(value)) {
                    newErrors[name] = "Password harus mengandung simbol khusus";
                }
                if (!/[A-Z]/.test(value)) {
                    newErrors[name] = "Password harus mengandung huruf besar";
                }
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        let formDataToSend;
        let isMultipart = false;

        if (formData.image instanceof File || formData.icon instanceof File) {
            isMultipart = true;
            formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });
        } else {
            formDataToSend = JSON.stringify(formData);
        }

        try {
            const response = await onSubmit(
                formDataToSend,
                isMultipart ? "multipart" : "json"
            );

            if (!response) {
                throw new Error(
                    "Response undefined, periksa kembali `onSubmit`"
                );
            }

            // Jika ada error dari backend, masukkan ke state errors
            if (response.errors) {
                const backendErrors = response.errors.reduce((acc, err) => {
                    acc[err.path] = err.msg;
                    return acc;
                }, {});

                setErrors(backendErrors);
                return; // Jangan lanjutkan untuk menutup modal
            }

            // Jika sukses, reset form
            setFormData({});
            setResetImage(true);
            setTimeout(() => setResetImage(false), 100);

            // Baru tutup modal jika tidak ada error
            onClose();
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            setErrors({ general: "Terjadi kesalahan pada server." });
        }
    };

    const handleClose = () => {
        setResetImage(true); // Memicu reset gambar saat form ditutup
        onClose();
    };

    return (
        <>
            <Modal.Header title={title} onClose={handleClose} />
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    {fields.map(({ label, name, type, options }) => (
                        <div key={name}>
                            {type === "email" ? (
                                <EmailInput
                                    label={label}
                                    name={name}
                                    value={formData[name] || ""}
                                    handleChange={handleChange}
                                    errorMessage={errors[name]}
                                    isError={!!errors[name]}
                                />
                            ) : type === "password" ? (
                                <PasswordInput
                                    label={label}
                                    name={name}
                                    value={formData[name] || ""}
                                    handleChange={handleChange}
                                    errorMessage={errors[name]}
                                    isError={!!errors[name]}
                                />
                            ) : type === "select" ? (
                                <SelectInput
                                    label={label}
                                    name={name}
                                    options={options || []}
                                    value={formData[name] || ""}
                                    handleChange={handleChange}
                                    errorMessage={errors[name]}
                                    isError={!!errors[name]}
                                />
                            ) : type === "icon" ? (
                                <IconInput
                                    label={label}
                                    name={name}
                                    accept="icon/*"
                                    onChange={handleIconChange}
                                    errorMessage={errors[name]}
                                    isError={!!errors[name]}
                                    reset={resetImage}
                                    initialIcon={initialImage}
                                    initialData={initialData?.icon}
                                />
                            ) : type === "image" ? (
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
                                />
                            ) : (
                                <Text
                                    label={label}
                                    name={name}
                                    type={type}
                                    value={formData[name] || ""}
                                    handleChange={handleChange}
                                    errorMessage={errors[name]}
                                    isError={!!errors[name]}
                                />
                            )}
                        </div>
                    ))}
                </form>
            </Modal.Body>
            <Modal.Footer
                action={initialData ? "Ubah" : "Tambah"}
                onAction={handleSubmit}
                onClose={handleClose}
            />
        </>
    );
};

export default FormModal;

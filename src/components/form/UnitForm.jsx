import React, { useState, useEffect } from "react";
import Text from "../input/Text";
import Modal from "../admin/Modal";
import * as Yup from "yup"; // Import Yup
import { getAllMUnit } from "../../services/munit.service"; // Import the API function to get units

const UnitForm = ({ initialData = {}, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
    });

    const [errors, setErrors] = useState({});
    const [unitNames, setUnitNames] = useState([]); // Store existing unit names

    // Reset form setiap kali initialData berubah (untuk edit mode)
    useEffect(() => {
        setFormData({
            name: initialData?.name || "",
        });
        setErrors({});
    }, [initialData]);

    // Fetch existing unit names when the form is first loaded
    useEffect(() => {
        const fetchUnitNames = async () => {
            try {
                const units = await getAllMUnit();
                const names = units.map((unit) => unit.name.toLowerCase()); // Normalize to lowercase for comparison
                setUnitNames(names);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUnitNames();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Hapus error jika input sudah diperbaiki
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // Validasi menggunakan Yup
    const validationSchema = Yup.object({
        name: Yup.string()
            .trim()
            .required("Nama wajib diisi")
            .test("name-unique", "Nama unit sudah terdaftar", (value) => {
                // Check if name already exists
                return (
                    !unitNames.includes(value.toLowerCase()) ||
                    value.toLowerCase() === initialData?.name.toLowerCase()
                );
            }),
    });

    const validateForm = async () => {
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({}); // Clear errors if validation is successful
            return true;
        } catch (error) {
            const newErrors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {});
            setErrors(newErrors);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validateForm();
        if (!isValid) return;

        onSubmit(formData);
        setFormData({ name: "" });
        onClose();
    };

    return (
        <div>
            <Modal.Header
                title={initialData ? "Ubah Satuan" : "Tambah Satuan"}
                onClose={onClose}
            />
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Text
                            label={"Nama"}
                            name="name"
                            errorMessage={errors.name}
                            placeholder="Contoh: gram/g, kg, ml, liter/l"
                            value={formData.name}
                            handleChange={handleChange}
                            isError={!!errors.name}
                        />
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

export default UnitForm;

import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import Modal from "../admin/Modal";
import Select from "../common/Select";
import { getRoles } from "../../services/role.service";

const AdminForm = ({ initialData = {}, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        roleId: "",
    });

    const [roles, setRoles] = useState([]);
    const [errors, setErrors] = useState({});
    const isEdit = Boolean(initialData?.id);

    // Fetch role data dari API
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await getRoles();
                setRoles(
                    data.map((role) => ({ value: role.id, label: role.name }))
                );
            } catch (error) {
                console.error("Gagal mengambil data role:", error);
            }
        };
        fetchRoles();
    }, []);

    // Reset form setiap kali initialData berubah (untuk edit mode)
    useEffect(() => {
        setFormData({
            username: initialData?.username || "",
            email: initialData?.email || "",
            password: initialData?.password || "", // Password tidak diisi saat edit
            // password: "", // Password tidak diisi saat edit
            roleId: initialData?.roleId || "",
        });
        setErrors({});
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Hapus error jika input sudah diperbaiki
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "Username wajib diisi";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email wajib diisi";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Format email tidak valid";
        }

        if (!isEdit && !formData.password.trim()) {
            newErrors.password = "Password wajib diisi";
        } else if (!isEdit && formData.password.length < 6) {
            newErrors.password = "Password minimal 6 karakter";
        }

        if (!formData.roleId) {
            newErrors.roleId = "Role wajib dipilih";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        onSubmit(formData);
        onClose();
    };

    return (
        <div>
            <Modal.Header
                title={isEdit ? "Edit Akun Admin" : "Tambah Akun Admin"}
                onClose={onClose}
            />
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <Input
                            type="text"
                            name="username"
                            value={formData.username}
                            handleChange={handleChange}
                            required
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm">
                                {errors.username}
                            </p>
                        )}
                    </div>
                    <div>
                        <label>Email</label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            handleChange={handleChange}
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <label>Password</label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            handleChange={handleChange}
                            required={!isEdit}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password}
                            </p>
                        )}
                    </div>
                    <div>
                        <label>Role</label>
                        <Select
                            name="roleId"
                            value={formData.roleId}
                            handleChange={handleChange}
                            options={roles}
                            required
                            isError={!!errors.roleId}
                        />
                        {errors.roleId && (
                            <p className="text-red-500 text-sm">
                                {errors.roleId}
                            </p>
                        )}
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer
                action={isEdit ? "Ubah" : "Tambah"}
                onAction={handleSubmit}
                onClose={onClose}
            />
        </div>
    );
};

export default AdminForm;

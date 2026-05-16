import AdminLayout from "../../layouts/AdminLayout";
import Modal from "../../components/admin/Modal";
import AdminForm from "../../components/form/AdminForm";
import Table from "../../components/common/Table";
import CardList from "../../components/common/CardList";
import SearchInput from "../../components/input/SearchInput";
import { useState, useEffect } from "react";
import {
    createAdmin,
    getAdmins,
    updateAdmin,
    deleteAdmin,
} from "../../services/admin.service";
import { getRoles } from "../../services/role.service";
import { PiToggleLeft, PiToggleRight } from "react-icons/pi";
import AdminDetail from "../../components/admin/AdminDetail";
import Button from "../../components/common/Button";
import { showToast } from "../../utils/toast";
import FormModal from "../../components/form/FormModal";

const AdminPage = () => {
    const [admins, setAdmins] = useState([]);
    const [roles, setRoles] = useState([]);
    const [roleOptions, setRoleOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [currentAdmin, setCurrentAdmin] = useState(null);
    const [viewType, setViewType] = useState("table"); // "table" atau "card"

    const fetchAdmin = async () => {
        try {
            const data = await getAdmins();

            setAdmins(data);
        } catch (error) {
            console.error("Error fetching admins:", error);
        }
    };

    const fetchRoles = async () => {
        try {
            const data = await getRoles();

            const formattedOptions = data.map((type) => ({
                value: type.id,
                label: type.name,
            }));
            setRoleOptions(formattedOptions);
        } catch (error) {
            console.error("Gagal mengambil data role:", error);
        }
    };

    useEffect(() => {
        fetchAdmin();
        fetchRoles();
    }, []);

    const handleCreate = () => {
        setCurrentAdmin(null);
        setIsModalOpen(true);
    };

    const handleEdit = (admin) => {
        setCurrentAdmin(admin);
        setIsModalOpen(true);
    };

    const handleDetail = (admin) => {
        setCurrentAdmin(admin);
        setIsDetailModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteAdmin(id);
            setAdmins((prevAdmins) =>
                prevAdmins.filter((admin) => admin.id !== id),
            );
        } catch (error) {
            console.error("Error deleting admin:", error);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            let response;
            if (currentAdmin) {
                response = await updateAdmin(currentAdmin.id, formData);
                showToast("Admin berhasil diperbaharui");
            } else {
                await createAdmin(formData);
                showToast("Admin berhasil ditambahkan");
            }
            await fetchAdmin();
            setIsModalOpen(false);
            return response;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                showToast(error.response.data.message, "error");
                return error.response.data; // Kembalikan error dari backend
            } else {
                console.error("Error creating/updating unit:", error);
                throw error;
            }
        }
    };

    // Filter berdasarkan search term
    const filteredAdmins = admins.filter((admin) =>
        [admin.username, admin.email, admin.role?.name].some((field) =>
            field?.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    );

    // Definisi kolom tabel
    const columnTable = [
        { key: "id", label: "ID" },
        { key: "username", label: "Username" },
        { key: "email", label: "Email" },
        {
            key: "roleId",
            label: "Role",
            render: (admin) => admin.role?.name || "No Role",
        },
    ];

    const columnsCardList = [
        { key: "username", label: "Username" },
        { key: "email", label: "Email" },
        {
            key: "roleId",
            label: "Role",
            render: (admin) => admin.role?.name || "No Role",
        },
    ];

    const formFields = [
        {
            label: "Username",
            name: "username",
            type: "text",
        },
        {
            label: "Email",
            name: "email",
            type: "email",
        },
        {
            label: "Password",
            name: "password",
            type: "password",
        },
        {
            label: "Role",
            name: "roleId",
            type: "select",
            options: roleOptions,
        },
    ];

    return (
        <AdminLayout pageTitle="Halaman Data Admin">
            <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md p-6">
                {/* Header & Button */}
                <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
                    <div className="w-full md:w-auto flex-1">
                        {/* Search Input */}
                        <SearchInput
                            value={searchTerm}
                            onChange={setSearchTerm}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Switch View Button */}
                        <Button
                            onClick={() =>
                                setViewType(
                                    viewType === "table" ? "card" : "table",
                                )
                            }
                            variant="primary_outline"
                        >
                            {viewType === "table" ? (
                                <>
                                    <PiToggleLeft size={20} />
                                    Card View
                                </>
                            ) : (
                                <>
                                    <PiToggleRight size={20} />
                                    Table View
                                </>
                            )}
                        </Button>

                        {/* Add Admin Button */}
                        <Button variant="primary" onClick={handleCreate}>
                            + Add Admin
                        </Button>
                    </div>
                </div>

                {/* Menampilkan Table atau CardList sesuai pilihan */}
                {viewType === "table" ? (
                    <Table
                        columns={columnTable}
                        data={filteredAdmins}
                        onDetail={handleDetail}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ) : (
                    <CardList
                        data={filteredAdmins}
                        imageKey="avatar"
                        columns={columnsCardList}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onDetail={(admin) => console.log("Detail:", admin)}
                    />
                )}

                {/* Modal Form */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <FormModal
                        title={
                            currentAdmin
                                ? "Edit Master Unit"
                                : "Tambah Master Unit"
                        }
                        fields={formFields}
                        initialData={currentAdmin}
                        onSubmit={handleSubmit}
                        onClose={() => setIsModalOpen(false)}
                    />
                </Modal>

                <Modal
                    isOpen={isDetailModalOpen}
                    onClose={() => setIsDetailModalOpen(false)}
                >
                    <AdminDetail
                        admin={currentAdmin}
                        onClose={() => setIsDetailModalOpen(false)}
                    />
                </Modal>
            </div>
        </AdminLayout>
    );
};

export default AdminPage;

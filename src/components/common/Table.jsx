import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import Pagination from "./Pagination";
import Alert from "./Alert";
import Modal from "../admin/Modal";

const Table = ({
    columns,
    data,
    onEdit,
    onDelete,
    onDetail,
    onView, // Tambahkan prop onView
    itemsPerPage = 5,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [menuOpen, setMenuOpen] = useState(null); // ID dari row yang membuka menu
    const [deleteItem, setDeleteItem] = useState(null); // Menyimpan item yang akan dihapus

    // Hitung total halaman
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Data untuk halaman saat ini
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);

    // Toggle menu aksi
    const handleMenuToggle = (id) => {
        setMenuOpen(menuOpen === id ? null : id);
    };

    // Tampilkan modal konfirmasi hapus
    const confirmDelete = (item) => {
        setDeleteItem(item);
    };

    // Eksekusi hapus data
    const handleDelete = () => {
        if (deleteItem) {
            onDelete(deleteItem.id);
            setDeleteItem(null);
        }
    };

    // Cek apakah ada aksi yang digunakan
    const hasActions = onEdit || onDelete || onDetail;

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-base text-left text-gray-500">
                <thead className="bg-white text-sm text-gray-700 uppercase border-b-2">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="px-4 py-2 text-left">
                                {col.label}
                            </th>
                        ))}
                        {hasActions && (
                            <th className="px-4 py-2 w-[120px] text-center">
                                Aksi
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {currentData.length > 0 ? (
                        currentData.map((item, index) => (
                            <tr
                                key={item.id || startIndex + index + 1}
                                className="bg-white hover:bg-gray-100 transition"
                            >
                                {columns.map((col) => {
                                    const value =
                                        col.key
                                            .split(".")
                                            .reduce(
                                                (acc, part) => acc?.[part],
                                                item,
                                            ) || "-";

                                    return (
                                        <td key={col.key} className="px-4 py-2">
                                            {col.render ? (
                                                col.render(value, item, onView) // Pass onView to render function
                                            ) : col.imageKey &&
                                              value !== "-" ? (
                                                <img
                                                    src={`${import.meta.env.VITE_API_URL}/${
                                                        col.imageKey
                                                    }/${value}`}
                                                    alt={col.label}
                                                    className="w-10 h-10 object-cover rounded-full items-center"
                                                />
                                            ) : (
                                                value
                                            )}
                                        </td>
                                    );
                                })}

                                {hasActions && (
                                    <td className="px-4 py-2 w-[120px] flex justify-center relative">
                                        <button
                                            onClick={() =>
                                                handleMenuToggle(item.id)
                                            }
                                            className="p-2 rounded-full bg-[#000080] hover:bg-white text-white hover:text-[#000080] border border-[#000080] transition focus:outline-none"
                                        >
                                            <IoMdMore size={20} />
                                        </button>
                                        {menuOpen === item.id && (
                                            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-10">
                                                {onDetail && (
                                                    <button
                                                        onClick={() => {
                                                            onDetail(item);
                                                            setMenuOpen(null);
                                                        }}
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Detail
                                                    </button>
                                                )}
                                                {onEdit && (
                                                    <button
                                                        onClick={() => {
                                                            onEdit(item);
                                                            setMenuOpen(null);
                                                        }}
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button
                                                        onClick={() =>
                                                            confirmDelete(item)
                                                        }
                                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                    >
                                                        Hapus
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + (hasActions ? 1 : 0)}>
                                <div className="flex justify-center">
                                    <Alert
                                        message="Tidak ada data yang tersedia."
                                        type="info"
                                    />
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            {deleteItem && (
                <Modal
                    isOpen={!!deleteItem}
                    onClose={() => setDeleteItem(null)}
                >
                    <Modal.Header
                        title="Konfirmasi Hapus"
                        onClose={() => setDeleteItem(null)}
                    />
                    <Modal.Body>
                        <p>
                            Apakah Anda yakin ingin menghapus{" "}
                            <strong>{deleteItem.name}</strong>?
                        </p>
                    </Modal.Body>
                    <Modal.Footer
                        action="Hapus"
                        onAction={handleDelete}
                        onClose={() => setDeleteItem(null)}
                    />
                </Modal>
            )}
        </div>
    );
};

export default Table;

import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import Modal from "../admin/Modal";
import Select from "../common/Select";

const AdminDetail = ({ admin, onClose }) => {
    return (
        <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Detail Admin</h3>
            <div className="grid gap-2">
                <p>
                    <strong>ID:</strong> {admin?.id}
                </p>
                <p>
                    <strong>Username:</strong> {admin?.username}
                </p>
                <p>
                    <strong>Email:</strong> {admin?.email}
                </p>
                <p>
                    <strong>Role:</strong> {admin?.roles?.name || "No Role"}
                </p>
                <p>
                    <strong>Dibuat:</strong>{" "}
                    {new Date(admin?.createdAt).toLocaleString()}
                </p>
                <p>
                    <strong>Terakhir Diperbarui:</strong>{" "}
                    {new Date(admin?.updatedAt).toLocaleString()}
                </p>
            </div>
            <button
                className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition"
                onClick={onClose}
            >
                Tutup
            </button>
        </div>
    );
};

export default AdminDetail;

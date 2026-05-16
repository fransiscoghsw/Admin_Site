import apiAdmin from "../lib/axios";

// Create
export const createAdmin = async (data) => {
    try {
        const res = await apiAdmin.post("/admin/create", data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// All
export const getRoles = async () => {
    try {
        const res = await apiAdmin.get("/role");
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// Detail
export const detailAdmin = async (adminId) => {
    try {
        const res = await apiAdmin.get(`/admin/admins/${adminId}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// UPDATE
export const updateAdmin = async (adminId, data) => {
    try {
        const res = await apiAdmin.put(`/admin/admins/${adminId}`, data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
// DELETE
export const deleteAdmin = async (adminId) => {
    try {
        const res = await apiAdmin.delete(`/admin/admins/${adminId}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
// END CRUD ADMIN

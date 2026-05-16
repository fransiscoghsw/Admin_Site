import apiAdmin from "../lib/axios";

// Login
export const login = async (data) => {
    try {
        const res = await apiAdmin.post("/auth/admin/login", data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

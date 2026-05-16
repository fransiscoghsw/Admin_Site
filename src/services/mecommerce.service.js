import apiAdmin from "../lib/axios";

export const getAllMecommerce = async () => {
    try {
        const res = await apiAdmin.get("/mECommerce");
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getMecommerceById = async (ecommerceId) => {
    try {
        const res = await apiAdmin.get(`/mECommerce/${ecommerceId}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const createMecommerce = async (data) => {
    try {
        const res = await apiAdmin.post(`/mECommerce`, data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateMecommerce = async (ecommerceId, data) => {
    try {
        const res = await apiAdmin.put(`/mECommerce/${ecommerceId}`, data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteMecommerce = async (ecommerceId) => {
    try {
        const res = await apiAdmin.delete(`/mECommerce/${ecommerceId}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getMecommerceImage = async (ecommerceId) => {
    try {
        const res = await apiAdmin.delete(`/mECommerce/image/${ecommerceId}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

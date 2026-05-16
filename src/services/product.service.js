import apiAdmin from "../lib/axios";

export const createProduct = async (data) => {
    try {
        const res = await apiAdmin.post("/product", data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllProduct = async () => {
    try {
        const res = await apiAdmin.get("/product");
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateProduct = async (productId, data) => {
    try {
        const res = await apiAdmin.put(`/product/${productId}`, data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const res = await apiAdmin.delete(`/product/${productId}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getProductById = async (productId) => {
    try {
        const res = await apiAdmin.get(`/product/${productId}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getProductImage = async (productId) => {
    try {
        const res = await apiAdmin.get(`/product/image/${productId}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

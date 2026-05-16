import apiAdmin from "../lib/axios";

export const createMUnit = async (data) => {
    try {
        const isMultipart = data instanceof FormData;
        const headers = isMultipart
            ? {}
            : { "Content-Type": "application/json" };

        const res = await apiAdmin.post("/mUnit", data, { headers });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllMUnit = async () => {
    try {
        const res = await apiAdmin.get("/mUnit");
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateMUnit = async (mUnitId, data) => {
    try {
        const isMultipart = data instanceof FormData;
        const headers = isMultipart
            ? {}
            : { "Content-Type": "application/json" };

        const res = await apiAdmin.put(`/mUnit/${mUnitId}`, data, { headers });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteMUnit = async (mUnitId) => {
    try {
        const res = await apiAdmin.delete(`/mUnit/${mUnitId}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getMUnitById = async (mUnitId) => {
    try {
        const res = await apiAdmin.get(`/mUnit/${mUnitId}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getMUnitImage = async (mUnitId) => {
    try {
        const res = await apiAdmin.get(`/mUnit/image/${mUnitId}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

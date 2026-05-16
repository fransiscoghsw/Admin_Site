import apiAdmin from "../lib/axios";

export const getFounders = (callback) => {
    apiAdmin
        .get("/founder")
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const addFounder = (data, callback) => {
    apiAdmin
        .post("/founder", data, { withCredentials: true })
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const updateFounder = (id, data, callback) => {
    apiAdmin
        .put(`/founder/${id}`, data, { withCredentials: true })
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const deleteFounder = (id, callback) => {
    apiAdmin
        .delete(`/founder/${id}`, { withCredentials: true })
        .then(() => {
            callback();
        })
        .catch((err) => {
            console.log(`Error deleting founder with id: ${id}`, err);
        });
};

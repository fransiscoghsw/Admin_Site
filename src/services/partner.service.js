import apiAdmin from "../lib/axios";

export const getPartner = (callback) => {
    apiAdmin
        .get("/partner")
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const addPartner = (data, callback) => {
    apiAdmin
        .post("/partner", data)
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const updatePartner = (id, data, callback) => {
    apiAdmin
        .put(`/partner/${id}`, data)
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const deletePartner = (id, callback) => {
    apiAdmin
        .delete(`/partner/${id}`)
        .then(() => {
            callback();
        })
        .catch((err) => {
            console.error(`Error deleting partner with id: ${id}`, err);
        });
};

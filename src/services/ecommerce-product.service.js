import apiAdmin from "../lib/axios";

export const getAllEcommerceProduct = (callback) => {
    apiAdmin
        .get("/eCommerceProduct")
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getEcommerceProductById = (id, callback) => {
    apiAdmin
        .get(`/eCommerceProduct/${id}`)
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const createEcommerceProduct = (data, callback) => {
    apiAdmin
        .post("/eCommerceProduct", data)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const updateEcommerceProduct = (id, data, callback) => {
    apiAdmin
        .put(`/eCommerceProduct/${id}`, data)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const deleteEcommerceProduct = (id, callback) => {
    apiAdmin
        .delete(`/eCommerceProduct/${id}`)
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

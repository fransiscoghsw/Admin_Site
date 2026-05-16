import apiAdmin from "../lib/axios";

export const getCustomer = (callback) => {
    apiAdmin
        .get("/customer")
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const addCustomer = (data, callback) => {
    apiAdmin
        .post("/customer", data)
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const updateCustomer = (id, data, callback) => {
    apiAdmin
        .put(`/customer/${id}`, data)
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const deleteCustomer = (id, callback) => {
    apiAdmin
        .delete(`/customer/${id}`)
        .then(() => {
            callback();
        })
        .catch((err) => {
            console.error(`Error deleting customer with id: ${id}`, err);
        });
};

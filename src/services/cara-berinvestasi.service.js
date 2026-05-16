import apiAdmin from "../lib/axios";

export const getCaraBerinvestasis = (callback) => {
    apiAdmin
        .get("/cara-berinvestasi")
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

// Perbaikan di sini - menambahkan parameter data
export const addCaraBerinvestasi = (data, callback) => {
    apiAdmin
        .post("/cara-berinvestasi", data) // Menambahkan data ke request
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const updateCaraBerinvestasi = (id, data, callback) => {
    apiAdmin
        .put(`/cara-berinvestasi/${id}`, data)
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const deleteCaraBerinvestasi = (id, callback) => {
    apiAdmin
        .delete(`/cara-berinvestasi/${id}`)
        .then(() => {
            callback();
        })
        .catch((err) => {
            console.error(
                `Error deleting cara berinvestasi with id: ${id}`,
                err
            );
        });
};

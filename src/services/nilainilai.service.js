import apiAdmin from "../lib/axios";

export const getNilaiNilais = (callback) => {
    apiAdmin
        .get("/nilai-nilai-perusahaan")
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

// Perbaikan di sini - menambahkan parameter data
export const addNilaiNilai = (data, callback) => {
    apiAdmin
        .post("/nilai-nilai-perusahaan", data) // Menambahkan data ke request
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const updateNilaiNilai = (id, data, callback) => {
    apiAdmin
        .put(`/nilai-nilai-perusahaan/${id}`, data)
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const deleteNilaiNilai = (id, callback) => {
    apiAdmin
        .delete(`/nilai-nilai-perusahaan/${id}`)
        .then(() => {
            callback();
        })
        .catch((err) => {
            console.error(`Error deleting nilai perusahan with id: ${id}`, err);
        });
};

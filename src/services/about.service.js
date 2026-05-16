import apiAdmin from "../lib/axios";

export const getAbouts = (callback) => {
    apiAdmin
        .get("/tentang-kami")
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getAboutSejarahs = (callback) => {
    apiAdmin
        .get("/sejarah")
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getFounder = (callback) => {
    apiAdmin
        .get("/founder")
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

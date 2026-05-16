import apiAdmin from "../lib/axios";

export const getAboutSejarahs = (callback) => {
    apiAdmin
        .get("/sejarah")
        .then((res) => {
            callback(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

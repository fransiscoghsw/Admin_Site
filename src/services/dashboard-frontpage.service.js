import apiAdmin from "../lib/axios";

export const getDashboardFrontpage = async (lang) => {
    try {
        const res = await apiAdmin.get("/homepage", {
            params: {
                lang,
            },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// export const getDashboardFrontpage = (callback, lang) => {
//     apiAdmin
//         .get("/homepage", {
//             params: {
//                 lang,
//             },
//         })
//         .then((res) => {
//             callback(res.data.data);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

export const saveDashboardFrontpage = async (data) => {
    try {
        const isMultipart = data instanceof FormData;
        const headers = isMultipart
            ? {}
            : { "Content-Type": "application/json" };

        const res = await apiAdmin.post("/homepage", data, { headers });
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// export const saveDashboardFrontpage = (data, callback) => {
//     apiAdmin
//         .post("/homepage", data)
//         .then((res) => {
//             callback(res.data.data);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

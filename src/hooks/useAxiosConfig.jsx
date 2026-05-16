// import axios from "axios";

// // Instance Axios untuk Admin
// const apiAdmin = axios.create({
//     baseURL: `${import.meta.env.VITE_API_URL}`,
//     withCredentials: true,
// });

// apiAdmin.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 // Coba refresh token admin
//                 await apiAdmin.post("/auth/admin/refresh-token");
//                 // Coba ulangi request asli
//                 return apiAdmin(originalRequest);
//             } catch (refreshError) {
//                 window.location.href = "/masuk"; // Redirect ke halaman login admin
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export { apiAdmin };

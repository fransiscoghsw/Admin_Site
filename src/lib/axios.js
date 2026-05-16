import axios from "axios";

// Buat instance Axios untuk admin
const apiAdmin = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Tidak perlu template literal jika langsung digunakan
    withCredentials: true,
});

// Tambahkan interceptor untuk menangani token refresh
apiAdmin.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Coba refresh token admin
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/admin/refresh-token`,
                    {},
                    { withCredentials: true } // Dengan credentials agar cookies bisa dikirim
                );

                // Coba ulangi request asli
                return apiAdmin(originalRequest);
            } catch (refreshError) {
                window.location.href = "/masuk";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiAdmin;

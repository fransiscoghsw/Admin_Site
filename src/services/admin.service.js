import apiAdmin from "../lib/axios";

// START CRUD ADMIN

// Create
export const createAdmin = async (data) => {
  try {
    // const isMultipart = data instanceof FormData;
    // const headers = isMultipart
    //     ? {}
    //     : { "Content-Type": "application/json" };
    const res = await apiAdmin.post("/admin/create", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// All
export const getAdmins = async () => {
  try {
    const res = await apiAdmin.get("/admin/admins");
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Detail
export const detailAdmin = async (adminId) => {
  try {
    const res = await apiAdmin.get(`/admin/admins/${adminId}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// UPDATE
export const updateAdmin = async (adminId, data) => {
  try {
    const res = await apiAdmin.put(`/admin/admins/${adminId}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// DELETE
export const deleteAdmin = async (adminId) => {
  try {
    const res = await apiAdmin.delete(`/admin/admins/${adminId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// END CRUD ADMIN

export const getAdmin = (callback) => {
  apiAdmin
    .get("/admin")
    .then((res) => {
      const adminData = res.data.data;
      callback({
        email: adminData.email,
        username: adminData.username,
        adminBiodata: {
          foto_profil: adminData.adminBiodata?.foto_profil || "",
          nama_lengkap: adminData.adminBiodata?.nama_lengkap || "",
          no_hp: adminData.adminBiodata?.no_hp || "",
          jk: adminData.adminBiodata?.jk || "",
          tempat_lahir: adminData.adminBiodata?.tempat_lahir || "",
          tanggal_lahir: adminData.adminBiodata?.tanggal_lahir || "",
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const saveProfileAdmin = (data, callback) => {
  apiAdmin
    .post("/biodata-admin", data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updatePasswordAdmin = (data, callback, errorCallback) => {
  apiAdmin
    .post("/admin/ubah-password", data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      if (err.response?.data?.message) {
        errorCallback(err.response.data.message);
      } else {
        errorCallback("Terjadi kesalahan saat mengubah kata sandi");
      }
    });
};

export const resetPasswordAdmin = (data, callback, errorCallback) => {
  apiAdmin
    .post("/auth/admin/reset-password", data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      if (err.response?.data?.message) {
        errorCallback(err.response.data.message);
      } else {
        errorCallback("Terjadi kesalahan saat mengatur ulang kata sandi");
      }
    });
};

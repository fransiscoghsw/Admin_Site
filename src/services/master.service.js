import apiAdmin from "../lib/axios";

export const getProvinsi = async (callback) => {
  try {
    const res = await apiAdmin.get("/mProvince");
    const data = res.data?.data || [];
    if (typeof callback === "function") {
      callback(data);
    }
    return data;
  } catch (err) {
    console.error("Error fetching provinces:", err);
    if (typeof callback === "function") {
      callback([]);
    }
    return [];
  }
};

export const getKota = async (provinceId, callback) => {
  if (!provinceId) {
    console.error("Province ID is required");
    if (typeof callback === "function") {
      callback([]);
    }
    return [];
  }

  try {
    const res = await apiAdmin.get(`/mCity?provinceId=${provinceId}`);
    const data = res.data?.data || [];
    if (typeof callback === "function") {
      callback(data);
    }
    return data;
  } catch (err) {
    console.error("Error fetching cities:", err);
    if (typeof callback === "function") {
      callback([]);
    }
    return [];
  }
};

export const getKecamatan = async (cityId, callback) => {
  if (!cityId) {
    console.error("City ID is required");
    if (typeof callback === "function") {
      callback([]);
    }
    return [];
  }

  try {
    const res = await apiAdmin.get(`/mKecamatan?cityId=${cityId}`);
    const data = res.data?.data || [];
    if (typeof callback === "function") {
      callback(data);
    }
    return data;
  } catch (err) {
    console.error("Error fetching districts:", err);
    if (typeof callback === "function") {
      callback([]);
    }
    return [];
  }
};

export const getKelurahan = async (kecamatanId, callback) => {
  if (!kecamatanId) {
    console.error("Kecamatan ID is required");
    if (typeof callback === "function") {
      callback([]);
    }
    return [];
  }

  try {
    const res = await apiAdmin.get(`/mKelurahan?kecamatanId=${kecamatanId}`);
    const data = res.data?.data || [];
    if (typeof callback === "function") {
      callback(data);
    }
    return data;
  } catch (err) {
    console.error("Error fetching villages:", err);
    if (typeof callback === "function") {
      callback([]);
    }
    return [];
  }
};

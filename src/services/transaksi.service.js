import apiAdmin from "../lib/axios";

export const getAllTransaction = (callback) => {
  apiAdmin
    .get("/transaction")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTransactionsByInvestor = async (investorId) => {
  try {
    const res = await apiAdmin.get(`/admin/transaction/investor/${investorId}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createTransaction = async (transactionData) => {
  try {
    const res = await apiAdmin.post(
      "/admin/transaction/create",
      transactionData
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateTransaction = async (transactionId, transactionData) => {
  try {
    const res = await apiAdmin.put(
      `/admin/transaction/update/${transactionId}`,
      transactionData
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteTransaction = async (transactionId) => {
  try {
    const res = await apiAdmin.delete(
      `/admin/transaction/delete/${transactionId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const importTransactionData = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiAdmin.post(
      `/admin/investor/importExcel/transaction`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const importProfitSharingData = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiAdmin.post(
      `/admin/investor/importExcel/profitSharing`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const changeTransaction = async (transactionId, investorId) => {
  try {
    const res = await apiAdmin.put(
      `/admin/transaction/change/${transactionId}`,
      { investorId: investorId } // Kirim sebagai body dalam format yang benar
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

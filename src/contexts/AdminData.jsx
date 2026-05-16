import { createContext, useState } from "react";

export const AdminData = createContext();

export const AdminDataProvider = ({ children }) => {
  const [admin, setAdmin] = useState({
    email: "",
    username: "",
    adminBiodata: {
      foto_profil: "",
      nama_lengkap: "",
      no_hp: "",
      jk: "",
      tempat_lahir: "",
      tanggal_lahir: "",
    },
  });

  return (
    <AdminData.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminData.Provider>
  );
};

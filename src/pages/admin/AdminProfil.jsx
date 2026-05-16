import Admin from "../../assets/images/admin.svg";
import Label from "../../components/common/Label";
import Input from "../../components/common/Input";
import InputError from "../../components/common/InputError";
import Modal from "../../components/common/Modal";
// import PasswordValidation from "../../components/guest/PasswordValidation";
import AdminLayout from "../../layouts/AdminLayout";
import {
  saveProfileAdmin,
  updatePasswordAdmin,
  getAdmin,
} from "../../services/admin.service";
import { formatDate } from "../../utils/formatDate";
import { isValidEmail } from "../../utils/validateEmail";
import { isValidIndonesianPhoneNumber } from "../../utils/validatePhoneNumber";
import { showToast } from "../../utils/toast";
import { AdminData } from "../../contexts/AdminData";
import { useContext, useState, useEffect } from "react";
import { PiNotePencil } from "react-icons/pi";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";

const AdminProfil = () => {
  const { admin, setAdmin } = useContext(AdminData);
  const [formAdmin, setFormAdmin] = useState({
    email: "",
    foto_profil: null,
    nama_lengkap: "",
    no_hp: "",
    jk: "",
    tempat_lahir: "",
    tanggal_lahir: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  // Input Validations: Start
  const validateForm = () => {
    let newErrors = {};
    if (!formAdmin.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!isValidEmail(formAdmin.email)) {
      newErrors.email =
        "Email tidak valid. Harap masukkan email yang benar (contoh: admin@example.test)";
    }
    if (!formAdmin.foto_profil) {
      newErrors.foto_profil = "Foto profil wajib diunggah";
    }
    if (!formAdmin.nama_lengkap.trim()) {
      newErrors.nama_lengkap = "Nama lengkap wajib diisi";
    }
    if (!formAdmin.no_hp.trim()) {
      newErrors.no_hp = "Nomor telepon wajib diisi";
    } else if (!isValidIndonesianPhoneNumber(formAdmin.no_hp)) {
      newErrors.no_hp =
        "Nomor telepon tidak valid. Harap masukkan nomor telepon yang benar (contoh: 08123456789)";
    }
    if (formAdmin.jk.length === 0) {
      newErrors.jk = "Jenis kelamin wajib dipilih";
    }
    if (!formAdmin.tempat_lahir.trim()) {
      newErrors.tempat_lahir = "Tempat lahir wajib diisi";
    }
    if (!formAdmin.tanggal_lahir.trim()) {
      newErrors.tanggal_lahir = "Tanggal lahir wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getErrorMessage = (fieldName) => {
    const fieldNames = {
      email: "Email",
      nama_lengkap: "Nama lengkap",
      no_hp: "Nomor telepon",
      jk: "Jenis kelamin",
      tempat_lahir: "Tempat lahir",
      tanggal_lahir: "Tanggal lahir",
    };

    return `${fieldNames[fieldName] || fieldName} wajib diisi`;
  };

  const clearError = (fieldName) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[fieldName];
      return newErrors;
    });
  };
  // Input Validations: End

  // Update Admin Profile: Start
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormAdmin({
      ...formAdmin,
      [name]: value,
    });

    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: getErrorMessage(name),
      }));
    } else if (name === "email" && !isValidEmail(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]:
          "Email tidak valid. Harap masukkan email yang benar (contoh: admin@example.test)",
      }));
    } else if (name === "no_hp" && !isValidIndonesianPhoneNumber(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]:
          "Nomor telepon tidak valid. Harap masukkan nomor telepon yang benar (contoh: 08123456789)",
      }));
    } else {
      clearError(name);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validTypes = [
        "image/svg+xml",
        "image/png",
        "image/jpeg",
        "image/jpg",
      ];
      if (validTypes.includes(file.type)) {
        setFormAdmin({
          ...formAdmin,
          foto_profil: file,
        });
        setPreviewImage(URL.createObjectURL(file));
        clearError("foto_profil");
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          foto_profil: "Foto profil harus berupa SVG, PNG, JPG, atau JPEG",
        }));

        e.target.value = null;
      }
    }
  };

  const genderOptions = [
    { value: "pria", label: "Pria" },
    { value: "wanita", label: "Wanita" },
  ];

  const handleGenderChange = (selectedOption) => {
    setFormAdmin({
      ...formAdmin,
      jk: selectedOption.value,
    });

    if (selectedOption.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        tags: "Jenis kelamin wajib dipilih",
      }));
    } else {
      clearError("jk");
    }
  };

  const handleSaveAdminProfile = () => {
    if (validateForm()) {
      const dataToSend = new FormData();
      dataToSend.append("email", formAdmin.email);
      if (formAdmin.foto_profil) {
        dataToSend.append("foto_profil", formAdmin.foto_profil);
      }
      dataToSend.append("nama_lengkap", formAdmin.nama_lengkap);
      dataToSend.append("no_hp", formAdmin.no_hp);
      dataToSend.append("jk", formAdmin.jk);
      dataToSend.append("tempat_lahir", formAdmin.tempat_lahir);
      dataToSend.append("tanggal_lahir", formAdmin.tanggal_lahir);

      saveProfileAdmin(dataToSend, (newData) => {
        setAdmin({
          ...admin, // Salin data yang sudah ada
          email: newData.admin.email, // Update email dari respons
          adminBiodata: {
            // Buat objek adminBiodata secara manual
            foto_profil: newData.foto_profil,
            nama_lengkap: newData.nama_lengkap,
            no_hp: newData.no_hp,
            jk: newData.jk,
            tempat_lahir: newData.tempat_lahir,
            tanggal_lahir: newData.tanggal_lahir,
          },
        });

        setPreviewImage(
          `${import.meta.env.VITE_API_URL}/biodata-admin/images/${
            newData.foto_profil
          }`
        );
      });
      closeModal();
    }
  };
  // Update Admin Profile: End

  // Update Admin Password: Start
  const handleUpdatePasswordAdmin = (values) => {
    const passwordData = {
      oldPassword: values.current_password,
      newPassword: values.new_password,
      confirmationNewPassword: values.confirm_new_password,
    };

    updatePasswordAdmin(
      passwordData,
      (response) => {
        formik.resetForm();

        showToast("Kata sandi berhasil diubah");
      },
      (errorMessage) => {
        // formik.setFieldError("current_password", errorMessage);
        formik.setFieldError(
          "current_password",
          "Kata sandi lama salah. Silakan coba lagi."
        );
      }
    );
  };

  const validationSchema = Yup.object().shape({
    current_password: Yup.string().required("Kata sandi lama wajib diisi"),
    new_password: Yup.string()
      .min(8, "Kata sandi harus terdiri dari minimal 8 karakter")
      .matches(/[0-9]/, "Kata sandi harus terdiri dari minimal 1 angka")
      .matches(/[A-Z]/, "Kata sandi harus terdiri dari minimal 1 huruf besar")
      .matches(/[a-z]/, "Kata sandi harus terdiri dari minimal 1 huruf kecil")
      .matches(/[^\w]/, "Kata sandi mengandung minimal satu simbol (@!$%*?&)")
      .required("Kata sandi baru wajib diisi"),
    confirm_new_password: Yup.string()
      .oneOf(
        [Yup.ref("new_password")],
        "Konfirmasi kata sandi harus cocok dengan kata sandi"
      )
      .required("Konfirmasi kata sandi baru wajib diisi"),
  });

  const formik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    },
    onSubmit: handleUpdatePasswordAdmin,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });
  // Update Admin Password: End

  // Modal: Start
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
    // Mengatur ulang form ke data terbaru dari state 'admin'
    setFormAdmin({
      email: admin.email || "",
      foto_profil: admin.adminBiodata?.foto_profil || "",
      nama_lengkap: admin.adminBiodata?.nama_lengkap || "",
      no_hp: admin.adminBiodata?.no_hp || "",
      jk: admin.adminBiodata?.jk || "",
      tempat_lahir: admin.adminBiodata?.tempat_lahir || "",
      tanggal_lahir: admin.adminBiodata?.tanggal_lahir || "",
    });

    if (admin.adminBiodata?.foto_profil) {
      setPreviewImage(
        `${import.meta.env.VITE_API_URL}/biodata-admin/images/${
          admin.adminBiodata.foto_profil
        }`
      );
    } else {
      setPreviewImage(Admin);
    }
  };

  const closeModal = () => {
    setModalType("");
    setIsModalOpen(false);
    setErrors({});
  };
  // Modal: End

  // Custom style react-select
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      // color: state.isSelected ? "white" : "black",
      color: state.isFocused ? "white" : "black",
      backgroundColor: state.isFocused ? "#B87817" : "white",
      "&:hover": {
        backgroundColor: "#B87817",
        color: "white",
      },
    }),
  };

  useEffect(() => {
    getAdmin((data) => {
      setAdmin(data);
    });
  }, [setAdmin]);

  return (
    <AdminLayout title={"Halaman Profil Admin"}>
      <div className="flex flex-col">
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-8 px-6">
          <div className="bg-white max-w-5xl mx-auto p-10 rounded-2xl space-y-6">
            <div className="py-6 px-7 border border-gray-400 shadow-md rounded-2xl">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="w-28 h-28 rounded-full shadow-md overflow-hidden">
                      <img
                        src={
                          admin.adminBiodata?.foto_profil
                            ? `${
                                import.meta.env.VITE_API_URL
                              }/biodata-admin/images/${
                                admin.adminBiodata.foto_profil
                              }`
                            : Admin
                        }
                        alt={
                          admin.adminBiodata?.foto_profil
                            ? admin.adminBiodata.foto_profil
                            : "default admin"
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h4 className="font-semibold text-2xl">
                        {admin.username}
                      </h4>
                      <p className="text-gray-600 text-lg">Admin</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openModal("update_admin_profile")}
                    className="py-2 px-4 border border-gray-400 rounded-2xl flex items-center gap-[6px] hover:shadow-md duration-300 ease-in-out"
                  >
                    <p className="font-medium">Ubah</p>
                    <PiNotePencil className="w-[18px] h-[18px]" />
                  </button>

                  <Modal open={isModalOpen} onClose={closeModal}>
                    {modalType === "update_admin_profile" && (
                      <>
                        <Modal.Header
                          title={"Ubah Profil"}
                          onClose={closeModal}
                        />
                        <Modal.Body>
                          <Label
                            htmlFor={"foto_profil"}
                            value={"Foto Profil"}
                          />
                          <div
                            className={`flex flex-col items-center justify-center w-full py-4 h-full border-2 rounded-2xl bg-gray-50 shadow ${
                              errors.foto_profil
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            {previewImage && (
                              <img
                                src={previewImage}
                                alt={previewImage}
                                className="object-top w-40 h-40 mb-4 object-cover rounded-full border-2 border-gray-300"
                              />
                            )}

                            <label
                              htmlFor="foto_profil"
                              className={`flex flex-col items-center justify-center w-full cursor-pointer ${
                                !previewImage && "h-32"
                              }`}
                            >
                              <div className="flex flex-col items-center justify-center">
                                <div className="flex items-center gap-2 mb-2">
                                  <svg
                                    className="w-8 h-8 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                  </svg>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                      Unggah gambar di sini
                                    </span>
                                  </p>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  SVG, PNG, JPG atau JPEG
                                </p>
                              </div>
                              <input
                                id="foto_profil"
                                name="foto_profil"
                                type="file"
                                className="hidden"
                                onChange={handleImageChange}
                                accept=".svg,.png,.jpg,.jpeg"
                              />
                            </label>
                          </div>
                          <InputError message={errors.foto_profil} />

                          <Label
                            htmlFor={"nama_lengkap"}
                            value={"Nama Lengkap"}
                          />
                          <Input
                            type={"text"}
                            name={"nama_lengkap"}
                            placeholder={"Masukkan nama lengkap.."}
                            variant={"primary-outline"}
                            value={formAdmin.nama_lengkap}
                            handleChange={handleTextChange}
                            isError={!!errors.nama_lengkap}
                          />
                          <InputError message={errors.nama_lengkap} />

                          <Label htmlFor={"email"} value={"Email"} />
                          <Input
                            type={"email"}
                            name={"email"}
                            placeholder={"Masukkan email.."}
                            variant={"primary-outline"}
                            value={formAdmin.email}
                            handleChange={handleTextChange}
                            isError={!!errors.email}
                          />
                          <InputError message={errors.email} />

                          <Label htmlFor={"no_hp"} value={"Nomor Telepon"} />
                          <Input
                            type={"text"}
                            name={"no_hp"}
                            placeholder={"Masukkan nomor telepon.."}
                            variant={"primary-outline"}
                            value={formAdmin.no_hp}
                            handleChange={handleTextChange}
                            isError={!!errors.no_hp}
                          />
                          <InputError message={errors.no_hp} />

                          <Label htmlFor={"jk"} value={"Jenis Kelamin"} />
                          <Select
                            id="jk"
                            name="jk"
                            options={genderOptions}
                            value={genderOptions.find(
                              (option) => option.value === formAdmin.jk
                            )} // Set default selected value
                            onChange={handleGenderChange}
                            className={errors.jk ? "input-error" : "input"}
                            styles={customStyles}
                          />
                          <InputError message={errors.jk} />

                          <Label
                            htmlFor={"tempat_lahir"}
                            value={"Tempat Lahir"}
                          />
                          <Input
                            type={"text"}
                            name={"tempat_lahir"}
                            placeholder={"Masukkan tempat lahir.."}
                            variant={"primary-outline"}
                            value={formAdmin.tempat_lahir}
                            handleChange={handleTextChange}
                            isError={!!errors.tempat_lahir}
                          />
                          <InputError message={errors.tempat_lahir} />

                          <Label
                            htmlFor={"tanggal_lahir"}
                            value={"Tanggal Lahir"}
                          />
                          <Input
                            type={"date"}
                            name={"tanggal_lahir"}
                            placeholder={"Masukkan tanggal lahir.."}
                            variant={"primary-outline"}
                            value={formAdmin.tanggal_lahir}
                            handleChange={handleTextChange}
                            isError={!!errors.tanggal_lahir}
                          />
                          <InputError message={errors.tanggal_lahir} />
                        </Modal.Body>
                        <Modal.Footer
                          action={"Ubah"}
                          onAction={handleSaveAdminProfile}
                          onClose={closeModal}
                        />
                      </>
                    )}
                  </Modal>
                </div>

                <div className="grid grid-cols-2 gap-5 ms-1">
                  <div>
                    <p className="text-gray-600">Nama Lengkap</p>
                    <p className="text-lg font-medium">
                      {admin.adminBiodata?.nama_lengkap}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="text-lg font-medium">{admin.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Nomor Telepon</p>
                    <p className="text-lg font-medium">
                      {admin.adminBiodata?.no_hp}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Jenis Kelamin</p>
                    <p className="text-lg font-medium">
                      {admin.adminBiodata?.jk}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tempat Lahir</p>
                    <p className="text-lg font-medium">
                      {admin.adminBiodata?.tempat_lahir}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tanggal Lahir</p>
                    <p className="text-lg font-medium">
                      {formatDate(admin.adminBiodata?.tanggal_lahir)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-6 px-7 border border-gray-400 shadow-md rounded-2xl">
              <form onSubmit={formik.handleSubmit}>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-2xl mb-2">
                    Ubah Kata Sandi
                  </h4>
                  <button
                    type="submit"
                    className="py-2 px-4 border border-gray-400 rounded-2xl flex items-center gap-[6px] hover:shadow-md duration-300 ease-in-out"
                  >
                    <p className="font-medium">Ubah</p>
                    <PiNotePencil className="w-[18px] h-[18px]" />
                  </button>
                </div>
                <div className="max-w-lg">
                  <div>
                    <Label
                      value={"Kata Sandi Lama"}
                      htmlFor={"current_password"}
                    />
                    <Input
                      name="current_password"
                      type="password"
                      variant="primary-outline"
                      placeholder="Masukkan kata sandi lama.."
                      value={formik.values.current_password}
                      handleChange={formik.handleChange}
                      isError={
                        !!formik.errors.current_password &&
                        formik.touched.current_password
                      }
                    />
                    <InputError
                      message={
                        formik.touched.current_password
                          ? formik.errors.current_password
                          : ""
                      }
                    />
                  </div>
                  <div>
                    <Label value={"Kata Sandi Baru"} htmlFor={"new_password"} />
                    <Input
                      name="new_password"
                      type="password"
                      variant="primary-outline"
                      placeholder="Masukkan kata sandi lama.."
                      value={formik.values.new_password}
                      handleChange={formik.handleChange}
                      isError={
                        !!formik.errors.new_password &&
                        formik.touched.new_password
                      }
                    />
                    {formik.errors.new_password &&
                    formik.errors.new_password.includes(
                      "Kata sandi baru wajib diisi"
                    ) ? (
                      <InputError
                        message={
                          formik.touched.new_password
                            ? formik.errors.new_password
                            : ""
                        }
                      />
                    ) : null}
                  </div>
                  <div>
                    <Label
                      value={"Konfirmasi Kata Sandi Baru"}
                      htmlFor={"confirm_new_password"}
                    />
                    <Input
                      name="confirm_new_password"
                      type="password"
                      variant="primary-outline"
                      placeholder="Masukkan konfirmasi kata sandi baru.."
                      value={formik.values.confirm_new_password}
                      handleChange={formik.handleChange}
                      isError={
                        !!formik.errors.confirm_new_password &&
                        formik.touched.confirm_new_password
                      }
                    />
                    {formik.errors.confirm_new_password &&
                    formik.errors.confirm_new_password.includes(
                      "Konfirmasi kata sandi baru wajib diisi"
                    ) ? (
                      <InputError
                        message={
                          formik.touched.confirm_new_password
                            ? formik.errors.confirm_new_password
                            : ""
                        }
                      />
                    ) : null}
                  </div>

                  {/* <PasswordValidation
                    password={formik.values.new_password}
                    confirmPassword={formik.values.confirm_new_password}
                  /> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfil;

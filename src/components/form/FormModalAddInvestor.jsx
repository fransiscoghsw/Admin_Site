import React from "react";
import PropTypes from "prop-types";
import Modal from "../admin/Modal.jsx";
import Input from "../common/Input.jsx";
import Label from "../common/Label.jsx";
import Select from "../common/Select.jsx";

const FormModalAddInvestor = ({ title, initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = React.useState({
    username: initialData?.username || "",
    email: initialData?.email || "",
    profilePhoto: initialData?.profilePhoto || "",
    password: "",
    fullname: initialData?.fullname || "",
    gender: initialData?.gender || "",
    investorType: initialData?.investorType || "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    console.log("File yang akan diupload:", formData.profilePhoto);
    // Jika file adalah objek File, lihat namanya
    if (formData.profilePhoto instanceof File) {
      console.log("Nama file original:", formData.profilePhoto.name);
    }
    
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    
    console.log("FormData entries:");
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, ":", value instanceof File ? value.name : value);
    }
    
    onSubmit(formDataToSend)
  .then(response => {
    console.log("Respons dari API create:", response);
  });
  };

  return (
    <>
      <Modal.Header title={title} onClose={onClose} />
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label value="Username" />
            <Input
              type="text"
              name="username"
              value={formData.username}
              handleChange={handleChange}
              required
            />
          </div>
          <div>
            <Label value="Email" />
            <Input
              type="email"
              name="email"
              value={formData.email}
              handleChange={handleChange}
              required
            />
          </div>
          <div>
            <Label value="Foto Profil" />
            <Input
              type="file"
              name="profilePhoto"
              handleChange={handleChange}
              accept="image/*"
            />
            {formData.profilePhoto && (
              <span className="text-sm text-gray-500">
                Selected: {formData.profilePhoto.name}
              </span>
            )}
          </div>
          <div>
            <Label value="Nama Lengkap" />
            <Input
              type="text"
              name="fullname" // Change fullName to fullname
              value={formData.fullname} // Change fullName to fullname
              handleChange={handleChange}
              required
            />
          </div>
          <div>
            <Label value="Jenis Kelamin" />
            <Select
              name="gender"
              value={formData.gender}
              handleChange={handleChange}
              required
              options={[
                { value: "Male", label: "Laki-laki" }, // Already correct
                { value: "Female", label: "Perempuan" }, // Already correct
              ]}
            />
          </div>
          <div>
            <Label value="Password" />
            <Input
              type="password"
              name="password"
              value={formData.password}
              handleChange={handleChange}
              required={!initialData}
            />
          </div>
          <div>
            <Label value="Tipe Investor" />
            <Select
              name="investorType"
              value={formData.investorType}
              handleChange={handleChange}
              required
              options={[
                { value: "individual", label: "Individu" },
                { value: "organization", label: "Organisasi" },
              ]}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer
        buttonLabel="Batal"
        action="Simpan"
        onAction={handleSubmit}
        onClose={onClose}
      />
    </>
  );
};
FormModalAddInvestor.propTypes = {
  title: PropTypes.string.isRequired,
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FormModalAddInvestor;

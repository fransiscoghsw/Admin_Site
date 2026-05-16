import Modal from "../admin/Modal";
import Button from "./Button";
import { useState } from "react";

const ExcelUploadModal = ({
  isOpen,
  onClose,
  onUpload,
  title = "Import Excel",
  description = "Upload file Excel (.xlsx, .xls) atau CSV yang berisi data",
  uploadButtonText = "Import",
  templateUrl,
}) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const acceptedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
      "application/vnd.ms-excel", // xls
      "text/csv", // csv
    ];

    if (selectedFile && acceptedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert("Please select an Excel or CSV file");
      e.target.value = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onUpload(file);
      setFile(null);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header title={title} onClose={onClose} />
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-primary file:text-white
              hover:file:bg-primary/80"
            />
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={!file}>
              {uploadButtonText}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ExcelUploadModal;

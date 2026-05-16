import React from "react";
import Modal from "../common/Modal.jsx";

const ArticleDeleteModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <Modal open={isOpen} onClose={onClose} size="sm">
      <Modal.Header title="Hapus Artikel" onClose={onClose} />
      <Modal.Body>
        <p>Apakah Anda yakin ingin menghapus artikel ini?</p>
      </Modal.Body>
      <Modal.Footer action="Hapus" onAction={onDelete} onClose={onClose} />
    </Modal>
  );
};

export default ArticleDeleteModal;

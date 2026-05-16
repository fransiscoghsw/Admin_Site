import { useState, useCallback } from "react";

export const useArticleForm = (initialState) => {
  const [formArticle, setFormArticle] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validateForm = useCallback(
    (modalType) => {
      let newErrors = {};
      if (!formArticle.judul.trim()) {
        newErrors.judul = "Judul artikel wajib diisi";
      }
      if (!formArticle.penulis.trim()) {
        newErrors.penulis = "Nama penulis wajib diisi";
      }
      if (
        !formArticle.deskripsi.trim() ||
        formArticle.deskripsi.replace(/<[^>]*>/g, "").trim() === ""
      ) {
        newErrors.deskripsi = "Isi artikel wajib diisi";
      }
      if ((formArticle.tags || []).length === 0) {
        newErrors.tags = "Pilih setidaknya satu tag";
      }
      if (!formArticle.tanggal) {
        newErrors.tanggal = "Tanggal wajib diisi";
      }
      if (!formArticle.gambar && modalType === "add_article") {
        newErrors.gambar = "Gambar wajib diunggah";
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formArticle]
  );

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleTagChange = useCallback((selectedOptions) => {
    setFormArticle((prev) => ({
      ...prev,
      tags: selectedOptions.map((option) => ({
        id: option.value,
        nama: option.label,
      })),
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormArticle({
      judul: "",
      penulis: "",
      tags: [],
      deskripsi: "",
      tanggal: "",
      gambar: null,
      subArtikels: [],
    });
    setErrors({});
  }, []);

  return {
    formArticle,
    setFormArticle,
    errors,
    setErrors,
    validateForm,
    handleInputChange,
    handleTagChange,
    resetForm,
  };
};

import React, { useEffect, useState } from "react";
import {
  addArticle,
  getImageArticle,
  getSubImageArticle,
} from "../../../services/article.service.js";
import { getArticleTags } from "../../../services/article-tag.service.js";
import Button from "../../../components/common/Button.jsx";
import Label from "../../../components/common/Label.jsx";
import Input from "../../../components/common/Input.jsx";
import InputError from "../../../components/common/InputError.jsx";
import MultiSelect from "../../../components/common/MultiSelect.jsx";
import JoditEditor from "jodit-react";
import { showToast } from "../../../utils/toast.js";
import { useRef, useMemo } from "react";
import "../../../styles/jodit-custom.css";
import "../../../styles/modal-override.css";
import Modal from "../../../components/common/Modal.jsx";
import { PiPlus, PiTrash } from "react-icons/pi";

const ArticleAdd = () => {
  const [loading, setLoading] = useState(true);
  const [formArticle, setFormArticle] = useState({
    judul: "",
    penulis: "",
    tags: [],
    deskripsi: "",
    tanggal: "",
    gambar: null,
    keteranganGambar: "",
    tautanGambar: "",
    altGambar: "",
    subArtikels: [], // Start with empty array
  });
  const [errors, setErrors] = useState({});
  const [articleTags, setArticleTags] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isSubImageModalOpen, setIsSubImageModalOpen] = useState(false);
  const [currentSubIndex, setCurrentSubIndex] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [subImagePreviews, setSubImagePreviews] = useState({});
  const [mainImageData, setMainImageData] = useState(null);
  const [subImageData, setSubImageData] = useState({});

  // Editor refs and content states
  const indonesianEditorRef = useRef(null);
  const [indonesianContent, setIndonesianContent] = useState("");
  const [subEditorRefs, setSubEditorRefs] = useState([]);
  const [subEditorContents, setSubEditorContents] = useState([]);

  // Efek untuk menambah/menghapus class pada body saat modal aktif
  useEffect(() => {
    const className = "modal-is-open";
    if (isImageModalOpen || isSubImageModalOpen) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }

    // Cleanup function
    return () => {
      document.body.classList.remove(className);
    };
  }, [isImageModalOpen, isSubImageModalOpen]);

  // Editor configuration
  const editorConfig = useMemo(
    () => ({
      readonly: false,
      toolbar: true,
      spellcheck: false,
      language: "id",
      toolbarButtonSize: "medium",
      toolbarAdaptive: false,
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
      askBeforePasteHTML: true,
      askBeforePasteFromWord: true,
      defaultFontFamily: "Arial, sans-serif",
      defaultFontSize: "16px",
      style: {
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        lineHeight: "1.6",
      },
      buttons: [
        "source",
        "|",
        "bold",
        "strikethrough",
        "underline",
        "italic",
        "|",
        "ul",
        "ol",
        "|",
        "outdent",
        "indent",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "video",
        "table",
        "link",
        "|",
        "align",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "copyformat",
      ],
      uploader: {
        insertImageAsBase64URI: true,
      },
      width: "100%",
      height: 400,
      // Mengatur zIndex secara dinamis berdasarkan status modal
      zIndex: isImageModalOpen || isSubImageModalOpen ? 0 : 1000,
      allowResizeY: true,
      disablePlugins: ["mobile", "fullsize"],
    }),
    [isImageModalOpen, isSubImageModalOpen] // Tambahkan state modal sebagai dependensi
  );

  // Fetch article tags
  useEffect(() => {
    getArticleTags((tags) => {
      setArticleTags(tags);
      setLoading(false);
    });
  }, []);

  // Sync editor content
  useEffect(() => {
    setIndonesianContent(formArticle.deskripsi);
  }, [formArticle.deskripsi]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle main image change
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
        setFormArticle((prev) => ({ ...prev, gambar: file }));
        setMainImagePreview(URL.createObjectURL(file));
        setMainImageData(null); // Reset image data for new uploads
      }
    }
  };

  // Handle sub image change
  const handleSubImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "image/svg+xml",
        "image/png",
        "image/jpeg",
        "image/jpg",
      ];
      if (validTypes.includes(file.type)) {
        const updatedSubArtikels = [...formArticle.subArtikels];
        updatedSubArtikels[index].file = file;
        setFormArticle((prev) => ({
          ...prev,
          subArtikels: updatedSubArtikels,
        }));
        setSubImagePreviews((prev) => ({
          ...prev,
          [index]: URL.createObjectURL(file),
        }));
        // Reset sub image data for new uploads
        setSubImageData((prev) => ({
          ...prev,
          [index]: null,
        }));
      }
    }
  };

  // Handle sub artikel input change
  const handleSubInputChange = (index, field, value) => {
    const updatedSubArtikels = [...formArticle.subArtikels];
    updatedSubArtikels[index][field] = value;
    setFormArticle((prev) => ({ ...prev, subArtikels: updatedSubArtikels }));
  };

  // Handle sub editor content changes
  const handleSubDescriptionChange = (index, newContent) => {
    const updatedContents = [...subEditorContents];
    updatedContents[index] = newContent;
    setSubEditorContents(updatedContents);
    handleSubInputChange(index, "deskripsi", newContent);
  };

  // Add new sub artikel
  const addSubArtikel = () => {
    setFormArticle((prev) => ({
      ...prev,
      subArtikels: [
        ...prev.subArtikels,
        {
          judul: "",
          deskripsi: "",
          keteranganGambar: "",
          tautanGambar: "",
          altGambar: "",
          file: null,
        },
      ],
    }));

    // Add new editor ref and content
    setSubEditorRefs((prev) => [...prev, React.createRef()]);
    setSubEditorContents((prev) => [...prev, ""]);
  };

  // Remove sub artikel
  const removeSubArtikel = (index) => {
    const updatedSubArtikels = formArticle.subArtikels.filter(
      (_, i) => i !== index
    );
    setFormArticle((prev) => ({ ...prev, subArtikels: updatedSubArtikels }));

    // Remove preview
    const updatedPreviews = { ...subImagePreviews };
    delete updatedPreviews[index];
    setSubImagePreviews(updatedPreviews);

    // Remove editor ref and content
    setSubEditorRefs((prev) => prev.filter((_, i) => i !== index));
    setSubEditorContents((prev) => prev.filter((_, i) => i !== index));
  };

  // Open image modal
  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  // Open sub image modal
  const openSubImageModal = (index) => {
    setCurrentSubIndex(index);
    setIsSubImageModalOpen(true);
  };

  // Convert article tags to options format
  const articleTagsOption = (articleTags || []).map((articleTag) => ({
    value: articleTag.id,
    label: articleTag.nama,
  }));

  // Convert selected tags to options format
  const articleTagSelected = (formArticle.tags || []).map((articleTag) => ({
    value: articleTag.id,
    label: articleTag.nama,
  }));

  // Handle tag changes
  const handleTagChange = (selectedOptions) => {
    setFormArticle((prev) => ({
      ...prev,
      tags: selectedOptions.map((option) => ({
        id: option.value,
        nama: option.label,
      })),
    }));
  };

  // Handle editor content changes
  const handleDescriptionChange = (newContent) => {
    setIndonesianContent(newContent);
    setFormArticle((prev) => ({ ...prev, deskripsi: newContent }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    const form = new FormData();
    form.append("judul", formArticle.judul);
    form.append("penulis", formArticle.penulis);
    form.append(
      "tags",
      formArticle.tags.map((tag) => tag.id)
    );
    form.append("deskripsi", formArticle.deskripsi);
    form.append("tanggal", formArticle.tanggal);
    form.append("gambar", formArticle.gambar);
    form.append("keteranganGambar", formArticle.keteranganGambar);
    form.append("tautanGambar", formArticle.tautanGambar);
    form.append("altGambar", formArticle.altGambar);

    // Append sub artikels
    formArticle.subArtikels.forEach((sub, index) => {
      form.append(`subArtikels[${index}][judul]`, sub.judul);
      form.append(`subArtikels[${index}][deskripsi]`, sub.deskripsi);
      form.append(
        `subArtikels[${index}][keteranganGambar]`,
        sub.keteranganGambar
      );
      form.append(`subArtikels[${index}][tautanGambar]`, sub.tautanGambar);
      form.append(`subArtikels[${index}][altGambar]`, sub.altGambar);
      if (sub.file) {
        form.append(`subArtikels[${index}][file]`, sub.file);
      }
    });

    addArticle(form, () => {
      showToast("Artikel berhasil ditambahkan");
      setSaving(false);
      setSaveSuccess(true);
    });
  };

  // Handle page refresh
  const handleRefresh = () => {
    window.location.reload();
  };

  // Handle main image delete
  const handleDeleteMainImage = () => {
    setFormArticle((prev) => ({ ...prev, gambar: null }));
    setMainImagePreview("");
    setMainImageData(null);
  };

  // Handle sub image delete
  const handleDeleteSubImage = (index) => {
    const updatedSubArtikels = [...formArticle.subArtikels];
    updatedSubArtikels[index].file = null;
    setFormArticle((prev) => ({
      ...prev,
      subArtikels: updatedSubArtikels,
    }));

    const updatedPreviews = { ...subImagePreviews };
    delete updatedPreviews[index];
    setSubImagePreviews(updatedPreviews);

    const updatedData = { ...subImageData };
    delete updatedData[index];
    setSubImageData(updatedData);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (saveSuccess) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                Artikel Berhasil Ditambahkan!
              </h2>
              <p className="text-gray-600 mb-6">
                Artikel baru telah berhasil dibuat. Mohon refresh halaman untuk
                melihat artikel terbaru.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="secondary" onClick={() => window.close()}>
                  Tutup Tab
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tambah Artikel</h1>
          <Button variant="secondary" onClick={() => window.close()}>
            Tutup
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Judul Artikel */}
          <div>
            <Label htmlFor="judul" value="Judul Artikel" />
            <Input
              type="text"
              name="judul"
              placeholder="Masukkan judul artikel.."
              variant="primary-outline"
              value={formArticle.judul}
              handleChange={handleInputChange}
              isError={!!errors.judul}
            />
            <InputError message={errors.judul} />
          </div>

          {/* Nama Penulis */}
          <div>
            <Label htmlFor="penulis" value="Nama Penulis" />
            <Input
              type="text"
              name="penulis"
              placeholder="Masukkan nama penulis.."
              variant="primary-outline"
              value={formArticle.penulis}
              handleChange={handleInputChange}
              isError={!!errors.penulis}
            />
            <InputError message={errors.penulis} />
          </div>

          {/* Tag Artikel & Tanggal */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tags" value="Tag Artikel" />
              <MultiSelect
                name="tags"
                options={articleTagsOption}
                defaultValue={articleTagSelected}
                placeholder="Pilih tag artikel.."
                isError={errors.tags}
                handleChange={handleTagChange}
              />
              <InputError message={errors.tags} />
            </div>
            <div>
              <Label htmlFor="tanggal" value="Tanggal" />
              <Input
                type="date"
                name="tanggal"
                variant="primary-outline"
                value={formArticle.tanggal}
                handleChange={handleInputChange}
                isError={!!errors.tanggal}
              />
              <InputError message={errors.tanggal} />
            </div>
          </div>

          {/* Gambar Utama */}
          <div>
            <Label htmlFor="gambar" value="Gambar Utama" />
            <div className="mt-2">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400 transition-colors"
                onClick={openImageModal}
              >
                {mainImagePreview ? (
                  <div className="text-center">
                    <div className="relative inline-block">
                      <img
                        src={mainImagePreview}
                        alt="Main Preview"
                        className="w-40 h-32 object-cover rounded-lg mx-auto mb-2"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMainImage();
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                        title="Hapus gambar"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      Klik untuk mengubah gambar
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <div className="w-12 h-12 mx-auto mb-2">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                      </svg>
                    </div>
                    <p>Klik untuk menambahkan gambar</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Isi Artikel */}
          <div>
            <Label htmlFor="deskripsi" value="Isi Artikel" />
            <JoditEditor
              ref={indonesianEditorRef}
              value={indonesianContent}
              config={editorConfig}
              tabIndex={1}
              onBlur={handleDescriptionChange}
              onChange={() => {}}
            />
          </div>

          {/* Listicle Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <Label value="Listicle" />
              <Button
                type="button"
                variant="create"
                size="sm"
                onClick={addSubArtikel}
              >
                <PiPlus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            </div>

            {formArticle.subArtikels.length > 0 && (
              <>
                {formArticle.subArtikels.map((subArtikel, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 mb-4"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-medium">
                        Section {index + 1}
                      </h4>
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={() => removeSubArtikel(index)}
                      >
                        <PiTrash className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Sub Judul */}
                    <div className="mb-4">
                      <Label htmlFor={`sub-judul-${index}`} value="Sub Judul" />
                      <Input
                        type="text"
                        name={`sub-judul-${index}`}
                        placeholder="Masukkan sub judul.."
                        variant="primary-outline"
                        value={subArtikel.judul}
                        handleChange={(e) =>
                          handleSubInputChange(index, "judul", e.target.value)
                        }
                      />
                    </div>

                    {/* Sub Gambar */}
                    <div className="mb-4">
                      <Label value="Sub Gambar" />
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400 transition-colors"
                        onClick={() => openSubImageModal(index)}
                      >
                        {subImagePreviews[index] ? (
                          <div className="text-center">
                            <div className="relative inline-block">
                              <img
                                src={subImagePreviews[index]}
                                alt="Sub Preview"
                                className="w-32 h-24 object-cover rounded-lg mx-auto mb-2"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteSubImage(index);
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                                title="Hapus gambar"
                              >
                                ×
                              </button>
                            </div>
                            <p className="text-sm text-gray-600">
                              Klik untuk mengubah gambar
                            </p>
                          </div>
                        ) : (
                          <div className="text-center text-gray-500">
                            <div className="w-8 h-8 mx-auto mb-2">
                              <svg fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                              </svg>
                            </div>
                            <p className="text-sm">
                              Klik untuk menambahkan gambar
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sub Deskripsi */}
                    <div>
                      <Label
                        htmlFor={`sub-deskripsi-${index}`}
                        value="Sub Deskripsi"
                      />
                      <JoditEditor
                        ref={subEditorRefs[index]}
                        value={subEditorContents[index] || ""}
                        config={editorConfig}
                        tabIndex={index + 2}
                        onBlur={(newContent) =>
                          handleSubDescriptionChange(index, newContent)
                        }
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => window.close()}
              disabled={saving}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? "Menyimpan..." : "Tambah Artikel"}
            </Button>
          </div>
        </form>

        {/* Main Image Modal */}
        {isImageModalOpen && (
          <div className="modal-wrapper">
            <div className="modal-content-wrapper">
              <div className="p-6">
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Upload Gambar Utama
                  </h3>
                  <button
                    onClick={() => setIsImageModalOpen(false)}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="main-image" value="Gambar" />
                    <input
                      type="file"
                      id="main-image"
                      onChange={handleImageChange}
                      accept=".svg,.png,.jpg,.jpeg"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {mainImagePreview && (
                      <img
                        src={mainImagePreview}
                        alt="Preview"
                        className="mt-2 w-32 h-24 object-cover rounded-lg"
                      />
                    )}
                  </div>

                  <div>
                    <Label htmlFor="main-caption" value="Caption" />
                    <Input
                      type="text"
                      name="keteranganGambar"
                      placeholder="Masukkan caption gambar.."
                      variant="primary-outline"
                      value={formArticle.keteranganGambar}
                      handleChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="main-link" value="Tautan" />
                    <Input
                      type="url"
                      name="tautanGambar"
                      placeholder="Masukkan tautan gambar.."
                      variant="primary-outline"
                      value={formArticle.tautanGambar}
                      handleChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="main-alt" value="Deskripsi (Alt Text)" />
                    <Input
                      type="text"
                      name="altGambar"
                      placeholder="Masukkan deskripsi gambar.."
                      variant="primary-outline"
                      value={formArticle.altGambar}
                      handleChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 mt-4 border-t border-gray-200 gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setIsImageModalOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => setIsImageModalOpen(false)}
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sub Image Modal */}
        {isSubImageModalOpen && (
          <div className="modal-wrapper">
            <div className="modal-content-wrapper">
              <div className="p-6">
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Upload Sub Gambar
                  </h3>
                  <button
                    onClick={() => setIsSubImageModalOpen(false)}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {currentSubIndex !== null && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="sub-image" value="Gambar" />
                      <input
                        type="file"
                        id="sub-image"
                        onChange={(e) =>
                          handleSubImageChange(currentSubIndex, e)
                        }
                        accept=".svg,.png,.jpg,.jpeg"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {subImagePreviews[currentSubIndex] && (
                        <img
                          src={subImagePreviews[currentSubIndex]}
                          alt="Sub Preview"
                          className="mt-2 w-32 h-24 object-cover rounded-lg"
                        />
                      )}
                    </div>

                    <div>
                      <Label htmlFor="sub-caption" value="Caption" />
                      <Input
                        type="text"
                        placeholder="Masukkan caption gambar.."
                        variant="primary-outline"
                        value={
                          formArticle.subArtikels[currentSubIndex]
                            ?.keteranganGambar || ""
                        }
                        handleChange={(e) =>
                          handleSubInputChange(
                            currentSubIndex,
                            "keteranganGambar",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="sub-link" value="Tautan" />
                      <Input
                        type="url"
                        placeholder="Masukkan tautan gambar.."
                        variant="primary-outline"
                        value={
                          formArticle.subArtikels[currentSubIndex]
                            ?.tautanGambar || ""
                        }
                        handleChange={(e) =>
                          handleSubInputChange(
                            currentSubIndex,
                            "tautanGambar",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="sub-alt" value="Deskripsi (Alt Text)" />
                      <Input
                        type="text"
                        placeholder="Masukkan deskripsi gambar.."
                        variant="primary-outline"
                        value={
                          formArticle.subArtikels[currentSubIndex]?.altGambar ||
                          ""
                        }
                        handleChange={(e) =>
                          handleSubInputChange(
                            currentSubIndex,
                            "altGambar",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-4 mt-4 border-t border-gray-200 gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setIsSubImageModalOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => setIsSubImageModalOpen(false)}
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleAdd;

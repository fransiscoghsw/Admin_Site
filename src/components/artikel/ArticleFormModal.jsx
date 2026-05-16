import React, { useRef, useMemo, useEffect, useState } from "react";
import Modal from "../common/Modal.jsx";
import Label from "../common/Label.jsx";
import Input from "../common/Input.jsx";
import InputError from "../common/InputError.jsx";
import MultiSelect from "../common/MultiSelect.jsx";
import JoditEditor from "jodit-react";
import "../../styles/jodit-custom.css";

const ArticleFormModal = ({
  isOpen,
  modalType,
  formArticle,
  errors,
  articleTags,
  previewImage,
  onClose,
  onInputChange,
  onImageChange,
  onTagChange,
  onDescriptionChange,
  onSubmit,
}) => {
  const indonesianEditorRef = useRef(null);
  const [indonesianContent, setIndonesianContent] = useState("");

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
      uploader: { insertImageAsBase64URI: true },
      width: "100%",
      height: 400,
      zIndex: 9999,
      allowResizeY: true,
      disablePlugins: ["mobile", "fullsize"],
    }),
    []
  );

  // Sync editor content
  useEffect(() => {
    setIndonesianContent(formArticle.deskripsi);
  }, [formArticle.deskripsi]);

  const articleTagsOption = (articleTags || []).map((tag) => ({
    value: tag.id,
    label: tag.nama,
  }));

  const articleTagSelected = (formArticle.tags || []).map((tag) => ({
    value: tag.id,
    label: tag.nama,
  }));

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header
        title={modalType === "add_article" ? "Tambah Artikel" : "Ubah Artikel"}
        onClose={onClose}
      />
      <Modal.Body>
        <Label htmlFor="article_title" value="Judul Artikel" />
        <Input
          type="text"
          name="judul"
          placeholder="Masukkan judul artikel.."
          variant="primary-outline"
          value={formArticle.judul}
          handleChange={onInputChange}
          isError={!!errors.judul}
        />
        <InputError message={errors.judul} />

        <Label htmlFor="penulis" value="Nama Penulis" />
        <Input
          type="text"
          name="penulis"
          placeholder="Masukkan nama penulis.."
          variant="primary-outline"
          value={formArticle.penulis}
          handleChange={onInputChange}
          isError={!!errors.penulis}
        />
        <InputError message={errors.penulis} />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tags" value="Tag Artikel" />
            <MultiSelect
              name="tags"
              options={articleTagsOption}
              defaultValue={articleTagSelected}
              placeholder="Pilih tag artikel.."
              isError={errors.tags}
              handleChange={onTagChange}
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
              handleChange={onInputChange}
              isError={!!errors.tanggal}
            />
            <InputError message={errors.tanggal} />
          </div>
        </div>

        <Label htmlFor="image" value="Gambar" />
        <div className="mb-4">
          <div
            className={`flex flex-col items-center justify-center w-full py-4 mt-2 h-full border-2 rounded-2xl bg-gray-50 shadow ${
              errors.gambar ? "border-red-500" : "border-gray-300"
            }`}
          >
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="object-top w-56 h-52 mb-4 object-cover rounded-xl border-2 border-gray-300"
              />
            )}
            <label
              htmlFor="image"
              className={`flex flex-col items-center justify-center w-full cursor-pointer ${
                !previewImage && "h-32"
              }`}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-8 h-8 text-gray-500"
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
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Unggah gambar di sini</span>
                  </p>
                </div>
                <p className="text-xs text-gray-500">SVG, PNG, JPG atau JPEG</p>
              </div>
              <input
                id="image"
                type="file"
                className="hidden"
                onChange={onImageChange}
                accept=".svg,.png,.jpg,.jpeg"
              />
            </label>
          </div>
          <InputError message={errors.gambar} />
        </div>

        <Label htmlFor="deskripsi" value="Isi Artikel" />
        <div
          className={`jodit-editor-wrapper ${
            errors.deskripsi ? "border-red-500" : "border-gray-300"
          }`}
        >
          <JoditEditor
            ref={indonesianEditorRef}
            value={indonesianContent}
            config={editorConfig}
            tabIndex={1}
            onBlur={onDescriptionChange}
            onChange={() => {}}
          />
        </div>
        <InputError message={errors.deskripsi} />
      </Modal.Body>
      <Modal.Footer
        action={modalType === "add_article" ? "Tambah" : "Ubah"}
        onAction={onSubmit}
        onClose={onClose}
      />
    </Modal>
  );
};

export default ArticleFormModal;

import React from "react";
import Modal from "../common/Modal.jsx";
import { formatDate } from "../../utils/formatDate.js";
import { LiaUserEditSolid } from "react-icons/lia";
import HTMLReactParser from "html-react-parser";
import "../../styles/article-content.css";

const ArticleDetailModal = ({ isOpen, formArticle, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header onClose={onClose} />
      <Modal.Body>
        <div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#F5F5F5] text-slate-800 p-2 rounded-full">
                <LiaUserEditSolid className="w-full h-full ml-[2px]" />
              </div>
              <div>
                <p className="font-semibold text-xl text-[#3E3232]">
                  {formArticle.penulis}
                </p>
                <p className="text-[#3E3232] opacity-90">
                  {formatDate(formArticle.tanggal)}
                </p>
              </div>
            </div>

            <div className="mt-6 mb-5">
              <h2 className="font-bold text-3xl text-center">
                {formArticle.judul}
              </h2>
            </div>

            <div className="flex gap-3 flex-wrap justify-center">
              {(formArticle.tags || []).map((articleTag) => (
                <div
                  key={articleTag.id}
                  className="bg-[#f8e7d8] font-semibold text-[#B87817] text-lg text-center py-1 min-w-32 max-w-fit px-2 rounded-3xl"
                >
                  #{articleTag.nama}
                </div>
              ))}
            </div>
          </div>

          <div className="px-10 h-[24rem] mt-9 mb-8">
            <img
              src={`${import.meta.env.VITE_API_URL}/artikel/image/${
                formArticle.gambar
              }`}
              alt="Artikel"
              className="rounded-3xl w-full h-full object-cover"
            />
          </div>

          <div className="article-content-wrapper max-w-full mx-auto px-11">
            {formArticle.deskripsi && formArticle.deskripsi.trim() ? (
              <div className="article-content text-slate-800">
                {HTMLReactParser(formArticle.deskripsi)}
              </div>
            ) : (
              <p className="text-gray-500 italic text-center">
                No content available
              </p>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer buttonLabel="Kembali" onClose={onClose} />
    </Modal>
  );
};

export default ArticleDetailModal;

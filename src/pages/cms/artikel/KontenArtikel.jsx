import React from "react";
import ArticleList from "../../../components/common/ArticleList.jsx";
import ArticleSearchBar from "../../../components/artikel/ArticleSearchBar.jsx";
import ArticleFormModal from "../../../components/artikel/ArticleFormModal.jsx";
import ArticleDetailModal from "../../../components/artikel/ArticleDetailModal.jsx";
import ArticleDeleteModal from "../../../components/artikel/ArticleDeleteModal.jsx";
import { showToast } from "../../../utils/toast.js";
import {
    addArticle,
    deleteArticle,
    getArticleBySlug,
    getArticles,
    updateArticle,
} from "../../../services/article.service.js";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useArticleForm } from "../../../hooks/useArticleForm.js";
import PropTypes from "prop-types";

const KontenArtikel = (props) => {
    const { articleTags } = props;
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 6;

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    // Use custom hook for form management
    const {
        formArticle,
        setFormArticle,
        errors,
        validateForm,
        handleInputChange,
        handleTagChange,
        resetForm,
    } = useArticleForm({
        judul: "",
        penulis: "",
        tags: [],
        deskripsi: "",
        tanggal: "",
        gambar: null,
        subArtikels: [],
    });

    useEffect(() => {
        getArticles((data) => {
            // Sort articles immediately after fetching
            const sortedData = Array.isArray(data)
                ? [...data].sort((a, b) => {
                      const dateA = new Date(a.tanggal || 0);
                      const dateB = new Date(b.tanggal || 0);
                      return dateB.getTime() - dateA.getTime();
                  })
                : [];
            setArticles(sortedData);
        });
    }, []);

    useEffect(() => {
        if (!articleTags) return; // Pastikan articleTags tidak undefined/null

        setArticles((prevArticles) =>
            (prevArticles || []).map((article) => ({
                ...article,
                // Handle both 'tags' and 'Tags' property names
                Tags: (article.tags || article.Tags || []).map(
                    (tag) => articleTags.find((t) => t.id === tag.id) || tag,
                ),
                tags: (article.tags || article.Tags || []).map(
                    (tag) => articleTags.find((t) => t.id === tag.id) || tag,
                ),
            })),
        );
    }, [articleTags]);

    // Search functionality
    const searchQuery = searchParams.get("search") || "";
    const currentTab = searchParams.get("tab") || "konten-artikel";

    // Add missing useEffect for filtering articles
    useEffect(() => {
        if (searchQuery) {
            const filtered = articles.filter((article) =>
                article.judul.toLowerCase().includes(searchQuery.toLowerCase()),
            );
            setFilteredArticles(filtered);
        } else {
            setFilteredArticles(articles);
        }
        setCurrentPage(1); // Reset to first page when search changes
    }, [searchQuery, articles]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        const params = {};
        if (currentTab) params.tab = currentTab;
        if (value) {
            params.search = value;
        } else {
            params.search = "";
        }
        setSearchParams(params);
    };

    // Modal handlers
    const openModal = (type, article = null) => {
        setModalType(type);
        setIsModalOpen(true);

        if (type === "update_article" && article) {
            setSelectedArticle(article);
            setFormArticle({
                judul: article.judul,
                penulis: article.penulis,
                tags: article.tags || article.Tags || [],
                deskripsi: article.deskripsi,
                tanggal: article.tanggal,
                gambar: article.gambar,
            });
            setPreviewImage(
                `${import.meta.env.VITE_API_URL}/artikel/image/${article.gambar}`,
            );
        } else if (type === "delete_article" && article) {
            setSelectedArticle(article);
        } else if (type === "detail_article" && article) {
            setSelectedArticle(article);
            getArticleBySlug(article.slug, (articleData) => {
                setFormArticle({
                    judul: articleData.judul,
                    penulis: articleData.penulis,
                    tags: articleData.tags || articleData.Tags || [],
                    deskripsi: articleData.deskripsi,
                    tanggal: articleData.tanggal,
                    gambar: articleData.gambar,
                });
            });
        } else {
            resetForm();
        }
    };

    const closeModal = () => {
        setModalType("");
        setIsModalOpen(false);
        resetForm();
        setPreviewImage("");
        setSelectedArticle(null);
    };

    // CRUD operations
    const handleAddArticle = () => {
        if (validateForm(modalType)) {
            const form = new FormData();
            form.append("judul", formArticle.judul);
            form.append("judulEn", formArticle.judulEn);
            form.append("penulis", formArticle.penulis);
            form.append(
                "tags",
                (formArticle.tags || []).map((articleTag) => articleTag.id),
            );
            form.append("deskripsi", formArticle.deskripsi);
            form.append("deskripsiEn", formArticle.deskripsiEn);
            form.append("gambar", formArticle.gambar);
            form.append("tanggal", formArticle.tanggal);

            addArticle(form, (response) => {
                setArticles([response, ...articles]);
                closeModal();
                showToast("Artikel berhasil ditambahkan");
            });
        }
    };

    const handleUpdateArticle = () => {
        if (validateForm(modalType)) {
            const form = new FormData();
            form.append("judul", formArticle.judul);
            form.append("judulEn", formArticle.judulEn);
            form.append("penulis", formArticle.penulis);
            form.append(
                "tags",
                (formArticle.tags || []).map((articleTag) => articleTag.id),
            );
            form.append("deskripsi", formArticle.deskripsi);
            form.append("deskripsiEn", formArticle.deskripsiEn);
            form.append("tanggal", formArticle.tanggal);

            if (formArticle.gambar instanceof File) {
                form.append("gambar", formArticle.gambar);
            }

            updateArticle(selectedArticle.id, form, (updateData) => {
                setArticles((prevArticles) =>
                    prevArticles.map((item) =>
                        item.id === updateData.id ? updateData : item,
                    ),
                );
                closeModal();
                showToast("Artikel berhasil diubah");
            });
        }
    };

    const handleDeleteArticle = () => {
        deleteArticle(selectedArticle.id, () => {
            setArticles(
                articles.filter((article) => article.id !== selectedArticle.id),
            );
            closeModal();
            showToast("Artikel berhasil dihapus");
        });
    };

    // Image handling
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
                setPreviewImage(URL.createObjectURL(file));
            }
        }
    };

    const handleDescriptionChange = (newContent) => {
        setFormArticle((prev) => ({ ...prev, deskripsi: newContent }));
    };

    // Pagination logic
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(
        indexOfFirstArticle,
        indexOfLastArticle,
    );
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleAddInNewTab = () => {
        window.open("/cms/artikel/add", "_blank");
    };

    // Pagination helper function to generate page numbers with ellipsis
    const generatePageNumbers = () => {
        const delta = 2;
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage > delta + 3) {
                pages.push("...");
            }

            const start = Math.max(2, currentPage - delta);
            const end = Math.min(totalPages - 1, currentPage + delta);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - delta - 2) {
                pages.push("...");
            }

            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <>
            <ArticleSearchBar
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onAddClick={handleAddInNewTab}
            />

            <ArticleList articles={currentArticles} openModal={openModal} />

            {/* Pagination with ellipsis */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-10 space-x-2 flex-wrap gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md ${
                            currentPage === 1
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                    >
                        &laquo; Previous
                    </button>

                    {generatePageNumbers().map((page, index) => (
                        <React.Fragment key={index}>
                            {page === "..." ? (
                                <span className="px-4 py-2 text-gray-500">
                                    ...
                                </span>
                            ) : (
                                <button
                                    onClick={() => handlePageChange(page)}
                                    className={`px-4 py-2 rounded-md ${
                                        currentPage === page
                                            ? "bg-[#000080] text-white"
                                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                    }`}
                                >
                                    {page}
                                </button>
                            )}
                        </React.Fragment>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md ${
                            currentPage === totalPages
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                    >
                        Next &raquo;
                    </button>
                </div>
            )}

            {/* Modals */}
            {(modalType === "add_article" ||
                modalType === "update_article") && (
                <ArticleFormModal
                    isOpen={isModalOpen}
                    modalType={modalType}
                    formArticle={formArticle}
                    errors={errors}
                    articleTags={articleTags}
                    previewImage={previewImage}
                    onClose={closeModal}
                    onInputChange={handleInputChange}
                    onImageChange={handleImageChange}
                    onTagChange={handleTagChange}
                    onDescriptionChange={handleDescriptionChange}
                    onSubmit={
                        modalType === "add_article"
                            ? handleAddArticle
                            : handleUpdateArticle
                    }
                />
            )}

            {modalType === "detail_article" && (
                <ArticleDetailModal
                    isOpen={isModalOpen}
                    formArticle={formArticle}
                    onClose={closeModal}
                />
            )}

            {modalType === "delete_article" && (
                <ArticleDeleteModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onDelete={handleDeleteArticle}
                />
            )}
        </>
    );
};

KontenArtikel.propTypes = {
    articleTags: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            nama: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default KontenArtikel;

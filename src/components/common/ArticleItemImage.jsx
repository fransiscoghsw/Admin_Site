import { useState, useEffect } from "react";
import { getImageArticle } from "../../services/article.service.js";
import { useLocation } from "react-router-dom";

const ArticleItemImage = (props) => {
  const { gambar, slug } = props;
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const location = useLocation();

  // Mengecek apakah pengguna berada di halaman admin/artikel
  const isAdminPage = location.pathname === "/cms/artikel";

  useEffect(() => {
    if (gambar) {
      setImageLoading(true);
      setImageError(false);

      // Handle different gambar formats
      const imageName =
        typeof gambar === "string" ? gambar : gambar?.nama || gambar;

      if (imageName) {
        getImageArticle(imageName, (imageData) => {
          setImageUrl(
            `${import.meta.env.VITE_API_URL}/artikel/image/${imageName}`
          );
          setImageLoading(false);
        });
      } else {
        setImageError(true);
        setImageLoading(false);
      }
    } else {
      setImageError(true);
      setImageLoading(false);
    }
  }, [gambar]);

  // Handle image click
  const handleImageClick = () => {
    if (slug) {
      if (isAdminPage) {
        // Di halaman admin, buka detail dalam tab baru
        window.open(`/cms/artikel/${slug}`, "_blank");
      } else {
        // Di halaman lain, navigasi biasa
        window.location.href = `/artikel/${slug}`;
      }
    }
  };

  if (imageLoading) {
    return (
      <div className="w-full xl:w-[30%] rounded-xl overflow-hidden">
        <div className="w-full h-48 md:h-full bg-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-400">Loading...</span>
        </div>
      </div>
    );
  }

  if (imageError || !imageUrl) {
    return (
      <div className="w-full xl:w-[30%] rounded-xl overflow-hidden">
        <div
          className="w-full h-48 md:h-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
          onClick={handleImageClick}
        >
          <span className="text-gray-400">Image not available</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full xl:w-[30%] rounded-xl overflow-hidden cursor-pointer group"
      onClick={handleImageClick}
    >
      <img
        src={imageUrl}
        alt={
          typeof gambar === "object" && gambar?.alt
            ? gambar.alt
            : "Article image"
        }
        className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={() => {
          setImageError(true);
          setImageUrl("");
        }}
      />
    </div>
  );
};

export default ArticleItemImage;

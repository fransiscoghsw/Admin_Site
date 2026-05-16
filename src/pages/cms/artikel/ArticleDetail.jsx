import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArticleBySlug,
  getImageArticle,
  getSubImageArticle,
} from "../../../services/article.service.js";
import { formatDate } from "../../../utils/formatDate.js";
import { LiaUserEditSolid } from "react-icons/lia";
import HTMLReactParser from "html-react-parser";
import "../../../styles/article-content.css";

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [subImageUrls, setSubImageUrls] = useState({});

  // Helper function to get image name from either legacy string or new object format
  const getImageName = (gambarData) => {
    if (!gambarData) return null;
    // If it's a string (legacy format), return as is
    if (typeof gambarData === "string") return gambarData;
    // If it's an object (new format), return the nama property
    if (typeof gambarData === "object" && gambarData.nama)
      return gambarData.nama;
    return null;
  };

  // Helper function to get image metadata (keterangan, tautan, alt)
  const getImageMetadata = (gambarData) => {
    if (!gambarData) return {};
    // If it's a string (legacy format), return empty metadata
    if (typeof gambarData === "string") return {};
    // If it's an object (new format), return metadata
    if (typeof gambarData === "object") {
      return {
        keterangan: gambarData.keterangan || "",
        tautan: gambarData.tautan || "",
        alt: gambarData.alt || "",
      };
    }
    return {};
  };

  useEffect(() => {
    if (slug) {
      getArticleBySlug(slug, (data) => {
        setArticle(data);

        // Load main image if exists
        const imageName = getImageName(data?.gambar);
        if (imageName) {
          getImageArticle(imageName, (imageData) => {
            setMainImageUrl(
              `${import.meta.env.VITE_API_URL}/artikel/image/${imageName}`
            );
          });
        }

        // Load sub-article images if exist
        if (data?.subArtikels && data.subArtikels.length > 0) {
          data.subArtikels.forEach((subArtikel, index) => {
            const subImageName = getImageName(subArtikel.gambar);
            if (subImageName) {
              getSubImageArticle(subImageName, (imageData) => {
                setSubImageUrls((prev) => ({
                  ...prev,
                  [index]: `${
                    import.meta.env.VITE_API_URL
                  }/artikel/imageSubArtikel/${subImageName}`,
                }));
              });
            }
          });
        }

        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Article not found</div>
      </div>
    );
  }

  // Get main image metadata
  const mainImageMetadata = getImageMetadata(article.gambar);

  return (
    <div className="w-[90%] mx-auto my-12 lg:my-16">
      <div className="max-w-3xl mx-auto">
        {/* Informasi Penulis */}
        <div className="flex justify-center items-center gap-3">
          <div className="w-12 h-12 bg-[#F5F5F5] text-slate-800 p-2 rounded-full">
            <LiaUserEditSolid className="w-full h-full ml-[2px]" />
          </div>
          <div>
            <p className="font-semibold text-xl text-[#3E3232]">
              {article.penulis}
            </p>
            <p className="text-[#3E3232] opacity-90">
              {formatDate(article.tanggal)}
            </p>
          </div>
        </div>

        {/* Judul Artikel */}
        <div className="text-center my-8">
          <h2 className="font-bold text-3xl mb-6">{article.judul}</h2>
        </div>

        {/* Tags */}
        <div className="flex justify-center lg:justify-center gap-3 overflow-auto">
          {(article.tags || article.Tags || []).map((tag) => (
            <div
              key={tag.id}
              className="bg-[#f8e7d8] font-semibold text-[#B87817] text-lg text-center py-1 min-w-28 lg:min-w-32 max-w-fit px-3 rounded-3xl"
            >
              #{tag.nama}
            </div>
          ))}
        </div>

        {/* Gambar Artikel */}
        <div className="lg:px-16 lg:mt-16 mt-7 mb-8">
          <div className="h-[14rem] lg:h-[30rem]">
            {mainImageUrl ? (
              <img
                src={mainImageUrl}
                alt={mainImageMetadata.alt || "Artikel"}
                className="rounded-3xl w-full h-full object-cover"
              />
            ) : (
              <div className="rounded-3xl w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Image not available</span>
              </div>
            )}
          </div>
          {mainImageMetadata.keterangan && (
            <p className="text-sm text-gray-600 text-center mt-3 italic">
              {mainImageMetadata.keterangan}
              {mainImageMetadata.tautan && (
                <span className="ml-1">
                  (Sumber: {mainImageMetadata.tautan})
                </span>
              )}
            </p>
          )}
        </div>

        {/* Isi Artikel */}
        <div className="article-content-wrapper max-w-3xl mx-auto">
          {article.deskripsi && article.deskripsi.trim() ? (
            <div className="article-content text-slate-800">
              {HTMLReactParser(article.deskripsi)}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center">
              No content available
            </p>
          )}
        </div>

        {/* Sub Artikels (Listicle) */}
        {article.subArtikels && article.subArtikels.length > 0 && (
          <div className="max-w-3xl mx-auto mt-6">
            {article.subArtikels.map((subArtikel, index) => {
              const subImageMetadata = getImageMetadata(subArtikel.gambar);

              return (
                <div key={subArtikel.id} className="mb-12 last:mb-0">
                  {/* Sub Judul */}
                  <h3 className="text-2xl font-bold text-[#3E3232] mb-6">
                    {subArtikel.judul}
                  </h3>

                  {/* Sub Gambar */}
                  {subArtikel.gambar && (
                    <div className="mb-6">
                      {subImageUrls[index] ? (
                        <img
                          src={subImageUrls[index]}
                          alt={subImageMetadata.alt || subArtikel.judul}
                          className="rounded-2xl w-full h-64 lg:h-80 object-cover"
                        />
                      ) : (
                        <div className="rounded-2xl w-full h-64 lg:h-80 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">
                            Image not available
                          </span>
                        </div>
                      )}
                      {subImageMetadata.keterangan && (
                        <p className="text-sm text-gray-600 text-center mt-3 italic">
                          {subImageMetadata.keterangan}
                          {subImageMetadata.tautan && (
                            <span className="ml-1">
                              (Sumber: {subImageMetadata.tautan})
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Sub Deskripsi */}
                  <div className="article-content text-slate-800">
                    {subArtikel.deskripsi && subArtikel.deskripsi.trim() ? (
                      <div className="leading-relaxed">
                        {HTMLReactParser(subArtikel.deskripsi)}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">
                        No content available for this section
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;

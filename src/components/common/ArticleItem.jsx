import ArticleItemBody from "./ArticleItemBody";
import ArticleItemImage from "./ArticleItemImage";

const ArticleItem = (props) => {
  const {
    id,
    slug,
    judul,
    judulEn,
    deskripsi,
    deskripsiEn,
    penulis,
    gambar,
    tanggal,
    jumlah_penglihat,
    Tags,
    openModal,
  } = props;
  return (
    <div className="bg-white flex gap-3 p-2 rounded-2xl shadow-lg flex-wrap xl:flex-nowrap h-fit">
      <ArticleItemImage gambar={gambar} slug={slug} />
      <ArticleItemBody
        id={id}
        slug={slug}
        judul={judul}
        judulEn={judulEn}
        deskripsi={deskripsi}
        deskripsiEn={deskripsiEn}
        penulis={penulis}
        gambar={gambar}
        tanggal={tanggal}
        jumlah_penglihat={jumlah_penglihat}
        Tags={Tags}
        openModal={openModal}
      />
    </div>
  );
};

export default ArticleItem;

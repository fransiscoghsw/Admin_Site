import Alert from "./Alert";
import ArticleItem from "./ArticleItem";

const ArticleList = (props) => {
  const { articles, openModal } = props;

  // Fungsi untuk parsing tanggal yang lebih robust
  const parseDate = (dateString) => {
    if (!dateString) return new Date(0); // Return epoch for null/undefined dates

    // Try different date formats
    let date = new Date(dateString);

    // If invalid date, try parsing as ISO string or other formats
    if (isNaN(date.getTime())) {
      // Try parsing as YYYY-MM-DD format
      const dateMatch = dateString.match(/(\d{4})-(\d{2})-(\d{2})/);
      if (dateMatch) {
        date = new Date(dateMatch[0]);
      } else {
        // Try other parsing methods
        date = new Date(Date.parse(dateString));
      }
    }

    // If still invalid, return epoch date
    return isNaN(date.getTime()) ? new Date(0) : date;
  };

  // Sort articles by date (newest first) with improved date handling
  const sortedArticles = Array.isArray(articles)
    ? [...articles].sort((a, b) => {
        const dateA = parseDate(a.tanggal);
        const dateB = parseDate(b.tanggal);

        // Sort in descending order (newest first)
        return dateB.getTime() - dateA.getTime();
      })
    : [];

  return (
    <>
      {sortedArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 xl:gap-x-14 xl:gap-y-10">
          {sortedArticles.map((article) => (
            <ArticleItem key={article.id} {...article} openModal={openModal} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <Alert message={"Tidak ada artikel yang tersedia."} type={"info"} />
        </div>
      )}
    </>
  );
};

export default ArticleList;

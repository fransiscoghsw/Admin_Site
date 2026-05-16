import apiAdmin from "../lib/axios";
export const getArticles = (callback) => {
  apiAdmin
    .get("/artikel")
    .then((res) => {
      callback(res.data.data.reverse());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getArticleBySlug = (slug, callback) => {
  apiAdmin
    .get(`/artikel/${slug}`)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
      callback(null); // Panggil callback dengan null jika terjadi error
    });
};

export const addArticle = (data, callback) => {
  apiAdmin
    .post("/artikel", data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateArticle = (id, data, callback) => {
  apiAdmin
    .put(`/artikel/${id}`, data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteArticle = (id, callback) => {
  apiAdmin
    .delete(`/artikel/${id}`)
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.log(`Error deleting article with id: ${id}`, err);
    });
};

export const viewArticle = (id, callback) => {
  apiAdmin
    .post(`/artikel/article-viewer/${id}`)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getImageArticle = (imageName, callback) => {
  apiAdmin
    .get(`/artikel/image/${imageName}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSubImageArticle = (imageName, callback) => {
  apiAdmin
    .get(`/artikel/imageSubArtikel/${imageName}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

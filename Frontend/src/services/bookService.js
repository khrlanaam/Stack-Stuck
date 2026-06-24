import api from "./api";

// GET semua buku
export const getBooks = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/api/books", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

// SEARCH buku berdasarkan keyword
export const searchBooks = async (keyword) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`/api/books/search?search=${encodeURIComponent(keyword)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

// GET buku berdasarkan ID
export const getBookById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`/api/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// CREATE buku
export const createBook = async (formData) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/api/books",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// UPDATE buku
export const updateBook = async (id, formData) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/api/books/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// DELETE buku
export const deleteBook = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(
    `/api/books/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
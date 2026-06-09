import api from "./api";

// GET semua buku
export const getBooks = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    "/api/books",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// GET buku berdasarkan ID
export const getBookById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    `/api/books/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
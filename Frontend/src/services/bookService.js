import api from "./api";

export const getBooks = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/api/books", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};
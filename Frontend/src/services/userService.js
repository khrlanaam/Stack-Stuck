import api from "./api";

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    "/api/admin/users",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
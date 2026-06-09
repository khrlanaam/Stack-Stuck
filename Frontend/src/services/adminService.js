import api from "./api";

// GET DASHBOARD STATISTICS
export const getAdminStats = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    "/api/admin/stats",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
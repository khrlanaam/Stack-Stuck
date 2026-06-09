import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getPendingBorrowings,
  approveBorrowing,
  rejectBorrowing,
} from "../services/borrowingService";

function AdminBorrowings() {
  const navigate = useNavigate();

  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBorrowings = async () => {
    try {
      setLoading(true);

      const data = await getPendingBorrowings();

      setBorrowings(data);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data peminjaman");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowings();
  }, []);

  const handleApprove = async (id) => {
    const confirmApprove = window.confirm(
      "Setujui peminjaman ini?"
    );

    if (!confirmApprove) return;

    try {
      await approveBorrowing(id);

      alert("Peminjaman berhasil disetujui");

      fetchBorrowings();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Gagal approve"
      );
    }
  };

  const handleReject = async (id) => {
    const confirmReject = window.confirm(
      "Tolak peminjaman ini?"
    );

    if (!confirmReject) return;

    try {
      await rejectBorrowing(id);

      alert("Peminjaman berhasil ditolak");

      fetchBorrowings();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Gagal reject"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>Manage Borrowings</h1>

        <button
          onClick={() => navigate("/admin")}
          style={{
            background: "#333",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Kembali
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : borrowings.length === 0 ? (
        <div
          style={{
            background: "#1f1f1f",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          Tidak ada request peminjaman.
        </div>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#1f1f1f",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#222",
              }}
            >
              <th style={{ padding: "15px" }}>
                ID
              </th>

              <th style={{ padding: "15px" }}>
                User
              </th>

              <th style={{ padding: "15px" }}>
                Buku
              </th>

              <th style={{ padding: "15px" }}>
                Status
              </th>

              <th style={{ padding: "15px" }}>
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {borrowings.map((item) => (
              <tr
                key={item.id}
                style={{
                  borderBottom:
                    "1px solid #333",
                }}
              >
                <td style={{ padding: "15px" }}>
                  {item.id}
                </td>

                <td style={{ padding: "15px" }}>
                  {item.user_name}
                </td>

                <td style={{ padding: "15px" }}>
                  {item.book_title}
                </td>

                <td style={{ padding: "15px" }}>
                  {item.status}
                </td>

                <td style={{ padding: "15px" }}>
                  <button
                    onClick={() =>
                      handleApprove(item.id)
                    }
                    style={{
                      background: "green",
                      color: "#fff",
                      border: "none",
                      padding:
                        "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      handleReject(item.id)
                    }
                    style={{
                      background: "red",
                      color: "#fff",
                      border: "none",
                      padding:
                        "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminBorrowings;
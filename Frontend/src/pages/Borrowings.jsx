import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
  FaBook,
  FaClock,
  FaCheckCircle,
  FaSearch,
} from "react-icons/fa";

import AppNavbar from "../components/layout/AppNavbar/AppNavbar";
import Footer from "../components/layout/Footer/Footer";

import {
  getMyBorrowings,
  returnBook,
} from "../services/borrowingService";

function Borrowings() {
  const [borrowings, setBorrowings] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] =
    useState("all");

  const fetchData = async () => {
    try {
      const data = await getMyBorrowings();
      setBorrowings(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReturn = async (id) => {
    const result = await Swal.fire({
      title: "Kembalikan Buku?",
      text: "Buku akan dikembalikan ke perpustakaan",
      icon: "question",
      background: "#181818",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#e50914",
      cancelButtonColor: "#444",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      await returnBook(id);

      Swal.fire({
        title: "Berhasil",
        text: "Buku berhasil dikembalikan",
        icon: "success",
        background: "#181818",
        color: "#fff",
        confirmButtonColor: "#e50914",
      });

      fetchData();
    } catch (err) {
      Swal.fire({
        title: "Gagal",
        text:
          err.response?.data?.message ||
          "Terjadi kesalahan",
        icon: "error",
        background: "#181818",
        color: "#fff",
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "borrowed":
        return "#00c853";

      case "pending":
        return "#ff9800";

      case "returned":
        return "#2196f3";

      case "rejected":
        return "#f44336";

      default:
        return "#666";
    }
  };

  const filteredData = borrowings.filter(
    (item) => {
      const matchSearch =
        item.book_title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        filterStatus === "all"
          ? true
          : item.status === filterStatus;

      return matchSearch && matchStatus;
    }
  );

  return (
    <div
      style={{
        background: "#0f0f0f",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <AppNavbar />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "100px 30px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          📚 My Borrowings
        </h1>

        <p
          style={{
            color: "#aaa",
            marginBottom: "30px",
          }}
        >
          Kelola seluruh aktivitas peminjaman
          buku Anda
        </p>

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <CardStat
            icon={<FaBook />}
            title="Total Borrowings"
            value={borrowings.length}
          />

          <CardStat
            icon={<FaCheckCircle />}
            title="Active"
            value={
              borrowings.filter(
                (b) =>
                  b.status === "borrowed"
              ).length
            }
          />

          <CardStat
            icon={<FaClock />}
            title="Pending"
            value={
              borrowings.filter(
                (b) =>
                  b.status === "pending"
              ).length
            }
          />
        </div>

        {/* SEARCH */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "25px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              background: "#1a1a1a",
              padding: "12px",
              borderRadius: "10px",
            }}
          >
            <FaSearch />

            <input
              type="text"
              placeholder="Cari buku..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={{
                background: "none",
                border: "none",
                outline: "none",
                color: "#fff",
                marginLeft: "10px",
                width: "100%",
              }}
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(
                e.target.value
              )
            }
            style={{
              background: "#1a1a1a",
              color: "#fff",
              border: "none",
              padding: "12px",
              borderRadius: "10px",
            }}
          >
            <option value="all">
              Semua
            </option>
            <option value="pending">
              Pending
            </option>
            <option value="borrowed">
              Borrowed
            </option>
            <option value="returned">
              Returned
            </option>
            <option value="rejected">
              Rejected
            </option>
          </select>
        </div>

        {/* TABLE */}
        <div
          style={{
            background: "#181818",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#202020",
                }}
              >
                <th style={th}>ID</th>
                <th style={th}>Book</th>
                <th style={th}>Status</th>
                <th style={th}>
                  Due Date
                </th>
                <th style={th}>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length >
              0 ? (
                filteredData.map(
                  (item) => (
                    <tr
                      key={item.id}
                    >
                      <td style={td}>
                        #{item.id}
                      </td>

                      <td style={td}>
                        {
                          item.book_title
                        }
                      </td>

                      <td style={td}>
                        <span
                          style={{
                            background:
                              getStatusColor(
                                item.status
                              ),
                            padding:
                              "6px 14px",
                            borderRadius:
                              "20px",
                            fontSize:
                              "12px",
                            fontWeight:
                              "bold",
                          }}
                        >
                          {
                            item.status
                          }
                        </span>
                      </td>

                      <td style={td}>
                        {item.due_date
                          ? new Date(
                              item.due_date
                            ).toLocaleDateString(
                              "id-ID"
                            )
                          : "-"}
                      </td>

                      <td style={td}>
                        {item.status ===
                        "borrowed" ? (
                          <button
                            onClick={() =>
                              handleReturn(
                                item.id
                              )
                            }
                            style={{
                              background:
                                "#e50914",
                              color:
                                "#fff",
                              border:
                                "none",
                              padding:
                                "10px 18px",
                              borderRadius:
                                "8px",
                              cursor:
                                "pointer",
                            }}
                          >
                            Return
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign:
                        "center",
                      padding:
                        "50px",
                      color:
                        "#999",
                    }}
                  >
                    📚 Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function CardStat({
  icon,
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#181818",
        padding: "25px",
        borderRadius: "15px",
      }}
    >
      <div
        style={{
          fontSize: "22px",
          marginBottom: "10px",
        }}
      >
        {icon}
      </div>

      <h3>{title}</h3>

      <h1>{value}</h1>
    </div>
  );
}

const th = {
  padding: "18px",
  textAlign: "left",
};

const td = {
  padding: "18px",
  borderBottom:
    "1px solid #2a2a2a",
};

export default Borrowings;


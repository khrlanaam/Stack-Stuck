import { useEffect, useState } from "react";
import styles from "./Borrowings.module.css";
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
  const [filterStatus, setFilterStatus] = useState("all");

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
        text: err.response?.data?.message || "Terjadi kesalahan",
        icon: "error",
        background: "#181818",
        color: "#fff",
      });
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "borrowed":
        return "Sedang Dipinjam";
      case "pending":
        return "Menunggu Persetujuan";
      case "returned":
        return "Dikembalikan";
      case "rejected":
        return "Ditolak";
      default:
        return status;
    }
  };

  const filteredData = borrowings.filter((item) => {
    const matchSearch = item.book_title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      filterStatus === "all"
        ? true
        : item.status === filterStatus;

    return matchSearch && matchStatus;
  });

  return (
    <div className={styles.container}>
      <AppNavbar />

      <div className={styles.wrapper}>
        <h1 className={styles.title}>Peminjaman Saya</h1>

        <p className={styles.subtitle}>
          Kelola seluruh aktivitas peminjaman buku Anda
        </p>

        {/* STATISTIK */}
        <div className={styles.stats}>
          <CardStat
            icon={<FaBook />}
            title="Total Peminjaman"
            value={borrowings.length}
          />

          <CardStat
            icon={<FaCheckCircle />}
            title="Sedang Dipinjam"
            value={
              borrowings.filter((b) => b.status === "borrowed").length
            }
          />

          <CardStat
            icon={<FaClock />}
            title="Menunggu Persetujuan"
            value={
              borrowings.filter((b) => b.status === "pending").length
            }
          />
        </div>

        {/* SEARCH */}
        <div className={styles.searchBar}>
          <div className={styles.searchInputBox}>
            <FaSearch />

            <input
              type="text"
              placeholder="Cari buku..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.filter}
          >
            <option value="all">Semua</option>
            <option value="pending">Menunggu Persetujuan</option>
            <option value="borrowed">Sedang Dipinjam</option>
            <option value="returned">Dikembalikan</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>

        {/* TABLE */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHead}>
                <th>No</th>
                <th>Judul Buku</th>
                <th>Status</th>
                <th>Tanggal Jatuh Tempo</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>#{item.id}</td>

                    <td>{item.book_title}</td>

                    <td>
                      <span
                        className={`${styles.statusBadge}
                          ${
                            item.status === "pending"
                              ? styles.statusPending
                              : item.status === "borrowed"
                              ? styles.statusBorrowed
                              : item.status === "returned"
                              ? styles.statusReturned
                              : styles.statusRejected
                          }`}
                      >
                        {getStatusLabel(item.status)}
                      </span>
                    </td>

                    <td>
                      {item.due_date
                        ? new Date(item.due_date).toLocaleDateString("id-ID")
                        : "-"}
                    </td>

                    <td>
                      {item.status === "borrowed" ? (
                        <button
                          onClick={() => handleReturn(item.id)}
                          className={styles.returnButton}
                        >
                          Kembalikan
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "50px", color: "#999" }}>
                    Tidak ada data
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

/* CARD STAT */
function CardStat({ icon, title, value }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardIcon}>{icon}</div>

      <div className={styles.cardContent}>
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
    </div>
  );
}

export default Borrowings;
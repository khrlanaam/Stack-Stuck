import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Swal from "sweetalert2";

import {
  FaBook,
  FaUsers,
  FaClipboardList,
  FaExchangeAlt,
  FaTags,
} from "react-icons/fa";

import styles from "./admin/Admin.module.css";

import { getAdminStats } from "../services/adminService";

import {
  getPendingBorrowings,
  approveBorrowing,
  rejectBorrowing,
} from "../services/borrowingService";

function Admin() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalBorrowings: 0,
    activeBorrowings: 0,
  });

  const [pendingBorrowings, setPendingBorrowings] = useState([]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const fetchStats = async () => {
    try {
      const result = await getAdminStats();
      setStats(result);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPendingBorrowings = async () => {
    try {
      const data = await getPendingBorrowings();
      setPendingBorrowings(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchPendingBorrowings();
  }, []);

  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: "Setujui Permintaan?",
      text: "Peminjaman akan disetujui.",
      icon: "question",
      background: "#181818",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#00c853",
      cancelButtonColor: "#444",
      confirmButtonText: "Setujui",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      await approveBorrowing(id);

      await Swal.fire({
        title: "Berhasil",
        text: "Peminjaman berhasil disetujui",
        icon: "success",
        background: "#181818",
        color: "#fff",
      });

      fetchPendingBorrowings();
      fetchStats();
    } catch (err) {
      Swal.fire({
        title: "Gagal",
        text: err.response?.data?.message || "Gagal menyetujui peminjaman",
        icon: "error",
        background: "#181818",
        color: "#fff",
      });
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Tolak Permintaan?",
      text: "Peminjaman akan ditolak.",
      icon: "warning",
      background: "#181818",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#e50914",
      cancelButtonColor: "#444",
      confirmButtonText: "Tolak",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      await rejectBorrowing(id);

      await Swal.fire({
        title: "Berhasil",
        text: "Peminjaman berhasil ditolak",
        icon: "success",
        background: "#181818",
        color: "#fff",
      });

      fetchPendingBorrowings();
    } catch (err) {
      Swal.fire({
        title: "Gagal",
        text: err.response?.data?.message || "Gagal menolak peminjaman",
        icon: "error",
        background: "#181818",
        color: "#fff",
      });
    }
  };

  const statCard = (title, value, icon, color) => (
    <div className={styles.card}>
      <div>
        <p className={styles.cardTitle}>{title}</p>
        <h1 className={styles.cardValue}>{value}</h1>
      </div>

      <div
        className={styles.cardIcon}
        style={{ color }}
      >
        {icon}
      </div>
    </div>
  );

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            Dashboard Admin
          </h1>

          <p className={styles.subtitle}>
            Sistem Manajemen Perpustakaan
          </p>
        </div>

        <button
          onClick={handleLogout}
          className={styles.logoutBtn}
        >
          Logout
        </button>
      </div>

      <div className={styles.statGrid}>
        {statCard(
          "Total Buku",
          stats.totalBooks,
          <FaBook />,
          "#2196f3"
        )}

        {statCard(
          "Total Pengguna",
          stats.totalUsers,
          <FaUsers />,
          "#ff9800"
        )}

        {statCard(
          "Total Peminjaman",
          stats.totalBorrowings,
          <FaClipboardList />,
          "#9c27b0"
        )}

        {statCard(
          "Peminjaman Aktif",
          stats.activeBorrowings,
          <FaExchangeAlt />,
          "#00c853"
        )}
      </div>

      <div className={styles.menuSection}>
        <h2>Menu Manajemen</h2>

        <div className={styles.menuGrid}></div>
        <div
          className={styles.menuCard}
          onClick={() => navigate("/admin/books")}
        >
          <FaBook
            size={42}
            color="#2196f3"
          />

          <h3>Kelola Buku</h3>

          <p>
            Tambah, edit, hapus dan kelola
            data buku perpustakaan.
          </p>
        </div>

        <div
          className={styles.menuCard}
          onClick={() => navigate("/admin/users")}
        >
          <FaUsers
            size={42}
            color="#ff9800"
          />

          <h3>Kelola Pengguna</h3>

          <p>
            Lihat seluruh data pengguna
            yang telah melakukan
            registrasi.
          </p>
        </div>

        <div
          className={styles.menuCard}
          onClick={() =>
            navigate("/admin/borrowings")
          }
        >
          <FaClipboardList
            size={42}
            color="#9c27b0"
          />

          <h3>Kelola Peminjaman</h3>

          <p>
            Setujui, tolak dan pantau
            seluruh transaksi
            peminjaman buku.
          </p>
        </div>

        <div
          className={styles.menuCard}
          onClick={() =>
            navigate("/admin/categories")
          }
        >
          <FaTags
            size={42}
            color="#00c853"
          />

          <h3>Kelola Kategori</h3>

          <p>
            Tambah, edit dan hapus
            kategori buku.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Admin;
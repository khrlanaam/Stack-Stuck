import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./AppNavbar.module.css";

function AppNavbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // State untuk input pencarian
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Fungsi saat user menekan tombol Enter atau klik icon cari
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Mengarahkan ke halaman books sambil membawa query parameter ?search=...
      navigate(`/books?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div
        className={styles.logo}
        onClick={() => navigate("/home")}
      >
        ReadZone
      </div>

      <div className={styles.menu}>
        <span onClick={() => navigate("/home")}>
          Beranda
        </span>

        <span onClick={() => navigate("/categories")}>
          Kategori
        </span>

        <span onClick={() => navigate("/books")}>
          Buku
        </span>

        <span onClick={() => navigate("/borrowings")}>
          Peminjaman Saya
        </span>
      </div>

      {/* ================= BARU: SEARCH BAR ================= */}
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Cari judul buku atau penulis..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </form>
      {/* ==================================================== */}

      <div className={styles.auth}>
        <span className={styles.username}>
          Halo, {user?.name || "User"}
        </span>

        <button
          className={styles.logoutBtn}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AppNavbar;
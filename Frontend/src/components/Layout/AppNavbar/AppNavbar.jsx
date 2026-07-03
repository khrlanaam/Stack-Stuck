import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./AppNavbar.module.css";

function AppNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(urlQuery);

  useEffect(() => {
    setSearchQuery(urlQuery);
  }, [urlQuery]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div
        className={styles.logo}
        onClick={() => navigate("/home")}
      >
        ReadZone
      </div>

      {/* Menu */}
      <div className={styles.menu}>
        <span onClick={() => navigate("/home")}>
          Beranda
        </span>

        <span onClick={() => navigate("/categories")}>
          Kategori
        </span>

        <span onClick={() => navigate("/borrowings")}>
          Peminjaman Saya
        </span>
      </div>

      {/* Search */}
      <form
        onSubmit={handleSearchSubmit}
        className={styles.searchForm}
      >
        <input
          type="text"
          placeholder="Cari judul buku atau penulis..."
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(e.target.value)
          }
          className={styles.searchInput}
        />
      </form>

      {/* User */}
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
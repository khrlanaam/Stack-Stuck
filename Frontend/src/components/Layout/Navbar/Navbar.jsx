import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.navbar}>
      {/* Logo */}
      <h2
        className={styles.logo}
        onClick={() => navigate("/home")}
        style={{ cursor: "pointer" }}
      >
        ReadZone
      </h2>

      {/* Menu */}
      <div className={styles.menu}>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          Home
        </span>

        <span
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/categories")}
        >
          Categories
        </span>

        <span
          style={{ cursor: "pointer" }}
          onClick={() => alert("Trending page belum dibuat")}
        >
          Trending
        </span>
      </div>

      {/* Auth */}
      <div className={styles.auth}>
        {isAuthenticated ? (
          <>
            <span className={styles.username}>
              Hi, {user?.username || user?.name || "User"}
            </span>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>
              Login
            </button>

            <button onClick={() => navigate("/register")}>
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
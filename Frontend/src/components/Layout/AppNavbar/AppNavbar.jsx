import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./AppNavbar.module.css";

function AppNavbar() {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
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
          Home
        </span>

        <span onClick={() => navigate("/categories")}>
          Categories
        </span>

        <span onClick={() => navigate("/books")}>
          Books
        </span>

        <span onClick={() => navigate("/borrowings")}>
          My Borrowings
        </span>
      </div>

      <div className={styles.auth}>
        <span className={styles.username}>
          Hi, {user?.name || "User"}
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
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
      <h2
        className={styles.logo}
        onClick={() => navigate("/home")}
        style={{ cursor: "pointer" }}
      >
        ReadZone
      </h2>

      <div className={styles.menu}>
        <span
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        >
          Home
        </span>

        <span>
          Categories
        </span>

        <span>
          Trending
        </span>

        <span
          onClick={() => navigate("/books")}
          style={{ cursor: "pointer" }}
        >
          Books
        </span>

        <span
          onClick={() => navigate("/borrowings")}
          style={{ cursor: "pointer" }}
        >
          My Borrowings
        </span>
      </div>

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
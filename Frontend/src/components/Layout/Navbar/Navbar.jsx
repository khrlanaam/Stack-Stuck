import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      {/* LEFT */}
      <div
        className={styles.logo}
        onClick={() => navigate("/")}
      >
        ReadZone
      </div>

      {/* CENTER */}
      <div className={styles.menu}>
        <span onClick={() => navigate("/")}>
          Home
        </span>

        <span>
          About
        </span>

        <span>
          Why ReadZone
        </span>

        {isAuthenticated && (
          <>
            <span
              onClick={() => navigate("/books")}
            >
              Books
            </span>

            <span
              onClick={() =>
                navigate("/borrowings")
              }
            >
              My Borrowings
            </span>
          </>
        )}
      </div>

      {/* RIGHT */}
      <div className={styles.auth}>
        {isAuthenticated ? (
          <>
            <span className={styles.username}>
              Hi, {user?.name || "User"}
            </span>

            <button
              className={styles.logoutBtn}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.loginBtn}
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className={styles.registerBtn}
              onClick={() => navigate("/register")}
            >
              Start Reading
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
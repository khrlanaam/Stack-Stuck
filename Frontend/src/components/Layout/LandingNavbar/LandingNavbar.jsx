import { useNavigate } from "react-router-dom";
import styles from "./LandingNavbar.module.css";

function LandingNavbar() {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div
        className={styles.logo}
        onClick={() => navigate("/")}
      >
        ReadZone
      </div>

      <div className={styles.auth}>
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
          Register
        </button>
      </div>
    </nav>
  );
}

export default LandingNavbar;
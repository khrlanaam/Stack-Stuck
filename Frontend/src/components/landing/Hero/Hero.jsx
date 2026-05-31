import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className={styles.hero}>
      <div className={styles.overlay}>
        <h1>Unlimited Books, Stories & Knowledge</h1>

        <p>
          ReadZone brings thousands of books in a Netflix-style experience.
        </p>

        <div className={styles.buttons}>
          <button onClick={() => navigate("/register")}>
            Start Reading
          </button>

          <button onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
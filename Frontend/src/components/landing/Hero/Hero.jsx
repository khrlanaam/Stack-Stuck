import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>

        <h1>
          Discover Unlimited
          <br />
          Books, Stories &
          <br />
          Knowledge
        </h1>

        <p>
          Explore thousands of books across multiple genres.
          Read anytime, anywhere, and build your personal
          library with a modern reading experience.
        </p>

        <div className={styles.buttons}>
          <button
            className={styles.primaryBtn}
            onClick={() => navigate("/register")}
          >
            Start Reading
          </button>

          <button
            className={styles.secondaryBtn}
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
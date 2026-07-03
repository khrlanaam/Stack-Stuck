import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiBookOpen } from "react-icons/hi2";
import styles from "./LandingNavbar.module.css";

function LandingNavbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div
        className={styles.logo}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <HiBookOpen />
        <span>ReadZone</span>
      </div>

      <div className={styles.menu}>
        <a onClick={() => scrollTo("home")}>Beranda</a>
        <a onClick={() => scrollTo("features")}>Fitur</a>
        <a onClick={() => scrollTo("about")}>Tentang Kami</a>
      </div>

      <div className={styles.auth}>
        <button className={styles.loginBtn} onClick={() => navigate("/login")}>
          Masuk
        </button>
        <button className={styles.registerBtn} onClick={() => navigate("/register")}>
          Daftar
        </button>
      </div>
    </nav>
  );
}

export default LandingNavbar;

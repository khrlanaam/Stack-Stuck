import { useNavigate } from "react-router-dom";
import { HiBookOpen } from "react-icons/hi2";
import styles from "./Footer.module.css";

function Footer() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.brandName}>
            <HiBookOpen />
            <span>ReadZone</span>
          </div>
          <p>
            Platform digital untuk menemukan, membaca,
            dan mengelola koleksi buku dengan pengalaman modern.
          </p>
        </div>

        <div className={styles.links}>
          <h4>Navigate</h4>
          <a onClick={scrollToTop}>Home</a>
          <a onClick={() => navigate("/login")}>Login</a>
          <a onClick={() => navigate("/register")}>Register</a>
        </div>

        <div className={styles.links}>
          <h4>Project</h4>
          <a>Stack-Stuck Team</a>
          <a>ReadZone Library</a>
        </div>
      </div>

      <div className={styles.bottom}>
        &copy; 2026 ReadZone. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

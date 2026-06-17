import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <h1>
          Sistem Perpustakaan Digital
          <br />
          untuk Membaca, Meminjam,
          <br />
          dan Mengelola Buku
        </h1>

        <p>
          Jelajahi koleksi buku digital dari berbagai kategori.
          Temukan buku favoritmu, pinjam dengan mudah,
          dan nikmati pengalaman membaca yang modern
          kapan saja dan di mana saja.
        </p>

        <div className={styles.buttons}>
          <button
            className={styles.primaryBtn}
            onClick={() => navigate("/register")}
          >
            Mulai Sekarang
          </button>

          <button
            className={styles.secondaryBtn}
            onClick={() => navigate("/login")}
          >
            Masuk
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
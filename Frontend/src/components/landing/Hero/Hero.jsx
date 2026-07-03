import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bookshelfImg from "../../../assets/bookshelf.jpg";
import styles from "./Hero.module.css";

function Hero() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;
    if (!hero || !bg) return;

    const isMobile = window.innerWidth < 768;

    const handleScroll = () => {
      if (isMobile) return;

      const rect = hero.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const heroTop = rect.top;
      const heroBottom = rect.bottom;

      if (heroBottom < 0 || heroTop > windowHeight) return;

      const scrollProgress = 1 - heroBottom / (windowHeight + hero.offsetHeight);
      const translateY = Math.max(0, Math.min(100, scrollProgress * 100));
      const parallaxOffset = translateY * 0.25;

      bg.style.transform = `translateY(${parallaxOffset}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.hero} id="home" ref={heroRef}>
      <div
        className={styles.bgLayer}
        ref={bgRef}
        style={{
          backgroundImage: `url(${bookshelfImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className={styles.overlay} />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.subtitle}>
            BACA
            <span className={styles.subtitleDot} />
            PINJAM
            <span className={styles.subtitleDot} />
            KEMBANGKAN DIRI
          </div>

          <h1>
            Tempatnya Buku,
            <br />
            Waktunya{" "}
            <span className={styles.highlight}>Kamu</span>.
          </h1>

          <p>
            ReadZone adalah perpustakaan digital modern yang memudahkan
            kamu menemukan, meminjam, dan menikmati ribuan buku
            kapan saja, di mana saja.
          </p>

          <div className={styles.buttons}>
            <button
              className={styles.primaryBtn}
              onClick={() => navigate("/login")}
            >
              Masuk Sekarang
            </button>
            <button
              className={styles.secondaryBtn}
              onClick={() => navigate("/register")}
            >
              Daftar Gratis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

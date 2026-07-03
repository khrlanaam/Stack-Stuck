import { useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import LandingNavbar from "../components/layout/LandingNavbar/LandingNavbar";
import Hero from "../components/landing/Hero/Hero";
import About from "../components/landing/About/About";
import WhyReadzone from "../components/landing/WhyReadzone/WhyReadzone";
import Footer from "../components/layout/Footer/Footer";
import styles from "./Landing.module.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className={styles.landing}>
      <LandingNavbar />
      <Hero />
      <About />
      <WhyReadzone />

      <section className={styles.cta} id="about">
        <div className={styles.ctaContainer}>
          <h2>Siap Memulai Petualangan Membacamu?</h2>
          <p>
            Daftar sekarang dan nikmati akses ke ribuan koleksi buku
            digital. Gratis, kapan saja, di mana saja.
          </p>
          <button
            className={styles.ctaBtn}
            onClick={() => navigate("/register")}
          >
            Daftar Sekarang
            <HiArrowRight />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Landing;

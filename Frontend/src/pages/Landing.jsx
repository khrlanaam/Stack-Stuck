import { useNavigate } from "react-router-dom";

import LandingNavbar from "../components/layout/LandingNavbar/LandingNavbar";
import Hero from "../components/landing/Hero/Hero";
import About from "../components/landing/About/About";
import WhyReadzone from "../components/landing/WhyReadzone/WhyReadzone";
import Books from "../components/landing/Books/Books";
import Footer from "../components/layout/Footer/Footer";

function Landing() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#0b0b0f",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <LandingNavbar />

      <Hero />

      <About />

      <WhyReadzone />

      <section
        style={{
          padding: "100px 20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "48px",
            marginBottom: "20px",
          }}
        >
          Mulai Membaca Sekarang
        </h2>

        <p
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            color: "rgba(255,255,255,.7)",
            lineHeight: "1.8",
          }}
        >
          Bergabung dengan ReadZone untuk menemukan
          buku yang diinginkan, mengelola daftar bacaan, dan
          menikmati pengalaman membaca yang modern.
        </p>

        <button
          onClick={() => navigate("/register")}
          style={{
            marginTop: "30px",
            background: "#e50914",
            color: "white",
            border: "none",
            padding: "14px 30px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Mulai
        </button>
      </section>

      <Footer />
    </div>
  );
}

export default Landing;
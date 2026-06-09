import LandingNavbar from "../components/layout/LandingNavbar/LandingNavbar";
import Hero from "../components/landing/Hero/Hero";
import About from "../components/landing/About/About";
import WhyReadzone from "../components/landing/WhyReadzone/WhyReadzone";
import Books from "../components/landing/Books/Books";
import Footer from "../components/layout/Footer/Footer";

function Landing() {
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

      <section style={{ paddingBottom: "60px" }}>
        <Books title="Trending Books" />
      </section>

      <Footer />
    </div>
  );
}

export default Landing;
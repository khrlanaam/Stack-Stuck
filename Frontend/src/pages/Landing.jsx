import Navbar from "../components/layout/Navbar/Navbar";
import Hero from "../components/landing/Hero/Hero";
import Books from "../components/landing/Books/Books";

function Landing() {
  return (
    <div style={{ background: "#0b0b0f", color: "white", minHeight: "100vh" }}>
      <Navbar />

      <Hero />

      <section style={{ paddingBottom: "40px" }}>
        <Books />
        <Books />
        <Books />
      </section>
    </div>
  );
}

export default Landing;
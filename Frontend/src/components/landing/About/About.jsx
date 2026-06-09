import styles from "./About.module.css";

function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.content}>
        <h2>About ReadZone</h2>

        <p>
          ReadZone is a digital reading platform that helps readers
          discover books, articles, and educational content in a
          modern and enjoyable experience.
        </p>
      </div>
    </section>
  );
}

export default About;
import styles from "./About.module.css";

function About() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>

        <div className={styles.imageWrapper}>
          <img
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200"
            alt="Library"
          />
        </div>

        <div className={styles.content}>
          <span className={styles.badge}>
            ABOUT US
          </span>

          <h2>About ReadZone</h2>

          <p>
            ReadZone adalah platform digital untuk menemukan,
            membaca, dan mengelola koleksi buku favorit dalam
            satu tempat yang sederhana dan modern.
          </p>

          <p>
            Kami membantu pembaca menemukan buku lebih cepat,
            mengakses kategori yang relevan, dan menikmati
            pengalaman membaca yang nyaman.
          </p>

          <div className={styles.stats}>
            <div>
              <h3>10K+</h3>
              <span>Books</span>
            </div>

            <div>
              <h3>50+</h3>
              <span>Categories</span>
            </div>

            <div>
              <h3>5K+</h3>
              <span>Readers</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;
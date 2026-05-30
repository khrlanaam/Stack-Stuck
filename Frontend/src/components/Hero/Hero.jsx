import styles from "./Hero.module.css";

function Hero() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.hero__left}>
          <h2 className={styles.hero__title}>
            ReadZone
          </h2>

          <h3>
            Digital Library Management System
          </h3>

          <p className={styles.hero__description}>
            Temukan, pinjam, dan kelola buku dengan mudah melalui
            platform perpustakaan digital modern.
          </p>

          <button className={styles.hero__button}>
            Jelajahi Buku
          </button>
        </div>

        <div className={styles.hero__right}>
          <img
            className={styles.hero__image}
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da"
            alt="Library"
          />
        </div>
      </section>
    </div>
  );
}

export default Hero;
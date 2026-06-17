import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.brand}>
          <h2>ReadZone</h2>

          <p>
            Platform digital untuk menemukan,
            membaca, dan mengelola koleksi buku
            dengan pengalaman modern.
          </p>
        </div>

        <div className={styles.links}>
          <h4>Navigasi</h4>

          <a href="#about">
            Tentang Kami
          </a>

          <a href="/login">
            Login
          </a>

          <a href="/register">
            Register
          </a>
        </div>

        <div className={styles.contact}>
          <h4>Project</h4>

          <p>
            Developed by Stack-Stuck Team
          </p>

          <p>
            ReadZone Library Management
          </p>
        </div>

      </div>

      <div className={styles.bottom}>
        © 2026 ReadZone. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
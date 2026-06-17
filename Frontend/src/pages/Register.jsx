import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import styles from "./Register.module.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Frontend Validation
    if (!name.trim()) {
      setError("Nama wajib diisi");
      return;
    }

    if (name.length < 3) {
      setError("Nama minimal 3 karakter");
      return;
    }

    if (!email.trim()) {
      setError("Email wajib diisi");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Format email tidak valid");
      return;
    }

    if (!password.trim()) {
      setError("Password wajib diisi");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.error ||
        "Register gagal"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
        <div className={styles.container}>
      {/* KIRI */}
      <div className={styles.left}>
        <div className={styles.overlay}></div>

        <div className={styles.leftContent}>
          <h1>Bergabung dengan ReadZone</h1>

          <p>
            Buat akun Anda dan dapatkan akses ke
            ribuan buku, artikel, serta berbagai
            sumber pembelajaran.
          </p>
        </div>
      </div>

      {/* KANAN */}
      <div className={styles.right}>
        <div
          className={styles.logo}
          onClick={() => navigate("/")}
        >
          ReadZone
        </div>

        <div className={styles.card}>
          <h2>Buat Akun</h2>

          <p>Mulai perjalanan membaca Anda hari ini</p>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label>Nama Lengkap</label>

            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />

            <label>Alamat Email</label>

            <input
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />

            <label>Kata Sandi</label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />

            <button
              type="submit"
              disabled={loading}
              className={
                loading ? styles.disabledBtn : ""
              }
            >
              {loading
                ? "Membuat Akun..."
                : "Daftar"}
            </button>
          </form>

          <p className={styles.login}>
            Sudah memiliki akun?{" "}
            <span
              onClick={() =>
                navigate("/login")
              }
            >
              Masuk
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
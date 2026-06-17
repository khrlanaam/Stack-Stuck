import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

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

      const result = await loginUser({
        email,
        password,
      });

      login(
        result.user,
        result.token
      );

      if (result.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.error ||
        "Email atau password salah"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.overlay}></div>

        <div className={styles.leftContent}>
          <h1>Membaca Tanpa Batas</h1>

          <p>
            Temukan buku, artikel, dan berbagai
            pengetahuan hanya dalam genggaman Anda.
          </p>
        </div>
      </div>

      <div className={styles.right}>
        <div
          className={styles.logo}
          onClick={() => navigate("/")}
        >
          ReadZone
        </div>

        <div className={styles.card}>
          <h2>Selamat Datang Kembali</h2>

          <p>Masuk untuk melanjutkan membaca</p>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
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
                loading
                  ? styles.disabledBtn
                  : ""
              }
            >
              {loading
                ? "Sedang Masuk..."
                : "Masuk"}
            </button>
          </form>

          <p className={styles.register}>
            Belum punya akun?{" "}
            <span
              onClick={() =>
                navigate("/register")
              }
            >
              Daftar sekarang
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
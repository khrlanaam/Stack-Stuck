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
      {/* LEFT */}
      <div className={styles.left}>
        <div className={styles.overlay}></div>

        <div className={styles.leftContent}>
          <h1>Join ReadZone</h1>

          <p>
            Create your account and unlock access to
            thousands of books, articles, and learning
            resources.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        <div
          className={styles.logo}
          onClick={() => navigate("/")}
        >
          ReadZone
        </div>

        <div className={styles.card}>
          <h2>Create Account</h2>

          <p>Start your reading journey today</p>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Abidin"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />

            <label>Email Address</label>

            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />

            <label>Password</label>

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
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </form>

          <p className={styles.login}>
            Already have an account?{" "}
            <span
              onClick={() =>
                navigate("/login")
              }
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
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

    // Frontend Validation
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

      navigate("/home");
    } catch (error) {
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
      {/* LEFT SIDE */}
      <div className={styles.left}>
        <div className={styles.overlay}></div>

        <div className={styles.leftContent}>
          <h1>Read Without Limits</h1>

          <p>
            Discover millions of books, articles, and knowledge
            at your fingertips.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.right}>
        <div
          className={styles.logo}
          onClick={() => navigate("/")}
        >
          ReadZone
        </div>

        <div className={styles.card}>
          <h2>Welcome Back</h2>

          <p>Log in to continue reading</p>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label>Email Address</label>

            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) =>{
                setEmail(e.target.value);
                setError("");
              }}
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>{
                setPassword(e.target.value);
                setError("");
              }}
            />

            <div className={styles.row}>
              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <span className={styles.forgot}>
                Forgot?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={loading ? styles.disabledBtn : ""}
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>
          </form>

          <p className={styles.register}>
            New to ReadZone?{" "}
            <span
              onClick={() =>
                navigate("/register")
              }
            >
              Register now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
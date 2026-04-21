import { useState } from "react";
import { apiRequest } from "../../api/client";
import { styles } from "../../styles/app/appStyles";

function AuthPage(props) {
  const { onAuthSuccess } = props;
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (mode === "signup" && !form.username.trim()) {
      setError("Username is required.");
      return;
    }

    if (!form.email.trim() || !form.password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/signup";
      const payload =
        mode === "login"
          ? { email: form.email, password: form.password }
          : form;

      const data = await apiRequest(endpoint, {
        method: "POST",
        body: payload
      });

      onAuthSuccess(data.token, data.user);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.authShell}>
      <div style={styles.authCard}>
        <p style={styles.eyebrow}>Live ranked chess</p>
        <h1 style={styles.title}>Login or create account</h1>
        <p style={styles.subtitle}>
          Save wins, rank, and rating, then jump into online matchmaking.
        </p>

        <div style={styles.segmented}>
          <button
            onClick={() => setMode("login")}
            style={{
              ...styles.segmentButton,
              ...(mode === "login" ? styles.segmentButtonActive : {})
            }}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            style={{
              ...styles.segmentButton,
              ...(mode === "signup" ? styles.segmentButtonActive : {})
            }}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.authForm}>
          {mode === "signup" ? (
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              style={styles.input}
            />
          ) : null}

          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          {error ? <p style={styles.errorText}>{error}</p> : null}

          {error?.includes("Cannot reach the server") ? (
            <p style={styles.helperText}>
              Make sure the backend is running on `http://localhost:4000` and
              that MongoDB connects successfully before trying again.
            </p>
          ) : null}

          <button type="submit" style={styles.primaryButton} disabled={isSubmitting}>
            {isSubmitting
              ? "Please wait..."
              : mode === "login"
                ? "Login"
                : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;

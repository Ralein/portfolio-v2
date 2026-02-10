"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { HiLockClosed } from "react-icons/hi";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                router.push("/admin");
            } else {
                setError("Invalid username or password");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="login-page">
            <motion.form
                className="login-card glass-card"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleLogin}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 16,
                    }}
                >
                    <div
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: "var(--radius-md)",
                            background: "var(--gradient-primary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.5rem",
                        }}
                    >
                        <HiLockClosed />
                    </div>
                </div>

                <h1>Admin Panel</h1>
                <p className="login-subtitle">Sign in to manage your portfolio</p>

                {error && <div className="login-error">{error}</div>}

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                </div>

                <motion.button
                    type="submit"
                    className="btn-primary form-submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ opacity: loading ? 0.7 : 1 }}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </motion.button>

                <p
                    style={{
                        textAlign: "center",
                        marginTop: 20,
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                    }}
                >
                    <a href="/" style={{ color: "var(--accent-blue)" }}>
                        ← Back to Portfolio
                    </a>
                </p>
            </motion.form>
        </div>
    );
}

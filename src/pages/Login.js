import { useState } from "react";
import api from "../api/api";
import "./Login.css";

function Login({ onLoginSuccess, onGoToRegister }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await api.post("/Auth/login", {
                username,
                password,
            });

            localStorage.setItem("token", response.data.token);
            onLoginSuccess();
        } catch {
            alert("Login failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card notebook">
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">
                    Sign in to your personal notebook
                </p>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="auth-btn" onClick={handleLogin}>
                    Login
                </button>

                <p className="auth-footer">
                    Don’t have an account?{" "}
                    <span className="auth-link" onClick={onGoToRegister}>
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;

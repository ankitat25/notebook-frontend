import { useState } from "react";
import api from "../api/api";
import "./Register.css";

function Register({ onRegisterSuccess, onGoToLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await api.post("/Auth/register", {
                username,
                password,
            });

            alert("Registered successfully");
            onRegisterSuccess(); // go back to login
        } catch (err) {
            console.error("REGISTER ERROR:", err.response?.data || err.message);
            alert(
                err.response?.data || "Registration failed (check console)"
            );
        }

    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Start your notebook journey</p>

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

                <button className="auth-btn" onClick={handleRegister}>
                    Register
                </button>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <span className="auth-link" onClick={onGoToLogin}>
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Register;

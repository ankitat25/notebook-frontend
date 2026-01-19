import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register"; // 🔥 ADD THIS
import CreatePost from "./pages/CreatePost";
import MyPosts from "./pages/MyPosts";
import PostView from "./pages/PostView";
import MyFavorites from "./pages/MyFavorites";
import "./pages/Navbar.css";


/* 🔹 HEADER COMPONENT */

    function Header({ onHome, onMyPosts, onFavorites, onLogout }) {
        return (
            <div className="navbar">
                <div className="navbar-title" onClick={onHome}>
                    NoteBook
                </div>

                <div className="navbar-actions">
                    <button onClick={onMyPosts}>My Posts</button>
                    <button onClick={onFavorites}>My Favorites</button>
                    <button onClick={onLogout}>Logout</button>
                </div>
            </div>
        );
    }


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );

    const [authPage, setAuthPage] = useState("login"); // 🔥 NEW
    const [page, setPage] = useState("home");
    const [selectedPost, setSelectedPost] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setAuthPage("login"); // 🔥 reset auth page
        setPage("home");
        setSelectedPost(null);
    };

    // 🔴 NOT LOGGED IN → LOGIN / REGISTER
    if (!isLoggedIn) {
        return authPage === "login" ? (
            <Login
                onLoginSuccess={() => {
                    setIsLoggedIn(true);
                    setPage("home");
                }}
                onGoToRegister={() => setAuthPage("register")}
            />
        ) : (
            <Register
                onRegisterSuccess={() => setAuthPage("login")}
                onGoToLogin={() => setAuthPage("login")}
            />
        );
    }

    // 🔹 FULL POST VIEW
    if (page === "view") {
        return (
            <>
                <Header
                    onHome={() => setPage("home")}
                    onMyPosts={() => setPage("myposts")}
                    onFavorites={() => setPage("favorites")}
                    onLogout={handleLogout}
                />

                <PostView
                    post={selectedPost}
                    onBack={() => setPage("myposts")}
                />
            </>
        );
    }

    return (
        <>
            <Header
                onHome={() => setPage("home")}
                onMyPosts={() => setPage("myposts")}
                onFavorites={() => setPage("favorites")}
                onLogout={handleLogout}
            />

            {page === "home" && <CreatePost />}

            {page === "myposts" && (
                <MyPosts
                    onOpenPost={(post) => {
                        setSelectedPost(post);
                        setPage("view");
                    }}
                />
            )}

            {page === "favorites" && (
                <MyFavorites
                    onOpenPost={(post) => {
                        setSelectedPost(post);
                        setPage("view");
                    }}
                />
            )}
        </>
    );
}

export default App;

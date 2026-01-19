import { useEffect, useState } from "react";
import api from "../api/api";
import "./PostCard.css";

// 🔥 RECEIVE onOpenPost AS PROP
function MyPosts({ onOpenPost }) {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await api.get("/Posts");
            setPosts(response.data);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch posts");
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // ❤️ FAVORITE HANDLER
    const handleFavorite = async (postId) => {
        try {
            await api.post(`/Favorites/${postId}`);
            alert("Favorite updated");
        } catch {
            alert("Failed to update favorite");
        }
    };

    return (
        <div className="posts-container">
            {posts.map((post) => (
                <div className="post-card" key={post.id}>
                    {/* 🔹 TITLE */}
                    <div className="post-title">{post.title}</div>

                    {/* 🔹 IMAGE (CLICK TO OPEN FULL POST) */}
                    {post.imagePath && (
                        <img
                            src={`https://localhost:7260/${post.imagePath.replace(/^\/+/, "")}`}
                            alt="Post"
                            className="post-image"
                            onClick={() => onOpenPost(post)}
                            style={{ cursor: "pointer" }}
                        />
                    )}

                    {/* 🔹 CONTENT */}
                    <div className="post-content">{post.content}</div>

                    {/* ❤️ FAVORITE BUTTON */}
                    <div style={{ padding: "0 22px 16px" }}>
                        <button
                            className="btn-edit"
                            onClick={() => handleFavorite(post.id)}
                        >
                            ❤️ Favorite
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MyPosts;

import { useEffect, useState } from "react";
import api from "../api/api";
import "./PostCard.css";

function MyFavorites({ onOpenPost }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.get("/Favorites")
            .then(res => setPosts(res.data))
            .catch(() => alert("Failed to load favorites"));
    }, []);

    return (
        <div className="posts-container">
            {posts.length === 0 && <p>No favorite posts yet.</p>}

            {posts.map(post => (
                <div className="post-card" key={post.id}>
                    <div className="post-title">{post.title}</div>

                    {post.imagePath && (
                        <img
                            src={`https://localhost:7260/${post.imagePath.replace(/^\/+/, "")}`}
                            className="post-image"
                            alt=""
                            onClick={() => onOpenPost(post)}
                            style={{ cursor: "pointer" }}
                        />
                    )}

                    <div className="post-content">{post.content}</div>
                </div>
            ))}
        </div>
    );
}

export default MyFavorites;

import { useState } from "react";
import api from "../api/api";
import "./PostView.css";

function PostView({ post, onBack }) {
    // ✅ HOOKS MUST BE AT TOP LEVEL
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(post ? post.title : "");
    const [content, setContent] = useState(post ? post.content : "");

    // ✅ SAFE GUARD AFTER HOOKS
    if (!post) {
        return (
            <div style={{ padding: "40px" }}>
                <h2>Post not found</h2>
                <button onClick={onBack}>← Back</button>
            </div>
        );
    }

    const handleDelete = async () => {
        if (!window.confirm("Delete this post?")) return;

        try {
            await api.delete(`/Posts/${post.id}`);
            alert("Post deleted successfully");
            onBack();
        } catch (err) {
            console.error("DELETE ERROR:", err);
            alert("Delete failed");
        }
    };

    const handleUpdate = async () => {
        try {
            await api.put(`/Posts/${post.id}`, {
                title,
                content,
            });
            alert("Post updated successfully");
            setIsEditing(false);
        } catch (err) {
            console.error("UPDATE ERROR:", err);
            alert("Update failed");
        }
    };

    const handleFavourate = async () => {
        try {
            await api.post('/Favorites/${post.id}');
            alert("Favorite updated");
        } catch (err) {
            console.error(err);
            alert("Failed to update favorite");
        }
    };
    
    return (
        <div className="postview-container">
            <button className="back-btn" onClick={onBack}>
                ← Back
            </button>

            {post.imagePath && (
                <img
                    src={`https://localhost:7260/${post.imagePath.replace(/^\/+/, "")}`}
                    alt="Post"
                    className="postview-image"
                />
            )}

            {isEditing ? (
                <>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </>
            ) : (
                <>
                    <h2 className="postview-title">{post.title}</h2>
                    <p className="postview-content">{post.content}</p>
                </>
            )}

            <div className="postview-actions">
                <button
                    className="btn-edit"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? "Cancel" : "Edit"}
                </button>

                {isEditing && (
                    <button className="btn-edit" onClick={handleUpdate}>
                        Save
                    </button>
                )}

                <button className="btn-delete" onClick={handleDelete}>
                    Delete
                </button>

                <button className="btn-edit" onClick={handleFavourate}>
                    ❤️ Favorite
                </button>
            </div>
        </div>
    );
}

export default PostView;

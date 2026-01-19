import { useState } from "react";
import api from "../api/api";

function EditPost({ post, onCancel, onUpdated }) {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const handleUpdate = async () => {
        try {
            await api.put(`/Posts/${post.id}`, {
                title,
                content,
            });

            alert("Post updated");
            onUpdated();
        } catch (err) {
            alert("Update failed");
        }
    };

    return (
        <div>
            <h4>Edit Post</h4>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br /><br />

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <br /><br />

            <button onClick={handleUpdate}>Update</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}

export default EditPost;

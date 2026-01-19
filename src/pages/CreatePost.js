import { useState } from "react";
import api from "../api/api";
import "./CreatePost.css";


function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");


    const handleCreatePost = async () => {
        try {
            const formData = new FormData();
            formData.append("Title", title);
            formData.append("Content", content);

            if (image) {
                formData.append("Image", image);
            }

            await api.post("/Posts/with-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Post created successfully");
            setTitle("");
            setContent("");
            setImage(null);
        } catch (err) {
            console.error(err);
            alert("Failed to create post");
        }
    };


    return (
        <div className="create-post-container">
            <h3>Create Post</h3>

            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br /><br />

            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <br /><br />

            <input
                type="file"
                accept="image/*"
                className="create-file"
                onChange={(e) => setImage(e.target.files[0])}
            />


            <button onClick={handleCreatePost}>Create</button>
        </div>
    );
}

export default CreatePost;

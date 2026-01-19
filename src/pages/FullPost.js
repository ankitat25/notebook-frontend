function FullPost({ post, onBack }) {
    return (
        <div style={{ maxWidth: "900px", margin: "40px auto" }}>
            <button onClick={onBack}>← Back</button>

            <h1 style={{ fontFamily: "Playfair Display, serif" }}>
                {post.title}
            </h1>

            {post.imagePath && (
                <img
                    src={`https://localhost:7260/${post.imagePath}`}
                    style={{ width: "100%", borderRadius: "12px" }}
                    alt=""
                />
            )}

            <p style={{ marginTop: "20px", fontSize: "17px" }}>
                {post.content}
            </p>
        </div>
    );
}

export default FullPost;

import "./Navbar.css";

function Navbar({ onLogout, onMyPosts, onHome }) {
    return (
        <div className="navbar">
            <div className="nav-left" onClick={onHome} style={{ cursor: "pointer" }}>
                NoteBook
            </div>

            <div className="nav-right">
                <button className="nav-btn" onClick={onMyPosts}>
                    My Posts
                </button>

                <button className="nav-btn" onClick={onLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Navbar;

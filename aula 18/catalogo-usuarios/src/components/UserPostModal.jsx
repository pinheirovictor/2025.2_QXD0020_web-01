export default function UserPostModal({ post, onClose }) {
    if (!post) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>

                <button style={styles.button} onClick={onClose}>
                    Fechar
                </button>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    modal: {
        background: "white",
        padding: 20,
        borderRadius: 8,
        width: "60%",
        maxWidth: 600
    },
    button: {
        marginTop: 20,
        padding: "8px 12px",
        background: "#1d3557",
        color: "white",
        border: "none",
        borderRadius: 4,
        cursor: "pointer"
    }
};

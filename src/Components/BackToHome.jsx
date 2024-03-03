import '../App.css';
export default function BackToHome() {
    return (
        <div className="back-to-home">
            <button onClick={() => window.location = "/"}>Vissza</button>
        </div>
    );
}
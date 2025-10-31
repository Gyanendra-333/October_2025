import "../styles/Loader.scss";

const Loader = () => {
    return (
        <div className="loader-overlay">
            <div className="loader">
                <div className="spinner"></div>
                <p className="loading-text">Loading...</p>
            </div>
        </div>
    );
};

export default Loader;



const LoaderOverlay = ({
    text = "Uploading...",
    size = 10,
    show = false,
    className = "justify-center",
}) => {
    if (!show) return null; // Prevents rendering when not needed

    return (
        <div
            className={`fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center ${className}`}
        >
            <div className="flex flex-col items-center">
                <div
                    className={`animate-spin rounded-full h-${size} w-${size} border-t-2 border-b-2 border-white`}
                ></div>
                <p className="text-white text-sm mt-2">{text}</p>
            </div>
        </div>
    );
};

export default LoaderOverlay;

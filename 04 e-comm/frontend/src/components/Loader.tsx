

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
            <div className="flex flex-col items-center">
                {/* Beautiful spinning ring */}
                <div className="relative w-16 h-16">
                    <div className="absolute w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute w-12 h-12 border-4 border-transparent border-t-indigo-400 border-r-indigo-400 rounded-full animate-spin-slow"></div>
                </div>

                {/* Loading text */}
                <p className="mt-6 text-lg font-semibold text-gray-700 animate-pulse">
                    Loading,Please wait...
                </p>
            </div>
        </div>
    );
};

// Custom animation for slower spin
const style = document.createElement("style");
style.innerHTML = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 2.5s linear infinite;
  }
`;
document.head.appendChild(style);

export default Loader;

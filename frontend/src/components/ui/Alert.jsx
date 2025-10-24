import { useEffect } from "react";

const alertBaseStyle = `
  fixed top-[4.5rem] sm:top-20 left-1/2
  z-50 flex items-center w-[95%] sm:w-[75%] max-w-2xl p-3 sm:p-4
  rounded-lg sm:rounded-xl shadow-lg border transition-all duration-300
  animate-fadeIn
`;

const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translate(-50%, -20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out forwards;
}
`;

export function AlertInfo({ onClose, color = "blue", alertType, alertContent }) {
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  const colorMap = {
    blue: "bg-blue-50 text-blue-800 border-blue-300",
    green: "bg-green-50 text-green-800 border-green-300",
    yellow: "bg-yellow-50 text-yellow-800 border-yellow-300",
    red: "bg-red-50 text-red-800 border-red-300",
  };

  return (
    <div className={`${alertBaseStyle} ${colorMap[color] || colorMap.blue}`}>
      <svg
        className="shrink-0 w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9 4a1 1 0 1 1 2 0v6a1 1 0 1 1-2 0V4Zm1 10.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
      </svg>
      <div className="flex-1 text-xs sm:text-sm">
        <span className="font-semibold capitalize mr-1">{alertType}:</span>
        {alertContent}
      </div>
      <button
        onClick={onClose}
        className="ml-2 sm:ml-3 text-xs sm:text-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md hover:bg-white/50 transition"
      >
        ✕
      </button>
    </div>
  );
}

export function AlertList({ onClose, items = [], title }) {
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  return (
    <div
      className={`${alertBaseStyle} bg-red-50 text-red-800 border-red-300`}
      role="alert"
    >
      <svg
        className="shrink-0 w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div className="flex-1 text-xs sm:text-sm">
        <div className="flex justify-between items-center">
          <p className="font-semibold">{title}</p>
          <button
            onClick={onClose}
            className="ml-2 sm:ml-3 text-xs sm:text-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md hover:bg-white/50 transition"
          >
            ✕
          </button>
        </div>
        <ul className="mt-1.5 sm:mt-2 list-disc list-inside text-xs sm:text-sm">
          {items.map((item, index) =>
            item ? <li key={index}>{item}</li> : null
          )}
        </ul>
      </div>
    </div>
  );
}

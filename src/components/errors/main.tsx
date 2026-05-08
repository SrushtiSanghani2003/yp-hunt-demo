import React from "react";

interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const MainErrorFallback: React.FC<FallbackProps> = ({ error }) => {
  const isChunkLoadError =
    error.message.includes("Failed to fetch dynamically imported module") ||
    error.name === "ChunkLoadError";

  const handleReload = () => {
    // Clear service worker or cache storage if used
    if ("caches" in window) {
      caches.keys().then((keys) => {
        keys.forEach((key) => caches.delete(key));
      });
    }
    window.location.assign(window.location.origin);
  };

  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Oops, something went wrong 😢</h2>
      <p className="text-sm text-gray-600 mt-2 px-6 text-center max-w-md">
        {isChunkLoadError
          ? "A new version of the app is available. Please refresh to continue."
          : error.message}
      </p>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleReload}
      >
        {isChunkLoadError ? "Reload App" : "Refresh"}
      </button>
    </div>
  );
};

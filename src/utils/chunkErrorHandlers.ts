const RELOAD_KEY = "chunk_reload_attempt";
const MAX_RELOAD_ATTEMPTS = 2;
 
const isChunkLoadError = (message: string = ""): boolean => {
  return (
    message.includes("Failed to fetch dynamically imported module") ||
    message.includes("Importing a module script failed") ||
    message.includes("ChunkLoadError")
  );
};
 
const getReloadAttempts = (): number => {
  return Number(sessionStorage.getItem(RELOAD_KEY) || "0");
};
 
const setReloadAttempts = (count: number) => {
  sessionStorage.setItem(RELOAD_KEY, String(count));
};
 
const clearReloadAttempts = () => {
  sessionStorage.removeItem(RELOAD_KEY);
};
 
const reloadApp = () => {
  const attempts = getReloadAttempts();
 
  if (attempts < MAX_RELOAD_ATTEMPTS) {
    const nextAttempt = attempts + 1;
    console.warn(
      `Chunk loading error detected. Reload attempt ${nextAttempt}/${MAX_RELOAD_ATTEMPTS}`,
    );
    setReloadAttempts(nextAttempt);
    window.location.reload();
    return;
  }
 
  console.error("Max reload attempts reached. Redirecting to root.");
  clearReloadAttempts();
  window.location.assign("/");
};
 
export function setupChunkErrorHandler() {
  const handleError = (event: ErrorEvent) => {
    const message = event?.message || "";
 
    if (!isChunkLoadError(message)) return;
 
    event.preventDefault();
    reloadApp();
  };
 
  const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    const reason = event?.reason;
 
    const message =
      typeof reason === "string"
        ? reason
        : reason instanceof Error
          ? reason.message
          : "";
 
    if (!isChunkLoadError(message)) return;
 
    event.preventDefault();
    reloadApp();
  };
 
  const handleLoad = () => {
    clearReloadAttempts();
  };
 
  window.addEventListener("error", handleError);
  window.addEventListener("unhandledrejection", handleUnhandledRejection);
  window.addEventListener("load", handleLoad);
}

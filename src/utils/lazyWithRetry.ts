import React from "react";
 
const hasReloadedKey = "app_chunk_reload_attempted";
 
export function lazyWithRetry<T extends React.ComponentType<any>>(
  importer: () => Promise<{ default: T }>,
) {
  return React.lazy(async () => {
    try {
      const module = await importer();
      sessionStorage.removeItem(hasReloadedKey);
      return module;
    } catch (error) {
      const alreadyReloaded = sessionStorage.getItem(hasReloadedKey);
 
      const isChunkError =
        error instanceof Error &&
        (
          error.message.includes("Failed to fetch dynamically imported module") ||
          error.message.includes("ChunkLoadError") ||
          error.message.includes("Importing a module script failed")
        );
 
      if (isChunkError && !alreadyReloaded) {
        sessionStorage.setItem(hasReloadedKey, "true");
        window.location.reload();
      }
 
      throw error;
    }
  });
}
 
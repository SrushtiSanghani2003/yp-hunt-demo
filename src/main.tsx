import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@radix-ui/themes/styles.css";
import { setupChunkErrorHandler } from "./utils/chunkErrorHandlers.ts";

setupChunkErrorHandler()

createRoot(document.getElementById("root")!).render(<App />);

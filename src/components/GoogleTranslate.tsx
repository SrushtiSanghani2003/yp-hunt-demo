import { useState } from "react";
import { useGoogleTranslate } from "../hooks/useGoogleTranslate";

const GoogleTranslate = () => {
  const [iframeReady, setIframeReady] = useState(false);

  // Load and init Google Translate
  useGoogleTranslate(() => {
    // After script loaded & TranslateElement created
    // Start checking for iframe
    const interval = setInterval(() => {
      const iframe = document.querySelector("iframe.goog-te-menu-frame");
      if (iframe) {
        setIframeReady(true);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  });

  const handleTranslate = (lang: string) => {
    if (!iframeReady) {
      console.warn("Translate iframe not ready yet");
      return;
    }
    const iframe = document.querySelector(
      "iframe.goog-te-menu-frame"
    ) as HTMLIFrameElement | null;
    if (!iframe) return;

    const innerDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!innerDoc) return;

    const langItems = innerDoc.querySelectorAll(
      ".goog-te-menu2-item span.text"
    );

    langItems.forEach((span) => {
      if (span.textContent?.trim().toLowerCase() === lang.toLowerCase()) {
        (span as HTMLElement).click();
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="lang-select">Translate:</label>
      <select
        id="lang-select"
        disabled={!iframeReady}
        onChange={(e) => handleTranslate(e.target.value)}
        className="border p-1 rounded"
      >
        <option value="">Select</option>
        <option value="english">English</option>
        <option value="french">French</option>
      </select>

      {/* Hidden container required for Google Translate */}
      <div id="google_translate_element" style={{ display: "none" }} />
    </div>
  );
};

export default GoogleTranslate;

// hooks/useGoogleTranslate.ts
import { useEffect } from "react";

export const useGoogleTranslate = (onReady?: () => void) => {
  useEffect(() => {
    if ((window as any).google?.translate?.TranslateElement) {
      onReady?.();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,fr",
          layout: (window as any).google.translate.TranslateElement.InlineLayout
            .SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
      onReady?.();
    };
  }, [onReady]);
};

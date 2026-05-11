import React, { useEffect, useRef, useState } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";

import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/file.min.js";
import "froala-editor/js/plugins/video.min.js";

import froalaConfig from "./froalaConfig";
import ContentLibrary from "../contentPanel/ContentLibrary";
import { concatImgURL } from "../../config/function";

declare global {
  interface Window {
    showContentLibrary?: (type: string, editorInstance: any) => void;
  }
}

interface FroalaEditorProps {
  label?: string;
  model: string;
  isDark?: any;
  onModelChange: (content: string) => void;
  onThemeChange?: (isDark: boolean) => void;
  tag?: string;
  config?: any;
  showThemeToggle?: boolean;
}

const FroalaEditor: React.FC<FroalaEditorProps> = ({
  label,
  model,
  isDark,
  onModelChange,
  onThemeChange,
  tag = "textarea",
  config = froalaConfig,
  showThemeToggle = true,
}) => {
  const [isClient, setIsClient] = useState(false);
  const editorRef = useRef<any>(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [_type, setType] = useState("file");
  const editorInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Attach the global function once
    window.showContentLibrary = (
      typeFromEditor: string,
      editorInstance: any,
    ) => {
      setType(typeFromEditor);
      editorRef.current = editorInstance;
      setShowLibrary(true);
    };

    return () => {
      window.showContentLibrary = undefined;
    };
  }, []);

  const handleBtnClick = () => {
    const editorInstance = editorRef.current?.editor;
    const currentTheme = editorInstance?.opts?.theme;
    const newTheme = currentTheme === "dark" ? "default" : "dark";
    editorInstance.opts.theme = newTheme;

    // Re-initialize editor styles dynamically
    editorInstance.$box.removeClass("fr-theme-dark fr-theme-default");
    editorInstance.$box.addClass(`fr-theme-${newTheme}`);
    onThemeChange?.(newTheme === "dark");
  };

  // const handleSelectFromLibrary = (url: string) => {
  //   const editorInstance = editorRef.current;
  //   if (!editorInstance) return;
  //   if (type === "image") {
  //     // Safely insert image into editor
  //     editorInstance.image.insert(url, null, null, null);
  //   } else if (type === "file") {
  //     // Safely insert file
  //     // editorInstance.image.insert(url, null, null, null); // No .get() for file plugin
  //     if (url.match(/\.(mp4|mov|webm)$/i)) {
  //       // treat file as video if it’s a video URL
  //       editorInstance.html.insert(`<video controls src="${url}"></video>`);
  //     } else {
  //       editorInstance.file.insert(url, null, null, null);
  //     }
  //   } else if (type === "video") {
  //     if (editorInstance.video) {
  //       editorInstance.video.insert(url, null, null, null);
  //     } else {
  //       // fallback if plugin not loaded
  //       editorInstance.html.insert(`<video controls src="${url}"></video>`);
  //     }
  //   }

  //   setShowLibrary(false);
  // };

  const handleSelectFromLibrary = (url: string) => {
    const newURL = concatImgURL(url);

    // ✅ Access real Froala instance
    const editorInstance = editorRef.current;
    if (!editorInstance) return;

    // 🧠 Detect file type by extension
    const isImage = /\.(jpe?g|png|gif|webp|svg)$/i.test(newURL);
    const isVideo = /\.(mp4|mov|webm)$/i.test(newURL);
    const isPdf = /\.pdf$/i.test(newURL);

    if (isImage) {
      // 🖼️ Insert as image using Froala's image API
      editorInstance.image.insert(
        newURL,
        true,
        null,
        editorInstance.image.get(),
      );
    } else if (isVideo) {
      // 🎬 Insert as HTML <video> or via Froala video plugin if available
      if (editorInstance.video) {
        editorInstance.video.insert(
          newURL,
          true,
          null,
          editorInstance.video.get(),
        );
      } else {
        editorInstance.html.insert(
          `<video controls style="max-width:100%;" src="${newURL}"></video>`,
        );
      }
    } else if (isPdf) {
      // 📄 Embed PDF in iframe
      editorInstance.html.insert(`
      <div class="pdf-embed" style="margin: 10px 0;">
        <iframe 
          src="${newURL}" 
          type="application/pdf" 
          width="100%" 
          height="600px" 
          style="border: none;"
        ></iframe>
        <p style="font-size:14px;text-align:center;">
          <a href="${newURL}" target="_blank" rel="noopener noreferrer">Open PDF</a>
        </p>
      </div>
    `);
    } else {
      // 📁 Generic downloadable file
      const filename = url.split("/").pop();
      editorInstance.html.insert(
        `<a href="${newURL}" target="_blank" rel="noopener noreferrer">${filename}</a>`,
      );
    }

    setShowLibrary(false);
  };

  useEffect(() => {
    setIsClient(true);
    return () => {
      try {
        if (editorInstanceRef.current) {
          editorInstanceRef.current.destroy();
          editorInstanceRef.current = null;
        }
      } catch (err) {
        console.warn("Froala cleanup failed:", err);
      }
    };
  }, []);

  useEffect(() => {
    setIsClient(true);

    return () => {
      // Cleanup Froala manually to avoid null html error
      try {
        if (editorRef.current && editorRef.current.editor) {
          editorRef.current.editor.destroy();
          editorRef.current = null;
        }
      } catch (err) {
        console.warn("Froala cleanup failed:", err);
      }
    };
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      const editorInstance = editorRef.current?.editor;
      if (!editorInstance) return;
      const newTheme = isDark ? "dark" : "default";
      editorInstance.opts.theme = newTheme;
      editorInstance.$box.removeClass("fr-theme-dark fr-theme-default");
      editorInstance.$box.addClass(`fr-theme-${newTheme}`);
    }, 200);

    return () => clearTimeout(timer);
  }, [isDark]);
  if (!isClient) return null;

  return (
    <>
      {(label || showThemeToggle) && (
        <div className="flex justify-between items-center">
          {label && <h1 className="block text-base mb-2 font-medium text-black">{label}</h1>}
          {showThemeToggle && (
            <button
              onClick={() => handleBtnClick()}
              className={`mb-2 px-3 py-1 border rounded-xl text-md transition-all duration-150 ${
                isDark ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
          )}
        </div>
      )}
      <FroalaEditorComponent
        tag={tag}
        model={model}
        onModelChange={onModelChange}
        config={config}
        ref={editorRef}
      />
      {showLibrary && (
        <ContentLibrary
          open={showLibrary}
          onClose={() => setShowLibrary(false)}
          onSelect={handleSelectFromLibrary}
          onThumbnailSelect={handleSelectFromLibrary}
          uploadType="other"
          mediaFilter="document"
        />
      )}
    </>
  );
};

export default FroalaEditor;

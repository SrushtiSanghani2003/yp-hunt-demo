import FroalaEditor from "froala-editor";
import api from "../../lib/api";
import { showToast } from "../../utils/toastUtils";
import { concatImgURL } from "../../config/function";

declare global {
  interface Window {
    showContentLibrary?: (type: string, editorInstance: any) => void;
  }
}

FroalaEditor.RegisterCommand("insertFile", {
  title: "Insert File",
  focus: true,
  undo: true,
  refreshAfterCallback: true,
  callback: function () {
    // You can emit an event, trigger state, or directly open your modal
    if (window?.showContentLibrary) {
      window.showContentLibrary("file", this); // Pass file type and editor instance
    } else {
      showToast("Content library is not available.", "error");
    }
  },
});

function applyDefaultFont(editor: any) {
  const font = "Blender Pro Regular";

  // Apply to editor root (typing area)
  editor.el.style.fontFamily = font;

  // Apply to all direct children paragraphs/headings
  const blocks = editor.el.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6");

  blocks.forEach((block: HTMLElement) => {
    block.style.fontFamily = font;
  });
}

const froalaConfig: Record<string, any> = {
  imageDefaultDisplay: "inline",
  imageDefaultAlign: "left",
  imageDefaultMargin: 10,
  // key: "mPD4tD2A2H2C1F1C3C2lFa1f1PVWEd2Fa1XHTHh1THMMb1NCg1tA2B2C2E2C5F1C1F1I4A11==", // Add your Froala license key here if you have one
  key: "eHE5C-11A2H3C1F2B4A3C4C6c1oyaqYFa1UQRFQIVc2MSMd1IWPNb1IFd1yD2I2D1A1C7E2D2C5G1D1==",

  fontFamily: {
    Designer: "Designer",
    "Blender Pro Regular": "Blender Pro Regular",
    "Blender Pro Bold": "Blender Pro Bold",
    "Blender Pro ExtraBold": "Blender Pro ExtraBold",
    "Blender Pro Italic": "Blender Pro Italic",
    "Blender Pro BoldItalic": "Blender Pro BoldItalic",
    "Blender Pro Medium": "Blender Pro Medium",
    "Blender Pro MediumItalic": "Blender Pro MediumItalic",
    "Blender Pro Thin": "Blender Pro Thin",
  },

  fontFamilyDefault: "Blender Pro Regular",
  pastePlain: false,
  fontSize: [...Array(100).keys()].map((i) => (i + 1).toString()),
  lineHeights: {
    "1": "1",
    "1.15": "1.15",
    "1.5": "1.5",
    "2": "2",
    "2.5": "2.5",
    "3": "3",
  },
  lineHeightDefault: "1.5",
  // Basic setup
  placeholderText: "Start typing...",
  heightMin: 200,
  heightMax: 300,
  theme: "default",
  language: "en",
  charCounterCount: true,

  // All toolbar buttons grouped by section
  toolbarButtons: {
    moreText: {
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "subscript",
        "superscript",
        "fontFamily",
        "fontSize",
        "textColor",
        "backgroundColor",
        "inlineClass",
        "inlineStyle",
        "clearFormatting",
        "alert",
      ],
      buttonsVisible: 7,
    },
    moreParagraph: {
      buttons: [
        "alignLeft",
        "alignCenter",
        "alignRight",
        "alignJustify",
        "formatOL",
        "formatUL",
        "paragraphFormat",
        "paragraphStyle",
        "lineHeight",
        "outdent",
        "indent",
        "quote",
      ],
      buttonsVisible: 6,
    },
    moreRich: {
      buttons: [
        "insertLink",
        "insertImage",
        "insertVideo",
        "insertTable",
        "emoticons",
        "fontAwesome",
        "specialCharacters",
        "insertHR",
        "selectAll",
        "insertFile",
      ],
      buttonsVisible: 6,
    },
    moreMisc: {
      buttons: [
        "undo",
        "redo",
        "fullscreen",
        "print",
        // "getPDF",
        "spellChecker",
        "help",
        "html",
      ],
      align: "right",
      buttonsVisible: 6,
    },
  },
  events: {
    "image.beforeUpload": function (files: File[]) {
      const editor = this;
      if (files.length) {
        const formData = new FormData();
        formData.append("file", files[0]);

        editor.popups.show("image.insert");
        editor.image.showProgressBar();

        api
          .post(`/articles/upload/other`, formData)
          .then((response) => {
            const img = response.data[0]?.url;
            const newIMG = concatImgURL(img);
            editor.image.insert(newIMG, null, null, editor.image.get());
            editor.image.hideProgressBar();
            editor.popups.hide("image.insert");
          })
          .catch((error) => {
            console.error("Image upload failed:", error);
            editor.image.hideProgressBar();
            editor.popups.hide("image.insert");
          });
        return false;
      }
      return false;
    },

    "video.beforeUpload": function (files: File[]) {
      const editor = this;
      if (files.length) {
        const formData = new FormData();
        formData.append("file", files[0]);

        editor.popups.show("video.insert");
        editor.video.showProgressBar();

        api
          .post(`/articles/upload/other`, formData)
          .then((response) => {
            const videoUrl = response.data[0]?.url;
            const newVideoURL = concatImgURL(videoUrl);
            if (videoUrl) {
              editor.html.insert(`
            <video 
              controls 
              style="max-width: 100%; border-radius: 6px; margin: 10px 0;"
              src="${newVideoURL}">
            </video>
          `);
            }
            editor.video.hideProgressBar();
            editor.popups.hide("video.insert");
          })
          .catch((error) => {
            console.error("Video upload failed:", error);
            editor.video.hideProgressBar();
            editor.popups.hide("video.insert");
          });

        return false;
      }
      return false;
    },
    // ✅ Drag & drop support
    // 'image.beforePasteUpload': function (image: File) {
    //   const editor = this;
    //   const formData = new FormData();
    //   formData.append('file', image);

    //   editor.image.showProgressBar();

    //   api
    //     .post(`/articles/upload/other`, formData)
    //     .then((res) => {
    //       const img = res.data[0]?.url;
    //       editor.image.insert(img, null, null, editor.image.get());
    //     })
    //     .catch((err) => {
    //       console.error('Drag-paste image upload failed:', err);
    //     })
    //     .finally(() => {
    //       editor.image.hideProgressBar();
    //     });

    //   return false;
    // },

    initialized: function () {
      const editor = this;
      // editor.el.style.backgroundColor = "white";
      // editor.el.style.color = "white";
      applyDefaultFont(this);

      editor.events.on("commands.after", function (cmd: string) {
        if (cmd === "formatUL") {
          // Find all <ul> elements inside the editor
          const ulElements = editor.el.querySelectorAll("ul");
          ulElements.forEach((ul: HTMLElement) => {
            const currentStyle = ul.style.listStyleType;
            // Apply 'disc' only if style not set or is none
            if (!currentStyle || currentStyle === "none") {
              ul.style.listStyleType = "disc";
            }
          });
        }
      });
    },
    onpaste: function () {
      applyDefaultFont(this);
    },

    contentChanged: function () {
      applyDefaultFont(this);
    },

    // contentChanged: function () {
    //   const editor = this;
    //   const allElements = editor.el.querySelectorAll("*");
    //   allElements.forEach((el: HTMLElement) => {
    //     el.style.backgroundColor = "black";
    //     el.style.color = "white";
    //   });
    // },
  },

  // All Froala plugins
  pluginsEnabled: [
    "align",
    "charCounter",
    "codeBeautifier",
    "codeView",
    "colors",
    "draggable",
    "emoticons",
    "entities",
    "file",
    "fontFamily",
    "fontSize",
    "fullscreen",
    "image",
    "imageManager",
    "inlineClass",
    "inlineStyle",
    "lineBreaker",
    "lineHeight",
    "link",
    "lists",
    "paragraphFormat",
    "paragraphStyle",
    "quickInsert",
    "quote",
    "save",
    "table",
    "url",
    "video",
    "wordPaste",
    "help",
    "print",
    "specialCharacters",
    "spellChecker",
    // "getPDF",
    "selectAll",
  ],

  // Image upload (optional server integration needed)
  imageUpload: true,
  imageUploadURL: "", // You can set your server endpoint here

  // File upload (optional server integration needed)
  fileUpload: true,
  fileUploadURL: "/api/upload-file", // You can set your server endpoint here

  // Video upload (optional server integration needed)
  videoUpload: true,
  videoUploadURL: "/api/upload-video", // You can set your server endpoint here

  // Autosave (optional setup)
  saveInterval: 10000, // Save every 10 seconds
  saveURL: null, // You can add a save endpoint if needed
  saveMethod: "POST",

  // Other useful options
  quickInsertTags: ["image", "table", "ul", "ol", "hr"],
  useClasses: false,
  htmlRemoveTags: [],
  htmlAllowedEmptyTags: [
    "textarea",
    "a",
    "iframe",
    "object",
    "video",
    "style",
    "script",
  ],
  htmlAllowedAttrs: [".*"],
  htmlAllowedTags: [".*"],
};

export default froalaConfig;

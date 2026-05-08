import { useCallback, useEffect, useRef, useState } from "react";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
// import Button from "../ui/button";
// import {
//   closeIcon,
//   mediaIcon,
//   moreVerticalIcon,
//   plusIcon,
//   // YPlogo,
// } from "../../icons";
// import { moreDefaultObjects, type MoreObjectTypes } from "./blocksObjectConfig";
// import Input from "../ui/input/Input";
// import ContentLibrary from "../contentPanel/ContentLibrary";
import { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { ClassAttributor, Scope } from "parchment";
// import JoditCustomEditor from "./JoditEditor";
import FroalaEditor from "./FroalaEditor";
import MoreFieldsEditor from "./MoreFieldsEditor";
import MoreFieldsRenderer from "./MoreFieldsRenderer";
import { DesignModeWrapper, textBlockPresetContent } from "../../visual-builder";

const Picker = Quill.import("ui/picker") as any;
const originalShow = Picker.prototype.show;

Picker.prototype.show = function () {
  originalShow.call(this);
  const options = this.options;
  if (options.contains(document.activeElement)) {
    options.removeAttribute("aria-hidden");
  }
};

// const CustomToolbar = () => (
//   <div id="toolbar">
//     {/* Header Levels */}
//     {/* <select className="ql-header" defaultValue="" onChange={(e) => e.persist()}>
//       <option value="">Normal</option>
//       <option value="1">H1</option>
//       <option value="2">H2</option>
//       <option value="3">H3</option>
//       <option value="4">H4</option>
//       <option value="5">H5</option>
//       <option value="6">H6</option>
//     </select> */}
//     {/* <span className="ql-formats"> */}
//     <button className="ql-header" value="1"></button>
//     <button className="ql-header" value="2"></button>
//     <button className="ql-header" value="3"></button>
//     <button className="ql-header" value="4"></button>
//     <button className="ql-header" value="5"></button>
//     <button className="ql-header" value="6"></button>
//     {/* </span> */}

//     <select className="ql-size" defaultValue="16px">
//       <option value="8px">8</option>
//       <option value="10px">10</option>
//       <option value="12px">12</option>
//       <option value="14px">14</option>
//       <option value="16px">16</option>
//       <option value="18px">18</option>
//       <option value="24px">24</option>
//       <option value="36px">36</option>
//     </select>

//     <select className="ql-font" defaultValue="">
//       <option value="">Sans Serif</option>
//       <option value="inter">Inter</option>
//       <option value="montserrat">Montserrat</option>
//       <option value="roboto">Roboto</option>
//     </select>

//     <button className="ql-bold" />
//     <button className="ql-italic" />
//     <button className="ql-underline" />
//     <button className="ql-strike" />

//     {/* Colors */}
//     <select className="ql-color" />
//     <select className="ql-background" />

//     {/* Sub/Super */}
//     <button className="ql-script" value="sub" />
//     <button className="ql-script" value="super" />

//     {/* Lists */}
//     <button className="ql-list" value="ordered" />
//     <button className="ql-list" value="bullet" />
//     <button className="ql-indent" value="-1" />
//     <button className="ql-indent" value="+1" />

//     {/* Direction */}
//     <button className="ql-direction" value="rtl" />
//     <select className="ql-align" />

//     <button className="ql-link" />
//     <button className="ql-image" />
//     <button className="ql-video" />

//     <button className="ql-content-library" type="button">
//       <img src={YPlogo} alt="Library" />
//     </button>

//     <button className="ql-clean" />
//   </div>
// );

const Text = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const [model, setModel] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  // const [showDropdown, setShowDropdown] = useState(false);
  const [moreFields, setMoreFields] = useState<string[]>([]);
  // const [show, setShow] = useState(false);
  // const [insertToEditorMode, setInsertToEditorMode] = useState(false);

  // const quillRef = useRef<ReactQuill | null>(null);
  // const dropDownItemRef = useRef<HTMLDivElement>(null);

  const handleTextChange = useCallback(
    (newText: string) => {
      if (newText !== model) {
        setModel(newText);
        onChangeBlock?.({
          ...currentBlock,
          content: {
            ...currentBlock.content,
            text: newText,
          },
        });
      }
    },
    [setModel, onChangeBlock, currentBlock]
  );

  // const handleOnChange = (label: string, value: string) => {
  //   const updatedContent = { ...currentBlock.content };

  //   if (updatedContent.more?.sponsor && label in updatedContent.more.sponsor) {
  //     updatedContent.more = {
  //       ...updatedContent.more,
  //       sponsor: {
  //         ...updatedContent.more.sponsor,
  //         [label]: value,
  //       },
  //     };
  //   }

  //   onChangeBlock?.({
  //     ...currentBlock,
  //     content: updatedContent,
  //   });
  // };

  useEffect(() => {
    if (currentBlock) {
      setModel(currentBlock.content.text);

      if (currentBlock.content?.more) {
        setMoreFields(Object.keys(currentBlock.content.more));
      } else {
        setMoreFields([]);
      }
    }
  }, [currentBlock]);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       setShowDropdown(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const Font = Quill.import("formats/font") as any;
  Font.whitelist = ["inter", "monospace", "roboto", "montserrat"];
  Quill.register(Font, true);

  const FontClass = new ClassAttributor("font", "ql-font", {
    scope: Scope.INLINE,
  });
  Quill.register(FontClass, true);

  const Size = Quill.import("formats/size") as any;
  Size.whitelist = [
    "8px",
    "10px",
    "12px",
    "14px",
    "16px",
    "18px",
    "24px",
    "36px",
  ];
  Quill.register(Size, true);

  const SizeClass = new ClassAttributor("size", "ql-size", {
    scope: Scope.INLINE,
  });
  Quill.register(SizeClass, true);

  const tooltip = document.querySelector(".ql-tooltip") as HTMLElement;
  if (tooltip) {
    const observer = new MutationObserver(() => {
      tooltip.style.left = "60px";
      tooltip.style.top = "30px";
    });
    observer.observe(tooltip, { attributes: true, attributeFilter: ["style"] });
  }

  // const modules = {
  //   toolbar: {
  //     container: "#toolbar",
  //     handlers: {
  //       "content-library": function () {
  //         setInsertToEditorMode(true);
  //         setShow(true);
  //       },
  //     },
  //   },
  // };

  // const insertImageIntoEditor = (url: string) => {
  //   const editor = quillRef.current?.getEditor?.();

  //   if (editor) {
  //     const range = editor.getSelection(true);
  //     if (range) {
  //       editor.insertEmbed(range.index, "image", url, "user");
  //       editor.setSelection(range.index + 1);
  //     }
  //   }
  // };

  const formContent = (
    <>
      <div className="md:pb-6 pb-3 border-b-0.5 border-b-primary tset">
        {/* <JoditCustomEditor value={model} onValueChange={handleTextChange} /> */}
        <FroalaEditor model={model} onModelChange={handleTextChange} />
        {/* <CustomToolbar />
        <ReactQuill
          theme="snow"
          ref={quillRef}
          value={model}
          onChange={handleTextChange}
          modules={modules}
          // modules={{
          //   toolbar: {
          //     container: [
          //       [{ header: [1, 2, 3, 4, 5, 6, false] }],
          //       [{ font: Font.whitelist }],
          //       ["bold", "italic", "underline", "strike"],
          //       [{ color: [] }, { background: [] }],
          //       [{ script: "sub" }, { script: "super" }],
          //       [{ list: "ordered" }, { list: "bullet" }],
          //       [{ indent: "-1" }, { indent: "+1" }],
          //       [{ direction: "rtl" }],
          //       [{ align: [] }],
          //       ["link", "image", "video"],
          //       ["content-library"],
          //       ["clean"],
          //     ],
          //     handlers: {
          //       "content-library": () => {
          //         setShow(true);
          //       },
          //     },
          //   },
          // }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "color",
            "background",
            "script",
            "list",
            "indent",
            "direction",
            "align",
            "link",
            "image",
            "video",
          ]}
        /> */}

        <MoreFieldsRenderer
          currentBlock={currentBlock}
          onChangeBlock={onChangeBlock}
          moreFields={moreFields}
          setMoreFields={setMoreFields}
        />
      </div>

      <div className="flex md:gap-5 gap-2 items-center mt-3">
        <ChangeBlockType
          currentBlock={currentBlock}
          onChangeType={onChangeType}
          types={types}
        />
        <div className="relative" ref={dropdownRef}>
          <MoreFieldsEditor
            currentBlock={currentBlock}
            moreFields={moreFields}
            setMoreFields={setMoreFields}
            onChangeBlock={onChangeBlock}
          />
        </div>
      </div>
    </>
  );

  return (
    <DesignModeWrapper
      content={currentBlock.content}
      onContentChange={(updatedContent) => {
        onChangeBlock?.({
          ...currentBlock,
          content: updatedContent,
        });
      }}
      formContent={formContent}
      defaultCanvasContent={textBlockPresetContent}
      canvasHeight="100%"
    />
  );
};

export default Text;

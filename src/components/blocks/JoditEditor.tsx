import { useMemo, useRef } from "react";
import JoditEditor from "jodit-react";

type JoditCustomEditorProps = {
  value: string;
  onValueChange: (newVal: string) => void;
};

const JoditCustomEditor = ({
  value,
  onValueChange,
}: JoditCustomEditorProps) => {
  const editorRef = useRef<any>(null);

  const config = useMemo(
    () => ({
      pastePlain: true,
      height: 400,
      uploader: {
        insertImageAsBase64URI: true,
      },
      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "outdent",
        "indent",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "video",
        "table",
        "link",
        "|",
        "align",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "fullsize",
      ],
    }),
    []
  );

  return (
    <div className="w-full">
      <JoditEditor
        ref={editorRef}
        value={value}
        config={config}
        tabIndex={1}
        // onBlur={(newContent) => onValueChange(newContent)}
        onChange={(newContent) => onValueChange(newContent)}
      />
      {/* {show && (
        <ContentLibrary
          open={show}
          onClose={() => setShow(false)}
          onSelect={(imgUrl: string) => {
            editorRef.current?.editor?.selection?.insertHTML(
              `<img src="${imgUrl}" alt="Library Image" style="max-width: 100%;" />`
            );
            setShow(false);
          }}
        />
      )} */}
    </div>
  );
};

export default JoditCustomEditor;

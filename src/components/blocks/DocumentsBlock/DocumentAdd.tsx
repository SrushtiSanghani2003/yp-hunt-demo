import { useEffect, useState } from "react";
import { closeIcon, plusIcon } from "../../../icons";
import Button from "../../ui/button";
import Input from "../../ui/input/Input";
import SidebarDialog from "../../ui/sidebarDialog/SidebarDialog";
import ContentLibrary from "../../contentPanel/ContentLibrary";
// import { concatImgURL } from "../../../config/function";

type DocumentAddProps = {
  open: boolean;
  onClose: () => void;
  initialData?: any;
  onSubmitMedia?: (data: any) => void;
};

const DocumentAdd = ({
  open,
  onClose,
  initialData,
  onSubmitMedia,
}: DocumentAddProps) => {
  const [formData, setFormData] = useState({
    docUrl: initialData?.document_url ?? "",
    docImg: initialData?.doc_img ?? "",
    docTitle: initialData?.doc_name ?? "",
  });

  // 🔹 Error states for validation
  const [errors, setErrors] = useState({
    docUrl: "",
    docTitle: "",
  });

  const [activeMediaUrl, setActiveMediaUrl] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 🔹 Clear error when user updates that field
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = () => {
    let newErrors = { docUrl: "", docTitle: "" };
    let isValid = true;

    // 🔹 Validate Document URL
    if (!formData.docUrl.trim()) {
      newErrors.docUrl = "Please select a document.";
      isValid = false;
    }

    // 🔹 Validate Document Title
    if (!formData.docTitle.trim()) {
      newErrors.docTitle = "Please fill title.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return; // Stop submission if invalid

    onSubmitMedia?.(formData);
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        docUrl: initialData.document_url,
        docImg: initialData.doc_img,
        docTitle: initialData.doc_name,
      });
    } else {
      setFormData({
        docUrl: "",
        docImg: "",
        docTitle: "",
      });
    }
  }, [initialData]);

  return (
    <>
      <SidebarDialog
        open={open}
        onClose={onClose}
        title="Document Add"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3">
          <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
            <div className="flex-1">
              <Input
                label="Document URL"
                placeholder="https://www.example.com"
                className="m-0 font-medium"
                value={formData.docUrl ?? ""}
                onChange={(e) => handleChange("docUrl", e.target.value)}
              />
              <div>
                {formData.docUrl ? (
                  <Button
                    text="Remove Document"
                    icon={closeIcon}
                    backgroundColor="transparent"
                    className="py-0"
                    imageclassName="md:w-5 w-3 md:h-5 h-3 font-medium"
                    onClick={() => handleChange("docUrl", "")}
                  />
                ) : (
                  <Button
                    icon={plusIcon}
                    text="Add Document"
                    backgroundColor="transparent"
                    className="py-0"
                    imageclassName="md:w-5 w-3 md:h-5 h-3 font-medium"
                    onClick={() => setActiveMediaUrl("docUrl")}
                  />
                )}
              </div>
              {errors.docUrl && (
                <p className="text-red-500 text-sm mt-[-10px] mb-2">
                  {errors.docUrl}
                </p>
              )}
            </div>
          </div>

          {/* ---- Document Title Section ---- */}
          <div>
            <Input
              label="Document Title"
              value={formData.docTitle}
              onChange={(e) => handleChange("docTitle", e.target.value)}
            />
            {errors.docTitle && (
              <p className="text-red-500 text-sm mt-1">{errors.docTitle}</p>
            )}
          </div>
          {/* <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
            <div className="md:w-sp170 w-20 h-full">
              {formData.docImg ? (
                <img
                  src={concatImgURL(formData.docImg)}
                  alt="docImg"
                  className="w-full h-full rounded-2xl object-cover p-1 border-0.5 border-primary"
                />
              ) : (
                <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                  <img src={mediaIcon} alt="Placeholder" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <Input
                label="Document Image"
                placeholder="https://www.example.com"
                className="m-0 font-medium"
                value={concatImgURL(formData.docImg)}
                onChange={(e) => handleChange("docImg", e.target.value)}
              />
              <div>
                {formData.docImg ? (
                  <Button
                    text="Remove Image"
                    icon={closeIcon}
                    backgroundColor="transparent"
                    className="py-0"
                    imageclassName="md:w-5 w-3 md:h-5 h-3 font-medium"
                    onClick={() => handleChange("docImg", "")}
                  />
                ) : (
                  <Button
                    icon={plusIcon}
                    text="Add Image"
                    backgroundColor="transparent"
                    className="py-0"
                    imageclassName="md:w-5 w-3 md:h-5 h-3 font-medium"
                    onClick={() => setActiveMediaUrl("docImg")}
                  />
                )}
              </div>
            </div>
          </div> */}
        </div>
      </SidebarDialog>
      {!!activeMediaUrl && (
        <ContentLibrary
          open={!!activeMediaUrl}
          onClose={() => setActiveMediaUrl(null)}
          mediaFilter={activeMediaUrl == "docUrl" ? "document" : "image"}
          uploadType="block"
          onSelect={(url: string) => {
            handleChange(activeMediaUrl, url);
            setActiveMediaUrl(null);
          }}
        />
      )}
    </>
  );
};

export default DocumentAdd;

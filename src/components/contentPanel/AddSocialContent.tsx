import { useEffect, useState } from "react";
import SidebarDialog from "../ui/sidebarDialog/SidebarDialog";
import { chevronDown, closeIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import { showToast } from "../../utils/toastUtils";

export type PlatformType = {
  platformType: string;
  url: string;
};

const AddSocialContent = ({
  open,
  onClose,
  initialContent,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  initialContent: PlatformType[];
  onSubmit: (updatedPlatforms: PlatformType[]) => void;
}) => {
  const [platforms, setPlatforms] = useState([{ platformType: "", url: "" }]);
  const AVAILABLE_PLATFORMS = ["youtube", "instagram", "facebook", "x"];

  const allPlatformsSelected =
    platforms.length >= AVAILABLE_PLATFORMS.length &&
    AVAILABLE_PLATFORMS.every((p) =>
      platforms.some((platform) => platform.platformType === p)
    );

  const handlePlatformChange = (
    index: number,
    field: "platformType" | "url",
    value: string
  ) => {
    const updated = [...platforms];
    updated[index][field] = value;
    setPlatforms(updated);
  };

  const allPlatformsValue = platforms.every(
    (platform) => platform.platformType === "" || platform.url === ""
  );

  const handleAddPlatform = () => {
    setPlatforms([...platforms, { platformType: "", url: "" }]);
  };

  const handleRemoveSocial = (index: number) => {
    const updatedSocial = platforms.filter((_, i) => i !== index);
    setPlatforms(updatedSocial);
  };

  // const handleSubmit = () => {
  //   if (platforms) {
  //     onSubmit(platforms);
  //     onClose();
  //   }
  // };

  const handleSubmit = () => {
    const isValid =
      platforms.every((p) => p.platformType && p.url) &&
      new Set(platforms.map((p) => p.platformType)).size === platforms.length;

    if (!isValid) {
      showToast("Each platform must be unique and filled!", "error");
      return;
    }

    onSubmit(platforms);
    onClose();
  };

  // Clone initialContent to avoid mutating the original data (ensure immutability)
  useEffect(() => {
    if (open) {
      const cloned = initialContent?.length
        ? JSON.parse(JSON.stringify(initialContent))
        : [{ platformType: "", url: "" }];

      setPlatforms(cloned);
    }
  }, [initialContent, open]);

  return (
    <>
      <SidebarDialog
        open={open}
        onClose={onClose}
        disableSubmit={allPlatformsValue}
        title="Add Social Platform"
        onSubmit={handleSubmit}
        submitText="Confirm"
        cancelText="Cancel"
      >
        <div>
          {platforms.map((platform, index) => (
            <div key={index} className="mb-6 relative">
              <div
                className={`${
                  platform.platformType === "" ? "mb-0" : "md:mb-5 mb-2"
                }`}
              >
                <label
                  htmlFor={`platform-${index}`}
                  className="block md:mb-2 md:text-base text-sm font-medium"
                >
                  Platform*
                </label>
                <div className="relative">
                  <select
                    id={`platform-${index}`}
                    value={platform.platformType}
                    onChange={(e) =>
                      handlePlatformChange(
                        index,
                        "platformType",
                        e.target.value
                      )
                    }
                    className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary md:rounded-2xl rounded-lg"
                  >
                    <option value="" disabled>
                      Select Social Platform From The List
                    </option>
                    {AVAILABLE_PLATFORMS.filter(
                      (option) =>
                        !platforms.some(
                          (p, i) => p.platformType === option && i !== index
                        ) || platform.platformType === option
                    ).map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                    {/* <option value="youtube">Youtube</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="x">X</option> */}
                  </select>
                  <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                    <img src={chevronDown} />
                  </div>
                </div>
              </div>

              <div className="md:mt-4 mt-1">
                <label
                  htmlFor={`url-${index}`}
                  className="md:mb-2 md:text-base text-sm font-medium block"
                >
                  Add Handle URL
                </label>
                <input
                  type="text"
                  placeholder="https://www.example.com"
                  id={`url-${index}`}
                  value={platform.url}
                  onChange={(e) =>
                    handlePlatformChange(index, "url", e.target.value)
                  }
                  className="w-full md:p-3 p-2 md:text-base text-sm border-0.5 border-primary md:rounded-2xl rounded-lg"
                />
              </div>
              <Button
                icon={closeIcon}
                backgroundColor="transparent"
                className="p-0 absolute top-0 right-0"
                onClick={() => handleRemoveSocial(index)}
              />
            </div>
          ))}

          <Button
            text="Add Another Social Platform"
            icon={plusIcon}
            className={`relative addSideBarBtn ${
              allPlatformsSelected ? "opacity-50 pointer-events-none" : ""
            }`}
            disabled={allPlatformsSelected}
            backgroundColor="transparent"
            onClick={handleAddPlatform}
          />
        </div>
      </SidebarDialog>
    </>
  );
};

export default AddSocialContent;

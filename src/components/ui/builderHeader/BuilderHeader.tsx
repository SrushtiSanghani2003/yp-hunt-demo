import { pinIcon } from "../../../icons";
import Button from "../button";
import SearchInput from "../searchInput";
import ToggleSwitch from "../switch/ToggleSwitch";

interface BuilderHeaderProps {
  title?: string;
  isToggleVisible?: boolean;
  isToggleEnabled?: boolean;
  onToggleChange?: (val: boolean) => void;
  onPinClick?: () => void;
  onSaveTemplate?: () => void;
  onSubmit: () => void;
  showSearchInput?: boolean;
  searchInput?: string;
  setSearchInput?: (value: string) => void;
  onSubmitLoading?: boolean;
  isEditMode?: boolean;
  isSubmitDisabled?: boolean;
  onSaveTemplateTitle?: string;
  saveButtonText?: string;
}

const BuilderHeader = ({
  title,
  isToggleVisible = false,
  isToggleEnabled,
  onSaveTemplateTitle,
  onToggleChange,
  onPinClick,
  onSaveTemplate,
  onSubmit,
  showSearchInput,
  searchInput,
  setSearchInput,
  onSubmitLoading,
  saveButtonText,
  isEditMode = false,
  isSubmitDisabled = false,
}: BuilderHeaderProps) => {
  return (
    <div className="lg:flex  justify-between items-center">
      {/* <Button
        onClick={() => window.history.back()}
        icon={backIcon}
        backgroundColor="transparent" 
      />*/}
      <h2 className="lg:text-2xl/6 text-xl font-extrabold pb-2 md:pb-0">
        {title}
      </h2>
      {/* <Button
        // text="Back"
        backgroundColor="transparent"
        imageclassName="w-8 h-8"
        className="lg:py-2.5 py-sp10 lg:px-4 px-3 lg:text-base/4 text-sm font-semibold"
        onClick={() => window.history.back()}
        icon={backIcon}
      /> */}
      <div className="flex  md:items-center justify-end flex-col md:flex-row items-end lg:gap-4 gap-2">
        <div className="flex justify-center items-center gap-4">
          {isToggleVisible &&
            onToggleChange &&
            typeof isToggleEnabled === "boolean" && (
              <ToggleSwitch
                checked={isToggleEnabled}
                onChange={onToggleChange}
                label="Live Preview"
                className="lg:flex"
              />
            )}
          {onPinClick && (
            <img
              src={pinIcon}
              alt="Pin Icon"
              className="cursor-pointer"
              onClick={onPinClick}
            />
          )}
        </div>
        {showSearchInput && (
          <div className=" flex justify-end md:mt-0 relative">
            <SearchInput
              placeholder="Search by ..."
              className="sm:ps-4 px-2 pe-8 sm:py-3 py-2 text-xs md:w-[320px] w-max rounded-xl"
              value={searchInput}
              onChange={setSearchInput}
              onClear={() => {
                if (setSearchInput) {
                  setSearchInput("");
                }
              }}
            />
          </div>
        )}
        <div className="flex justify-center items-center gap-4">
          {onSaveTemplate && (
            <Button
              text={
                onSaveTemplateTitle ? onSaveTemplateTitle : "Save As Template"
              }
              backgroundColor="transparent"
              className="border-0.5 border-primary lg:py-3 py-sp10 lg:px-5 px-3 lg:text-base/4 text-sm font-semibold"
              onClick={onSaveTemplate}
            />
          )}
          <Button
            text={
              saveButtonText ? saveButtonText : isEditMode ? "Update" : "Save"
            }
            isLoading={onSubmitLoading}
            className={`lg:py-3 py-sp10 ${
              saveButtonText ? "px-10" : "lg:px-5 px-3"
            } lg:text-base/4 text-sm font-semibold ${
              isSubmitDisabled ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
            onClick={onSubmit}
            disabled={isSubmitDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default BuilderHeader;

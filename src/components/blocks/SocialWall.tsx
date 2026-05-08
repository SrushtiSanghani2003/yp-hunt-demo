import { useEffect, useRef, useState } from "react";
import { plusIcon } from "../../icons";
import Button from "../ui/button";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
import ContentLibrary from "../contentPanel/ContentLibrary";
import { getPlatformIcon } from "../../config/function";
import AddSocialContent, {
  type PlatformType,
} from "../contentPanel/AddSocialContent";
import MoreFieldsEditor from "./MoreFieldsEditor";
import MoreFieldsRenderer from "./MoreFieldsRenderer";

const SocialWall = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const platforms: PlatformType[] = currentBlock.content?.platforms || [];
  const [socialPlatforms, setSocialPlatforms] = useState<PlatformType[]>([]);
  const [moreFields, setMoreFields] = useState<string[]>([]);
  const [openLibrary, setOpenLibrary] = useState<boolean>(false);

  const handleUpdateSocialContents = (updatedContents: typeof platforms) => {
    // onChangeBlock?.({
    //   ...currentBlock,
    //   content: {
    //     ...currentBlock.content,
    //     platforms: [
    //       ...(currentBlock.content.platforms || []),
    //       ...updatedContents,
    //     ],
    //   },
    // });
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        platforms: updatedContents,
      },
    });
    setOpen(false);
  };

  const handleOnChange = (label: string, value: string) => {
    const updatedContent = { ...currentBlock.content };

    if (updatedContent.more?.sponsor && label in updatedContent.more.sponsor) {
      updatedContent.more = {
        ...updatedContent.more,
        sponsor: {
          ...updatedContent.more.sponsor,
          [label]: value,
        },
      };
    }

    onChangeBlock?.({
      ...currentBlock,
      content: updatedContent,
    });
  };

  useEffect(() => {
    if (currentBlock?.content?.platforms) {
      setSocialPlatforms(currentBlock.content.platforms);
    }
    if (currentBlock.content?.more) {
      const fields = Object.keys(currentBlock.content?.more);
      setMoreFields(fields);
    }
  }, [currentBlock]);

  return (
    <>
      <div className="pb-5 border-b-0.5 border-b-primary">
        <div className="flex items-center md:gap-5 gap-2 mb-5">
          {socialPlatforms.length > 0 &&
            socialPlatforms.map((platform, i) => (
              <div key={i}>
                <img src={getPlatformIcon(platform.platformType)} />
              </div>
            ))}
        </div>

        <div>
          <Button
            text="Add New Platform"
            icon={plusIcon}
            className="relative addBtn"
            backgroundColor="transparent"
            onClick={() => setOpen(true)}
          />
        </div>

        <MoreFieldsRenderer
          currentBlock={currentBlock}
          onChangeBlock={onChangeBlock}
          moreFields={moreFields}
          setMoreFields={setMoreFields}
        />
        {/* {moreFields.length > 0 &&
          moreFields.map((field) => (
            <div key={field} className="relative mt-5">
              {field === "sponsor" && (
                <>
                  <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
                    <div className="md:w-sp170 w-20 h-full">
                      {currentBlock.content?.more?.sponsor?.sponsor_img ? (
                        <img
                          src={currentBlock.content?.more?.sponsor?.sponsor_img}
                          alt="Uploaded"
                          className="w-full h-full rounded-2xl border-0.5 border-primary block align-middle"
                        />
                      ) : (
                        <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                          <img src={mediaIcon} alt="Placeholder" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <Input
                        label="Sponsor Image URL*"
                        placeholder="https://www.example.com"
                        className="m-0"
                        value={currentBlock.content?.more?.sponsor?.sponsor_img}
                        onChange={(e) =>
                          handleOnChange("sponsor_img", e.target.value)
                        }
                      />
                      <div>
                        {currentBlock.content?.more?.sponsor?.sponsor_img ? (
                          <Button
                            text="Remove Image"
                            icon={closeIcon}
                            backgroundColor="transparent"
                            className="pb-0"
                            onClick={() => handleOnChange("sponsor_img", "")}
                          />
                        ) : (
                          <Button
                            icon={plusIcon}
                            text="Add Image"
                            backgroundColor="transparent"
                            className="pb-0"
                            onClick={() => setOpenLibrary(true)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex md:gap-5 gap-2 items-end">
                    <Input
                      label="Sponsor Text"
                      className="m-0 w-1/2"
                      value={currentBlock.content?.more?.sponsor?.sponsor_name}
                      onChange={(e) =>
                        handleOnChange("sponsor_name", e.target.value)
                      }
                    />
                    <Input
                      label="Sponsor Link URL"
                      className="m-0 w-1/2"
                      note="Note: Please include http:// or https:// in your link
                        URL"
                      placeholder="https://www.example.com"
                      value={currentBlock.content?.more?.sponsor?.sponsor_url}
                      onChange={(e) =>
                        handleOnChange("sponsor_url", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    icon={closeIcon}
                    backgroundColor="transparent"
                    className="absolute right-0 top-0 p-0 w-4"
                    onClick={() => handleRemoveField(field)}
                  />
                </>
              )}
            </div>
          ))} */}
      </div>

      <div className="mt-4 flex items-center md:gap-5 gap-1">
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

      {open && (
        <AddSocialContent
          open={open}
          onClose={() => setOpen(false)}
          initialContent={socialPlatforms}
          onSubmit={(updated) => {
            setSocialPlatforms(updated);
            handleUpdateSocialContents(updated);
          }}
        />
      )}
      {openLibrary && (
        <ContentLibrary
          open={openLibrary}
          onClose={() => setOpenLibrary(false)}
          uploadType="sponsor"
          onSelect={(url: string) => handleOnChange("sponsor_img", url)}
          mediaFilter="image"
        />
      )}
    </>
  );
};

export default SocialWall;

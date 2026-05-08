import {
  arrowDownIcon,
  arrowUpIcon,
  closeIcon,
  mediaIcon,
  plusIcon,
} from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
import { v4 as uuidv4 } from "uuid";
import MoreFieldsEditor from "./MoreFieldsEditor";
import { useEffect, useRef, useState } from "react";
import MoreFieldsRenderer from "./MoreFieldsRenderer";
import ContentLibrary from "../contentPanel/ContentLibrary";
import { concatImgURL } from "../../config/function";

const TeamBlock = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [moreFields, setMoreFields] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [activeMemberIndex, setActiveMemberIndex] = useState<number | null>(
    null
  );

  const handleTeamMemberChange = (index: number, key: string, value: any) => {
    const updatedTeamMembers = [...currentBlock.content.teamMembers];
    updatedTeamMembers[index] = {
      ...updatedTeamMembers[index],
      [key]: value,
    };

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        teamMembers: updatedTeamMembers,
      },
    });
  };

  const handleAddMember = () => {
    const allMembers = currentBlock.content.teamMembers;
    const nextOrder =
      Math.max(...allMembers.map((q: any) => q.order || 0), 0) + 1;

    const updatedMembers = [
      ...allMembers,
      {
        id: uuidv4(),
        name: "",
        designation: "",
        short_bio: "",
        image_url: "",
        order: nextOrder,
      },
    ];

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        teamMembers: updatedMembers,
      },
    });
  };

  const reorderTeamMembers = (fromIndex: number, toIndex: number) => {
    if (!currentBlock?.content?.teamMembers) return;

    const teamMembersCopy = currentBlock.content.teamMembers.map(
      (teamMember: any) => ({ ...teamMember })
    );

    // Ensure the indices are valid
    if (toIndex < 0 || toIndex >= teamMembersCopy.length) return;

    // Move the item
    const [movedTeamMember] = teamMembersCopy.splice(fromIndex, 1);
    teamMembersCopy.splice(toIndex, 0, movedTeamMember);

    // Reassign order values (if needed)
    const reorderedTeamMembers = teamMembersCopy.map(
      (teamMember: any, index: number) => ({
        ...teamMember,
        order: index + 1,
      })
    );

    // Send update
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        teamMembers: reorderedTeamMembers,
      },
    });
  };

  const handleRemoveMember = (index: number) => {
    const updatedMembers = [...currentBlock.content.teamMembers];
    if (updatedMembers.length > 1) {
      updatedMembers.splice(index, 1);

      const reorderedMembers = updatedMembers.map((member, idx) => ({
        ...member,
        order: idx + 1,
      }));

      onChangeBlock?.({
        ...currentBlock,
        content: {
          ...currentBlock.content,
          teamMembers: reorderedMembers,
        },
      });
    }
  };

  useEffect(() => {
    if (currentBlock.content?.more) {
      const fields = Object.keys(currentBlock.content?.more);
      setMoreFields(fields);
    }
  }, [currentBlock]);

  return (
    <>
      {currentBlock.content?.teamMembers.map((item: any, index: number) => {
        const totalMembers = currentBlock.content.teamMembers.length;
        const isFirst = index === 0;
        const isLast = index === totalMembers - 1;
        return (
          <div className="p-3 rounded-xl bg-f6f6f6 mb-5" key={item.id}>
            <div className="flex justify-end items-center gap-3">
              {totalMembers > 1 && !isFirst && (
                <Button
                  icon={arrowUpIcon}
                  backgroundColor="transparent"
                  className="p-0 md:w-5 w-3 md:h-5 h-3"
                  onClick={() => reorderTeamMembers(index, index - 1)}
                />
              )}
              {totalMembers > 1 && !isLast && (
                <Button
                  icon={arrowDownIcon}
                  backgroundColor="transparent"
                  className="p-0 md:w-5 w-3 md:h-5 h-3"
                  onClick={() => reorderTeamMembers(index, index + 1)}
                />
              )}
              {totalMembers > 1 && (
                <Button
                  icon={closeIcon}
                  backgroundColor="transparent"
                  className="p-0 md:w-5 w-3 md:h-5 h-3"
                  onClick={(e) => {
                    e.stopPropagation(), handleRemoveMember(index);
                  }}
                />
              )}
            </div>
            <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 mb-4">
              <div className="md:w-sp170 w-20 h-full">
                {item.image_url ? (
                  <img
                    src={concatImgURL(item.image_url)}
                    alt="Uploaded"
                    className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary block align-middle"
                  />
                ) : (
                  <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                    <img src={mediaIcon} alt="Placeholder" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Input
                  label="Image URL"
                  placeholder="https://www.example.com"
                  className="m-0"
                  value={concatImgURL(item.image_url) ?? ""}
                  readOnly
                  onChange={(e) =>
                    handleTeamMemberChange(index, "image_url", e.target.value)
                  }
                />
                <div>
                  {item.image_url ? (
                    <Button
                      text="Remove Image"
                      icon={closeIcon}
                      backgroundColor="transparent"
                      className="py-0"
                      imageclassName="md:w-5 w-3 md:h-5 h-3"
                      onClick={() =>
                        handleTeamMemberChange(index, "image_url", "")
                      }
                    />
                  ) : (
                    <Button
                      icon={plusIcon}
                      text="Add Image"
                      backgroundColor="transparent"
                      className="py-0"
                      imageclassName="md:w-5 w-3 md:h-5 h-3"
                      onClick={() => {
                        setShow(true);
                        setActiveMemberIndex(index);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Input
                label="Name"
                className="m-0"
                value={item.name ?? ""}
                onChange={(e) =>
                  handleTeamMemberChange(index, "name", e.target.value)
                }
              />
              <Input
                label="Designation"
                className="m-0"
                value={item.designation ?? ""}
                onChange={(e) =>
                  handleTeamMemberChange(index, "designation", e.target.value)
                }
              />
            </div>
            <div className="md:mt-3 mt-1">
              <label
                htmlFor="short_bio"
                className="block font-medium md:text-base text-sm  w-full md:mb-2 mb-1"
              >
                Short Bio
              </label>
              <textarea
                id="short_bio"
                value={item.short_bio || ""}
                onChange={(e) =>
                  handleTeamMemberChange(index, "short_bio", e.target.value)
                }
                className="md:p-3 p-2 border-0.5 border-primary rounded-2xl   h-sp70 md:text-base text-sm resize-none w-full focus-within:outline-none"
              ></textarea>
            </div>
          </div>
        );
      })}
      <Button
        text="Add Member"
        icon={plusIcon}
        backgroundColor="transparent"
        className="addSideBarBtn relative p-0"
        onClick={handleAddMember}
      />
      <MoreFieldsRenderer
        currentBlock={currentBlock}
        onChangeBlock={onChangeBlock}
        moreFields={moreFields}
        setMoreFields={setMoreFields}
      />
      <div className="mt-5  md:gap-8 gap-2 flex items-center">
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
            fieldsToShow={["title", "description", "cta"]}
          />
        </div>
        {show && (
          <ContentLibrary
            open={show}
            onClose={() => setShow(false)}
            uploadType="other"
            onSelect={(url: string) => {
              if (activeMemberIndex != null) {
                handleTeamMemberChange(activeMemberIndex, "image_url", url);
              }
              setActiveMemberIndex(null);
            }}
            mediaFilter="image"
          />
        )}
      </div>
    </>
  );
};

export default TeamBlock;

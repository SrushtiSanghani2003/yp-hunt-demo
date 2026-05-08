import { useRef, useState } from "react";
import type { BlockTypeProps } from "./changeBlockTypes";
import MoreFieldsEditor from "./MoreFieldsEditor";
import ChangeBlockType from "./ChangeBlockType";
import MoreFieldsRenderer from "./MoreFieldsRenderer";
import Input from "../ui/input/Input";
import Button from "../ui/button";
import { arrowDownIcon, arrowUpIcon, closeIcon, plusIcon } from "../../icons";
import { v4 as uuidv4 } from "uuid";
import TimezoneDatePicker from "../ui/timezoneDatePicker/TimeZoneDatePicker";
import FroalaEditor from "./FroalaEditor";
import ToggleSwitch from "../ui/switch/ToggleSwitch";

const MeetingsBlock = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [moreFields, setMoreFields] = useState<string[]>([]);

  const handleMeetingChange = (index: number, key: string, value: any) => {
    const updatedMeetings = [...(currentBlock.content?.meetings || [])];
    updatedMeetings[index] = {
      ...updatedMeetings[index],
      [key]: value,
    };

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        meetings: updatedMeetings,
      },
    });
  };

  const handleAddMeeting = () => {
    const allMettings = [...currentBlock.content?.meetings];
    const updatedMeetings = [
      ...allMettings,
      {
        id: uuidv4(),
        title: "",
        description: "",
        is_description: false,
        meeting_at: "",
      },
    ];

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        meetings: updatedMeetings,
      },
    });
  };


  const reorderMeetings = (fromIndex: number, toIndex: number) => {
    if (!currentBlock?.content?.meetings) return;

    const meetingsCopy = currentBlock.content.meetings.map((meeting: any) => ({
      ...meeting,
    }));

    // Ensure the indices are valid
    if (toIndex < 0 || toIndex >= meetingsCopy.length) return;

    // Move the item
    const [movedMeeting] = meetingsCopy.splice(fromIndex, 1);
    meetingsCopy.splice(toIndex, 0, movedMeeting);

    // Reassign order values (if needed)
    const reorderedMeetings = meetingsCopy.map(
      (meeting: any, index: number) => ({
        ...meeting,
        order: index + 1,
      })
    );

    // Send update
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        meetings: reorderedMeetings,
      },
    });
  };

  const handleRemoveMeeting = (index: number) => {
    const updatedMeetings = [...(currentBlock.content?.meetings || [])];
    if (updatedMeetings.length > 1) {
      updatedMeetings.splice(index, 1);

      onChangeBlock?.({
        ...currentBlock,
        content: {
          ...currentBlock.content,
          meetings: updatedMeetings,
        },
      });
    }
  };

  return (
    <>
      <div className="relative">
        {currentBlock.content?.meetings.map((meeting: any, index: number) => {
          const totalMeetings = currentBlock.content.meetings.length;
          const isFirst = index === 0;
          const isLast = index === totalMeetings - 1;
          return (
            <div className="bg-f6f6f6 p-3 rounded-xl mb-4" key={meeting.id}>
              <div className="flex justify-end items-center gap-3">
                {totalMeetings > 1 && !isFirst && (
                  <Button
                    icon={arrowUpIcon}
                    backgroundColor="transparent"
                    className="p-0 md:w-5 w-3 md:h-5 h-3"
                    onClick={() => reorderMeetings(index, index - 1)}
                  />
                )}
                {totalMeetings > 1 && !isLast && (
                  <Button
                    icon={arrowDownIcon}
                    backgroundColor="transparent"
                    className="p-0 md:w-5 w-3 md:h-5 h-3"
                    onClick={() => reorderMeetings(index, index + 1)}
                  />
                )}
                {totalMeetings > 1 && (
                  <Button
                    icon={closeIcon}
                    backgroundColor="transparent"
                    className="p-0 md:w-5 w-3 md:h-5 h-3"
                    onClick={(e) => {
                      e.stopPropagation(), handleRemoveMeeting(index);
                    }}
                  />
                )}
              </div>
              <div className="flex flex-col gap-4 items-start">
                <div className="w-full">
                  <Input
                    label="Meeting Title"
                    // className="md:mb-3 max-w-md"
                    placeholder="Purpose of meeting..."
                    inputCss="md:py-3"
                    value={meeting.title}
                    onChange={(e) =>
                      handleMeetingChange(index, "title", e.currentTarget.value)
                    }
                  />
                </div>
                <div className="w-full">
                  <TimezoneDatePicker
                    value={meeting.meeting_at}
                    onChange={(utcValue) =>
                      handleMeetingChange(index, "meeting_at", utcValue)
                    }
                  />
                </div>
                <div>
                  <ToggleSwitch
                    label="Key Points"
                    checked={meeting.is_description}
                    onChange={(checked) =>
                      handleMeetingChange(index, "is_description", checked)
                    }
                  />
                </div>
                {meeting.is_description && (
                  <div className="w-full">
                    {/* <p className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                    Meeting Key points
                  </p> */}
                    <FroalaEditor
                      model={meeting.description}
                      onModelChange={(value) =>
                        handleMeetingChange(index, "description", value)
                      }
                      isDark={currentBlock?.content?.is_dark}
                      onThemeChange={(value: any) =>
                        handleMeetingChange(index, "is_dark", value)
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <Button
          text="Add Meeting"
          icon={plusIcon}
          backgroundColor="transparent"
          className="addSideBarBtn relative p-0"
          onClick={handleAddMeeting}
        />
      </div>
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
            fieldsToShow={["title", "description"]}
          />
        </div>
      </div>
    </>
  );
};

export default MeetingsBlock;

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../ui/button";
import { chevronDown, closeIcon, correctIcon } from "../../icons";
import { useEffect, useState } from "react";
import Input from "../ui/input/Input";
import api from "../../lib/api";
import { useQuery } from "@tanstack/react-query";

type VideoGroupCreateProps = {
  show: boolean;
  onClose: () => void;
  onCreate?: (data: any) => void;
  onUpdate?: (data: any) => void;
  isLoading?: boolean;
  editData?: any;
  language_code?: string;
};

const VideoGroupCreate = ({
  show,
  onClose,
  onCreate,
  onUpdate,
  isLoading,
  editData,
  language_code,
}: VideoGroupCreateProps) => {
  void onUpdate;
  void onCreate;
  void isLoading;
  const [groupName, setGroupName] = useState("");
  const [isLatest, setIsLatest] = useState(false);
  const [type, setType] = useState("");

  const getVideoGroupById = async () => {
    return await api.get(`/video-group/${editData?.id}`, {
      params: {
        language_code: language_code || "en",
      },
    });
  };

  const { data: videoGroupData } = useQuery({
    queryKey: ["video-group", editData?.id],
    queryFn: getVideoGroupById,
    enabled: !!editData?.id,
  });

  useEffect(() => {
    if (videoGroupData) {
      setGroupName(videoGroupData?.data.title);
      setIsLatest(videoGroupData?.data.is_latest === "yes");
      setType(videoGroupData?.data.type);
    }
  }, [videoGroupData]);

  const handleSubmit = () => {
    const obj = {
      is_latest: isLatest ? "yes" : "no",
      type: type,
      translation: {
        language_code: language_code,
        title: groupName,
      },
    };
    if (editData && onUpdate) {
      onUpdate(obj);
    } else {
      onCreate?.(obj);
    }
  };

  useEffect(() => {
    if (!editData) {
      setGroupName("");
      setIsLatest(false);
      setType("");
    }
  }, [show]);

  return (
    <div>
      <Dialog
        open={show}
        onClose={() => {}}
        transition
        className="fixed inset-0 z-[500] flex items-center transition duration-300 ease-out data-closed:opacity-0 overflow-auto m-auto h-auto"
      >
        <div className="fixed inset-0 bg-black/55" aria-hidden="true" />
        <DialogPanel className="max-w-2xl relative z-10 bg-white rounded-2xl p-6 w-full border border-primary m-auto overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <DialogTitle as="h2" className="text-2xl/6 font-extrabold">
              {editData ? "Edit Video Group" : "Create Video Group"}
            </DialogTitle>
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="p-0"
              onClick={onClose}
            />
          </div>
          <div className="mb-4">
            <Input
              label="Group Name"
              placeholder="Enter group name here..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-sp6 mb-4">
            <input
              type="checkbox"
              id={`latest_video`}
              checked={isLatest}
              onChange={(e) => setIsLatest(e.target.checked)}
              className="peer hidden"
            />
            <label className="font-medium" htmlFor={`latest_video`}>
              Latest Video
            </label>
            <label
              htmlFor={`latest_video`}
              className="w-5 h-5 m-0 flex items-center justify-center border border-gray-400 rounded cursor-pointer
                        peer-checked:bg-black peer-checked:border-black"
            >
              {isLatest && <img src={correctIcon} alt="Right" />}
            </label>
          </div>

          <div className={`${isLatest ? "opacity-100" : "opacity-50"}`}>
            <label className="block md:text-base/4 text-sm mb-2 font-medium">
              Type
            </label>
            <div className="relative">
              <select
                className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl"
                value={type}
                onChange={(e) => setType(e.target.value)}
                disabled={!isLatest}
              >
                <option value="short">Short</option>
                <option value="highlight">Highlight</option>
                <option value="replay">Replay</option>
                <option value="youtube">Youtube</option>
              </select>
              <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                <img src={chevronDown} />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Button
              text="Cancel"
              onClick={onClose}
              className="px-5 border-primary border-0.5"
              backgroundColor="transparent"
            />
            <Button
              text={`${isLoading ? "Saving.." : "Save"}`}
              className="px-8 py-3"
              onClick={handleSubmit}
              disabled={!groupName}
              style={{
                opacity: groupName == "" ? 0.5 : 1,
              }}
            />
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default VideoGroupCreate;

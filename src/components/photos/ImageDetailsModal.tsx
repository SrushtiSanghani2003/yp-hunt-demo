import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import Button from "../ui/button";
import { closeIcon } from "../../icons";
import { concatImgURL, formatDate } from "../../config/function";

type ImageDetailsModalProps = {
  show: boolean;
  onClose: () => void;
  data: any;
};

const Badge = ({ text, color }: { text: string; color: string }) => (
  <span
    className={`text-xs px-3 py-1 rounded-full whitespace-nowrap font-medium ${color} bg-opacity-10 border border-opacity-20`}
  >
    {text}
  </span>
);

const ExpandableRow = ({
  label,
  items,
  fallback,
  color,
  maxVisible = 7,
}: {
  label: string;
  items: any[];
  fallback: string;
  color: string;
  maxVisible?: number;
}) => {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? items : items.slice(0, maxVisible);

  return (
    <div className="flex items-start gap-4 mb-1">
      <div className="w-24 text-sm font-medium text-gray-700">{label}</div>
      <div className="flex-1">
        {items?.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2 mb-1">
              {visibleItems.map((item: any) => (
                <Badge
                  key={item.id}
                  text={item.name || item?.display_name}
                  color={color}
                />
              ))}
              {items.length > maxVisible && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-xs text-black font-medium hover:underline transition"
                >
                  {expanded
                    ? "Show Less"
                    : `Show More (${items.length - maxVisible})`}
                </button>
              )}
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-400">{fallback}</p>
        )}
      </div>
    </div>
  );
};

const ImageDetailsModal = ({ show, onClose, data }: ImageDetailsModalProps) => {
  return (
    <Dialog
      open={show}
      onClose={() => {}}
      className="fixed inset-0 z-[500] flex items-center justify-center"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />

      <DialogPanel className="relative z-10 bg-white rounded-2xl shadow-xl max-w-3xl w-full overflow-hidden">
        {/* Close Button */}
        <Button
          icon={closeIcon}
          backgroundColor="white"
          className="absolute top-3 right-4 p-2"
          onClick={onClose}
        />

        {/* Image */}
        <div className="w-full h-80 sm:h-[400px]">
          <img
            src={concatImgURL(data.image_url)}
            alt={data.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Details */}
        <div className="p-5 space-y-3">
          {/* Title & Date */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {data.title.length > 40
                ? `${data.title.slice(0, 40)}...`
                : data.title || "Untitled"}
            </h2>
            <p className="text-sm text-gray-500">
              {formatDate(data.createdAt)}
            </p>
          </div>

          {/* Metadata */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-2">Details</h3>

            <ExpandableRow
              label="Categories"
              items={data.categories}
              fallback="No categories"
              color="text-blue-700 bg-blue-100 border-blue-300"
            />
            <ExpandableRow
              label="Players"
              items={data.players}
              fallback="No players"
              color="text-green-700 bg-green-100 border-green-300"
            />
            <ExpandableRow
              label="Tags"
              items={data.tags}
              fallback="No tags"
              color="text-yellow-700 bg-yellow-100 border-yellow-300"
            />
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default ImageDetailsModal;

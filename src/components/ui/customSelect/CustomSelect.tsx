import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function CustomSelect({
  options,
  onSelect,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  selected,
  selectedModule,
  loading,
}: any) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    onSelect(null);
  }, [selectedModule]);

  return (
    <div className="relative " ref={containerRef}>
      {/* Selected value */}
      <button
        className="w-full border border-primary rounded-xl p-2 flex justify-between items-center text-left bg-white"
        onClick={() => setOpen(!open)}
      >
        <span className="truncate">{selected?.label || "Select..."}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {loading ? (
              <div className="p-2 text-center text-gray-500">Loading...</div>
            ) : options.length === 0 ? (
              <div className="p-2 text-center text-gray-400">
                No options available
              </div>
            ) : (
              options.map((item: any) => (
                <div
                  key={item.value}
                  className={`p-2 hover:bg-gray-100 cursor-pointer truncate ${
                    selected?.value === item.value ? "bg-gray-200" : ""
                  }`}
                  onClick={() => {
                    onSelect(item);
                    setOpen(false);
                  }}
                >
                  {item.label}
                </div>
              ))
            )}

            {/* Load More */}
            {hasNextPage && (
              <div
                className="p-2 text-center text-blue-600 cursor-pointer hover:bg-gray-50"
                onClick={fetchNextPage}
              >
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

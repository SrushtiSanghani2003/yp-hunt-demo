import { useEffect, useState } from "react";
import { mediaIcon } from "../../icons";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
import api from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";
import MoreFieldsEditor from "./MoreFieldsEditor";
import MoreFieldsRenderer from "./MoreFieldsRenderer";
import { concatImgURL } from "../../config/function";

const OurspacesBlock = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const [AlleventsData, setAlleventsData] = useState([]);
  const [moreFields, setMoreFields] = useState<string[]>([]);
  const { id } = useParams();
  const isEditMode = Boolean(id);

  // ✅ Fetch all events (no category filter)
  const getAllEvents = async () => {
    const res = await api.get("space/publis_space");
    return res.data.data;
  };

  const { data: eventData } = useQuery({
    queryKey: ["ourspaces"],
    queryFn: getAllEvents,
    refetchOnWindowFocus: false,
  });

  // ✅ Update when data fetched
  useEffect(() => {
    if (eventData) {
      setAlleventsData(eventData);
    }
  }, [eventData]);

  // ✅ If edit mode, load existing more fields
  useEffect(() => {
    if (isEditMode && currentBlock.content?.more) {
      const fields = Object.keys(currentBlock.content.more);
      setMoreFields(fields);
    }
  }, [currentBlock, isEditMode]);

  return (
    <>
      <div className="pb-4 border-b-primary border-b-0.5">
        {/* ✅ Always List View */}
        {AlleventsData.length === 0 ? (
          <div className="text-center text-sm text-gray-500 py-10">
            No our spaces Data available
          </div>
        ) : (
          <Swiper
            spaceBetween={16}
            slidesPerView={4}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="!px-1"
          >
            {AlleventsData.map((item: any) => (
              <SwiperSlide key={item.id}>
                <div className="border-primary border-0.5 rounded-2xl flex flex-col overflow-auto h-52">
                  <div className="h-3/4 bg-f6f6f6 rounded-2xl border-primary border-b-0.5 flex justify-center items-center overflow-hidden">
                    {item.image ? (
                      <img
                        src={concatImgURL(item.image)}
                        alt={item.title || "Media"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img src={mediaIcon} alt="Media" />
                    )}
                  </div>
                  <p className="md:px-4 px-2 md:py-2 py-1 md:text-sm text-xs h-1/4 line-clamp-2">
                    {item.translation.title || "Untitled"}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* ✅ More Fields */}
        <MoreFieldsRenderer
          currentBlock={currentBlock}
          onChangeBlock={onChangeBlock}
          moreFields={moreFields}
          setMoreFields={setMoreFields}
        />
      </div>

      <div className="flex items-center md:gap-8 gap-2 md:mt-5 mt-2">
        <ChangeBlockType
          currentBlock={currentBlock}
          onChangeType={onChangeType}
          types={types}
        />
        <MoreFieldsEditor
          currentBlock={currentBlock}
          onChangeBlock={onChangeBlock}
          moreFields={moreFields}
          setMoreFields={setMoreFields}
          fieldsToShow={["title", "description"]}
        />
      </div>
    </>
  );
};

export default OurspacesBlock;

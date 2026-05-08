import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import api from "../../lib/api";
import { showToast } from "../../utils/toastUtils";
import { paths } from "../../config/paths";
import {
  selectVideo,
  setFullVideo,
  setVideoDuration,
  // setVideoAuthentication,
  // setVideoAuthorInfo,
  // setVideoGeoBlockContent,
  setVideoHierarchyContent,
  setVideoPublishContent,
  // setVideoReadTime,
  setVideoSourceType,
  setVideoSponsorContent,
  // setVideoSummary,
  setVideoThumbnailUrl,
  setVideoTitle,
  setVideoType,
  setVideoUrl,
  updateVideoMetadataField,
  // VideoAddBlock,
  // VideoChangeBlockStatus,
  // VideoChangeBlockType,
  // VideoMoveBlock,
  // VideoRemoveBlock,
  // VideoUpdateBlockContent,
} from "../../redux-toolkit/videoSlice";

import MetaData from "../metaData";
import ContentPanel from "../contentPanel/ContentPanel";
import { useEffect } from "react";
import VideoMedia from "../heroMedia/VideoMedia";
// import FieldsAndBlocks from "../fields&Blocks/FieldsAndBlocks";
// import { ALL_TYPES, TABS } from "../heroMedia/tabs";
// import type { BlockType } from "../blocks/blocksObjectConfig";
// import Button from "../ui/button";
// import { arrowDownIcon, arrowUpIcon, closeIcon, minusIcon } from "../../icons";
// import BlockFactory from "../blocks/BlockFactory";
// import InsertButton from "../blocks/InsertButton";
import { normalizeVideoResponse } from "./normalizer/normalizeVideo";
import { setTags } from "../../redux-toolkit/tagSlice";
import type { AxiosError } from "axios";
import { chevronDown } from "../../icons";
import { useScroll } from "../../hooks/ScrollContext";
// import { capitalize, typeDisplayMap } from "../../config/function";
// import ToggleSwitch from "../ui/switch/ToggleSwitch";

export default function CreateVideos() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { isScrolled } = useScroll();
  const videos = useSelector(selectVideo);
  const [searchParams] = useSearchParams();
  const languageCode = searchParams.get("lang");
  // const [activeTab, setActiveTab] = useState<"fields" | "blocks">("fields");
  // const [minimizedStates, setMinimizedStates] = useState<{
  //   [index: number]: boolean;
  // }>({});
  // const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  const fetchVideoById = async (id: string, languageCode?: string) => {
    return await api.get(`/videos/${id}`, {
      params: languageCode ? { language_code: languageCode } : {},
    });
  };

  // Video Data By ID
  const { data: normalizedVideosData } = useQuery({
    queryKey: ["video", id, languageCode],
    queryFn: () => fetchVideoById(id as string, languageCode as string),
    enabled: isEditMode,
    select: (response) => {
      const news = response.data;
      return {
        normalized: normalizeVideoResponse(news, languageCode),
        tags: news.tags,
      };
    },
  });

  // Create Video API
  const createVideoMutation = useMutation({
    mutationFn: async () => await api.post("/videos/", videos),
    onSuccess: () => {
      showToast("Video Created", "success");
      navigate(paths.media.videos.path);
    },
    onError: (error: AxiosError<any>) => {
      console.error("video update failed", error);
      const message =
        error?.response?.data?.message || "Failed to Craete video";
      showToast(message, "error");
    },
  });

  const location = useLocation();
  const fromPage = location.state?.fromPage || 1; // fallback if undefined
  const fromSearch = location.state?.fromSearch || "";

  // Update Video API
  const updateVideosMutation = useMutation({
    mutationFn: async (id: string) => await api.put(`/videos/${id}`, videos),
    onSuccess: () => {
      showToast("Video Updated", "success");
      navigate(paths.media.videos.path, {
        state: {
          restorePage: fromPage,
          restoreSearch: fromSearch,
        }, // send it back silently
        replace: true, // optional: prevents back button double route
      });
    },
    onError: (error: AxiosError<any>) => {
      console.error("video update failed", error);
      const message =
        error?.response?.data?.message || "Failed to update video";
      showToast(message, "error");
    },
  });

  // const handleAddBlock = (blockType: BlockType | string) => {
  //   dispatch(VideoAddBlock(blockType));
  //   setTimeout(() => {
  //     const lastIndex = videos.blocks.length;
  //     const newBlockEl = blockRefs.current[lastIndex];
  //     if (newBlockEl) {
  //       newBlockEl.scrollIntoView({ behavior: "smooth", block: "center" });
  //     }
  //   }, 100);
  // };

  // const getDisplayName = (type: string) => {
  //   return typeDisplayMap[type.toLowerCase()] || capitalize(type);
  // };
  // Blocks Render
  // const renderSelectedComponents = () => {
  //   return videos.blocks.map((block, index) => {
  //     const { block_type } = block;
  //     const BlockComponent = BlockFactory[block_type];
  //     if (!BlockComponent) return null;

  //     const isMinimized = minimizedStates[index] ?? false;

  //     return (
  //       <div
  //         key={index}
  //         ref={(el) => {
  //           blockRefs.current[index] = el;
  //         }}
  //       >
  //         <div className="md:p-4 p-3 bg-white border-primary border-0.5 rounded-2xl">
  //           <div
  //             className={`flex justify-between items-center ${
  //               isMinimized ? "mb-0" : "md:mb-6 mb-3"
  //             } `}
  //           >
  //             <h2 className="md:text-xl/5 text-base font-semibold">
  //               {block_type === "socialWall"
  //                 ? "Social Wall"
  //                 : getDisplayName(block_type)}
  //             </h2>
  //             <div className="flex items-center md:gap-5 gap-2">
  //               <ToggleSwitch
  //                 checked={block.content.is_active}
  //                 onChange={() => dispatch(VideoChangeBlockStatus({ index }))}
  //               />
  //               <Button
  //                 icon={arrowUpIcon}
  //                 backgroundColor="transparent"
  //                 className="p-0 md:w-5 w-3 md:h-5 h-3"
  //                 onClick={() =>
  //                   dispatch(VideoMoveBlock({ index, direction: "up" }))
  //                 }
  //               />
  //               <Button
  //                 icon={arrowDownIcon}
  //                 backgroundColor="transparent"
  //                 className="p-0 md:w-5 w-3 md:h-5 h-3"
  //                 onClick={() =>
  //                   dispatch(VideoMoveBlock({ index, direction: "down" }))
  //                 }
  //               />
  //               <Button
  //                 icon={minusIcon}
  //                 backgroundColor="transparent"
  //                 className="p-0 md:w-5 w-3 md:h-5 h-3"
  //                 onClick={() =>
  //                   setMinimizedStates((prev) => ({
  //                     ...prev,
  //                     [index]: !prev[index],
  //                   }))
  //                 }
  //               />
  //               <Button
  //                 icon={closeIcon}
  //                 backgroundColor="transparent"
  //                 className="p-0 md:w-5 w-3 md:h-5 h-3"
  //                 onClick={() => dispatch(VideoRemoveBlock(index))}
  //               />
  //             </div>
  //           </div>
  //           {!isMinimized && (
  //             <>
  //               <BlockComponent
  //                 currentBlock={block}
  //                 onChangeType={(newType) =>
  //                   dispatch(VideoChangeBlockType({ index, newType }))
  //                 }
  //                 onChangeBlock={(updatedBlock) => {
  //                   dispatch(VideoUpdateBlockContent({ index, updatedBlock }));
  //                 }}
  //                 types={ALL_TYPES}
  //               />
  //             </>
  //           )}
  //         </div>
  //       </div>
  //     );
  //   });
  // };

  const handleVideos = (id: string) => {
    if (!videos.video_thumbnail) {
      showToast("Video Thumbnail is required", "error");
      return;
    }
    if (isEditMode) {
      updateVideosMutation.mutate(id);
    } else {
      createVideoMutation.mutate();
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "seo_title" | "seo_tag" | "seo_description",
  ) => {
    dispatch(updateVideoMetadataField({ field, value: e.target.value }));
  };

  // useEffect(() => {
  //   if (isEditMode && videoDataById?.data) {
  //     const normalizedVideo = normalizeVideoResponse(videoDataById.data);
  //     dispatch(setTags(videoDataById?.data?.tags));
  //     dispatch(setFullVideo(normalizedVideo));
  //   }
  // }, [videoDataById]);
  useEffect(() => {
    if (isEditMode && normalizedVideosData) {
      dispatch(setTags(normalizedVideosData.tags));
      dispatch(setFullVideo(normalizedVideosData.normalized));
    }
  }, [normalizedVideosData]);

  return (
    <div>
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Videos"
          // isToggleVisible={true}
          // isToggleEnabled={isEnabled}
          // onToggleChange={setIsEnabled}
          // onSaveTemplateTitle="Save as Draft"
          onSaveTemplateTitle="Cancel"
          onSaveTemplate={() => window.history.back()}
          onSubmit={() => handleVideos(String(id))}
          onSubmitLoading={
            createVideoMutation.isPending || updateVideosMutation.isPending
          }
          isEditMode={isEditMode}
          isSubmitDisabled={
            videos.translation.title === "" || videos.translation.title === null
          }
        />
      </div>
      <div className="container grid grid-cols-12  xl:gap-sp30 lg:gap-sp16 gap-sp9">
        <div className="lg:col-span-11 md:col-span-10 col-span-10">
          <div className="bg-white md:mb-5 mb-3 border-0.5 border-primary rounded-15 md:p-5 p-3">
            <div className="md:mb-6 mb-2">
              <label
                htmlFor="title"
                className="block w-full font-medium md:text-base text-sm md:mb-3 mb-1"
              >
                Content Title<sup>*</sup>
              </label>
              <input
                type="text"
                id="title"
                value={videos.translation.title || ""}
                onChange={(e) => dispatch(setVideoTitle(e.target.value))}
                placeholder="Enter Title Here..."
                className="md:pb-4 pb-1 border-b-0.5 md:text-base text-sm border-primary w-full focus-within:outline-none"
              />
            </div>

            {/* <div className="md:mb-4 mb-1">
              <label
                htmlFor="summary"
                className="block font-medium md:text-base text-sm  w-full md:mb-2 mb-1"
              >
                Overview
              </label>
              <textarea
                id="summary"
                value={videos.translation.description || ""}
                onChange={(e) => dispatch(setVideoSummary(e.target.value))}
                placeholder="Enter Overview Here..."
                className="md:p-4 p-2 border-0.5 border-primary rounded-2xl   h-sp70 md:text-base text-sm resize-none w-full focus-within:outline-none"
              ></textarea>
            </div> */}
            <div className="mb-4 grid grid-cols-2">
              <div>
                <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                  Type
                </label>
                <div className="relative ">
                  <select
                    id="Type"
                    value={videos.type ?? ""}
                    onChange={(e) => dispatch(setVideoType(e.target.value))}
                    className="appearance-none w-full md:p-[7px] p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
                  >
                    <option value="">Select type</option>
                    <option value="highlight">Highlight</option>
                    <option value="replay">Replay</option>
                    <option value="short">Short</option>
                    <option value="full">Full</option>
                    <option value="youtube">Youtube</option>
                  </select>

                  <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                    <img src={chevronDown} />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <VideoMedia
                videoUrl={videos.video_url}
                videoThumbnailUrl={videos.video_thumbnail}
                videoSource={videos.source_type}
                onTypeChange={(type: string) =>
                  dispatch(setVideoSourceType(type))
                }
                data={videos}
                onUrlChange={(url: string) => dispatch(setVideoUrl(url))}
                onThumbnailUrlChange={(url: string) =>
                  dispatch(setVideoThumbnailUrl(url))
                }
                onDurationChange={(duration: number | null) =>
                  dispatch(setVideoDuration(duration))
                }
              />
            </div>
          </div>
          <div className="my-6">
            <MetaData metadata={videos.metadata} onChange={handleChange} />
          </div>

          {/* <div className="mt-5">
            <FieldsAndBlocks
              tabs={TABS}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onItemClick={(type) => handleAddBlock(type)}
            />
          </div>

          <div className="mt-5 flex flex-col gap-5">
            {renderSelectedComponents()}
            {videos.blocks.length > 0 && (
              <div>
                <InsertButton onItemClick={(type) => handleAddBlock(type)} />
              </div>
            )}
          </div> */}
        </div>
        <div className="lg:col-span-1 col-span-2 ">
          <ContentPanel
            data={videos}
            // onAuthsave={(payload) => dispatch(setVideoAuthentication(payload))}
            // onGeoSave={(payload) => dispatch(setVideoGeoBlockContent(payload))}
            // onReadSave={(payload) => dispatch(setVideoReadTime(payload))}
            // onAuthorSave={(payload) => dispatch(setVideoAuthorInfo(payload))}
            onPublishSave={(payload) =>
              dispatch(setVideoPublishContent(payload))
            }
            onHierarchySave={(payload) =>
              dispatch(setVideoHierarchyContent(payload))
            }
            onSponsorSave={(payload) =>
              dispatch(setVideoSponsorContent(payload))
            }
            // onLanguageSave={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

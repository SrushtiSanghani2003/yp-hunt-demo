import { useState } from "react";
import {
  // chevronDown,
  closeIcon,
  // mediaIcon,
  // plusIcon,
  videosIcon,
} from "../../icons";
// import ContentLibrary from "../contentPanel/ContentLibrary";
import Button from "../ui/button";
// import Input from "../ui/input/Input";
import {
  removeHeroMediaBySortOrder,
  updateHeroMediaBySortOrder,
} from "../../redux-toolkit/pageSlice";
import { useDispatch } from "react-redux";
// import { extractYouTubeId } from "../../config/function";
import PageVideoAdd from "./PageVideoAdd";
import { PlayIcon } from "lucide-react";
import { concatImgURL } from "../../config/function";

type PageVideoMediaProps = {
  sortOrder: number;
  media: any;
};

const PageVideoMedia = ({ sortOrder, media }: PageVideoMediaProps) => {
  const dispatch = useDispatch();
  // const [selectedVideoType, setSelectedVideoType] = useState("");
  const [show, setShow] = useState<boolean>(false);
  // const [isChangeThumbnail, setIsChangeThumbnail] = useState(false);

  // useEffect(() => {
  //   if (media.media_source) {
  //     setSelectedVideoType(media.media_source);
  //   }
  // }, [media.media_source]);

  // const handleVideoType = (e: ChangeEvent<HTMLSelectElement>) => {
  //   const videoType = e.target.value;
  //   setSelectedVideoType(videoType);

  //   dispatch(
  //     updateHeroMediaBySortOrder({
  //       sortOrder,
  //       mediaType: "video",
  //       data: { media_source: videoType, media_url: "" },
  //     })
  //   );
  // };

  // const handleUrlChange = (url: string) => {
  //   const videoId = extractYouTubeId(url);
  //   const thumbnailUrl = videoId
  //     ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
  //     : "";

  //   dispatch(
  //     updateHeroMediaBySortOrder({
  //       sortOrder,
  //       mediaType: "video",
  //       data: {
  //         media_url: url,
  //         video_id: videoId ?? "",
  //         video_thumbnail: thumbnailUrl,
  //       },
  //     })
  //   );
  // };

  // const onUrlChange = (url: string) => {
  //   dispatch(
  //     updateHeroMediaBySortOrder({
  //       sortOrder,
  //       mediaType: "video",
  //       data: { media_url: url },
  //     })
  //   );
  // };

  // const onThumbnailUrlChange = (url: string) => {
  //   dispatch(
  //     updateHeroMediaBySortOrder({
  //       sortOrder,
  //       mediaType: "video",
  //       data: { video_thumbnail: url },
  //     })
  //   );
  // };

  const handleUpdate = (media: any) => {
    dispatch(
      updateHeroMediaBySortOrder({
        mediaType: "video",
        sortOrder,
        data: media,
      })
    );
  };

  const handleRemove = () => {
    dispatch(
      removeHeroMediaBySortOrder({
        mediaType: "video",
        sortOrder,
      })
    );
  };

  // const handleYoutubeThumbnail = () => {
  //   const videoId = extractYouTubeId(media.media_url);
  //   const thumbnailUrl = videoId
  //     ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
  //     : "";

  //   dispatch(
  //     updateHeroMediaBySortOrder({
  //       sortOrder,
  //       mediaType: "video",
  //       data: {
  //         video_thumbnail: thumbnailUrl,
  //       },
  //     })
  //   );
  // };

  return (
    // <div className="relative mt-5">
    //   <div className="md:pb-4 pb-2">
    //     <div className={`${selectedVideoType == "" ? "mb-0" : "mb-5"}`}>
    //       <label
    //         htmlFor="videoSource"
    //         className="block md:text-base/5 text-sm md:pb-3 pb-1 font-medium"
    //       >
    //         Source
    //       </label>
    //       <div className="relative">
    //         <select
    //           id="videoSource"
    //           value={selectedVideoType}
    //           onChange={handleVideoType}
    //           className="appearance-none w-full md:p-3 p-2 md:text-base text-sm  focus-within:outline-none border-0.5 border-primary md:rounded-2xl rounded-lg   "
    //         >
    //           <option value="" disabled>
    //             Please Select
    //           </option>
    //           <option value="youtube">Youtube</option>
    //           <option value="native">Native</option>
    //         </select>
    //         <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
    //           <img src={chevronDown} />
    //         </div>
    //       </div>
    //     </div>

    //     {selectedVideoType != "" && (
    //       <>
    //         {selectedVideoType == "youtube" && (
    //           <>
    //             <Input
    //               label="Video URL*"
    //               value={media.media_url || ""}
    //               onChange={(e) => handleUrlChange(e.target.value)}
    //               className="md:pb-3 pb-1"
    //             />
    //             <Input
    //               label="Video ID"
    //               value={media.video_id ?? ""}
    //               readOnly
    //               className="md:pb-3 pb-1"
    //             />
    //             <div className="flex items-center md:gap-4 gap-2 md:h-sp100 h-20">
    //               <div className="md:w-sp170 w-20 h-full">
    //                 {media.video_thumbnail ? (
    //                   <img
    //                     src={media.video_thumbnail}
    //                     alt="Uploaded"
    //                     className="w-full h-full rounded-2xl border-0.5 border-primary block align-middle object-contain p-2"
    //                   />
    //                 ) : (
    //                   <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
    //                     <img src={mediaIcon} alt="Placeholder" />
    //                   </div>
    //                 )}
    //               </div>
    //               <div className="flex-1">
    //                 <Input
    //                   label="Video Thumbnail"
    //                   placeholder="https://www.example.com"
    //                   className="m-0"
    //                   readOnly
    //                   value={media.video_thumbnail ?? ""}
    //                 />
    //                 <div className="flex items-center gap-5">
    //                   {media.video_thumbnail ? (
    //                     <Button
    //                       icon={closeIcon}
    //                       text="Remove Thumbnail"
    //                       backgroundColor="transparent"
    //                       className="py-0"
    //                       imageclassName="md:w-5 w-3 md:h-5 h-3"
    //                       onClick={() => {
    //                         dispatch(
    //                           updateHeroMediaBySortOrder({
    //                             sortOrder,
    //                             mediaType: "video",
    //                             data: { video_thumbnail: "" },
    //                           })
    //                         );
    //                       }}
    //                     />
    //                   ) : (
    //                     <Button
    //                       icon={plusIcon}
    //                       text="Add Thumbnail"
    //                       backgroundColor="transparent"
    //                       className="py-0"
    //                       imageclassName="md:w-5 w-3 md:h-5 h-3"
    //                       onClick={() => {
    //                         setShow(true);
    //                         setIsChangeThumbnail(true);
    //                       }}
    //                     />
    //                   )}
    //                   {media.video_thumbnail?.includes(
    //                     "https://ip-cms-api.ypstagingserver.com"
    //                   ) &&
    //                     media.media_source != "native" && (
    //                       <Button
    //                         text="Use YT Thumbnail"
    //                         className="md:py-1 px-3"
    //                         onClick={handleYoutubeThumbnail}
    //                       />
    //                     )}
    //                 </div>
    //               </div>
    //             </div>
    //           </>
    //         )}

    //         {selectedVideoType == "native" && (
    //           <div className="grid grid-cols-2 gap-4">
    //             <div className="flex md:h-sp100 h-20  md:gap-4 gap-2">
    //               <div className="md:w-sp170 w-20 h-full">
    //                 {media.media_url ? (
    //                   <video
    //                     src={media.media_url}
    //                     controls
    //                     className="w-full h-full rounded-2xl border-0.5 border-primary block align-middle object-contain p-2"
    //                   />
    //                 ) : (
    //                   <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
    //                     <img src={mediaIcon} alt="Placeholder" />
    //                   </div>
    //                 )}
    //               </div>
    //               <div className="flex-1">
    //                 <div>
    //                   <Input
    //                     label="Video URL*"
    //                     placeholder="https://www.example.com"
    //                     className="m-0"
    //                     value={media.media_url ?? ""}
    //                     readOnly
    //                   />
    //                   {media.media_url ? (
    //                     <Button
    //                       text="Remove Video"
    //                       icon={closeIcon}
    //                       backgroundColor="transparent"
    //                       className="pb-0 "
    //                       imageclassName="md:w-5 w-3 md:h-5 h-3"
    //                       onClick={() => {
    //                         onUrlChange("");
    //                       }}
    //                     />
    //                   ) : (
    //                     <Button
    //                       icon={plusIcon}
    //                       text="Add Video"
    //                       backgroundColor="transparent"
    //                       className="py-0"
    //                       imageclassName="md:w-5 w-3 md:h-5 h-3"
    //                       onClick={() => {
    //                         setShow(true);
    //                         setIsChangeThumbnail(false);
    //                       }}
    //                     />
    //                   )}
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="flex md:h-sp100 h-20  md:gap-4 gap-2">
    //               <div className="md:w-sp170 w-20 h-full">
    //                 {media.video_thumbnail ? (
    //                   <img
    //                     src={media.video_thumbnail}
    //                     className="w-full h-full rounded-2xl border-0.5 border-primary block align-middle object-contain p-2"
    //                   />
    //                 ) : (
    //                   <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
    //                     <img src={mediaIcon} alt="Placeholder" />
    //                   </div>
    //                 )}
    //               </div>
    //               <div className="flex-1">
    //                 <div>
    //                   <Input
    //                     label="Video Thumbnail*"
    //                     placeholder="https://www.example.com"
    //                     className="m-0"
    //                     value={media.video_thumbnail ?? ""}
    //                     readOnly
    //                   />
    //                   {media.video_thumbnail ? (
    //                     <Button
    //                       text="Remove Thumbnail"
    //                       icon={closeIcon}
    //                       backgroundColor="transparent"
    //                       className="pb-0 "
    //                       imageclassName="md:w-5 w-3 md:h-5 h-3"
    //                       onClick={() => {
    //                         onThumbnailUrlChange("");
    //                       }}
    //                     />
    //                   ) : (
    //                     <Button
    //                       icon={plusIcon}
    //                       text="Add Thumbnail"
    //                       backgroundColor="transparent"
    //                       className="py-0"
    //                       imageclassName="md:w-5 w-3 md:h-5 h-3"
    //                       onClick={() => {
    //                         setShow(true);
    //                         setIsChangeThumbnail(true);
    //                       }}
    //                     />
    //                   )}
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         )}
    //       </>
    //     )}
    //   </div>
    //   {show && (
    //     <ContentLibrary
    //       open={show}
    //       onClose={() => setShow(false)}
    //       onSelect={(url: string) => {
    //         if (isChangeThumbnail) {
    //           onThumbnailUrlChange(url);
    //         } else {
    //           onUrlChange(url);
    //         }
    //       }}
    //       onThumbnailSelect={(url: string) => {
    //         onThumbnailUrlChange(url);
    //       }}
    //       uploadType="hero"
    //       mediaFilter={isChangeThumbnail ? "image" : "video"}
    //     />
    //   )}

    //   <Button
    //     icon={closeIcon}
    //     backgroundColor="transparent"
    //     className="absolute -top-2 right-1"
    //     onClick={handleRemove}
    //   />
    // </div>
    <div className="relative">
      <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
        <div
          onClick={() => setShow(true)}
          className="md:w-sp188 flex-1 w-20 h-full relative"
        >
          {media?.video_thumbnail ? (
            <div className="relative w-full h-full">
              <img
                src={concatImgURL(media?.video_thumbnail)}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-2xl border-0.5 border-primary block align-middle"
              />
              <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center">
                <PlayIcon className="w-8 h-8 text-white" />
              </div>
            </div>
          ) : (
            <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
              <img src={videosIcon} alt="Placeholder" />
            </div>
          )}
        </div>
      </div>
      {show && (
        <PageVideoAdd
          open={show}
          onClose={() => setShow(false)}
          sortOrder={sortOrder}
          initialData={media}
          onSubmitMedia={handleUpdate}
        />
      )}
      <Button
        icon={closeIcon}
        backgroundColor="white md:p-0.5"
        className="absolute top-1 right-1"
        imageclassName="w-4 h-4"
        onClick={handleRemove}
      />
    </div>
  );
};

export default PageVideoMedia;

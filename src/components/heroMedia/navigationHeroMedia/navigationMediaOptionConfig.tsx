// import { mediaicontrans, videosIcon, videosIcontrans } from "../../icons";
// import PageImageMedia, {
//   type PageImageMediaProps,
// } from "../page/PageImageMedia";

import { mediaicontrans, videosIcontrans } from "../../../icons";
import type { VideoMediaProps } from "../VideoMedia";
import NavigationHeroMediaImage from "./navigationHeroMediaImage";
import navigationHeroMediaVideo from "./navigationHeroMediaVideo";

type MediaOption =
  | {
      type: "image";
      label: string;
      icon: string;
      Component: any;
    }
  | {
      type: "video";
      label: string;
      icon: string;
      Component: React.ComponentType<VideoMediaProps>;
    };

export const mediaOptions: MediaOption[] = [
  {
    type: "image",
    label: "Image",
    icon: mediaicontrans,
    Component: NavigationHeroMediaImage,
  },
  {
    type: "video",
    label: "Video",
    icon: videosIcontrans,
    Component: navigationHeroMediaVideo,
  },
];

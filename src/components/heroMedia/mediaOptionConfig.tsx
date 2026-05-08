import { mediaicontrans, videosIcon, videosIcontrans } from "../../icons";
import ImageMedia, { type ImageMediaProps } from "./ImageMedia";
import PageImageMedia, {
  type PageImageMediaProps,
} from "../page/PageImageMedia";
import VideoMedia, { type VideoMediaProps } from "./VideoMedia";

type MediaOption =
  | {
      type: "image";
      label: string;
      icon: string;
      Component: React.ComponentType<ImageMediaProps>;
    }
  | {
      type: "video";
      label: string;
      icon: string;
      Component: React.ComponentType<VideoMediaProps>;
    };
type PageMediaOption =
  | {
      type: "image";
      label: string;
      icon: string;
      Component: React.ComponentType<PageImageMediaProps>;
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
    Component: ImageMedia,
  },
  {
    type: "video",
    label: "Video",
    icon: videosIcontrans,
    Component: VideoMedia,
  },
];
export const pageMediaOptions: PageMediaOption[] = [
  {
    type: "image",
    label: "Image",
    icon: mediaicontrans,
    Component: PageImageMedia,
  },
  {
    type: "video",
    label: "Video",
    icon: videosIcon,
    Component: VideoMedia,
  },
];

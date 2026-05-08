import dayjs from "dayjs";
import { faceBookIcon, instagramIcon, xIcon, youTubeIcon } from "../icons";
import { env } from "./env";

export const getWordCount = (text: string) => {
  return text?.trim() === "" ? 0 : text?.trim().split(/\s+/).length;
};

export const extractYouTubeId = (url: string): string | null => {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|embed|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const capitalize = (s: string) =>
  s?.charAt(0).toUpperCase() + s?.slice(1);

export function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
}
export function formatOnlyDate(dateString: string): string {
  const d = new Date(dateString);
  const localDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  return localDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const platformIcons: { [key: string]: string } = {
  instagram: instagramIcon,
  facebook: faceBookIcon,
  youtube: youTubeIcon,
  x: xIcon,
};

export const getPlatformIcon = (platformType: string) => {
  return platformIcons[platformType.toLowerCase()] || null || undefined;
};

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 KB";

  const kb = bytes / 1024;
  const mb = kb / 1024;

  if (mb >= 1) {
    return `${mb.toFixed(2)} MB`;
  } else {
    return `${kb.toFixed(1)} KB`;
  }
};

export const extractFileType = (mime: string | null) => {
  return mime?.split("/")[1]?.toUpperCase() || "UNKNOWN";
};

export const urlPattern =
  /^https:\/\/ip-cms-api\.ypstagingserver\.com\/uploads\/content-library\/content-library\/[a-f0-9]{64}\.(png|jpg|jpeg|webp)$/;

export const chunkArray = (arr: any[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );

export const dataURLtoFile = (dataUrl: string, filename: string): File => {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export function formatUTCDate(dateString: string) {
  const date = new Date(dateString); // Parse UTC string
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(",", ""); // Remove comma if any
}

export const typeDisplayMap: Record<string, string> = {
  where_to_watch: "Where to Watch",
  all_jobs: "All Jobs",
  where_to_watch_more: "Where to Watch Info",
  // match_highlights: "Match Highlights",
  premier_predict: "Premier Predict",
  about_info: "About Info",
  player_info: "Player Info",
  mix_media: "Mix Media",
  "text_&_media": "Text & Media",
  match_centre: "Match Centre",
  match_stats: "Match Stats",
  head_to_head: "Head to Head",
  playerdetails: "Player Details",
  playercareers: "Player Careers",
  race_to_finals: "Race to the Finals",
  tournamenthero: "Tournament Hero",
  player_seasons: "Player Seasons",
  foryou: "For You",
  quicklinks: "Quick Links",
  padelzone: "Padel Zone",
  promotions: "Advert",
  testimonials: "Testimonials",
  cta: "Button",
  faq: "FAQ",
  socialWall: "Social Wall",
  // bentoBox: "Bento Box",
  video_vertical: "Videos Vertical (Phone)",
};

export const blobUrlToFile = async (
  blobUrl: string,
  filename: string,
  mimeType = "video/mp4",
): Promise<File> => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
};

export const concatImgURL = (url: string | null) => {
  if (!url) return "";
  const cleanedUrl = url.trim();
  if (
    cleanedUrl.includes(
      "https://premierpadel-staging.s3.eu-north-1.amazonaws.com",
    )
  ) {
    return cleanedUrl.replace(
      "https://premierpadel-staging.s3.eu-north-1.amazonaws.com",
      env.IMAGE_URL,
    );
  } else if (
    cleanedUrl.includes(
      "https://premierpadel-staging.s3.eu-north-1.amazonaws.com",
    )
  ) {
    return cleanedUrl.replace(
      "https://premierpadel-staging.s3.eu-north-1.amazonaws.com",
      env.IMAGE_URL,
    );
  } else if (cleanedUrl.startsWith("https") || cleanedUrl.startsWith("blob")) {
    return cleanedUrl;
  } else {
    return `${env.IMAGE_URL.replace(/\/$/, "")}/${cleanedUrl.replace(/^\//, "")}`;
  }
};
export const concatCropUrl = (url: string) => {
  if (!url) return "";

  const { IMAGE_URL, CROP_URL } = env;

  // 1️⃣ CDN → S3
  if (IMAGE_URL && url.startsWith(IMAGE_URL)) {
    return url.replace(IMAGE_URL, CROP_URL);
  }

  // 2️⃣ Already absolute (s3, external, blob)
  if (url.startsWith("https") || url.startsWith("blob")) {
    return url;
  }

  // 3️⃣ Relative path → S3
  return `${CROP_URL}${url}`;
};

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export function formatBirthDate(dateStr: any) {
  const date = new Date(dateStr);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export const getImageDimensions = (
  url: string,
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };

    img.onerror = () => {
      reject(new Error("Failed to load image: " + url));
    };

    img.src = url;
  });
};

export const removeKeyFromArray = (array: any[], keys: string[]) => {
  return array?.map((item: any) => {
    const newItem = { ...item };
    keys.forEach((key) => {
      delete newItem[key];
    });
    return newItem;
  });
};
export const toUTCISOString = (localDateTime: any) => {
  return localDateTime ? dayjs(localDateTime).utc().toISOString() : null;
};

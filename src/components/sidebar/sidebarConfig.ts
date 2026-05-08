import {
  home,
  matchesIcon,
  mediaIcon,
  newsIcon,
  pageIcon,
  partnerIcon,
  photosIcon,
  settingIcon,
  shopIcon,
  userIcon,
  videosIcon,
} from "../../icons";

export const MENU_CONFIG: Record<string, any> = {
  dashboard: {
    icon: home,
    path: "/dashboard",
  },
  users: {
    icon: userIcon,
    path: "/users",
    children: {
      all_users: "/users/allusers",
      portal_user: "/users/portaluser",
    },
  },
  media: {
    icon: mediaIcon,
    path: "/media",
    children: {
      news: "/media/news",
      videos: "/media/videos",
      photos: "/media/photos",
    },
  },
  navigation: {
    icon: userIcon,
    path: "/navigation",
  },
  pages: {
    icon: pageIcon,
    path: "/pages",
  },
  news: {
    icon: newsIcon,
    path: "/media/news",
  },
  videos: {
    icon: videosIcon,
    path: "/media/videos",
  },
  where_to_watch: {
    icon: videosIcon,
    path: "/wheretowatch",
  },
  country: {
    icon: userIcon,
    path: "/country",
  },
  matches: {
    icon: matchesIcon,
    path: "/matches",
  },
  photos: {
    icon: photosIcon,
    path: "/media/photos",
  },
  shop: {
    icon: shopIcon,
    path: "/shop",
  },
  jobs: {
    icon: userIcon,
    path: "/jobs",
    children: {
      all_jobs: "/jobs/alljobs",
      job_categories: "/jobs/categories",
      job_applications: "/jobs/jobapplications",
    },
  },
  travel_request: {
    icon: userIcon,
    path: "/travelrequest",
    children: {
      transportation: "/travelrequest/transportation",
      accommodation: "/travelrequest/accommodation",
      accreditation: "/travelrequest/accreditation",
      flight: "/travelrequest/flight",
    },
  },
  tournaments: {
    icon: userIcon,
    path: "/tournaments",
  },
  players: {
    icon: userIcon,
    path: "/players",
  },
  documentation: {
    icon: userIcon,
    path: "/documentation",
  },
  announcements: {
    icon: photosIcon,
    path: "/announcements",
  },
  content_library: {
    icon: mediaIcon,
    path: "/contentmedia",
  },
  conversation: {
    icon: mediaIcon,
    path: "/conversation",
  },
  common_partners: {
    icon: partnerIcon,
    path: "/commonPartners",
  },
  premier_predict: {
    icon: partnerIcon,
    path: "/premierpredict",
  },
  language_localization: {
    icon: settingIcon,
    path: "/languagelocalization",
  },
  settings: {
    icon: settingIcon,
    path: "/settings",
  },
  airport: {
    icon: partnerIcon,
    path: "/airport",
  },
};

import {
  // calenderIcon,
  // evetIcon,
  // gamecontrollerIcon,
  // gridAddIcon,
  // matchesIcon,
  mediaIcon,
  // membershipIcon,
  newsIcon,
  pageIcon,
  photosIcon,
  // predictorGameIcon,
  // quizIcon,
  // shopIcon,
  // teamsIcon,
  // ticketIcon,
  // tournamentIcon,
  userIcon,
  videosIcon,
  home,
  // evetIcon,
  // gridAddIcon,
  partnerIcon,
  settingIcon,
  shopIcon,
} from "../../icons";

export type TabLabel =
  | "Dashboard"
  | "Airport"
  | "Users"
  | "Pages"
  | "Media"
  | "Content Library"
  | "Shop"
  | "Players"
  | "Fixtures & Results"
  | "Tickets"
  | "Events"
  | "Membership"
  | "Our Spaces"
  | "Live Blog"
  | "Game Zone"
  | "Templates"
  | "Travel Request"
  | "Settings"
  | "News"
  | "Videos"
  | "Common Partners"
  | "Language Localization"
  | "Documentation"
  | "Jobs"
  | "Matches"
  | "Tournaments"
  | "Premier Predict"
  | "Where To Watch"
  | "Announcements"
  | "Photos";

export type SubTab = { label: string; icon: string; path: string };
export type Tab = {
  label: TabLabel;
  icon: string;
  subTabs?: SubTab[];
  path?: string;
  module_code?: string;
};

export const tabs: Tab[] = [
  { label: "Dashboard", icon: home, path: "/dashboard" },
  // { label: "Users", icon: userIcon, path: "/" },
  // {
  //   label: "Users",
  //   icon: userIcon,
  //   path: "/users",
  //   subTabs: [
  //     { label: "All Users", icon: userIcon, path: "/users/allusers" },
  //     { label: "Portal User", icon: userIcon, path: "/users/portaluser" },
  //     // { label: "Newsletter", icon: newsIcon, path: "/users/newsletter" },
  //     // { label: "Contact Us", icon: userIcon, path: "/users/contactus" },
  //   ],
  // },
  { label: "Pages", icon: pageIcon, path: "/pages" },
  // { label: "News", icon: newsIcon, path: "/media/news" },
  // { label: "Videos", icon: videosIcon, path: "/media/videos" },
  // { label: "Where To Watch", icon: videosIcon, path: "/wheretowatch" },
  // { label: "Matches", icon: userIcon, path: "/matches" },
  // { label: "Photos", icon: photosIcon, path: "/media/photos" },
  // // { label: "Shop", icon: shopIcon, path: "/shop" },
  // {
  //   label: "Documentation",
  //   icon: newsIcon,
  //   path: "/documentation",
  // },
  // {
  //   label: "Jobs",
  //   icon: userIcon,
  //   path: "/jobs",
  //   subTabs: [
  //     { label: "All Jobs", icon: userIcon, path: "/jobs/alljobs" },
  //     { label: "Categories", icon: userIcon, path: "/jobs/categories" },
  //     {
  //       label: "Job Application",
  //       icon: userIcon,
  //       path: "/jobs/jobapplications",
  //     },
  //   ],
  // },
  // {
  //   label: "Travel Request",
  //   icon: userIcon,
  //   path: "/travelrequest",
  //   subTabs: [
  //     {
  //       label: "Transportation",
  //       icon: userIcon,
  //       path: "/travelrequest/transportation",
  //     },
  //     {
  //       label: "Accommodation",
  //       icon: userIcon,
  //       path: "/travelrequest/accommodation",
  //     },
  //     {
  //       label: "Accreditation",
  //       icon: userIcon,
  //       path: "/jobs/accreditation",
  //     },
  //     {
  //       label: "Flight",
  //       icon: userIcon,
  //       path: "/jobs/flight",
  //     },
  //   ],
  // },
  // {
  //   label: "Tournaments",
  //   icon: userIcon,
  //   path: "/tournaments",
  // },
  // {
  //   label: "Airport",
  //   icon: userIcon,
  //   path: "/airport",
  // },
  // {
  //   label: "Players",
  //   icon: userIcon,
  //   path: "/players",
  // },
  // {
  //   label: "Media",
  //   icon: mediaIcon,
  //   path: "/media",
  //   subTabs: [
  //     // { label: "Articles", icon: membershipIcon, path: "/media/articles" },
  //     { label: "News", icon: newsIcon, path: "/media/news" },
  //     { label: "Videos", icon: videosIcon, path: "/media/videos" },
  //     { label: "Photos", icon: photosIcon, path: "/media/photos" },
  //   ],
  // },
  // { label: "Announcements", icon: photosIcon, path: "/announcements" },
  // { label: "Content Library", icon: mediaIcon, path: "/contentmedia" },
  // { label: "Common Partners", icon: partnerIcon, path: "/commonPartners" },
  // { label: "Premier Predict", icon: partnerIcon, path: "/premierpredict" },

  // {
  //   label: "Shop",
  //   icon: shopIcon,
  //   path: "/shop",
  //   subTabs: [
  //     { label: "Shop", icon: gridAddIcon, path: "/shops/shop" },
  //     { label: "Product", icon: evetIcon, path: "/shops/product" },
  //   ],
  // },
  // { label: "Players", icon: userIcon, path: "/players" },
  // {
  //   label: "Fixtures & Results",
  //   icon: calenderIcon,
  //   path: "/fixers",
  //   subTabs: [
  //     {
  //       label: "Tournaments",
  //       icon: tournamentIcon,
  //       path: "/fixers/tournaments",
  //     },
  //     { label: "Matches", icon: matchesIcon, path: "/fixers/matches" },
  //     { label: "Teams", icon: teamsIcon, path: "/fixers/teams" },
  //   ],
  // },
  // { label: "Tickets", icon: ticketIcon, path: "/tickets" },
  // {
  //   label: "Events",
  //   icon: evetIcon,
  //   path: "/events",
  //   subTabs: [
  //     { label: "Event Types", icon: gridAddIcon, path: "/events/type" },
  //     { label: "Events", icon: evetIcon, path: "/events/event" },
  //   ],
  // },
  // { label: "Membership", icon: membershipIcon, path: "/membership" },

  // { label: "Our Spaces", icon: pageIcon, path: "/ourspaces" },

  // { label: "Live Blog", icon: pageIcon, path: "/liveblog" },
  // {
  //   label: "Game Zone",
  //   icon: gamecontrollerIcon,
  //   path: "/gamezone",
  //   subTabs: [
  //     { label: "Quiz", icon: quizIcon, path: "/gamezone/quiz" },
  //     {
  //       label: "Predictor Game",
  //       icon: predictorGameIcon,
  //       path: "/gamezone/predictor",
  //     },
  //   ],
  // },
  // { label: "Templates", icon: membershipIcon, path: "/templates" },
  // {
  //   label: "Language Localization",
  //   icon: settingIcon,
  //   path: "/languagelocalization",
  // },
  // { label: "Settings", icon: settingIcon, path: "/settings" },
];

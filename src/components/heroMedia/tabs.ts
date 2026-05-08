import {
  altTextIcon,
  avatarall,
  calenderIcon,
  clockIcon,
  descIcon,
  faqIcon,
  Filmicon,
  Flagfinal,
  Foryou,
  infoIcon,
  jobicon,
  linkIcon,
  matchcenter,
  MatchStats,
  mediaIcon,
  mixmedia,
  // membershipIcon,
  newsIcon,
  padelzone,
  partnerIcon,
  personcareer,
  photosIcon,
  playerdetails,
  playerinfo,
  // plusIcon,
  promotionIcon,
  quizIcon,
  shopIcon,
  ShortCalander,
  smartphone,
  // shopIcon,
  socialWallIcon,
  sponsorIcon,
  Teamcomparison,
  testimonialIcon,
  textIcon,
  textmedia,
  ticketIcon,
  timeline,
  titleIcon,
  tournamenthero,
  tournamentIcon,
  tournamentinfo,
  userIcon,
  videosIcon,
  VideosVertical,
} from "../../icons";
import type { MoreObjectTypes } from "../blocks/blocksObjectConfig";

export const TABS: any = {
  fields: {
    label: "Add Field",
    types: [
      { type: "text", label: "Text", icon: textIcon },
      { type: "image", label: "Image", icon: mediaIcon },
      { type: "video", label: "Video", icon: videosIcon },
      { type: "cta", label: "CTA", icon: linkIcon },
      { type: "testimonials", label: "Testimonials", icon: testimonialIcon },
      { type: "promotions", label: "Advert", icon: promotionIcon },
      { type: "gallery", label: "Gallery", icon: photosIcon },
      { type: "faq", label: "FAQ", icon: faqIcon },
    ],
  },
  blocks: {
    label: "Add Section",
    types: [
      // { type: "articles", label: "Articles", icon: membershipIcon },
      { type: "news", label: "News", icon: newsIcon },
      { type: "videos", label: "Videos", icon: videosIcon },
      // { type: "albums", label: "Albums", icon: photosIcon },
      // { type: "shop", label: "Shop", icon: shopIcon },
      { type: "advertisement", label: "Advertisements", icon: promotionIcon },
      // { type: "bentoBox", label: "Bento Box", icon: bentoBoxIcon },
      { type: "partners", label: "Partners", icon: partnerIcon },
      { type: "socialWall", label: "Social Wall", icon: socialWallIcon },
      { type: "team", label: "Team", icon: userIcon },
      { type: "contact", label: "Contact", icon: userIcon },
      { type: "tCard", label: "T-Card", icon: userIcon },
      { type: "quote", label: "Quote", icon: userIcon },
      // { type: "feedback", label: "Feedback", icon: userIcon },
      { type: "timeline", label: "Timeline", icon: userIcon },
      { type: "document", label: "Document", icon: userIcon },
      { type: "meetings", label: "Meetings", icon: userIcon },
      { type: "membership", label: "Membership", icon: userIcon },
      { type: "event", label: "Events", icon: userIcon },
      { type: "generation", label: "Generation", icon: userIcon },
    ],
  },
};

export const NewsTABS: any = {
  fields: {
    label: "Add Field",
    types: [
      { type: "text", label: "Text", icon: textIcon },
      { type: "image", label: "Image", icon: mediaIcon },
      { type: "video", label: "Video", icon: videosIcon },
      { type: "cta", label: "CTA", icon: linkIcon },
      // { type: "advertisement", label: "Advertisements", icon: promotionIcon },
      { type: "promotions", label: "Advert", icon: promotionIcon },
      // { type: "albums", label: "Albums", icon: photosIcon },
    ],
  },
};

export const ourspacesTABS: any = {
  fields: {
    label: "Add Field",
    types: [
      { type: "text", label: "Text", icon: textIcon },
      { type: "image", label: "Image", icon: mediaIcon },
      { type: "video", label: "Video", icon: videosIcon },
    ],
  },
};

export const PageTABS: any = {
  fields: {
    label: "Add Field",
    types: [
      { type: "text", label: "Text", icon: textIcon },
      { type: "image", label: "Image", icon: mediaIcon },
      { type: "video", label: "Video", icon: videosIcon },
      { type: "cta", label: "CTA", icon: linkIcon },
      { type: "promotions", label: "Advert", icon: promotionIcon },
      { type: "faq", label: "FAQ", icon: faqIcon },
    ],
  },
  blocks: {
    label: "Add Section",
    types: [
      { type: "news", label: "News", icon: newsIcon },
      { type: "videos", label: "Videos", icon: videosIcon },
      {
        type: "video_vertical",
        label: "Videos Vertical",
        icon: VideosVertical,
      },
      { type: "albums", label: "Albums", icon: photosIcon },
      { type: "advertisement", label: "Advertisements", icon: promotionIcon },
      // { type: "bentoBox", label: "Bento Box", icon: bentoBoxIcon },
      { type: "partners", label: "Partners", icon: partnerIcon },
      // { type: "team", label: "Team", icon: userIcon },
      // { type: "contact", label: "Contact", icon: userIcon },
      // { type: "tCard", label: "T-Card", icon: userIcon },
      // { type: "quote", label: "Quote", icon: userIcon },
      { type: "shop", label: "Shop", icon: shopIcon },
      { type: "timeline", label: "Timeline", icon: timeline },
      { type: "quickLinks", label: "Quick Links", icon: linkIcon },
      { type: "officialApp", label: "Official App", icon: smartphone },
      { type: "text_&_media", label: "Text & Media", icon: textmedia },
      { type: "mix_media", label: "Mixed Media", icon: mixmedia },
      {
        type: "where_to_watch_more",
        label: "Where To Watch Info",
        icon: infoIcon,
      },
      { type: "where_to_watch", label: "Where To Watch", icon: Filmicon },
      {
        type: "fullCalendar",
        label: "Full Calendar",
        icon: calenderIcon,
      },
      { type: "premier_predict", label: "Premier Predict", icon: quizIcon },

      { type: "about_info", label: "About Info", icon: infoIcon },
      // { type: "membership", label: "Membership", icon: userIcon },
      // { type: "event", label: "Events", icon: userIcon },
      // { type: "ourspaces", label: "Our Spaces", icon: userIcon },
      // { type: "generation", label: "Generation", icon: userIcon },
    ],
  },
  thirdParty: {
    label: "Add ThirdParty Block",
    types: [
      { type: "tournaments", label: "Tournaments", icon: tournamentIcon },
      {
        type: "tournamenthero",
        label: "Tournaments Hero",
        icon: tournamenthero,
      },
      { type: "schedule", label: "Schedule", icon: clockIcon },
      {
        type: "tournamentInfo",
        label: "Tournament Info",
        icon: tournamentinfo,
      },
      { type: "padelzone", label: "Padel Zone", icon: padelzone },
      { type: "foryou", label: "For You", icon: Foryou },
      { type: "race_to_finals", label: "Race To The Finals", icon: Flagfinal },
      { type: "players", label: "Players", icon: avatarall },
      { type: "playerDetails", label: "Player Details", icon: playerdetails },
      { type: "playerCareers", label: "Player Careers", icon: personcareer },
      { type: "player_seasons", label: "Player Seasons", icon: ShortCalander },
      { type: "player_info", label: "Player Info", icon: playerinfo },
      { type: "tickets", label: "Tickets", icon: ticketIcon },
      { type: "match_centre", label: "Match Centre", icon: matchcenter },
      { type: "match_stats", label: "Match Stats", icon: MatchStats },
      // { type: "match_highlights", label: "Match Highlights", icon: mediaIcon },
      { type: "head_to_head", label: "Head To Head", icon: Teamcomparison },

      { type: "all_jobs", label: "All Jobs", icon: jobicon },
    ],
  },
};

type DropDownItem = {
  label: string;
  icon: any;
  value: keyof MoreObjectTypes | string;
};

export const timelineDropDownItems: DropDownItem[] = [
  {
    label: "Title",
    icon: titleIcon,
    value: "title",
  },
  {
    label: "Description",
    icon: descIcon,
    value: "description",
  },
  {
    label: "Link",
    icon: linkIcon,
    value: "link",
  },
  {
    label: "Sponsor",
    icon: sponsorIcon,
    value: "sponsor",
  },
  {
    label: "CTA",
    icon: linkIcon,
    value: "cta",
  },
  // {
  //   label: "Bullet",
  //   icon: plusIcon,
  //   value: "bullet",
  // },
  {
    label: "Social",
    icon: socialWallIcon,
    value: "social",
  },
];

export const tCardDropDownItems: DropDownItem[] = [
  {
    label: "CTA",
    icon: linkIcon,
    value: "cta",
  },
];

export const adsDropDownItems: DropDownItem[] = [
  {
    label: "Title",
    icon: titleIcon,
    value: "title",
  },
  {
    label: "Description",
    icon: descIcon,
    value: "description",
  },
  {
    label: "Link",
    icon: linkIcon,
    value: "link",
  },
  {
    label: "Sponsor",
    icon: sponsorIcon,
    value: "sponsor",
  },
  {
    label: "CTA",
    icon: linkIcon,
    value: "cta",
  },
  // {
  //   label: "Bullet",
  //   icon: plusIcon,
  //   value: "bullet",
  // },
];

export const imageDropDownItems: DropDownItem[] = [
  {
    label: "Headline",
    icon: titleIcon,
    value: "title",
  },
  {
    label: "Subheading",
    icon: descIcon,
    value: "description",
  },
  {
    label: "Alt Text",
    icon: altTextIcon,
    value: "altText",
  },
  {
    label: "Thumbnail URL",
    icon: mediaIcon,
    value: "thumbnailUrl",
  },
  {
    label: "Hyperlink",
    icon: linkIcon,
    value: "link",
  },
  {
    label: "Sponsor",
    icon: sponsorIcon,
    value: "sponsor",
  },
  {
    label: "CTA",
    icon: linkIcon,
    value: "cta",
  },
];

export const FIELD_TYPES = TABS.fields.types;
export const BLOCK_TYPES = TABS.blocks.types;
export const PAGE_FIELD_TYPES = PageTABS.fields.types;
export const PAGE_BLOCK_TYPES = PageTABS.blocks.types;
export const PAGE_THIRDPARTY_TYPES = PageTABS.thirdParty.types;

export const ALL_TYPES = [...FIELD_TYPES, ...BLOCK_TYPES];
export const PAGE_BLOCK_ALL_TYPES = [
  ...PAGE_FIELD_TYPES,
  ...PAGE_BLOCK_TYPES,
  ...PAGE_THIRDPARTY_TYPES,
];

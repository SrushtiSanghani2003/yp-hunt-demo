import React from "react";
import Text from "./Text";
import ButtonCTA from "./ButtonCTA";
import Promotions from "./Promotions";
import Image from "./Image";
import Video from "./Video";
import Testimonial from "./Testimonial";
import Faq from "./Faq";
import Gallery from "./Gallery";
// import BentoBox from "./bentobox/BentoBox";
import NewsBlock from "./NewsBlock";
import VideoBlock from "./VideosBlock";
import Partners from "./Partners";
import SocialWall from "./SocialWall";
import type { BlockTypeProps } from "./changeBlockTypes";
import ArticlesBlock from "./ArticlesBlock";
import AlbumsBlock from "./AlbumsBlock";
import ShopBlock from "./ShopBlock";
import AdvertisementsBlock from "./Advertisements/AdvertisementsBlock";
import TeamBlock from "./TeamBlock";
import ContactBlock from "./ContactBlock";
import TCardBlock from "./TCardBlock";
import QuoteBlock from "./QuoteBlock";
import FeedBackBlock from "./FeedBackBlock";
import TimeLineBlock from "./TimeLineBlock";
import DocumentBlock from "./DocumentsBlock/DocumentBlock";
import MeetingsBlock from "./MeetingsBlock";
import MembershipBlock from "./MembershipBlock";
import EventBlock from "./EventBlock";
import OurspacesBlock from "./OurspacesBlock";
import GenerationBlock from "./GenerationBlock";
import TournamentsBlock from "./TournamentsBlock";
import ScheduleBlock from "./ScheduleBlock";
import PlayersBlock from "./PlayersBlock";
import TournamentInfoBlock from "./TournamentInfoBlock";
import QuickLinks from "./QuickLinks";
import PadelZone from "./PadelZone";
import OfficialAppBlock from "./OfficialAppBlock";
import ForYouBlock from "./ForYouBlock";
import RaceToTheFinals from "./RaceToTheFinals";
import PlayerDetails from "./PlayerDetails";
import PlayerCareers from "./PlayerCareers";
import TextAndMedia from "./TextAndMedia";
import TicketsBlock from "./TicketsBlock";
import MatchCentreBlock from "./MatchCentreBlock";
import MatchStatsBlock from "./MatchStatsBlock";
import HeadToHeadBlock from "./HeadToHeadBlock";
import MixMediaBlock from "./MixMediaBlock";
import PremierPredictBlock from "./PremierPredictBlock";
import AllJobsBlock from "./AllJobsBlock";
import WhereToWatchBlock from "./WhereToWatchBlock";
import WhereToWatchInfoBlock from "./WhereToWatchInfoBlock";
import FullCalendarBlock from "./FullCalendarBlock";
import PlayerInfoBlock from "./PlayerInfoBlock";
import VideoVerticalBlock from "./VideoVerticalBlock";
import AboutInfoBlock from "./AboutInfoBlock";
import TournamentHeroBlock from "./TournamentHeroBlock";
import PlayerSeasonsBlock from "./PlayerSeasonsBlock";

const BlockFactory: Record<string, React.ComponentType<BlockTypeProps>> = {
  text: Text,
  cta: ButtonCTA,
  promotions: Promotions,
  image: Image,
  video: Video,
  testimonials: Testimonial,
  faq: Faq,
  gallery: Gallery,
  // bentoBox: BentoBox,
  news: NewsBlock,
  videos: VideoBlock,
  partners: Partners,
  socialWall: SocialWall,
  articles: ArticlesBlock,
  albums: AlbumsBlock,
  shop: ShopBlock,
  advertisement: AdvertisementsBlock,
  team: TeamBlock,
  contact: ContactBlock,
  tCard: TCardBlock,
  quote: QuoteBlock,
  feedback: FeedBackBlock,
  timeline: TimeLineBlock,
  document: DocumentBlock,
  meetings: MeetingsBlock,
  membership: MembershipBlock,
  event: EventBlock,
  ourspaces: OurspacesBlock,
  generation: GenerationBlock,
  tournaments: TournamentsBlock,
  tournamenthero: TournamentHeroBlock,
  player_seasons: PlayerSeasonsBlock,
  schedule: ScheduleBlock,
  players: PlayersBlock,
  tournamentInfo: TournamentInfoBlock,
  quickLinks: QuickLinks,
  padelzone: PadelZone,
  officialApp: OfficialAppBlock,
  foryou: ForYouBlock,
  race_to_finals: RaceToTheFinals,
  playerDetails: PlayerDetails,
  playerCareers: PlayerCareers,
  "text_&_media": TextAndMedia,
  tickets: TicketsBlock,
  match_centre: MatchCentreBlock,
  match_stats: MatchStatsBlock,
  head_to_head: HeadToHeadBlock,
  mix_media: MixMediaBlock,
  premier_predict: PremierPredictBlock,
  // match_highlights: MatchHighlightsBlock,
  all_jobs: AllJobsBlock,
  where_to_watch: WhereToWatchBlock,
  where_to_watch_more: WhereToWatchInfoBlock,
  fullCalendar: FullCalendarBlock,
  player_info: PlayerInfoBlock,
  video_vertical: VideoVerticalBlock,
  about_info: AboutInfoBlock,
};

export default BlockFactory;

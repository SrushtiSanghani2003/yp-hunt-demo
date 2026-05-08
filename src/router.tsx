import { createBrowserRouter, Navigate } from "react-router-dom";
import { paths } from "./config/paths";
// import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import ContentMediaLayout from "./components/contentmedia/ContentMediaLayout";
import ScrollToTop from "./components/ScrollToTop";
import VerificationCode from "./auth/VerificationCode";
import PermissionsTable from "./components/account-settings/RolePermission";
import Contactus from "./components/contactus/contactus";
import NewsLetter from "./components/newsletter/newsletter";
import CraeteMembership from "./components/membership/CreateMembership";
import Allusers from "./components/allusers/allusers";
import OurSpaces from "./components/ourspaces/ourspaces";
import Createourspaces from "./components/ourspaces/Createourspaces";
import CreateModuleGroup from "./components/account-settings/module/CreateModuleGroup";
import AirportListing from "./components/airport/AirportListing";
import AirportUpdate from "./components/airport/CreateAirport";
import EditPortalUser from "./components/portaluser/EditPortalUser";
import MainLayout from "./components/layouts/MainLayout";
import { lazyWithRetry } from "./utils/lazyWithRetry";
import RouteErrorPage from "./components/RouterErrorPage";
// const PublicRoute = lazyWithRetry(() => import("./PublicRoute"));
const Login = lazyWithRetry(() => import("./auth/login"));
const ResetPassword = lazyWithRetry(() => import("./auth/ResetPassword"));
const ForgotPassword = lazyWithRetry(() => import("./auth/forgotPassword"));
const CreatePassword = lazyWithRetry(() => import("./auth/CreatePassword"));
const NotFound = lazyWithRetry(() => import("./components/not-found/notFound"));
const HomeContent = lazyWithRetry(() => import("./components/Dashboard"));
const News = lazyWithRetry(() => import("./components/news/News"));
const CreateNews = lazyWithRetry(() => import("./components/news/CreateNews"));
const Articles = lazyWithRetry(() => import("./components/articles/Articles"));
const Videos = lazyWithRetry(() => import("./components/videos/Videos"));
const Photos = lazyWithRetry(() => import("./components/photos/Photos"));
const ShopCreate = lazyWithRetry(() => import("./components/shop/ShopCreate"));
const MatchListing = lazyWithRetry(
  () => import("./components/matches/MatchListing"),
);
const EditUser = lazyWithRetry(() => import("./components/allusers/EditUser"));
const PortalUser = lazyWithRetry(
  () => import("./components/portaluser/PortalUser"),
);
const UsersViewPage = lazyWithRetry(
  () => import("./components/allusers/UsersViewPage"),
);
const CreateCountry = lazyWithRetry(
  () => import("./components/Country/CreateCountry"),
);
const EditTournamentInfo = lazyWithRetry(
  () => import("./components/tournaments/EditTournamentInfo"),
);
const CountryListing = lazyWithRetry(
  () => import("./components/Country/CountryListing"),
);
const UploadCsvPage = lazyWithRetry(
  () => import("./components/TravelRequest/CSV/UploadCsvPage"),
);
const PortalUsersViewPage = lazyWithRetry(
  () => import("./components/portaluser/PortalUsersViewPage"),
);
const EditPlayers = lazyWithRetry(
  () => import("./components/players/EditPlayers"),
);
// const ErrorBoundary = lazyWithRetry(() => import("./components/ErrorBoundary"));
const FlightEdit = lazyWithRetry(
  () => import("./components/TravelRequest/flight/FlightEdit"),
);
const AccreditationEdit = lazyWithRetry(
  () => import("./components/TravelRequest/accreditation/AccreditationEdit"),
);
const AccommodationEdit = lazyWithRetry(
  () => import("./components/TravelRequest/accommodation/AccommodationEdit"),
);
const TransportationEdit = lazyWithRetry(
  () => import("./components/TravelRequest/transportation/TransportationEdit"),
);
const FlightListing = lazyWithRetry(
  () => import("./components/TravelRequest/flight/FlightListing"),
);
const AccreditationListing = lazyWithRetry(
  () => import("./components/TravelRequest/accreditation/AccreditationListing"),
);
const AccommodationListing = lazyWithRetry(
  () => import("./components/TravelRequest/accommodation/AccommodationListing"),
);
const TransportationListing = lazyWithRetry(
  () =>
    import("./components/TravelRequest/transportation/TransportationListing"),
);

const CreateConversationGroup = lazyWithRetry(
  () => import("./components/conversation/CreateConversationGroup"),
);
const ConversationGroupListing = lazyWithRetry(
  () => import("./components/conversation/ConversationGroupListing"),
);
const CreateConversation = lazyWithRetry(
  () => import("./components/conversation/CreateConversation"),
);
const ConversationListing = lazyWithRetry(
  () => import("./components/conversation/ConversationListing"),
);
const CreateWebsiteNavigation = lazyWithRetry(
  () => import("./components/ui/websitenavigation/NavigationForm"),
);
const WebsiteNavigation = lazyWithRetry(
  () => import("./components/ui/websitenavigation/WebsiteNavigation"),
);
const JobApplicationsListing = lazyWithRetry(
  () => import("./components/jobs/JobApplicationsListing"),
);
const CreateDocumentation = lazyWithRetry(
  () => import("./components/documentation/CreateDocumentation"),
);
const DocumentationListing = lazyWithRetry(
  () => import("./components/documentation/DocumentationListing"),
);
const CreateAnnouncement = lazyWithRetry(
  () => import("./components/permission/CreateAnnouncement"),
);
const AnnouncementListing = lazyWithRetry(
  () => import("./components/permission/AnnouncementListing"),
);

const GroupModule = lazyWithRetry(
  () => import("./components/account-settings/module/GroupModule"),
);
const CreatePermissions = lazyWithRetry(
  () => import("./components/account-settings/module/CreatePermissions"),
);
const CreateModule = lazyWithRetry(
  () => import("./components/account-settings/module/CreateModule"),
);
const Modual = lazyWithRetry(
  () => import("./components/account-settings/module/Module"),
);
const TournamentTransportDetails = lazyWithRetry(
  () => import("./components/tournaments/TournamentTransportDetails"),
);
const PremierPredict = lazyWithRetry(
  () => import("./components/premierPredict/PremierPredict"),
);
// const ProductListing = lazyWithRetry(() => import("./components/shop/ProductListing"));
// const ProductCreate = lazyWithRetry(() => import("./components/shop/ProductCreate"));

const AccountLayout = lazyWithRetry(
  () => import("./components/account-settings/AccountLayout"),
);
const EditProfile = lazyWithRetry(
  () => import("./components/account-settings/EditProfile"),
);
const ProfileView = lazyWithRetry(
  () => import("./components/account-settings/ProfileView"),
);
const TagManagement = lazyWithRetry(
  () => import("./components/account-settings/TagManagement"),
);
const Categories = lazyWithRetry(
  () => import("./components/account-settings/Categories"),
);
const AccountsManagement = lazyWithRetry(
  () => import("./components/account-settings/AccountsManagement"),
);
const RolesManagement = lazyWithRetry(
  () => import("./components/account-settings/RolesManagement"),
);

const CreateArticles = lazyWithRetry(
  () => import("./components/articles/CreateArticles"),
);
const AllContentMedia = lazyWithRetry(
  () => import("./components/contentmedia/AllContentMedia"),
);
const ContentMediaFolder = lazyWithRetry(
  () => import("./components/contentmedia/ContentMediaFolder"),
);
const PredictorListing = lazyWithRetry(
  () => import("./components/gameZone/PredictorListing"),
);
const PredictorCreate = lazyWithRetry(
  () => import("./components/gameZone/PredictorCreate"),
);
const PredictionOptionCreate = lazyWithRetry(
  () => import("./components/gameZone/PredictionOptionCreate"),
);
const EventTypeListing = lazyWithRetry(
  () => import("./components/event/EventTypeListing"),
);

const QuizCreate = lazyWithRetry(
  () => import("./components/gameZone/QuizCreate"),
);
const QuizOptionCreate = lazyWithRetry(
  () => import("./components/gameZone/QuizOptionCreate"),
);
const ShopListing = lazyWithRetry(
  () => import("./components/shop/ShopListing"),
);
const WhereToWatchListing = lazyWithRetry(
  () => import("./components/whereToWatch/WhereToWatchListing"),
);
const WhereToWatchCreate = lazyWithRetry(
  () => import("./components/whereToWatch/WhereToWatchCreate"),
);
// const EventTypeCreate = lazyWithRetry(
//   () => import("./components/event/EventTypeCreate")
// );
const EventListing = lazyWithRetry(
  () => import("./components/event/EventListing"),
);
const EventCreate = lazyWithRetry(
  () => import("./components/event/EventCreate"),
);
const QuizListing = lazyWithRetry(
  () => import("./components/gameZone/QuizListing"),
);
const ImageView = lazyWithRetry(() => import("./components/photos/ImageView"));
const CreateVideos = lazyWithRetry(
  () => import("./components/videos/CreateVideos"),
);
const Pages = lazyWithRetry(() => import("./components/page/Pages"));
const CreatePages = lazyWithRetry(
  () => import("./components/page/CreatePages"),
);
const Players = lazyWithRetry(() => import("./components/players/Players"));
const Tournaments = lazyWithRetry(
  () => import("./components/fixersAndresults/Tournaments"),
);
const Teams = lazyWithRetry(
  () => import("./components/fixersAndresults/Teams"),
);
const Matches = lazyWithRetry(
  () => import("./components/fixersAndresults/Matches"),
);
const Tickets = lazyWithRetry(() => import("./components/tickets/Tickets"));
const Membership = lazyWithRetry(
  () => import("./components/membership/Membership"),
);
const LiveBlog = lazyWithRetry(() => import("./components/liveblog/LiveBlog"));
const Templates = lazyWithRetry(
  () => import("./components/templates/Templates"),
);
const Settings = lazyWithRetry(() => import("./components/settings/Settings"));
const CommonPartners = lazyWithRetry(
  () => import("./components/common-partners/CommonPartners"),
);
const LanguageLocalization = lazyWithRetry(
  () => import("./components/languageLocalization/LanguageLocalization"),
);
const JobListing = lazyWithRetry(() => import("./components/jobs/JobListing"));
const CreateJob = lazyWithRetry(() => import("./components/jobs/CreateJob"));
const JobCategories = lazyWithRetry(
  () => import("./components/jobs/JobCategories"),
);
const TournamentsList = lazyWithRetry(
  () => import("./components/tournaments/TournamentsList"),
);
const EditTournaments = lazyWithRetry(
  () => import("./components/tournaments/EditTournaments"),
);
const VideoGroupsList = lazyWithRetry(
  () => import("./components/videoGroups/VideoGroupsList"),
);
const VideoView = lazyWithRetry(
  () => import("./components/videoGroups/VideosView"),
);

export const createAppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={paths.dashboard.path} />,
    errorElement: <RouteErrorPage />,
  },
  // {
  //   element: <PublicRoute />,
  //   children: [
  //     {
  //       path: paths.auth.login.path,
  //       element: <Login />,
  //     },
  //     {
  //       path: paths.auth.resetpassword.path,
  //       element: <ResetPassword />,
  //     },
  //     {
  //       path: paths.auth.verification.path,
  //       element: <VerificationCode />,
  //     },
  //     {
  //       path: paths.auth.forgotPassword.path,
  //       element: <ForgotPassword />,
  //     },
  //     {
  //       path: paths.auth.resetPassword.path,
  //       element: <CreatePassword />,
  //     },
  //   ],
  // },
  {
    path: paths.auth.login.path,
    element: <Login />,
  },
  {
    path: paths.auth.resetpassword.path,
    element: <ResetPassword />,
  },
  {
    path: paths.auth.verification.path,
    element: <VerificationCode />,
  },
  {
    path: paths.auth.forgotPassword.path,
    element: <ForgotPassword />,
  },
  {
    path: paths.auth.resetPassword.path,
    element: <CreatePassword />,
  },
  {
    element: <ProtectedRoute />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        element: (
          <>
            <MainLayout />
            <ScrollToTop />
          </>
        ),
        errorElement: <RouteErrorPage />,
        children: [
          {
            path: paths.dashboard.path,
            element: <HomeContent />,
          },
          {
            path: paths.navigation.path,
            element: <WebsiteNavigation />,
          },
          {
            path: paths.navigation.create.path,
            element: <CreateWebsiteNavigation />,
          },
          {
            path: paths.navigation.edit.path,
            element: <CreateWebsiteNavigation />,
          },
          {
            path: paths.media.news.path,
            element: <News />,
          },
          {
            path: paths.media.news.create.path,
            element: <CreateNews />,
          },
          {
            path: paths.media.news.edit.path,
            element: <CreateNews />,
          },
          {
            path: paths.media.articles.path,
            element: <Articles />,
          },
          {
            path: paths.media.articles.create.path,
            element: <CreateArticles />,
          },
          {
            path: paths.media.articles.edit.path,
            element: <CreateArticles />,
          },
          {
            path: paths.media.videos.path,
            element: <Videos />,
          },
          {
            path: paths.media.videos.create.path,
            element: <CreateVideos />,
          },
          {
            path: paths.media.videos.edit.path,
            element: <CreateVideos />,
          },
          {
            path: paths.media.photos.path,
            element: <Photos />,
          },
          {
            path: paths.media.photos.view.path,
            element: <ImageView />,
          },
          {
            path: paths.account.path,
            element: <AccountLayout />,
            children: [
              {
                index: true,
                element: <ProfileView />,
              },
              {
                path: "edit",
                element: <EditProfile />,
              },
              {
                path: "tags",
                element: <TagManagement />,
              },
              {
                path: "categories",
                element: <Categories />,
              },
              {
                path: "manage",
                element: <AccountsManagement />,
              },
              {
                path: "roles",
                element: <RolesManagement />,
              },
              {
                path: "module",
                element: <Modual />,
              },
              {
                path: "module/create",
                element: <CreateModule />,
              },
              {
                path: "module/edit/:id",
                element: <CreateModule />,
              },
              {
                path: "module/permissions/:id",
                element: <CreatePermissions />,
              },
              {
                path: "groupmodule",
                element: <GroupModule />,
              },
              {
                path: "groupmodule/create",
                element: <CreateModuleGroup />,
              },
              {
                path: "groupmodule/edit/:id",
                element: <CreateModuleGroup />,
              },
            ],
          },
          {
            path: paths.ContentMedia.path,
            element: <ContentMediaLayout />,
            children: [
              {
                index: true,
                element: <AllContentMedia />,
              },
              {
                path: paths.ContentMedia.folder.path,
                element: <ContentMediaFolder />,
              },
            ],
          },
          {
            path: paths.pages.path,
            element: <Pages />,
          },
          {
            path: paths.pages.create.path,
            element: <CreatePages />,
          },
          {
            path: paths.pages.edit.path,
            element: <CreatePages />,
          },
          {
            path: paths.rolePermission.path,
            element: <PermissionsTable />,
          },
          // {
          //   path: paths.module.create.path,
          //   element: <CreateModule />,
          // },
          // {
          //   path: paths.module.edit.path,
          //   element: <CreateModule />,
          // },
          // {
          //   path: paths.module.permissions.path,
          //   element: <CreatePermissions />,
          // },
          // {
          //   path: paths.groupmodule.create.path,
          //   element: <CreateModuleGroup />,
          // },
          // {
          //   path: paths.groupmodule.edit.path,
          //   element: <CreateModuleGroup />,
          // },
          {
            path: paths.gamezone.quiz.path,
            element: <QuizListing />,
          },
          {
            path: paths.gamezone.quiz.create.path,
            element: <QuizCreate />,
          },
          {
            path: paths.gamezone.quiz.edit.path,
            element: <QuizCreate />,
          },
          {
            path: paths.gamezone.quiz.option.create.path,
            element: <QuizOptionCreate />,
          },
          {
            path: paths.gamezone.predictor.path,
            element: <PredictorListing />,
          },
          {
            path: paths.gamezone.predictor.create.path,
            element: <PredictorCreate />,
          },
          {
            path: paths.gamezone.predictor.option.create.path,
            element: <PredictionOptionCreate />,
          },
          {
            path: paths.gamezone.predictor.edit.path,
            element: <PredictorCreate />,
          },
          {
            path: paths.events.type.path,
            element: <EventTypeListing />,
          },

          {
            path: paths.events.event.path,
            element: <EventListing />,
          },
          {
            path: paths.events.event.create.path,
            element: <EventCreate />,
          },
          {
            path: paths.events.event.edit.path,
            element: <EventCreate />,
          },
          {
            path: paths.shop.path,
            element: <ShopListing />,
          },
          {
            path: paths.shop.create.path,
            element: <ShopCreate />,
          },
          {
            path: paths.shop.edit.path,
            element: <ShopCreate />,
          },
          {
            path: paths.shop.path,
            element: <ShopListing />,
          },

          {
            path: paths.airport.path,
            element: <AirportListing />,
          },
          {
            path: paths.airport.create.path,
            element: <AirportUpdate />,
          },
          {
            path: paths.airport.edit.path,
            element: <AirportUpdate />,
          },

          // {
          //   path: paths.shops.path,
          //   element: <ShopListing />,
          // },
          // {
          //   path: paths.shops.shop.create.path,
          //   element: <ShopCreate />,
          // },
          // {
          //   path: paths.shops.shop.edit.path,
          //   element: <ShopCreate />,
          // },
          // {
          //   path: paths.shops.product.path,
          //   element: <ProductListing />,
          // },
          // {
          //   path: paths.shops.product.create.path,
          //   element: <ProductCreate />,
          // },
          // {
          //   path: paths.shops.product.edit.path,
          //   element: <ProductCreate />,
          // },

          {
            path: paths.users.allusers.path,
            element: <Allusers />,
          },
          {
            path: paths.users.allusers.edit.path,
            element: <EditUser />,
          },
          {
            path: paths.users.allusers.view.path,
            element: <UsersViewPage />,
          },

          {
            path: paths.users.portaluser.path,
            element: <PortalUser />,
          },
          {
            path: paths.users.portaluser.edit.path,
            element: <EditPortalUser />,
          },
          {
            path: paths.users.portaluser.view.path,
            element: <PortalUsersViewPage />,
          },
          {
            path: paths.users.contactus.path,
            element: <Contactus />,
          },

          {
            path: paths.users.newsLetter.path,
            element: <NewsLetter />,
          },

          {
            path: paths.players.path,
            element: <Players />,
          },
          {
            path: paths.players.edit.path,
            element: <EditPlayers />,
          },
          {
            path: paths.fixers.tournaments.path,
            element: <Tournaments />,
          },
          {
            path: paths.fixers.teams.path,
            element: <Teams />,
          },
          {
            path: paths.fixers.matches.path,
            element: <Matches />,
          },
          {
            path: paths.tickets.path,
            element: <Tickets />,
          },
          {
            path: paths.country.path,
            element: <CountryListing />,
          },
          {
            path: paths.country.create.path,
            element: <CreateCountry />,
          },
          {
            path: paths.country.edit.path,
            element: <CreateCountry />,
          },
          {
            path: paths.membership.path,
            element: <Membership />,
          },
          {
            path: paths.membership.create.path,
            element: <CraeteMembership />,
          },
          {
            path: paths.membership.edit.path,
            element: <CraeteMembership />,
          },

          {
            path: paths.ourspaces.path,
            element: <OurSpaces />,
          },
          {
            path: paths.ourspaces.create.path,
            element: <Createourspaces />,
          },
          {
            path: paths.ourspaces.edit.path,
            element: <Createourspaces />,
          },

          {
            path: paths.liveblog.path,
            element: <LiveBlog />,
          },
          {
            path: paths.templates.path,
            element: <Templates />,
          },
          {
            path: paths.settings.path,
            element: <Settings />,
          },
          {
            path: paths.commonPartners.path,
            element: <CommonPartners />,
          },
          {
            path: paths.languagelocalization.path,
            element: <LanguageLocalization />,
          },
          {
            path: paths.premierpredict.path,
            element: <PremierPredict />,
          },
          {
            path: paths.job.allJobs.path,
            element: <JobListing />,
          },
          {
            path: paths.job.allJobs.create.path,
            element: <CreateJob />,
          },
          {
            path: paths.job.allJobs.edit.path,
            element: <CreateJob />,
          },
          {
            path: paths.job.categories.path,
            element: <JobCategories />,
          },
          {
            path: paths.job.jobapplication.path,
            element: <JobApplicationsListing />,
          },
          {
            path: paths.tournaments.path,
            element: <TournamentsList />,
          },
          {
            path: paths.tournaments.edit.path,
            element: <EditTournaments />,
          },
          {
            path: paths.tournaments.transport.path,
            element: <TournamentTransportDetails />,
          },
          {
            path: paths.tournaments.info.path,
            element: <EditTournamentInfo />,
          },
          {
            path: paths.media.videoGroups.path,
            element: <VideoGroupsList />,
          },
          {
            path: paths.media.videoGroups.videos.path,
            element: <VideoView />,
          },
          {
            path: paths.wheretowatch.path,
            element: <WhereToWatchListing />,
          },
          {
            path: paths.wheretowatch.create.path,
            element: <WhereToWatchCreate />,
          },
          {
            path: paths.wheretowatch.edit.path,
            element: <WhereToWatchCreate />,
          },
          {
            path: paths.matches.path,
            element: <MatchListing />,
          },
          {
            path: paths.announcements.path,
            element: <AnnouncementListing />,
          },
          {
            path: paths.announcements.create.path,
            element: <CreateAnnouncement />,
          },
          {
            path: paths.announcements.edit.path,
            element: <CreateAnnouncement />,
          },
          {
            path: paths.documentation.path,
            element: <DocumentationListing />,
          },
          {
            path: paths.documentation.create.path,
            element: <CreateDocumentation />,
          },
          {
            path: paths.documentation.edit.path,
            element: <CreateDocumentation />,
          },
          {
            path: paths.conversation.path,
            element: <ConversationListing />,
          },
          {
            path: paths.conversation.create.path,
            element: <CreateConversation />,
          },
          {
            path: paths.conversation.edit.path,
            element: <CreateConversation />,
          },
          {
            path: paths.conversation.group.path,
            element: <ConversationGroupListing />,
          },
          {
            path: paths.conversation.group.create.path,
            element: <CreateConversationGroup />,
          },
          {
            path: paths.conversation.group.edit.path,
            element: <CreateConversationGroup />,
          },
          {
            path: paths.travelrequest.transportation.path,
            element: <TransportationListing />,
          },
          {
            path: paths.travelrequest.transportation.edit.path,
            element: <TransportationEdit />,
          },
          {
            path: paths.travelrequest.transportation.uploadCsv.path,
            element: <UploadCsvPage />,
          },
          {
            path: paths.travelrequest.accommodation.path,
            element: <AccommodationListing />,
          },
          {
            path: paths.travelrequest.accommodation.edit.path,
            element: <AccommodationEdit />,
          },
          {
            path: paths.travelrequest.accommodation.uploadCsv.path,
            element: <UploadCsvPage />,
          },
          {
            path: paths.travelrequest.accreditation.path,
            element: <AccreditationListing />,
          },
          {
            path: paths.travelrequest.accreditation.edit.path,
            element: <AccreditationEdit />,
          },
          {
            path: paths.travelrequest.accreditation.uploadCsv.path,
            element: <UploadCsvPage />,
          },
          {
            path: paths.travelrequest.flight.path,
            element: <FlightListing />,
          },
          {
            path: paths.travelrequest.flight.edit.path,
            element: <FlightEdit />,
          },
          {
            path: paths.travelrequest.flight.uploadCsv.path,
            element: <UploadCsvPage />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

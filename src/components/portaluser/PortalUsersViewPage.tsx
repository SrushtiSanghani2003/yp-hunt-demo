import { useParams, useNavigate } from "react-router-dom";
import {
  formatDate,
  formatBirthDate,
  concatImgURL,
} from "../../config/function";
import { useGetAppUser } from "../../hooks/allUser";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { mediaIcon } from "../../icons";
import { useScroll } from "../../hooks/ScrollContext";

const PortalUsersViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isScrolled } = useScroll();
  const { data, isLoading } = useGetAppUser(id);
  const user = data?.data;

  if (isLoading) {
    return (
      <div className="container mt-10">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-48 bg-gray-200 rounded" />
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex gap-6 mb-6">
              <div className="w-28 h-28 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-3">
                <div className="h-5 w-40 bg-gray-200 rounded" />
                <div className="h-4 w-60 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return <div className="p-6">User not found</div>;

  return (
    <div>
      {/* HEADER */}
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors ${
          isScrolled ? "bg-white border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Portal User Details"
          saveButtonText="Back"
          onSubmit={() => navigate(-1)}
        />
      </div>

      <div className="container">
        {/* PROFILE HERO */}
        <div className="bg-gradient-to-r from-yellow-100 to-white border border-primary/30 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-6 flex-wrap">
            <PhotoProvider maskOpacity={0.6}>
              {user.image ? (
                <PhotoView src={concatImgURL(user.image)}>
                  <img
                    src={concatImgURL(user.image)}
                    className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-lg cursor-pointer"
                  />
                </PhotoView>
              ) : (
                <div className="w-28 h-28 rounded-full bg-white shadow flex items-center justify-center border">
                  <img src={mediaIcon} className="w-10 opacity-60" />
                </div>
              )}
            </PhotoProvider>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {user.first_name} {user.last_name}
              </h2>

              <p className="text-gray-500 mt-1">{user.email}</p>

              <div className="flex gap-2 mt-3 flex-wrap">
                {user.country_name && (
                  <span className="px-3 py-1 text-xs bg-white border rounded-full">
                    {user.country_name}
                  </span>
                )}

                {user.city_name && (
                  <span className="px-3 py-1 text-xs bg-white border rounded-full">
                    {user.city_name}
                  </span>
                )}

                {user.gender && (
                  <span className="px-3 py-1 text-xs bg-white border rounded-full">
                    {user.gender}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* USER INFO */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            User Information
          </h3>

          <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
            <InfoCard label="First Name" value={user.first_name} />
            <InfoCard label="Last Name" value={user.last_name} />
            <InfoCard label="Email" value={user.email} />
            <InfoCard label="Gender" value={user.gender} />
            {/* <InfoCard label="Login Type" value={user.login_type} /> */}
            {/* <InfoCard label="Role" value={user.role} /> */}
            <InfoCard label="Country Name" value={user.country_name} />
            <InfoCard label="City Name" value={user.city_name} />
            <InfoCard
              label="Phone Number"
              value={`+${user.phone_code} ${user.phone_number}`}
            />
            <InfoCard
              label="Birth Date"
              value={formatBirthDate(user.birth_date)}
            />
            {/* <InfoCard
              label="Signup From Device"
              value={user.is_signup ? "Yes" : "No"}
            /> */}
            <InfoCard label="Created At" value={formatDate(user.created_at)} />
          </div>
        </div>

        {/* PLAYERS */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Players</h3>

          {user.players?.length ? (
            <div className="flex flex-wrap gap-2">
              {user.players.map((p: any) => (
                <span
                  key={p.id}
                  className="px-3 py-1.5 bg-primary/20 text-black rounded-full text-sm font-medium   transition"
                >
                  {p.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No players assigned</p>
          )}
        </div>

        {/* TEAMS */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Teams</h3>

          {user.teams?.length ? (
            <div className="flex flex-wrap gap-2">
              {user.teams.map((t: any) => (
                <span
                  key={t.id}
                  className="px-3 py-1.5 bg-primary/20 text-black rounded-full text-sm font-medium  transition"
                >
                  {t.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No teams assigned</p>
          )}
        </div>
      </div>
    </div>
  );
};

/* INFO CARD */

const InfoCard = ({ label, value }: { label: string; value: any }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 transition hover:bg-white hover:shadow-md">
    <p className="text-sm uppercase tracking-wide text-gray-400 mb-1">
      {label}
    </p>

    <p className="text-base font-bold text-black">{value || "-"}</p>
  </div>
);

export default PortalUsersViewPage;

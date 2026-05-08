import { useNavigate } from "react-router-dom";
import { capitalize, concatImgURL, formatDate } from "../../config/function";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import ContentHeader from "../Subnavbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import Button from "../ui/button";
import {
  chevronDown,
  correctIconGreen,
  mediaIcon,
  penIcon,
  spanishFlag,
  usaFlag,
} from "../../icons";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { usePlayerslist } from "../../hooks/usePlayers";
import { useDebounce } from "../../hooks/useDebounce";
import Pagination from "../ui/pagination";
import { selectMenuPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { getPermissionFlags } from "../sidebar/menuPermissions";
import {
  selectListingState,
  setListingState,
} from "../../redux-toolkit/moduleListingSearchSlice";
import { useScroll } from "../../hooks/ScrollContext";
const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  { title: "Featured Image", minWidth: "min-w-32 w-32" },
  { title: "Headshot Image", minWidth: "min-w-32 w-32" },
  { title: "First Name", minWidth: "min-w-40 w-40" },
  { title: "Last Name", minWidth: "min-w-40 w-40" },
  { title: "Player ID", minWidth: "min-w-28 w-28" },
  { title: "Ranking", minWidth: "min-w-28 w-28" },
  { title: "Gender", minWidth: "min-w-28 w-28" },
  { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Languages", minWidth: "min-w-20 w-20" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];
const Players = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const module = "players";
  const listingState = useSelector(selectListingState(module));
  const [allPlayers, setAllPlayers] = useState([]);
  const [page, setPage] = useState(listingState.page || 1);
  const [searchInput, setSearchInput] = useState<string>(
    listingState.search || "",
  );
  const debouncedSearch = useDebounce(searchInput, 300);
  const [gender, setGender] = useState<any>(listingState.filters.gender || "");
  const defaultVisibleColumns = [
    "ID",
    "Headshot Image",
    "First Name",
    "Last Name",
    "Gender",
    // "Categories",
    // "Sponsor",
    // "Geo Country",
    "Created At",
    "Languages",
    "Action",
  ];
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [tempVisibleColumns, setTempVisibleColumns] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const menuPermissions = useSelector(selectMenuPermissions);
  const { isUpdate } = getPermissionFlags(menuPermissions.players);
  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadCrumbsItem = [
    { id: null, name: "Home" },
    ...pathParts.map((part, index) => ({
      id: "/" + pathParts?.slice(0, index + 1).join("/"),
      name: capitalize(part),
    })),
  ];
  const handleBreadcrumbClick = (id: string | null, index: number) => {
    dispatch(popToIndex(index));
    navigate(id ? `` : `/dashboard`);
  };
  const handleTranslationClick = async (pagesId: string, lang: "en" | "es") => {
    navigate(`/players/edit/${pagesId}?lang=${lang}`);
  };
  const { data: allPlayersData, isFetching } = usePlayerslist(
    page,
    debouncedSearch,
    gender,
    false,
  );
  const totalPages = useMemo(() => {
    return allPlayersData?.totalPages || 1;
  }, [allPlayersData?.totalPages]);

  const toggleDropdown = () => {
    setTempVisibleColumns([
      ...new Set([...visibleColumns, ...defaultVisibleColumns]),
    ]);
    setShowDropdown((prev) => !prev);
  };
  const closeDropdown = () => {
    // Reset tempVisibleColumns to current visibleColumns, ensuring defaults are included
    setTempVisibleColumns([
      ...new Set([...visibleColumns, ...defaultVisibleColumns]),
    ]);
    setShowDropdown(false);
  };

  const applyColumnChanges = () => {
    setVisibleColumns([
      ...new Set([...tempVisibleColumns, ...defaultVisibleColumns]),
    ]);
    setShowDropdown(false);
  };
  const handleTempToggle = (title: string) => {
    if (defaultVisibleColumns.includes(title)) {
      return; // Do nothing if trying to toggle a default column
    }
    setTempVisibleColumns((prev) =>
      prev.includes(title)
        ? prev.filter((col) => col !== title)
        : [...prev, title],
    );
  };
  const handleEditPlayer = (id: number) => {
    if (!id) return;
    navigate(`/players/edit/${id}`, {
      state: {
        fromPage: page, // 👈 send current pagination page
        fromSearch: searchInput, // current search
      },
    });
  };
  useEffect(() => {
    if (allPlayersData?.players) {
      setAllPlayers(allPlayersData?.players || []);
    }
  }, [allPlayersData]);

  useEffect(() => {
    if (debouncedSearch) {
      setPage(1);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    dispatch(
      setListingState({
        module,
        page,
        search: searchInput,
        filters: { gender },
      }),
    );
  }, [page, searchInput, gender]);
  return (
    <div>
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <ContentHeader
          title="Players"
          breadCrumbsItem={breadCrumbsItem}
          onBreadCrumbClick={handleBreadcrumbClick}
          // onCreate={handleCreate}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          showDropdown={showDropdown}
          columns={columns}
          tempVisibleColumns={tempVisibleColumns}
          toggleDropdown={toggleDropdown}
          handleTempToggle={handleTempToggle}
          closeDropdown={closeDropdown}
          applyColumnChanges={applyColumnChanges}
          defaultVisibleColumns={defaultVisibleColumns}
        />
      </div>
      <div className="container flex justify-end items-center mt-3">
        <div className="relative w-52">
          <select
            id="language"
            value={gender ?? ""}
            onChange={(e) => {
              setGender(e.target.value);
              setPage(1);
            }}
            className="appearance-none w-full md:p-[7px] p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
          >
            <option value="all">All Players</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
            <img src={chevronDown} />
          </div>
        </div>
      </div>
      <div className="container overflow-x-auto my-3">
        <table className="min-w-full table-fixed border-separate border-spacing-y-2 ">
          <thead className="text-left">
            <tr>
              {columns
                .filter((col) => visibleColumns.includes(col.title))
                .map((col) => (
                  <th
                    key={col.title}
                    className={`p-2 ps-0 text-black font-normal ${col.minWidth}`}
                  >
                    {col.title === "Languages" ? (
                      <div className="flex items-center justify-center gap-2">
                        <img src={usaFlag} alt="flags" className="w-6 h-5" />
                        <img
                          src={spanishFlag}
                          alt="flags"
                          className="w-5 h-4"
                        />
                      </div>
                    ) : (
                      <span
                        className={`${
                          col.title === "Action"
                            ? "flex items-center justify-center gap-1"
                            : ""
                        } opacity-40 break-words whitespace-normal block text-left  ${
                          col.title === "ID" ? "ps-2" : ""
                        }`}
                      >
                        {col.title}
                      </span>
                    )}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {isFetching ? (
              <>
                {[...Array(8)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={columns.length}>
                      <div className="animate-pulse bg-white border  border-primary rounded-2xl p-4">
                        <div className="flex w-full gap-4">
                          {columns
                            .filter((col) => visibleColumns.includes(col.title))
                            .map((col, j) => (
                              <div
                                key={j}
                                className={`${col.minWidth} h-5 bg-gray-200 rounded`}
                              ></div>
                            ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ) : allPlayers.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No player data available.
                  </div>
                </td>
              </tr>
            ) : (
              (allPlayers as any[])?.map((player, index) => {
                return (
                  <tr key={player?.id} className="">
                    <td colSpan={visibleColumns.length}>
                      <div className="hover:bg-gray-100 transition bg-white border border-primary rounded-xl py-2 max-h-fit  h-24">
                        <table className="w-full">
                          <thead>
                            <tr>
                              {columns
                                .filter((col) =>
                                  visibleColumns.includes(col.title),
                                )
                                .map((col) => (
                                  <th
                                    key={col.title}
                                    className={`${col.minWidth}`}
                                  ></th>
                                ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {visibleColumns.includes("ID") && (
                                <td className="text-base text-left ps-3">
                                  {index + 1}
                                </td>
                              )}
                              {visibleColumns.includes("Featured Image") && (
                                <td className="text-base cursor-pointer">
                                  <PhotoProvider maskOpacity={0.6}>
                                    <PhotoView
                                      src={concatImgURL(player.hero_image_url)}
                                    >
                                      {player.hero_image_url ? (
                                        <img
                                          src={concatImgURL(
                                            player.hero_image_url,
                                          )}
                                          className="w-20 h-14 object-cover rounded-xl"
                                          alt="Hero Image"
                                        />
                                      ) : (
                                        <div className="w-20 h-14 bg-f6f6f6 border-0.5 border-primary rounded-xl flex justify-center items-center">
                                          <img
                                            src={mediaIcon}
                                            alt="Placeholder"
                                          />
                                        </div>
                                      )}
                                    </PhotoView>
                                  </PhotoProvider>
                                </td>
                              )}
                              {visibleColumns.includes("Headshot Image") && (
                                <td className="text-base cursor-pointer">
                                  <PhotoProvider maskOpacity={0.6}>
                                    <PhotoView
                                      src={concatImgURL(
                                        player.profile_image_url,
                                      )}
                                    >
                                      {player.profile_image_url ? (
                                        <img
                                          src={concatImgURL(
                                            player.profile_image_url,
                                          )}
                                          className="w-20 h-14 object-cover rounded-xl"
                                          alt="Hero Image"
                                        />
                                      ) : (
                                        <div className="w-20 h-14 bg-f6f6f6 border-0.5 border-primary rounded-xl flex justify-center items-center">
                                          <img
                                            src={mediaIcon}
                                            alt="Placeholder"
                                          />
                                        </div>
                                      )}
                                    </PhotoView>
                                  </PhotoProvider>
                                </td>
                              )}
                              {visibleColumns.includes("First Name") && (
                                <td className="text-base text-left">
                                  <p className="w-40 line-clamp-1">
                                    {player.first_name
                                      ? player.first_name
                                      : "-"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Last Name") && (
                                <td className="text-base text-left">
                                  <p className="w-40 line-clamp-1">
                                    {player.last_name ? player.last_name : "-"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Player ID") && (
                                <td className="text-base text-left">
                                  <p className="w-24 line-clamp-1 capitalize">
                                    {player.external_player_id
                                      ? player.external_player_id
                                      : "-"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Ranking") && (
                                <td className="text-base text-left">
                                  <p className="w-24 line-clamp-1 capitalize">
                                    {player.ranking ? player.ranking : "-"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Gender") && (
                                <td className="text-base text-left">
                                  <p className="w-24 line-clamp-1 capitalize">
                                    {player.gender ? player.gender : "-"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Created At") && (
                                <td className="text-base text-left">
                                  {formatDate(player.created_at)}
                                </td>
                              )}
                              {visibleColumns.includes("Languages") && (
                                <td className="">
                                  <div className="flex items-center justify-center gap-2">
                                    <Button
                                      backgroundColor="transparent"
                                      className={`p-0 ${
                                        !isUpdate &&
                                        "opacity-50 cursor-not-allowed"
                                      }`}
                                      icon={
                                        player.languages.includes("en")
                                          ? correctIconGreen
                                          : penIcon
                                      }
                                      onClick={() =>
                                        handleTranslationClick(player?.id, "en")
                                      }
                                      disabled={!isUpdate}
                                    />
                                    <Button
                                      backgroundColor="transparent"
                                      className={`p-0 ${
                                        !isUpdate &&
                                        "opacity-50 cursor-not-allowed"
                                      }`}
                                      icon={
                                        player.languages.includes("es")
                                          ? correctIconGreen
                                          : penIcon
                                      }
                                      onClick={() =>
                                        handleTranslationClick(player?.id, "es")
                                      }
                                      disabled={!isUpdate}
                                    />
                                  </div>
                                </td>
                              )}
                              {visibleColumns.includes("Action") && (
                                <td className="">
                                  <div className="flex items-center justify-center gap-3">
                                    {/* <Button
                                      icon={eyeOpenIcon}
                                      backgroundColor="transparent"
                                      className={`p-0 ${
                                        !isView &&
                                        "opacity-50 cursor-not-allowed"
                                      }`}
                                      disabled={!isView}
                                    /> */}
                                    <Button
                                      icon={penIcon}
                                      backgroundColor="transparent"
                                      className={`p-0 ${
                                        !isUpdate &&
                                        "opacity-50 cursor-not-allowed"
                                      }`}
                                      onClick={() =>
                                        handleEditPlayer(player?.id)
                                      }
                                      disabled={!isUpdate}
                                    />
                                    {/* <Button
                                    icon={deleteIcon}
                                    backgroundColor="transparent"
                                    className="p-0"
                                    onClick={() => {
                                      setDeleteShow(true);
                                      setShopTypeId(String(player?.id));
                                    }}
                                  /> */}
                                  </div>
                                </td>
                              )}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {allPlayers.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default Players;

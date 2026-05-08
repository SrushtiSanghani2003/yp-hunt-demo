import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import api from "../../lib/api";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import Pagination from "../ui/pagination";
import { useDispatch, useSelector } from "react-redux";
import ContentHeader from "../Subnavbar";
import {
  capitalize,
  formatBirthDate,
  // extractYouTubeId,
  formatDate,
} from "../../config/function";

import { resetTags } from "../../redux-toolkit/tagSlice";

import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import { useDebounce } from "../../hooks/useDebounce";
// import Button from "../ui/button";
// import { deleteIcon } from "../../icons";
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import { showToast } from "../../utils/toastUtils";
import ExportDropdown from "./ExportDropdown";
import Button from "../ui/button";
import { eyeOpenIcon, penIcon } from "../../icons";
import { selectMenuPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { getPermissionFlags } from "../sidebar/menuPermissions";
import {
  selectListingState,
  setListingState,
} from "../../redux-toolkit/moduleListingSearchSlice";
import { useScroll } from "../../hooks/ScrollContext";

const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  // { title: "Image/Video", minWidth: "min-w-28 w-28" },
  { title: "Email", minWidth: "min-w-56 w-56" },
  { title: "First Name", minWidth: "min-w-28 w-28" },
  { title: "Last Name", minWidth: "min-w-28 w-28" },
  { title: "Gender", minWidth: "min-w-20 w-20" },
  { title: "Birth Date", minWidth: "min-w-40 w-40" },
  // { title: "Device", minWidth: "min-w-24 w-24" },
  { title: "Signup Type", minWidth: "min-w-24 w-24" },
  { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];

const Allusers = () => {
  const location = useLocation();
  const { isScrolled } = useScroll();
  const pathParts = location.pathname
    .split("/")
    .filter(Boolean)
    .map(capitalize);
  // const breadCrumbsItem = ["Home", ...pathParts];
  const breadCrumbsItem = [
    { id: null, name: "Home" },
    ...pathParts.map((part, index) => ({
      id: "/" + pathParts.slice(0, index + 1).join("/"),
      name: capitalize(part),
    })),
  ];
  const module = "alluser";
  const listingState = useSelector(selectListingState(module));
  const [allUsers, setallUsers] = useState([]);
  const [page, setPage] = useState(listingState.page);
  const defaultVisibleColumns = [
    "ID",
    "Email",
    "Last Name",
    "First Name",
    "Gender",
    "Signup Type",
    "Created At",
    "Action",
  ];
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [tempVisibleColumns, setTempVisibleColumns] = useState<string[]>([]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState<string>(
    listingState.search || "",
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<null | {
    id: number;
    title: string;
  }>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const menuPermissions = useSelector(selectMenuPermissions);
  const { isExport, isView, isUpdate } = getPermissionFlags(
    menuPermissions.all_users,
  );

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
  const debouncedSearch = useDebounce(searchInput, 300);

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

  const applyColumnChanges = () => {
    setVisibleColumns([
      ...new Set([...tempVisibleColumns, ...defaultVisibleColumns]),
    ]);
    setShowDropdown(false);
  };
  const handleViewUser = (id: number) => {
    if (!id) return;
    navigate(`/users/allusers/view/${id}`);
  };
  const getUsers = async ({
    queryKey,
  }: QueryFunctionContext<[string, number, string?]>) => {
    const [, currentPage, debouncedSearch] = queryKey;
    const params: Record<string, any> = {
      page: currentPage,
      limit: 8,
      user_type: "appuser",
    };
    if (debouncedSearch?.trim()) {
      params.search = debouncedSearch.trim();
    }
    return await api.get("/appuser", { params });
  };

  const { data: userData, isFetching } = useQuery({
    queryKey: ["allusers", page, debouncedSearch],
    queryFn: getUsers,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return userData?.data?.totalPages || 1;
  }, [userData?.data?.totalPages]);

  const totalUsers = useMemo(() => {
    return userData?.data?.totalDocs || 0;
  }, [userData?.data?.totalDocs]);

  const handleBreadcrumbClick = (id: string | null, index: number) => {
    dispatch(popToIndex(index));
    navigate(id ? `` : `/dashboard`);
  };

  const deleteUser = async (id: string) => {
    return await api.delete(`/appuser/${id}`);
  };
  const handleEditUser = (id: number) => {
    if (!id) return;
    navigate(`/users/allusers/edit/${id}`); // 🔁 change route as per your app
  };

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allusers"],
        exact: false,
      });
      showToast("User deleted successfully", "success");
      setShowDeleteModal(false);
      setSelectedUser(null);
    },
    onError: () => {
      console.error("Failed to delete user");
    },
  });

  const handleConfirmDelete = () => {
    if (selectedUser?.id) {
      deleteMutation.mutate(String(selectedUser.id));
    }
  };

  useEffect(() => {
    if (userData?.data?.users) {
      setallUsers(userData.data.users);
    }
  }, [userData]);

  useEffect(() => {
    dispatch(resetTags());
  }, []);

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
      }),
    );
  }, [page, searchInput]);

  return (
    <div>
      <div
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <ContentHeader
          title="All Users"
          breadCrumbsItem={breadCrumbsItem}
          onBreadCrumbClick={handleBreadcrumbClick}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          /** PROPS FOR FILTER VIEW **/
          showDropdown={showDropdown}
          toggleDropdown={toggleDropdown}
          closeDropdown={closeDropdown}
          columns={columns}
          tempVisibleColumns={tempVisibleColumns}
          handleTempToggle={handleTempToggle}
          applyColumnChanges={applyColumnChanges}
          defaultVisibleColumns={defaultVisibleColumns}
        />
      </div>

      <div className="container py-3 flex items-end justify-between mt-3">
        <div className="font-semibold text-lg flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-users-round w-6 h-6"
            aria-hidden="true"
          >
            <path d="M18 21a8 8 0 0 0-16 0"></path>
            <circle cx="10" cy="8" r="5"></circle>
            <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
          </svg>
          <span>
            Total : <span className="text-blue-600">{totalUsers}</span> Users
          </span>
        </div>
        <ExportDropdown
          model="user"
          user_type="appuser"
          isDisable={!isExport}
        />
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
                    {/* {col.title === "Languages" ? (
                  <div className="flex items-center justify-center gap-2">
                    <img src={usaFlag} alt="flags" className="w-6 h-5" />
                    <img src={franceFlag} alt="flags" className="w-5 h-4" />
                  </div>
                ) : ( */}
                    <span
                      className={`${
                        col.title === "Action"
                          ? "flex items-center justify-center gap-1"
                          : ""
                      } opacity-40 break-words whitespace-normal block text-left ${
                        col.title === "ID" ? "ps-2" : ""
                      }`}
                    >
                      {col.title}
                    </span>
                    {/* )} */}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {isFetching ? (
              <>
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={columns.length}>
                      <div className="animate-pulse bg-white border border-primary rounded-2xl p-4">
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
            ) : allUsers.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No data available.
                  </div>
                  {/* <div className="flex items-center justify-center mt-28">
                <Lottie
                  animationData={loadingAnimation}
                  style={{ width: "30%" }}
                />
              </div> */}
                </td>
              </tr>
            ) : (
              (allUsers as any[])?.map((users, index) => {
                // const videoUrl = news.hero_video_url;
                // const videoId = videoUrl ? extractYouTubeId(videoUrl) : null;
                // const isNativeUrl = videoUrl?.startsWith(
                //   "https://ip-cms-api.ypstagingserver.com"
                // );

                return (
                  <tr key={users?.id} className="">
                    <td colSpan={visibleColumns.length}>
                      <div className="hover:bg-gray-100 transition bg-white border border-primary rounded-[15px] py-2 max-h-fit h-24">
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
                              {/* {visibleColumns.includes("Image/Video") && (
                                                            <td className="text-base">
                                                                <PhotoProvider maskOpacity={0.6}>
                                                                    {news.hero_image_url ? (
                                                                        <PhotoView src={news.hero_image_url}>
                                                                            <img
                                                                                src={news.hero_image_url}
                                                                                className="w-20 h-14 object-cover rounded-xl cursor-pointer"
                                                                                alt="Video Thumbnail"
                                                                            />
                                                                        </PhotoView>
                                                                    ) : news.hero_media_thumbnail ? (
                                                                        <PhotoView
                                                                            src={news.hero_media_thumbnail}
                                                                        >
                                                                            <img
                                                                                src={news.hero_media_thumbnail}
                                                                                className="w-20 h-14 object-cover rounded-xl cursor-pointer"
                                                                                alt="Hero Image"
                                                                            />
                                                                        </PhotoView>
                                                                    ) : (
                                                                        <div className="w-20 h-14 bg-f6f6f6 border-0.5 border-primary rounded-xl flex justify-center items-center">
                                                                            <img
                                                                                src={mediaIcon}
                                                                                alt="Placeholder"
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </PhotoProvider>
                                                            </td>
                                                        )} */}
                              {visibleColumns.includes("Email") && (
                                <td className="text-base text-left">
                                  <p className="w-56 line-clamp-3 break-words">
                                    {users?.email || "-"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("First Name") && (
                                <td className="text-base text-left">
                                  <p className="w-24 line-clamp-3">
                                    {users?.first_name || "-"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Last Name") && (
                                <td className="text-base text-left">
                                  <p className="w-24 line-clamp-3">
                                    {users?.last_name || "-"}
                                  </p>
                                </td>
                              )}

                              {visibleColumns.includes("Gender") && (
                                <td className="text-base text-left">
                                  <p className="w-20 line-clamp-3">
                                    {users?.gender || "-"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Birth Date") && (
                                <td className="text-base text-left">
                                  <p className="w-40 line-clamp-3">
                                    {formatBirthDate(users?.birth_date) || "-"}
                                  </p>
                                </td>
                              )}

                              {visibleColumns.includes("Signup Type") && (
                                <td className="text-base text-left">
                                  {users.signup_type}
                                </td>
                              )}
                              {visibleColumns.includes("Created At") && (
                                <td className="text-base text-left">
                                  {formatDate(users.created_at)}
                                </td>
                              )}
                              {visibleColumns.includes("Action") && (
                                <td className="text-base text-left">
                                  <div className="flex items-center justify-center gap-2">
                                    {/* <Button
                                      icon={deleteIcon}
                                      backgroundColor="transparent"
                                      className="p-0"
                                      onClick={() => {
                                        setSelectedUser({
                                          id: users?.id,
                                          title: users?.first_name,
                                        });
                                        setShowDeleteModal(true);
                                      }}
                                    /> */}
                                    <Button
                                      icon={eyeOpenIcon}
                                      backgroundColor="transparent"
                                      className={`p-0 ${
                                        !isView
                                          ? "opacity-50 cursor-not-allowed"
                                          : ""
                                      }`}
                                      onClick={() => handleViewUser(users?.id)}
                                      disabled={!isView}
                                    />
                                    <Button
                                      icon={penIcon}
                                      backgroundColor="transparent"
                                      className={`p-0 ${
                                        !isUpdate
                                          ? "opacity-50 cursor-not-allowed"
                                          : ""
                                      }`}
                                      onClick={() => handleEditUser(users?.id)}
                                      disabled={!isUpdate}
                                    />
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
      {allUsers.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          itemName={selectedUser?.title}
          isLoading={deleteMutation.isPending}
        />
      )}
    </div>
  );
};

export default Allusers;

import { useEffect, useMemo, useRef, useState } from "react";
import ContentHeader from "../Subnavbar";
import { capitalize, concatImgURL, formatDate } from "../../config/function";
import Button from "../ui/button";
import {
  // correctIconGreen,
  deleteIcon,
  eyeOpenIcon,
  franceFlag,
  mediaIcon,
  penIcon,
  usaFlag,
} from "../../icons";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { paths } from "../../config/paths";
import api from "../../lib/api";
import Pagination from "../ui/pagination";
import StatusModel from "../StatusModel";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import { showToast } from "../../utils/toastUtils";
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import { resetPrediction } from "../../redux-toolkit/predictionSlice";
import { useDebounce } from "../../hooks/useDebounce";
import { setLastActiveSubTab } from "../../redux-toolkit/tabSlice";
import { PhotoProvider, PhotoView } from "react-photo-view";

const columns = [
  { title: "Id", minWidth: "min-w-12 w-12" },
  { title: "Image", minWidth: "min-w-28 w-28 " },
  { title: "Predictor Title", minWidth: "min-w-sp411 w-1/2" },
  { title: "Predictor Type", minWidth: "min-w-32 w-32" },
  { title: "Categories", minWidth: "min-w-32 w-32" },
  { title: "Status", minWidth: "min-w-32 w-32" },
  { title: "Pub./Sche. At", minWidth: "min-w-40 w-40" },
  { title: "Pub. Platform", minWidth: "min-w-32 w-32" },
  { title: "Restriction", minWidth: "min-w-32 w-32" },
  { title: "Logged In", minWidth: "min-w-24 w-24" },
  { title: "Verified", minWidth: "min-w-20 w-20" },
  { title: "Over 18", minWidth: "min-w-20 w-20" },
  { title: "Geo Mode", minWidth: "min-w-24 w-24" },
  { title: "Geo Country", minWidth: "min-w-28 w-28" },
  { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Updated At", minWidth: "min-w-28 w-28" },
  // { title: "Closed At", minWidth: "min-w-28 w-28" },
  // { title: "Languages", minWidth: "min-w-20" },
  { title: "Action", minWidth: "min-w-40 w-40" },
];
export default function PredictorListing() {
  const defaultVisibleColumns = [
    "Id",
    "Image",
    "Predictor Title",
    "Categories",
    "Status",
    "Pub./Sche. At",
    "Action",
  ];

  const [allPredictions, setAllPredictions] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [showDropdown, setShowDropdown] = useState(false);
  const [tempVisibleColumns, setTempVisibleColumns] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [page, setPage] = useState(1);
  const [selectedPrediction, setSelectedPrediction] = useState<null | {
    id: number;
    title: string;
  }>(null);
  const [dropdownPredictionId, setDropdownPredictionId] = useState<
    number | null
  >(null);
  const [showModal, setShowModal] = useState(false);
  const [draftModal, setDraftModal] = useState(false);
  const [selectedPredictionData, setSelectedPredictionData] = useState({});
  const [selectedPredictionStatus, setSelectedPredictionStatus] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const debouncedSearch = useDebounce(searchInput, 300);
  const handleBreadcrumbClick = (id: string | null, index: number) => {
    dispatch(popToIndex(index));
    navigate(id ? `` : `/dashboard`);
  };

  const getPredictionData = async ({
    queryKey,
  }: QueryFunctionContext<[string, number, string?]>) => {
    const [, currentPage, debouncedSearch] = queryKey;
    const params: Record<string, any> = {
      page: currentPage,
      limit: 8,
    };
    if (debouncedSearch) {
      params.title = debouncedSearch;
    }
    return await api.get("/prediction/", { params });
  };

  const { data: predictionsData, isFetching } = useQuery({
    queryKey: ["predictions", page, debouncedSearch],
    queryFn: getPredictionData,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return predictionsData?.data?.totalPages || 1;
  }, [predictionsData?.data?.totalPages]);

  const handleTempToggle = (title: string) => {
    if (defaultVisibleColumns.includes(title)) {
      return; // Do nothing if trying to toggle a default column
    }
    setTempVisibleColumns((prev) =>
      prev.includes(title)
        ? prev.filter((col) => col !== title)
        : [...prev, title]
    );
  };

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
    setVisibleColumns(tempVisibleColumns);
    setShowDropdown(false);
  };

  const toggleStatusDropdown = (predictionId: number) => {
    setDropdownPredictionId(
      dropdownPredictionId === predictionId ? null : predictionId
    );
  };

  const handleQuestions = (predictor: any) => {
    dispatch(setLastActiveSubTab(paths.gamezone.predictor.path));
    navigate(paths.gamezone.predictor.option.create.path, {
      state: {
        predictionId: predictor?.id,
        predictionTitle: predictor?.translation?.title,
      },
    });
  };

  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadCrumbsItem = [
    { id: null, name: "Home" },
    ...pathParts.map((part, index) => ({
      id: "/" + pathParts.slice(0, index + 1).join("/"),
      name: capitalize(part),
    })),
  ];

  useEffect(() => {
    if (predictionsData) {
      setAllPredictions(predictionsData?.data?.predictions);
    }
  }, [predictionsData]);

  const handleCreate = () => {
    dispatch(resetPrediction());
    dispatch(setLastActiveSubTab(paths.gamezone.predictor.path));
    navigate(paths.gamezone.predictor.create.path);
  };

  const handleEditPrediction = (id: number) => {
    if (!id) return;
    dispatch(setLastActiveSubTab(paths.gamezone.predictor.path));
    navigate(`/gamezone/predictor/edit/${id}`);
  };

  const deletePrediction = async (id: string) => {
    return api.delete(`/prediction/${id}`);
  };

  const deleteMutation = useMutation({
    mutationFn: deletePrediction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["predictions", page],
        exact: false,
      });
      showToast("Prediction deleted successfully", "success");
      setShowDeleteModal(false);
      setSelectedPrediction(null);
      dispatch(resetPrediction());
    },
    onError: () => {
      showToast("Failed to delete an prediction", "error");
      console.error("Failed to delete an prediction");
    },
  });

  const handleConfirmDelete = () => {
    if (selectedPrediction?.id) {
      deleteMutation.mutate(String(selectedPrediction.id));
    }
  };
  const updateStatus = async (payload: any) => {
    await api.patch(
      `/prediction/${selectedPrediction?.id}/change-status`,
      payload
    );
  };

  const updateStatusMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      showToast("Status Updated", "success");
      queryClient.invalidateQueries({
        queryKey: ["predictions"],
        exact: false,
      });
      setShowModal(false);
      setDraftModal(false);
    },
    onError: (error) => {
      console.log("Error updating status", error);
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownPredictionId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (page != 1) {
      setPage(1);
    }
  }, [searchInput]);

  return (
    <div className="mt-10">
      <ContentHeader
        title="Predictor "
        breadCrumbsItem={breadCrumbsItem}
        onBreadCrumbClick={handleBreadcrumbClick}
        onTempelate={() => console.log("From Template")}
        onCreate={handleCreate}
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
      <div className="overflow-x-auto my-3">
        <table className="min-w-full table-fixed border-separate border-spacing-y-2 pb-16">
          <thead className="text-left">
            <tr>
              {columns
                .filter((col) => visibleColumns.includes(col.title))
                .map((col) => (
                  <th
                    key={col.title}
                    className={`p-2 ps-0 text-black font-normal text-base ${col.minWidth}`}
                  >
                    {col.title === "Languages" ? (
                      <div className="flex items-center justify-center gap-2">
                        <img src={usaFlag} alt="flags" className="w-6 h-5" />
                        <img src={franceFlag} alt="flags" className="w-5 h-4" />
                      </div>
                    ) : (
                      <span
                        className={`${
                          col.title === "Action"
                            ? "flex items-center justify-center gap-1"
                            : ""
                        } opacity-40 break-words whitespace-normal block text-left  ${
                          col.title === "Id" ? "" : ""
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
            ) : allPredictions.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No predictor data available.
                  </div>
                </td>
              </tr>
            ) : (
              (allPredictions as any[])?.map((predictor, index) => {
                const categories =
                  predictor.categories
                    .map((item: any) => item.name)
                    .join(", ") || "No category";
                return (
                  <tr key={predictor?.id} className="">
                    <td colSpan={visibleColumns.length}>
                      <div className="hover:bg-gray-100 transition bg-white border border-primary rounded-xl py-2">
                        <table className="w-full">
                          <thead>
                            <tr>
                              {columns
                                .filter((col) =>
                                  visibleColumns.includes(col.title)
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
                              {visibleColumns.includes("Id") && (
                                <td className="text-base text-left ps-3">
                                  {index + 1}
                                </td>
                              )}
                              {visibleColumns.includes("Image") && (
                                <td className="text-base text-left ">
                                  <PhotoProvider maskOpacity={0.6}>
                                    {predictor.translation
                                      .prediction_image_url ? (
                                      <PhotoView
                                        src={
                                          predictor.translation
                                            .prediction_image_url
                                        }
                                      >
                                        <img
                                          src={concatImgURL(
                                            predictor.translation
                                              .prediction_image_url
                                          )}
                                          className="w-20 h-14 object-cover rounded-xl cursor-pointer"
                                          alt="Hero Thumbnail"
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
                              )}
                              {visibleColumns.includes("Predictor Title") && (
                                <td className="text-base pe-4 text-left">
                                  <div className="flex items-center justify-between">
                                    {predictor?.translation.title.length > 80
                                      ? `${predictor?.translation.title.slice(
                                          0,
                                          80
                                        )}...`
                                      : predictor?.translation.title}
                                    <Button
                                      text="Add/Edit Predictor"
                                      onClick={() => handleQuestions(predictor)}
                                      backgroundColor="transparent"
                                      className="flex items-center border border-green-600 gap-2 text-green-600 md:px-4 px-2 md:py-3 py-2 rounded-xl text-sm font-medium transition"
                                    />
                                  </div>
                                </td>
                              )}
                              {visibleColumns.includes("Predictor Type") && (
                                <td className="text-base text-left">
                                  {capitalize(predictor.prediction_mode)}
                                </td>
                              )}
                              {visibleColumns.includes("Categories") && (
                                <td className="text-base text-left">
                                  <p className="w-24">
                                    {categories.length > 25
                                      ? `${categories.slice(0, 25)}...`
                                      : categories}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Status") && (
                                <td
                                  className="text-base relative  text-left cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleStatusDropdown(predictor.id);
                                  }}
                                >
                                  <div
                                    className={`${
                                      predictor.status === "published"
                                        ? "bg-green-600"
                                        : predictor.status === "scheduled"
                                        ? "bg-blue-600"
                                        : "bg-primary"
                                    } text-white font-semibold py-1 rounded-lg w-24 flex justify-evenly`}
                                  >
                                    <span className="">
                                      {capitalize(predictor.status)}
                                    </span>
                                  </div>
                                  {dropdownPredictionId === predictor.id && (
                                    <div
                                      ref={dropdownRef}
                                      className="absolute z-10 mt-2 w-28 bg-white border border-primary rounded-xl  shadow-lg duration-500 transform transition-all"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <ul className="py-1 text-sm text-gray-700 px-1">
                                        {["Draft", "Published", "Scheduled"]
                                          .filter(
                                            (status) =>
                                              status.toLowerCase() !==
                                              predictor.status
                                          )
                                          .map((status) => (
                                            <li
                                              key={status}
                                              className="cursor-pointer px-4 py-2 font-medium hover:bg-primary rounded-xl hover:duration-500 transform transition-all"
                                              onClick={() => {
                                                setSelectedPredictionData(
                                                  predictor
                                                );
                                                setSelectedPredictionStatus(
                                                  status
                                                );
                                                setSelectedPrediction({
                                                  id: predictor.id,
                                                  title: predictor.title,
                                                });
                                                if (status !== "Draft") {
                                                  setShowModal(true);
                                                } else {
                                                  setDraftModal(true);
                                                }
                                              }}
                                            >
                                              {status}
                                            </li>
                                          ))}
                                      </ul>
                                    </div>
                                  )}
                                </td>
                              )}
                              {visibleColumns.includes("Pub./Sche. At") && (
                                <td className="text-base text-left">
                                  <p className="w-36">
                                    {predictor.published_at ||
                                    predictor.schedule_at ||
                                    predictor.scheduled_at ? (
                                      formatDate(
                                        predictor.published_at
                                          ? predictor.published_at
                                          : predictor.schedule_at ||
                                              predictor.scheduled_at
                                      )
                                    ) : (
                                      <span className=" text-gray-400">
                                        Not Published
                                      </span>
                                    )}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Pub. Platform") && (
                                <td className="text-base text-left">
                                  {predictor.publish_platforms?.join(", ") ||
                                    "—"}
                                </td>
                              )}
                              {visibleColumns.includes("Restriction") && (
                                <td className="text-base text-left">
                                  {predictor.restriction_type || "None"}
                                </td>
                              )}
                              {visibleColumns.includes("Logged In") && (
                                <td className="text-base text-left">
                                  {predictor.must_be_logged_in ? "Yes" : "No"}
                                </td>
                              )}
                              {visibleColumns.includes("Verified") && (
                                <td className="text-base text-left">
                                  {predictor.must_be_verified ? "Yes" : "No"}
                                </td>
                              )}
                              {visibleColumns.includes("Over 18") && (
                                <td className="text-base text-left">
                                  {predictor.must_be_over_18 ? "Yes" : "No"}
                                </td>
                              )}
                              {visibleColumns.includes("Geo Mode") && (
                                <td className="text-base text-left">
                                  {predictor.geo_block_mode || "None"}
                                </td>
                              )}
                              {visibleColumns.includes("Geo Country") && (
                                <td className="text-base text-left">
                                  {predictor.geo_block_countries?.join(", ") ||
                                    "—"}
                                </td>
                              )}
                              {visibleColumns.includes("Created At") && (
                                <td className="text-base text-left">
                                  {formatDate(predictor.created_at)}
                                </td>
                              )}
                              {visibleColumns.includes("Updated At") && (
                                <td className="text-base text-left">
                                  {formatDate(predictor.updated_at)}
                                </td>
                              )}

                              {/* {visibleColumns.includes("Closed At") && (
                                <td className="text-base text-left">
                                  {formatDate(predictor.closed_at)}
                                </td>
                              )} */}
                              {/* {visibleColumns.includes("Languages") && (
                                <td className="">
                                  <div className="flex items-center justify-center gap-2">
                                    <Button
                                      backgroundColor="transparent"
                                      className="p-0"
                                      // disabled={predictor.languages.includes(
                                      //   "en"
                                      // )}
                                      icon={
                                        predictor.languages.includes("en")
                                          ? correctIconGreen
                                          : penIcon
                                      }
                                      // onClick={() =>
                                      //   handleTranslationClick(
                                      //     predictor?.id,
                                      //     "en"
                                      //   )
                                      // }
                                    />
                                    <Button
                                      backgroundColor="transparent"
                                      className="p-0"
                                      // disabled={predictor.languages.includes(
                                      //   "fr"
                                      // )}
                                      icon={
                                        predictor.languages.includes("fr")
                                          ? correctIconGreen
                                          : penIcon
                                      }
                                      // onClick={() =>
                                      //   handleTranslationClick(
                                      //     predictor?.id,
                                      //     "fr"
                                      //   )
                                      // }
                                    />
                                  </div>
                                </td>
                              )} */}
                              {visibleColumns.includes("Action") && (
                                <td className="">
                                  <div className="flex items-center justify-center gap-3">
                                    <Button
                                      icon={eyeOpenIcon}
                                      backgroundColor="transparent"
                                      className="p-0"
                                    />
                                    <Button
                                      icon={penIcon}
                                      backgroundColor="transparent"
                                      className="p-0"
                                      onClick={() =>
                                        handleEditPrediction(predictor?.id)
                                      }
                                    />
                                    <Button
                                      icon={deleteIcon}
                                      backgroundColor="transparent"
                                      className="p-0"
                                      onClick={() => {
                                        setSelectedPrediction({
                                          id: predictor?.id,
                                          title: predictor?.title,
                                        });
                                        setShowDeleteModal(true);
                                      }}
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
      {showDeleteModal && (
        <DeleteConfirmModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          itemName={selectedPrediction?.title}
          isLoading={deleteMutation.isPending}
        />
      )}
      {showModal && (
        <StatusModel
          show={showModal}
          onClose={() => setShowModal(false)}
          data={selectedPredictionData}
          selectedStatus={selectedPredictionStatus}
          onSave={(payload: any) => updateStatusMutation.mutate(payload)}
          isLoading={updateStatusMutation.isPending}
        />
      )}
      {draftModal && (
        <ChangeStatusModal
          show={draftModal}
          onClose={() => setDraftModal(false)}
          onSave={(payload: any) => updateStatusMutation.mutate(payload)}
          isLoading={updateStatusMutation.isPending}
        />
      )}
      {allPredictions.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

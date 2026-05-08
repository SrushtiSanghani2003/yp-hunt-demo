import { useEffect, useMemo, useRef, useState } from "react";
import ContentHeader from "../Subnavbar";
import { capitalize, concatImgURL, formatDate } from "../../config/function";
import Button from "../ui/button";
import {
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
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import { resetQuiz } from "../../redux-toolkit/quizSlice";
import { showToast } from "../../utils/toastUtils";
import StatusModel from "../StatusModel";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import { setLastActiveSubTab } from "../../redux-toolkit/tabSlice";
import { PhotoProvider, PhotoView } from "react-photo-view";
// import { useDebounce } from "../../hooks/useDebounce";

const columns = [
  { title: "Id", minWidth: "min-w-12 w-12" },
  { title: "Image", minWidth: "min-w-28 w-28 " },
  { title: "Quiz Title", minWidth: "min-w-sp411 w-1/2" },
  { title: "Quiz Type", minWidth: "min-w-32 w-32" },
  { title: "Categories", minWidth: "min-w-32 w-32" },
  { title: "Status", minWidth: "min-w-32 w-12" },
  { title: "Pub./Sche. At", minWidth: "min-w-44 w-44" },
  { title: "Pub. Platform", minWidth: "min-w-32  w-32" },
  { title: "Restriction", minWidth: "min-w-32 w-32" },
  { title: "Logged In", minWidth: "min-w-20 w-20" },
  { title: "Verified", minWidth: "min-w-20 w-20" },
  { title: "Over 18", minWidth: "min-w-20 w-20" },
  { title: "Geo Mode", minWidth: "min-w-24 w-24" },
  { title: "Geo Country", minWidth: "min-w-28 w-28" },
  { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Updated At", minWidth: "min-w-28 w-28" },
  // { title: "Languages", minWidth: "min-w-20 w-20" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];
export default function QuizListing() {
  const defaultVisibleColumns = [
    "Id",
    "Image",
    "Quiz Title",
    "Categories",
    "Status",
    "Pub./Sche. At",
    "Action",
  ];

  const [allQuiz, setAllQuiz] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [showDropdown, setShowDropdown] = useState(false);
  const [tempVisibleColumns, setTempVisibleColumns] = useState<string[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<null | {
    id: number;
    title: string;
  }>(null);
  const [dropdownQuizId, setDropdownQuizId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [draftModal, setDraftModal] = useState(false);
  const [selectedQuizData, setSelectedQuizData] = useState({});
  const [selectedQuizStatus, setSelectedQuizStatus] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // const debouncedSearch = useDebounce(searchInput, 300);
  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadCrumbsItem = [
    { id: null, name: "Home" },
    ...pathParts.map((part, index) => ({
      id: "/" + pathParts.slice(0, index + 1).join("/"),
      name: capitalize(part),
    })),
  ];

  const handleBreadcrumbClick = (id: string | null, index: number) => {
    dispatch(popToIndex(index));
    navigate(id ? `` : `/dashboard`);
  };

  const getQuizData = async ({
    queryKey,
  }: QueryFunctionContext<[string, number, string?]>) => {
    const [, currentPage] = queryKey;
    const params: Record<string, any> = {
      page: currentPage,
      limit: 8,
    };
    // if (debouncedSearch) {
    //   params.search = debouncedSearch;
    // }
    return await api.get("/quiz/", { params });
  };

  const { data: quizData, isFetching } = useQuery({
    queryKey: ["quizzes", page],
    queryFn: getQuizData,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return quizData?.data?.totalPages || 1;
  }, [quizData?.data?.totalPages]);

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

  const toggleStatusDropdown = (quizId: number) => {
    setDropdownQuizId(dropdownQuizId === quizId ? null : quizId);
  };

  const handleQuestions = (quiz: any) => {
    dispatch(setLastActiveSubTab(paths.gamezone.quiz.path));
    navigate(paths.gamezone.quiz.option.create.path, {
      state: { quizId: quiz?.id, quizTitle: quiz?.translations[0].title },
    });
  };

  const handleCreate = () => {
    dispatch(resetQuiz());
    dispatch(setLastActiveSubTab(paths.gamezone.quiz.path));
    navigate(paths.gamezone.quiz.create.path);
  };

  const handleEditQuiz = (id: number) => {
    if (!id) return;
    dispatch(setLastActiveSubTab(paths.gamezone.quiz.path));
    navigate(`/gamezone/quiz/edit/${id}`);
  };

  const deleteQuiz = async (id: string) => {
    return api.delete(`/quiz/${id}`);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["quizzes", page],
        exact: false,
      });
      showToast("Quiz deleted successfully", "success");
      setShowDeleteModal(false);
      setSelectedQuiz(null);
      dispatch(resetQuiz());
    },
    onError: () => {
      console.error("Failed to delete an quiz");
    },
  });

  const handleConfirmDelete = () => {
    if (selectedQuiz?.id) {
      deleteMutation.mutate(String(selectedQuiz.id));
    }
  };
  const updateStatus = async (payload: any) => {
    await api.patch(`/quiz/${selectedQuiz?.id}/change-status`, payload);
  };

  const updateStatusMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      showToast("Status Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["quizzes"], exact: false });
      setShowModal(false);
      setDraftModal(false);
    },
    onError: (error) => {
      console.log("Error updating status", error);
    },
  });

  useEffect(() => {
    if (quizData) {
      setAllQuiz(quizData?.data?.quizzes);
    }
  }, [quizData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownQuizId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [searchInput]);

  return (
    <div className="mt-10">
      <ContentHeader
        title="Quiz"
        breadCrumbsItem={breadCrumbsItem}
        onBreadCrumbClick={handleBreadcrumbClick}
        saveOnButtonTitle="Create"
        onCreate={handleCreate}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
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
                    className={`p-2 ps-0 text-black font-normal  ${col.minWidth}`}
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
                        } opacity-40 break-words whitespace-normal block text-left ${
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
                {/* <tr>
                  <td colSpan={columns.length}>
                    <div className="flex items-center justify-center h-96">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-fcd100"></div>
                    </div>
                  </td>
                </tr> */}
                {[...Array(8)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={visibleColumns.length}>
                      <div className="animate-pulse bg-white border border-primary rounded-2xl p-4">
                        <div className="flex gap-4">
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
            ) : allQuiz.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No quiz data available.
                  </div>
                </td>
              </tr>
            ) : (
              allQuiz.map((quiz: any, index) => {
                const categories =
                  quiz.categories.map((item: any) => item.name).join(", ") ||
                  "No category";
                return (
                  <tr key={quiz.id}>
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
                                    {quiz.translations[0].quiz_image_url ? (
                                      <PhotoView
                                        src={concatImgURL(
                                          quiz.translations[0].quiz_image_url
                                        )}
                                      >
                                        <img
                                          src={concatImgURL(
                                            quiz.translations[0].quiz_image_url
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
                              {visibleColumns.includes("Quiz Title") && (
                                <td className="text-base pe-4 text-left">
                                  <div className="flex items-center justify-between">
                                    {quiz?.translations[0].title}
                                    <Button
                                      text="Add/Edit Questions"
                                      onClick={() => handleQuestions(quiz)}
                                      backgroundColor="transparent"
                                      className="flex items-center border border-green-600 gap-2 text-green-600 md:px-4 px-2 md:py-3 py-2 rounded-xl text-sm font-medium transition"
                                    />
                                  </div>
                                </td>
                              )}
                              {visibleColumns.includes("Quiz Type") && (
                                <td className="text-base text-left">
                                  <p className="w-28">
                                    {capitalize(quiz.type)}
                                  </p>
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
                                    toggleStatusDropdown(quiz.id);
                                  }}
                                >
                                  <div
                                    className={`${
                                      quiz.status === "published"
                                        ? "bg-green-600"
                                        : quiz.status === "scheduled"
                                        ? "bg-blue-600"
                                        : "bg-primary"
                                    } text-white font-semibold py-1 rounded-lg w-24 flex justify-evenly`}
                                  >
                                    <span className="">
                                      {capitalize(quiz.status)}
                                    </span>
                                  </div>
                                  {dropdownQuizId === quiz.id && (
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
                                              quiz.status
                                          )
                                          .map((status) => (
                                            <li
                                              key={status}
                                              className="cursor-pointer px-4 py-2 font-medium hover:bg-primary rounded-xl hover:duration-500 transform transition-all"
                                              onClick={() => {
                                                setSelectedQuizData(quiz);
                                                setSelectedQuizStatus(status);
                                                setSelectedQuiz({
                                                  id: quiz.id,
                                                  title: quiz.title,
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
                                    {quiz.published_at ||
                                    quiz.schedule_at ||
                                    quiz.scheduled_at ? (
                                      formatDate(
                                        quiz.published_at
                                          ? quiz.published_at
                                          : quiz.schedule_at ||
                                              quiz.scheduled_at
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
                                  {quiz.publish_platforms?.join(", ") || "—"}
                                </td>
                              )}
                              {visibleColumns.includes("Restriction") && (
                                <td className="text-base text-left">
                                  <p className="w-32">
                                    {quiz.restriction_type
                                      ?.split("_")
                                      .join(" ") || "None"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Logged In") && (
                                <td className="text-base text-left">
                                  {quiz.must_be_logged_in ? "Yes" : "No"}
                                </td>
                              )}
                              {visibleColumns.includes("Verified") && (
                                <td className="text-base text-left">
                                  {quiz.must_be_verified ? "Yes" : "No"}
                                </td>
                              )}
                              {visibleColumns.includes("Over 18") && (
                                <td className="text-base text-left">
                                  {quiz.must_be_over_18 ? "Yes" : "No"}
                                </td>
                              )}
                              {visibleColumns.includes("Geo Mode") && (
                                <td className="text-base text-left">
                                  {quiz.geo_block_mode}
                                </td>
                              )}
                              {visibleColumns.includes("Geo Country") && (
                                <td className="text-base text-left">
                                  {quiz.geo_block_countries.length > 0
                                    ? quiz.geo_block_countries.join(", ")
                                    : "None"}
                                </td>
                              )}
                              {visibleColumns.includes("Created At") && (
                                <td className="text-base text-left">
                                  {formatDate(quiz.created_at)}
                                </td>
                              )}
                              {visibleColumns.includes("Updated At") && (
                                <td className="text-base text-left">
                                  {formatDate(quiz.updated_at)}
                                </td>
                              )}
                              {/* {visibleColumns.includes("Languages") && (
                              <td className="text-base text-left">
                                {quiz.languages?.join(", ")}
                              </td>
                            )} */}
                              {visibleColumns.includes("Action") && (
                                <td className="text-base text-left">
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
                                      onClick={() => handleEditQuiz(quiz.id)}
                                    />
                                    <Button
                                      icon={deleteIcon}
                                      backgroundColor="transparent"
                                      className="p-0"
                                      onClick={() => {
                                        setSelectedQuiz({
                                          id: quiz?.id,
                                          title: quiz.translations[0].title,
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
          itemName={selectedQuiz?.title}
          isLoading={deleteMutation.isPending}
        />
      )}
      {showModal && (
        <StatusModel
          show={showModal}
          onClose={() => setShowModal(false)}
          data={selectedQuizData}
          selectedStatus={selectedQuizStatus}
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
      {allQuiz.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

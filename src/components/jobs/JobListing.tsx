import { useLocation, useNavigate } from "react-router-dom";
import { capitalize, formatDate } from "../../config/function";
import { useEffect, useMemo, useState } from "react";
import ContentHeader from "../Subnavbar";
import Button from "../ui/button";
import {
  correctIconGreen,
  deleteIcon,
  penIcon,
  spanishFlag,
  usaFlag,
} from "../../icons";
import { paths } from "../../config/paths";
import { useDispatch, useSelector } from "react-redux";
import { resetJob } from "../../redux-toolkit/jobSlice";
import api from "../../lib/api";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import Pagination from "../ui/pagination";
import { useDebounce } from "../../hooks/useDebounce";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import { showToast } from "../../utils/toastUtils";
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  selectListingState,
  setListingState,
} from "../../redux-toolkit/moduleListingSearchSlice";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import { useScroll } from "../../hooks/ScrollContext";
import { selectLanguage } from "../../redux-toolkit/languageSlice";

const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  { title: "Title", minWidth: "min-w-72 w-72" },
  { title: "Salary", minWidth: "min-w-28 w-28" },
  { title: "Order", minWidth: "min-w-24 w-24" },
  { title: "Languages", minWidth: "min-w-20 w-20" },
  { title: "Status", minWidth: "min-w-28 w-28" },
  { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];
const JobListing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const queryClient = useQueryClient();
  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadCrumbsItem = [
    { id: null, name: "Home" },
    ...pathParts.map((part, index) => ({
      id: "/" + pathParts.slice(0, index + 1).join("/"),
      name: capitalize(part),
    })),
  ];
  const module = "alljobs";
  const listingState = useSelector(selectListingState(module));
  const language = useSelector(selectLanguage);
  const [page, setPage] = useState(listingState.page || 1);
  const [allJobs, setAllJobs] = useState([]);
  const [searchInput, setSearchInput] = useState(listingState.search || "");
  const debouncedSearch = useDebounce(searchInput, 300);
  const [draftModal, setDraftModal] = useState(false);
  const [statusModalShow, setStatusModalShow] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>("");

  const [selectedJob, setSelectedJob] = useState<null | {
    id: number;
    title: string;
  }>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getAllJobs = async ({
    queryKey,
  }: QueryFunctionContext<[string, number, string, string?]>) => {
    const [, currentPage, language, debouncedSearch] = queryKey;
    const params: Record<string, any> = {
      page: currentPage,
      limit: 8,
      language_code: language,
    };

    if (debouncedSearch?.trim()) {
      params.search = debouncedSearch.trim();
    }
    return api.get("/job", { params });
  };

  const { data: allJobData, isFetching } = useQuery({
    queryKey: ["allJobs", page, language, debouncedSearch],
    queryFn: getAllJobs,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return allJobData?.data?.totalPages;
  }, [allJobData?.data?.totalPages]);

  const statusChange = async (categoryId: string) => {
    const isActive = currentStatus == "draft" ? "published" : "draft";
    return await api.patch(`job/${categoryId}/change-status`, {
      status: isActive,
    });
  };
  const statusChangeMutation = useMutation({
    mutationFn: statusChange,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allJobs"],
        exact: false,
      });
      showToast("Status Changed", "success");
      setStatusModalShow(false);
      setSelectedJobId(null);
    },
    onError: () => {
      showToast("Failed to change status", "error");
    },
  });

  useEffect(() => {
    if (allJobData) {
      setAllJobs(allJobData?.data?.data);
    }
  }, [allJobData]);

  const handleTranslationClick = async (jobId: string, lang: "en" | "es") => {
    navigate(`/jobs/alljobs/edit/${jobId}?lang=${lang}`);
  };

  const handleEditjob = (id: number) => {
    if (!id) return;
    navigate(`/jobs/alljobs/edit/${id}`);
  };

  const handleCreate = () => {
    navigate(paths.job.allJobs.create.getHref());
    dispatch(resetJob());
  };

  const updateStatus = async (payload: any) => {
    await api.patch(`/job/${selectedJob?.id}/change-status`, payload);
  };

  const updateStatusMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      showToast("Status Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["allJobs"], exact: false });
      setDraftModal(false);
    },
    onError: (error) => {
      console.log("🚀 ~ JobListing ~ error:", error);
    },
  });

  const deleteJob = async (id: string) => {
    return await api.delete(`/job/${id}`);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allJobs"],
        exact: false,
      });
      showToast("Job deleted successfully", "success");
      setShowDeleteModal(false);
      if (allJobData?.data.data.length == 1 && page > 1) {
        setPage((prev: any) => prev - 1);
      }
      setSelectedJob(null);
      dispatch(resetJob());
    },
    onError: (error: any) => {
      showToast(
        error?.response?.data?.message || "Failed to delete an job",
        "error",
      );
      console.error("Failed to delete an job", error);
    },
  });

  const handleConfirmDelete = () => {
    if (selectedJob?.id) {
      deleteMutation.mutate(String(selectedJob.id));
    }
  };

  const handleOrderClick = async (
    id: number,
    current_order: number,
    totalDocs: number,
  ) => {
    const { value: new_order, isConfirmed } = await Swal.fire({
      title: "Update Order",
      input: "number",
      inputLabel: "Enter new order number",
      inputValue: current_order,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "Update",
      confirmButtonColor: "#fcd100",
      inputValidator: (value) => {
        if (!value) return "You need to enter a value!";
        if (isNaN(Number(value))) return "Order must be a number!";
        if (parseInt(value) < 1 || parseInt(value) > totalDocs)
          return `Order must be between 1 and ${totalDocs}`;
        return undefined;
      },
    });

    if (isConfirmed && new_order && parseInt(new_order) !== current_order) {
      const payload = { order: parseInt(new_order) };
      try {
        await api.patch(`job/${id}/change-order`, payload);

        toast.success(`Order updated to ${new_order}`);
        await queryClient.invalidateQueries({
          queryKey: ["allJobs"],
          exact: false,
        });
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || // backend message
          error?.message || // axios error message
          "Failed to update order"; // fallback

        toast.error(errorMessage);
      }
    }
  };

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
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <ContentHeader
          title="All Jobs"
          breadCrumbsItem={breadCrumbsItem}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onCreate={handleCreate}
        />
      </div>
      <div className="container overflow-x-auto my-3 grid grid-cols-1">
        <table className="min-w-full table-fixed border-separate border-spacing-y-2 ">
          <thead className="text-left">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.title}
                  className={`py-2 text-black font-normal   ${col.minWidth}`}
                >
                  {col.title === "Languages" ? (
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src={usaFlag}
                        alt="flags"
                        className="w-6 h-4 object-cover"
                      />
                      <img
                        src={spanishFlag}
                        alt="flags"
                        className="w-6 h-4 object-cover"
                      />
                    </div>
                  ) : (
                    <span
                      className={`${
                        col.title === "Action" || col.title === "Status"
                          ? "flex items-center justify-center gap-1"
                          : col.title === "Title"
                            ? "text-start"
                            : "text-left"
                      } opacity-40 break-words whitespace-normal block  ${
                        col.title === "ID" ? "" : ""
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
                      <div className="animate-pulse bg-white border border-primary rounded-2xl py-4 px-2">
                        <div className="flex w-full gap-1">
                          {columns.map((col, j) => (
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
            ) : allJobs?.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No data available.
                  </div>
                </td>
              </tr>
            ) : (
              (allJobs as any[])?.map((job, index) => {
                const isActive = job?.status == "published";
                return (
                  <tr key={job?.id} className="">
                    <td colSpan={columns.length}>
                      <div className="hover:bg-gray-100 transition bg-white border border-primary rounded-xl py-2">
                        <table className="w-full">
                          <thead>
                            <tr>
                              {columns.map((col) => (
                                <th
                                  key={col.title}
                                  className={`${col.minWidth}`}
                                ></th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-base text-left ps-3">
                                {index + 1}
                              </td>
                              <td className="text-base text-left">
                                <div
                                  className="flex items-center justify-between gap-4 cursor-pointer"
                                  // onClick={() => togglejob(job?.id)}
                                >
                                  <p className={`line-clamp-3 `}>
                                    {job.translation?.title}
                                  </p>
                                </div>
                              </td>
                              <td className="text-base text-left">
                                <p className="w-28 ">
                                  {job.translation.salary}
                                </p>
                              </td>
                              <td className="text-base text-left">
                                <p className="w-16 px-4">
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleOrderClick(
                                        job?.id,
                                        job?.order,
                                        allJobData?.data?.totalDocs ||
                                          allJobData?.data?.length,
                                      )
                                    }
                                  >
                                    {job?.order || "-"}
                                  </span>
                                </p>
                              </td>

                              <td className="">
                                <div className="flex items-center justify-center gap-2">
                                  <Button
                                    backgroundColor="transparent"
                                    className="p-0"
                                    icon={
                                      job.languages.includes("en")
                                        ? correctIconGreen
                                        : penIcon
                                    }
                                    onClick={() =>
                                      handleTranslationClick(job?.id, "en")
                                    }
                                  />
                                  <Button
                                    backgroundColor="transparent"
                                    className="p-0"
                                    icon={
                                      job.languages.includes("es")
                                        ? correctIconGreen
                                        : penIcon
                                    }
                                    onClick={() =>
                                      handleTranslationClick(job?.id, "es")
                                    }
                                  />
                                </div>
                              </td>
                              <td className="text-base text-left">
                                <ToggleSwitch
                                  checked={isActive}
                                  onClick={() => {
                                    setStatusModalShow(true);
                                    setCurrentStatus(job?.status);
                                    setSelectedJobId(String(job?.id));
                                  }}
                                />
                              </td>
                              <td className="text-base text-left">
                                {formatDate(job.created_at)}
                              </td>
                              <td className="">
                                <div className="flex items-center justify-center gap-3">
                                  <Button
                                    icon={penIcon}
                                    backgroundColor="transparent"
                                    className="p-0"
                                    onClick={() => handleEditjob(job?.id)}
                                  />
                                  <Button
                                    icon={deleteIcon}
                                    backgroundColor="transparent"
                                    className="p-0"
                                    onClick={() => {
                                      setSelectedJob({
                                        id: job?.id,
                                        title: job.translation?.title,
                                      });
                                      setShowDeleteModal(true);
                                    }}
                                  />
                                </div>
                              </td>
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

      {draftModal && (
        <ChangeStatusModal
          show={draftModal}
          onClose={() => setDraftModal(false)}
          onSave={(payload: any) => updateStatusMutation.mutate(payload)}
          isLoading={updateStatusMutation.isPending}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          itemName={selectedJob?.title}
          isLoading={deleteMutation.isPending}
        />
      )}
      {statusModalShow && (
        <ChangeStatusModal
          show={statusModalShow}
          onClose={() => setStatusModalShow(false)}
          onSave={() => {
            if (selectedJobId) {
              statusChangeMutation.mutate(selectedJobId);
            }
          }}
          isLoading={statusChangeMutation.isPending}
        />
      )}
      {allJobs?.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default JobListing;

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import api from "../../lib/api";
import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import Pagination from "../ui/pagination";
import { useDispatch, useSelector } from "react-redux";
import ContentHeader from "../Subnavbar";
import {
  capitalize,
  concatImgURL,
  // extractYouTubeId,
} from "../../config/function";

import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import { useDebounce } from "../../hooks/useDebounce";
// import Button from "../ui/button";
// import { deleteIcon } from "../../icons";
import { selectMenuPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { getPermissionFlags } from "../sidebar/menuPermissions";
import ExportDropdown from "../allusers/ExportDropdown";
import { chevronDown } from "../../icons";
import {
  selectListingState,
  setListingState,
} from "../../redux-toolkit/moduleListingSearchSlice";
import { useScroll } from "../../hooks/ScrollContext";

const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  // { title: "Image/Video", minWidth: "min-w-28 w-28" },
  { title: "Full Name", minWidth: "min-w-32 w-32" },
  { title: "Email", minWidth: "min-w-48 w-48" },
  { title: "Job Name", minWidth: "min-w-36 w-36" },
  { title: "Phone Number", minWidth: "min-w-32 w-32" },
  { title: "Gender", minWidth: "min-w-20 w-20" },
  { title: "CV", minWidth: "min-w-20 w-20" },
  { title: "Cover Letter", minWidth: "min-w-20 w-20" },
  { title: "Experience In The Sports Industry", minWidth: "min-w-28 w-28" },
  //   { title: "Action", minWidth: "min-w-28 w-28" },
];

const JobApplicationsListing = () => {
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
  const [allJobApplications, setallJobApplications] = useState([]);
  const module = "jobapplications";
  const listingState = useSelector(selectListingState(module));
  const [page, setPage] = useState(listingState.page || 1);
  const defaultVisibleColumns = [
    "ID",
    "Full Name",
    "Email",
    "Job Name",
    "Phone Number",
    "Gender",
    "CV",
    "Cover Letter",
    // "Action",
  ];
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [tempVisibleColumns, setTempVisibleColumns] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState<string>(
    listingState.search || "",
  );
  const [selectedJobId, setSelectedJobId] = useState<string>(
    listingState.filters.selectedJobId || "",
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuPermissions = useSelector(selectMenuPermissions);
  const { isExport } = getPermissionFlags(menuPermissions.job_applications);

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
  const getJobApplications = async ({
    queryKey,
  }: QueryFunctionContext<[string, number, string?, string?]>) => {
    const [, currentPage, debouncedSearch, selectedJobId] = queryKey;
    const params: Record<string, any> = {
      page: currentPage,
      limit: 8,
    };
    if (debouncedSearch?.trim()) {
      params.search = debouncedSearch.trim();
    }

    if (selectedJobId) {
      params.job_id = selectedJobId; // ✅ THIS IS IMPORTANT
    }
    return await api.get("/job/searchJobApply", { params });
  };

  const { data: JobApplicationsData, isFetching } = useQuery({
    queryKey: ["job-application", page, debouncedSearch, selectedJobId],
    queryFn: getJobApplications,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return JobApplicationsData?.data?.totalPages || 1;
  }, [JobApplicationsData?.data?.totalPages]);

  const totalJobApplication = useMemo(() => {
    return JobApplicationsData?.data?.totalDocs || 0;
  }, [JobApplicationsData?.data?.totalDocs]);

  const handleBreadcrumbClick = (id: string | null, index: number) => {
    dispatch(popToIndex(index));
    navigate(id ? `` : `/dashboard`);
  };

  useEffect(() => {
    if (JobApplicationsData?.data?.data) {
      setallJobApplications(JobApplicationsData?.data?.data);
    }
  }, [JobApplicationsData]);

  const getAllJob = async () => {
    return await api.get("/job");
  };

  const { data: allJobs } = useQuery({
    queryKey: ["allJobs"],
    queryFn: getAllJob,
    refetchOnWindowFocus: false,
  });

  const allJobOptions = useMemo(
    () =>
      allJobs?.data?.data?.map((item: any) => ({
        value: item.id,
        label: item?.translation?.title,
      })) || [],
    [allJobs],
  );
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
        filters: { selectedJobId },
      }),
    );
  }, [page, searchInput, selectedJobId]);

  return (
    <div>
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <ContentHeader
          title="Job Applications"
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
      <div className="container flex justify-end items-center mt-3">
        <div className="relative w-60">
          <select
            id="language"
            value={selectedJobId}
            onChange={(e) => {
              setSelectedJobId(e.target.value);
              setPage(1);
            }}
            className="appearance-none w-full md:p-[7px] p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg truncate  overflow-hidden whitespace-nowrap"
          >
            <option value="">All Applications</option>

            {allJobOptions.map((item: any) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
            <img src={chevronDown} />
          </div>
        </div>
      </div>
      <div className="container py-3 flex items-end justify-between mt-5">
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
            Total : <span className="text-blue-600">{totalJobApplication} </span>
            Job Applications
          </span>
        </div>
        <ExportDropdown
          model="job"
          exportUrl="/job/exportDocs"
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
            ) : allJobApplications.length === 0 ? (
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
              (allJobApplications as any[])?.map((jobapplication, index) => {
                // const videoUrl = news.hero_video_url;
                // const videoId = videoUrl ? extractYouTubeId(videoUrl) : null;
                // const isNativeUrl = videoUrl?.startsWith(
                //   "https://ip-cms-api.ypstagingserver.com"
                // );

                return (
                  <tr key={jobapplication?.id} className="">
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
                              {visibleColumns.includes("Full Name") && (
                                <td className="text-base text-left">
                                  <p className="w-32 line-clamp-3 break-words">
                                    {jobapplication?.full_name || "-"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Email") && (
                                <td className="text-base text-left">
                                  <p className="w-48 line-clamp-3 break-words">
                                    {jobapplication?.email || "-"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Job Name") && (
                                <td className="text-base text-left">
                                  <p className="w-36 line-clamp-2">
                                    {jobapplication?.job_name || "-"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Phone Number") && (
                                <td className="text-base text-left">
                                  <p className="w-32 line-clamp-3">
                                    {jobapplication?.phone_number || "-"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("Gender") && (
                                <td className="text-base text-left">
                                  <p className="w-20 line-clamp-3">
                                    {jobapplication?.gender || "-"}
                                  </p>
                                </td>
                              )}
                              {visibleColumns.includes("CV") && (
                                <td className="text-base text-left">
                                  {jobapplication.cv ? (
                                    <p
                                      className="text-blue-600  cursor-pointer hover:text-blue-800"
                                      onClick={() =>
                                        window.open(
                                          concatImgURL(jobapplication.cv),
                                          "_blank",
                                        )
                                      }
                                    >
                                      LINK
                                    </p>
                                  ) : (
                                    <span>-</span>
                                  )}
                                </td>
                              )}
                              {visibleColumns.includes("Cover Letter") && (
                                <td className="text-base text-left">
                                  {jobapplication.cover_letter ? (
                                    <p
                                      className="text-blue-600  cursor-pointer hover:text-blue-800"
                                      onClick={() =>
                                        window.open(
                                          concatImgURL(
                                            jobapplication.cover_letter,
                                          ),
                                          "_blank",
                                        )
                                      }
                                    >
                                      LINK
                                    </p>
                                  ) : (
                                    <span>-</span>
                                  )}
                                </td>
                              )}

                              {visibleColumns.includes(
                                "Experience In The Sports Industry",
                              ) && (
                                <td className="text-base text-left">
                                  <p className="w-20 line-clamp-3">
                                    {jobapplication?.experience_in_the_sports_industry ||
                                      "-"}
                                  </p>
                                </td>
                              )}
                              {/* {visibleColumns.includes("Action") && (
                                <td className="text-base text-left">
                                  <div className="flex items-center justify-center gap-2">
                                    <Button
                                      icon={deleteIcon}
                                      backgroundColor="transparent"
                                      className="p-0"
                                      onClick={() => {
                                        setSelectedUser({
                                          id: jobapplication?.id,
                                          title: jobapplication?.first_name,
                                        });
                                        setShowDeleteModal(true);
                                      }}
                                    />
                                    <Button
                                      icon={eyeOpenIcon}
                                      backgroundColor="transparent"
                                      className={`p-0 ${
                                        !isView
                                          ? "opacity-50 cursor-not-allowed"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        handleViewUser(jobapplication?.id)
                                      }
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
                                      onClick={() =>
                                        handleEditUser(jobapplication?.id)
                                      }
                                      disabled={!isUpdate}
                                    />
                                  </div>
                                </td>
                              )} */}
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
      {allJobApplications.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default JobApplicationsListing;

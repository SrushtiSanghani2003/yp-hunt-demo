import { useLocation, useNavigate } from "react-router-dom";
import { deleteIcon, mediaIcon, penIcon } from "../../icons";
import Button from "../ui/button";
import { paths } from "../../config/paths";
import { useEffect, useMemo, useRef, useState } from "react";
import api from "../../lib/api";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import Pagination from "../ui/pagination";
import { useDispatch } from "react-redux";
import ContentHeader from "../Subnavbar";
import { capitalize, concatImgURL, formatDate } from "../../config/function";
import { showToast } from "../../utils/toastUtils";
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import { resetPage } from "../../redux-toolkit/pageSlice";
import StatusModel from "../StatusModel";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import { useDebounce } from "../../hooks/useDebounce";
import { PhotoProvider, PhotoView } from "react-photo-view";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  { title: "Image", minWidth: "min-w-28 w-28" },
  { title: "Title", minWidth: "min-w-72 w-72" },
  { title: "Status", minWidth: "min-w-28 w-28" },
  { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Updated At", minWidth: "min-w-28 w-28" },
  { title: "Order", minWidth: "min-w-20 w-20" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];

const OurSpaces = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadCrumbsItem = [
    { id: null, name: "Home" },
    ...pathParts.map((part, index) => ({
      id: "/" + pathParts.slice(0, index + 1).join("/"),
      name: capitalize(part),
    })),
  ];
  const [toggleClass, setToggleClass] = useState("justify-start");
  const [_selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const [allPages, setAllPages] = useState([]);
  const [page, setPage] = useState(location.state?.restorePage || 1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState<null | {
    id: number;
    title: string;
  }>(null);
  const [currentStatus, setCurrentStatus] = useState<boolean | undefined>(
    false
  );
  const defaultVisibleColumns = [
    "ID",
    "Title",
    "Status",
    "Image",
    "Created At",
    "Order",
    "Action",
  ];
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);
  const [tempVisibleColumns, setTempVisibleColumns] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState(
    location.state?.restoreSearch || ""
  );

  const [_expandedPageId, setExpandedPageId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [draftModal, setDraftModal] = useState(false);
  const [_dropdownPageId, setDropdownPageId] = useState<number | null>(null);
  const [selectedPageStatus, _setSelectedPageStatus] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(searchInput, 300);

  const togglePage = (id: number) => {
    setExpandedPageId((prev) => (prev === id ? null : id));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setTempVisibleColumns([
      ...new Set([...visibleColumns, ...defaultVisibleColumns]),
    ]);
    setShowDropdown((prev) => !prev);
  };
  const closeDropdown = () => {
    setTempVisibleColumns([
      ...new Set([...visibleColumns, ...defaultVisibleColumns]),
    ]);
    setShowDropdown(false);
  };

  const handleTempToggle = (title: string) => {
    if (defaultVisibleColumns.includes(title)) {
      return;
    }
    setTempVisibleColumns((prev) =>
      prev.includes(title)
        ? prev.filter((col) => col !== title)
        : [...prev, title]
    );
  };

  const applyColumnChanges = () => {
    setVisibleColumns([
      ...new Set([...tempVisibleColumns, ...defaultVisibleColumns]),
    ]);
    setShowDropdown(false);
  };

  const getPages = async ({
    queryKey,
  }: QueryFunctionContext<[string, number, string?]>) => {
    const [, currentPage, debouncedSearch] = queryKey;
    const params: Record<string, any> = {
      page: currentPage,
      limit: 8,
    };
    if (debouncedSearch?.trim()) {
      params.search = debouncedSearch;
    }
    return await api.get("/space", { params });
  };

  const { data: pagesData, isFetching } = useQuery({
    queryKey: ["ourspaces", page, debouncedSearch],
    queryFn: getPages,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });


  const totalPages = useMemo(() => {
    return pagesData?.data?.totalPages || 1;
  }, [pagesData?.data?.totalPages]);

  const handleEditPage = (id: number) => {
    if (!id) return;
    navigate(`/ourspaces/edit/${id}`, {
      state: {
        fromPage: page, // 👈 send current pagination page
        fromSearch: searchInput, // current search
      }
    });
  };

  const deletePage = async (id: string) => {
    return await api.delete(`/space/${id}`);
  };

  const deleteMutation = useMutation({
    mutationFn: deletePage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ourspaces"],
        exact: false,
      });
      showToast("Page deleted successfully", "success");
      setShowDeleteModal(false);
      setSelectedPage(null);
      dispatch(resetPage());
    },
    onError: () => {
      console.error("Failed to delete a page");
    },
  });

  const statusChange = async (statusId: string) => {
    const isActive = currentStatus ? false : true;
    return await api.patch(`/space/${statusId}/change-status`, {
      status: isActive,
    });
  };

  const statusChangeMutation = useMutation({
    mutationFn: statusChange,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ourspaces"], exact: false });
      showToast("Status Changed", "success");
      setSelectedCategoryId(null);
    },
    onError: () => {
      showToast("Failed to change status", "error");
    },
  });

  const handleConfirmDelete = () => {
    if (selectedPage?.id) {
      deleteMutation.mutate(String(selectedPage.id));
    }
  };

  const handleCreate = () => {
    dispatch(resetPage());
    navigate(paths.ourspaces.create.getHref());
  };

  const updateStatus = async (payload: any) => {
    await api.patch(`/space/${selectedPage?.id}/change-status`, payload);
  };


  const handleOrderClick = async (
    id: number,
    current_order: number,
    totalDocs: number

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
      const payload = { sort_order: parseInt(new_order) };
      try {
        await api.patch(`/common/change-order/Space/${id}`, payload);

        toast.success(`Order updated to ${new_order}`);
        await queryClient.invalidateQueries({
          queryKey: ["ourspaces"],
          exact: false,
        });
      } catch (error) {
        console.error("Order update failed:", error);
        toast.error("Failed to update order");
        queryClient.invalidateQueries({ queryKey: ["ourspaces"], exact: false });

      }
    }
  };

  const updateStatusMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      showToast("Status Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["ourspaces"], exact: false });
      setShowModal(false);
      setDraftModal(false);
    },
    onError: (error) => {
      console.log("Error updating status", error);
    },
  });

  useEffect(() => {
    if (pagesData?.data?.space) {
      setAllPages(pagesData.data.space);
    }
  }, [pagesData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownPageId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return; // skip first render
    }
    setPage(1); // only reset when user types new search
  }, [debouncedSearch]);

  return (
    <div className="mt-10">
      <ContentHeader
        title="Our Spaces"
        breadCrumbsItem={breadCrumbsItem}
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
                    className={`p-2 text-black font-normal ${col.minWidth}`}
                  >
                    <span
                      className={`${col.title === "Action"
                          ? "flex items-center justify-center gap-1"
                          : col.title === "Title"
                            ? "text-start"
                            : "text-left"
                        } opacity-40 break-words whitespace-normal block ${col.title === "ID" ? "" : ""
                        }`}
                    >
                      {col.title}
                    </span>
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
            ) : allPages.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No  data available.
                  </div>
                </td>
              </tr>
            ) : (
              allPages.map((page: any, index: number) => (
                <tr key={page.id} className="">
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
                            {visibleColumns.includes("ID") && (
                              <td className="text-base text-left ps-3">
                                {index + 1}
                              </td>
                            )}
                            {visibleColumns.includes("Image") && (
                              <td className="text-base">
                                <PhotoProvider maskOpacity={0.6}>
                                  {page.image ? (
                                    <PhotoView src={concatImgURL(page.image)}>
                                      <img
                                        src={concatImgURL(page.image)}
                                        className="w-20 h-14 object-cover rounded-xl cursor-pointer"
                                        alt="Our Space Image"
                                      />
                                    </PhotoView>
                                  ) : (
                                    <div className="w-20 h-14 bg-[#f6f6f6] border border-primary rounded-xl flex justify-center items-center">
                                      <img src={mediaIcon} alt="Placeholder" />
                                    </div>
                                  )}
                                </PhotoProvider>
                              </td>
                            )}
                            {visibleColumns.includes("Title") && (
                              <td className="text-base text-left">
                                <div
                                  className="flex items-center justify-between gap-4 cursor-pointer"
                                  onClick={() => togglePage(page.id)}
                                >
                                  <p
                                    className={`line-clamp-3 ${page.title?.length > 0 ? "w-44" : "w-64"
                                      }`}
                                  >
                                    {page.title?.length > 80
                                      ? `${page.title.slice(0, 80)}...`
                                      : page.translation.title}
                                  </p>
                                </div>
                              </td>
                            )}

                            {visibleColumns.includes("Status") && (
                              <td className="text-base text-left">
                                <ToggleSwitch
                                  checked={page?.status}
                                  className={toggleClass} // ✅ pass class as prop
                                  onClick={() => {
                                    setCurrentStatus(page?.status);
                                    setSelectedCategoryId(String(page?.id));
                                    setToggleClass("justify-start"); // ✅ update state
                                    statusChangeMutation.mutate(
                                      String(page?.id)
                                    );
                                  }}
                                />
                              </td>
                            )}

                            {visibleColumns.includes("Created At") && (
                              <td className="text-base text-left">
                                {formatDate(page.created_at)}
                              </td>
                            )}
                            {visibleColumns.includes("Updated At") && (
                              <td className="text-base text-left">
                                {formatDate(page.updated_at)}
                              </td>
                            )}

                            {visibleColumns.includes("Order") && (
                              <td className="text-base text-left ">
                                <p className={`w-20 px-4`}>
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleOrderClick(
                                        page?.id,
                                        page?.sort_order,
                                        // null, // or pass actual parent_id if it's a child
                                        pagesData?.data?.totalDocs || pagesData?.data?.length // total number of pages
                                      )
                                    }
                                  >
                                    {page?.sort_order || "-"}
                                  </span>
                                </p>
                              </td>
                            )}
                            {visibleColumns.includes("Action") && (
                              <td className="">
                                <div className="flex items-center justify-center gap-3">
                                  {/* <Button
                                    icon={eyeOpenIcon}
                                    backgroundColor="transparent"
                                    className="p-0"
                                  /> */}
                                  <Button
                                    icon={penIcon}
                                    backgroundColor="transparent"
                                    className="p-0"
                                    onClick={() => handleEditPage(page.id)}
                                  />
                                  <Button
                                    icon={deleteIcon}
                                    backgroundColor="transparent"
                                    className="p-0"
                                    onClick={() => {
                                      setSelectedPage({
                                        id: page.id,
                                        title: page.title,
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
              ))
            )}
          </tbody>
        </table>
      </div>
      {showDeleteModal && (
        <DeleteConfirmModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          itemName={selectedPage?.title}
          isLoading={deleteMutation.isPending}
        />
      )}
      {showModal && (
        <StatusModel
          show={showModal}
          onClose={() => setShowModal(false)}
          // data={selectedPageData}
          selectedStatus={selectedPageStatus || ""} // ✅ always defined
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

      {allPages.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default OurSpaces;

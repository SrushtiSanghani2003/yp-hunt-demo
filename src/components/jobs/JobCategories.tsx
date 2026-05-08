import { useEffect, useMemo, useState } from "react";
// import { useDebounce } from "../../hooks/useDebounce";
import ContentHeader from "../Subnavbar";
import CreateJobCategory from "./CreateJobCategory";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import api from "../../lib/api";
import { showToast } from "../../utils/toastUtils";
import {
  chevronRight,
  correctIconGreen,
  deleteIcon,
  penIcon,
  spanishFlag,
  usaFlag,
} from "../../icons";
import Button from "../ui/button";
import DeleteCategories from "../account-settings/DeleteCategories";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import { AnimatePresence, motion } from "framer-motion";
import ChildCategory from "./ChildCategory";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useDebounce } from "../../hooks/useDebounce";
import Pagination from "../ui/pagination";
import {
  selectListingState,
  setListingState,
} from "../../redux-toolkit/moduleListingSearchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useScroll } from "../../hooks/ScrollContext";
// import { formatDate } from "../../config/function";

const JobCategories = () => {
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const module = "jobcategories";
  const listingState = useSelector(selectListingState(module));
  const queryClient = useQueryClient();
  const [searchInput, setSearchInput] = useState<string>(
    listingState.search || "",
  );
  const [page, setPage] = useState<number>(listingState.page || 1);
  const [allJobCategories, setAllJobCategories] = useState<any[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [editCategoryData, setEditCategoryData] = useState<any>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [deleteShow, setDeleteShow] = useState<boolean>(false);
  const [statusModalShow, setStatusModalShow] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(
    null,
  );
  const debouncedSearch = useDebounce(searchInput, 300);

  const columns = [
    { title: "No.", minWidth: "min-w-8 w-8" },
    { title: "Title", minWidth: "min-w-72 w-72" },
    { title: "Status", minWidth: "min-w-24 w-24" },
    { title: "Order", minWidth: "min-w-24 w-24" },
    { title: "Languages", minWidth: "min-w-20 w-20" },
    { title: "Action", minWidth: "min-w-24 w-24" },
  ];

  const breadCrumbsItem = [
    { id: null, name: "Home" },
    { id: "jobs", name: "Jobs" },
    { id: "categories", name: "Categories" },
  ];

  const handleCreate = () => {
    setEditCategoryData(null);
    setShow(true);
  };

  const toggleCategory = (id: number) => {
    setExpandedCategoryId((prev) => (prev === id ? null : id));
  };

  const getAllJobCategories = async ({
    queryKey,
  }: QueryFunctionContext<[string, string?]>) => {
    const [, debouncedSearch] = queryKey;
    const params: Record<string, any> = {
      search: debouncedSearch,
    };
    return api.get("/job/category", { params });
  };

  const { data: allJobCategoriesData, isFetching } = useQuery({
    queryKey: ["jobCategories", debouncedSearch],
    queryFn: getAllJobCategories,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return allJobCategoriesData?.data?.totalPages;
  }, [allJobCategoriesData?.data?.totalPages]);

  useEffect(() => {
    setAllJobCategories(allJobCategoriesData?.data?.data);
  }, [allJobCategoriesData]);

  const createJobCategory = async (data: any) => {
    return api.post("/job/category", data);
  };

  const createJobCategoryMutation = useMutation({
    mutationFn: createJobCategory,
    onSuccess: () => {
      showToast("Job Category created successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["jobCategories"],
        exact: false,
      });
      setShow(false);
    },
    onError: () => {
      showToast("Job Category creation failed", "error");
    },
  });

  const updateJobCategory = async (data: any) => {
    return api.put(`/job/category/${editCategoryData.id}`, {
      parent_id: data.parent_id,
      translation: {
        language_code: data?.translation?.language_code,
        title: data?.translation?.title,
      },
    });
  };

  const handleTranslationClick = async (jobId: string, lang: "en" | "es") => {
    try {
      const res = await api.get(
        `/job/category/${jobId}/?language_code=${lang}`,
      );
      const category = res?.data;
      const translation = category?.translation || null;

      setEditCategoryData({
        id: jobId,
        language: lang,
        title: translation?.title || "",
        parentId: category?.parent_id ?? null,
      });
    } catch (error) {
      setEditCategoryData({
        id: jobId,
        language: lang,
        title: "",
        parentId: null,
      });
    }
    setShow(true);
  };

  const updateJobCategoryMutation = useMutation({
    mutationFn: updateJobCategory,
    onSuccess: () => {
      showToast("Job Category updated successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["jobCategories"],
        exact: false,
      });
      setShow(false);
    },
    onError: () => {
      showToast("Job Category update failed", "error");
    },
  });

  const deleteCategory = async (id: string) => {
    return await api.delete(`job/category/${id}`);
  };

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobCategories"],
        exact: false,
      });
      showToast("Category Deleted Successfully", "success");
      setDeleteShow(false);
      if (allJobCategoriesData?.data.data.length == 1 && page > 1) {
        setPage((prev: any) => prev - 1);
      }
      setSelectedCategoryId(null);
    },
    onError: () => {
      showToast("Failed to delete category", "error");
    },
  });

  const statusChange = async (categoryId: string) => {
    const isActive = currentStatus == "draft" ? "published" : "draft";
    return await api.patch(`job/category/${categoryId}/change-status`, {
      status: isActive,
    });
  };

  const statusChangeMutation = useMutation({
    mutationFn: statusChange,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobCategories"],
        exact: false,
      });
      showToast("Status Changed", "success");
      setStatusModalShow(false);
      setSelectedCategoryId(null);
    },
    onError: () => {
      showToast("Failed to change status", "error");
    },
  });

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
        await api.patch(`/job/category/${id}/change-order`, payload);

        toast.success(`Order updated to ${new_order}`);
        await queryClient.invalidateQueries({
          queryKey: ["jobCategories"],
          exact: false,
        });
      } catch (error) {
        console.error("Order update failed:", error);
        toast.error("Failed to update order");
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
          title="Job Categories"
          breadCrumbsItem={breadCrumbsItem}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onCreate={handleCreate}
        />
      </div>
      <div className="container overflow-x-auto my-3">
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
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={columns.length}>
                      <div className="animate-pulse bg-white border border-primary rounded-2xl p-4">
                        <div className="flex w-full gap-4">
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
            ) : allJobCategories?.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No data available.
                  </div>
                </td>
              </tr>
            ) : (
              (allJobCategories as any[])?.map((category, index) => {
                const isActive = category?.status == "published";
                return (
                  <tr key={category?.id} className="">
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
                                  onClick={() => toggleCategory(category?.id)}
                                >
                                  {category?.translation?.title}
                                  {category?.children?.length > 0 && (
                                    <span
                                      className={`transition-transform duration-300 px-4 ${
                                        expandedCategoryId == category.id
                                          ? "rotate-90"
                                          : "rotate-0"
                                      }`}
                                    >
                                      <img src={chevronRight} alt="Toggle" />
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="text-base text-left">
                                <ToggleSwitch
                                  checked={isActive}
                                  onClick={() => {
                                    setStatusModalShow(true);
                                    setCurrentStatus(category?.status);
                                    setSelectedCategoryId(String(category?.id));
                                  }}
                                />
                              </td>
                              <td className="text-base text-left">
                                <p className="w-16 px-4">
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleOrderClick(
                                        category?.id,
                                        category?.order,
                                        // null, // or pass actual parent_id if it's a child
                                        allJobCategoriesData?.data?.totalDocs ||
                                          allJobCategoriesData?.data?.length, // total number of pages
                                      )
                                    }
                                  >
                                    {category?.order || "-"}
                                  </span>
                                </p>
                              </td>
                              <td className="">
                                <div className="flex items-center justify-center gap-2">
                                  <Button
                                    backgroundColor="transparent"
                                    className="p-0"
                                    icon={
                                      category.languages?.includes("en")
                                        ? correctIconGreen
                                        : penIcon
                                    }
                                    onClick={() =>
                                      handleTranslationClick(category?.id, "en")
                                    }
                                  />
                                  <Button
                                    backgroundColor="transparent"
                                    className="p-0"
                                    icon={
                                      category.languages?.includes("es")
                                        ? correctIconGreen
                                        : penIcon
                                    }
                                    onClick={() =>
                                      handleTranslationClick(category?.id, "es")
                                    }
                                  />
                                </div>
                              </td>
                              <td className="text-base text-left">
                                <div className="flex gap-2 items-center justify-center">
                                  <Button
                                    icon={penIcon}
                                    backgroundColor="transparent"
                                    className="md:py-0"
                                    onClick={() => {
                                      setEditCategoryData({
                                        id: category?.id,
                                        language: "en",
                                        title:
                                          category?.translation?.title || "",
                                        parentId: category?.parent_id ?? null,
                                      });
                                      setShow(true);
                                    }}
                                  />
                                  <Button
                                    icon={deleteIcon}
                                    backgroundColor="transparent"
                                    className="md:py-0"
                                    onClick={() => {
                                      setDeleteShow(true);
                                      setSelectedCategoryId(
                                        String(category?.id),
                                      );
                                    }}
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={columns.length} className="p-0">
                                <AnimatePresence initial={false}>
                                  {expandedCategoryId == category.id &&
                                    category?.children?.length > 0 && (
                                      <motion.div
                                        key="modules"
                                        initial={{ height: 0 }}
                                        animate={{ height: "auto" }}
                                        exit={{ height: 0 }}
                                        transition={{
                                          duration: 0.3,
                                          ease: "easeInOut",
                                        }}
                                        className="px-2 mt-2"
                                      >
                                        {category.children.map(
                                          (child: any, childIndex: number) => (
                                            <ChildCategory
                                              key={child.id}
                                              categoryChild={child}
                                              childIndex={childIndex}
                                              setDeleteShow={setDeleteShow}
                                              setStatusModalShow={
                                                setStatusModalShow
                                              }
                                              setCurrentStatus={
                                                setCurrentStatus
                                              }
                                              setSelectedCategoryId={
                                                setSelectedCategoryId
                                              }
                                              setEditCategoryData={
                                                setEditCategoryData
                                              }
                                              handleOrderClick={
                                                handleOrderClick
                                              }
                                              totalDocs={
                                                allJobCategoriesData?.data
                                                  ?.totalDocs ||
                                                allJobCategoriesData?.data
                                                  ?.length
                                              }
                                              setShow={setShow}
                                            />
                                          ),
                                        )}
                                      </motion.div>
                                    )}
                                </AnimatePresence>
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
      {show && (
        <CreateJobCategory
          show={show}
          onClose={() => setShow(false)}
          onCreate={(data: any) => createJobCategoryMutation.mutate(data)}
          onUpdate={(data: any) => updateJobCategoryMutation.mutate(data)}
          isLoading={
            createJobCategoryMutation.isPending ||
            updateJobCategoryMutation.isPending
          }
          editData={editCategoryData}
        />
      )}
      {deleteShow && (
        <DeleteCategories
          show={deleteShow}
          onClose={() => setDeleteShow(false)}
          onDelete={() => {
            if (selectedCategoryId) {
              deleteCategoryMutation.mutate(selectedCategoryId);
            }
          }}
          isLoading={deleteCategoryMutation.isPending}
        />
      )}
      {statusModalShow && (
        <ChangeStatusModal
          show={statusModalShow}
          onClose={() => setStatusModalShow(false)}
          onSave={() => {
            if (selectedCategoryId) {
              statusChangeMutation.mutate(selectedCategoryId);
            }
          }}
          isLoading={statusChangeMutation.isPending}
        />
      )}
      {allJobCategories?.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default JobCategories;

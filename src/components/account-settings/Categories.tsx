import { useEffect, useMemo, useRef, useState } from "react";
import {
  chevronRight,
  // correctIcon,
  deleteIcon,
  penIcon,
  plusIcon,
  // short_white,
} from "../../icons";
import Button from "../ui/button";
import SearchInput from "../ui/searchInput";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import CreateCategories from "./CreateCategories";
import DeleteCategories from "./DeleteCategories";
import api from "../../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../utils/toastUtils";
import { motion, AnimatePresence } from "framer-motion";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import { useDebounce } from "../../hooks/useDebounce";
import Pagination from "../ui/pagination";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { selectAdministrationPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { getPermissionAdministrationFlags } from "../sidebar/menuPermissions";

export type Module = {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: string | null;
};

export type Category = {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  sort_order?: number;
  is_active?: boolean;
  deleted_at?: string | null;
  modules: Module[];
};

const Categories = () => {
  const [createShow, setCreateShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [editCategoryData, setEditCategoryData] = useState<Category | null>(
    null,
  );
  const [searchInput, setSearchInput] = useState<string>("");
  const [statusModalShow, setStatusModalShow] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<boolean | undefined>(
    false,
  );

  const debouncedSearch = useDebounce(searchInput, 300);
  const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const menuPermissions = useSelector(selectAdministrationPermissions);
  const { isUpdate, isDelete, isCreate, isChangeOrder, isChangeStatus } =
    getPermissionAdministrationFlags(menuPermissions.categories);
  const toggleCategory = (id: number) => {
    setExpandedCategoryId((prev) => (prev === id ? null : id));

    setTimeout(() => {
      const el = categoryRefs.current[id];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 300);
  };

  const queryClient = useQueryClient();

  const getAllCategories = async () => {
    const params: Record<string, any> = {
      page: page,
      limit: 10,
    };
    if (debouncedSearch.trim()) {
      params.search = debouncedSearch;
    }
    return await api.get("/category/categories", { params });
  };

  const { data: categoriesData } = useQuery({
    queryKey: ["categories", page, debouncedSearch],
    queryFn: getAllCategories,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return (categoriesData as any)?.response?.data?.totalPages || 1;
  }, [(categoriesData as any)?.response?.data?.totalPages]);

  const createCategory = async (newCate: {
    name: string;
    module_ids: number[];
  }) => {
    const response = await api.post("/category/categories", newCate);
    return response.data;
  };

  const updateCategory = async (updatedCate: {
    id: string;
    name: string;
    module_ids: number[];
  }) => {
    const { id, ...rest } = updatedCate;
    const response = await api.put(`/category/categories/${id}`, rest);
    return response.data;
  };

  const deleteCategory = async (id: string) => {
    return await api.delete(`/category/categories/${id}`);
  };

  const statusChange = async (categoryId: string) => {
    const isActive = currentStatus ? false : true;
    return await api.patch(`/category/${categoryId}/change-status`, {
      is_active: isActive,
    });
  };

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      showToast("Category created successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["categories"], exact: false });
      setCreateShow(false);
    },
    onError: () => {
      console.error("Failed to create category");
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      showToast("Category updated successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["categories"], exact: false });
      setCreateShow(false);
      setEditCategoryData(null);
    },
    onError: () => {
      console.error("Failed to update category");
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"], exact: false });
      showToast("Category Deleted Successfully", "success");
      setDeleteShow(false);
      setSelectedCategoryId(null);
    },
    onError: () => {
      showToast("Failed to delete category", "error");
    },
  });

  const statusChangeMutation = useMutation({
    mutationFn: statusChange,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"], exact: false });
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
    if (!isChangeOrder) return;
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
        await api.patch(`/category/${id}/change-order`, payload);
        toast.success(`Order updated to ${new_order}`);
        await queryClient.invalidateQueries({
          queryKey: ["categories"],
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
    if (categoriesData) {
      const allCategories = (categoriesData as any)?.response?.data?.categories;
      setAllCategories(allCategories);
    }
  }, [categoriesData]);

  return (
    <>
      <div className="container relative pt-6 md:pt-0">
        {/* <div
          className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
            isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
          }`}
        > */}
          <div className="lg:flex items-center justify-between  ">
            <h2 className="uppercase lg:text-xl/5 text-base font-bold">
              Categories
            </h2>
            <div className="flex flex-col lg:flex-row lg:items-center items-end lg:gap-3 gap-1">
              <Button
                text="Create"
                icon={plusIcon}
                backgroundColor="transparent"
                className={`rounded-lg border border-black px-4 py-2 ${
                  !isCreate ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => setCreateShow(true)}
                textSize=" text-sm"
                disabled={!isCreate}
              />
              {/* <Button
              text="Sort By A - Z"
              icon={short_white}
              className="px-4 py-2 rounded-lg border border-black bg-black text-white"
              backgroundColor="transparent"
              textSize=" text-sm"
            /> */}
              <SearchInput
                placeholder="Local search"
                className="rounded-xl px-4 py-2"
                value={searchInput}
                onChange={(value: string) => setSearchInput(value)}
                onClear={() => setSearchInput("")}
              />
            </div>
          </div>
        {/* </div> */}
        <div className=" overflow-x-auto">
          <table className="min-w-full leading-normal border-spacing-y-[6px]  border-separate">
            <thead>
              <tr>
                <th className="text-black opacity-40 py-3 text-center text-base font-normal w-[50px] min-w-[50px]">
                  ID
                </th>
                <th className="text-black opacity-40 text-base py-3 text-left  font-normal min-w-[488px] w-1/2">
                  Categories Name
                </th>
                <th className="text-black opacity-40 py-3 text-center text-base font-normal w-[120px] min-w-[120px]">
                  Last Edited
                </th>
                <th className="text-black opacity-40 py-3 text-center text-base font-normal w-[120px] min-w-[120px]">
                  Status
                </th>
                <th className="text-black opacity-40 py-3 text-center text-base font-normal w-[120px] min-w-[120px]">
                  Order
                </th>
                <th className="text-black opacity-40 md:pe-5 py-3 text-base font-normal w-[168px] min-w-[168px] text-end">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {!allCategories || allCategories.length === 0 ? (
                <>
                  <tr>
                    <td colSpan={6}>
                      <p className="border border-primary bg-white rounded-xl text-center py-4 text-gray-500  text-base">
                        No data available
                      </p>
                    </td>
                  </tr>
                </>
              ) : (
                allCategories.map((tag, index) => (
                  <tr key={index}>
                    <td colSpan={6}>
                      <div
                        ref={(el) => {
                          categoryRefs.current[tag.id] = el;
                        }}
                        className=" hover:bg-gray-100 transition bg-white border border-primary rounded-[15px] p-3"
                      >
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="w-[50px] min-w-[50px]"></th>
                              <th className="min-w-[488px] w-1/2"></th>
                              <th className="w-[120px] min-w-[120px]"></th>
                              <th className="w-[120px] min-w-[120px]"></th>
                              <th className="w-[120px] min-w-[120px]"></th>
                              <th className="w-[168px] min-w-[168px] text-center"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center">{index + 1}</td>
                              <td className=" text-center">
                                <div
                                  className="flex items-center justify-between gap-4 cursor-pointer"
                                  onClick={() => toggleCategory(tag?.id)}
                                >
                                  <p className="font-semibold">{tag?.name}</p>
                                  <span
                                    className={`transition-transform duration-300 px-4 ${
                                      expandedCategoryId == tag.id
                                        ? "rotate-90"
                                        : "rotate-0"
                                    }`}
                                  >
                                    <img src={chevronRight} alt="Toggle" />
                                  </span>
                                </div>
                              </td>
                              <td className=" text-center">23/05/2023</td>
                              <td className="text-center ">
                                <ToggleSwitch
                                  disabled={!isChangeStatus}
                                  checked={tag?.is_active}
                                  onClick={() => {
                                    if (!isChangeStatus) return;
                                    setStatusModalShow(true);
                                    setCurrentStatus(tag?.is_active);
                                    setSelectedCategoryId(String(tag?.id));
                                  }}
                                />
                              </td>
                              <td className=" text-center">
                                <p className={``}>
                                  <span
                                    className={`${
                                      !isChangeOrder
                                        ? "opacity-50 cursor-not-allowed"
                                        : "cursor-pointer"
                                    }`}
                                    onClick={() =>
                                      handleOrderClick(
                                        tag.id,
                                        tag.sort_order || 0,
                                        (categoriesData as any)?.response?.data
                                          ?.totalDocs || allCategories.length,
                                      )
                                    }
                                  >
                                    {tag.sort_order || "-"}
                                  </span>
                                </p>
                              </td>
                              <td className="">
                                <div className="flex gap-2 items-center justify-end">
                                  {/* <Button
                                    icon={eyeOpenIcon}
                                    backgroundColor="transparent"
                                    className="md:py-0"
                                  /> */}
                                  <Button
                                    icon={penIcon}
                                    backgroundColor="transparent"
                                    className={`md:py-0 ${
                                      !isUpdate
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      setEditCategoryData({
                                        id: tag?.id,
                                        name: tag?.name,
                                        modules: tag?.modules,
                                      });
                                      setCreateShow(true);
                                    }}
                                    disabled={!isUpdate}
                                  />
                                  <Button
                                    icon={deleteIcon}
                                    backgroundColor="transparent"
                                    className={`md:py-0 ${
                                      !isDelete
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      setDeleteShow(true);
                                      setSelectedCategoryId(String(tag?.id));
                                    }}
                                    disabled={!isDelete}
                                  />
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={6} className="p-0">
                                <AnimatePresence initial={false}>
                                  {expandedCategoryId == tag.id &&
                                    tag.modules.length > 0 && (
                                      <motion.div
                                        key="modules"
                                        initial={{ height: 0 }}
                                        animate={{ height: "auto" }}
                                        exit={{ height: 0 }}
                                        transition={{
                                          duration: 0.3,
                                          ease: "easeInOut",
                                        }}
                                        className="overflow-hidden ps-5 mt-2"
                                      >
                                        {tag.modules.map((module) => (
                                          <div
                                            key={module.id}
                                            className="bg-white border border-primary rounded-[15px] p-3 mt-2"
                                          >
                                            <table className="w-full">
                                              <tbody>
                                                <tr>
                                                  <td className="w-[50px] text-center"></td>
                                                  <td className="w-1/2 ps-2">
                                                    <p className="font-semibold">
                                                      {module.name}
                                                    </p>
                                                  </td>
                                                  <td className="text-center w-[120px]">
                                                    {module.deleted_at || "—"}
                                                  </td>
                                                  <td className="text-center w-[120px]">
                                                    <span
                                                      className={`px-2 py-0.5 rounded-full text-xs ${
                                                        module.is_active
                                                          ? "bg-green-100 text-green-700"
                                                          : "bg-red-100 text-red-700"
                                                      }`}
                                                    >
                                                      {module.is_active
                                                        ? "Active"
                                                        : "Inactive"}
                                                    </span>
                                                  </td>
                                                  <td className="w-[168px] text-center">
                                                    {/* actions */}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        ))}
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {createShow && (
        <CreateCategories
          show={createShow}
          onClose={() => {
            (setCreateShow(false), setEditCategoryData(null));
          }}
          onCreate={(obj) => createCategoryMutation.mutate(obj)}
          onUpdate={(obj) => updateCategoryMutation.mutate(obj)}
          isLoading={
            createCategoryMutation.isPending || updateCategoryMutation.isPending
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
      {allCategories.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </>
  );
};

export default Categories;

import { useEffect, useMemo, useState } from "react";
import {
  backIconLeft,
  chevronDown,
  deleteIcon,
  penIcon,
  plusIcon,
  rolepermissions,
  spanishFlag,
  usaFlag,
} from "../../../icons";
import api from "../../../lib/api";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Button from "../../ui/button";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../config/paths";
import Pagination from "../../ui/pagination";
import DeleteConfirmModal from "../../articles/DeleteConfirmModal";
import { showToast } from "../../../utils/toastUtils";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useScroll } from "../../../hooks/ScrollContext";
import { useDispatch, useSelector } from "react-redux";
import {
  selectListingState,
  setListingState,
} from "../../../redux-toolkit/moduleListingSearchSlice";
import SearchInput from "../../ui/searchInput";
import { useDebounce } from "../../../hooks/useDebounce";

export interface Modual {
  id: number;
  code: string;
  name: string;
  description: string;
  is_active: boolean;
  sort_order: number;
  deleted_at: string | null;
}

/* ================= Columns ================= */
const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  { title: "Code", minWidth: "min-w-32 w-32" },
  { title: "Name", minWidth: "min-w-40 w-40" },
  { title: "Description", minWidth: "min-w-48 w-48" },
  { title: "Order", minWidth: "min-w-16 w-16" },
  // { title: "Status", minWidth: "min-w-24 w-24" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];

const Modual = () => {
  const module = "module";
  const listingState = useSelector(selectListingState(module));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(listingState.page || 1);
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearch = useDebounce(searchInput, 300);
  const { isScrolled } = useScroll();
  const [deleteShow, setDeleteShow] = useState(false);
  const [moduleTypeId, setModuleTypeId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [moduals, setModuals] = useState<Modual[]>([]);
  const [differentModule, setDifferentModule] = useState<number>(1);
  /* ================= API ================= */
  const getAllModules = async (page: number, differentModule: number) => {
    const params: any = {
      page,
      parent_id: differentModule,
    };

    if (debouncedSearch.trim()) {
      params.search = debouncedSearch; // ✅ add search here
    }

    const res = await api.get("/modules", {
      params,
    });

    return res;
  };

  /* ================= QUERIES ================= */
  const { data: moduleData, isFetching } = useQuery({
    queryKey: ["modules", page, differentModule, debouncedSearch],
    queryFn: () => getAllModules(page, differentModule), // ✅ page explicitly pass
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });

  const totalPages = useMemo(() => {
    return moduleData?.data?.totalPages || 1;
  }, [moduleData?.data?.totalPages]);
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
      const payload = { sort_order: parseInt(new_order) };
      try {
        await api.patch(`/common/change-order/Module/${id}`, payload);

        toast.success(`Order updated to ${new_order}`);
        await queryClient.invalidateQueries({
          queryKey: ["modules"],
          exact: false,
        });
        await queryClient.invalidateQueries({
          queryKey: ["dynamicSideMenu"],
          exact: false,
        });
      } catch (error) {
        console.error("Order update failed:", error);
        toast.error("Failed to update order");
      }
    }
  };
  useEffect(() => {
    if (moduleData?.data?.modules) {
      setModuals(moduleData.data?.modules);
    }
  }, [moduleData?.data]);

  const deleteEventMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/modules/${id}`),
    onSuccess: () => {
      showToast("Module deleted successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["modules"],
        exact: false,
      });
      setDeleteShow(false);
    },
  });
  useEffect(() => {
    dispatch(
      setListingState({
        module,
        page,
        search: debouncedSearch,
      }),
    );
  }, [page]);
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  /* ================= UI ================= */
  return (
    <div>
      {/* Header */}
      <div
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="flex justify-between  items-center">
          <h2 className="text-xl font-bold uppercase">Module</h2>

          <div className="flex justify-end items-center gap-4">
            <SearchInput
              placeholder="Local search"
              className="rounded-2xl px-4 py-2"
              value={searchInput}
              onChange={(value: string) => setSearchInput(value)}
              onClear={() => setSearchInput("")}
            />
            <div className="flex justify-end items-center">
              <div className="relative w-52">
                <select
                  id="language"
                  value={differentModule ?? ""}
                  onChange={(e) => {
                    setDifferentModule(Number(e.target.value));
                    setPage(1); // 👈 reset to page 1 every time
                  }}
                  className="appearance-none w-full md:p-[7px] p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
                >
                  <option value={1}>Side Bar</option>
                  <option value={2}>Administration</option>
                </select>
                <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                  <img src={chevronDown} />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <Button
                text="Back"
                icon={backIconLeft}
                className="px-4"
                onClick={() => navigate("/account/roles")}
              />
              <Button
                text="Create"
                icon={plusIcon}
                className="rounded-lg border border-black px-4 py-2"
                backgroundColor="transparent"
                onClick={() => navigate(paths.module.create.path)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="container overflow-x-auto">
        <table className="min-w-full table-fixed border-separate border-spacing-y-2">
          <thead className="text-left">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.title}
                  className={`p-2 ps-0 text-black font-normal ${col.minWidth}`}
                >
                  {col.title === "Languages" ? (
                    <div className="flex items-center justify-center gap-2">
                      <img src={usaFlag} alt="flags" className="w-6 h-5" />
                      <img src={spanishFlag} alt="flags" className="w-5 h-4" />
                    </div>
                  ) : col.title === "Action" ? (
                    <div className="flex items-center justify-center opacity-40">
                      {col.title}
                    </div>
                  ) : (
                    <span
                      className={`opacity-40 break-words whitespace-normal block text-left ${
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
            {/* Loading Skeleton */}
            {isFetching ? (
              <>
                {[...Array(6)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={columns.length}>
                      <div className="animate-pulse bg-white border border-primary rounded-xl p-4">
                        <div className="flex gap-4">
                          {columns.map((col, j) => (
                            <div
                              key={j}
                              className={`${col.minWidth} h-5 bg-gray-200 rounded`}
                            />
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ) : moduals.length === 0 ? (
              /* Empty State */
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No module data available
                  </div>
                </td>
              </tr>
            ) : (
              /* Data Rows */
              moduals.map((module, index) => {
                return (
                  <tr key={module.id}>
                    <td colSpan={columns.length}>
                      <div className="bg-white border border-primary rounded-xl py-3 hover:bg-gray-100 transition">
                        <table className="w-full table-fixed">
                          <thead>
                            <tr>
                              {columns.map((col) => (
                                <th
                                  key={col.title}
                                  className={col.minWidth}
                                ></th>
                              ))}
                            </tr>
                          </thead>

                          <tbody>
                            <tr>
                              <td className="ps-3">{index + 1}</td>
                              <td>{module.code}</td>
                              <td>{module.name}</td>
                              <td className="line-clamp-1">
                                {module.description || "-"}
                              </td>
                              <td className="text-base text-left">
                                <p className="w-16 px-4">
                                  <span
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleOrderClick(
                                        module?.id,
                                        module?.sort_order,
                                        // null, // or pass actual parent_id if it's a child
                                        moduleData?.data?.totalDocs ||
                                          moduleData?.data?.length, // total number of pages
                                      )
                                    }
                                  >
                                    {module?.sort_order || "-"}
                                  </span>
                                </p>
                              </td>
                              {/* <td>
                              <span
                                className={`px-2 py-1 rounded text-sm ${
                                  module.is_active
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {module.is_active ? "Active" : "Inactive"}
                              </span>
                            </td> */}

                              <td>
                                <div className="flex items-center justify-center gap-3">
                                  {/* Permissions Button */}
                                  <div className="relative group">
                                    <Button
                                      icon={rolepermissions}
                                      backgroundColor="transparent"
                                      className="!py-0"
                                      onClick={() =>
                                        navigate(
                                          `/account/module/permissions/${module.id}`,
                                        )
                                      }
                                    />
                                    <span
                                      className="absolute -top-7 left-1/2 -translate-x-1/2
                   scale-0 group-hover:scale-100 transition
                   bg-black text-white text-xs px-2 py-1 rounded"
                                    >
                                      Permissions
                                    </span>
                                  </div>

                                  {/* Edit Button */}
                                  <div className="relative group">
                                    <Button
                                      icon={penIcon}
                                      backgroundColor="transparent"
                                      className="!py-0"
                                      onClick={() =>
                                        navigate(
                                          `/account/module/edit/${module.id}`,
                                        )
                                      }
                                    />
                                    <span
                                      className="absolute -top-7 left-1/2 -translate-x-1/2
                   scale-0 group-hover:scale-100 transition
                   bg-black text-white text-xs px-2 py-1 rounded"
                                    >
                                      Edit
                                    </span>
                                  </div>

                                  {/* Delete Button */}
                                  <div className="relative group">
                                    <Button
                                      icon={deleteIcon}
                                      backgroundColor="transparent"
                                      className="!py-0"
                                      onClick={() => {
                                        setDeleteShow(true);
                                        setModuleTypeId(String(module?.id));
                                      }}
                                    />
                                    <span
                                      className="absolute -top-7 left-1/2 -translate-x-1/2
                   scale-0 group-hover:scale-100 transition
                   bg-black text-white text-xs px-2 py-1 rounded"
                                    >
                                      Delete
                                    </span>
                                  </div>
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
      {deleteShow && (
        <DeleteConfirmModal
          show={deleteShow}
          onClose={() => setDeleteShow(false)}
          onConfirm={() => {
            if (moduleTypeId) {
              deleteEventMutation.mutate(moduleTypeId);
            }
          }}
          isLoading={deleteEventMutation.isPending}
        />
      )}
      {moduals.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default Modual;

import { useEffect, useMemo, useState } from "react";
import {
  backIconLeft,
  deleteIcon,
  penIcon,
  plusIcon,
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
import { useScroll } from "../../../hooks/ScrollContext";
import SearchInput from "../../ui/searchInput";
import { useDebounce } from "../../../hooks/useDebounce";

export interface Modual {
  id: number;
  code: string;
  name: string;
  description: string;
  is_active: boolean;
  deleted_at: string | null;
}

/* ================= Columns ================= */
const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  { title: "Code", minWidth: "min-w-32 w-32" },
  { title: "Name", minWidth: "min-w-40 w-40" },
  { title: "Description", minWidth: "min-w-48 w-48" },
  // { title: "Status", minWidth: "min-w-24 w-24" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];

const GroupModule = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { isScrolled } = useScroll();
  const [deleteShow, setDeleteShow] = useState(false);
  const [moduleTypeId, setModuleTypeId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [moduals, setModuals] = useState<Modual[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearch = useDebounce(searchInput, 300);
  /* ================= API ================= */
  const getAllModualGroups = async (page: number) => {
    const params: any = {
      page,
    };

    if (debouncedSearch.trim()) {
      params.search = debouncedSearch; // ✅ add search
    }

    const res = await api.get("/module-groups", { params });
    return res.data;
  };
  /* ================= QUERIES ================= */
  const { data, isFetching } = useQuery({
    queryKey: ["module-group", page, debouncedSearch], // ✅ important
    queryFn: () => getAllModualGroups(page),
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });
  const totalPages = useMemo(() => {
    return data?.totalPages || 1;
  }, [data?.totalPages]);
  useEffect(() => {
    if (data?.moduleGroups) {
      setModuals(data.moduleGroups);
    }
  }, [data]);

  const deleteEventMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/module-groups/${id}`),
    onSuccess: () => {
      showToast("Module Group deleted successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["module-group"],
        exact: false,
      });
      setDeleteShow(false);
    },
  });
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);
  /* ================= UI ================= */
  return (
    <div>
      <div
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between  items-center">
          <h2 className="text-xl font-bold uppercase">Group Module</h2>
          <div className="flex justify-center items-center gap-4">
            <SearchInput
              placeholder="Local search"
              className="rounded-2xl px-4 py-2"
              value={searchInput}
              onChange={(value: string) => setSearchInput(value)}
              onClear={() => setSearchInput("")}
            />
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
              onClick={() => navigate(paths.groupmodule.create.path)}
            />
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
                    No modulegroup data available
                  </div>
                </td>
              </tr>
            ) : (
              /* Data Rows */
              moduals.map((modulegroup: any, index) => {
                return (
                  <tr key={modulegroup.id}>
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
                              <td>{modulegroup.code}</td>
                              <td>{modulegroup?.translations?.name}</td>
                              <td className="line-clamp-1">
                                {modulegroup?.translations?.description || "-"}
                              </td>

                              {/* <td>
                              <span
                                className={`px-2 py-1 rounded text-sm ${
                                  modulegroup.is_active
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {modulegroup.is_active ? "Active" : "Inactive"}
                              </span>
                            </td> */}

                              <td>
                                <div className="flex items-center justify-center gap-3">
                                  {/* Permissions Button */}
                                  {/* <div className="relative group">
                                  <Button
                                    icon={rolepermissions}
                                    backgroundColor="transparent"
                                    className="!py-0"
                                    onClick={() =>
                                      navigate(
                                        `/account/modulegroup/permissions/${modulegroup.id}`
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
                                </div> */}

                                  {/* Edit Button */}
                                  <div className="relative group">
                                    <Button
                                      icon={penIcon}
                                      backgroundColor="transparent"
                                      className="!py-0"
                                      onClick={() =>
                                        navigate(
                                          `/account/groupmodule/edit/${modulegroup.id}`,
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
                                        setModuleTypeId(
                                          String(modulegroup?.id),
                                        );
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

export default GroupModule;

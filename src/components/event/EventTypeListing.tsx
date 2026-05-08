import { useEffect, useMemo, useState } from "react";
import ContentHeader from "../Subnavbar";
import { capitalize, formatDate } from "../../config/function";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteIcon, penIcon } from "../../icons";
// import ToggleSwitch from "../ui/switch/ToggleSwitch";
import Button from "../ui/button";
import EventTypeCreate from "./EventTypeCreate";
import { showToast } from "../../utils/toastUtils";
import api from "../../lib/api";

import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import Pagination from "../ui/pagination";
import { useDebounce } from "../../hooks/useDebounce";

export type EventType = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  imageUrl: string;
};

export default function EventTypeListing() {
  const [createShow, setCreateShow] = useState(false);
  const [allEventTypes, setAllEventTypes] = useState([]);
  const [deleteShow, setDeleteShow] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [page, setPage] = useState(1);
  const [eventTypeId, setEventTypeId] = useState<string | null>(null);
  const [editEventTypeData, setEditEventTypeData] = useState<Record<
    string,
    any
  > | null>(null);
  // const [allEventTypes, setAllEventTypes] = useState<EventType[]>([
  //   {
  //     id: "1",
  //     name: "Concert",
  //     description: "A live music event",
  //     enabled: true,
  //     imageUrl: "https://picsum.photos/200/300",
  //   },
  //   {
  //     id: "2",
  //     name: "Theater",
  //     description: "A play or other theatrical performance",
  //     enabled: false,
  //     imageUrl: "https://picsum.photos/200/301",
  //   },
  //   {
  //     id: "3",
  //     name: "Comedy",
  //     description: "A comedy show",
  //     enabled: true,
  //     imageUrl: "https://picsum.photos/200/302",
  //   },
  //   {
  //     id: "4",
  //     name: "Sport",
  //     description: "A sport event",
  //     enabled: true,
  //     imageUrl: "https://picsum.photos/200/303",
  //   },
  // ]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const debouncedSearch = useDebounce(searchInput, 300);
  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadCrumbsItem = [
    { id: null, name: "Home" },
    ...pathParts.map((part, index) => ({
      id: "/" + pathParts.slice(0, index + 1).join("/"),
      name: capitalize(part),
    })),
  ];

  const getEventTypes = async ({
    queryKey,
  }: QueryFunctionContext<[string, number, string?]>) => {
    const [, currentPage, searchInput] = queryKey;
    const params: Record<string, any> = { page: currentPage, limit: 8 };
    if (searchInput?.trim()) {
      params.name = searchInput;
    }
    const res = await api.get("/event_type", { params });
    return res.data;
  };
  const { data: allEventTypesData } = useQuery({
    queryKey: ["eventTypes", page, debouncedSearch],
    queryFn: getEventTypes,
    refetchOnWindowFocus: false,
  });
  const createEventType = async (payload: any) => {
    const response = await api.post("/event_type", payload);
    return response?.data;
  };

  const createEventTypeMutation = useMutation({
    mutationFn: createEventType,
    onSuccess: () => {
      showToast("Event Type created successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["eventTypes"],
        exact: false,
      });
      setCreateShow(false);
    },
    onError: () => {
      console.error("Failed to create photo album");
    },
  });

  const updateEventType = async (payload: any) => {
    const response = await api.put(`/event_type/${eventTypeId}`, payload);
    return response.data;
  };
  const updateEventTypeMutation = useMutation({
    mutationFn: updateEventType,
    onSuccess: () => {
      showToast("Event Type created successfully", "success");
      setEventTypeId(null);
      setEditEventTypeData(null);
      queryClient.invalidateQueries({
        queryKey: ["eventTypes"],
        exact: false,
      });
      setCreateShow(false);
    },
    onError: () => {
      console.error("Failed to create photo album");
    },
  });

  const deleteEventTypeMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/event_type/${id}`),
    onSuccess: () => {
      showToast("Event Type deleted successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["eventTypes"],
        exact: false,
      });
      setDeleteShow(false);
    },
  });
  const totalPages = useMemo(() => {
    return allEventTypesData?.totalPages || 1;
  }, [allEventTypesData?.totalPages]);

  const handleBreadcrumbClick = (id: string | null, index: number) => {
    dispatch(popToIndex(index));
    navigate(id ? `` : `/dashboard`);
  };
  useEffect(() => {
    if (allEventTypesData) {
      setAllEventTypes(allEventTypesData?.eventTypes);
    }
  }, [allEventTypesData]);

  const handleCreate = () => {
    setCreateShow(true);
  };
  return (
    <div className="mt-10">
      <ContentHeader
        title="Event Types"
        breadCrumbsItem={breadCrumbsItem}
        onBreadCrumbClick={handleBreadcrumbClick}
        onCreate={handleCreate}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        // showDropdown={showDropdown}
        // toggleDropdown={toggleDropdown}
        // closeDropdown={closeDropdown}
        // columns={columns}
        // tempVisibleColumns={tempVisibleColumns}
        // handleTempToggle={handleTempToggle}
        // applyColumnChanges={applyColumnChanges}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal border-spacing-y-[6px]  border-separate">
          <thead>
            <tr>
              <th className="text-black opacity-40 py-3 text-start text-base font-normal w-[30px] min-w-[30px]">
                ID
              </th>
              <th className="text-black opacity-40 text-base py-3 text-left  font-normal min-w-[200px] w-[200px]">
                Event Type Title
              </th>
              <th className="text-black opacity-40 py-3 text-start text-base font-normal w-[140px] min-w-[140px]">
                Created At
              </th>
              <th className="text-black opacity-40 py-3 text-start text-base font-normal w-[140px] min-w-[140px]">
                Updated At
              </th>
              <th className="text-black opacity-40 md:pe-5 py-3 text-base font-normal w-[168px] min-w-[168px] text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {!allEventTypes || allEventTypes.length === 0 ? (
              <>
                <tr>
                  <td colSpan={6}>
                    <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                      No  data available
                    </div>
                  </td>
                </tr>
              </>
            ) : (
              allEventTypes.map((eventType: any, index) => (
                <tr key={index}>
                  <td colSpan={6}>
                    <div className=" hover:bg-gray-100 transition bg-white border border-primary rounded-[15px] p-3">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="w-[30px] min-w-[30px]"></th>
                            <th className="min-w-[200px] w-[200px]"></th>
                            <th className="w-[140px] min-w-[140px]"></th>
                            <th className="w-[140px] min-w-[140px]"></th>
                            <th className="w-[168px] min-w-[168px] text-center"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-left text-base">{index + 1}</td>
                            <td className=" text-start">
                              <p className="font-semibold">{eventType?.name}</p>
                            </td>
                            <td className=" text-start">
                              {formatDate(eventType?.created_at)}
                            </td>
                            <td className=" text-start">
                              {formatDate(eventType?.updated_at)}
                            </td>
                            <td className="">
                              <div className="flex gap-3 items-center justify-end">
                                {/* <Button
                                  icon={eyeOpenIcon}
                                  backgroundColor="transparent"
                                  className="md:py-0"
                                /> */}
                                <Button
                                  icon={penIcon}
                                  backgroundColor="transparent"
                                  className="md:py-0"
                                  onClick={() => {
                                    setEditEventTypeData(eventType);
                                    setEventTypeId(String(eventType?.id));
                                    setCreateShow(true);
                                  }}
                                />
                                <Button
                                  icon={deleteIcon}
                                  backgroundColor="transparent"
                                  className="md:py-0"
                                  onClick={() => {
                                    setDeleteShow(true);
                                    setEventTypeId(String(eventType?.id));
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
              ))
            )}
          </tbody>
        </table>
      </div>
      {allEventTypes.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
      {createShow && (
        <EventTypeCreate
          show={createShow}
          onClose={() => {
            setCreateShow(false);
            setEditEventTypeData(null);
          }}
          onCreate={(obj) => createEventTypeMutation.mutate(obj)}
          onUpdate={(obj) => updateEventTypeMutation.mutate(obj)}
          isLoading={createEventTypeMutation.isPending}
          editData={editEventTypeData}
        />
      )}
      {deleteShow && (
        <DeleteConfirmModal
          show={deleteShow}
          onClose={() => setDeleteShow(false)}
          onConfirm={() => {
            if (eventTypeId) {
              deleteEventTypeMutation.mutate(eventTypeId);
            }
          }}
          isLoading={deleteEventTypeMutation.isPending}
        />
      )}
    </div>
  );
}

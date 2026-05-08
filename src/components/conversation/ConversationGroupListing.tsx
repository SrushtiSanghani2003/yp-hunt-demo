import { useNavigate, useParams } from "react-router-dom";
import { capitalize, concatImgURL, formatDate } from "../../config/function";
import ContentHeader from "../Subnavbar";
import { useDispatch } from "react-redux";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import Button from "../ui/button";
import {
  deleteIcon,
  mediaIcon,
  penIcon,
  spanishFlag,
  usaFlag,
} from "../../icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import { showToast } from "../../utils/toastUtils";
import DeleteConfirmModal from "../articles/DeleteConfirmModal";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import Pagination from "../ui/pagination";
import { useConversationGrouplist } from "../../hooks/useConversation";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { resetConversationGroup } from "../../redux-toolkit/conversationGroupSlice";
import { useScroll } from "../../hooks/ScrollContext";
const columns = [
  { title: "ID", minWidth: "min-w-8 w-8" },
  { title: "Logo Image", minWidth: "min-w-28 w-28" },
  { title: "title", minWidth: "min-w-72 w-72" },
  //   { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Status", minWidth: "min-w-28 w-28" },
  { title: "Created At", minWidth: "min-w-28 w-28" },
  { title: "Action", minWidth: "min-w-28 w-28" },
];
const STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
} as const;
export default function ConversationListing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { isScrolled } = useScroll();
  const { groupId } = useParams<{ groupId: string | any }>();

  const [allConversationGroup, setAllConversationGroup] = useState([]);
  const [deleteShow, setDeleteShow] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(searchInput, 300);
  const [statusModalShow, setStatusModalShow] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<number | string | null>(
    null,
  );
  const [selectedConversationGroupId, setSelectedConversationGroupId] =
    useState<string | null>(null);
  const handleEditConversationGroup = (id: number) => {
    if (!id) return;
    navigate(`/conversation/group/${groupId}/edit/${id}`);
  };

  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadCrumbsItem = [
    { id: null, name: "Home" },
    ...pathParts
      .filter((part) => isNaN(Number(part))) // remove numeric ids
      .map((part, index) => ({
        id: "/" + pathParts.slice(0, index + 1).join("/"),
        name: capitalize(part),
      })),
  ];

  const handleBreadcrumbClick = (id: string | null, index: number) => {
    if (index === breadCrumbsItem.length - 1) return;
    dispatch(popToIndex(index));
    if (id) {
      navigate(id); // 🔥 exact breadcrumb path
    } else {
      navigate("/dashboard"); // Home
    }
    // navigate(id ? `` : `/dashboard`);
  };
  const { data: allConversationGroupData, isFetching } =
    useConversationGrouplist(page, debouncedSearch, groupId, false);

  const statusChange = async (ConversationId: string) => {
    const updatedStatus =
      currentStatus === STATUS.ACTIVE ? STATUS.INACTIVE : STATUS.ACTIVE;

    return api.patch(`conversations/group/${ConversationId}/status`, {
      status: updatedStatus,
    });
  };

  const statusChangeMutation = useMutation({
    mutationFn: statusChange,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversation-group"],
        exact: false,
      });
      showToast("Status Changed", "success");
      setStatusModalShow(false);
      setSelectedConversationGroupId(null);
    },
    onError: () => {
      showToast("Failed to change status", "error");
    },
  });
  const deleteConversation = async (id: string) => {
    return await api.delete(`conversations/group/${id}`);
  };
  const deleteConversationsMutation = useMutation({
    mutationFn: deleteConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversation-group"],
        exact: false,
      });
      showToast("conversation group Deleted Successfully", "success");
      setDeleteShow(false);
      setSelectedConversationGroupId(null);
    },
    onError: () => {
      showToast("Failed to delete conversation group", "error");
    },
  });
  const handleConfirmDelete = () => {
    if (selectedConversationGroupId) {
      deleteConversationsMutation.mutate(String(selectedConversationGroupId));
    }
  };
  const totalPages = useMemo(() => {
    return allConversationGroupData?.totalPages;
  }, [allConversationGroupData?.totalPages]);
  const handleCreate = () => {
    dispatch(resetConversationGroup());
    navigate(`/conversation/group/${groupId}/create`);
  };
  useEffect(() => {
    if (allConversationGroupData?.data) {
      setAllConversationGroup(allConversationGroupData?.data || []);
    }
  }, [allConversationGroupData]);
  return (
    <div >
      <div
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <ContentHeader
          title="Conversation Group"
          breadCrumbsItem={breadCrumbsItem}
          onBreadCrumbClick={handleBreadcrumbClick}
          onCreate={handleCreate}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </div>
      <div className="container overflow-x-auto my-3">
        <table className="min-w-full table-fixed border-separate border-spacing-y-2 pb-16">
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
                  ) : (
                    <span
                      className={`${
                        col.title === "Action" || col.title === "Status"
                          ? "flex items-center justify-center gap-1"
                          : ""
                      } opacity-40 break-words whitespace-normal block text-left  ${
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
            {isFetching ? (
              <>
                {[...Array(8)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={columns.length}>
                      <div className="animate-pulse bg-white border  border-primary rounded-2xl p-4">
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
            ) : allConversationGroup?.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="text-center text-gray-500 bg-white border border-primary rounded-2xl p-6">
                    No conversation group data available.
                  </div>
                </td>
              </tr>
            ) : (
              (allConversationGroup as any[])?.map(
                (conversationgroup, index) => {
                  return (
                    <tr key={conversationgroup?.conversation_id} className="">
                      <td colSpan={columns.length}>
                        <div className="hover:bg-gray-100 transition bg-white border border-primary rounded-xl py-2 max-h-fit  h-24">
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
                                <PhotoProvider maskOpacity={0.6}>
                                  <td className="text-base cursor-pointer">
                                    <PhotoView
                                      src={concatImgURL(conversationgroup.logo)}
                                    >
                                      {conversationgroup.logo ? (
                                        <img
                                          src={concatImgURL(
                                            conversationgroup.logo,
                                          )}
                                          className="w-20 h-14 object-cover rounded-xl"
                                          alt="Hero Image"
                                        />
                                      ) : (
                                        <div className="w-20 h-14 bg-f6f6f6 border-0.5 border-primary rounded-xl flex justify-center items-center">
                                          <img
                                            src={mediaIcon}
                                            alt="Placeholder"
                                          />
                                        </div>
                                      )}
                                    </PhotoView>
                                  </td>
                                </PhotoProvider>
                                <td className="text-base text-left">
                                  <p className="w-72 line-clamp-1">
                                    {conversationgroup.title}
                                  </p>
                                </td>
                                <td className="text-base relative  text-left cursor-pointer">
                                  <ToggleSwitch
                                    checked={
                                      conversationgroup.status === STATUS.ACTIVE
                                    }
                                    onClick={() => {
                                      setStatusModalShow(true);
                                      setCurrentStatus(
                                        conversationgroup?.status,
                                      );
                                      setSelectedConversationGroupId(
                                        String(
                                          conversationgroup?.conversation_id,
                                        ),
                                      );
                                    }}
                                  />
                                </td>
                                <td className="text-base text-left">
                                  {formatDate(conversationgroup.created_at)}
                                </td>
                                <td className="">
                                  <div className="flex items-center justify-center gap-3">
                                    {/* <Button
                                    icon={eyeOpenIcon}
                                    backgroundColor="transparent"
                                    className="p-0"
                                    onClick={() =>
                                      handleEditConversationGroup(
                                        conversationgroup?.conversation_id
                                      )
                                    }
                                  /> */}
                                    <Button
                                      icon={penIcon}
                                      backgroundColor="transparent"
                                      className="p-0"
                                      onClick={() =>
                                        handleEditConversationGroup(
                                          conversationgroup?.conversation_id,
                                        )
                                      }
                                    />
                                    <Button
                                      icon={deleteIcon}
                                      backgroundColor="transparent"
                                      className="p-0"
                                      onClick={() => {
                                        setSelectedConversationGroupId(
                                          String(
                                            conversationgroup?.conversation_id,
                                          ),
                                        );
                                        setDeleteShow(true);
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
                },
              )
            )}
          </tbody>
        </table>
      </div>
      {deleteShow && (
        <DeleteConfirmModal
          show={deleteShow}
          onClose={() => setDeleteShow(false)}
          onConfirm={handleConfirmDelete}
          isLoading={deleteConversationsMutation.isPending}
        />
      )}
      {statusModalShow && (
        <ChangeStatusModal
          show={statusModalShow}
          onClose={() => setStatusModalShow(false)}
          onSave={() => {
            if (selectedConversationGroupId) {
              statusChangeMutation.mutate(selectedConversationGroupId);
            }
          }}
          isLoading={statusChangeMutation.isPending}
        />
      )}
      {allConversationGroup?.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

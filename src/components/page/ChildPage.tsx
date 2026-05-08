import { useNavigate } from "react-router-dom";
import { capitalize, concatImgURL, formatDate } from "../../config/function";
import {
  chevronRight,
  correctIconGreen,
  // correctIconGreen,
  deleteIcon,
  // eyeOpenIcon,
  mediaIcon,
  penIcon,
} from "../../icons";
import Button from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../utils/toastUtils";
import api from "../../lib/api";
import StatusModel from "../StatusModel";
import ChangeStatusModal from "../articles/ChangeStatusModal";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { MdOutlineContentCopy } from "react-icons/md";
import { getPermissionFlags } from "../sidebar/menuPermissions";
import { useSelector } from "react-redux";
import { selectMenuPermissions } from "../../redux-toolkit/menuPermissionsSlice";

const ChildPage = ({
  pageChild,
  setSelectedPage,
  videoId,
  visibleColumns,
  childIndex,
  level = 0,
  setShowDeleteModal,
  handleConfirmDelete,
  parentId,
  fromPage,
}: any) => {
  const [showModal, setShowModal] = useState(false);
  const [draftModal, setDraftModal] = useState(false);
  const [dropdownPageId, setDropdownPageId] = useState<number | null>(null);
  const [selectedPageData, setSelectedPageData] = useState({});
  const [selectedPageStatus, setSelectedPageStatus] = useState("");
  const [expanded, setExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // const [selectedPage, setSelectedPage] = useState<null | {
  //   id: number;
  //   title: string;
  // }>(null);
  const menuPermissions = useSelector(selectMenuPermissions);
  const { isCopy, isDelete, isUpdate, isChangeStatus, isChangeOrder } =
    getPermissionFlags(menuPermissions.pages);

  const handleOrderClick = async (
    id: number,
    current_order: number,
    totalDocs: number
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
        await api.patch(`/common/change-order/Page/${id}`, payload);

        toast.success(`Order updated to ${new_order}`);
        await queryClient.invalidateQueries({
          queryKey: ["pages"],
          exact: false,
        });
      } catch (error) {
        console.error("Order update failed:", error);
        toast.error("Failed to update order");
        queryClient.invalidateQueries({ queryKey: ["pages"], exact: false });
      }
    }
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const categories = pageChild.categories
    .map((item: any) => item.name)
    .join(", ") || <span className="text-gray-400">No category</span>;

  const handleEditPage = (id: number) => {
    if (!id) return;

    navigate(`/pages/edit/${id}`, {
      state: {
        fromPage: fromPage,
        // restoreSearch: fromSearch,
      }, // send it back silently
      replace: true, // optional: prevents back button double route
    });
  };

  const handleCopyPage = (id: number) => {
    if (!isCopy) return;
    if (!id) return;
    navigate(`/pages/create`, {
      state: {
        fromPage: fromPage, // 👈 send current pagination page
        // fromSearch: searchInput, // current search
        isCopy: true,
        copyPageId: id,
      },
    });
  };

  const handleTranslationClick = async (pagesId: string, lang: "en" | "es") => {
    navigate(`/pages/edit/${pagesId}?lang=${lang}`);
  };

  const toggleStatusDropdown = (pageId: number) => {
    if (!isChangeStatus) return;
    setDropdownPageId(dropdownPageId === pageId ? null : pageId);
  };

  const updateStatus = async (payload: any) => {
    await api.patch(`/pages/${pageChild?.id}/change-status`, payload);
  };

  const updateStatusMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      showToast("Status Updated", "success");
      queryClient.invalidateQueries({ queryKey: ["pages"], exact: false });
      setShowModal(false);
      setDraftModal(false);
    },
    onError: (error) => {
      console.log("Error updating status", error);
    },
  });

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

  return (
    <>
      <div
        key={pageChild.id}
        className="bg-white border border-primary rounded-[15px] p-2 mt-2"
        // style={{ marginLeft: `${level * 20}px` }} // indent children
      >
        <table className="w-full">
          <tbody>
            <tr>
              {visibleColumns.includes("ID") && (
                <td className="text-base text-left ps-3">{childIndex + 1}</td>
              )}
              {visibleColumns.includes("Image") && (
                <td className="text-base">
                  {videoId ? (
                    <img
                      src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                      className="w-16 h-12 object-cover rounded-xl"
                      alt="Video Thumbnail"
                    />
                  ) : pageChild.hero_media.length > 0 ? (
                    <img
                      src={concatImgURL(pageChild.hero_media[0].media_url)}
                      className="w-16 h-12 object-cover rounded-xl"
                      alt="Hero Image"
                    />
                  ) : (
                    <div className="w-16 h-12 bg-f6f6f6 border-0.5 border-primary rounded-xl flex justify-center items-center">
                      <img src={mediaIcon} alt="Placeholder" className="" />
                    </div>
                  )}
                </td>
              )}
              {visibleColumns.includes("Title") && (
                <td className="text-base text-left">
                  <div
                    className="flex items-center justify-between  gap-4 cursor-pointer"
                    onClick={() =>
                      pageChild.children?.length > 0 && setExpanded(!expanded)
                    }
                  >
                    <p
                      className={`${
                        pageChild.children.length > 0 ? "w-40" : "w-64"
                      }`}
                    >
                      {pageChild?.title?.length > 80
                        ? `${pageChild?.title?.slice(0, 80)}...`
                        : pageChild?.title}
                    </p>
                    {pageChild.children.length > 0 && (
                      <span
                        className={`cursor-pointer px-4 transition-transform duration-300 inline-block ${
                          expanded ? "rotate-90" : "rotate-0"
                        }`}
                      >
                        <img src={chevronRight} alt="Toggle" />
                      </span>
                    )}
                  </div>
                </td>
              )}
              {visibleColumns.includes("Order") && (
                <td className="text-base text-left ">
                  <p className={`w-20 px-4`}>
                    <span
                      className={`${
                        !isChangeOrder
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      onClick={() =>
                        handleOrderClick(
                          pageChild?.id,
                          pageChild?.sort_order,
                          // null, // or pass actual parent_id if it's a child
                          pageChild?.data?.totalDocs || pageChild?.data?.length // total number of pages
                        )
                      }
                    >
                      {pageChild?.sort_order || "-"}
                    </span>
                  </p>
                </td>
              )}
              {visibleColumns.includes("Slug") && (
                <td className="text-base text-left">
                  <p className="w-32 line-clamp-2">{pageChild.slug || "—"}</p>
                </td>
              )}
              {visibleColumns.includes("Categories") && (
                <td className="text-base text-left">
                  <p className="w-24 line-clamp-3">
                    {categories.length > 25
                      ? `${categories.slice(0, 25)}...`
                      : categories}
                  </p>
                </td>
              )}
              {visibleColumns.includes("Author") && (
                <td className="text-base text-left px-10">
                  <p className="w-24">{pageChild.author_name || "-"}</p>
                </td>
              )}
              {visibleColumns.includes("Pub. Platform") && (
                <td className="text-base text-left px-10 w-24 ">
                  {pageChild.publish_platforms?.join(", ") || "-"}
                </td>
              )}
              {visibleColumns.includes("Restriction") && (
                <td className="text-base text-left px-10">
                  <p className="w-32">
                    {pageChild.restriction_type?.split("_").join(" ") || "None"}
                  </p>
                </td>
              )}
              {visibleColumns.includes("Geo Country") && (
                <td className="text-base text-left">
                  <p className="w-24">
                    {pageChild.geo_block_country?.join(", ") || "-"}
                  </p>
                </td>
              )}
              {visibleColumns.includes("Geo Mode") && (
                <td className="text-base text-left w-30">
                  {pageChild.geo_block_mode || "None"}
                </td>
              )}
              {visibleColumns.includes("Pub./Sche. At") && (
                <td className="text-base text-left w-32">
                  {pageChild.published_at ||
                  pageChild.schedule_at ||
                  pageChild.scheduled_at ? (
                    formatDate(
                      pageChild.published_at
                        ? pageChild.published_at
                        : pageChild.schedule_at || pageChild.scheduled_at
                    )
                  ) : (
                    <span className=" text-gray-400">Not Published</span>
                  )}
                </td>
              )}
              {visibleColumns.includes("Read Time") && (
                <td className="text-base text-left w-30">
                  {`${pageChild.read_time} Minutes` || "-"}
                </td>
              )}

              {visibleColumns.includes("Logged In") && (
                <td className="text-base text-left">
                  {pageChild.must_be_logged_in ? "Yes" : "No"}
                </td>
              )}
              {visibleColumns.includes("Verified") && (
                <td className="text-base text-left">
                  {pageChild.must_be_verified ? "Yes" : "No"}
                </td>
              )}
              {visibleColumns.includes("Over 18") && (
                <td className="text-base text-left">
                  {pageChild.must_be_over_18 ? "Yes" : "No"}
                </td>
              )}

              {visibleColumns.includes("Sponsor") && (
                <td className="text-base text-left">
                  {pageChild.sponsor_name || "-"}
                </td>
              )}
              {visibleColumns.includes("Languages") && (
                <td className="">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      backgroundColor="transparent"
                      className={`p-0 ${
                        !isUpdate && "opacity-50 cursor-not-allowed"
                      }`}
                      icon={
                        pageChild.languages.includes("en")
                          ? correctIconGreen
                          : penIcon
                      }
                      onClick={() =>
                        handleTranslationClick(pageChild?.id, "en")
                      }
                      disabled={!isUpdate}
                    />
                    <Button
                      backgroundColor="transparent"
                      className={`p-0 ${
                        !isUpdate && "opacity-50 cursor-not-allowed"
                      }`}
                      icon={
                        pageChild.languages.includes("es")
                          ? correctIconGreen
                          : penIcon
                      }
                      onClick={() =>
                        handleTranslationClick(pageChild?.id, "es")
                      }
                      disabled={!isUpdate}
                    />
                  </div>
                </td>
              )}
              {visibleColumns.includes("Status") && (
                <td
                  className="text-base relative  text-left cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStatusDropdown(pageChild.id);
                  }}
                >
                  <div
                    className={`${
                      pageChild.status === "published"
                        ? "bg-green-600"
                        : pageChild.status === "scheduled"
                        ? "bg-blue-600"
                        : "bg-primary"
                    } text-white font-semibold py-1 rounded-lg w-24 flex mx-auto justify-evenly ${
                      !isChangeStatus && "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <span className="">{capitalize(pageChild.status)}</span>
                  </div>
                  {dropdownPageId === pageChild.id && (
                    <div
                      ref={dropdownRef}
                      className="absolute z-10 mt-2 w-28 bg-white border border-primary rounded-xl  shadow-lg duration-500 transform transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ul className="py-1 text-sm text-gray-700 px-1">
                        {["Draft", "Published", "Scheduled"]
                          .filter(
                            (status) =>
                              status.toLowerCase() !== pageChild.status
                          )
                          .map((status) => (
                            <li
                              key={status}
                              className="cursor-pointer px-4 py-2 font-medium hover:bg-primary rounded-xl hover:duration-500 transform transition-all"
                              onClick={() => {
                                setSelectedPageData(pageChild);
                                setSelectedPageStatus(status);
                                setSelectedPage({
                                  id: pageChild.id,
                                  title: pageChild.title,
                                  isChild: true, // Indicate this is a child page
                                  parentId, // Pass parentId for child page deletion
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

              {visibleColumns.includes("Created At") && (
                <td className="text-base text-left">
                  {formatDate(pageChild.created_at)}
                </td>
              )}
              {visibleColumns.includes("Updated At") && (
                <td className="text-base text-left">
                  {formatDate(pageChild.updated_at)}
                </td>
              )}

              {visibleColumns.includes("Action") && (
                <td className="">
                  <div className="flex items-center justify-center gap-3">
                    {/* <Button icon={eyeOpenIcon} backgroundColor="transparent" className="p-0" /> */}
                    <Button
                      icon={penIcon}
                      backgroundColor="transparent"
                      className={`p-0 ${
                        !isUpdate && "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={() => handleEditPage(pageChild?.id)}
                      disabled={!isUpdate}
                    />
                    <span
                      className={`${
                        !isCopy
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      onClick={() => handleCopyPage(pageChild?.id)}
                    >
                      <MdOutlineContentCopy />
                    </span>
                    <Button
                      icon={deleteIcon}
                      backgroundColor="transparent"
                      className={`p-0 ${
                        !isDelete && "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={() => {
                        // console.log("Selected Child Page for Deletion:", {
                        //   id: pageChild?.id,
                        //   title: pageChild?.title,
                        //   parentId,
                        //   isChild: true,
                        // });
                        setSelectedPage({
                          id: pageChild?.id,
                          title: pageChild?.title,
                          isChild: true, // Indicate this is a child page
                          parentId, // Pass parentId for child page deletion
                        });
                        setShowDeleteModal(true);
                      }}
                      disabled={!isDelete}
                    />
                  </div>
                </td>
              )}
            </tr>

            {/* Recursive children */}

            {expanded &&
              pageChild.children &&
              pageChild.children.map((child: any, idx: number) => (
                <tr key={child.id}>
                  <td colSpan={visibleColumns.length}>
                    <ChildPage
                      key={child.id}
                      pageChild={child}
                      videoId={null}
                      visibleColumns={visibleColumns}
                      childIndex={idx}
                      level={level + 1}
                      setShowDeleteModal={setShowDeleteModal} // from parent
                      setSelectedPage={setSelectedPage} // from parent
                      handleConfirmDelete={handleConfirmDelete}
                      fromPage={fromPage}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <StatusModel
          show={showModal}
          onClose={() => setShowModal(false)}
          data={selectedPageData}
          selectedStatus={selectedPageStatus}
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
    </>
  );
};

export default ChildPage;

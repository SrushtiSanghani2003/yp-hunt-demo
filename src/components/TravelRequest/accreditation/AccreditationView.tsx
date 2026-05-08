import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";
import SidebarDialog from "../../ui/sidebarDialog/SidebarDialog";
import { concatImgURL, formatDate } from "../../../config/function";
import { mediaIcon } from "../../../icons";
import Button from "../../ui/button";
import { useState } from "react";
import { showToast } from "../../../utils/toastUtils";
import { BsFilePdfFill } from "react-icons/bs";
import ChangeStatusModal from "../../articles/ChangeStatusModal";
import { useSelector } from "react-redux";
import { selectMenuPermissions } from "../../../redux-toolkit/menuPermissionsSlice";
import { getPermissionFlags } from "../../sidebar/menuPermissions";
type ModalStatus = "Pending" | "Confirmed" | "Declined" | "Cancel";
type StatusVariant = "primary" | "danger" | "confirme";
type StatusAction = {
  text: string;
  variant: StatusVariant;
  onClick: () => void;
  disabled?: boolean;
};
const SkeletonLine = ({ width = "w-full" }) => (
  <div className={`h-4 bg-gray-200 rounded ${width}`} />
);
const SkeletonBox = () => (
  <div className="border border-primary rounded-2xl p-4 space-y-3 animate-pulse">
    <SkeletonLine width="w-40" />
    <SkeletonLine />
    <SkeletonLine />
    <SkeletonLine width="w-2/3" />
  </div>
);
const AccreditationViewSkeleton = () => (
  <div className="space-y-5">
    <SkeletonBox />
    <SkeletonBox />
    <SkeletonBox />
    <SkeletonBox />

    {/* Notes Skeleton */}
    <div className="border border-primary rounded-2xl p-4 space-y-4 animate-pulse">
      <SkeletonLine width="w-32" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-10 bg-gray-200 rounded-xl" />
        <div className="h-10 bg-gray-200 rounded-xl" />
        <div className="h-24 bg-gray-200 rounded-xl" />
        <div className="h-24 bg-gray-200 rounded-xl" />
      </div>

      <div className="flex gap-4">
        <div className="h-10 w-40 bg-gray-200 rounded-full" />
        <div className="h-10 w-40 bg-gray-200 rounded-full" />
      </div>
    </div>
  </div>
);
const LabelValue = ({ label, value }: { label: string; value?: any }) => (
  <div className="flex justify-between gap-4 py-1">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-right">{value || "-"}</span>
  </div>
);

const AccreditationView = ({
  open,
  onClose,
  accreditationId,
}: {
  open: boolean;
  onClose: () => void;
  accreditationId: string;
}) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["accreditation", accreditationId],
    queryFn: () => api.get(`/travel-request/accreditation/${accreditationId}`),
    enabled: !!accreditationId,
  });

  const queryClient = useQueryClient();
  const [declineReason, setDeclineReason] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const menuPermissions = useSelector(selectMenuPermissions);
  const { isChangeStatus } = getPermissionFlags(menuPermissions.transportation);
  const [statusPopupOpen, setStatusPopupOpen] = useState(false);
  const [nextStatus, setNextStatus] = useState<ModalStatus | null>(null);
  const accreditation = data?.data;
  console.log("🚀 ~ AccreditationView ~ accreditation:", accreditation)
  const isConfirmed = accreditation?.status === "Confirmed";
  const isPending = accreditation?.status === "Pending";
  const isDeclined = accreditation?.status === "Declined";
  const updateAccreditationStatus = (
    id: string,
    payload: {
      status: string;
    },
    params?: any,
  ) => {
    return api.put(`/travel-request/accreditation/${id}`, payload, { params });
  };

  const { mutate: updateStatus, isPending: isStatusUpdating } = useMutation({
    mutationFn: ({
      id,
      payload,
      params,
    }: {
      id: string;
      payload: any;
      params?: any;
    }) => updateAccreditationStatus(id, payload, params),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accreditation"],
        exact: false,
      });

      showToast("Accreditation Status Updated", "success");
    },
  });
  const { mutate: updateUserNotes, isPending: isUserNotesUpdating } =
    useMutation({
      mutationFn: ({
        id,
        payload,
        params,
      }: {
        id: string;
        payload: any;
        params?: any;
      }) => updateAccreditationStatus(id, payload, params),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["accreditation"],
          exact: false,
        });
        showToast("User notes updated", "success");
      },
    });
  const { mutate: updateAdminNotes, isPending: isAdminNotesUpdating } =
    useMutation({
      mutationFn: ({ id, payload }: { id: string; payload: any }) =>
        updateAccreditationStatus(id, payload),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["accreditation"],
          exact: false,
        });
        showToast("Admin notes updated", "success");
      },
    });
  const handleStatusChange = (
    status: "Pending" | "Confirmed" | "Declined" | "Cancel",
  ) => {
    const payload: any = { status };
    const shouldNotify = status === "Confirmed" || status === "Declined";
    updateStatus({
      id: accreditationId,
      payload,
      params: shouldNotify && { is_notification: true },
    });

    onClose();
  };
  const openStatusPopup = (status: ModalStatus) => {
    setNextStatus(status);
    setStatusPopupOpen(true);
  };
  const confirmStatusChange = () => {
    if (!nextStatus) return;

    handleStatusChange(nextStatus); // 👈 existing logic
    setStatusPopupOpen(false);
    setNextStatus(null);
  };

  const handleSubmitUserNotesOnly = () => {
    updateUserNotes({
      id: accreditationId,
      payload: {
        decline_reason: declineReason || "",
      },
      params: {
        is_notification: true,
      },
    });

    showToast("User notes updated", "success");
  };
  const handleSubmitAdminNotesOnly = () => {
    updateAdminNotes({
      id: accreditationId,
      payload: {
        admin_notes: adminNotes || "",
      },
    });

    showToast("User notes updated", "success");
  };
  const statusActions: StatusAction[] = !accreditation
    ? []
    : isPending
      ? [
          {
            text: "Move to Approve",
            variant: "confirme",
            disabled: !isChangeStatus,
            onClick: () => isChangeStatus && openStatusPopup("Confirmed"),
          },
          {
            text: "Move to Decline",
            variant: "danger",
            disabled: !isChangeStatus,
            onClick: () => isChangeStatus && openStatusPopup("Declined"),
          },
        ]
      : isConfirmed
        ? [
            {
              text: "Move to Pending",
              variant: "primary",
              disabled: !isChangeStatus,
              onClick: () => isChangeStatus && openStatusPopup("Pending"),
            },
            {
              text: "Move to Cancel",
              variant: "danger",
              disabled: !isChangeStatus,
              onClick: () => isChangeStatus && openStatusPopup("Cancel"),
            },
          ]
        : isDeclined
          ? [
              {
                text: "Move to Pending",
                variant: "primary",
                disabled: !isChangeStatus,

                onClick: () => isChangeStatus && openStatusPopup("Pending"),
              },
            ]
          : [];

  return (
    <SidebarDialog
      key={accreditationId}
      open={open}
      onClose={onClose}
      title="Accreditation Details"
      statusActions={statusActions}
    >
      {isLoading || isFetching ? (
        <AccreditationViewSkeleton />
      ) : !accreditation ? (
        <p className="text-center text-gray-500">No data available</p>
      ) : (
        <div className="space-y-5">
          {/* User Info */}
          <div className="border border-primary rounded-2xl p-4">
            <h3 className="font-semibold mb-3">User Information</h3>

            <div className="flex items-center gap-3 mb-3">
              {accreditation.appuser?.image ? (
                <img
                  src={concatImgURL(accreditation.appuser.image)}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-f6f6f6 flex items-center justify-center">
                  <img src={mediaIcon} />
                </div>
              )}

              <div>
                <p className="font-semibold">
                  {accreditation.appuser?.full_name || "-"}
                </p>
                <p className="text-sm text-gray-500">
                  User ID: {accreditation.appuser_id}
                </p>
              </div>
            </div>

            <LabelValue
              label="Contact Number"
              value={`+${accreditation.contact_phone_code} ${accreditation.contact_number}`}
            />
            <LabelValue
              label="Phone Number"
              value={`+${accreditation.phone_code} ${accreditation.phone_number}`}
            />
            <LabelValue label="Email" value={accreditation.email} />

            <LabelValue label="Status" value={accreditation.status} />
          </div>

          {/* Stay Details */}
          {/* <div className="border border-primary rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Stay Details</h3>

            <LabelValue label="Room Type" value={accreditation.room_type} />
            <LabelValue label="Book For" value={accreditation.book_for} />
            <LabelValue
              label="Created Type"
              value={accreditation.created_type}
            />
          </div> */}

          {/* Hotel Details */}
          {/* <div className="border border-primary rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Hotel Information</h3>

            <LabelValue label="Hotel Name" value={accreditation.hotel_name} />
            <LabelValue
              label="Hotel Address"
              value={accreditation.hotel_address}
            />
            <LabelValue
              label="Map URL"
              value={accreditation.hotel_address_map_url}
            />
            <LabelValue
              label="Hotel Contact"
              value={accreditation.contact_details}
            />
          </div> */}

          {/* Additional Info */}
          <div className="border border-primary rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Additional Information</h3>

            {/* <LabelValue
              label="Specific Requirements"
              value={accreditation.specific_requirements}
            /> */}
            <LabelValue label="Admin Notes" value={accreditation.admin_notes} />
            <LabelValue
              label="User Notes"
              value={accreditation.decline_reason}
            />
            <LabelValue
              label="Requested On"
              value={formatDate(accreditation.request_on)}
            /><LabelValue
              label="Updated At"
              value={formatDate(accreditation.updated_at)}
            />
            {/* <LabelValue label="Tournament" value={accreditation.tournament} /> */}
          </div>
          {/* Associated Players */}
          {accreditation.associatedPlayers?.length > 0 && (
            <div className="border border-primary rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Associated Players</h3>

              <div className="space-y-3">
                {accreditation.associatedPlayers.map(
                  (player: any, index: number) => (
                    <div key={index} className="bg-f6f6f6 rounded-xl p-3">
                      <p className="text-black font-medium">
                        {player?.full_name || "-"}
                      </p>
                      <p className="text-sm  text-primary">
                        {player?.role || "Player"}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          {/* Additional Guests */}
          {accreditation.additionalGuests?.length > 0 && (
            <div className="border border-primary rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Additional Guests</h3>

              <div className="space-y-3">
                {accreditation.additionalGuests.map(
                  (guest: any, index: number) => (
                    <div key={index} className="bg-f6f6f6 rounded-xl p-3">
                      <p className="text-black font-medium">
                        {guest?.name || guest?.full_name || "-"}
                      </p>
                      <p className="text-sm  text-primary">
                        {guest?.role || "Guest"}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
          {/* Document Information */}
          {accreditation.document_type && accreditation.image && (
            <div className="border border-primary rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Document Information</h3>

              <LabelValue
                label="Document Type"
                value={accreditation.document_type}
              />

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-500">Document</span>

                {accreditation.image.toLowerCase().endsWith(".pdf") ? (
                  <a
                    href={accreditation.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-black duration-500 font-medium"
                  >
                    <BsFilePdfFill />
                    <span className="underline">View PDF</span>
                  </a>
                ) : (
                  <img
                    src={concatImgURL(accreditation.image)}
                    alt="Document"
                    className="w-24 h-24 object-cover rounded-xl border"
                  />
                )}
              </div>
            </div>
          )}

          {isPending && (
            <div className="border border-primary rounded-2xl p-4">
              <h3 className="font-semibold mb-4">Notes</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea
                  placeholder="Admin Notes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="bg-f6f6f6 rounded-xl px-4 py-3 text-sm min-h-[90px]"
                />

                <textarea
                  placeholder="User Notes"
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  className="bg-f6f6f6 rounded-xl px-4 py-3 text-sm min-h-[90px]"
                />
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Button
                  text="Submit Admin Notes Only"
                  className="px-2"
                  textSize="text-sm"
                  onClick={handleSubmitAdminNotesOnly}
                  isLoading={isAdminNotesUpdating}
                  disabled={isAdminNotesUpdating}
                />
                <Button
                  text="Submit User Notes Only"
                  className="px-2"
                  textSize="text-sm"
                  onClick={handleSubmitUserNotesOnly}
                  isLoading={isUserNotesUpdating}
                  disabled={isUserNotesUpdating}
                />
              </div>
            </div>
          )}
          <ChangeStatusModal
            show={statusPopupOpen}
            onClose={() => {
              setStatusPopupOpen(false);
              setNextStatus(null);
            }}
            onSave={confirmStatusChange}
            isLoading={isStatusUpdating}
          />
        </div>
      )}
    </SidebarDialog>
  );
};

export default AccreditationView;

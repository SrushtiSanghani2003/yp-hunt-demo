import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";
import SidebarDialog from "../../ui/sidebarDialog/SidebarDialog";
import { concatImgURL, formatDate, formatOnlyDate } from "../../../config/function";
import { mediaIcon } from "../../../icons";
import Button from "../../ui/button";
import { showToast } from "../../../utils/toastUtils";
import { useState } from "react";
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
const TransportationViewSkeleton = () => (
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

const TransportationView = ({
  open,
  onClose,
  transportationId,
}: {
  open: boolean;
  onClose: () => void;
  transportationId: string;
}) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["transportation", transportationId],
    queryFn: () =>
      api.get(`/travel-request/transportation/${transportationId}`),
    enabled: !!transportationId,
  });

  const [regNo, setRegNo] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [declineReason, setDeclineReason] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [statusModalShow, setStatusModalShow] = useState(false);
  const [nextStatus, setNextStatus] = useState<ModalStatus | null>(null);
  const menuPermissions = useSelector(selectMenuPermissions);
  const { isChangeStatus } = getPermissionFlags(menuPermissions.transportation);
  const queryClient = useQueryClient();
  const transportation = data?.data;
  const isConfirmed = transportation?.status === "Confirmed";
  const isPending = transportation?.status === "Pending";
  const isDeclined = transportation?.status === "Declined";
  const updateTransportationStatus = (
    id: string,
    payload: {
      status: string;
      reg_no?: string;
      contact_details?: string;
    },
    params?: any,
  ) => {
    return api.put(`/travel-request/transportation/${id}`, payload, { params });
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
    }) => updateTransportationStatus(id, payload, params),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transportation"],
        exact: false,
      });

      showToast("Transportation Status Updated", "success");
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
      }) => updateTransportationStatus(id, payload, params),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["transportation"],
          exact: false,
        });
        showToast("User notes updated", "success");
      },
    });
  const { mutate: updateAdminNotes, isPending: isAdminNotesUpdating } =
    useMutation({
      mutationFn: ({ id, payload }: { id: string; payload: any }) =>
        updateTransportationStatus(id, payload),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["transportation"],
          exact: false,
        });
        showToast("Admin notes updated", "success");
      },
    });

  // const handleStatusChange = (
  //   status: "Pending" | "Confirmed" | "Declined" | "Cancel",
  // ) => {
  //   const payload: any = { status };

  //   if (regNo.trim()) {
  //     payload.reg_no = regNo.trim();
  //   }

  //   if (contactDetails.trim()) {
  //     payload.contact_details = contactDetails.trim();
  //   }
  //   const shouldNotify = status === "Confirmed" || status === "Declined";
  //   updateStatus({
  //     id: transportationId,
  //     payload,
  //     params: shouldNotify && { is_notification: true },
  //   });

  //   onClose();
  // };
  const openStatusModal = (status: ModalStatus) => {
    setNextStatus(status);
    setStatusModalShow(true);
  };

  const confirmStatusChange = () => {
    if (!nextStatus) return;

    const payload: any = { status: nextStatus };

    if (regNo.trim()) payload.reg_no = regNo.trim();
    if (contactDetails.trim()) payload.contact_details = contactDetails.trim();

    const shouldNotify =
      nextStatus === "Confirmed" || nextStatus === "Declined";

    updateStatus({
      id: transportationId,
      payload,
      params: shouldNotify ? { is_notification: true } : undefined,
    });

    setStatusModalShow(false);
    setNextStatus(null);
    onClose();
  };

  const handleSubmitUserNotesOnly = () => {
    updateUserNotes({
      id: transportationId,
      payload: {
        decline_reason: declineReason.trim(),
      },
      params: {
        is_notification: true,
      },
    });
  };
  const handleSubmitAdminNotesOnly = () => {
    updateAdminNotes({
      id: transportationId,
      payload: {
        admin_notes: adminNotes || "",
      },
    });
  };

  const statusActions: StatusAction[] = !transportation
    ? []
    : isPending
      ? [
          {
            text: "Move to Approve",
            variant: "confirme",
            disabled: !isChangeStatus,
            onClick: () => isChangeStatus && openStatusModal("Confirmed"),
          },
          {
            text: "Move to Decline",
            variant: "danger",
            disabled: !isChangeStatus,
            onClick: () => isChangeStatus && openStatusModal("Declined"),
          },
        ]
      : isConfirmed
        ? [
            {
              text: "Move to Pending",
              variant: "primary",
              disabled: !isChangeStatus,
              onClick: () => isChangeStatus && openStatusModal("Pending"),
            },
            {
              text: "Move to Cancel",
              variant: "danger",
              disabled: !isChangeStatus,
              onClick: () => isChangeStatus && openStatusModal("Cancel"),
            },
          ]
        : isDeclined
          ? [
              {
                text: "Move to Pending",
                variant: "primary",
                disabled: !isChangeStatus,

                onClick: () => isChangeStatus && openStatusModal("Pending"),
              },
            ]
          : [];

  return (
    <SidebarDialog
      key={transportationId}
      open={open}
      onClose={onClose}
      title="Transportation Details"
      statusActions={statusActions}
    >
      {isLoading || isFetching ? (
        <TransportationViewSkeleton />
      ) : !transportation ? (
        <p className="text-center text-gray-500">No data available</p>
      ) : (
        <div className="space-y-5">
          {/* User Info */}
          <div className="border border-primary rounded-2xl p-4">
            <h3 className="font-semibold mb-3">User Information</h3>

            <div className="flex items-center gap-3 mb-3">
              {transportation.appuser?.image ? (
                <img
                  src={concatImgURL(transportation.appuser.image)}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-f6f6f6 flex items-center justify-center">
                  <img src={mediaIcon} />
                </div>
              )}
              <div>
                <p className="font-semibold">
                  {transportation.appuser?.full_name || "-"}
                </p>
                <p className="text-sm text-gray-500">
                  User ID: {transportation.appuser_id}
                </p>
              </div>
            </div>

            <LabelValue
              label="Contact Number"
              value={`+${transportation.phone_code} ${transportation.contact_number}`}
            />
            <LabelValue label="Passengers" value={transportation.passengers} />
            <LabelValue label="Bags" value={transportation.bags} />
            <LabelValue label="Status" value={transportation.status} />
          </div>

          {/* Travel Details */}
          <div className="border border-primary rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Travel Details</h3>

            <LabelValue label="Date" value={formatOnlyDate(transportation.date)} />
            <LabelValue label="Time" value={transportation.time} />
            <LabelValue
              label="Flight Number"
              value={transportation.flight_number}
            />
            <LabelValue
              label="Train Number"
              value={transportation.train_number}
            />
            <LabelValue label="Terminal" value={transportation.terminal} />
          </div>

          {/* From / To */}
          <div className="border border-primary rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Route</h3>

            <LabelValue
              label="From"
              value={`${transportation.from?.type || ""} - ${
                transportation.from?.title || "-"
              }`}
            />
            <LabelValue
              label="To"
              value={`${transportation.to?.type || ""} - ${
                transportation.to?.title || "-"
              }`}
            />
          </div>

          {/* Additional Info */}
          <div className="border border-primary rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Additional Information</h3>

            <LabelValue
              label="Specific Requirements"
              value={transportation.specific_requirements}
            />
            <LabelValue
              label="Admin Notes"
              value={transportation.admin_notes}
            />
            <LabelValue
              label="Decline Reason"
              value={transportation.decline_reason}
            />
            <LabelValue
              label="Created On"
              value={formatDate(transportation.created_at)}
            />
          </div>
          {/* Associated Players */}
          {transportation.associatedPlayers?.length > 0 && (
            <div className="border border-primary rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Associated Players</h3>

              <div className="space-y-3">
                {transportation.associatedPlayers.map(
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
          {transportation.additionalGuests?.length > 0 && (
            <div className="border border-primary rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Additional Guests</h3>

              <div className="space-y-3">
                {transportation.additionalGuests.map(
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
          {isPending && (
            <div className="border border-primary rounded-2xl p-4">
              <h3 className="font-semibold mb-4">Notes</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Reg No */}
                <input
                  type="text"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  placeholder="Reg No"
                  className="bg-f6f6f6 rounded-xl px-4 py-3 text-sm"
                />

                {/* Contact Details */}
                <input
                  type="text"
                  value={contactDetails}
                  onChange={(e) => setContactDetails(e.target.value)}
                  placeholder="Contact Details"
                  className="bg-f6f6f6 rounded-xl px-4 py-3 text-sm"
                />

                {/* Admin Notes */}
                <textarea
                  placeholder="Admin Notes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="bg-f6f6f6 rounded-xl px-4 py-3 text-sm min-h-[90px]"
                />

                {/* User Notes */}
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
          {statusModalShow && (
            <ChangeStatusModal
              show={statusModalShow}
              onClose={() => {
                setStatusModalShow(false);
                setNextStatus(null);
              }}
              onSave={confirmStatusChange}
              isLoading={isStatusUpdating}
            />
          )}
        </div>
      )}
    </SidebarDialog>
  );
};

export default TransportationView;

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";
import SidebarDialog from "../../ui/sidebarDialog/SidebarDialog";
import { formatOnlyDate } from "../../../config/function";
import Button from "../../ui/button";
import { showToast } from "../../../utils/toastUtils";
import { useState } from "react";
import ChangeStatusModal from "../../articles/ChangeStatusModal";
import { useSelector } from "react-redux";
import { selectMenuPermissions } from "../../../redux-toolkit/menuPermissionsSlice";
import { getPermissionFlags } from "../../sidebar/menuPermissions";
/* -------------------- Types -------------------- */
type ModalStatus = "Pending" | "Confirmed" | "Declined" | "Cancel";
type StatusVariant = "primary" | "danger" | "confirme";
type StatusAction = {
  text: string;
  variant: StatusVariant;
  onClick: () => void;
  disabled?: boolean;
};

/* -------------------- Skeleton -------------------- */
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

const FlightViewSkeleton = () => (
  <div className="space-y-5">
    <SkeletonBox />
    <SkeletonBox />
    <SkeletonBox />
  </div>
);

/* -------------------- UI Helpers -------------------- */
const LabelValue = ({ label, value }: { label: string; value?: any }) => (
  <div className="flex justify-between gap-4 py-1">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-right">{value || "-"}</span>
  </div>
);

/* -------------------- Component -------------------- */
const FlightView = ({
  open,
  onClose,
  flightId,
}: {
  open: boolean;
  onClose: () => void;
  flightId: string;
}) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["flight", flightId],
    queryFn: () => api.get(`/travel-request/flight/${flightId}`),
    enabled: !!flightId,
  });

  const flight = data?.data;

  const [declineReason, setDeclineReason] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [statusPopupOpen, setStatusPopupOpen] = useState(false);
  const [nextStatus, setNextStatus] = useState<ModalStatus | null>(null);
  const menuPermissions = useSelector(selectMenuPermissions);
  const { isChangeStatus } = getPermissionFlags(menuPermissions.flight);
  const isConfirmed = flight?.status === "Confirmed";
  const isPending = flight?.status === "Pending";
  const isDeclined = flight?.status === "Declined";

  /* -------------------- Mutations -------------------- */
  const updateFlight = (
    id: string,
    payload: {
      status: string;
    },
    params?: any,
  ) => {
    return api.put(`/travel-request/flight/${id}`, payload, { params });
  };

  const { mutate: updateStatus, isPending: isStatusUpdating } = useMutation({
    mutationFn: ({ id, payload, params }: any) =>
      updateFlight(id, payload, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flight"], exact: false });
      showToast("Flight status updated", "success");
    },
  });

  const { mutate: updateUserNotes, isPending: isUserNotesUpdating } =
    useMutation({
      mutationFn: ({ id, payload, params }: any) =>
        updateFlight(id, payload, params),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["flight"], exact: false });
        showToast("User notes updated", "success");
      },
    });

  const { mutate: updateAdminNotes, isPending: isAdminNotesUpdating } =
    useMutation({
      mutationFn: ({ id, payload }: any) => updateFlight(id, payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["flight"], exact: false });
        showToast("Admin notes updated", "success");
      },
    });

  /* -------------------- Status Handler -------------------- */
  const handleStatusChange = (
    status: "Pending" | "Confirmed" | "Declined" | "Cancel",
  ) => {
    const shouldNotify = status === "Confirmed" || status === "Declined";
    updateStatus({
      id: flightId,
      payload: { status },
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

    handleStatusChange(nextStatus); // ✅ existing function call
    setStatusPopupOpen(false);
    setNextStatus(null);
  };

  /* -------------------- Status Actions -------------------- */
  const statusActions: StatusAction[] = !flight
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
            onClick: () => isChangeStatus && openStatusPopup("Confirmed"),
          },
        ]
      : isConfirmed
        ? [
            {
              text: "Move to Pending",
              variant: "primary",
              disabled: !isChangeStatus,
              onClick: () => isChangeStatus && openStatusPopup("Confirmed"),
            },
            {
              text: "Move to Cancel",
              variant: "danger",
              disabled: !isChangeStatus,
              onClick: () => isChangeStatus && openStatusPopup("Confirmed"),
            },
          ]
        : isDeclined
          ? [
              {
                text: "Move to Pending",
                variant: "primary",
                disabled: !isChangeStatus,
                onClick: () => isChangeStatus && openStatusPopup("Confirmed"),
              },
            ]
          : [];

  /* -------------------- Render -------------------- */
  return (
    <SidebarDialog
      key={flightId}
      open={open}
      onClose={onClose}
      title="Flight Details"
      statusActions={statusActions}
    >
      {isLoading || isFetching ? (
        <FlightViewSkeleton />
      ) : !flight ? (
        <p className="text-center text-gray-500">No data available</p>
      ) : (
        <div className="space-y-5">
          {/* Traveller Info */}
          <div className="border border-primary rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Traveller Information</h3>
            <LabelValue label="Name" value={flight.name_new || flight.name} />
            <LabelValue label="Email" value={flight.email} />
            <LabelValue label="Passport No" value={flight.passport_number} />
            <LabelValue label="Nationality" value={flight.nationality} />
            <LabelValue label="Religion" value={flight.religion} />
            <LabelValue label="Status" value={flight.status} />
          </div>

          {/* Travel Details */}
          <div className="border border-primary rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Travel Details</h3>
            <LabelValue label="From" value={flight.from_airport_name} />
            <LabelValue label="To" value={flight.to_airport_name} />
            <LabelValue label="Trip Type" value={flight.trip_type} />
            <LabelValue label="Direction" value={flight.type} />
            <LabelValue
              label="Travel Date"
              value={formatOnlyDate(flight.travel_date)}
            />
            <LabelValue label="Travel Time" value={flight.travel_time} />
          </div>

          {/* Return */}
          {flight.return_date && (
            <div className="border border-primary rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Return Journey</h3>
              <LabelValue
                label="Return Date"
                value={formatOnlyDate(flight.return_date)}
              />
              <LabelValue label="Return Time" value={flight.return_time} />
            </div>
          )}

          {/* Passengers */}
          {flight.flight_persons?.length > 0 && (
            <div className="border border-primary rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Passengers</h3>
              <div className="space-y-3">
                {flight.flight_persons.map((p: any, i: number) => (
                  <div key={i} className="bg-f6f6f6 rounded-xl p-3">
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm">Passport: {p.passport_number}</p>
                    <p className="text-sm">Email: {p.email}</p>
                    <p className="text-sm">
                      DOB: {formatOnlyDate(p.birth_date)}
                    </p>
                    <p className="text-sm">
                      Special Request: {p.special_requests}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
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

              <div className="grid grid-cols-2 gap-4 mt-4">
                <Button
                  text="Submit Admin Notes"
                  onClick={() =>
                    updateAdminNotes({
                      id: flightId,
                      payload: { admin_notes: adminNotes },
                    })
                  }
                  isLoading={isAdminNotesUpdating}
                />
                <Button
                  text="Submit User Notes"
                  onClick={() =>
                    updateUserNotes({
                      id: flightId,
                      payload: { decline_reason: declineReason },
                      params: { is_notification: true },
                    })
                  }
                  isLoading={isUserNotesUpdating}
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

export default FlightView;

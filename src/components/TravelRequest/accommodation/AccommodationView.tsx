import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";
import SidebarDialog from "../../ui/sidebarDialog/SidebarDialog";
import { concatImgURL, formatDate, formatOnlyDate } from "../../../config/function";
import { mediaIcon } from "../../../icons";
import Button from "../../ui/button";
import { useState } from "react";
import { showToast } from "../../../utils/toastUtils";
import ChangeStatusModal from "../../articles/ChangeStatusModal";
import { selectMenuPermissions } from "../../../redux-toolkit/menuPermissionsSlice";
import { useSelector } from "react-redux";
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
const AccommodationViewSkeleton = () => (
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

const AccommodationView = ({
  open,
  onClose,
  accommodationId,
}: {
  open: boolean;
  onClose: () => void;
  accommodationId: string;
}) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["accommodation", accommodationId],
    queryFn: () => api.get(`/travel-request/accommodation/${accommodationId}`),
    enabled: !!accommodationId,
  });
  const { data: hotelData } = useQuery({
    queryKey: ["travel-hotels"],
    queryFn: () => api.get("/travel-request/getAllTravelDetail?type=hotel"),
  });

  const queryClient = useQueryClient();
  const [declineReason, setDeclineReason] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const menuPermissions = useSelector(selectMenuPermissions);
  const { isChangeStatus } = getPermissionFlags(menuPermissions.accommodation);
  const accommodation = data?.data;
  const isConfirmed = accommodation?.status === "Confirmed";
  const isPending = accommodation?.status === "Pending";
  const isDeclined = accommodation?.status === "Declined";
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
  const [statusPopupOpen, setStatusPopupOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<ModalStatus | null>(
    null,
  );
  const [hotelDetails, setHotelDetails] = useState({
    hotel_name: "",
    hotel_address: "",
    hotel_address_map_url: "",
    contact_details: "",
  });

  const updateAccommodationStatus = (
    id: string,
    payload: {
      status: string;
      reg_no?: string;
      contact_details?: string;
    },
    params?: any,
  ) => {
    return api.put(`/travel-request/accommodation/${id}`, payload, { params });
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
    }) => updateAccommodationStatus(id, payload, params),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accommodation"],
        exact: false,
      });

      showToast("Accommodation Status Updated", "success");
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
      }) => updateAccommodationStatus(id, payload, params),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["accommodation"],
          exact: false,
        });
        showToast("User notes updated", "success");
      },
    });
  const { mutate: updateAdminNotes, isPending: isAdminNotesUpdating } =
    useMutation({
      mutationFn: ({ id, payload }: { id: string; payload: any }) =>
        updateAccommodationStatus(id, payload),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["accommodation"],
          exact: false,
        });
        showToast("Admin notes updated", "success");
      },
    });
  const handleStatusChange = (
    status: "Pending" | "Confirmed" | "Declined" | "Cancel",
  ) => {
    const payload: any = { status };
    if (selectedHotelId) {
      payload.travel_detail_id = selectedHotelId;
      payload.hotel_name = hotelDetails.hotel_name;
      payload.hotel_address = hotelDetails.hotel_address;
      payload.hotel_address_map_url = hotelDetails.hotel_address_map_url;
      payload.contact_details = hotelDetails.contact_details;
    }
    const shouldNotify = status === "Confirmed" || status === "Declined";
    updateStatus({
      id: accommodationId,
      payload,
      params: shouldNotify && { is_notification: true },
    });

    onClose();
  };
  const openStatusPopup = (status: ModalStatus) => {
    setSelectedStatus(status);
    setStatusPopupOpen(true);
  };
  const confirmStatusChange = () => {
    if (!selectedStatus) return;

    handleStatusChange(selectedStatus); // 👈 EXISTING function
    setStatusPopupOpen(false);
    setSelectedStatus(null);
  };

  const handleSubmitUserNotesOnly = () => {
    updateUserNotes({
      id: accommodationId,
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
      id: accommodationId,
      payload: {
        admin_notes: adminNotes || "",
      },
    });

    showToast("User notes updated", "success");
  };
  const handleHotelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    // ✅ If "Select Hotel" selected
    if (!value) {
      setSelectedHotelId(null);
      setHotelDetails({
        hotel_name: "",
        hotel_address: "",
        hotel_address_map_url: "",
        contact_details: "",
      });
      return;
    }

    const hotelId = Number(value);
    setSelectedHotelId(hotelId);

    const selectedHotel = hotelData?.data?.find(
      (h: any) => h.travel_detail_id === hotelId,
    );

    if (selectedHotel) {
      setHotelDetails({
        hotel_name: selectedHotel.title || "",
        hotel_address: selectedHotel.hotel_address || "",
        hotel_address_map_url: selectedHotel.hotel_address_map_url || "",
        contact_details: selectedHotel.contact_details || "",
      });
    }
  };

  const statusActions: StatusAction[] = !accommodation
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

  return (
    <SidebarDialog
      key={accommodationId}
      open={open}
      onClose={onClose}
      title="Accommodation Details"
      statusActions={statusActions}
    >
      {isLoading || isFetching ? (
        <AccommodationViewSkeleton />
      ) : !accommodation ? (
        <p className="text-center text-gray-500">No data available</p>
      ) : (
        <div className="space-y-5">
          {/* User Info */}
          <div className="border border-primary rounded-2xl p-4">
            <h3 className="font-semibold mb-3">User Information</h3>

            <div className="flex items-center gap-3 mb-3">
              {accommodation.appuser?.image ? (
                <img
                  src={concatImgURL(accommodation.appuser.image)}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-f6f6f6 flex items-center justify-center">
                  <img src={mediaIcon} />
                </div>
              )}

              <div>
                <p className="font-semibold">
                  {accommodation.appuser?.full_name || "-"}
                </p>
                <p className="text-sm text-gray-500">
                  User ID: {accommodation.appuser_id}
                </p>
              </div>
            </div>

            <LabelValue
              label="Contact Number"
              value={`+${accommodation.phone_code} ${accommodation.contact_number}`}
            />
            <LabelValue label="Guests" value={accommodation.guests} />
            <LabelValue label="Rooms" value={accommodation.rooms} />
            <LabelValue label="Status" value={accommodation.status} />
          </div>

          {/* Stay Details */}
          <div className="border border-primary rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Stay Details</h3>

            <LabelValue
              label="Check In"
              value={formatOnlyDate(accommodation.check_in)}
            />
            <LabelValue
              label="Check Out"
              value={formatOnlyDate(accommodation.check_out)}
            />
            <LabelValue label="Room Type" value={accommodation.room_type} />
            <LabelValue label="Book For" value={accommodation.book_for} />
            <LabelValue
              label="Created Type"
              value={accommodation.created_type}
            />
          </div>

          {/* Hotel Details */}
          <div className="border border-primary rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Hotel Information</h3>

            <LabelValue label="Hotel Name" value={accommodation.hotel_name} />
            <LabelValue
              label="Hotel Address"
              value={accommodation.hotel_address}
            />
            <LabelValue
              label="Map URL"
              value={accommodation.hotel_address_map_url}
            />
            <LabelValue
              label="Hotel Contact"
              value={accommodation.contact_details}
            />
          </div>

          {/* Additional Info */}
          <div className="border border-primary rounded-2xl p-4">
            <h3 className="font-semibold mb-3">Additional Information</h3>

            <LabelValue
              label="Specific Requirements"
              value={accommodation.specific_requirements}
            />
            <LabelValue label="Admin Notes" value={accommodation.admin_notes} />
            <LabelValue
              label="Decline Reason"
              value={accommodation.decline_reason}
            />
            <LabelValue
              label="Requested On"
              value={formatDate(accommodation.request_on)}
            />
          </div>
          {/* Associated Players */}
          {accommodation.associatedPlayers?.length > 0 && (
            <div className="border border-primary rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Associated Players</h3>

              <div className="space-y-3">
                {accommodation.associatedPlayers.map(
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
          {accommodation.additionalGuests?.length > 0 && (
            <div className="border border-primary rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Additional Guests</h3>

              <div className="space-y-3">
                {accommodation.additionalGuests.map(
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
              <select
                value={selectedHotelId ?? ""}
                onChange={handleHotelChange}
                className="bg-f6f6f6 rounded-xl px-4 py-3 text-sm w-full mb-4"
              >
                <option value="">Select Hotel</option>

                {hotelData?.data?.map((hotel: any) => (
                  <option
                    key={hotel.travel_detail_id}
                    value={hotel.travel_detail_id}
                  >
                    {hotel.title}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={hotelDetails.hotel_name}
                  readOnly
                  placeholder="Hotel Name"
                  className="bg-f6f6f6 rounded-xl px-4 py-3 text-sm cursor-not-allowed"
                />

                <input
                  type="text"
                  value={hotelDetails.hotel_address}
                  readOnly
                  placeholder="Hotel Address"
                  className="bg-f6f6f6 rounded-xl px-4 py-3 text-sm cursor-not-allowed"
                />

                <input
                  type="text"
                  value={hotelDetails.hotel_address_map_url}
                  readOnly
                  placeholder="Map URL"
                  className="bg-f6f6f6 rounded-xl px-4 py-3 text-sm cursor-not-allowed"
                />

                <input
                  type="text"
                  value={hotelDetails.contact_details}
                  readOnly
                  placeholder="Contact Details"
                  className="bg-f6f6f6 rounded-xl px-4 py-3 text-sm cursor-not-allowed"
                />

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
              setSelectedStatus(null);
            }}
            onSave={confirmStatusChange}
            isLoading={isStatusUpdating}
          />
        </div>
      )}
    </SidebarDialog>
  );
};

export default AccommodationView;

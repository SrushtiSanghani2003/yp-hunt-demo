import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../config/paths";
import BuilderHeader from "../../ui/builderHeader/BuilderHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAccommodation,
  setAccommodationField,
  setFullAccommodation,
} from "../../../redux-toolkit/accommodationSlice";
import {
  useGetAccommodationById,
  useUpdateAccommodation,
} from "../../../hooks/useAccommodation";
import AsyncSelect from "react-select/async";
import { customStyles } from "../../account-settings/CreateCategories";
import { useMemo, useState, useEffect } from "react";
import api from "../../../lib/api";
import { useQuery } from "@tanstack/react-query";
import Input from "../../ui/input/Input";
import PhoneInput from "react-phone-input-2";
import { normalizeAccommodationResponse } from "./normalizer/normalizerAccommodation";
import { useScroll } from "../../../hooks/ScrollContext";

export default function AccommodationEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const accommodation = useSelector(selectAccommodation);
  const updateAccommodationMutation = useUpdateAccommodation(accommodation);

  const { data: accommodationById } = useGetAccommodationById(id);

  const [selectedTournament, setSelectedTournament] = useState<any | null>(
    null,
  );
  const { data: hotelData } = useQuery({
    queryKey: ["travel-hotels"],
    queryFn: () => api.get("/travel-request/getAllTravelDetail?type=hotel"),
  });
  const handleHotelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (!value) {
      dispatch(
        setAccommodationField({ field: "travel_detail_id", value: null }),
      );
      dispatch(setAccommodationField({ field: "hotel_name", value: "" }));
      dispatch(setAccommodationField({ field: "hotel_address", value: "" }));
      dispatch(
        setAccommodationField({ field: "hotel_address_map_url", value: "" }),
      );
      dispatch(setAccommodationField({ field: "contact_details", value: "" }));

      return;
    }

    const hotelId = Number(value);

    const selectedHotel = hotelData?.data?.find(
      (h: any) => h.travel_detail_id === hotelId,
    );

    if (selectedHotel) {
      dispatch(
        setAccommodationField({
          field: "travel_detail_id",
          value: selectedHotel.travel_detail_id,
        }),
      );
      dispatch(
        setAccommodationField({
          field: "hotel_name",
          value: selectedHotel.title,
        }),
      );
      dispatch(
        setAccommodationField({
          field: "hotel_address",
          value: selectedHotel.hotel_address,
        }),
      );
      dispatch(
        setAccommodationField({
          field: "hotel_address_map_url",
          value: selectedHotel.hotel_address_map_url,
        }),
      );
      dispatch(
        setAccommodationField({
          field: "contact_details",
          value: selectedHotel.contact_details,
        }),
      );
    }
  };

  /* ---------------------------------- */
  /* Tournaments */
  /* ---------------------------------- */
  const getAllTournaments = async () => {
    const res = await api.get("/tournament/getDropdown");
    return res.data;
  };

  const { data: allTournaments = [] } = useQuery({
    queryKey: ["tournaments"],
    queryFn: getAllTournaments,
    refetchOnWindowFocus: false,
  });

  const tournamentOptions = useMemo(
    () =>
      allTournaments.map((item: any) => ({
        value: item.id,
        label: item.name,
      })),
    [allTournaments],
  );

  const loadOptionsTournaments = (inputValue: string, callback: any) => {
    const filtered = tournamentOptions.filter((t: any) =>
      t.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
    callback(inputValue ? filtered : tournamentOptions.slice(0, 50));
  };

  const handleTournamentChange = (selected: any) => {
    setSelectedTournament(selected);
    dispatch(
      setAccommodationField({
        field: "tournament_id",
        value: selected?.value ?? null,
      }),
    );
  };

  const handlePhoneChange = (value: string, country: any) => {
    const dialCode = country?.dialCode || "";

    const localNumber = value.startsWith(dialCode)
      ? value.slice(dialCode.length)
      : value;

    dispatch(
      setAccommodationField({
        field: "contact_number",
        value: localNumber,
      }),
    );

    dispatch(
      setAccommodationField({
        field: "phone_code",
        value: `+${dialCode}`,
      }),
    );
  };

  useEffect(() => {
    if (isEditMode && accommodation.tournament_id && allTournaments.length) {
      const selected = tournamentOptions.find(
        (t: any) => t.value == accommodation.tournament_id,
      );
      if (selected) setSelectedTournament(selected);
    }
  }, [isEditMode, accommodation.tournament_id, allTournaments]);

  useEffect(() => {
    if (isEditMode && accommodationById) {
      const normalizedTournament =
        normalizeAccommodationResponse(accommodationById);
      dispatch(setFullAccommodation(normalizedTournament));
    }
  }, [accommodationById]);
  const handleSubmit = (id: string) => {
    if (isEditMode && id) {
      updateAccommodationMutation.mutate(id);
    }
  };

  return (
    <div>
      <div
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Accommodation Builder"
          onSaveTemplate={() =>
            navigate(paths.travelrequest.accommodation.path)
          }
          onSaveTemplateTitle="Cancel"
          onSubmit={() => handleSubmit(String(id))}
          onSubmitLoading={updateAccommodationMutation.isPending}
          isEditMode={isEditMode}
        />
      </div>
      <div className="container grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <div className="bg-white border border-primary rounded-2xl p-5 mb-4">
            {/* Tournament & Contact */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="font-medium block">Tournament</label>
                <AsyncSelect
                  cacheOptions
                  styles={customStyles}
                  loadOptions={loadOptionsTournaments}
                  defaultOptions={tournamentOptions.slice(0, 50)}
                  placeholder="Select Tournament"
                  value={selectedTournament}
                  onChange={handleTournamentChange}
                />
              </div>

              <div>
                <label className="block text-base font-medium mb-1">
                  Mobile No
                </label>
                <PhoneInput
                  country="in"
                  value={
                    accommodation.contact_number
                      ? `${accommodation.phone_code?.replace("+", "")}${
                          accommodation.contact_number
                        }`
                      : ""
                  }
                  onChange={handlePhoneChange}
                  countryCodeEditable={false}
                  inputStyle={{
                    width: "100%",
                    border: "1px solid #acacac",
                    borderRadius: "12px",
                    height: "40px",
                    fontSize: "14px",
                    paddingLeft: "48px",
                    backgroundColor: "#f9f9f9",
                  }}
                  buttonStyle={{
                    border: "1px solid #acacac",
                    borderTopLeftRadius: "12px",
                    borderBottomLeftRadius: "12px",
                    backgroundColor: "#f9f9f9",
                  }}
                  containerStyle={{ width: "100%" }}
                  dropdownStyle={{ zIndex: 9999 }}
                />
              </div>
            </div>

            {/* Check In / Out */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                type="date"
                label="Check In"
                value={
                  accommodation.check_in
                    ? new Date(accommodation.check_in)
                        .toISOString()
                        .slice(0, 10)
                    : ""
                }
                inputCss="!pr-2"
                placeholder="Select Check In Date"
                onChange={(e) => {
                  const d = e.target.value;
                  dispatch(
                    setAccommodationField({
                      field: "check_in",
                      value: d
                        ? new Date(`${d}T00:00:00.000Z`).toISOString()
                        : null,
                    }),
                  );
                }}
              />
              <Input
                type="date"
                label="Check Out"
                placeholder="Select Check Out Date"
                inputCss="!pr-2"
                value={
                  accommodation.check_out
                    ? accommodation.check_out.split("T")[0]
                    : ""
                }
                onChange={(e) => {
                  const d = e.target.value;
                  dispatch(
                    setAccommodationField({
                      field: "check_out",
                      value: d
                        ? new Date(`${d}T00:00:00Z`).toISOString()
                        : null,
                    }),
                  );
                }}
              />
            </div>
            {/* Notes */}
            <div className="mt-4">
              <label className="mb-2 block font-medium">
                Specific Requirements
              </label>
              <textarea
                rows={3}
                placeholder="Enter User Notes"
                value={accommodation.specific_requirements || ""}
                onChange={(e) =>
                  dispatch(
                    setAccommodationField({
                      field: "specific_requirements",
                      value: e.target.value,
                    }),
                  )
                }
                className="w-full p-3 border border-primary rounded-2xl resize-none"
              />
            </div>
            {/* Hotel */}
            <div className="grid grid-cols-3 gap-4 mb-4 mt-3">
              <div>
                <label className="mb-0.5 block font-medium">Select Hotel</label>
                <select
                  value={accommodation.travel_detail_id ?? ""}
                  onChange={handleHotelChange}
                  className="w-full p-2.5 md:text-base text-sm border-0.5 border-primary md:rounded-xl placeholder:font-normal rounded-lg md:pr-10 bg-white undefined"
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
              </div>
              <Input
                label="Hotel Name"
                placeholder="Enter Hotel Name"
                readOnly
                value={accommodation.hotel_name}
                // onChange={(e) =>
                //   dispatch(
                //     setAccommodationField({
                //       field: "hotel_name",
                //       value: e.target.value,
                //     })
                //   )
                // }
              />

              <Input
                label="Hotel Address"
                placeholder="Enter Hotel Address"
                value={accommodation.hotel_address}
                readOnly
                // onChange={(e) =>
                //   dispatch(
                //     setAccommodationField({
                //       field: "hotel_address",
                //       value: e.target.value,
                //     })
                //   )
                // }
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Input
                label="Hotel Address Map URL"
                placeholder="Enter Hotel Map URL"
                value={accommodation.hotel_address_map_url}
                readOnly
                // onChange={(e) =>
                //   dispatch(
                //     setAccommodationField({
                //       field: "hotel_address_map_url",
                //       value: e.target.value,
                //     })
                //   )
                // }
              />
              <Input
                label="Contact Details"
                placeholder="Enter Contact Details"
                value={accommodation.contact_details ?? ""}
                readOnly
                // onChange={(e) =>
                //   dispatch(
                //     setAccommodationField({
                //       field: "contact_details",
                //       value: e.target.value,
                //     })
                //   )
                // }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-4">
                <label className="mb-2 block font-medium">Admin Notes</label>
                <textarea
                  rows={3}
                  value={accommodation.admin_notes ?? ""}
                  placeholder="Enter Admin Notes"
                  onChange={(e) =>
                    dispatch(
                      setAccommodationField({
                        field: "admin_notes",
                        value: e.target.value,
                      }),
                    )
                  }
                  className="w-full p-3 border border-primary rounded-2xl resize-none"
                />
              </div>
              <div className="mt-4">
                <label className="mb-2 block font-medium">User Notes</label>
                <textarea
                  rows={3}
                  value={accommodation.decline_reason ?? ""}
                  placeholder="Enter User Notes"
                  onChange={(e) =>
                    dispatch(
                      setAccommodationField({
                        field: "decline_reason",
                        value: e.target.value,
                      }),
                    )
                  }
                  className="w-full p-3 border border-primary rounded-2xl resize-none"
                />
              </div>
            </div>
            {/* Guests / Rooms */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Input
                label="Guests"
                type="number"
                placeholder="Enter Number of Guests"
                value={accommodation.guests}
                onChange={(e) =>
                  dispatch(
                    setAccommodationField({
                      field: "guests",
                      value: e.target.value,
                    }),
                  )
                }
              />

              <Input
                label="Rooms"
                type="number"
                placeholder="Enter Number of Rooms"
                value={accommodation.rooms}
                onChange={(e) =>
                  dispatch(
                    setAccommodationField({
                      field: "rooms",
                      value: e.target.value,
                    }),
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

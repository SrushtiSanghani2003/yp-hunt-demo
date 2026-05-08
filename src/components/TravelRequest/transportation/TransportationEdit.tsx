import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../config/paths";
import BuilderHeader from "../../ui/builderHeader/BuilderHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTransportation,
  setFullTransportation,
  setTransportationField,
} from "../../../redux-toolkit/transportationSlice";
import {
  useTransportationById,
  useUpdateTransportation,
} from "../../../hooks/useTransportation";
import AsyncSelect from "react-select/async";
import { customStyles } from "../../account-settings/CreateCategories";
import { useMemo, useState, useEffect } from "react";
import api from "../../../lib/api";
import { useQuery } from "@tanstack/react-query";
import Input from "../../ui/input/Input";
import PhoneInput from "react-phone-input-2";
import { normalizeTransportationResponse } from "./normalizer/normalizerTransportation";
import { useScroll } from "../../../hooks/ScrollContext";

export default function TransportationEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const Transportation = useSelector(selectTransportation);
  const updateTransportationMutation = useUpdateTransportation(Transportation);
  const { data: transportationDataById } = useTransportationById(id);
  const [selectedTournament, setSelectedTournament] = useState<any | null>(
    null,
  );

  // Load tournaments
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
      setTransportationField({
        field: "tournament_id",
        value: selected?.value ?? null,
      }),
    );
  };
  const handlePhoneChange = (value: string, country: any) => {
    const dialCode = country?.dialCode || "";

    // remove country code from number
    const localNumber = value.startsWith(dialCode)
      ? value.slice(dialCode.length)
      : value;

    dispatch(
      setTransportationField({
        field: "contact_number",
        value: localNumber, // ✅ ONLY local number
      }),
    );

    dispatch(
      setTransportationField({
        field: "phone_code",
        value: `+${dialCode}`, // ✅ country code
      }),
    );
  };
  const getAllTravelDetails = async () => {
    const res = await api.get("/travel-request/getAllTravelDetail");
    return res.data;
  };

  const { data: allTravelDetails = [] } = useQuery({
    queryKey: ["travel-details"],
    queryFn: getAllTravelDetails,
    refetchOnWindowFocus: false,
  });

  const travelOptions = useMemo(
    () =>
      allTravelDetails.map((item: any) => ({
        value: item.travel_detail_id,
        label: item.title,
      })),
    [allTravelDetails],
  );

  const loadOptionsTravel = (inputValue: string, callback: any) => {
    const filtered = travelOptions.filter((t: any) =>
      t.label.toLowerCase().includes(inputValue.toLowerCase()),
    );

    callback(inputValue ? filtered : travelOptions.slice(0, 50));
  };
  const selectedFromOption = useMemo(() => {
    return (
      travelOptions.find((t: any) => {
        return t.value == Transportation.from_id;
      }) || null
    );
  }, [travelOptions, Transportation.from_id]);

  const selectedToOption = useMemo(() => {
    return (
      travelOptions.find((t: any) => t.value == Transportation.to_id) || null
    );
  }, [travelOptions, Transportation.to_id]);

  const handleFromChange = (selected: any) => {
    dispatch(
      setTransportationField({
        field: "from_id",
        value: selected?.value ? Number(selected.value) : null, // ✅ number
      }),
    );
  };

  const handleToChange = (selected: any) => {
    dispatch(
      setTransportationField({
        field: "to_id",
        value: selected?.value ? Number(selected.value) : null, // ✅ number
      }),
    );
  };

  useEffect(() => {
    if (isEditMode && transportationDataById) {
      const normalizedTournament = normalizeTransportationResponse(
        transportationDataById?.data,
      );
      dispatch(setFullTransportation(normalizedTournament));
    }
  }, [transportationDataById]);
  useEffect(() => {
    if (isEditMode && Transportation.tournament_id && allTournaments.length) {
      const selected = tournamentOptions.find((t: any) => {
        return t.value == Transportation.tournament_id;
      });
      if (selected) setSelectedTournament(selected);
    }
  }, [isEditMode, Transportation.tournament_id, allTournaments]);

  const handleTransportationSubmit = (id: any) => {
    if (isEditMode && id) {
      updateTransportationMutation.mutate(id);
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
          title="Transportation Builder"
          onSaveTemplate={() =>
            navigate(paths.travelrequest.transportation.path)
          }
          onSaveTemplateTitle="Cancel"
          onSubmit={() => handleTransportationSubmit(String(id))}
          onSubmitLoading={updateTransportationMutation.isPending}
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
                  placeholder="Select Tournament "
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
                    Transportation.contact_number
                      ? `${Transportation.phone_code?.replace("+", "")}${
                          Transportation.contact_number
                        }`
                      : ""
                  }
                  onChange={handlePhoneChange}
                  countryCodeEditable={false}
                  placeholder="Enter Mobile Number"
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

            {/* Pickup */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <Input
                label="Pick Up"
                placeholder="Enter Pick Up Location"
                value={Transportation.pick_up ?? ""}
                onChange={(e) =>
                  dispatch(
                    setTransportationField({
                      field: "pick_up",
                      value: e.target.value,
                    }),
                  )
                }
              />
              <Input
                label="Pick Up Latitude"
                placeholder="e.g. 23.0225"
                value={Transportation.pick_up_latitude ?? ""}
                onChange={(e) =>
                  dispatch(
                    setTransportationField({
                      field: "pick_up_latitude",
                      value: e.target.value,
                    }),
                  )
                }
              />
              <Input
                label="Pick Up Longitude"
                placeholder="e.g. 72.5714"
                value={Transportation.pick_up_longitude ?? ""}
                onChange={(e) =>
                  dispatch(
                    setTransportationField({
                      field: "pick_up_longitude",
                      value: e.target.value,
                    }),
                  )
                }
              />
            </div>

            {/* Drop Off */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <Input
                label="Drop Off"
                placeholder="Enter Drop Off Location"
                value={Transportation.drop_off ?? ""}
                onChange={(e) =>
                  dispatch(
                    setTransportationField({
                      field: "drop_off",
                      value: e.target.value,
                    }),
                  )
                }
              />
              <Input
                label="Drop Off Latitude"
                placeholder="e.g. 23.0300"
                value={Transportation.drop_off_latitude ?? ""}
                onChange={(e) =>
                  dispatch(
                    setTransportationField({
                      field: "drop_off_latitude",
                      value: e.target.value,
                    }),
                  )
                }
              />
              <Input
                label="Drop Off Longitude"
                placeholder="e.g. 72.5800"
                value={Transportation.drop_off_longitude ?? ""}
                onChange={(e) =>
                  dispatch(
                    setTransportationField({
                      field: "drop_off_longitude",
                      value: e.target.value,
                    }),
                  )
                }
              />
            </div>

            {/* From / To */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="font-medium block">From</label>
                <AsyncSelect
                  cacheOptions
                  styles={customStyles}
                  loadOptions={loadOptionsTravel}
                  defaultOptions={travelOptions.slice(0, 50)}
                  placeholder="Select From"
                  value={selectedFromOption}
                  onChange={handleFromChange}
                />
              </div>

              <div>
                <label className="font-medium block">To</label>
                <AsyncSelect
                  cacheOptions
                  styles={customStyles}
                  loadOptions={loadOptionsTravel}
                  defaultOptions={travelOptions.slice(0, 50)}
                  placeholder="Select To"
                  value={selectedToOption}
                  onChange={handleToChange}
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                type="date"
                label="Date"
                inputCss="!pr-2"
                placeholder="Select Date"
                value={
                  Transportation.date
                    ? Transportation.date.split("T")[0] // 👈 UI format
                    : ""
                }
                onChange={(e) => {
                  const localDate = e.target.value; // "2026-01-28"

                  const utcDate = localDate
                    ? new Date(`${localDate}T00:00:00Z`).toISOString()
                    : null;

                  dispatch(
                    setTransportationField({
                      field: "date",
                      value: utcDate, // ✅ Redux ma UTC
                    }),
                  );
                }}
              />
              <Input
                type="time"
                label="Time"
                placeholder="Select Time"
                inputCss="!pr-2"
                value={Transportation.time ?? ""}
                onChange={(e) =>
                  dispatch(
                    setTransportationField({
                      field: "time",
                      value: e.target.value,
                    }),
                  )
                }
              />
            </div>

            {/* Notes */}
            <div>
              <label className="mb-2 block font-medium">
                Specific Requirements
              </label>
              <textarea
                rows={3}
                placeholder="Enter Specific Requirements"
                value={Transportation.specific_requirements || ""}
                onChange={(e) =>
                  dispatch(
                    setTransportationField({
                      field: "specific_requirements",
                      value: e.target.value,
                    }),
                  )
                }
                className="w-full p-3 border border-primary rounded-2xl resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Input
                label="Reg No"
                placeholder="Enter Vehicle Registration No"
                value={Transportation.reg_no ?? ""}
                onChange={(e) =>
                  dispatch(
                    setTransportationField({
                      field: "reg_no",
                      value: e.target.value,
                    }),
                  )
                }
              />
              <Input
                label="Contact Details"
                placeholder="Enter Contact Details"
                value={Transportation.contact_details ?? ""}
                onChange={(e) =>
                  dispatch(
                    setTransportationField({
                      field: "contact_details",
                      value: e.target.value,
                    }),
                  )
                }
              />
            </div>

            {/* <div className="grid grid-cols-2 gap-4 mt-4">
              <Input
                label="Admin Notes"
                placeholder="Enter Admin Notes"
                value={Transportation.admin_notes ?? ""}
                onChange={(e) =>
                  dispatch(
                    setTransportationField({
                      field: "admin_notes",
                      value: e.target.value,
                    })
                  )
                }
              />
              <Input
                label="User Notes"
                placeholder="Enter User Notes"
                value={Transportation.decline_reason ?? ""}
                onChange={(e) =>
                  dispatch(
                    setTransportationField({
                      field: "decline_reason",
                      value: e.target.value,
                    })
                  )
                }
              />
            </div> */}
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-4">
                <label className="mb-2 block font-medium">Admin Notes</label>
                <textarea
                  rows={3}
                  value={Transportation.admin_notes ?? ""}
                  placeholder="Enter Admin Notes"
                  onChange={(e) =>
                    dispatch(
                      setTransportationField({
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
                  value={Transportation.decline_reason ?? ""}
                  placeholder="Enter User Notes"
                  onChange={(e) =>
                    dispatch(
                      setTransportationField({
                        field: "decline_reason",
                        value: e.target.value,
                      }),
                    )
                  }
                  className="w-full p-3 border border-primary rounded-2xl resize-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Input
                label="Passengers"
                type="number"
                placeholder="Enter Number of Passengers"
                value={Transportation.passengers ?? ""}
                onChange={(e) =>
                  dispatch(
                    setTransportationField({
                      field: "passengers",
                      value: Number(e.target.value),
                    }),
                  )
                }
              />
              <Input
                label="Bags"
                type="number"
                placeholder="Enter Number of Bags"
                value={Transportation.bags ?? ""}
                onChange={(e) =>
                  dispatch(
                    setTransportationField({
                      field: "bags",
                      value: Number(e.target.value),
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

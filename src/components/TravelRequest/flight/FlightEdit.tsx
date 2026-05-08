import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../config/paths";
import BuilderHeader from "../../ui/builderHeader/BuilderHeader";
import { useDispatch, useSelector } from "react-redux";

import AsyncSelect from "react-select/async";
import { customStyles } from "../../account-settings/CreateCategories";
import { useMemo, useState, useEffect, useRef } from "react";
import api from "../../../lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  selectFlight,
  setBirthdateDate,
  setFlightField,
  setFlightFromAirport,
  setFlightToAirport,
  setFlightTravelDate,
  setFlightTravelTime,
  setFullFlight,
  setTicketFile,
  setTime,
} from "../../../redux-toolkit/flightSlice";
import { useFlightById, useUpdateFlight } from "../../../hooks/useFlightlist";
import { normalizeFlightResponse } from "./normalizer/normalizerFlight";
import Input from "../../ui/input/Input";
import { chevronDown } from "../../../icons";
import { showToast } from "../../../utils/toastUtils";
import { concatImgURL } from "../../../config/function";
import { useScroll } from "../../../hooks/ScrollContext";

export default function FlightEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const flight = useSelector(selectFlight);
  const updateFlightMutation = useUpdateFlight(flight);
  const { data: FlightById } = useFlightById(id);

  const [selectedTournament, setSelectedTournament] = useState<any | null>(
    null,
  );
  const [fromAirport, setFromAirport] = useState<any | null>(null);
  const [toAirport, setToAirport] = useState<any | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  // console.log("🚀 ~ FlightEdit ~ isUploading:", isUploading);
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
      setFlightField({
        field: "tournaments_id",
        value: selected?.value ?? null,
      }),
    );
  };
  // ticket
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadDocumentFile(file);
  };

  const uploadDocumentFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    try {
      const res = await api.post("/articles/upload/documents", formData);
      const uploaded = res?.data?.[0];
      if (!uploaded?.url) throw new Error("No URL");

      dispatch(setTicketFile(uploaded.url));
      showToast("File uploaded successfully", "success");
    } catch (e) {
      showToast("Upload failed", "error");
    } finally {
      setIsUploading(false);
    }
  };

  //airport

  const getAllFlying = async () => {
    return await api.get("/travel-request/airport/dropdown", {
      params: {
        page: 1,
        limit: 50,
      },
    });
  };

  const { data: alFlyingData } = useQuery({
    queryKey: ["airport"],
    queryFn: getAllFlying,
    refetchOnWindowFocus: false,
  });
  const flyingOptions = useMemo(
    () =>
      alFlyingData?.data?.airports?.map((item: any) => ({
        value: item.airport_id,
        label: item.airport_name,
      })) || [],
    [alFlyingData],
  );
  const loadFlyingptions = async (input: string) => {
    if (!input) {
      return flyingOptions;
    }

    const res = await api.get("/travel-request/airport/dropdown", {
      params: {
        page: 1,
        limit: 50,
        search: input,
      },
    });

    return res.data?.airports?.map((u: any) => ({
      value: u.airport_id,
      label: u.airport_name,
    }));
  };
  useEffect(() => {
    if (!isEditMode || !FlightById?.data) return;

    const data = FlightById.data;

    // FROM airport
    if (data.from_airport_id && data.from_airport_name) {
      const fromOption = {
        value: Number(data.from_airport_id),
        label: data.from_airport_name,
      };

      setFromAirport(fromOption);
      dispatch(setFlightFromAirport(fromOption.value));
    }

    // TO airport
    if (data.to_airport_id && data.to_airport_name) {
      const toOption = {
        value: Number(data.to_airport_id),
        label: data.to_airport_name,
      };

      setToAirport(toOption);
      dispatch(setFlightToAirport(toOption.value));
    }
  }, [isEditMode, FlightById?.data]);
  useEffect(() => {
    if (isEditMode && flight.tournaments_id && allTournaments.length) {
      const selected = tournamentOptions.find(
        (t: any) => t.value == flight.tournaments_id,
      );
      if (selected) setSelectedTournament(selected);
    }
  }, [isEditMode, flight.tournaments_id, allTournaments]);

  useEffect(() => {
    if (isEditMode && FlightById?.data) {
      const normalized = normalizeFlightResponse(FlightById?.data);
      dispatch(setFullFlight(normalized));
    }
  }, [FlightById?.data]);

  const handleSubmit = (id: string) => {
    if (isEditMode && id) {
      updateFlightMutation.mutate(id);
    }
  };

  return (
    <div>
      {isUploading && (
        <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
            <p className="text-white text-sm mt-4 font-medium tracking-wide">
              Uploading...
            </p>
          </div>
        </div>
      )}
      <div
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Flight Builder"
          onSaveTemplate={() => navigate(paths.travelrequest.flight.path)}
          onSaveTemplateTitle="Cancel"
          onSubmit={() => handleSubmit(String(id))}
          onSubmitLoading={updateFlightMutation.isPending}
          isEditMode={isEditMode}
        />
      </div>
      <div className="container grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <div className="bg-white border border-primary rounded-2xl p-5 mb-4">
            {/* Tournament & Contact */}
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
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-3">
                <label className="font-medium block mb-1">Flying From</label>

                <AsyncSelect
                  cacheOptions
                  styles={customStyles}
                  placeholder="Search From Airport"
                  loadOptions={loadFlyingptions}
                  defaultOptions={flyingOptions.slice(0, 50)}
                  value={fromAirport}
                  onChange={(selected: any) => {
                    setFromAirport(selected);

                    dispatch(
                      setFlightFromAirport(
                        selected ? Number(selected.value) : null,
                      ),
                    );
                  }}
                />
              </div>

              <div className="mt-3">
                <label className="font-medium block mb-1">Flying To</label>

                <AsyncSelect
                  cacheOptions
                  styles={customStyles}
                  placeholder="Search To Airport"
                  loadOptions={loadFlyingptions}
                  defaultOptions={flyingOptions.slice(0, 50)}
                  value={toAirport}
                  onChange={(selected: any) => {
                    setToAirport(selected);

                    dispatch(
                      setFlightToAirport(
                        selected ? Number(selected.value) : null,
                      ),
                    );
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 my-4">
              <Input
                type="date"
                label="Travel Date"
                value={
                  flight.travel_date
                    ? new Date(flight.travel_date).toISOString().slice(0, 10)
                    : ""
                }
                inputCss="!pr-2"
                placeholder="Select Travel Date Date"
                onChange={(e) => {
                  const d = e.target.value;

                  dispatch(
                    setFlightTravelDate(
                      d ? new Date(`${d}T00:00:00.000Z`).toISOString() : null,
                    ),
                  );
                }}
              />
              <Input
                type="time"
                label="Time"
                placeholder="Select Time"
                inputCss="!pr-2"
                value={flight.travel_time ?? ""}
                onChange={(e) => dispatch(setFlightTravelTime(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="Name"
                value={flight.name}
                onChange={(e) =>
                  dispatch(
                    setFlightField({
                      field: "name",
                      value: e.target.value,
                    }),
                  )
                }
              />
              <Input
                label="Passport Number"
                value={flight.passport_number}
                onChange={(e) =>
                  dispatch(
                    setFlightField({
                      field: "passport_number",
                      value: e.target.value,
                    }),
                  )
                }
              />
              <Input
                label="Email"
                type="email"
                value={flight.email}
                onChange={(e) =>
                  dispatch(
                    setFlightField({
                      field: "email",
                      value: e.target.value,
                    }),
                  )
                }
              />
              <Input
                type="date"
                label="Birth Date"
                value={
                  flight.birth_date
                    ? new Date(flight.birth_date).toISOString().slice(0, 10)
                    : ""
                }
                inputCss="!pr-2"
                placeholder="Select Birth Date Date"
                onChange={(e) => {
                  const d = e.target.value;

                  dispatch(
                    setBirthdateDate(
                      d ? new Date(`${d}T00:00:00.000Z`).toISOString() : null,
                    ),
                  );
                }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 ">
              <Input
                label="Religion"
                value={flight.religion}
                onChange={(e) =>
                  dispatch(
                    setFlightField({
                      field: "religion",
                      value: e.target.value,
                    }),
                  )
                }
              />
              <Input
                label="Nationality"
                value={flight.nationality}
                onChange={(e) =>
                  dispatch(
                    setFlightField({
                      field: "nationality",
                      value: e.target.value,
                    }),
                  )
                }
              />
              <div>
                <label
                  htmlFor="visit_type"
                  className="block  md:text-base text-sm font-medium"
                >
                  Visit Type
                </label>

                <div className="relative mb-5">
                  <select
                    id="visit_type"
                    className="appearance-none w-full p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-xl"
                    value={flight.visit_type || ""}
                    onChange={(e) =>
                      dispatch(
                        setFlightField({
                          field: "visit_type",
                          value: e.target.value,
                        }),
                      )
                    }
                  >
                    <option value="" disabled>
                      Select Visit Type
                    </option>
                    <option value="Single Visit">Single Visit</option>
                    <option value="Multiple Visit">Multiple Visit</option>
                  </select>

                  <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2 pointer-events-none">
                    <img src={chevronDown} />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="font-medium block mb-1">Special Requests</label>
              <textarea
                rows={4}
                className="w-full p-3 border border-primary rounded-2xl resize-none"
                value={flight.special_requests}
                onChange={(e) =>
                  dispatch(
                    setFlightField({
                      field: "special_requests",
                      value: e.target.value,
                    }),
                  )
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4 mt-3">
              <Input
                type="time"
                label="Time"
                placeholder="Select Time"
                inputCss="!pr-2"
                value={flight.time ?? ""}
                onChange={(e) => dispatch(setTime(e.target.value))}
              />
              <Input
                label="Airline"
                value={flight.airline}
                onChange={(e) =>
                  dispatch(
                    setFlightField({
                      field: "airline",
                      value: e.target.value,
                    }),
                  )
                }
              />

              {/* Booking Provider */}
              <Input
                label="Booking Provider"
                value={flight.booking_provider}
                onChange={(e) =>
                  dispatch(
                    setFlightField({
                      field: "booking_provider",
                      value: e.target.value,
                    }),
                  )
                }
              />

              {/* Booking Reference */}
              <Input
                label="Booking Reference"
                value={flight.booking_reference}
                onChange={(e) =>
                  dispatch(
                    setFlightField({
                      field: "booking_reference",
                      value: e.target.value,
                    }),
                  )
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block font-medium">Admin Notes</label>
                <textarea
                  rows={3}
                  value={flight.admin_notes ?? ""}
                  placeholder="Enter Admin Notes"
                  onChange={(e) =>
                    dispatch(
                      setFlightField({
                        field: "admin_notes",
                        value: e.target.value,
                      }),
                    )
                  }
                  className="w-full p-3 border border-primary rounded-2xl resize-none"
                />
              </div>
              <div>
                <label className="mb-2 block font-medium">User Notes</label>
                <textarea
                  rows={3}
                  placeholder="Enter User Notes"
                  value={flight.decline_reason}
                  onChange={(e) =>
                    dispatch(
                      setFlightField({
                        field: "decline_reason",
                        value: e.target.value,
                      }),
                    )
                  }
                  className="w-full p-3 border border-primary rounded-2xl resize-none"
                />
              </div>
            </div>
            <div>
              <Input
                ref={inputRef}
                label="Ticket"
                type="file"
                onChange={handleFileChange}
              />

              {flight.ticket && (
                <div className="mt-2">
                  <a
                    href={concatImgURL(flight.ticket)}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    View Uploaded Ticket
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

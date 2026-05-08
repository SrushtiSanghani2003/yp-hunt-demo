import React, {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { concatImgURL, toUTCISOString } from "../../config/function";
import { chevronDown, closeIcon, mediaIcon, plusIcon } from "../../icons";
import ContentLibrary from "../contentPanel/ContentLibrary";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTournament,
  setFullTournament,
  updateTournamentField,
  updateTournamentTranslationField,
  type TournamentState,
} from "../../redux-toolkit/tournamentSlice";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { showToast } from "../../utils/toastUtils";
import {
  useTournamentById,
  useUpdateTournament,
} from "../../hooks/useTournament";
import { paths } from "../../config/paths";
import { normalizeTournamentResponse } from "./normalizer/normalizerTournament";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";
import AsyncSelect from "react-select/async";
import { customStyles } from "../account-settings/CreateCategories";
import dayjs from "dayjs";
import { useScroll } from "../../hooks/ScrollContext";
import {
  selectLanguage,
  selectTranslation,
} from "../../redux-toolkit/languageSlice";
import Swal from "sweetalert2";
interface SectionCardProps {
  title: string;
  children?: ReactNode; // ✅ optional
}

export const SectionCard = ({ title, children }: SectionCardProps) => {
  return (
    <div className="bg-gray-100 rounded-2xl border-0.5 border-primary shadow-sm p-4 mb-4">
      <h2 className=" text-xl font-extrabold mb-4">{title}</h2>
      {children}
    </div>
  );
};
// Links & SEO
type LinkField = {
  label: string;
  field: keyof TournamentState;
};
const linkFields: LinkField[] = [
  { label: "Ticket URL", field: "ticket_url" },
  { label: "Where To Watch URL", field: "where_to_watch_url" },
  {
    label: "Deadline for Registration URL",
    field: "deadline_for_registration_url",
  },
];
// Player Order
type TranslationField = keyof TournamentState["translation"];
type PlayerOrderField = {
  title: string;
  titleField?: TranslationField;
  infoField?: TranslationField;
  textareaOnly?: boolean;
  fullWidth?: boolean;
};
export const playerOrderRows: PlayerOrderField[][] = [
  [
    { title: "Qualifying Title", titleField: "qualifying_title" },
    { title: "Main Draw RD1 Title", titleField: "main_draw_rd_1_title" },
  ],
  [
    { title: "Qualifying Info", infoField: "qualifying_info" },
    { title: "Main Draw RD1 Info", infoField: "main_draw_rd_1_info" },
  ],
  [
    {
      title: "Qualifying Info 2",
      infoField: "qualifying_info_2",
      fullWidth: true,
    },
  ],
  [
    { title: "Main Draw RD2 Title", titleField: "main_draw_rd_2_title" },
    { title: "Main Draw R16 Title", titleField: "main_draw_r_16_title" },
  ],
  [
    { title: "Main Draw RD2 Info", infoField: "main_draw_rd_2_info" },
    { title: "Main Draw R16 Info", infoField: "main_draw_r_16_info" },
  ],
  [
    { title: "Main Draw QF Title", titleField: "main_draw_qf_title" },
    { title: "Main Draw SF Title", titleField: "main_draw_sf_title" },
  ],
  [
    { title: "Main Draw QF Info", infoField: "main_draw_qf_info" },
    { title: "Main Draw SF Info", infoField: "main_draw_sf_info" },
  ],
  [{ title: "Main Draw Final Title", titleField: "main_draw_final_title" }],
  [{ title: "Main Draw Final Info", infoField: "main_draw_final_info" }],
];

// Page Actions
type VisibilityField =
  | "is_travel_button_visible"
  | "is_accommodation_button_visible"
  | "is_accreditation_button_visible"
  | "is_visa_button_visible";
type PageActionField = {
  label: string;
  field: VisibilityField;
};
const pageActionFields: PageActionField[] = [
  {
    label: "Travel Button Visibility",
    field: "is_travel_button_visible",
  },
  {
    label: "Accommodation Button Visibility",
    field: "is_accommodation_button_visible",
  },
  {
    label: "Accreditation Button Visibility",
    field: "is_accreditation_button_visible",
  },
  {
    label: "Visa Button Visibility",
    field: "is_visa_button_visible",
  },
];
const EditTournaments = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [activeMediaField, setActiveMediaField] = useState<
    | "image"
    | "sponsor_image"
    | "padel_zone_content_media_url"
    | "tournament_insights_media_url"
    | "padel_zone_content_thumbnail"
    | "tournament_insights_thumbnail"
    | null
  >(null);

  const [playerMap, setPlayerMap] = useState<Record<number, string>>({});
  const { isScrolled } = useScroll();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = useSelector(selectLanguage);
  const isTranslation = useSelector(selectTranslation);
  const tournament = useSelector(selectTournament);
  const [contactErrors, setContactErrors] = useState<any>({});
  console.log("🚀 ~ EditTournaments ~ contactErrors:", contactErrors);
  const [searchParams] = useSearchParams();
  const languageCode = searchParams.get("lang") || language;
  const updateTournamentsMutation = useUpdateTournament(
    tournament,
    isTranslation,
  );
  const { data: tournamentDataById } = useTournamentById(id, languageCode);
  const handleTournamentsSubmit = (id: string | number | any) => {
    if (!validateContacts()) {
      showToast("Please fix contact validation errors", "error");
      return;
    }
    if (isEditMode && id) {
      updateTournamentsMutation.mutate(id);
    }
  };
  // const clearContactError = (index: number, field: string) => {
  //   setContactErrors((prev: any) => {
  //     if (!prev[index]?.[field]) return prev;
  //     const updated = { ...prev };
  //     delete updated[index][field];
  //     if (Object.keys(updated[index]).length === 0) {
  //       delete updated[index];
  //     }
  //     return updated;
  //   });
  // };

  const handleThumbnailChange = (url: string) => {
    if (!activeMediaField) return;

    const thumbnailFieldMap: Record<string, keyof TournamentState> = {
      padel_zone_content_media_url: "padel_zone_content_thumbnail",
      tournament_insights_media_url: "tournament_insights_thumbnail",
    };

    const thumbnailField = thumbnailFieldMap[activeMediaField];

    if (!thumbnailField) return;

    dispatch(
      updateTournamentField({
        field: thumbnailField,
        value: url,
      }),
    );
  };
  const validateContacts = () => {
    const errors: any = {};
    tournament.tournament_contacts?.forEach((contact: any, index: number) => {
      const contactError: any = {};
      if (!contact?.name || contact?.name.trim().length < 2) {
        contactError.name = "Name is required";
      }
      if (!contact.designation || contact.designation.trim() === "") {
        contactError.designation = "Designation is required";
      }
      if (!contact.mobile_number) {
        contactError.mobile_number = "Mobile number is required";
      } else if (
        !/^\+?[1-9]\d{7,14}$/.test(contact.mobile_number.replace(/\s+/g, ""))
      ) {
        contactError.mobile_number = "Enter valid mobile number";
      }
      if (Object.keys(contactError).length > 0) {
        errors[index] = contactError;
      }
    });
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const getAllPlayers = async () => {
    return await api.get("/player/getdropdown", {
      params: { page: 1, limit: 100 },
    });
  };
  const { data: allPlayers } = useQuery({
    queryKey: ["players"],
    queryFn: getAllPlayers,
    refetchOnWindowFocus: false,
  });
  const playerOptions = useMemo(
    () =>
      allPlayers?.data?.players?.map((p: any) => ({
        value: p.id,
        label: p.name,
      })) || [],
    [allPlayers],
  );
  useEffect(() => {
    if (!playerOptions.length) return;
    setPlayerMap((prev) => {
      const next = { ...prev };
      playerOptions.forEach((opt: any) => {
        next[opt.value] = opt.label;
      });
      return next;
    });
  }, [playerOptions]);

  const loadPlayerOptions = async (input: string) => {
    const res = await api.get("/player/getdropdown", {
      params: {
        page: 1,
        limit: 50,
        search: input || "",
      },
    });
    const options =
      res?.data?.players?.map((p: any) => ({
        value: p.id,
        label: p.name,
      })) || [];
    // cache labels
    setPlayerMap((prev) => {
      const next = { ...prev };
      options.forEach((opt: any) => {
        next[opt.value] = opt.label;
      });
      return next;
    });
    return options;
  };
  const getPlayersByIds = async () => {
    const playerId = tournament.tournament_insights_player_id;
    if (!playerId) return null;
    const params: Record<string, any> = {
      type: "player",
      id: playerId,
    };
    return await api.get("/common/get-dropdown-value", { params });
  };
  const { data: playersByIds } = useQuery({
    queryKey: ["playersByIds", tournament.tournament_insights_player_id],
    queryFn: getPlayersByIds,
    enabled: !!tournament.tournament_insights_player_id,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (!playersByIds?.data) return;
    const player = playersByIds.data[0];
    if (!player) return;
    setPlayerMap((prev) => ({
      ...prev,
      [player.id]: player.name,
    }));
  }, [playersByIds]);

  useEffect(() => {
    if (isEditMode && tournamentDataById) {
      const normalizedTournament = normalizeTournamentResponse(
        tournamentDataById?.data,
        languageCode,
      );
      if (!normalizedTournament.broadcast_type_redbull) {
        normalizedTournament.broadcast_type_redbull = "redbull";
      }
      dispatch(setFullTournament(normalizedTournament));
    }
  }, [tournamentDataById]);
  const handleChange =
    (field: keyof TournamentState) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value ? Number(e.target.value) : null;
      dispatch(updateTournamentField({ field, value }));
    };

  return (
    <div>
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Tournaments Builder"
          onSaveTemplate={() => navigate(paths.tournaments.path)}
          onSaveTemplateTitle="Cancel"
          onSubmit={() => handleTournamentsSubmit(String(id))}
          onSubmitLoading={updateTournamentsMutation.isPending}
          isEditMode={isEditMode}
        />
      </div>
      <div className="container grid grid-cols-12 xl:gap-sp30 lg:gap-sp16 gap-sp9">
        <div className="lg:col-span-12 md:col-span-10 col-span-10">
          <div className="bg-white md:mb-5 mb-3 border-0.5 border-primary rounded-15 md:p-5 p-3">
            <div className="grid grid-cols-12 gap-4">
              <div className=" col-span-6 bg-f6f6f6 md:mb-5 mb-3 border-0.5 border-primary rounded-15  p-3 flex justify-center items-center gap-2">
                <h1 className="font-bold">Tournament Name :</h1>
                <h1 className="font-medium">
                  {tournamentDataById?.data?.translation?.full_name || "-"}
                </h1>
              </div>
              <div className="col-span-3 bg-f6f6f6  md:mb-5 mb-3 border-0.5 border-primary rounded-15  p-3 flex justify-center items-center gap-2">
                <h1 className="font-bold">Event Code :</h1>
                <h1 className="font-medium">
                  {tournamentDataById?.data?.event_code || "-"}
                </h1>
              </div>
              <div className="col-span-3 bg-f6f6f6 md:mb-5 mb-3 border-0.5 border-primary rounded-15  p-3 flex justify-center items-center gap-2">
                <h1 className="font-bold">Tournament Id :</h1>
                <h1 className="font-medium">
                  {tournamentDataById?.data?.id || "-"}
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-f6f6f6  border-0.5 border-primary rounded-15  p-3 flex justify-center items-center gap-2">
                <h1 className="font-bold">Start Date Utc :</h1>
                <h1 className="font-medium">
                  {tournamentDataById?.data?.start_date_utc || "-"}
                </h1>
              </div>
              <div className="bg-f6f6f6  border-0.5 border-primary rounded-15  p-3 flex justify-center items-center gap-2">
                <h1 className="font-bold">End Date Utc :</h1>
                <h1 className="font-medium">
                  {tournamentDataById?.data?.end_date_utc || "-"}
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4"></div>
          </div>
          <div className="bg-white md:mb-5 mb-3 border-0.5 border-primary rounded-15 md:p-5 p-3">
            {/* Broadcast Type & URL */}
            <SectionCard title="Broadcast Settings">
              {/* <div>
                <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                  Broadcast Type Redbull
                </label>
                <div className="relative ">
                  <select
                    id="broadcastType"
                    value={tournament.broadcast_type_redbull ?? ""}
                    onChange={(e) =>
                      dispatch(
                        updateTournamentField({
                          field: "broadcast_type_redbull",
                          value: e.target.value,
                        }),
                      )
                    }
                    className="appearance-none w-full md:p-[7px] p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
                  >
                    <option value="">Broadcast type</option>
                    <option value="redbull">Redbull</option>
                    <option value="youtube">Youtube</option>
                  </select>

                  <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                    <img src={chevronDown} />
                  </div>
                </div>
              </div> */}
              <div className="grid grid-cols-3 gap-4">
                <Input
                  label="Youtube URL"
                  placeholder="https://www.example.com/"
                  value={tournament.broadcast_url || ""}
                  onChange={(e) =>
                    dispatch(
                      updateTournamentField({
                        field: "broadcast_url",
                        value:
                          e.target.value.trim() === "" ? null : e.target.value,
                      }),
                    )
                  }
                />
                {/* Youtube Start Date */}
                <Input
                  type="datetime-local"
                  label="Youtube Start Date"
                  inputCss="!pr-2"
                  value={
                    tournament.brodcast_youtube_start_date
                      ? dayjs(tournament.brodcast_youtube_start_date).format(
                          "YYYY-MM-DDTHH:mm",
                        )
                      : ""
                  }
                  onChange={(e) => {
                    const newStart = dayjs(e.target.value);
                    const end = dayjs(tournament.brodcast_youtube_end_date);
                    dispatch(
                      updateTournamentField({
                        field: "brodcast_youtube_start_date",
                        value: toUTCISOString(e.target.value),
                      }),
                    );
                    if (
                      tournament.brodcast_youtube_end_date &&
                      end.isBefore(newStart)
                    ) {
                      dispatch(
                        updateTournamentField({
                          field: "brodcast_youtube_end_date",
                          value: null,
                        }),
                      );
                    }
                  }}
                />
                {/* Youtube End Date */}
                <Input
                  type="datetime-local"
                  inputCss="!pr-2"
                  label="Youtube End Date"
                  value={
                    tournament.brodcast_youtube_end_date
                      ? dayjs(tournament.brodcast_youtube_end_date).format(
                          "YYYY-MM-DDTHH:mm",
                        )
                      : ""
                  }
                  min={
                    tournament.brodcast_youtube_start_date
                      ? dayjs(tournament.brodcast_youtube_start_date)
                          .utc()
                          .add(1, "minute") // optional if you want strictly after
                          .format("YYYY-MM-DDTHH:mm")
                      : undefined
                  }
                  onChange={(e) => {
                    const selected = dayjs(e.target.value);
                    const start = dayjs(tournament.brodcast_youtube_start_date);

                    if (start && selected.isBefore(start)) {
                      Swal.fire({
                        icon: "error",
                        title: "Invalid Date",
                        text: "Redbull end cannot be before start",
                        confirmButtonColor: "#ef4444",
                      });
                      return;
                    }

                    dispatch(
                      updateTournamentField({
                        field: "brodcast_youtube_end_date",
                        value: toUTCISOString(e.target.value),
                      }),
                    );
                  }}
                />

                <Input
                  label="Redbull URL"
                  placeholder="https://www.example.com/"
                  value={tournament.broadcast_url_redbull || ""}
                  onChange={(e) =>
                    dispatch(
                      updateTournamentField({
                        field: "broadcast_url_redbull",
                        value:
                          e.target.value.trim() === "" ? null : e.target.value,
                      }),
                    )
                  }
                />
                {/* Redbull Start Date */}
                <Input
                  type="datetime-local"
                  label="Redbull Start Date"
                  inputCss="!pr-2"
                  value={
                    tournament.brodcast_redbull_start_date
                      ? dayjs(tournament.brodcast_redbull_start_date).format(
                          "YYYY-MM-DDTHH:mm",
                        )
                      : ""
                  }
                  min={
                    tournament.brodcast_youtube_end_date
                      ? dayjs(tournament.brodcast_youtube_end_date)
                          .add(1, "minute")
                          .format("YYYY-MM-DDTHH:mm")
                      : undefined
                  }
                  onChange={(e) => {
                    const newStart = dayjs(e.target.value);
                    const end = dayjs(tournament.brodcast_youtube_end_date);
                    if (newStart.isBefore(end)) {
                      Swal.fire({
                        icon: "error",
                        title: "Invalid Date",
                        text: "Redbull start date must be after Youtube end date",
                        confirmButtonColor: "#ef4444",
                      });
                      return;
                    }
                    dispatch(
                      updateTournamentField({
                        field: "brodcast_redbull_start_date",
                        value: toUTCISOString(e.target.value),
                      }),
                    );
                    if (
                      tournament.brodcast_redbull_end_date &&
                      end.isBefore(newStart)
                    ) {
                      dispatch(
                        updateTournamentField({
                          field: "brodcast_redbull_end_date",
                          value: null,
                        }),
                      );
                    }
                  }}
                />
                {/* Redbull End Date */}
                <Input
                  type="datetime-local"
                  label="Redbull End Date"
                  inputCss="!pr-2"
                  value={
                    tournament.brodcast_redbull_end_date
                      ? dayjs(tournament.brodcast_redbull_end_date).format(
                          "YYYY-MM-DDTHH:mm",
                        )
                      : ""
                  }
                  min={
                    tournament.brodcast_redbull_start_date
                      ? dayjs(tournament.brodcast_redbull_start_date)
                          .add(1, "minute")
                          .format("YYYY-MM-DDTHH:mm")
                      : tournament.brodcast_youtube_end_date
                        ? dayjs(tournament.brodcast_youtube_end_date)
                            .add(1, "minute")
                            .format("YYYY-MM-DDTHH:mm")
                        : undefined
                  }
                  onChange={(e) => {
                    const selected = dayjs(e.target.value);
                    const start = dayjs(tournament.brodcast_redbull_start_date);
                    if (selected.isBefore(start)) {
                      Swal.fire({
                        icon: "error",
                        title: "Invalid Date",
                        text: "Redbull end cannot be before start",
                        confirmButtonColor: "#ef4444",
                      });
                      return;
                    }
                    if (selected.isBefore(start)) return;
                    dispatch(
                      updateTournamentField({
                        field: "brodcast_redbull_end_date",
                        value: toUTCISOString(e.target.value),
                      }),
                    );
                  }}
                />
              </div>
            </SectionCard>
            <SectionCard title="Links & SEO">
              {/* URL Fields */}
              <div className="grid grid-cols-3 mt-4 gap-4">
                {linkFields.map((item) => (
                  <Input
                    key={item.field}
                    label={item.label}
                    placeholder="https://www.example.com/"
                    value={(tournament[item.field] as string) ?? ""}
                    onChange={(e) =>
                      dispatch(
                        updateTournamentField({
                          field: item.field as keyof TournamentState,
                          value:
                            e.target.value.trim() === ""
                              ? null
                              : e.target.value,
                        }),
                      )
                    }
                  />
                ))}
              </div>
              <div className="mt-4">
                <Input
                  label="Meta Title"
                  placeholder="Enter Meta Title"
                  value={tournament.meta_title || ""}
                  onChange={(e) =>
                    dispatch(
                      updateTournamentField({
                        field: "meta_title",
                        value:
                          e.target.value.trim() === "" ? null : e.target.value,
                      }),
                    )
                  }
                />
                <div className="mt-4">
                  <label className="block md:text-base/4 text-sm mb-2 font-medium">
                    Meta Description
                  </label>
                  <textarea
                    rows={2}
                    className="w-full p-3 text-base border-0.5 border-primary rounded-2xl resize-none"
                    placeholder="Enter Meta Description..."
                    value={tournament?.meta_description || ""}
                    onChange={(e) =>
                      dispatch(
                        updateTournamentField({
                          field: "meta_description",
                          value:
                            e.target.value.trim() === ""
                              ? null
                              : e.target.value,
                        }),
                      )
                    }
                  />
                </div>
              </div>
            </SectionCard>
            <SectionCard title="Media & Display Settings">
              {/* Tournament Image */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
                  <div className="md:w-sp170 w-20 h-full">
                    {tournament.image ? (
                      <img
                        src={concatImgURL(tournament.image)}
                        alt="Uploaded"
                        className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary block align-middle"
                      />
                    ) : (
                      <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                        <img src={mediaIcon} alt="Placeholder" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      label="Tournaments Image URL"
                      placeholder="https://www.example.com"
                      className="m-0"
                      value={concatImgURL(tournament.image)}
                      readOnly
                    />
                    <div>
                      {tournament.image ? (
                        <Button
                          text="Remove Image"
                          icon={closeIcon}
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() =>
                            dispatch(
                              updateTournamentField({
                                field: "image",
                                value: null,
                              }),
                            )
                          }
                        />
                      ) : (
                        <Button
                          icon={plusIcon}
                          text="Add Image"
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() => setActiveMediaField("image")}
                        />
                      )}
                    </div>
                  </div>
                </div>
                {/* Sponsor Image */}
                <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 ">
                  <div className="md:w-sp170 w-20 h-full">
                    {tournament.sponsor_image ? (
                      <img
                        src={concatImgURL(tournament.sponsor_image)}
                        alt="Uploaded"
                        className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary block align-middle"
                      />
                    ) : (
                      <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                        <img src={mediaIcon} alt="Placeholder" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      label="Sponsor Image URL"
                      placeholder="https://www.example.com"
                      className="m-0"
                      value={concatImgURL(tournament.sponsor_image)}
                      readOnly
                    />
                    <div>
                      {tournament.sponsor_image ? (
                        <Button
                          text="Remove Image"
                          icon={closeIcon}
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() =>
                            dispatch(
                              updateTournamentField({
                                field: "sponsor_image",
                                value: null,
                              }),
                            )
                          }
                        />
                      ) : (
                        <Button
                          icon={plusIcon}
                          text="Add Image"
                          backgroundColor="transparent"
                          className="py-0"
                          imageclassName="md:w-5 w-3 md:h-5 h-3"
                          onClick={() => setActiveMediaField("sponsor_image")}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 my-4 gap-4">
                <Input
                  type="datetime-local"
                  label="Accommodation Start Date"
                  inputCss="!pr-2"
                  value={
                    tournament.accommodation_start_date
                      ? dayjs(tournament.accommodation_start_date)
                          .utc()
                          .format("YYYY-MM-DDTHH:mm")
                      : ""
                  }
                  onChange={(e) =>
                    dispatch(
                      updateTournamentField({
                        field: "accommodation_start_date",
                        value: toUTCISOString(e.target.value),
                      }),
                    )
                  }
                />
                <div>
                  <Input
                    type="datetime-local"
                    inputCss="!pr-2"
                    label="Accommodation End Date"
                    value={
                      tournament.accommodation_end_date
                        ? dayjs(tournament.accommodation_end_date)
                            .utc()
                            .format("YYYY-MM-DDTHH:mm")
                        : ""
                    }
                    onChange={(e) =>
                      dispatch(
                        updateTournamentField({
                          field: "accommodation_end_date",
                          value: toUTCISOString(e.target.value),
                        }),
                      )
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Background Name"
                  placeholder="Enter Background Name"
                  value={tournament.translation.background_name || ""}
                  onChange={(e) =>
                    dispatch(
                      updateTournamentTranslationField({
                        field: "background_name",
                        value:
                          e.target.value.trim() === "" ? null : e.target.value,
                      }),
                    )
                  }
                />
                <Input
                  label="Favourite Player Title"
                  placeholder="Enter Favourite Player Title"
                  value={tournament.translation.favourite_player_title || ""}
                  onChange={(e) =>
                    dispatch(
                      updateTournamentTranslationField({
                        field: "favourite_player_title",
                        value:
                          e.target.value.trim() === "" ? null : e.target.value,
                      }),
                    )
                  }
                />
              </div>
            </SectionCard>
            {/* Padel Zone Content */}
            <div className="p-4 mb-8 bg-gray-100 border-0.5 border-primary rounded-2xl mt-10">
              <h3 className="lg:text-xl/4 text-xl font-extrabold   mb-6">
                Padel Zone Content
              </h3>
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Title"
                    placeholder="Enter Title"
                    value={
                      tournament.translation.padel_zone_content_title || ""
                    }
                    onChange={(e) =>
                      dispatch(
                        updateTournamentTranslationField({
                          field: "padel_zone_content_title",
                          value:
                            e.target.value.trim() === ""
                              ? null
                              : e.target.value,
                        }),
                      )
                    }
                  />
                  <div>
                    <div>
                      <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                        Type
                      </label>
                      <div className="relative">
                        <select
                          value={tournament.padel_zone_content_type ?? ""}
                          onChange={(e) => {
                            const newType = e.target.value as
                              | "image"
                              | "video"
                              | "";
                            dispatch(
                              updateTournamentField({
                                field: "padel_zone_content_type",
                                value: newType || null,
                              }),
                            );
                            dispatch(
                              updateTournamentField({
                                field: "padel_zone_content_media_url",
                                value: null,
                              }),
                            );
                          }}
                          className="appearance-none w-full md:p-[7px] p-2 md:text-base text-xs border-0.5 border-primary rounded-lg"
                        >
                          <option value="">Select type</option>
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                        </select>
                        <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                          <img src={chevronDown} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Dynamic Media Input */}
                {tournament.padel_zone_content_type === "image" && (
                  <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 mt-4">
                    <div className="md:w-sp170 w-20 h-full">
                      {tournament.padel_zone_content_media_url ? (
                        <img
                          src={concatImgURL(
                            tournament.padel_zone_content_media_url,
                          )}
                          alt="Uploaded"
                          className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary"
                        />
                      ) : (
                        <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                          <img src={mediaIcon} alt="Placeholder" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <Input
                        label="Image URL"
                        value={concatImgURL(
                          tournament.padel_zone_content_media_url,
                        )}
                        readOnly
                      />
                      {tournament.padel_zone_content_media_url ? (
                        <Button
                          text="Remove Image"
                          icon={closeIcon}
                          backgroundColor="transparent"
                          className="py-0"
                          onClick={() =>
                            dispatch(
                              updateTournamentField({
                                field: "padel_zone_content_media_url",
                                value: null,
                              }),
                            )
                          }
                        />
                      ) : (
                        <Button
                          icon={plusIcon}
                          text="Add Image"
                          backgroundColor="transparent"
                          className="py-0"
                          onClick={() =>
                            setActiveMediaField("padel_zone_content_media_url")
                          }
                        />
                      )}
                    </div>
                  </div>
                )}
                {tournament.padel_zone_content_type === "video" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 mt-4">
                      <div className="md:w-sp170 w-20 h-full">
                        {tournament.padel_zone_content_media_url ? (
                          <video
                            src={concatImgURL(
                              tournament.padel_zone_content_media_url,
                            )}
                            controls
                            className="w-full h-full rounded-2xl border-0.5 border-primary object-contain p-2"
                          />
                        ) : (
                          <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                            <img src={mediaIcon} alt="Placeholder" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <Input
                          label="Video URL"
                          value={concatImgURL(
                            tournament.padel_zone_content_media_url,
                          )}
                          readOnly
                        />
                        {tournament.padel_zone_content_media_url ? (
                          <Button
                            text="Remove Video"
                            icon={closeIcon}
                            backgroundColor="transparent"
                            className="py-0"
                            onClick={() =>
                              dispatch(
                                updateTournamentField({
                                  field: "padel_zone_content_media_url",
                                  value: null,
                                }),
                              )
                            }
                          />
                        ) : (
                          <Button
                            icon={plusIcon}
                            text="Add Video"
                            backgroundColor="transparent"
                            className="py-0"
                            onClick={() =>
                              setActiveMediaField(
                                "padel_zone_content_media_url",
                              )
                            }
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 mt-4">
                      <div className="md:w-sp170 w-20 h-full">
                        <div className="md:w-sp170 w-20 h-full">
                          {tournament.padel_zone_content_thumbnail ? (
                            <img
                              src={concatImgURL(
                                tournament.padel_zone_content_thumbnail,
                              )}
                              alt="Uploaded"
                              className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary"
                            />
                          ) : (
                            <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                              <img src={mediaIcon} alt="Placeholder" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <Input
                          label="Video Thumbnail URL"
                          value={concatImgURL(
                            tournament.padel_zone_content_thumbnail,
                          )}
                          readOnly
                        />
                        {tournament.padel_zone_content_thumbnail ? (
                          <Button
                            text="Remove Video"
                            icon={closeIcon}
                            backgroundColor="transparent"
                            className="py-0"
                            onClick={() =>
                              dispatch(
                                updateTournamentField({
                                  field: "padel_zone_content_thumbnail",
                                  value: null,
                                }),
                              )
                            }
                          />
                        ) : (
                          <Button
                            icon={plusIcon}
                            text="Add Video"
                            backgroundColor="transparent"
                            className="py-0"
                            onClick={() =>
                              setActiveMediaField(
                                "padel_zone_content_thumbnail",
                              )
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {tournament.padel_zone_content_type === "image" && (
                <Input
                  label="Link"
                  placeholder="https://www.example.com/"
                  value={tournament.padel_zone_content_link || ""}
                  onChange={(e) =>
                    dispatch(
                      updateTournamentField({
                        field: "padel_zone_content_link",
                        value:
                          e.target.value.trim() === "" ? null : e.target.value,
                      }),
                    )
                  }
                />
              )}
            </div>
            {/* tournament insights */}
            <div className="p-4 mb-6 bg-gray-100 border-0.5 border-primary rounded-2xl ">
              <h3 className="lg:text-xl/4 text-xl font-extrabold   mb-6">
                Tournament Insights
              </h3>
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Title"
                    placeholder="Enter Title"
                    value={
                      tournament.translation.tournament_insights_title || ""
                    }
                    onChange={(e) =>
                      dispatch(
                        updateTournamentTranslationField({
                          field: "tournament_insights_title",
                          value:
                            e.target.value.trim() === ""
                              ? null
                              : e.target.value,
                        }),
                      )
                    }
                  />
                  <div>
                    <div>
                      <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                        Type
                      </label>
                      <div className="relative">
                        <select
                          value={tournament.tournament_insights_type ?? ""}
                          onChange={(e) => {
                            const newType = e.target.value as
                              | "image"
                              | "video"
                              | "";
                            dispatch(
                              updateTournamentField({
                                field: "tournament_insights_type",
                                value: newType || null,
                              }),
                            );

                            dispatch(
                              updateTournamentField({
                                field: "tournament_insights_media_url",
                                value: null,
                              }),
                            );
                          }}
                          className="appearance-none w-full md:p-[7px] p-2 md:text-base text-xs border-0.5 border-primary rounded-lg"
                        >
                          <option value="">Select type</option>
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                        </select>
                        <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                          <img src={chevronDown} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Dynamic Media Input */}
                {tournament.tournament_insights_type === "image" && (
                  <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 mt-4">
                    <div className="md:w-sp170 w-20 h-full">
                      {tournament.tournament_insights_media_url ? (
                        <img
                          src={concatImgURL(
                            tournament.tournament_insights_media_url,
                          )}
                          alt="Uploaded"
                          className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary"
                        />
                      ) : (
                        <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                          <img src={mediaIcon} alt="Placeholder" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <Input
                        label="Image URL"
                        value={concatImgURL(
                          tournament.tournament_insights_media_url,
                        )}
                        readOnly
                      />
                      {tournament.tournament_insights_media_url ? (
                        <Button
                          text="Remove Image"
                          icon={closeIcon}
                          backgroundColor="transparent"
                          className="py-0"
                          onClick={() =>
                            dispatch(
                              updateTournamentField({
                                field: "tournament_insights_media_url",
                                value: null,
                              }),
                            )
                          }
                        />
                      ) : (
                        <Button
                          icon={plusIcon}
                          text="Add Image"
                          backgroundColor="transparent"
                          className="py-0"
                          onClick={() =>
                            setActiveMediaField("tournament_insights_media_url")
                          }
                        />
                      )}
                    </div>
                  </div>
                )}
                {tournament.tournament_insights_type === "video" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 mt-4">
                      <div className="md:w-sp170 w-20 h-full">
                        {tournament.tournament_insights_media_url ? (
                          <video
                            src={concatImgURL(
                              tournament.tournament_insights_media_url,
                            )}
                            controls
                            className="w-full h-full rounded-2xl border-0.5 border-primary object-contain p-2"
                          />
                        ) : (
                          <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                            <img src={mediaIcon} alt="Placeholder" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <Input
                          label="Video URL"
                          value={concatImgURL(
                            tournament.tournament_insights_media_url,
                          )}
                          readOnly
                        />
                        {tournament.tournament_insights_media_url ? (
                          <Button
                            text="Remove Video"
                            icon={closeIcon}
                            backgroundColor="transparent"
                            className="py-0"
                            onClick={() =>
                              dispatch(
                                updateTournamentField({
                                  field: "tournament_insights_media_url",
                                  value: null,
                                }),
                              )
                            }
                          />
                        ) : (
                          <Button
                            icon={plusIcon}
                            text="Add Video"
                            backgroundColor="transparent"
                            className="py-0"
                            onClick={() =>
                              setActiveMediaField(
                                "tournament_insights_media_url",
                              )
                            }
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 mt-4">
                      <div className="md:w-sp170 w-20 h-full">
                        {tournament.tournament_insights_thumbnail ? (
                          <img
                            src={concatImgURL(
                              tournament.tournament_insights_thumbnail,
                            )}
                            alt="Uploaded"
                            className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary"
                          />
                        ) : (
                          <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                            <img src={mediaIcon} alt="Placeholder" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <Input
                          label="Video Thumbnail URL"
                          value={concatImgURL(
                            tournament.tournament_insights_thumbnail,
                          )}
                          readOnly
                        />
                        {tournament.tournament_insights_thumbnail ? (
                          <Button
                            text="Remove Video"
                            icon={closeIcon}
                            backgroundColor="transparent"
                            className="py-0"
                            onClick={() =>
                              dispatch(
                                updateTournamentField({
                                  field: "tournament_insights_thumbnail",
                                  value: null,
                                }),
                              )
                            }
                          />
                        ) : (
                          <Button
                            icon={plusIcon}
                            text="Add Video"
                            backgroundColor="transparent"
                            className="py-0"
                            onClick={() =>
                              setActiveMediaField(
                                "tournament_insights_thumbnail",
                              )
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                  Player
                </label>
                <AsyncSelect
                  isClearable
                  cacheOptions
                  loadOptions={loadPlayerOptions}
                  defaultOptions
                  styles={customStyles}
                  placeholder="Type to search player"
                  value={
                    tournament.tournament_insights_player_id
                      ? {
                          value: tournament.tournament_insights_player_id,
                          label:
                            playerMap[
                              tournament.tournament_insights_player_id
                            ] || "Loading...",
                        }
                      : null
                  }
                  onChange={(selected: any) =>
                    dispatch(
                      updateTournamentField({
                        field: "tournament_insights_player_id",
                        value: selected ? Number(selected.value) : null,
                      }),
                    )
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {tournament.tournament_insights_player_id && (
                  <>
                    <Input
                      label="Tournament Emerging Player Title"
                      placeholder="Enter Tournament Emerging Player Title"
                      value={
                        tournament.tournament_insights_emerging_player_title ||
                        ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateTournamentField({
                            field: "tournament_insights_emerging_player_title",
                            value:
                              e.target.value.trim() === ""
                                ? null
                                : e.target.value,
                          }),
                        )
                      }
                    />
                    <Input
                      label="Tournament Emerging Player Value"
                      placeholder="Enter Tournament Emerging Player Value"
                      value={tournament.tournament_insights_fastest_serve || ""}
                      onChange={(e) =>
                        dispatch(
                          updateTournamentField({
                            field: "tournament_insights_fastest_serve",
                            value:
                              e.target.value.trim() === ""
                                ? null
                                : e.target.value,
                          }),
                        )
                      }
                    />
                    <Input
                      label="Fastest Serve Unit"
                      placeholder="Enter Fastest Serve Unit"
                      value={
                        tournament?.translation
                          ?.tournament_insights_fastest_serve_unit || ""
                      }
                      onChange={(e) =>
                        dispatch(
                          updateTournamentTranslationField({
                            field: "tournament_insights_fastest_serve_unit",
                            value:
                              e.target.value.trim() === ""
                                ? null
                                : e.target.value,
                          }),
                        )
                      }
                    />
                  </>
                )}
                {tournament.tournament_insights_type === "image" && (
                  <Input
                    label="Link"
                    placeholder="https://www.example.com/"
                    value={tournament.tournament_insights_link || ""}
                    onChange={(e) =>
                      dispatch(
                        updateTournamentField({
                          field: "tournament_insights_link",
                          value:
                            e.target.value.trim() === ""
                              ? null
                              : e.target.value,
                        }),
                      )
                    }
                  />
                )}
              </div>
            </div>
            {/* Tournament Contacts */}
            {/* <div className="p-4 bg-gray-100 border-0.5 border-primary rounded-2xl mb-4">
              <h2 className="lg:text-xl/4 text-xl font-extrabold   mb-6 ">
                Tournament Contacts
              </h2>
              {tournament.tournament_contacts?.map(
                (contact: any, index: number) => (
                  <div
                    key={index}
                    className="my-2 p-3 bg-white border border-primary rounded-xl"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">Contact {index + 1}</h3>
                      <Button
                        icon={closeIcon}
                        backgroundColor="transparent"
                        className="!py-0"
                        onClick={() => dispatch(removeTournamentContact(index))}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input
                          label="Name"
                          placeholder="Enter name"
                          value={contact.name || ""}
                          onChange={(e) => {
                            dispatch(
                              updateTournamentContact({
                                index,
                                field: "name",
                                value: e.target.value || null,
                              }),
                            );

                            clearContactError(index, "name");
                          }}
                        />
                        {contactErrors[index]?.name && (
                          <p className="text-red-500 text-xs mt-1">
                            {contactErrors[index].name}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input
                          label="Designation"
                          placeholder="Enter designation"
                          value={contact.designation || ""}
                          onChange={(e) => {
                            dispatch(
                              updateTournamentContact({
                                index,
                                field: "designation",
                                value: e.target.value || null,
                              }),
                            );
                            clearContactError(index, "designation");
                          }}
                        />
                        {contactErrors[index]?.designation && (
                          <p className="text-red-500 text-xs mt-1">
                            {contactErrors[index].designation}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                          Mobile Number
                        </label>
                        <PhoneInput
                          country="in"
                          value={contact.mobile_number || ""}
                          onChange={(value) => {
                            dispatch(
                              updateTournamentContact({
                                index,
                                field: "mobile_number",
                                value: value
                                  ? `+${value.replace(/^\+/, "")}`
                                  : null,
                              }),
                            );
                            clearContactError(index, "mobile_number");
                          }}
                          countryCodeEditable={false}
                          enableSearch
                          placeholder="Enter mobile number"
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
                        {contactErrors[index]?.mobile_number && (
                          <p className="text-red-500 text-xs mt-1">
                            {contactErrors[index].mobile_number}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input
                          label="Email"
                          placeholder="Enter email"
                          value={contact.email || ""}
                          onChange={(e) => {
                            dispatch(
                              updateTournamentContact({
                                index,
                                field: "email",
                                value: e.target.value || null,
                              }),
                            );
                            clearContactError(index, "email");
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ),
              )}
              <div className="flex justify-between items-center">
                <Button
                  icon={plusIcon}
                  text="Add Contact"
                  backgroundColor="transparent"
                  className="py-0"
                  onClick={() => dispatch(addTournamentContact())}
                />
              </div>
            </div> */}
            <SectionCard title="Page Actions">
              <div className="grid grid-cols-2 gap-4 mt-4">
                {pageActionFields.map((item) => (
                  <div key={item.field}>
                    <label className="block text-base md:mb-2 mb-1 font-medium">
                      {item.label}
                    </label>
                    <select
                      value={tournament[item.field] ?? ""}
                      onChange={handleChange(item.field)}
                      className="w-full p-2 md:text-base text-sm border border-primary md:rounded-xl rounded-lg bg-transparent"
                    >
                      <option value="" disabled>
                        Select visibility
                      </option>
                      <option value={1}>Yes</option>
                      <option value={0}>No</option>
                    </select>
                  </div>
                ))}
              </div>
            </SectionCard>
            {/* <SectionCard title="Tournament Structure">
              <div className="grid grid-cols-2 mt-4 gap-4">
                <Input
                  label="Qualification Title"
                  placeholder="Enter Qualification Title"
                  value={tournament.translation.qualification_title || ""}
                  onChange={(e) =>
                    dispatch(
                      updateTournamentTranslationField({
                        field: "qualification_title",
                        value:
                          e.target.value.trim() === "" ? null : e.target.value,
                      }),
                    )
                  }
                />
                <Input
                  label="Main Draw Title"
                  placeholder="Enter Main Draw Title"
                  value={tournament.translation.main_draw_title || ""}
                  onChange={(e) =>
                    dispatch(
                      updateTournamentTranslationField({
                        field: "main_draw_title",
                        value:
                          e.target.value.trim() === "" ? null : e.target.value,
                      }),
                    )
                  }
                />
                <TextareaField
                  label="Qualification Info"
                  placeholder="Press Enter for a new line..."
                  value={tournament?.translation.qualification_info}
                  rows={3}
                  onChange={(value) =>
                    dispatch(
                      updateTournamentTranslationField({
                        field: "qualification_info",
                        value,
                      }),
                    )
                  }
                />
                <TextareaField
                  label="Main Draw Info"
                  placeholder="Press Enter for a new line..."
                  value={tournament?.translation.main_draw_info}
                  rows={3}
                  onChange={(value) =>
                    dispatch(
                      updateTournamentTranslationField({
                        field: "main_draw_info",
                        value,
                      }),
                    )
                  }
                />
              </div>
            </SectionCard> */}
            {/* <SectionCard title="Player Order">
              <div>
                {playerOrderRows.map((row, rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-2 gap-4 mb-4">
                    {row.map((field) => {
                      if (field.titleField) {
                        return (
                          <Input
                            key={field.titleField}
                            label={field.title}
                            placeholder={`Enter ${field.title}`}
                            value={
                              tournament.translation[field.titleField] || ""
                            }
                            onChange={(e) =>
                              dispatch(
                                updateTournamentTranslationField({
                                  field: field.titleField!,
                                  value:
                                    e.target.value.trim() === ""
                                      ? null
                                      : e.target.value,
                                }),
                              )
                            }
                          />
                        );
                      }

                      if (field.infoField) {
                        return (
                          <div
                            key={field.infoField}
                            className={field.fullWidth ? "col-span-2" : ""}
                          >
                            <TextareaField
                              label={field.title}
                              placeholder="Press Enter for a new line..."
                              rows={3}
                              value={
                                tournament.translation[field.infoField] || ""
                              }
                              onChange={(value) =>
                                dispatch(
                                  updateTournamentTranslationField({
                                    field: field.infoField!,
                                    value,
                                  }),
                                )
                              }
                            />
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                ))}
              </div>
            </SectionCard> */}
          </div>
        </div>
      </div>

      {/* Content Library Modal */}
      {activeMediaField && (
        <ContentLibrary
          open={Boolean(activeMediaField)}
          onClose={() => setActiveMediaField(null)}
          uploadType="tournament"
          mediaFilter={
            activeMediaField === "padel_zone_content_media_url"
              ? tournament.padel_zone_content_type || undefined
              : activeMediaField === "tournament_insights_media_url"
                ? tournament.tournament_insights_type || undefined
                : activeMediaField === "padel_zone_content_thumbnail"
                  ? "image"
                  : activeMediaField === "tournament_insights_thumbnail"
                    ? "image"
                    : "image"
          }
          onSelect={(value: string) => {
            if (!activeMediaField) return; // safety check

            dispatch(
              updateTournamentField({
                field: activeMediaField,
                value,
              }),
            );

            setActiveMediaField(null);
          }}
          onThumbnailSelect={(url: string) => {
            handleThumbnailChange(url);
          }}
        />
      )}
    </div>
  );
};

export default EditTournaments;

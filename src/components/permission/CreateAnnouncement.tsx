import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AsyncSelect from "react-select/async";

import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import { paths } from "../../config/paths";
import { customStyles } from "../account-settings/CreateCategories";

import {
  selectAnnouncements,
  setTournamentId,
  addAnnouncement,
  updateAnnouncement,
  removeAnnouncement,
  setAnnouncementStatus,
  setAnnouncements,
} from "../../redux-toolkit/announcementsSlice";

import api from "../../lib/api";
import Input from "../ui/input/Input";
import { closeIcon, plusIcon } from "../../icons";
import {
  useCreateAnnouncements,
  useGetAnnouncementsById,
  useUpdateAnnouncements,
} from "../../hooks/useAnnouncement";
import { normalizeAnnouncementsResponse } from "./normalizer/normalizerAnnouncement";
import { useScroll } from "../../hooks/ScrollContext";

const CreateAnnouncement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isScrolled } = useScroll();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const announcementsState = useSelector(selectAnnouncements);
  const createModuleMutation = useCreateAnnouncements(announcementsState);
  const updateModuleMutation = useUpdateAnnouncements(announcementsState);
  const { data: announcementsDataById } = useGetAnnouncementsById(id);
  /* ===============================
     Local State
  =============================== */
  const [selectedTournament, setSelectedTournament] = useState<any | null>(
    null,
  );

  /* ===============================
     API: Get tournaments
  =============================== */
  const getAllTournaments = async () => {
    const res = await api.get("/tournament/getDropdown");
    return res.data;
  };

  const { data: allTournaments = [] } = useQuery({
    queryKey: ["tournaments"],
    queryFn: getAllTournaments,
    refetchOnWindowFocus: false,
  });

  /* ===============================
     Tournament Options
  =============================== */
  const tournamentOptions = useMemo(
    () =>
      allTournaments.map((item: any) => ({
        value: item.id,
        label: item.name,
      })),
    [allTournaments],
  );

  /* ===============================
     Async Select
  =============================== */
  const loadOptionsTournaments = (
    inputValue: string,
    callback: (options: any[]) => void,
  ) => {
    if (!inputValue) {
      callback(tournamentOptions.slice(0, 50));
      return;
    }

    const filtered = tournamentOptions.filter((t: any) =>
      t.label.toLowerCase().includes(inputValue.toLowerCase()),
    );

    callback(filtered.slice(0, 50));
  };

  /* ===============================
     Handlers
  =============================== */
  const handleTournamentChange = (selected: any) => {
    setSelectedTournament(selected);
    dispatch(setTournamentId(selected?.value ?? null));
  };
  const utcToDateInput = (utcString: string) => {
    if (!utcString) return "";
    return new Date(utcString).toISOString().split("T")[0];
  };
  const dateInputToUTC = (date: string) => {
    if (!date) return "";
    return new Date(`${date}T00:00:00Z`).toISOString();
  };

  const handleAddAnnouncement = () => {
    dispatch(
      addAnnouncement({
        title: "",
        description: "",
        date: "",
      }),
    );
  };

  const handleAnnouncementChange = (
    index: number,
    field: "title" | "description" | "date",
    value: string,
  ) => {
    const updatedValue = field === "date" ? dateInputToUTC(value) : value;

    dispatch(
      updateAnnouncement({
        index,
        data: { [field]: updatedValue },
      }),
    );
  };

  const handleDeleteAnnouncement = (index: number) => {
    dispatch(removeAnnouncement(index));
  };

  /* ===============================
     Edit Mode – set tournament
  =============================== */
  useEffect(() => {
    if (announcementsState.tournaments_id && tournamentOptions.length) {
      const selected = tournamentOptions.find(
        (t: any) => t.value === announcementsState.tournaments_id,
      );
      setSelectedTournament(selected ?? null);
    }
  }, [announcementsState.tournaments_id, tournamentOptions]);

  /* ===============================
     Submit
  =============================== */
  const handleAnnouncementsSubmit = () => {
    if (isEditMode && id) {
      updateModuleMutation.mutate(id);
    } else {
      createModuleMutation.mutate();
    }
  };
  useEffect(() => {
    if (isEditMode && announcementsDataById) {
      const normalized = normalizeAnnouncementsResponse(announcementsDataById);

      dispatch(setTournamentId(normalized.tournaments_id));
      dispatch(setAnnouncementStatus(normalized.status));
      dispatch(setAnnouncements(normalized.announcements));
    }
  }, [isEditMode, announcementsDataById, dispatch]);

  /* ===============================
     UI
  =============================== */
  return (
    <div>
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Announcements Builder"
          onSaveTemplate={() => navigate(paths.announcements.path)}
          onSaveTemplateTitle="Cancel"
          onSubmitLoading={
            createModuleMutation.isPending || updateModuleMutation.isPending
          }
          onSubmit={handleAnnouncementsSubmit}
          isEditMode={isEditMode}
        />
      </div>
      <div className="container grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-11">
          <div className="bg-white border border-primary rounded-2xl p-5">
            {/* Tournament */}
            <div className="mb-5">
              <label className="block mb-2 font-medium">Tournament</label>

              <AsyncSelect
                cacheOptions
                styles={customStyles}
                loadOptions={loadOptionsTournaments}
                defaultOptions={tournamentOptions.slice(0, 50)}
                placeholder="Type to search tournament"
                value={selectedTournament}
                onChange={handleTournamentChange}
              />
            </div>

            {/* Announcements List */}
            {announcementsState.announcements.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  className="mb-4 p-3 border border-primary rounded-xl bg-gray-50"
                >
                  <div className="flex justify-end ">
                    <button
                      onClick={() => handleDeleteAnnouncement(index)}
                      className="text-red-600 text-sm font-medium"
                    >
                      <img src={closeIcon} alt="" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Title"
                      value={item.title}
                      placeholder="Enter title"
                      className="!pr-0"
                      onChange={(e) =>
                        handleAnnouncementChange(index, "title", e.target.value)
                      }
                    />

                    <Input
                      label="Date"
                      type="date"
                      inputCss="!pr-2"
                      value={utcToDateInput(item.date)}
                      onChange={(e) =>
                        handleAnnouncementChange(index, "date", e.target.value)
                      }
                    />
                  </div>

                  <label className="block text-sm font-medium mt-3 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    className="w-full p-3 border border-primary rounded-xl resize-none"
                    value={item.description}
                    onChange={(e) =>
                      handleAnnouncementChange(
                        index,
                        "description",
                        e.target.value,
                      )
                    }
                  />
                </div>
              ),
            )}

            {/* Add Button */}
            <button
              onClick={handleAddAnnouncement}
              className="px-4 py-2 rounded-lg bg-primary text-black flex justify-center gap-2"
            >
              <img src={plusIcon} alt="" /> Add Announcement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncement;

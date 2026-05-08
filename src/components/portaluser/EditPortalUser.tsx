import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import { paths } from "../../config/paths";
import { chevronDown } from "../../icons";
import { useEffect, useMemo, useState } from "react";
import AsyncSelect from "react-select/async";
import api from "../../lib/api";
import { useGetAppUser, useUpdateAppUser } from "../../hooks/allUser";
import { customStyles } from "../account-settings/CreateCategories";
import { useDispatch, useSelector } from "react-redux";

import { useScroll } from "../../hooks/ScrollContext";
import { normalizePortalUserResponse } from "./normalizer/normalizerPortalUser";
import {
  resetPortalUser,
  selectPortalUser,
  setPortalUser,
  setPortalUserFirstName,
  setPortalUserLastName,
  setPortalUserPlayers,
  setPortalUserRole,
  setPortalUserTeams,
} from "../../redux-toolkit/portalUserSlice";
import Input from "../ui/input/Input";

const roleOptions = [
  { id: 4, name: "Player" },
  { id: 5, name: "Manager" },
  { id: 6, name: "PlayerFamily" },
  { id: 7, name: "Coach" },
  { id: 8, name: "PremierPadelStaff" },
  { id: 9, name: "PlayerSupportStaff" },
];

export default function EditPortalUser() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isScrolled } = useScroll();
  const portalUser = useSelector(selectPortalUser);
  const isPlayerRole = portalUser.role === 4;
  const isPremierPadelStaff = portalUser.role === 8;
  const { data } = useGetAppUser(id);
  const updateUserMutation = useUpdateAppUser();

  /* ---------------- PLAYER ASYNC ---------------- */
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const getAllPlayers = async () => {
    const params: Record<string, any> = {
      page: 1,
      limit: 200,
    };
    return await api.get("/player/getdropdown", { params });
  };

  const { data: allPlayerData } = useQuery({
    queryKey: ["players"],
    queryFn: getAllPlayers,
    refetchOnWindowFocus: false,
  });
  const playerOptions = useMemo(
    () =>
      allPlayerData?.data?.players?.map((item: any) => ({
        value: item.id,
        label: item.name,
      })) || [],
    [allPlayerData],
  );

  const loadPlayerOptions = async (input: string) => {
    if (!input) {
      return playerOptions;
    }

    const res = await api.get("/player/getdropdown", {
      params: {
        page: 1,
        limit: 5000,
        search: input,
      },
    });

    return res.data.players?.map((p: any) => ({
      value: p.id,
      label: p.name,
    }));
  };

  const handleSelectChange = (selected: any) => {
    const convertId = (value: any) =>
      /^[0-9]+$/.test(value) ? Number(value) : value;

    const values = Array.isArray(selected)
      ? selected.map((option: any) => convertId(option.value))
      : selected
        ? [convertId(selected.value)]
        : [];

    dispatch(setPortalUserPlayers(values));

    setSelectedPlayers(selected || []);
  };

  //my team
  const [selectedTeams, setSelectedTeams] = useState([]);
  const getAllTeams = async () => {
    const params: Record<string, any> = {
      page: 1,
      limit: 200,
    };
    const roleName = roleOptions.find((r) => r.id === portalUser.role)?.name;

    if (roleName) {
      params.role = roleName;
    }
    return await api.get("/appuser/getTeamDropdown", { params });
  };
  const { data: allTeamsData } = useQuery({
    queryKey: ["teams", portalUser.role],
    queryFn: getAllTeams,
    refetchOnWindowFocus: false,
  });
  const teamOptions = useMemo(
    () =>
      allTeamsData?.data?.appusers?.map((item: any) => ({
        value: item.id,
        label: item.full_name,
      })) || [],
    [allTeamsData],
  );
  const loadTeamsOptions = async (input: string) => {
    const params: Record<string, any> = {
      page: 1,
      limit: 5000,
    };

    if (input) {
      params.search = input;
    }

    const roleName = roleOptions.find((r) => r.id === portalUser.role)?.name;

    if (roleName) {
      params.role = roleName;
    }

    const res = await api.get("/appuser/getTeamDropdown", { params });

    return res.data.appusers?.map((p: any) => ({
      value: p.id,
      label: p.full_name,
    }));
  };

  const handleTeamSelectChange = (selected: any) => {
    const convertId = (value: any) =>
      /^[0-9]+$/.test(value) ? Number(value) : value;

    const values = Array.isArray(selected)
      ? selected?.map((option: any) => convertId(option.value))
      : selected
        ? [convertId(selected.value)]
        : [];

    dispatch(setPortalUserTeams(values));

    setSelectedTeams(selected);
  };
  useEffect(() => {
    if (data?.data) {
      const normalized = normalizePortalUserResponse(data.data);

      if (!normalized.role || normalized.role === 3) {
        normalized.role = 4;
      }

      dispatch(setPortalUser(normalized));

      if (data.data.players?.length) {
        const selected = data.data.players.map((p: any) => ({
          value: p.id,
          label: p.name,
        }));
        setSelectedPlayers(selected);
      } else {
        setSelectedPlayers([]);
      }

      if (data.data.teams?.length) {
        const selected = data.data.teams.map((t: any) => ({
          value: t.id,
          label: t.name,
        }));
        setSelectedTeams(selected);
      } else {
        setSelectedTeams([]);
      }
    }

    return () => {
      dispatch(resetPortalUser());
    };
  }, [data, dispatch]);

  /* ---------------- ACTIONS ---------------- */
  const goBackToList = () => {
    if (location.pathname.includes("/portaluser")) {
      navigate(paths.users.portaluser.path);
    } else {
      navigate(paths.users.allusers.path);
    }
  };

  const handleUserSubmit = (id: string) => {
    updateUserMutation.mutate(
      {
        id,
        payload: {
          role: portalUser.role,
          first_name: portalUser.first_name,
          last_name: portalUser.last_name,
          player_ids: portalUser.player_ids,
          team_ids: portalUser.team_ids,
        },
      },
      {
        onSuccess: () => {
          dispatch(resetPortalUser());
          goBackToList();
        },
      },
    );
  };

  /* ---------------- UI ---------------- */
  return (
    <div>
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="User Builder"
          onSaveTemplate={goBackToList}
          onSaveTemplateTitle="Cancel"
          onSubmit={() => handleUserSubmit(String(id))}
          onSubmitLoading={updateUserMutation.isPending}
          isEditMode={isEditMode}
        />
      </div>
      <div className="container grid grid-cols-12 xl:gap-sp30 lg:gap-sp16 gap-sp9">
        <div className="lg:col-span-11 md:col-span-10 col-span-10">
          {/* User Info */}
          <div className="bg-white md:mb-5 mb-3 border-0.5 border-primary rounded-15 md:p-5 p-3">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6 bg-f6f6f6 border-0.5 border-primary rounded-15 p-3 flex justify-center items-center gap-2">
                <h1 className="font-bold">Full Name :</h1>
                <h1 className="font-medium">
                  {data?.data
                    ? `${data.data.first_name} ${data.data.last_name}`
                    : "-"}
                </h1>
              </div>

              <div className="col-span-6 bg-f6f6f6 border-0.5 border-primary rounded-15 p-3 flex justify-center items-center gap-2">
                <h1 className="font-bold">Email :</h1>
                <h1 className="font-medium">{data?.data?.email || "-"}</h1>
              </div>
            </div>
          </div>

          {/* Role + Player */}
          <div className="bg-white md:mb-5 mb-3 border-0.5 border-primary rounded-15 md:p-5 p-3">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="First Name"
                value={portalUser.first_name}
                onChange={(e) =>
                  dispatch(setPortalUserFirstName(e.target.value))
                }
              />
              <Input
                label="Last Name"
                value={portalUser.last_name}
                onChange={(e) =>
                  dispatch(setPortalUserLastName(e.target.value))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block md:mb-2 mb-1 md:text-base text-sm font-medium">
                  Role
                </label>

                <div className="relative ">
                  <select
                    className="appearance-none w-full p-2 md:text-base text-sm border-0.5 border-primary md:rounded-xl rounded-lg md:pr-10 bg-transparent"
                    value={
                      portalUser.role !== undefined && portalUser.role !== null
                        ? String(portalUser.role)
                        : ""
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "") {
                        dispatch(setPortalUserRole(Number(4))); // no role selected
                      } else {
                        dispatch(setPortalUserRole(Number(val))); // convert string to number
                      }
                    }}
                  >
                    {roleOptions.map((role) => (
                      <option key={role.id} value={String(role.id)}>
                        {role.name}
                      </option>
                    ))}
                  </select>

                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <img src={chevronDown} />
                  </div>
                </div>
              </div>
              {isPlayerRole && (
                <div className="">
                  <label className="block md:mb-2 mb-1 md:text-base text-sm font-medium">
                    Select Crionet Player
                  </label>

                  <AsyncSelect
                    cacheOptions
                    loadOptions={loadPlayerOptions}
                    defaultOptions={playerOptions}
                    isMulti
                    styles={customStyles}
                    placeholder="Type to search players"
                    onChange={handleSelectChange}
                    value={selectedPlayers}
                  />
                </div>
              )}
              {!isPremierPadelStaff && (
                <div className="">
                  <label className="block md:mb-2 mb-1 md:text-base text-sm font-medium">
                    My Team
                  </label>

                  <AsyncSelect
                    cacheOptions
                    loadOptions={loadTeamsOptions}
                    defaultOptions={teamOptions}
                    isMulti
                    styles={customStyles}
                    placeholder="Type to search teams"
                    onChange={handleTeamSelectChange}
                    value={selectedTeams}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

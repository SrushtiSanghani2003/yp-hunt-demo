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
import {
  selectAllUser,
  setAllUser,
  resetAllUser,
  setAllUserPlayers,
  setAllUserRole,
} from "../../redux-toolkit/allUserSlice";
import { normalizeAllUserResponse } from "./normalizers/normalizerAllUser";
import { useScroll } from "../../hooks/ScrollContext";

export default function EditUser() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isScrolled } = useScroll();
  const allUser = useSelector(selectAllUser);

  /* ---------------- API ---------------- */
  const { data } = useGetAppUser(id);
  const updateUserMutation = useUpdateAppUser();

  /* ---------------- PLAYER ASYNC ---------------- */
  const [playerMap, setPlayerMap] = useState<Record<number, string>>({});

  const getAllPlayers = async () => {
    return await api.get("/player/getPortalDropdown", {
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

  /** preload labels (edit / reopen safe) */
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
    const res = await api.get("/player/getPortalDropdown", {
      params: {
        page: 1,
        limit: 50,
        search: input || "",
      },
    });

    const options =
      res?.data.players?.map((p: any) => ({
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

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    if (data?.data) {
      const normalized = normalizeAllUserResponse(data.data);
      if (!normalized.role || normalized.role === 3) {
        normalized.role = 4;
      }
      dispatch(setAllUser(normalized));
    }
    return () => {
      dispatch(resetAllUser());
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
          role: allUser.role,
          player_ids: allUser.player_ids, // ✅ ONLY IDs
        },
      },
      {
        onSuccess: () => {
          dispatch(resetAllUser());
          goBackToList();
        },
      },
    );
  };

  /* ---------------- ROLE OPTIONS ---------------- */
  const roleOptions = [
    { id: 4, name: "Player" },
    { id: 5, name: "Manager" },
    { id: 6, name: "PlayerFamily" },
    { id: 7, name: "Coach" },
    { id: 8, name: "PremierPadelStaff" },
    { id: 9, name: "PlayerSupportStaff" },
  ];

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
            <label className="block md:mb-2 mb-1 md:text-base text-sm font-medium">
              Role
            </label>

            <div className="relative mb-5">
              <select
                className="appearance-none w-full p-2 md:text-base text-sm border-0.5 border-primary md:rounded-xl rounded-lg md:pr-10 bg-transparent"
                value={
                  allUser.role !== undefined && allUser.role !== null
                    ? String(allUser.role)
                    : ""
                }
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") {
                    dispatch(setAllUserRole(Number(4))); // no role selected
                  } else {
                    dispatch(setAllUserRole(Number(val))); // convert string to number
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

            <label className="block md:mb-2 mb-1 md:text-base text-sm font-medium">
              Player
            </label>

            <AsyncSelect
              cacheOptions
              loadOptions={loadPlayerOptions}
              defaultOptions
              styles={customStyles}
              placeholder="Type to search player"
              value={
                allUser.player_ids.length
                  ? {
                      value: allUser.player_ids[0],
                      label: playerMap[allUser.player_ids[0]],
                    }
                  : null
              }
              onChange={(selected: any) =>
                dispatch(
                  setAllUserPlayers(selected ? [Number(selected.value)] : []),
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

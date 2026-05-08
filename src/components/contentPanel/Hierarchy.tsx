import { useQuery } from "@tanstack/react-query";
import SidebarDialog from "../ui/sidebarDialog/SidebarDialog";
import api from "../../lib/api";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import "./../../index.css";
import { customStyles } from "../account-settings/CreateCategories";
import { useSelector } from "react-redux";
import { selectTags } from "../../redux-toolkit/tagSlice";
import { useDebounce } from "../../hooks/useDebounce";
import { useLocation } from "react-router-dom";
import AsyncSelect from "react-select/async";
// import { AsyncPaginate } from "react-select-async-paginate";

type HierarchyProps = {
  open: boolean;
  onClose: () => void;
  data: any;
  onSave?: (payload: {
    categoryIds: string[];
    playerIds: string[];
    tagIds: string[];
    tournamentIds: string[];
  }) => void;
};

// type Player = { id: number; name: string };
// type PlayerPage = {
//   results: { value: number; label: string }[]; // mapped results
//   page: number;
//   totalPages: number;
// };

const getKeyFromPathname = (pathname: string) => {
  if (!pathname) return;
  if (pathname.includes("videos")) {
    return "video";
  }
  if (pathname.includes("pages")) {
    return "page";
  }
  if (pathname.includes("news")) {
    return "news";
  }
};

const Hierarchy = ({ open, onClose, data, onSave }: HierarchyProps) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState<
    { value: number; label: string }[]
  >([]);
  const [selectedTournaments, setSelectedTournaments] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;
  const isNews = pathname.includes("news");
  const isVideo = pathname.includes("video");
  const categoryType = getKeyFromPathname(pathname);
  // const [searchPlayerInput, setSearchPlayerInput] = useState("");
  // const debouncedPlayerInput = useDebounce(searchPlayerInput, 300);

  const [selection, setSelection] = useState<{
    category_ids: string[];
    player_ids: string[];
    tag_ids: string[];
    tournament_ids: string[];
  }>({
    category_ids: [],
    player_ids: [],
    tag_ids: [],
    tournament_ids: [],
  });

  const [tagSearchInput, setTagSearchInput] = useState("");
  const { tags } = useSelector(selectTags);

  const debouncedInput = useDebounce(tagSearchInput, 300);

  // const getCategories = async () => {
  //   return await api.get("/articles/categories/news");
  // };

  //  TODO dynamic categories
  const getCategories = async () => {
    return await api.get(`/category/categories/${categoryType}`);
  };

  const { data: allCategories } = useQuery({
    queryKey: ["catogories"],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
    enabled: !!pathname,
  });

  const getAllTags = async () => {
    const params: Record<string, string> = {};

    // if (debouncedInput.trim()) {
    //   params.search = debouncedInput;
    // }

    return await api.get("/tag/tags", { params });
  };

  const { data: allTags } = useQuery({
    queryKey: ["tags", debouncedInput],
    queryFn: getAllTags,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    // enabled: !!debouncedInput.trim(),
  });

  const selectAllCategoryOption = { value: "*", label: "Select All" };

  //  TODO dynamic categories
  const rawCategoryOptions =
    (allCategories as any)?.response?.data?.map((category: any) => ({
      value: category.id,
      label: category.name,
    })) || [];
  // const rawCategoryOptions =
  //   allCategories?.data?.map((category: any) => ({
  //     value: category.id,
  //     label: category.name,
  //   })) || [];

  const allCategoryIds = rawCategoryOptions?.map((opt: any) => opt.value);
  const isAllCategoriesSelected = allCategoryIds.every((id: string) =>
    selection.category_ids.includes(id)
  );

  const categoryOptions = isAllCategoriesSelected
    ? rawCategoryOptions
    : [selectAllCategoryOption, ...rawCategoryOptions];

  // const categoryOptions =
  //   allCategories?.data?.map((category: any) => ({
  //     value: category.id,
  //     label: category.name,
  //   })) || [];

  const tagsOptions =
    (allTags as any)?.response?.data?.tags?.map((tag: any) => ({
      value: tag.id,
      label: tag.name,
    })) || [];

  // const getPlayers = async ({
  //   pageParam = 1,
  //   queryKey,
  // }: any): Promise<PlayerPage> => {
  //   const [,] = queryKey;

  //   const res = await api.get("/player/getdropdown", {
  //     params: {
  //       page: pageParam,
  //       limit: 50,
  //       // search: searchTerm || "",
  //     },
  //   });

  //   return {
  //     results: res.data.players?.map((p: any) => ({
  //       value: p.id,
  //       label: p.name,
  //     })),
  //     page: res.data.page,
  //     totalPages: res.data.totalPages,
  //   };
  // };

  // const {
  //   data: playerData,
  //   fetchNextPage,
  //   refetch,
  //   hasNextPage,
  // } = useInfiniteQuery({
  //   queryKey: ["players", debouncedPlayerInput],
  //   queryFn: getPlayers,
  //   initialPageParam: 1,
  //   enabled: categoryType === "news",
  //   getNextPageParam: (lastPage) =>
  //     lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  // });

  // const playerOptions = useMemo(() => {
  //   return playerData?.pages.flatMap((p) => p.results) || [];
  // }, [playerData]);

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
    enabled: isNews || isVideo,
  });

  const playerOptions = useMemo(
    () =>
      allPlayerData?.data?.players?.map((item: any) => ({
        value: item.id,
        label: item.name,
      })) || [],
    [allPlayerData]
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

  const getPlayersByIds = async () => {
    const params: Record<string, any> = {
      type: "player",
      id: data.player_ids,
    };
    return await api.get("/common/get-dropdown-value", { params });
  };

  const { data: playersByIds } = useQuery({
    queryKey: ["playersByIds"],
    queryFn: getPlayersByIds,
    refetchOnWindowFocus: false,
    enabled: data.player_ids.length > 0,
  });

  useEffect(() => {
    if (playersByIds && data?.player_ids?.length > 0) {
      const selected = playersByIds?.data?.map((player: any) => ({
        value: player.id,
        label: player.name,
      }));
      setSelectedPlayers(selected);
      setSelection((prev) => ({
        ...prev,
        player_ids: selected?.map((p: any) => p.value),
      }));
    }
  }, [playersByIds]);

  const getAllTournaments = async () => {
    return await api.get("/tournament/getDropdown");
  };

  const { data: allTournaments } = useQuery({
    queryKey: ["tournaments"],
    queryFn: getAllTournaments,
    refetchOnWindowFocus: false,
    enabled: categoryType === "news" || categoryType === "video",
  });

  const tournamentOptions = useMemo(
    () =>
      allTournaments?.data?.map((item: any) => ({
        value: item.id,
        label: item.name,
      })) || [],
    [allTournaments]
  );

  const loadOptionsTournaments = (inputValue: string, callback: any) => {
    if (!inputValue) {
      return callback([]);
    }

    const filtered = tournamentOptions?.filter((player: any) =>
      player.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    callback(filtered.slice(0, 50));
  };
  const getTournamentByIds = async () => {
    const params: Record<string, any> = {
      type: "tournament",
      id: data.tournament_ids,
    };
    return await api.get("/common/get-dropdown-value", { params });
  };
  const { data: tournamentByIds } = useQuery({
    queryKey: ["tournamentByIds"],
    queryFn: getTournamentByIds,
    refetchOnWindowFocus: false,
    enabled: data?.tournament_ids?.length > 0,
  });
  useEffect(() => {
    if (tournamentByIds && data?.tournament_ids?.length > 0) {
      const selected = tournamentByIds?.data?.map((tournament: any) => ({
        value: tournament.id,
        label: tournament.name,
      }));
      setSelectedTournaments(selected);
      setSelection((prev) => ({
        ...prev,
        tournament_ids: selected?.map((p: any) => p.value),
      }));
    }
  }, [tournamentByIds]);

  // // const handleSelectChange = (
  //   selected: any,
  //   type: "category_ids" | "player_ids" | "tag_ids" | "tournament_ids"
  // ) => {
  //   const isSelectAll = selected?.some((option: any) => option.value === "*");
  //   const convertId = (value: any) => {
  //     return /^[0-9]+$/.test(value) ? Number(value) : value;
  //   };

  //   const values =
  //     isSelectAll && type === "category_ids"
  //       ? rawCategoryOptions?.map((opt: any) => convertId(opt.value))
  //       : selected
  //       ? selected?.map((option: any) => convertId(option.value))
  //       : [];

  //   setSelection((prev) => ({
  //     ...prev,
  //     [type]: values,
  //   }));
  //   if (type === "category_ids") {
  //     const selectedItems = isSelectAll ? rawCategoryOptions : selected || [];
  //     setSelectedCategories(selectedItems);
  //   }
  //   if (type === "tag_ids") {
  //     setSelectedTags(selected);
  //   }
  //   if (type === "tournament_ids") {
  //     setSelectedTournaments(selected);
  //   }
  //   if (type === "player_ids") {
  //     setSelectedPlayers(selected);
  //   }
  // };

  const handleSelectChange = (
    selected: any,
    type: "category_ids" | "player_ids" | "tag_ids" | "tournament_ids"
  ) => {
    const convertId = (value: any) => {
      return /^[0-9]+$/.test(value) ? Number(value) : value;
    };

    // ---------- CATEGORY: SELECT ALL ----------
    const isSelectAll =
      type === "category_ids" &&
      Array.isArray(selected) &&
      selected.some((option: any) => option.value === "*");

    let values: any[] = [];

    if (type === "category_ids" && isSelectAll) {
      // Use all category options when * is selected
      values = rawCategoryOptions?.map((opt: any) => convertId(opt.value));
    } else {
      // ---------- SINGLE or MULTI ----------
      if (Array.isArray(selected)) {
        values = selected?.map((option: any) => convertId(option.value));
      } else if (selected) {
        values = [convertId(selected.value)]; // wrap single value in array
      }
    }

    // ---------- Store IDs ----------
    setSelection((prev) => ({
      ...prev,
      [type]: values,
    }));

    // ---------- UI selections ----------
    if (type === "category_ids") {
      const selectedItems = isSelectAll ? rawCategoryOptions : selected || [];
      setSelectedCategories(selectedItems);
    }

    if (type === "tag_ids") setSelectedTags(selected);
    if (type === "tournament_ids") setSelectedTournaments(selected);
    if (type === "player_ids") setSelectedPlayers(selected);
  };

  const handleSubmit = () => {
    const categoryIdsFromSelection = selection.category_ids || [];
    const categoryIdsFromState = selectedCategories?.map(
      (cat: any) => cat.value
    );
    const categoryIds = [
      ...new Set([...categoryIdsFromSelection, ...categoryIdsFromState]),
    ];
    const playerIds = selection.player_ids || [];
    const tagIds = selection.tag_ids || [];
    const tournamentIds = selection.tournament_ids || [];
    onSave?.({ categoryIds, playerIds, tagIds, tournamentIds });
    onClose();
  };

  useEffect(() => {
    if (data?.category_ids?.length && (allCategories as any)?.response?.data) {
      const selected = (allCategories as any)?.response?.data
        .filter((cat: any) => data.category_ids.includes(cat.id))
        ?.map((cat: any) => ({
          value: cat.id,
          label: cat.name,
        }));

      setSelectedCategories(selected);
      setSelection((prev) => ({
        ...prev,
        category_ids: selected?.map((c: any) => c.value),
      }));
    }
    if (data?.tournament_ids?.length && allTournaments?.data) {
      const selected = allTournaments.data
        .filter((tour: any) => data.tournament_ids.includes(Number(tour.id)))
        ?.map((tour: any) => ({
          value: Number(tour.id),
          label: tour.name,
        }));
      if (isNews) {
        setSelectedTournaments(selected);
      } else {
        setSelectedTournaments(selected[0] || null);
      }
      setSelection((prev) => ({
        ...prev,
        tournament_ids: isNews
          ? selected?.map((t: any) => t.value) // multi
          : selected[0]
          ? [selected[0].value] // single
          : [],
      }));
    }
  }, [
    data?.category_ids,
    (allCategories as any)?.response?.data,
    data?.tournament_ids,
    allTournaments?.data,
  ]);

  useEffect(() => {
    const selected = (allTags as any)?.response?.data?.tags
      .filter((tag: any) => data.tag_ids.includes(tag.id))
      ?.map((tag: any) => ({
        value: tag.id,
        label: tag.name,
      }));
    setSelectedTags(selected);
    setSelection((prev) => ({
      ...prev,
      tag_ids: selected?.map((t: any) => t.value),
    }));
  }, [tags, allTags]);

  return (
    <>
      <SidebarDialog
        title="Hierarchy"
        open={open}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <div>
          <div className="md:mb-5 mb-2">
            <div>
              <label
                htmlFor="category"
                className="block md:mb-2 mb-1 md:text-base text-sm font-medium"
              >
                Category
              </label>
              <Select
                options={categoryOptions}
                isMulti
                styles={customStyles}
                placeholder="Select Categories"
                onChange={(selected) =>
                  handleSelectChange(selected, "category_ids")
                }
                value={selectedCategories}
              />
            </div>
          </div>

          {/* <Input label="Tags" placeholder="Type to add a tag..." /> */}
          <div className="mb-5 relative">
            <label
              htmlFor="tags"
              className="block md:mb-2 mb-1 md:text-base text-sm font-medium"
            >
              Tags
            </label>
            <Select
              options={tagsOptions}
              isMulti
              styles={customStyles}
              placeholder="Select Tags"
              onChange={(selected) => {
                handleSelectChange(selected, "tag_ids");
              }}
              value={selectedTags}
              onInputChange={(inputValue) => {
                setTagSearchInput(inputValue);
              }}
              // openMenuOnClick={false}
              // openMenuOnFocus={false}
              // menuIsOpen={tagSearchInput.length > 0}
            />
          </div>
          {(isNews || isVideo) && (
            <>
              <div className="md:mb-5 mb-2">
                <label
                  htmlFor="player"
                  className="block md:mb-2 mb-1 md:text-base text-sm font-medium"
                >
                  Player
                </label>
                {/* <AsyncPaginate
                  value={selectedPlayers}
                  isMulti
                  placeholder="Type to search players"
                  styles={customStyles}
                  additional={{ page: 1 }}
                  onChange={(selected) =>
                    handleSelectChange(selected, "player_ids")
                  }
                  loadOptions={async (search, additional: any) => {
                    const normalized = search.trim();

                    if (normalized !== debouncedPlayerInput) {
                      setSearchPlayerInput(normalized);
                      const response: any = await refetch();
                      const results =
                        response?.data?.pages?.flatMap((p: any) => p.results) ??
                        [];

                      return {
                        options: results,
                        hasMore:
                          response?.data?.pages?.[0]?.page <
                          response?.data?.pages?.[0]?.totalPages,
                        additional: { page: 1 },
                      };
                    }

                    if (hasNextPage) await fetchNextPage();

                    return {
                      options: playerOptions,
                      hasMore: hasNextPage,
                      additional: { page: additional.page + 1 },
                    };
                  }}
                /> */}

                <AsyncSelect
                  cacheOptions
                  loadOptions={loadPlayerOptions}
                  defaultOptions={playerOptions}
                  isMulti
                  styles={customStyles}
                  placeholder="Type to search players"
                  onChange={(selected) =>
                    handleSelectChange(selected, "player_ids")
                  }
                  value={selectedPlayers}
                />
              </div>
              <div className="md:mb-5 mb-2">
                <label
                  htmlFor="player"
                  className="block md:mb-2 mb-1 md:text-base text-sm font-medium"
                >
                  Tournaments
                </label>
                <AsyncSelect
                  cacheOptions
                  loadOptions={loadOptionsTournaments}
                  styles={customStyles}
                  {...(isNews ? { isMulti: true } : {})}
                  placeholder="Type to search tournaments"
                  onChange={(selected) =>
                    handleSelectChange(selected, "tournament_ids")
                  }
                  // defaultOptions={false}
                  defaultOptions={tournamentOptions.slice(0, 100)}
                  value={selectedTournaments}
                />
              </div>
            </>
          )}
        </div>
      </SidebarDialog>
    </>
  );
};

export default Hierarchy;

import { useCallback, useEffect, useMemo, useState } from "react";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
import {
  chevronDown,
  closeIcon,
  correctIcon,
  mediaIcon,
  plusIcon,
} from "../../icons";
import Input from "../ui/input/Input";
import Button from "../ui/button";
import { v4 as uuidv4 } from "uuid";
import api from "../../lib/api";
import { cn } from "../../utils/cn";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import { concatImgURL, toUTCISOString } from "../../config/function";
import ContentLibrary from "../contentPanel/ContentLibrary";

/* ---------- Types ---------- */
interface Tournament {
  id: number;
  name: string;
  start_date_utc?: string;
  end_date_utc?: string;
  image?: string;
  ticket_url?: string;
}

interface CTAButton {
  id: string;
  button_label: string;
  button_link: string;
  isnewtab: boolean;
}

type HeroItem = {
  id: string;
  type: string;
  status_label: string;
  is_manual: boolean;
  tournament_id: string;
  tournament_name: string;
  start_date_utc: string | null;
  end_date_utc: string | null;
  image: string;
  ticket_url: string;
  btns: CTAButton[];
};

/* ---------- Helpers ---------- */
const formatDateTimeForInput = (dateString?: string): string => {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
};

const makeDefaultCTA = (): CTAButton => ({
  id: uuidv4(),
  button_label: "",
  button_link: "",
  isnewtab: false,
});

const makeDefaultHeroItem = (): HeroItem => ({
  id: uuidv4(),
  type: "live",
  status_label: "LIVE",
  is_manual: false,
  tournament_id: "",
  tournament_name: "",
  start_date_utc: "",
  end_date_utc: "",
  image: "",
  ticket_url: "",
  btns: [makeDefaultCTA()],
});

type LocalTextMap = Record<
  string,
  { name: string; start: string; end: string }
>;
type CtaDraftMap = Record<
  string,
  Record<string, { label: string; link: string }>
>;
// itemId -> btnId -> {label, link}
const TYPE_OPTIONS = [
  { value: "live", label: "Live", status: "Live" },
  { value: "upcoming", label: "Upcoming", status: "Upcoming" },
  { value: "completed", label: "Completed", status: "Completed" },
];
const TournamentHeroBlock = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  // const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loadingTournaments, setLoadingTournaments] = useState(true);
  const [tournamentsMap, setTournamentsMap] = useState<
    Record<string, Tournament[]>
  >({});
  // ContentLibrary modal
  const [show, setShow] = useState(false);
  const [activeItemIdForImage, setActiveItemIdForImage] = useState<
    string | null
  >(null);

  const content = useMemo(
    () => currentBlock.content || {},
    [currentBlock.content],
  );
  const normalizeDate = (value?: string | null) => {
    if (!value) return "";
    try {
      return new Date(value).toISOString();
    } catch {
      return "";
    }
  };

  const normalizeItems = (items: HeroItem[]) => {
    return items.map((it) => ({
      ...it,
      start_date_utc: normalizeDate(it.start_date_utc),
      end_date_utc: normalizeDate(it.end_date_utc),
    }));
  };
  /* ---------- Memoized block updater ---------- */
  const updateBlockContent = useCallback(
    (updates: any) => {
      onChangeBlock?.({
        ...currentBlock,
        content: { ...(currentBlock.content || {}), ...(updates || {}) },
      });
    },
    [currentBlock, onChangeBlock],
  );

  /* ---------- Ensure items array exists ---------- */
  const items: HeroItem[] = useMemo(() => {
    const raw = (content as any)?.items;
    if (Array.isArray(raw) && raw.length) return raw as HeroItem[];

    // Backward compat: if old single-structure exists, wrap it
    if ((content as any)?.btns) {
      const old = content as any;
      const wrapped: HeroItem = {
        id: uuidv4(),
        type: old.type || "live",
        is_manual: Boolean(old.is_manual),
        status_label: "LIVE NOW",
        tournament_id: old.tournament_id || "",
        tournament_name: old.tournament_name || "",
        start_date_utc: old.start_date_utc || "",
        end_date_utc: old.end_date_utc || "",
        image: old.image || "",
        ticket_url: old.ticket_url || "",
        btns:
          Array.isArray(old.btns) && old.btns.length
            ? old.btns
            : [makeDefaultCTA()],
      };
      return [wrapped];
    }

    return [makeDefaultHeroItem()];
  }, [content]);

  useEffect(() => {
    // persist ensured items once
    if (!(content as any)?.items) {
      updateBlockContent({ items });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- Fetch tournaments ---------- */
  const fetchTournaments = useCallback(async (type: string, itemId: string) => {
    setLoadingTournaments(true);
    try {
      const res = await api.get("tournament/getDropdownForBlock", {
        params: { status: type || "" },
      });

      setTournamentsMap((prev) => ({
        ...prev,
        [itemId]: res.data || [],
      }));
    } catch (error) {
      console.error("Failed to fetch tournaments:", error);

      setTournamentsMap((prev) => ({
        ...prev,
        [itemId]: [],
      }));
    } finally {
      setLoadingTournaments(false);
    }
  }, []);

  useEffect(() => {
    items.forEach((item) => {
      // only fetch if not already fetched
      if (!tournamentsMap[item.id]) {
        fetchTournaments(item.type, item.id);
      }
    });
  }, [items, tournamentsMap, fetchTournaments]);
  /* ---------- Update one item ---------- */
  const updateItem = useCallback(
    (itemId: string, patch: Partial<HeroItem>) => {
      const nextItems = items.map((it) =>
        it.id === itemId ? { ...it, ...patch } : it,
      );
      updateBlockContent({
        items: normalizeItems(nextItems),
      });
    },
    [items, updateBlockContent],
  );

  const addHeroItem = useCallback(() => {
    updateBlockContent({
      items: normalizeItems([...items, makeDefaultHeroItem()]),
    });
  }, [items, updateBlockContent]);

  const removeHeroItem = useCallback(
    (itemId: string) => {
      const next = items.filter((x) => x.id !== itemId);
      updateBlockContent({
        items: normalizeItems(next.length ? next : [makeDefaultHeroItem()]),
      });
    },
    [items, updateBlockContent],
  );

  const [localText, setLocalText] = useState<LocalTextMap>({});
  const [ctaDraft, setCtaDraft] = useState<CtaDraftMap>({});

  useEffect(() => {
    const nextText: LocalTextMap = {};
    items.forEach((it) => {
      nextText[it.id] = {
        name: it.tournament_name || "",
        start: formatDateTimeForInput(it.start_date_utc || ""),
        end: formatDateTimeForInput(it.end_date_utc || ""),
      };
    });
    setLocalText(nextText);

    const nextCta: CtaDraftMap = {};
    items.forEach((it) => {
      nextCta[it.id] = {};
      (it.btns || []).forEach((b) => {
        nextCta[it.id][b.id] = {
          label: b.button_label || "",
          link: b.button_link || "",
        };
      });
    });
    setCtaDraft(nextCta);
  }, [items]);

  /* ---------- Per-item CTA handlers (persist only on blur/checkbox) ---------- */
  const persistCTAField = useCallback(
    (
      itemId: string,
      btnIndex: number,
      key: keyof CTAButton,
      value: string | boolean,
    ) => {
      const item = items.find((x) => x.id === itemId);
      if (!item) return;

      const btns = [...(item.btns || [])];
      btns[btnIndex] = { ...btns[btnIndex], [key]: value } as CTAButton;
      updateItem(itemId, { btns });
    },
    [items, updateItem],
  );

  const handleAddCTA = useCallback(
    (itemId: string) => {
      const item = items.find((x) => x.id === itemId);
      if (!item) return;
      if ((item.btns || []).length >= 2) return;
      updateItem(itemId, { btns: [...(item.btns || []), makeDefaultCTA()] });
    },
    [items, updateItem],
  );

  const handleRemoveCTA = useCallback(
    (itemId: string, index: number) => {
      const item = items.find((x) => x.id === itemId);
      if (!item) return;
      const btns = (item.btns || []).filter((_, i) => i !== index);
      updateItem(itemId, { btns: btns.length ? btns : [makeDefaultCTA()] });
    },
    [items, updateItem],
  );

  /* ---------- Render one hero item ---------- */
  const renderHeroItem = (item: HeroItem, idx: number) => {
    const manualOn = Boolean(item.is_manual);
    const local = localText[item.id] || { name: "", start: "", end: "" };

    return (
      <div
        key={item.id}
        className="mt-5 border border-primary rounded-2xl bg-white shadow-sm p-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold text-gray-900">
            Tournament Hero {idx + 1}
          </div>

          {items.length > 1 && (
            <Button
              text="Remove"
              icon={closeIcon}
              backgroundColor="transparent"
              className="py-0"
              onClick={() => removeHeroItem(item.id)}
            />
          )}
        </div>

        {/* MANUAL TOGGLE */}
        <div className="mb-4 flex items-center justify-between p-4 border border-primary rounded-2xl bg-white shadow-sm">
          <div>
            <p className="text-sm font-medium text-gray-900">Manual Entry</p>
            <p className="text-xs text-gray-500">
              ON = fill details manually, OFF = auto-fill from tournament
            </p>
          </div>
          <ToggleSwitch
            checked={manualOn}
            onChange={(checked) => {
              // clear local caches for this item
              setLocalText((p) => ({
                ...p,
                [item.id]: { name: "", start: "", end: "" },
              }));

              updateItem(item.id, {
                is_manual: checked,
                tournament_id: "",
                tournament_name: "",
                start_date_utc: "",
                end_date_utc: "",
                image: "",
                ticket_url: "",
              });
            }}
          />
        </div>

        {/* TYPE SELECT */}
        <div>
          <label className="block text-sm font-medium mb-2 md:text-base/4">
            Tournament Type
          </label>
          <div className="relative mb-4">
            <select
              className="w-full p-2 border border-primary rounded-2xl bg-white shadow-sm transition-all duration-200 appearance-none"
              value={item.type}
              onChange={(e) => {
                const selected = TYPE_OPTIONS.find(
                  (opt) => opt.value === e.target.value,
                );

                updateItem(item.id, {
                  type: selected?.value || "",
                  status_label: selected?.status || "",
                });

                fetchTournaments(selected?.value || "", item.id);
              }}
            >
              {TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <img src={chevronDown} alt="Chevron Down" className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* TOURNAMENT */}
        <div className="mb-4">
          {manualOn ? (
            <Input
              label="Tournament"
              value={local.name}
              onChange={(e) =>
                setLocalText((p) => ({
                  ...p,
                  [item.id]: { ...local, name: e.target.value },
                }))
              }
              onBlur={() =>
                updateItem(item.id, { tournament_name: local.name })
              }
              placeholder="Enter tournament name"
            />
          ) : (
            <>
              <label className="block text-sm font-medium mb-2 md:text-base/4">
                Tournament
              </label>
              <select
                className={cn(
                  "w-full p-2 border border-primary rounded-2xl bg-white shadow-sm transition-all duration-200 appearance-none",
                  loadingTournaments && "opacity-50 cursor-not-allowed",
                )}
                value={item.tournament_id}
                onChange={(e) => {
                  const id = e.target.value;

                  if (!id) {
                    updateItem(item.id, {
                      tournament_id: "",
                      tournament_name: "",
                      start_date_utc: "",
                      end_date_utc: "",
                      image: "",
                      ticket_url: "",
                    });
                    return;
                  }

                  const currentTournaments = tournamentsMap[item.id] || [];
                  const t = currentTournaments.find((x) => x.id === Number(id));
                  if (!t) {
                    updateItem(item.id, { tournament_id: id });
                    return;
                  }

                  updateItem(item.id, {
                    tournament_id: id,
                    tournament_name: t.name || "",
                    start_date_utc: t.start_date_utc
                      ? new Date(t.start_date_utc).toISOString()
                      : "",
                    end_date_utc: t.end_date_utc
                      ? new Date(t.end_date_utc).toISOString()
                      : "",
                    image: t.image || "",
                    ticket_url: t.ticket_url || "",
                  });
                }}
                disabled={loadingTournaments}
              >
                <option value="">Select Tournament</option>
                {loadingTournaments ? (
                  <option disabled>Loading tournaments...</option>
                ) : (
                  (tournamentsMap[item.id] || []).map((t) => (
                    <option key={t.id} value={String(t.id)}>
                      {t.name}
                    </option>
                  ))
                )}
              </select>
            </>
          )}
        </div>

        {/* CONTENT FIELDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            type="datetime-local"
            label="Start Date"
            inputCss="!pr-2"
            value={
              manualOn
                ? local.start
                : item.start_date_utc
                  ? new Date(item.start_date_utc).toISOString().slice(0, 16)
                  : ""
            }
            max={
              manualOn
                ? local.end || undefined
                : item.end_date_utc
                  ? new Date(item.end_date_utc).toISOString().slice(0, 16)
                  : undefined
            }
            onChange={(e) => {
              if (!manualOn) return;
              setLocalText((p) => ({
                ...p,
                [item.id]: { ...local, start: e.target.value },
              }));
            }}
            onBlur={() => {
              if (!manualOn) return;
              updateItem(item.id, {
                start_date_utc: toUTCISOString(local.start),
              });
            }}
            disabled={!manualOn}
          />

          <Input
            type="datetime-local"
            label="End Date"
            inputCss="!pr-2"
            value={
              manualOn
                ? local.end
                : item.end_date_utc
                  ? new Date(item.end_date_utc).toISOString().slice(0, 16)
                  : ""
            }
            min={
              manualOn
                ? local.start || undefined
                : item.start_date_utc
                  ? new Date(item.start_date_utc).toISOString().slice(0, 16)
                  : undefined
            }
            onChange={(e) => {
              if (!manualOn) return;
              setLocalText((p) => ({
                ...p,
                [item.id]: { ...local, end: e.target.value },
              }));
            }}
            onBlur={() => {
              if (!manualOn) return;
              updateItem(item.id, {
                end_date_utc: toUTCISOString(local.end),
              });
            }}
            disabled={!manualOn}
          />

          {/* IMAGE CARD */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700 md:text-base/4">
              Tournament Image
            </label>

            <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
              <div className="md:w-sp170 w-20 h-full">
                {item.image ? (
                  <img
                    src={concatImgURL(item.image)}
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
                  label="Tournament Image URL"
                  placeholder="https://www.example.com"
                  className="m-0"
                  value={item.image ? concatImgURL(item.image) : ""}
                  readOnly
                />

                <div>
                  {item.image ? (
                    <Button
                      text="Remove Image"
                      icon={closeIcon}
                      backgroundColor="transparent"
                      className="py-0"
                      imageclassName="md:w-5 w-3 md:h-5 h-3"
                      onClick={() => updateItem(item.id, { image: "" })}
                    />
                  ) : (
                    <Button
                      icon={plusIcon}
                      text="Add Image"
                      backgroundColor="transparent"
                      className="py-0"
                      imageclassName="md:w-5 w-3 md:h-5 h-3"
                      onClick={() => {
                        setActiveItemIdForImage(item.id);
                        setShow(true);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="pt-6 border-t border-primary">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Call-to-Action Buttons
            </h3>
            <div className="text-sm text-gray-500">Up to 2 buttons</div>
          </div>

          <div className="px-4 pb-3 border border-primary rounded-2xl bg-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
            {(item.btns as CTAButton[]).map((btn, bIndex) => {
              const draft = ctaDraft[item.id]?.[btn.id] || {
                label: "",
                link: "",
              };

              return (
                <div
                  key={btn.id}
                  className="group relative my-4 p-4 border border-primary rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {(item.btns as CTAButton[]).length > 1 && (
                    <Button
                      icon={closeIcon}
                      backgroundColor="transparent"
                      className="absolute -top-3 -right-3 p-1.5 w-8 h-8 bg-white border border-primary rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50 hover:border-red-200"
                      onClick={() => handleRemoveCTA(item.id, bIndex)}
                      aria-label="Remove button"
                    />
                  )}

                  <div>
                    {/* ✅ Focus-safe Label */}
                    <Input
                      label={`Button Label ${bIndex + 1} *`}
                      className="!mb-4"
                      value={draft.label}
                      onChange={(e) =>
                        setCtaDraft((prev) => ({
                          ...prev,
                          [item.id]: {
                            ...(prev[item.id] || {}),
                            [btn.id]: {
                              ...(prev[item.id]?.[btn.id] || {
                                label: "",
                                link: "",
                              }),
                              label: e.target.value,
                            },
                          },
                        }))
                      }
                      onBlur={() =>
                        persistCTAField(
                          item.id,
                          bIndex,
                          "button_label",
                          draft.label,
                        )
                      }
                      required
                    />

                    {/* ✅ Focus-safe Link */}
                    <Input
                      label={`Button Link ${bIndex + 1} *`}
                      note="Include http:// or https://"
                      className="!mb-4"
                      value={draft.link}
                      onChange={(e) =>
                        setCtaDraft((prev) => ({
                          ...prev,
                          [item.id]: {
                            ...(prev[item.id] || {}),
                            [btn.id]: {
                              ...(prev[item.id]?.[btn.id] || {
                                label: "",
                                link: "",
                              }),
                              link: e.target.value,
                            },
                          },
                        }))
                      }
                      onBlur={() =>
                        persistCTAField(
                          item.id,
                          bIndex,
                          "button_link",
                          draft.link,
                        )
                      }
                      required
                    />

                    <div className="flex items-center gap-3 bg-gray-50/50 rounded-xl">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id={`newtab-${item.id}-${btn.id}`}
                          className="peer hidden"
                          checked={btn.isnewtab}
                          onChange={(e) =>
                            persistCTAField(
                              item.id,
                              bIndex,
                              "isnewtab",
                              e.target.checked,
                            )
                          }
                        />
                        <label
                          htmlFor={`newtab-${item.id}-${btn.id}`}
                          className="w-5 h-5 m-0 flex items-center justify-center border border-gray-400 rounded cursor-pointer
                          peer-checked:bg-black peer-checked:border-black"
                        >
                          <img
                            src={correctIcon}
                            alt=""
                            className="w-3 h-3  peer-checked:opacity-100 transition-opacity"
                          />
                        </label>
                      </div>
                      <label
                        htmlFor={`newtab-${item.id}-${btn.id}`}
                        className="md:text-base/4 text-sm"
                      >
                        Open in new tab
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}

            {(item.btns as CTAButton[]).length < 2 && (
              <Button
                text="Add More Button"
                icon={plusIcon}
                backgroundColor="transparent"
                className="addSideBarBtn relative p-0 !mt-8"
                onClick={() => handleAddCTA(item.id)}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-5">
      {/* Render all hero items */}
      {items.map((item, idx) => renderHeroItem(item, idx))}

      {/* Add new hero item */}
      <div className="mt-5">
        <Button
          text="Add Tournament Hero"
          icon={plusIcon}
          backgroundColor="transparent"
          className="addSideBarBtn relative p-0 !mt-8"
          onClick={addHeroItem}
        />
      </div>

      {/* BLOCK TYPE CHANGER */}
      <div className="border-t border-gray-200 mt-4">
        <ChangeBlockType
          currentBlock={currentBlock}
          onChangeType={onChangeType}
          types={types}
        />
      </div>

      {/* Content Library (image selector) */}
      {show && (
        <ContentLibrary
          open={show}
          onClose={() => {
            setShow(false);
            setActiveItemIdForImage(null);
          }}
          uploadType="tournament"
          mediaFilter="image"
          onSelect={(value: string) => {
            if (activeItemIdForImage) {
              updateItem(activeItemIdForImage, { image: value });
            }
            setShow(false);
            setActiveItemIdForImage(null);
          }}
        />
      )}
    </div>
  );
};

export default TournamentHeroBlock;

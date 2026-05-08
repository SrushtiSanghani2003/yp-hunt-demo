import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import ContentLibrary from "../contentPanel/ContentLibrary";
import "../../index.css";
import {
  resetEvent,
  selectEvent,
  // setEventAuthentication,
  // setEventAuthorInfo,
  setEventButtonLabel,
  setEventButtonUrl,
  // setEventGeoBlockContent,
  setEventHierarchyContent,
  setEventImage,
  setEventLocation,
  setEventLogo,
  setEventPublishContent,
  setEventSponsorContent,
  setEventTitle,
  setEventTypeId,
  setFullEvent,
  setStartAt,
  updateEventMetadataField,
} from "../../redux-toolkit/eventsSlice";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../metaData";
import ContentPanel from "../contentPanel/ContentPanel";
import api from "../../lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { showToast } from "../../utils/toastUtils";
import { paths } from "../../config/paths";
import { resetTags, setTags } from "../../redux-toolkit/tagSlice";
import { normalizeEventResponse } from "./normalizer/normalizeEvent";
import dayjs from "dayjs";
import type { AxiosError } from "axios";
import { concatImgURL } from "../../config/function";
// import {  useSelector } from "react-redux";
// import {
//   selectEvent,
// } from "../../redux-toolkit/eventsSlice";
// Placeholder icons (replace with actual imports or assets)

export default function EventCreate() {
  const event = useSelector(selectEvent);
  const navigate = useNavigate();
  const [activeMediaUrl, setActiveMediaUrl] = useState<null | string>(null);
  const { id } = useParams();
  const [choiceOpen, setChoiceOpen] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [eventTypes, setEventTypes] = useState([]);
  const location = useLocation();
  const fromPage = location.state?.fromPage || 1; // fallback if undefined
  const fromSearch = location.state?.fromSearch || "";

  const handleToggleChoiceOpen = () => {
    setChoiceOpen(!choiceOpen);
  };

  const handleChoiceSelect = (eventType: any) => {
    dispatch(setEventTypeId(eventType?.id));
    setSelectedChoice(eventType?.name);
    setChoiceOpen(false);
  };

  // const [publishMode, setPublishMode] = useState<
  //   "immediate" | "specifyDate" | string
  // >("");
  const [isEnabled, setIsEnabled] = useState(false);
  const eventTypeRef = useRef<HTMLDivElement>(null);
  const isEditMode = Boolean(id);
  const dispatch = useDispatch();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();
  const languageCode = searchParams.get("lang");
  const getEventTypes = async () => {
    const res = await api.get("/event_type");
    return res.data;
  };

  const fetchEventById = async (id: string, languageCode?: string) => {
    return await api.get(`/event/${id}`, {
      params: languageCode ? { language_code: languageCode } : {},
    });
  };

  const { data: EventDataById } = useQuery({
    queryKey: ["event", id, languageCode],
    queryFn: () => fetchEventById(id as string, languageCode || undefined),
    enabled: isEditMode,
  });

  const { data: allEventTypesData } = useQuery({
    queryKey: ["eventTypes"],
    queryFn: getEventTypes,
    refetchOnWindowFocus: false,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "seo_title" | "seo_tag" | "seo_description"
  ) => {
    dispatch(updateEventMetadataField({ field, value: e.target.value }));
  };
  const uploadTypeMap: Record<string, string> = {
    eventImgUrl: "block",
    sponsor_img: "sponsor",
    thumbnailUrl: "thumbnail",
  };


  useEffect(() => {
    if (allEventTypesData) {
      setEventTypes(allEventTypesData?.eventTypes);
    }
  }, [allEventTypesData]);

  const createEventMutation = useMutation({
    mutationFn: async () => await api.post("/event", event),
    onSuccess: () => {
      showToast("Event Created", "success");
      navigate(paths.events.event.path);
    },
    onError: (error: AxiosError<any>) => {
const message =
        error.response?.data?.message || "Failed to create event.";
      showToast(message, "error");      
    },
  });


 

  const upateEventMutation = useMutation({
    mutationFn: async (id: string) => await api.put(`/event/${id}`, event),
    onSuccess: () => {
      showToast("Event Updated", "success");
      dispatch(resetEvent());
      dispatch(resetTags());
      navigate(paths.events.event.path,{
        state: {
          restorePage: fromPage,
          restoreSearch: fromSearch,
        }, // send it back silently
        replace: true, // optional: prevents back button double route
        
      });
    },
   onError: (error: AxiosError<any>) => {
      console.error("event update failed", error);
      const message =
        error.response?.data?.message ||
        "Failed to update event.";

      showToast(message, "error");
    },
  });

  const handleEventSubmit = (id: string) => {
    if (isEditMode) {
      upateEventMutation.mutate(id);
    } else {
      createEventMutation.mutate();
    }
  };

  useEffect(() => {
    if (isEditMode && EventDataById?.data) {
      const normalizedEvent = normalizeEventResponse(
        EventDataById.data,
        languageCode
      );
      dispatch(setTags(EventDataById?.data?.tags));
      dispatch(setFullEvent(normalizedEvent));
      setSelectedChoice(EventDataById?.data?.event_type_name);
    }
  }, [EventDataById]);

  // useEffect(()=>{
  //   if(isEditMode && eve)
  // },[isEditMode])
  // const handleIconClick = () => {
  //   if (dateInputRef.current) {
  //     dateInputRef.current.showPicker?.(); // Modern browsers
  //     dateInputRef.current.focus(); // Fallback for older browsers
  //   }
  // };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        eventTypeRef.current &&
        !eventTypeRef.current.contains(event.target as Node)
      ) {
        setChoiceOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [eventTypeRef, setChoiceOpen]);

  return (
    <div className="mt-10">
      <BuilderHeader
        title="Events Builder"
        isToggleVisible={true}
        isToggleEnabled={isEnabled}
        onToggleChange={setIsEnabled}
        onPinClick={() => console.log("Pin clicked")}
        onSaveTemplate={() => console.log("Template saved")}
        onSubmit={() => handleEventSubmit(String(id))}
        onSubmitLoading={
          createEventMutation.isPending || upateEventMutation.isPending
        }
        isEditMode={isEditMode}
      />

      <div className="grid grid-cols-12  xl:gap-sp30 lg:gap-sp16 gap-sp9">
        <div className="lg:col-span-11 md:col-span-10 col-span-10">
          <div className="bg-white md:mb-5 mb-3 border-0.5 border-primary rounded-15 md:p-5 p-3">
            <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
              <div className="md:w-sp170 w-20 h-full">
                {event ?.image ? (
                  <img
                    src={concatImgURL(event?.image) || ""}
                    alt="Uploaded"
                    className="w-full h-full rounded-2xl border-0.5 border-primary block align-middle object-cover "
                  />
                ) : (
                  <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                    <img src={mediaIcon} alt="Placeholder" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Input
                  label="Event Image*"
                  placeholder="https://www.example.com/image.jpg"
                  value={concatImgURL(event?.image || "")}
                  onChange={(e) => dispatch(setEventImage(e.target.value))}
                  className="m-0 "
                />

                <div>
                  {event?.image ? (
                    <Button
                      text="Remove Image"
                      icon={closeIcon}
                      backgroundColor="transparent"
                      className="py-0"
                      imageclassName="md:w-5 w-3 md:h-5 h-3"
                      onClick={() => dispatch(setEventImage(""))}
                    />
                  ) : (
                    <Button
                      icon={plusIcon}
                      text="Add Image"
                      backgroundColor="transparent"
                      className="pb-0 pt-0"
                      imageclassName="md:w-5 w-3 md:h-5 h-3"
                      onClick={() => setActiveMediaUrl("eventImgUrl")}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:mt-5 mt-2 md:gap-5 gap-2">
              <div className="col-span-1">
                <Input
                  label="Event Title*"
                  placeholder="Enter Title"
                  className="m-0"
                  value={event.translation.title || ""}
                  onChange={(e) => dispatch(setEventTitle(e.target.value))}
                />
              </div>
              <div className="col-span-1">
                <Input
                  label="Location*"
                  placeholder="Enter Location"
                  className="m-0"
                  value={event?.location || ""}
                  onChange={(e) => dispatch(setEventLocation(e.target.value))}
                />
              </div>
              <div className="col-span-1">
                <div>
                  <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                    Date*
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="datetime-local"
                    ref={dateInputRef}
                    className="w-full p-2 md:text-base text-sm border-0.5 border-primary md:rounded-xl placeholder:font-normal rounded-lg"
                    value={
                      event?.start_at
                        ? dayjs
                            .utc(event.start_at)
                            .local()
                            .format("YYYY-MM-DDTHH:mm")
                        : ""
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch(
                        setStartAt(
                          dayjs(e.target.value).utc().format("YYYY-MM-DDTHH:mm")
                        )
                      )
                    }
                  />
                  {/* <img
                    src={calenderIcon}
                    alt="calendar"
                    className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={handleIconClick}
                  /> */}
                </div>
              </div>
              <div>
                <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                  Event Type*
                </label>
                <div
                  ref={eventTypeRef}
                  className="relative ml-auto lg:my-0 my-2 w-full"
                >
                  <div
                    className="border border-primary  rounded-xl p-2 cursor-pointer flex justify-between items-center transition-all duration-300"
                    onClick={handleToggleChoiceOpen}
                  >
                    <span className="text-sm md:text-base ml-2">
                      {selectedChoice ? selectedChoice : "Select Event Type"}
                    </span>
                    <svg
                      className={`w-4 h-4 transform  transition-transform duration-200 ${
                        choiceOpen ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {choiceOpen && (
                    <ul
                      className={`p-1 absolute z-10 bg-white border border-primary rounded-2xl w-full mt-1 shadow-lg transition-all duration-200 origin-top transform ${
                        choiceOpen
                          ? "scale-100 opacity-100"
                          : "scale-95 opacity-0 pointer-events-none"
                      }`}
                    >
                      {eventTypes &&
                        eventTypes.map((eventType: any, index: number) => (
                          <li
                            key={index}
                            className="px-4 py-2 text-sm md:text-base cursor-pointer rounded-xl mb-1 hover:bg-primary hover:text-black transition-colors"
                            onClick={() => handleChoiceSelect(eventType)}
                          >
                            {eventType.name}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="md:mt-5 mt-2">
              <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
                <div className="md:w-sp170 w-20 h-full">
                  {event?.logo_url ? (
                    <img
                      src={concatImgURL(event?.logo_url)}
                      alt="Uploaded"
                      className="w-full h-full rounded-2xl border-0.5 border-primary block align-middle object-cover "
                    />
                  ) : (
                    <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                      <img src={mediaIcon} alt="Placeholder" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    label="Event Logo"
                    placeholder="https://www.example.com/image.jpg"
                    value={concatImgURL(event?.logo_url || "")}
                    className="m-0"
                    readOnly
                  />

                  <div>
                    {event?.logo_url ? (
                      <Button
                        text="Remove Image"
                        icon={closeIcon}
                        backgroundColor="transparent"
                        className="py-0"
                        imageclassName="md:w-5 w-3 md:h-5 h-3"
                        onClick={() => dispatch(setEventLogo(""))}
                      />
                    ) : (
                      <Button
                        icon={plusIcon}
                        text="Add Image"
                        backgroundColor="transparent"
                        className="pb-0 pt-0"
                        imageclassName="md:w-5 w-3 md:h-5 h-3"
                        onClick={() => setActiveMediaUrl("imgLogo")}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-2 md:mt-5 mt-2">
              <div className="col-span-1">
                <Input
                  label="Button Label*"
                  placeholder="Button Label"
                  className="m-0"
                  value={event?.translation?.button_label || ""}
                  onChange={(e) =>
                    dispatch(setEventButtonLabel(e.target.value))
                  }
                />
              </div>
              <div className="col-span-1">
                <Input
                  label="Button URL*"
                  placeholder="Button URL"
                  className="m-0"
                  value={event?.translation?.button_url || ""}
                  onChange={(e) => dispatch(setEventButtonUrl(e.target.value))}
                />
              </div>
            </div>
          </div>

          <MetaData metadata={event.metadata} onChange={handleChange} />
        </div>
        <div className="lg:col-span-1 col-span-2 ">
          <ContentPanel
            data={event}
            // onAuthsave={(payload) => dispatch(setEventAuthentication(payload))}
            // onGeoSave={(payload) => dispatch(setEventGeoBlockContent(payload))}
            // onAuthorSave={(payload) => dispatch(setEventAuthorInfo(payload))}
            onPublishSave={(payload) =>
              dispatch(setEventPublishContent(payload))
            }
            onHierarchySave={(payload) =>
              dispatch(setEventHierarchyContent(payload))
            }
            onSponsorSave={(payload) =>
              dispatch(setEventSponsorContent(payload))
            }
            // onLanguageSave={() => {}}
          />
        </div>
      </div>
      {activeMediaUrl != null && (
        <ContentLibrary
          open={!!activeMediaUrl}
          onClose={() => setActiveMediaUrl(null)}
          uploadType={
            activeMediaUrl ? uploadTypeMap[activeMediaUrl] || "block" : "block"
          }
          onSelect={(url: string) => {
            if (activeMediaUrl === "imgLogo") {
              dispatch(setEventLogo(url));
            } else if (activeMediaUrl === "eventImgUrl") {
              dispatch(setEventImage(url));
            }
            setActiveMediaUrl(null);
          }}
          mediaFilter="image"
        />
      )}
    </div>
  );
}

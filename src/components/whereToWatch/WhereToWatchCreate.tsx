import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { paths } from "../../config/paths";
import { concatImgURL } from "../../config/function";

import Input from "../ui/input/Input";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import { useEffect, useMemo, useState } from "react";
import ContentLibrary from "../contentPanel/ContentLibrary";
import { showToast } from "../../utils/toastUtils";

import {
  selectBroadcast,
  setBroadcastCountries,
  setBroadcastImage,
  setBroadcastUrl,
  setFullBroadcast,
} from "../../redux-toolkit/whereToWatchSlice";

import Select from "react-select";
import {
  useBroadcastById,
  useCountries,
  useCreateWhereToWatch,
  useUpdateBroadcast,
} from "../../hooks/useWhereToWatch";
import { normalizeBroadcastResponse } from "./normalize/normalizeBroadcastResponse";
import { useScroll } from "../../hooks/ScrollContext";
const countrySelectStyles = {
  valueContainer: (base: any) => ({
    ...base,
    maxHeight: "72px", // ~2 lines (tame 64-80px adjust kari sako)
    overflowY: "auto",
    flexWrap: "wrap",
    alignItems: "flex-start",
  }),
  control: (base: any) => ({
    ...base,
    minHeight: "44px",
  }),
  multiValue: (base: any) => ({
    ...base,
    maxWidth: "100%",
  }),
};

export default function WhereToWatchCreate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const [searchParams] = useSearchParams();
  const languageCode = searchParams.get("lang");

  const [show, setShow] = useState(false);
  const broadcast = useSelector(selectBroadcast);

  const { data: broadcastDataById } = useBroadcastById(id, languageCode);
  const createBroadcastMutation = useCreateWhereToWatch(broadcast);
  const updateBroadcastMutation = useUpdateBroadcast(broadcast);

  const { data: countryList } = useCountries();

  // ✅ "All" option
  const ALL_OPTION = useMemo(
    () => ({ value: "__ALL__", label: "All Countries" }),
    [],
  );

  // ⬇ Prepare dropdown options
  const categoryOptions = useMemo(() => {
    return (
      countryList?.map((item: any) => ({
        value: Number(item.id),
        label: item.name,
      })) || []
    );
  }, [countryList]);

  const optionsWithAll = useMemo(() => {
    return [ALL_OPTION, ...categoryOptions];
  }, [ALL_OPTION, categoryOptions]);

  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);

  // ⬇ When country is selected
  const handleSelectChange = (selected: any) => {
    const selectedArr = selected || [];

    const hasAll = selectedArr.some((x: any) => x.value === ALL_OPTION.value);

    // ✅ If user selects "All" => select all real options
    if (hasAll) {
      setSelectedCategories(categoryOptions);
      dispatch(setBroadcastCountries(categoryOptions.map((x) => x.value)));
      return;
    }

    // ✅ Normal multi-select
    setSelectedCategories(selectedArr);
    dispatch(
      setBroadcastCountries((selectedArr || []).map((x: any) => x.value)),
    );
  };

  const handleBroadcastSubmit = () => {
    if (!broadcast.image)
      return showToast("Please upload a Broadcast image", "error");

    if (!broadcast.broadcast_url)
      return showToast("Please add a redirect url", "error");

    if (isEditMode && id) {
      updateBroadcastMutation.mutate(id);
    } else {
      createBroadcastMutation.mutate();
    }
  };

  useEffect(() => {
    if (isEditMode && broadcastDataById) {
      const normalized = normalizeBroadcastResponse(broadcastDataById.data);
      dispatch(setFullBroadcast(normalized));

      if (normalized.country_id?.length) {
        const pre = normalized.country_id.map((cid: number) => {
          const match = countryList?.find(
            (c: any) => Number(c.id) === Number(cid),
          );
          return {
            value: Number(cid),
            label: match?.name || "Unknown",
          };
        });

        setSelectedCategories(pre);

        // store ONLY numbers
        dispatch(setBroadcastCountries(pre.map((x) => x.value)));
      } else {
        setSelectedCategories([]);
        dispatch(setBroadcastCountries([]));
      }
    }
  }, [broadcastDataById, countryList, dispatch, isEditMode]);

  return (
    <div>
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Where To Watch Builder"
          onSaveTemplate={() => navigate(paths.wheretowatch.path)}
          onSaveTemplateTitle="Cancel"
          onSubmit={handleBroadcastSubmit}
          onSubmitLoading={
            createBroadcastMutation.isPending ||
            updateBroadcastMutation.isPending
          }
          isEditMode={isEditMode}
        />
      </div>
      <div className="container grid grid-cols-12 xl:gap-sp30 lg:gap-sp16 gap-sp9">
        <div className="lg:col-span-11 md:col-span-10 col-span-10">
          <div className="bg-white md:mb-5 mb-3 border-0.5 border-primary rounded-15 md:p-5 p-3">
            {/* IMAGE */}
            <div className="space-y-3">
              <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
                <div className="md:w-sp170 w-20 h-full">
                  {broadcast.image ? (
                    <img
                      src={concatImgURL(broadcast.image)}
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
                    label="Broadcast Image URL"
                    placeholder="https://www.example.com"
                    className="m-0"
                    value={concatImgURL(broadcast.image)}
                    readOnly
                  />

                  <div>
                    {broadcast.image ? (
                      <Button
                        text="Remove Image"
                        icon={closeIcon}
                        backgroundColor="transparent"
                        className="py-0"
                        imageclassName="md:w-5 w-3 md:h-5 h-3"
                        onClick={() => dispatch(setBroadcastImage(null))}
                      />
                    ) : (
                      <Button
                        icon={plusIcon}
                        text="Add Image"
                        backgroundColor="transparent"
                        className="py-0"
                        imageclassName="md:w-5 w-3 md:h-5 h-3"
                        onClick={() => setShow(true)}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* URL */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Broadcast Url"
                  placeholder="https://www.example.com/"
                  value={broadcast.broadcast_url || ""}
                  onChange={(e) => dispatch(setBroadcastUrl(e.target.value))}
                />

                {/* COUNTRY DROPDOWN */}
                <div>
                  <label className="block mb-1.5 md:text-base/4 text-sm font-medium">
                    Country
                  </label>
                  <Select
                    options={optionsWithAll}
                    isMulti
                    closeMenuOnSelect={false}
                    classNamePrefix="country-select"
                    className="custom-multi-selector"
                    placeholder="Select Country"
                    value={selectedCategories}
                    onChange={handleSelectChange}
                    styles={countrySelectStyles}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        {/* <div className="lg:col-span-1 col-span-2">
          <ContentPanel data={broadcast} />
        </div> */}
      </div>

      {show && (
        <ContentLibrary
          open={show}
          onClose={() => setShow(false)}
          uploadType="where_to_watch"
          mediaFilter="image"
          onSelect={(value) => dispatch(setBroadcastImage(value))}
        />
      )}
    </div>
  );
}

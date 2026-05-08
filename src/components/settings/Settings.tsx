import { useNavigate } from "react-router-dom";
// import { useScroll } from "../../hooks/ScrollContext";
import { showToast } from "../../utils/toastUtils";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import Input from "../ui/input/Input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import { paths } from "../../config/paths";
import { useState, useEffect } from "react";
import Button from "../ui/button";
import { deleteIcon, plusIcon } from "../../icons";
import { useSelector } from "react-redux";
import { selectMenuPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { getPermissionFlags } from "../sidebar/menuPermissions";
import { useScroll } from "../../hooks/ScrollContext";
import { useDebounce } from "../../hooks/useDebounce";
import { selectListingState } from "../../redux-toolkit/moduleListingSearchSlice";

export default function Settings() {
  // const { isScrolled } = useScroll();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isScrolled } = useScroll();
  const module = "setting";
  const listingState = useSelector(selectListingState(module));
  const menuPermissions = useSelector(selectMenuPermissions);
  const [searchInput, setSearchInput] = useState<string>(
    listingState.search || "",
  );
  const debouncedSearch = useDebounce(searchInput, 300);
  const { isUpdate, isDelete } = getPermissionFlags(menuPermissions.settings);
  /** State to store ALL fields: API + Newly Added */
  const [fields, setFields] = useState<
    { id?: string; key: string; value: string; group?: string }[]
  >([]);

  /** Fetch settings from API */
  const { data: settingsData, isFetching } = useQuery({
    queryKey: ["settings", debouncedSearch],
    queryFn: async () =>
      await api.get("/setting/getSettings", {
        params: {
          search: debouncedSearch,
        },
      }),
  });

  /** Populate fields dynamically from API */
  useEffect(() => {
    if (settingsData?.data) {
      const apiFields = Object.values(settingsData.data).map((item: any) => ({
        id: item.id,
        key: item.key,
        value: item.value,
        group: item.group,
      }));
      setFields(apiFields);
    }
  }, [settingsData]);

  /** Update settings mutation */
  const { mutate: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: async (data: any) =>
      await api.put("/setting/updateSettings", data),
    onSuccess: () => {
      showToast("Settings Updated Successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["settings"], exact: false });
      navigate(paths.settings.path);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      showToast(errorMessage, "error");
      console.error("Error while updating settings", error);
    },
  });

  /** Handle changes for key or value */
  const handleFieldChange = (
    index: number,
    type: "key" | "value",
    newValue: string,
  ) => {
    setFields((prev) => {
      const updated = [...prev];
      // Replace spaces with underscores in KEY
      updated[index][type] =
        type === "key" ? newValue.replace(/\s+/g, "_") : newValue;
      return updated;
    });
  };

  /** Add a new blank key-value field */
  const handleAddField = () => {
    setFields((prev) => [
      ...prev,
      { id: "", key: "", value: "", group: "general_setting" },
    ]);
  };

  /** Remove a field */
  const handleRemoveField = (index: number) => {
    if (!isDelete) return;
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  /** Submit final array of objects */
  const handleSubmit = () => {
    updateSettings(fields);
  };

  return (
    <div>
      <div
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Settings"
          // showSearchInput
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          isToggleVisible={false}
          onSubmit={handleSubmit}
          isSubmitDisabled={!isUpdate}
          isEditMode={true}
          onSubmitLoading={isUpdating}
        />
      </div>

      {/* Settings Form */}
      <div className="container">
        <div className="bg-white p-5 mt-3 rounded-2xl border border-primary space-y-4">
          {fields.map((field, index) => (
            <div
              key={index}
              className="grid grid-cols-[repeat(5,1fr)_auto] gap-3 items-center"
            >
              {/* KEY */}
              <div className="col-span-2">
                <Input
                  label="Key"
                  placeholder="Enter Key"
                  value={field.key}
                  onChange={(e) =>
                    handleFieldChange(index, "key", e.target.value)
                  }
                  disabled={isFetching && index < fields.length}
                />
              </div>

              {/* VALUE */}
              <div className="col-span-3 ">
                <Input
                  label="Value"
                  placeholder="Enter Value"
                  value={field.value}
                  onChange={(e) =>
                    handleFieldChange(index, "value", e.target.value)
                  }
                  disabled={isFetching}
                />
              </div>

              {/* REMOVE BUTTON */}
              <div className="flex justify-start">
                <Button
                  icon={deleteIcon}
                  backgroundColor="transparent"
                  className={` p-0 md:mt-4 ${
                    !isDelete ? "opacity-50 cursor-not-allowed" : ""
                  } `}
                  disabled={!isDelete}
                  onClick={() => handleRemoveField(index)}
                />
              </div>
            </div>
          ))}

          {/* Add New Field Button */}
          <div className="flex justify-start">
            <Button
              text="Add New Key"
              icon={plusIcon}
              className=" gap-0  md:rounded-2xl rounded-lg md:py-3 bg-transparent"
              onClick={handleAddField}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

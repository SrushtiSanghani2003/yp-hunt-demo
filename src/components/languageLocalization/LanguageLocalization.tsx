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
import { selectListingState } from "../../redux-toolkit/moduleListingSearchSlice";
import { useDebounce } from "../../hooks/useDebounce";

export default function LanguageLocalization() {
  const module = "languagelocalization";
  const listingState = useSelector(selectListingState(module));
  const { isScrolled } = useScroll();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const menuPermissions = useSelector(selectMenuPermissions);
  const { isUpdate, isDelete } = getPermissionFlags(
    menuPermissions.language_localization,
  );
  const [searchInput, setSearchInput] = useState<string>(
    listingState.search || "",
  );
  const debouncedSearch = useDebounce(searchInput, 300);
  /** State to store ALL fields: API + Newly Added */
  const [fields, setFields] = useState<
    {
      id?: string;
      key: string;
      en_value: string;
      es_value: string;
    }[]
  >([]);

  /** Fetch languagelocalization from API */
  const { data: languageLocalizationData, isLoading: isFetching } = useQuery({
    queryKey: ["languagelocalization", debouncedSearch],
    queryFn: async () =>
        await api.get("/setting/getLanguageLocalization", {
          params: {
            search: debouncedSearch,
          },
        }),
  });
  /** Populate fields dynamically from API */
  useEffect(() => {
    if (languageLocalizationData?.data) {
      const apiFields = Object.values(languageLocalizationData.data).map(
        (item: any) => ({
          id: item.id,
          key: item.key,
          en_value: item.en_value,
          es_value: item.es_value,
        }),
      );
      setFields(apiFields);
    }
  }, [languageLocalizationData]);

  /** Update languagelocalization mutation */
  const { mutate: updateLanguageLocalization, isPending: isUpdating } =
    useMutation({
      mutationFn: async (data: any) =>
        await api.put("/setting/updateLanguageLocalization", data),
      onSuccess: () => {
        showToast("LanguageLocalization Updated Successfully", "success");
        queryClient.invalidateQueries({
          queryKey: ["languagelocalization"],
          exact: false,
        });
        navigate(paths.languagelocalization.path);
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong";

        showToast(errorMessage, "error");
        console.error("Error while updating LanguageLocalization", error);
      },
    });

  /** Handle changes for key or value */
  const handleFieldChange = (
    index: number,
    type: "key" | "en_value" | "es_value",
    newValue: string,
  ) => {
    setFields((prev) => {
      const updated = [...prev];
      if (type === "key") {
        // Replace spaces with underscores in key
        updated[index].key = newValue.replace(/\s+/g, "_");
      } else {
        updated[index][type] = newValue;
      }
      return updated;
    });
  };

  /** Add a new blank key-value field */
  const handleAddField = () => {
    setFields((prev) => [
      ...prev,
      { id: "", key: "", en_value: "", es_value: "" },
    ]);
  };

  /** Remove a field */
  const handleRemoveField = (index: number) => {
    if (!isDelete) return;
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  /** Submit final array of objects */
  const handleSubmit = () => {
    updateLanguageLocalization(fields);
  };

  return (
    <div>
      {/* Header */}
      <div
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Language Localization"
          // showSearchInput
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          isToggleVisible={false}
          onSubmit={handleSubmit}
          isSubmitDisabled={!isUpdate}
          isEditMode={true}
          onSubmitLoading={isUpdating || isFetching}
        />
      </div>

      {/* LanguageLocalization Form */}
      <div className="container">
        <div className="bg-white p-5 mt-3 rounded-2xl border border-primary space-y-4">
          {fields.map((field, index) => (
            <div
              key={index}
              className="grid grid-cols-[repeat(9,1fr)_auto] gap-3 items-center"
            >
              {/* KEY */}
              <div className="col-span-3">
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
                  label="EN Value"
                  placeholder="Enter English Value"
                  value={field.en_value}
                  onChange={(e) =>
                    handleFieldChange(index, "en_value", e.target.value)
                  }
                  disabled={isFetching}
                />
              </div>
              <div className="col-span-3 ">
                <Input
                  label="ES Value"
                  placeholder="Enter Spanish  Value"
                  value={field.es_value}
                  onChange={(e) =>
                    handleFieldChange(index, "es_value", e.target.value)
                  }
                  disabled={isFetching}
                />
              </div>

              {/* REMOVE BUTTON */}
              <div className="flex justify-start">
                <Button
                  icon={deleteIcon}
                  backgroundColor="transparent"
                  disabled={!isDelete}
                  className={` p-0 md:mt-4${
                    !isDelete ? "opacity-50 cursor-not-allowed" : ""
                  } `}
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

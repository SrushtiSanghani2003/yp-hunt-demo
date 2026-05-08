import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../lib/api";
import { showToast } from "../../utils/toastUtils";
import { paths } from "../../config/paths";
import { resetTags, setTags } from "../../redux-toolkit/tagSlice";
import {
  addMembershipVariant,
  removeMembershipVariant,
  selectMembership,
  updateMembershipField,
  updateMembershipVariant,
  setMembershipFromApi,
  type MembershipVariant,
  type MembershipState,
  resetMembership,
} from "../../redux-toolkit/membershipSlice";

import { normalizeMembership } from "./normalizer/normalizeMembership";

import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import FroalaEditor from "../blocks/FroalaEditor";
import ImageMedia from "../heroMedia/ImageMedia";
import Input from "../ui/input/Input";
import { closeIcon, plusIcon } from "../../icons";
import MetaData from "../metaData";
import type { AxiosError } from "axios";

const CreateMembership = () => {
  const { id } = useParams();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const membership = useSelector(selectMembership);
  const languageCode = searchParams.get("lang");
  const isEditMode = Boolean(id);

  const [selectedVariant, setSelectedVariant] = useState<number | null>(0);
  const [_activeTab, setActiveTab] = useState<"variants" | "discounts" | null>(
    "variants",
  );
  const [isEnabled, setIsEnabled] = useState(false);

  // Custom hooks for mutations
  // const createMembership = useCreateMembership(membership);
  // const updateMembership = useUpdateMembership(membership);

  // Fetch membership by ID for edit mode
  const { data: normalizedMembership } = useQuery({
    queryKey: ["membership", id, languageCode],
    queryFn: async () => {
      const response = await api.get(`/membership/${id}`, {
        params: languageCode ? { language_code: languageCode } : {},
      });
      return response.data;
    },
    enabled: isEditMode,
    select: (data) => ({
      normalized: normalizeMembership(data, languageCode || "en"),
      tags: data.tags || [],
    }),
  });

  // 🔹 1️⃣ Always reset membership when entering page
  useEffect(() => {
    if (!isEditMode) {
      dispatch(resetMembership());
    }
  }, [dispatch, isEditMode]);

  // 🔹 2️⃣ If edit mode and API data loaded — populate Redux
  useEffect(() => {
    if (isEditMode && normalizedMembership) {
      dispatch(setTags(normalizedMembership.tags));
      dispatch(setMembershipFromApi(normalizedMembership.normalized));
      if (normalizedMembership.normalized.variants.length > 0) {
        setSelectedVariant(0);
      }
    }
  }, [dispatch, isEditMode, normalizedMembership]);

  // 🔹 3️⃣ For new membership creation — add one blank variant
  useEffect(() => {
    if (!isEditMode) {
      const defaultVariant: MembershipVariant = {
        name: "",
        description: "",
        price: 0,
        currency: "",
        allowed_for: "per person",
        note: "",
        vat: 0,
      };
      dispatch(addMembershipVariant(defaultVariant));
      setSelectedVariant(0); // open first variant automatically
    }
  }, [dispatch, isEditMode]);

  // Handle variant selection
  const handleVariantClick = (variantIndex: number) => {
    setSelectedVariant(variantIndex);
    setActiveTab("variants");
  };

  // Handle removing a variant
  // Handle removing a variant
  const handleRemoveVariant = (variantIndex: number) => {
    const totalVariants = membership.variants.length;

    dispatch(removeMembershipVariant(variantIndex));

    // Use functional update to ensure you get the latest state
    setSelectedVariant((prevSelected) => {
      if (prevSelected === null) return null;

      // If deleting the currently selected one
      if (prevSelected === variantIndex) {
        return totalVariants > 1
          ? variantIndex === 0
            ? 0 // If removing first one → stay at 0
            : variantIndex - 1 // Otherwise move to previous
          : null;
      }

      // If deleting a variant before the selected one → shift index
      if (prevSelected > variantIndex) {
        return prevSelected - 1;
      }

      // Else, keep selection as is
      return prevSelected;
    });
  };

  // Handle adding a new variant
  const handleAddVariant = () => {
    const newVariant: MembershipVariant = {
      name: "",
      description: "",
      price: 0,
      currency: "",
      allowed_for: "per person",
      note: "",
      vat: 0,
    };
    dispatch(addMembershipVariant(newVariant));
    setSelectedVariant(0);
    // setSelectedVariant(membership.variants.length); // select newly added
    setActiveTab("variants");
  };

  // Handle variant field changes
  const handleVariantChange = (
    index: number,
    field: keyof MembershipVariant,
    value: any,
  ) => {
    const updatedVariant = { ...membership.variants[index] };

    (updatedVariant as any)[field] = value;

    dispatch(updateMembershipVariant({ index, variant: updatedVariant }));
  };

  // Handle metadata changes
  const handleMetadataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof MembershipState["metadata"],
  ) => {
    dispatch(
      updateMembershipField({
        field: "metadata",
        value: { ...membership.metadata, [field]: e.target.value },
      }),
    );
  };

  // Create Membership Mutation
  const createMembershipMutation = useMutation({
    mutationFn: (payload: any) => api.post("/membership", payload),
    onSuccess: () => {
      showToast("Membership Created", "success");
      navigate(paths.membership.path);
    },
    onError: (error: AxiosError<any>) => {
      const message =
        error.response?.data?.message || "Failed to create membership";

      showToast(message, "error");
    },
  });

  // Update Membership Mutation
  const location = useLocation();

  const fromPage = location.state?.fromPage || 1; // fallback if undefined
  const fromSearch = location.state?.fromSearch || "";

  // Update Membership Mutation
  const updateMembershipMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      api.put(`/membership/${id}`, payload),
    onSuccess: () => {
      showToast("Membership Updated", "success");
      dispatch(resetTags());
      navigate(paths.membership.path, {
        state: {
          restorePage: fromPage,
          restoreSearch: fromSearch,
        }, // send it back silently
        replace: true, // optional: prevents back button double route
      });
    },
    onError: (error: AxiosError<any>) => {
      const message =
        error.response?.data?.message || "Failed to update membership";

      showToast(message, "error");
    },
  });

  // Handle form submission
  const handleMembershipSubmit = () => {
    // const packages =
    //     membership.variants && membership.variants.length > 0
    //         ? membership.variants
    //             // 🧠 Filter only filled variants
    //             .filter(
    //                 (v) =>
    //                     v.name.trim() !== "" ||
    //                     v.description.trim() !== "" ||
    //                     v.price > 0
    //             )
    //             .map((v) => ({
    //                 currency: v.currency || "",
    //                 price: Number(v.price) || null,
    //                 valued_added_tax: Number(v.vat) || null,
    //                 packageTranslation: {
    //                     language_code: "en",
    //                     title: v.name,
    //                     description: v.description,
    //                     note: v.note || "",
    //                 },
    //             }))
    //         : [];

    const payload = {
      type: membership.type || "hospitality",
      image: membership.thumbnail_url || "",
      translation: {
        language_code: "en",
        title: membership.title,
        other_details: membership.other_details,
        description: membership.overview,
        content: {},
        button_url: membership.button_link,
        button_label: membership.button_text,
      },

      packages: membership.variants.map((v: any) => ({
        currency: v.currency || "$",
        allowed_for: v.allowed_for || "per person",
        price: Number(v.price) || null,
        valued_added_tax: Number(v.vat) || null,
        packageTranslation: {
          language_code: "en",
          title: v.name,
          description: v.description,
          note: v.note || "",
        },
      })),
    };

    if (isEditMode && id) {
      updateMembershipMutation.mutate({ id, payload });
    } else {
      createMembershipMutation.mutate(payload);
    }
  };

  // Media props
  const imageMediaProps = {
    onClose: () =>
      dispatch(updateMembershipField({ field: "thumbnail_url", value: null })),
    isicon: false,
    imageUrl: membership.thumbnail_url,
    onUrlChange: (url: string) =>
      dispatch(updateMembershipField({ field: "thumbnail_url", value: url })),
  };

  return (
    <div className="mt-10">
      <BuilderHeader
        title="Membership Builder"
        // isToggleVisible={true} //live preview
        isToggleEnabled={isEnabled}
        onToggleChange={setIsEnabled}
        // onPinClick={() => console.log("Pin clicked")}
        onSaveTemplate={() => window.history.back()}
        onSaveTemplateTitle="Cancel"
        onSubmit={handleMembershipSubmit}
        onSubmitLoading={
          createMembershipMutation.isPending ||
          updateMembershipMutation.isPending
        }
        isEditMode={isEditMode}
        isSubmitDisabled={membership.title === "" || membership.title === null}
      />

      <div className="grid grid-cols-12 xl:gap-sp30 lg:gap-sp16 gap-sp9 mb-5">
        <div className="lg:col-span-12 md:col-span-10 col-span-10">
          {/* Membership main info */}
          <div className="bg-white md:mb-5 mb-3 border-0.5 border-primary rounded-15 md:p-5 p-3">
            <div className="flex flex-col md:flex-row md:items-end gap-4 w-full md:mb-6 mb-3">
              {/* Membership Type */}
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="membershipType"
                  className="block font-medium text-sm md:text-base mb-1"
                >
                  Select Membership Type
                </label>
                <select
                  id="membershipType"
                  value={membership.type || "hospitality"}
                  onChange={(e) =>
                    dispatch(
                      updateMembershipField({
                        field: "type",
                        value: e.target.value,
                      }),
                    )
                  }
                  className="w-full p-2 md:p-3 text-sm md:text-base border border-primary rounded-lg md:rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="hospitality">Hospitality</option>
                  <option value="club">Club</option>
                </select>
              </div>

              {/* Membership Title */}
              <div className="w-full md:w-1/2">
                <Input
                  label="Membership Title*"
                  id="title"
                  value={membership.title || ""}
                  onChange={(e) =>
                    dispatch(
                      updateMembershipField({
                        field: "title",
                        value: e.target.value,
                      }),
                    )
                  }
                  placeholder="Enter title "
                />
              </div>
            </div>

            <div className="md:mb-5 mb-1">
              <label
                htmlFor="overview"
                className="block w-full font-medium md:text-base text-sm md:mb-2 mb-1"
              >
                Overview
              </label>
              <FroalaEditor
                model={membership.overview}
                onModelChange={(newText: string) =>
                  dispatch(
                    updateMembershipField({
                      field: "overview",
                      value: newText,
                    }),
                  )
                }
              />
            </div>
            <div className="w-full mb-2">
              <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                Other details
              </label>

              <textarea
                rows={4}
                value={membership.other_details || ""}
                onChange={(e) =>
                  dispatch(
                    updateMembershipField({
                      field: "other_details",
                      value: e.target.value,
                    }),
                  )
                }
                className="w-full p-2 md:text-base text-sm border-0.5 min-h-36 border-primary md:rounded-xl placeholder:font-normal rounded-lg md:pr-10 bg-white"
              />
            </div>

            <div>
              <ImageMedia
                {...imageMediaProps}
                showCloseButton={!!membership.thumbnail_url}
              />
            </div>

            <div className="mt-6 flex gap-3 w-full items-center justify-center">
              <Input
                label="Button Text"
                placeholder="Enter Button Text"
                value={membership.button_text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(
                    updateMembershipField({
                      field: "button_text",
                      value: e.target.value,
                    }),
                  )
                }
                className="w-full"
              />
              <Input
                label="Button Link"
                placeholder="https://www.example.com"
                value={membership.button_link}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(
                    updateMembershipField({
                      field: "button_link",
                      value: e.target.value,
                    }),
                  )
                }
                className="w-full"
              />
            </div>
          </div>

          {/* Variants section */}
          <div className="bg-white md:mb-5 mb-6 border-0.5 border-primary rounded-15 md:p-5 p-3">
            <div className="flex gap-2 flex-wrap">
              {membership.variants.map((_variant: any, index: number) => (
                <div
                  key={index}
                  className="relative flex items-center group gap-1"
                >
                  <button
                    onClick={() => handleVariantClick(index)}
                    className={`md:px-2 px-1 py-1 text-sm rounded-lg border border-primary ${
                      selectedVariant === index
                        ? "bg-primary border-primary text-white"
                        : ""
                    }`}
                  >
                    {`package ${index + 1}`}
                  </button>
                  {membership.variants.length > 1 && (
                    <button
                      onClick={() => handleRemoveVariant(index)}
                      className="p-1 absolute -top-2 group-hover:opacity-100 opacity-0 duration-300 -right-2 bg-white rounded-full"
                    >
                      <img
                        src={closeIcon}
                        alt="Delete Variant"
                        className="h-3"
                      />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={handleAddVariant}
                className="px-4 py-1 bg-transparent border-[#fcd100] border text-black rounded-lg font-medium transition"
              >
                <img src={plusIcon} alt="Add Variant" />
              </button>
            </div>

            {selectedVariant !== null &&
              membership.variants[selectedVariant] && (
                <div className="mt-6">
                  <div className="mb-4">
                    <Input
                      inputType="text"
                      label="Package name*"
                      placeholder="Enter package name"
                      value={membership.variants[selectedVariant].name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleVariantChange(
                          selectedVariant,
                          "name",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                      Description package
                    </label>
                    <textarea
                      rows={5}
                      value={membership.variants[selectedVariant].description}
                      onChange={(e) =>
                        handleVariantChange(
                          selectedVariant,
                          "description",
                          e.target.value,
                        )
                      }
                      className="w-full p-2 md:text-base text-sm border-0.5 min-h-36 border-primary md:rounded-xl placeholder:font-normal rounded-lg md:pr-10 bg-white"
                    />
                  </div>
                  <div className="flex gap-3 w-full items-center justify-center mt-4">
                    <Input
                      inputType="number"
                      label="Price*"
                      placeholder="Enter Price"
                      value={membership.variants[selectedVariant].price || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleVariantChange(
                          selectedVariant,
                          "price",
                          e.target.value,
                        )
                      }
                      className="w-full"
                    />
                    <div className="w-full">
                      <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                        Currency
                      </label>
                      <select
                        value={
                          membership.variants[selectedVariant].currency || "$"
                        }
                        onChange={(e) =>
                          handleVariantChange(
                            selectedVariant,
                            "currency",
                            e.target.value,
                          )
                        }
                        className="w-full p-2 md:text-base text-sm border-0.5 border-primary md:rounded-xl placeholder:font-normal rounded-lg md:pr-10 bg-white"
                      >
                        <option value="$">$ - United States Dollar</option>
                        <option value="£">£ - British Pound</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full items-center justify-center mt-4">
                    <Input
                      inputType="text"
                      label="Note"
                      placeholder="Enter Note"
                      value={membership.variants[selectedVariant].note || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleVariantChange(
                          selectedVariant,
                          "note",
                          e.target.value,
                        )
                      }
                      className="w-full"
                    />
                    <Input
                      inputType="number"
                      label="Value Added Tax (VAT %)"
                      placeholder="Enter VAT %"
                      value={membership.variants[selectedVariant].vat || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleVariantChange(
                          selectedVariant,
                          "vat",
                          e.target.value,
                        )
                      }
                      className="w-full"
                    />
                    <div className="w-full">
                      <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                        Allowed For
                      </label>
                      <select
                        value={
                          membership.variants[selectedVariant].allowed_for ||
                          "per person"
                        }
                        onChange={(e) =>
                          handleVariantChange(
                            selectedVariant,
                            "allowed_for",
                            e.target.value,
                          )
                        }
                        className="w-full p-2 md:text-base text-sm border-0.5 border-primary md:rounded-xl placeholder:font-normal rounded-lg md:pr-10 bg-white"
                      >
                        <option value="per adult">Per Adult</option>
                        <option value="per child">Per Child</option>
                        <option value="per person">Per Person</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
          </div>

          <MetaData
            metadata={membership.metadata}
            onChange={handleMetadataChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateMembership;

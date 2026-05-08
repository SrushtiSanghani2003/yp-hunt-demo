import { useEffect, useState } from "react";
import Button from "../ui/button";
import api from "../../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  arrowDownIcon,
  arrowUpIcon,
  chevronDown,
  closeIcon,
  deleteIconblack,
  plusIcon,
} from "../../icons";
import { concatImgURL } from "../../config/function";
import { Swiper, SwiperSlide } from "swiper/react";
import { showToast } from "../../utils/toastUtils";
import type { TyreTypes } from "../contentPanel/AddTier";
import AddTier from "../contentPanel/AddTier";
import { getPermissionFlags } from "../sidebar/menuPermissions";
import { selectMenuPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { useSelector } from "react-redux";
import { useScroll } from "../../hooks/ScrollContext";
import {
  selectLanguage,
  selectTranslation,
} from "../../redux-toolkit/languageSlice";

const CommonPartners = () => {
  const { isScrolled } = useScroll();
  const language = useSelector(selectLanguage);
  const isTranslation = useSelector(selectTranslation);
  const [tiers, setTiers] = useState<any>([]);
  const [languageCode, setLanguageCode] = useState("en") || language;
  const [open, setOpen] = useState(false);
  const [tierToEdit, setTierToEdit] = useState<TyreTypes | undefined>(
    undefined,
  );
  const [tierIndex, setTierIndex] = useState<number | undefined>(undefined);
  const [partnerIndex, setPartnerIndex] = useState<number | undefined>(
    undefined,
  );
  const menuPermissions = useSelector(selectMenuPermissions);
  const { isUpdate } = getPermissionFlags(menuPermissions.common_partners);
  const queryClient = useQueryClient();

  const getPartners = async () => {
    const params = {
      language_code: languageCode,
    };
    return await api.get("/common/common-partners", { params });
  };

  const { data: partnersData, isFetching } = useQuery({
    queryKey: ["common-partners", languageCode],
    queryFn: getPartners,
    refetchOnWindowFocus: false,
  });

  const updateTiers = async (data: any) => {
    const obj = {
      language_code: languageCode,
      auto_translate: isTranslation,
      block_schema: null,
      content: {
        tiers: data,
        is_active: true,
        is_dynamic: false,
        is_carousel: true,
      },
    };
    const params = {
      language_code: languageCode,
    };
    return await api.patch("/common/common-partners", obj, { params });
  };

  const updateTiersMutation = useMutation({
    mutationFn: updateTiers,
    onSuccess: () => {
      showToast("Partners updated successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["common-partners"],
        exact: false,
      });
    },
    onError: () => {
      showToast("Failed to update Partners", "error");
    },
  });

  const handleUpdateTier = () => {
    if (!isUpdate) return;
    if (tiers.length === 0) {
      showToast("Add at least one tier before saving!", "error");
      return;
    }
    updateTiersMutation.mutate(tiers);
  };

  useEffect(() => {
    if (partnersData) {
      setTiers(partnersData.data.content.tiers);
    }
  }, [partnersData]);

  const changeTierOrder = (index: number, direction: "up" | "down") => {
    const updated = [...tiers];

    if (direction === "up") {
      if (index === 0) return; // already first
      [updated[index - 1], updated[index]] = [
        updated[index],
        updated[index - 1],
      ];
    }

    if (direction === "down") {
      if (index === updated.length - 1) return; // already last
      [updated[index + 1], updated[index]] = [
        updated[index],
        updated[index + 1],
      ];
    }

    setTiers(updated);
  };

  const deleteTier = (index: number) => {
    const updated = tiers.filter((_: any, i: number) => i !== index);
    setTiers(updated);
  };

  const deletePartner = (tierIndex: number, partnerIndex: number) => {
    const updated: any = [...tiers];

    updated[tierIndex].partners = updated[tierIndex].partners.filter(
      (_: any, i: number) => i !== partnerIndex,
    );

    setTiers(updated);
  };

  const handleAddNewTier = () => {
    setTierToEdit(undefined);
    setTierIndex(undefined);
    setOpen(true);
  };

  const handleEditTier = (
    tier: TyreTypes,
    index: number,
    partnerIndex: number,
  ) => {
    setTierToEdit(tier);
    setTierIndex(index);
    setPartnerIndex(partnerIndex);
    setOpen(true);
  };

  const handleUpdateTiers = (
    updatedTiers: TyreTypes[],
    updatedTierIndex?: number,
  ) => {
    if (updatedTierIndex !== undefined) {
      // Editing an existing tier
      const newTiers: any = [...tiers];
      newTiers[updatedTierIndex] = updatedTiers[0];
      setTiers(newTiers);
    } else {
      // Adding new tiers
      setTiers((prev: any) => [...prev, ...updatedTiers]);
    }

    // Close modal and reset edit states
    setOpen(false);
    setTierToEdit(undefined);
    setTierIndex(undefined);
  };

  return (
    <div className=" grid grid-cols-1">
      <div
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center gap-5">
          <h2 className="lg:text-2xl/6 text-xl font-extrabold pb-2 md:pb-0">
            Common Partners
          </h2>
          <div className="flex items-end gap-5">
            <div>
              <label
                htmlFor="language"
                className="block md:mb-2 mb-1 md:text-base/4 text-sm font-medium"
              >
                Language
              </label>
              <div className="relative w-60">
                <select
                  id="language"
                  value={languageCode}
                  onChange={(e) => setLanguageCode(e.target.value)}
                  className="appearance-none w-full md:p-[7px] p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                </select>
                <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                  <img src={chevronDown} />
                </div>
              </div>
            </div>
            <Button
              text="Update"
              className={`lg:py-3 py-sp10 lg:px-5 px-3 ${
                !isUpdate ? "opacity-50 cursor-not-allowed" : ""
              } `}
              onClick={handleUpdateTier}
              disabled={!isUpdate}
              isLoading={updateTiersMutation.isPending}
            />
          </div>
        </div>
      </div>
      <div className="container">
        {isFetching ? (
          <div className="text-center text-sm text-gray-500 py-10">
            Loading partners...
          </div>
        ) : (
          <div className="pb-5">
            <div className="p-3 bg-white border-0.5 border-primary rounded-2xl mb-8">
              {tiers.length > 0 &&
                tiers.map((tier: any, tierIndex: number) => (
                  <div className="mb-5" key={tierIndex}>
                    <div className="relative flex items-center justify-between">
                      <h3 className="text-xl mb-1 font-medium">
                        {tier.tierName}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Button
                          icon={arrowUpIcon}
                          backgroundColor="white"
                          className="md:p-1"
                          imageclassName="w-4 h-4 "
                          onClick={(e) => {
                            e.stopPropagation();
                            changeTierOrder(tierIndex, "up");
                          }}
                        />
                        <Button
                          icon={arrowDownIcon}
                          backgroundColor="white"
                          className=" md:p-1"
                          imageclassName="w-4 h-4 "
                          onClick={(e) => {
                            e.stopPropagation();
                            changeTierOrder(tierIndex, "down");
                          }}
                        />
                        <Button
                          icon={deleteIconblack}
                          backgroundColor="white"
                          className="md:p-1"
                          imageclassName="w-4 h-4 "
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTier(tierIndex);
                          }}
                        />
                      </div>
                    </div>

                    <Swiper
                      spaceBetween={16}
                      slidesPerView={1}
                      breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1280: { slidesPerView: 5 },
                      }}
                      className="!px-1"
                    >
                      {tier.partners.map(
                        (partner: any, partnerIndex: number) => (
                          <SwiperSlide key={partnerIndex}>
                            <div
                              className="relative p-2 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-200 group border border-primary flex flex-col gap-2"
                              onClick={() =>
                                handleEditTier(tier, tierIndex, partnerIndex)
                              }
                            >
                              {/* Image */}
                              <div
                                className={`w-full h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center cursor-pointer`}
                              >
                                {partner.imageUrl ? (
                                  <img
                                    src={concatImgURL(partner.imageUrl)}
                                    alt={partner.text}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-all duration-200"
                                  />
                                ) : (
                                  <span className="text-gray-400 text-xs">
                                    No Image
                                  </span>
                                )}
                              </div>

                              {/* Delete Button */}
                              {tier.partners.length > 1 && (
                                <Button
                                  icon={closeIcon}
                                  backgroundColor="white"
                                  className="absolute top-2 right-2 md:p-1"
                                  imageclassName="w-4 h-4"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deletePartner(tierIndex, partnerIndex);
                                  }}
                                />
                              )}

                              {/* Name */}
                              <p className="text-sm text-gray-700 font-medium text-center line-clamp-1">
                                {partner.text}
                              </p>
                            </div>
                          </SwiperSlide>
                        ),
                      )}
                    </Swiper>
                  </div>
                ))}
            </div>

            <div>
              <Button
                text="Add new tier"
                icon={plusIcon}
                className="addSideBarBtn relative"
                backgroundColor="transparent"
                onClick={handleAddNewTier}
              />
            </div>
            {open && (
              <AddTier
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleUpdateTiers}
                tierToEdit={tierToEdit}
                tierIndex={tierIndex}
                scrollToPartnerIndex={partnerIndex}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonPartners;

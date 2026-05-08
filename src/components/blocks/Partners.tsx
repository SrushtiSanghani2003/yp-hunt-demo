import { useEffect, useRef, useState } from "react";
import {
  plusIcon,
  deleteIconblack,
  arrowDownIcon,
  arrowUpIcon,
  closeIcon,
  // bentoBoxIcon,
  chevronDown,
} from "../../icons";
import Button from "../ui/button";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
import AddTier, { type TyreTypes } from "../contentPanel/AddTier";
import ContentLibrary from "../contentPanel/ContentLibrary";
import MoreFieldsEditor from "./MoreFieldsEditor";
import MoreFieldsRenderer from "./MoreFieldsRenderer";
import { Swiper, SwiperSlide } from "swiper/react";
import PartnersStyleModal from "./PartnersStyleModal";
import { concatImgURL } from "../../config/function";
import api from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import CommonPartnersView from "../common-partners/CommonPartnersView";
import { useSearchParams } from "react-router-dom";

const Partners = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const [open, setOpen] = useState(false);
  const [tierToEdit, setTierToEdit] = useState<TyreTypes | undefined>(
    undefined
  );
  const [tierIndex, setTierIndex] = useState<number | undefined>(undefined);
  const [partnerIndex, setPartnerIndex] = useState<number | undefined>(
    undefined
  );
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [moreFields, setMoreFields] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [commonPartners, setCommonPartners] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const languageCode = searchParams.get("lang");

  const tiers: TyreTypes[] = currentBlock.content?.tiers || [];

  const getPartners = async () => {
    const params = {
      language_code: languageCode || "en",
    };
    return await api.get("/common/common-partners", { params });
  };

  const { data: partnersData } = useQuery({
    queryKey: ["common-partners"],
    queryFn: getPartners,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (partnersData) {
      setCommonPartners(partnersData.data.content.tiers);
    }
  }, [partnersData]);

  const handleAddNewTier = () => {
    setTierToEdit(undefined);
    setTierIndex(undefined);
    setOpen(true);
  };

  const handleEditTier = (
    tier: TyreTypes,
    index: number,
    partnerIndex: number
  ) => {
    setTierToEdit(tier);
    setTierIndex(index);
    setPartnerIndex(partnerIndex);
    setOpen(true);
  };

  const handleUpdateTiers = (
    updatedTiers: TyreTypes[],
    updatedTierIndex?: number
  ) => {
    if (updatedTierIndex !== undefined) {
      // Editing an existing tier
      const newTiers = [...tiers];
      newTiers[updatedTierIndex] = updatedTiers[0]; // Replace the tier at the index
      onChangeBlock?.({
        ...currentBlock,
        content: {
          ...currentBlock.content,
          tiers: newTiers,
        },
      });
    } else {
      // Adding new tiers
      onChangeBlock?.({
        ...currentBlock,
        content: {
          ...currentBlock.content,
          tiers: [...(currentBlock.content.tiers || []), ...updatedTiers],
        },
      });
    }
    setOpen(false);
    setTierToEdit(undefined);
    setTierIndex(undefined);
  };

  const handleDeletePartner = (tierIndex: number, partnerIndex: number) => {
    const updatedTiers = tiers.map((tier, tIndex) => {
      if (tIndex !== tierIndex) return tier;
      if (tier.partners.length === 1) return tier; // Prevent deleting the last partner
      return {
        ...tier,
        partners: tier.partners.filter((_, pIndex) => pIndex !== partnerIndex),
      };
    });

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        tiers: updatedTiers,
      },
    });
  };

  const handleOnChange = (label: string, value: string) => {
    const updatedContent = { ...currentBlock.content };

    if (updatedContent.more?.sponsor && label in updatedContent.more.sponsor) {
      updatedContent.more = {
        ...updatedContent.more,
        sponsor: {
          ...updatedContent.more.sponsor,
          [label]: value,
        },
      };
    }

    onChangeBlock?.({
      ...currentBlock,
      content: updatedContent,
    });
  };

  const handleDeleteTier = (tierIndex: number) => {
    const updatedTiers = tiers.filter((_, index) => index !== tierIndex);
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        tiers: updatedTiers,
      },
    });
  };

  const handlePartnerStyleChange = (value: string) => {
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        is_carousel: value,
      },
    });
  };

  const handleTypeChange = (value: string) => {
    const updatedContent = { ...currentBlock.content };
    updatedContent.type = value;
    if (value == "new") updatedContent.tiers = [];
    onChangeBlock?.({
      ...currentBlock,
      content: updatedContent,
    });
  };

  useEffect(() => {
    if (!currentBlock?.content?.type) return;

    if (currentBlock.content.type === "common") {
      onChangeBlock?.({
        ...currentBlock,
        content: {
          ...currentBlock.content,
          tiers: commonPartners ?? [],
        },
      });
    }

    // if (
    //   currentBlock.content.type === "new" &&
    //   currentBlock?.content?.tiers?.length == 0
    // ) {
    //   onChangeBlock?.({
    //     ...currentBlock,
    //     content: {
    //       ...currentBlock.content,
    //       tiers: [],
    //     },
    //   });
    // }
  }, [currentBlock?.content?.type, commonPartners]);

  useEffect(() => {
    if (currentBlock.content?.more) {
      const fields = Object.keys(currentBlock.content?.more);
      setMoreFields(fields);
    }
  }, [currentBlock]);

  return (
    <>
      <div className="pb-5 border-b-primary border-b-0.5">
        <div className="relative mb-5">
          <select
            className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl"
            value={currentBlock.content?.type || ""}
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            <option value="" disabled>
              Please Select Type
            </option>
            <option value="common">Common Partners</option>
            <option value="common-with-description">
              Common Partners With Description
            </option>
            <option value="new">New</option>
          </select>
          <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
            <img src={chevronDown} />
          </div>
        </div>
        {currentBlock.content?.type === "common" && (
          <CommonPartnersView tiers={commonPartners || []} />
        )}
        {tiers.length > 0 &&
          currentBlock.content?.type != "common" &&
          tiers.map((tier, tierIndex) => (
            <div className="mb-5" key={tier.tierName}>
              <div className="relative flex items-center justify-between">
                <h3 className="text-lg mb-1 font-medium">{tier.tierName}</h3>
                <div className="flex items-center gap-2">
                  <Button
                    icon={arrowUpIcon}
                    backgroundColor="white"
                    className="md:p-1"
                    imageclassName="w-4 h-4 "
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering edit when clicking delete
                      if (tierIndex > 0) {
                        const updatedTiers = [...tiers];
                        const temp = updatedTiers[tierIndex];
                        updatedTiers[tierIndex] = updatedTiers[tierIndex - 1];
                        updatedTiers[tierIndex - 1] = temp;
                        onChangeBlock?.({
                          ...currentBlock,
                          content: {
                            ...currentBlock.content,
                            tiers: updatedTiers,
                          },
                        });
                      }
                    }}
                  />
                  <Button
                    icon={arrowDownIcon}
                    backgroundColor="white"
                    className=" md:p-1"
                    imageclassName="w-4 h-4 "
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering edit when clicking delete
                      if (tierIndex < tiers.length - 1) {
                        const updatedTiers = [...tiers];
                        const temp = updatedTiers[tierIndex];
                        updatedTiers[tierIndex] = updatedTiers[tierIndex + 1];
                        updatedTiers[tierIndex + 1] = temp;
                        onChangeBlock?.({
                          ...currentBlock,
                          content: {
                            ...currentBlock.content,
                            tiers: updatedTiers,
                          },
                        });
                      }
                    }}
                  />
                  <Button
                    icon={deleteIconblack}
                    backgroundColor="white"
                    className="md:p-1"
                    imageclassName="w-4 h-4 "
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering edit when clicking delete
                      handleDeleteTier(tierIndex);
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
                {/* <div className="mb-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-4 gap-2"> */}

                {tier.partners.map((partner: any, partnerIndex: number) => (
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
                            handleDeletePartner(tierIndex, partnerIndex);
                          }}
                        />
                      )}

                      {/* Name */}
                      <p className="text-sm text-gray-700 font-medium text-center line-clamp-1">
                        {partner.text}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}

                {/* </div> */}
              </Swiper>
            </div>
          ))}

        {currentBlock.content?.type != "common" &&
          currentBlock.content?.type !== "common-with-description" && (
            <div>
              <Button
                text="Add new tier"
                icon={plusIcon}
                className="addBtn relative"
                backgroundColor="transparent"
                onClick={handleAddNewTier}
              />
            </div>
          )}

        <MoreFieldsRenderer
          currentBlock={currentBlock}
          onChangeBlock={onChangeBlock}
          moreFields={moreFields}
          setMoreFields={setMoreFields}
        />
      </div>
      <div className="mt-4 flex items-center md:gap-5 gap-1">
        <ChangeBlockType
          currentBlock={currentBlock}
          onChangeType={onChangeType}
          types={types}
        />
        {/* <Button
          text="Change Style"
          backgroundColor="transparent"
          icon={bentoBoxIcon}
          onClick={() => setShowModal(true)}
        /> */}

        <div className="relative" ref={dropdownRef}>
          <MoreFieldsEditor
            currentBlock={currentBlock}
            moreFields={moreFields}
            setMoreFields={setMoreFields}
            onChangeBlock={onChangeBlock}
            fieldsToShow={["description"]}
          />
        </div>
      </div>
      <AddTier
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleUpdateTiers}
        tierToEdit={tierToEdit}
        tierIndex={tierIndex}
        scrollToPartnerIndex={partnerIndex}
      />
      {show && (
        <ContentLibrary
          open={show}
          onClose={() => setShow(false)}
          uploadType="sponsor"
          onSelect={(url: string) => handleOnChange("sponsor_img", url)}
          mediaFilter="image"
        />
      )}
      {showModal && (
        <PartnersStyleModal
          show={showModal}
          onClose={() => setShowModal(false)}
          isCarousel={currentBlock?.content?.is_carousel}
          onSelect={(value: any) => handlePartnerStyleChange(value)}
        />
      )}
    </>
  );
};

export default Partners;

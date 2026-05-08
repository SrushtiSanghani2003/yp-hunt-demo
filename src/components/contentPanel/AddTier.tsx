import Button from "../ui/button";
import {
  arrowDownIcon,
  arrowUpIcon,
  closeIcon,
  deleteIcon,
  mediaIcon,
  plusIcon,
} from "../../icons";
import SidebarDialog from "../ui/sidebarDialog/SidebarDialog";
import Input from "../ui/input/Input";
import React, { useEffect, useRef, useState } from "react";
import ContentLibrary from "./ContentLibrary";
import { concatImgURL } from "../../config/function";

export type TyreTypes = {
  tierName: string;
  partners: { imageUrl: string; text: string; linkUrl: string }[];
};

const AddTier = ({
  open,
  onClose,
  onSubmit,
  tierToEdit,
  tierIndex,
  scrollToPartnerIndex,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (newTier: TyreTypes[], tierIndex?: number) => void;
  tierToEdit?: TyreTypes;
  tierIndex?: number;
  scrollToPartnerIndex?: number;
}) => {
  const [tiers, setTiers] = useState<TyreTypes[]>(
    tierToEdit
      ? [{ tierName: tierToEdit.tierName, partners: [...tierToEdit.partners] }]
      : [
          {
            tierName: "",
            partners: [{ imageUrl: "", text: "", linkUrl: "" }],
          },
        ]
  );

  const partnerRefs = useRef<any>([]);
  const [show, setShow] = useState<boolean>(false);
  const [activeImageTarget, setActiveImageTarget] = useState<{
    tierIndex: number;
    partnerIndex: number;
  } | null>(null);

  useEffect(() => {
    if (open) {
      if (tierToEdit) {
        setTiers([
          { tierName: tierToEdit.tierName, partners: [...tierToEdit.partners] },
        ]);
      } else {
        setTiers([
          {
            tierName: "",
            partners: [{ imageUrl: "", text: "", linkUrl: "" }],
          },
        ]);
      }
    }
  }, [open, tierToEdit]);

  const handleChange = (
    tierIdx: number,
    field: "tierName" | "partnerField",
    value: string,
    partnerIndex?: number,
    partnerField?: "imageUrl" | "text" | "linkUrl"
  ) => {
    const updatedTiers = tiers.map((tier, tIndex) => {
      if (tIndex !== tierIdx) return tier;

      if (field === "tierName") {
        return {
          ...tier,
          tierName: value,
        };
      }

      if (
        field === "partnerField" &&
        partnerIndex !== undefined &&
        partnerField
      ) {
        return {
          ...tier,
          partners: tier.partners.map((partner, pIndex) =>
            pIndex === partnerIndex
              ? { ...partner, [partnerField]: value }
              : partner
          ),
        };
      }

      return tier;
    });

    setTiers(updatedTiers);
  };

  // const handleAddTier = () => {
  //   setTiers([
  //     ...tiers,
  //     {
  //       tierName: "",
  //       partners: [
  //         {
  //           imageUrl: "",
  //           text: "",
  //           linkUrl: "",
  //         },
  //       ],
  //     },
  //   ]);
  // };

  const handleAddPartner = (tierIdx: number) => {
    const updatedTiers = tiers.map((tier, tIndex) => {
      if (tIndex !== tierIdx) return tier;

      return {
        ...tier,
        partners: [
          ...tier.partners,
          {
            imageUrl: "",
            text: "",
            linkUrl: "",
          },
        ],
      };
    });

    setTiers(updatedTiers);
  };

  // const handleRemoveTier = (tierIdx: number) => {
  //   if (tiers.length === 1) return;
  //   const updatedTiers = tiers.filter((_, i) => i !== tierIdx);
  //   setTiers(updatedTiers);
  // };

  const handleRemovePartner = (tierIdx: number, partnerIndex: number) => {
    const updatedTiers = tiers.map((tier, tIndex) => {
      if (tIndex !== tierIdx) return tier;

      if (tier.partners.length === 1) return tier;

      return {
        ...tier,
        partners: tier.partners.filter((_, pIndex) => pIndex !== partnerIndex),
      };
    });

    setTiers(updatedTiers);
  };

  const handleMovePartner = (
    tierIdx: number,
    partnerIndex: number,
    direction: "up" | "down"
  ) => {
    const updatedTiers = [...tiers];
    const tier = updatedTiers[tierIdx];
    const partners = [...tier.partners];

    if (direction === "up" && partnerIndex > 0) {
      [partners[partnerIndex], partners[partnerIndex - 1]] = [
        partners[partnerIndex - 1],
        partners[partnerIndex],
      ];
    } else if (direction === "down" && partnerIndex < partners.length - 1) {
      [partners[partnerIndex], partners[partnerIndex + 1]] = [
        partners[partnerIndex + 1],
        partners[partnerIndex],
      ];
    } else {
      return;
    }

    updatedTiers[tierIdx] = { ...tier, partners };
    setTiers(updatedTiers);
  };

  const handleSubmit = () => {
    onSubmit(tiers, tierIndex);
    onClose();
  };

  useEffect(() => {
    if (
      scrollToPartnerIndex !== undefined &&
      partnerRefs.current[scrollToPartnerIndex]
    ) {
      partnerRefs.current[scrollToPartnerIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [scrollToPartnerIndex]);

  return (
    <>
      <SidebarDialog
        open={open}
        onClose={onClose}
        title={tierToEdit ? "Edit Tier" : "Add Tier"}
        onSubmit={handleSubmit}
        submitText="Confirm"
        cancelText="Cancel"
      >
        {tiers.map((tier, tierIdx) => (
          <div key={tierIdx} className="relative">
            <Input
              label="Name The Tier"
              value={tier.tierName}
              className="pb-3"
              onChange={(e) =>
                handleChange(tierIdx, "tierName", e.target.value)
              }
            />
            {/* 
            {tiers.length > 1 && (
              <Button
                icon={deleteIcon}
                backgroundColor="transparent"
                className="md:p-0 absolute top-0 right-0"
                onClick={() => handleRemoveTier(tierIdx)}
              />
            )} */}

            {tier.partners.map((partner, partnerIndex) => (
              <React.Fragment key={partnerIndex}>
                <div
                  ref={(el) => {
                    partnerRefs.current[partnerIndex] = el;
                  }}
                  className="border-primary border md:p-4 p-2 rounded-2xl md:mb-8 mb-4"
                >
                  <div className="flex items-center justify-between md:mb-4 mb-2">
                    <h3 className="md:text-xl/5 text-base font-extrabold">{`Partner ${
                      partnerIndex + 1
                    }`}</h3>
                    <div className="flex items-center gap-2">
                      {partnerIndex > 0 && (
                        <Button
                          icon={arrowUpIcon}
                          backgroundColor="transparent"
                          className="p-1"
                          imageclassName="w-5 h-5"
                          onClick={() =>
                            handleMovePartner(tierIdx, partnerIndex, "up")
                          }
                        />
                      )}
                      {partnerIndex < tier.partners.length - 1 && (
                        <Button
                          icon={arrowDownIcon}
                          backgroundColor="transparent"
                          className="p-1"
                          imageclassName="w-5 h-5"
                          onClick={() =>
                            handleMovePartner(tierIdx, partnerIndex, "down")
                          }
                        />
                      )}
                      {tier.partners.length > 1 && (
                        <Button
                          backgroundColor="transparent"
                          icon={deleteIcon}
                          className="p-1"
                          imageclassName="w-5 h-5"
                          onClick={() =>
                            handleRemovePartner(tierIdx, partnerIndex)
                          }
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:gap-4 gap-2 mb-5">
                    <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
                      <div className="md:w-sp170 w-20 h-full">
                        {partner.imageUrl ? (
                          <img
                            src={concatImgURL(partner.imageUrl)}
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
                          label="Partner Image URL*"
                          className="m-0"
                          value={concatImgURL(partner.imageUrl)}
                          onChange={(e) =>
                            handleChange(
                              tierIdx,
                              "partnerField",
                              e.target.value,
                              partnerIndex,
                              "imageUrl"
                            )
                          }
                          placeholder="https://www.example.com"
                        />
                        <div>
                          {partner.imageUrl ? (
                            <Button
                              text="Remove Image"
                              icon={closeIcon}
                              backgroundColor="transparent"
                              className="pb-0"
                              imageclassName="md:w-5 w-3 md:h-5 h-3"
                              onClick={() =>
                                handleChange(
                                  tierIdx,
                                  "partnerField",
                                  "",
                                  partnerIndex,
                                  "imageUrl"
                                )
                              }
                            />
                          ) : (
                            <Button
                              icon={plusIcon}
                              text="Add Image"
                              backgroundColor="transparent"
                              className="pb-0 pt-0"
                              imageclassName="md:w-5 w-3 md:h-5 h-3"
                              onClick={() => {
                                setActiveImageTarget({
                                  tierIndex: tierIdx,
                                  partnerIndex,
                                });
                                setShow(true);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <Input
                      label="Partner Text*"
                      className="m-0"
                      value={partner.text}
                      onChange={(e) =>
                        handleChange(
                          tierIdx,
                          "partnerField",
                          e.target.value,
                          partnerIndex,
                          "text"
                        )
                      }
                    />

                    <Input
                      label="Partner Link URL"
                      className="m-0"
                      value={partner.linkUrl}
                      onChange={(e) =>
                        handleChange(
                          tierIdx,
                          "partnerField",
                          e.target.value,
                          partnerIndex,
                          "linkUrl"
                        )
                      }
                      placeholder="https://www.example.com"
                    />
                  </div>
                </div>
                {partnerIndex === tier.partners.length - 1 && (
                  <Button
                    text="Add Another Partner"
                    icon={plusIcon}
                    backgroundColor="transparent"
                    className="relative addSideBarBtn"
                    onClick={() => handleAddPartner(tierIdx)}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        ))}
        {/* <Button
          text="Add Another Tier"
          icon={plusIcon}
          backgroundColor="transparent"
          className="relative addSideBarBtn"
          onClick={() => handleAddTier()}
        /> */}
      </SidebarDialog>
      {show && (
        <ContentLibrary
          open={show}
          onClose={() => setShow(false)}
          uploadType="partner"
          onSelect={(url: string) => {
            if (activeImageTarget) {
              const { tierIndex, partnerIndex } = activeImageTarget;

              const updatedTiers = [...tiers];
              updatedTiers[tierIndex].partners[partnerIndex].imageUrl = url;
              setTiers(updatedTiers);

              setShow(false);
              setActiveImageTarget(null);
            }
          }}
          mediaFilter="image"
        />
      )}
    </>
  );
};

export default AddTier;

// src/components/contentPanel/AddTier.tsx
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
  image_url: string;
  link_url: string;
};

const AddTier = ({
  open,
  onClose,
  onSubmit,
  tierToEdit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (newTier: TyreTypes[]) => void;
  tierToEdit?: TyreTypes[];
}) => {
  const [partners, setPartners] = useState<TyreTypes[]>([
    { image_url: "", link_url: "" },
  ]);

  const [show, setShow] = useState<boolean>(false);
  const partnerRefs = useRef<any>([]);
  const [activeImageTarget, setActiveImageTarget] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (open) {
      setPartners(
        tierToEdit ? [...tierToEdit] : [{ image_url: "", link_url: "" }]
      );
    }
  }, [open]);

  const handleChange = (idx: number, field: keyof TyreTypes, value: string) => {
    const updated = [...partners];
    updated[idx] = { ...updated[idx], [field]: value };
    setPartners(updated);
  };

  const handleAddPartner = () =>
    setPartners([...partners, { image_url: "", link_url: "" }]);

  const handleRemovePartner = (idx: number) => {
    if (partners.length === 1) return;
    setPartners(partners.filter((_, i) => i !== idx));
  };

  const handleMovePartner = (idx: number, dir: "up" | "down") => {
    const updated = [...partners];
    if (dir === "up" && idx > 0) {
      [updated[idx], updated[idx - 1]] = [updated[idx - 1], updated[idx]];
    } else if (dir === "down" && idx < updated.length - 1) {
      [updated[idx], updated[idx + 1]] = [updated[idx + 1], updated[idx]];
    }
    setPartners(updated);
  };

  const handleSubmit = () => {
    onSubmit(partners);
    onClose();
  };

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
        {partners.map((partner, idx) => (
          <React.Fragment key={idx}>
            <div
              ref={(el) => {
                partnerRefs.current[idx] = el;
              }}
              className="border-primary border md:p-4 p-2 rounded-2xl md:mb-8 mb-4"
            >
              <div className="flex items-center justify-between md:mb-4 mb-2">
                <h3 className="md:text-xl font-extrabold">{`Item ${
                  idx + 1
                }`}</h3>
                <div className="flex items-center gap-2">
                  {idx > 0 && (
                    <Button
                      icon={arrowUpIcon}
                      backgroundColor="transparent"
                      className="p-1"
                      imageclassName="w-5 h-5"
                      onClick={() => handleMovePartner(idx, "up")}
                    />
                  )}
                  {idx < partners.length - 1 && (
                    <Button
                      icon={arrowDownIcon}
                      backgroundColor="transparent"
                      className="p-1"
                      imageclassName="w-5 h-5"
                      onClick={() => handleMovePartner(idx, "down")}
                    />
                  )}
                  {partners.length > 1 && (
                    <Button
                      backgroundColor="transparent"
                      icon={deleteIcon}
                      className="p-1"
                      imageclassName="w-5 h-5"
                      onClick={() => handleRemovePartner(idx)}
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-col md:gap-4 gap-2 mb-5">
                <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
                  <div className="md:w-sp170 w-20 h-full">
                    {partner.image_url ? (
                      <img
                        src={concatImgURL(partner.image_url)}
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
                      label="Image URL*"
                      value={partner.image_url}
                      onChange={(e) =>
                        handleChange(idx, "image_url", e.target.value)
                      }
                      placeholder="https://www.example.com/"
                    />
                    <div>
                      {partner.image_url ? (
                        <Button
                          text="Remove Image"
                          icon={closeIcon}
                          backgroundColor="transparent"
                          onClick={() => handleChange(idx, "image_url", "")}
                        />
                      ) : (
                        <Button
                          icon={plusIcon}
                          text="Add Image"
                          backgroundColor="transparent"
                          onClick={() => {
                            setActiveImageTarget(idx);
                            setShow(true);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <Input
                  label="Link URL"
                  value={partner.link_url}
                  onChange={(e) => handleChange(idx, "link_url", e.target.value)}
                  placeholder="https://www.example.com/"
                />
              </div>
            </div>

            {idx === partners.length - 1 && (
              <Button
                text="Add Another Item"
                icon={plusIcon}
                backgroundColor="transparent"
                className="relative addSideBarBtn"
                onClick={handleAddPartner}
              />
            )}
          </React.Fragment>
        ))}
      </SidebarDialog>

      {show && (
        <ContentLibrary
          open={show}
          onClose={() => setShow(false)}
          uploadType="partner"
          mediaFilter="image"
          onSelect={(url: string) => {
            if (activeImageTarget !== null) {
              const updated = [...partners];
              updated[activeImageTarget].image_url = url;
              setPartners(updated);
              setShow(false);
              setActiveImageTarget(null);
            }
          }}
        />
      )}
    </>
  );
};

export default AddTier;

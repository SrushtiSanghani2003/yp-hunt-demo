// src/components/block/FullCalendarBlock.tsx
import { useEffect, useRef, useState } from "react";
import { mediaIcon, plusIcon, closeIcon } from "../../icons";
import Button from "../ui/button";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
import ContentLibrary from "../contentPanel/ContentLibrary";
import MoreFieldsEditor from "./MoreFieldsEditor";
import MoreFieldsRenderer from "./MoreFieldsRenderer";
import { Swiper, SwiperSlide } from "swiper/react";
import PartnersStyleModal from "./PartnersStyleModal";
import { concatImgURL } from "../../config/function";
import Input from "../ui/input/Input";
import FroalaEditor from "./FroalaEditor";
import AddTier, { type TyreTypes } from "../contentPanel/AddMultipleSponser";


const FullCalendarBlock = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const [open, setOpen] = useState(false);
  const [tierToEdit, setTierToEdit] = useState<TyreTypes[] | undefined>(
    undefined,
  );
  // const [tierIndex, setTierIndex] = useState<number | undefined>(undefined);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [moreFields, setMoreFields] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // ALWAYS A FLAT ARRAY OF OBJECTS
  const tiers: TyreTypes[] = (currentBlock.content?.tiers as TyreTypes[]) || [];

  /** ADD NEW TIER (full list of partners) */
  const handleAddNewTier = () => {
    setTierToEdit(undefined);
    // setTierIndex(undefined);
    setOpen(true);
  };

  /** EDIT TIER (we treat all partners as a single tier) */
  const handleEditTier = () => {
    setTierToEdit(tiers);
    // setTierIndex(0);
    setOpen(true);
  };

  /** SUBMIT FROM AddTier */
  const handleUpdateTiers = (updatedPartners: TyreTypes[]) => {
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        tiers: [...updatedPartners], // flat array
      },
    });

    setOpen(false);
    setTierToEdit(undefined);
    // setTierIndex(undefined);
  };

  /** DELETE SINGLE PARTNER */
  const handleDeletePartner = (index: number) => {
    const updated = tiers.filter((_, i) => i !== index);
    onChangeBlock?.({
      ...currentBlock,
      content: { ...currentBlock.content, tiers: updated },
    });
  };
  // const uploadCalendarDocument = async (file: File) => {
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const res = await api.post("/articles/upload/documents", formData);
  //     const uploaded = res?.data?.[0];

  //     if (!uploaded?.url) {
  //       throw new Error("No URL returned");
  //     }

  //     // 🔥 SET calendar_url HERE
  //     onChangeBlock?.({
  //       ...currentBlock,
  //       content: {
  //         ...currentBlock.content,
  //         calender_url: uploaded.url,
  //       },
  //     });

  //     showToast("Calendar document uploaded", "success");
  //   } catch (err) {
  //     console.error(err);
  //     showToast("Upload failed", "error");
  //   }
  // };

  // const handleCalendarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     uploadCalendarDocument(file);
  //   }
  // };

  /** CHANGE */
  const handleChange = (field: string, value: any) => {
    onChangeBlock?.({
      ...currentBlock,
      content: { ...currentBlock.content, [field]: value },
    });
  };

  useEffect(() => {
    if (currentBlock.content?.more) {
      setMoreFields(Object.keys(currentBlock.content.more));
    }
  }, [currentBlock]);

  return (
    <>
      <div className="pb-5 border-b-primary border-b-0.5">
        <Input
          label="Title"
          placeholder="Enter Title Here..."
          value={currentBlock.content.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />

        <div className="mt-2">
          <label className="block md:text-base/4 text-sm mb-2 font-medium">
            Description
          </label>
          <FroalaEditor
            model={currentBlock.content.description}
            onModelChange={(content: string) =>
              handleChange("description", content)
            }
            isDark={currentBlock?.content?.is_dark}
            onThemeChange={(value: any) => handleChange("is_dark", value)}
          />
        </div>

        {/* LIST OF PARTNERS */}
        <div className="mb-5 mt-3">
          {/* <div className="relative flex items-center justify-between mb-3">
            <div />
            {tiers.length > 0 && (
              <Button
                icon={deleteIconblack}
                backgroundColor="white"
                className="md:p-1"
                imageclassName="w-4 h-4 "
                onClick={() => handleDeletePartner(0)}
              />
            )}
          </div> */}
          {/* <div className="col-span-6">
            <Input
              label="Calendar Document"
              type="file"
              inputCss="!pr-2"
              onChange={handleCalendarFileChange}
            />

            {currentBlock.content?.calender_url && (
              <p className="text-gray-600 text-sm mt-2">
                Current file: {currentBlock.content.calender_url}
              </p>
            )}
          </div> */}
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
            {tiers.map((partner, index) => (
              <SwiperSlide key={`partner-${index}`}>
                <div className="flex flex-col gap-1 relative bg-white border-0.5 rounded-xl p-2">
                  <div
                    className={`h-32 flex items-center rounded-2xl justify-center ${
                      partner.image_url ? "" : "border-primary border-0.5"
                      } cursor-pointer`}
                    onClick={() => handleEditTier()}
                  >
                    {partner.image_url ? (
                      <img
                        src={concatImgURL(partner.image_url)}
                        alt={"media"}
                        className="h-full w-full object-cover rounded-xl"
                      />
                    ) : (
                      <img
                        src={mediaIcon}
                        alt="media"
                        className="max-h-full max-w-full"
                      />
                    )}

                    {/* {tiers.length > 1 && ( */}
                    <Button
                      icon={closeIcon}
                      backgroundColor="white"
                      className="absolute top-2 right-2 md:p-1"
                      imageclassName="w-4 h-4 "
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePartner(index);
                      }}
                    />
                    {/* )} */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {tiers.length === 0 && (
          <Button
            text="Add new tier"
            icon={plusIcon}
            className="addBtn relative mt-4"
            backgroundColor="transparent"
            onClick={handleAddNewTier}
          />
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
          />
        </div>
      </div>

      {/* SIDEBAR */}
      <AddTier
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleUpdateTiers}
        tierToEdit={tierToEdit}
      />

      {show && (
        <ContentLibrary
          open={show}
          onClose={() => setShow(false)}
          uploadType="sponsor"
          onSelect={(url: string) => handleChange("sponsor_img", url)}
          mediaFilter="image"
        />
      )}

      {showModal && (
        <PartnersStyleModal
          show={showModal}
          onClose={() => setShowModal(false)}
          isCarousel={currentBlock?.content?.is_carousel}
          onSelect={(value: any) => handleChange("is_carousel", value)}
        />
      )}
    </>
  );
};

export default FullCalendarBlock;

import { useEffect, useRef, useState } from "react";
import { bentoLayouts } from "./bentoLayouts";
import BentoModal from "./BentoModal";
import Button from "../../ui/button";
import { bentoBoxIcon } from "../../../icons";
import ChangeBlockType from "../ChangeBlockType";
import type { BlockTypeProps } from "../changeBlockTypes";
import AddBentoBox, { type BentoBoxType } from "../../contentPanel/AddBentoBox";
import ContentLibrary from "../../contentPanel/ContentLibrary";
import MoreFieldsRenderer from "../MoreFieldsRenderer";
import MoreFieldsEditor from "../MoreFieldsEditor";
import { concatImgURL } from "../../../config/function";

const BentoBox = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const [layoutKey, setLayoutKey] = useState("1V2H");
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedBentoData, setSelectedBentoData] = useState<
    BentoBoxType | undefined
  >(undefined);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [moreFields, setMoreFields] = useState<string[]>([]);
  const [show, setShow] = useState(false);

  const [bentoBoxes, setBentoBoxes] = useState(
    currentBlock.content?.bentoBoxes || []
  );
  useEffect(() => {
    if (bentoBoxes.length > 0) {
    }
  }, [bentoBoxes]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelectLayout = (selectedLayoutKey: string) => {
    setLayoutKey(selectedLayoutKey);
    setShowModal(false);

    setBentoBoxes([]);

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        bentoBoxes: [],
        bento_key: selectedLayoutKey,
      },
    });
  };

  // const updatedBentoBox = (updatedBox: any) => {
  //   if (selectedIndex !== null) {
  //     const newBoxes = [...bentoBoxes];
  //     newBoxes[selectedIndex] = updatedBox;
  //     setBentoBoxes(newBoxes);
  //     onChangeBlock?.({
  //       ...currentBlock,
  //       content: {
  //         ...currentBlock.content,
  //         bentoBoxes: [...currentBlock.content.bentoBoxes, updatedBox],
  //       },
  //     });
  //   }
  //   setShowSidebar(false);
  // };

  const updatedBentoBox = (updatedBox: BentoBoxType) => {
    if (selectedIndex !== null) {
      const newBoxes = [...bentoBoxes];

      // If index exists, replace; if not, fill missing slots with empty objects and add
      if (selectedIndex < newBoxes.length) {
        newBoxes[selectedIndex] = updatedBox;
      } else {
        // Fill empty slots if needed
        while (newBoxes.length < selectedIndex) {
          newBoxes.push({
            imgUrl: "",
            title: "",
            buttonTitle: "",
            buttonUrl: "",
            sponsorImg: "",
            sponsorText: "",
            sponsorLink: "",
          });
        }
        newBoxes.push(updatedBox);
      }

      setBentoBoxes(newBoxes);

      onChangeBlock?.({
        ...currentBlock,
        content: {
          ...currentBlock.content,
          bentoBoxes: newBoxes,
        },
      });
    }

    setShowSidebar(false);
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

  useEffect(() => {
    if (currentBlock.content?.more) {
      const fields = Object.keys(currentBlock.content?.more);
      setMoreFields(fields);
    }
    if (currentBlock.content?.bento_key) {
      setLayoutKey(currentBlock.content.bento_key);
    }
  }, [currentBlock]);

  return (
    <>
      <div className="pb-5 border-b-primary border-b-0.5">
        <div className="grid md:grid-cols-12 grid-cols-1 gap-5 auto-rows-200 md:grid-flow-dense">
          {bentoLayouts[layoutKey].map((item, i) => {
            const box = bentoBoxes[i];
            return (
              <div
                key={i}
                className={`relative cursor-pointer rounded-2xl ${item.className}`}
                onClick={() => {
                  setSelectedIndex(i),
                    setSelectedBentoData(box),
                    setShowSidebar(true);
                }}
              >
                {box?.imgUrl ? (
                  <>
                    <img
                      src={concatImgURL(box.imgUrl)}
                      alt={`Bento ${i + 1}`}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 pointer-events-none rounded-2xl bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.5)_100%)]" />
                  </>
                ) : (
                  <div className="p-4 w-full h-full bg-f6f6f6 border border-primary flex justify-start items-end rounded-2xl text-dark text-base/4 font-bold">
                    Box {i + 1}
                  </div>
                )}
                {box?.title && (
                  <p className="absolute text-white bottom-2 left-2 md:text-lg text-base font-semibold uppercase">
                    {box.title}
                  </p>
                )}
                {box?.sponsorImg && (
                  <div className="absolute top-2 left-2 w-12 h-12 overflow-hidden">
                    <img
                      src={concatImgURL(box.sponsorImg)}
                      alt={`Sponsor ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {showModal && (
          <BentoModal
            show={showModal}
            currentKey={layoutKey}
            onClose={() => setShowModal(false)}
            onSelect={handleSelectLayout}
          />
        )}
        <AddBentoBox
          open={showSidebar}
          onClose={() => setShowSidebar(false)}
          onSubmit={updatedBentoBox}
          initialData={selectedBentoData}
        />

        <MoreFieldsRenderer
          currentBlock={currentBlock}
          onChangeBlock={onChangeBlock}
          moreFields={moreFields}
          setMoreFields={setMoreFields}
        />
      </div>
      <div className="flex items-center md:gap-8 gap-2 md:mt-5 mt-2">
        <Button
          text="Change Bento Style"
          onClick={() => setShowModal(true)}
          className=""
          icon={bentoBoxIcon}
          backgroundColor="transparent"
        />

        <ChangeBlockType
          currentBlock={currentBlock}
          onChangeType={onChangeType}
          types={types}
        />
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
      {show && (
        <ContentLibrary
          open={show}
          onClose={() => setShow(false)}
          uploadType="sponsor"
          onSelect={(url: string) => handleOnChange("sponsor_img", url)}
          mediaFilter="image"
        />
      )}
    </>
  );
};

export default BentoBox;

import { useEffect, useRef, useState } from "react";
import { NewsTABS, ourspacesTABS, PageTABS, TABS } from "../heroMedia/tabs";
import Button from "../ui/button";
import { plusIcon } from "../../icons";

type TabType = "fields" | "blocks" | any;

type InserButtonProps = {
  onItemClick: (type: string) => void;
  module?: any;
};

const InsertButton = ({ onItemClick, module }: InserButtonProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedTab, setSelectedTab] = useState<TabType | null>(null);

  const optionsRef = useRef<HTMLDivElement | null>(null);

  const handleTabClick = (tab: TabType) => {
    setSelectedTab(tab);
    setShowOptions(true);
  };

  useEffect(() => {
    if (showOptions && optionsRef.current) {
      optionsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [showOptions]);

  const activeTabs =
    module === "news"
      ? NewsTABS
      : module === "page"
      ? PageTABS
      : module === "ourspaces"
      ? ourspacesTABS
      : TABS;

  return (
    <>
      <div className="">
        {/* Action Buttons */}
        <div className="flex mb-3">
          {module == "news" || module == "ourspaces" ? (
            <div className="flex md:gap-3 gap-1 p-sp6 bg-white  border-primary border-0.5 rounded-2xl">
              <Button
                text="Add Field"
                icon={plusIcon}
                className=" gap-0 p-sp10  md:rounded-2xl rounded-lg md:py-3"
                backgroundColor={`${
                  selectedTab === "fields" ? "primary" : "transparent"
                }`}
                onClick={() => {
                  handleTabClick("fields");
                }}
              />
            </div>
          ) : (
            <div className="flex md:gap-3 gap-1 p-sp6 bg-white  border-primary border-0.5 rounded-2xl">
              <Button
                text="Add Field"
                icon={plusIcon}
                className=" gap-0 p-sp10  md:rounded-2xl rounded-lg md:py-3"
                backgroundColor={`${
                  selectedTab === "fields" ? "primary" : "transparent"
                }`}
                onClick={() => {
                  handleTabClick("fields");
                }}
              />
              <Button
                text="Add Section"
                icon={plusIcon}
                className="gap-0 p-sp10  md:rounded-2xl rounded-lg md:py-3"
                backgroundColor={`${
                  selectedTab === "blocks" ? "primary" : "transparent"
                }`}
                onClick={() => {
                  handleTabClick("blocks");
                }}
              />
              <Button
                text="Add ThirdParty Block"
                icon={plusIcon}
                className="gap-0 p-sp10  md:rounded-2xl rounded-lg md:py-3"
                backgroundColor={`${
                  selectedTab === "thirdParty" ? "primary" : "transparent"
                }`}
                onClick={() => {
                  handleTabClick("thirdParty");
                }}
              />
            </div>
          )}
        </div>

        {/* Show Type Options */}
        {showOptions && selectedTab && (
          <div
            ref={optionsRef}
            className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 md:gap-sp15 gap-2 md:p-5 p-3 bg-white rounded-2xl border-0.5 border-primary"
          >
            {activeTabs[selectedTab]?.types.map(
              ({
                type,
                label,
                icon,
              }: {
                type: string;
                label: string;
                icon: string;
              }) => (
                <Button
                  key={type}
                  text={label}
                  icon={icon}
                  backgroundColor="transparent"
                  className="md:p-4 p-2 border-0.5 border-primary md:rounded-2xl rounded-lg justify-start"
                  onClick={() => {
                    onItemClick(type);
                    setShowOptions(false);
                    setSelectedTab(null);
                  }}
                />
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default InsertButton;

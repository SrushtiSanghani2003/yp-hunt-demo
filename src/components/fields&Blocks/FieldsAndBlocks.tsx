import { plusIcon } from "../../icons";
import Button from "../ui/button";

type TabType = "fields" | "blocks" | any;

interface Tab {
  label: string;
  types: { type: string; label: string; icon: string }[];
}

interface FieldsAndBlocksProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  tabs: Record<TabType, Tab>;
  onItemClick: (type: string) => void;
}

const FieldsAndBlocks = ({
  activeTab,
  setActiveTab,
  tabs,
  onItemClick,
}: FieldsAndBlocksProps) => {
  return (
    <>
      <div className="flex mb-5">
        <div className="flex border-0.5 border-primary items-center md:gap-2 bg-white rounded-2xl  p-sp6">
          {Object.entries(tabs).map(([key, { label }]) => (
            <Button
              key={key}
              text={label}
              icon={plusIcon}
              backgroundColor={`${
                activeTab === key ? "primary" : "transparent"
              }`}
              onClick={() => setActiveTab(key as TabType)}
              className={`p-sp10  md:rounded-xl rounded-lg md:py-3`}
            ></Button>
          ))}
        </div>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 md:gap-sp15 gap-2 md:p-5 p-3 bg-white rounded-2xl border-0.5 border-primary">
        {tabs[activeTab].types.map(({ type, label, icon }) => (
          <Button
            key={type}
            text={label}
            icon={icon}
            backgroundColor="transparent"
            className="md:p-4 p-3 border-0.5 border-primary md:rounded-2xl justify-start"
            onClick={() => onItemClick(type)}
          />
        ))}
      </div>
    </>
  );
};

export default FieldsAndBlocks;

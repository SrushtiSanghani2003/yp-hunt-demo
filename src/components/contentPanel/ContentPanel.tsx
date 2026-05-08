import { useState } from "react";
import {
  authenticationIcon,
  authorIcon,
  clockIcon,
  globeIcon,
  hierarchyIcon,
  navigationCheckIcon,
  partnerIcon,
  rightCircleIcon,
} from "../../icons";
import Button from "../ui/button";
import Authentication from "./Authentication";
import GeoBlocking from "./GeoBlocking";
import ReadTime from "./ReadTime";
import Author from "./Author";
import Publish from "./Publish";
import Hierarchy from "./Hierarchy";
import AddSponsor from "./AddSponsor";
import ChangeLanguage from "./ChangeLanguage";

type contentPanelProps = {
  data: any;
  onAuthsave?: (payload: any) => void;
  onGeoSave?: (payload: any) => void;
  onReadSave?: (payload: any) => void;
  onAuthorSave?: (payload: any) => void;
  onPublishSave?: (payload: any) => void;
  onHierarchySave?: (payload: any) => void;
  onSponsorSave?: (payload: any) => void;
  onLanguageSave?: (payload: any) => void;
};

const ContentPanel = ({
  data,
  onAuthsave,
  onGeoSave,
  onReadSave,
  onAuthorSave,
  onPublishSave,
  onHierarchySave,
  onSponsorSave,
  onLanguageSave,
}: contentPanelProps) => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const panelConfigs = [
    {
      key: "publish",
      icon: rightCircleIcon,
      Component: Publish,
      onSave: onPublishSave,
    },
    {
      key: "hierarchy",
      icon: hierarchyIcon,
      Component: Hierarchy,
      onSave: onHierarchySave,
    },
    {
      key: "sponsor",
      icon: partnerIcon,
      Component: AddSponsor,
      onSave: onSponsorSave,
    },
    {
      key: "auth",
      icon: authenticationIcon,
      Component: Authentication,
      onSave: onAuthsave,
    },
    {
      key: "geo",
      icon: navigationCheckIcon,
      Component: GeoBlocking,
      onSave: onGeoSave,
    },
    {
      key: "author",
      icon: authorIcon,
      Component: Author,
      onSave: onAuthorSave,
    },
    {
      key: "globe",
      icon: globeIcon,
      Component: ChangeLanguage,
      onSave: onLanguageSave,
    },
    {
      key: "readtime",
      icon: clockIcon,
      Component: ReadTime,
      onSave: onReadSave,
    },
  ];

  const filteredConfigs = panelConfigs.filter(
    ({ onSave }) => typeof onSave === "function"
  );

  return (
    <>
      <div className="bg-white lg:p-4 md:p-3 p-2  border-primary border-0.5 rounded-2xl">
        <div className="flex flex-col items-center gap-sp30">
          {filteredConfigs.map(({ key, icon }) => {
            return (
              <div className="relative group" key={key}>
                <Button
                  key={key}
                  icon={icon}
                  backgroundColor="transparent"
                  className="p-0"
                  onClick={() => setOpenModal(key)}
                />
                <span
                  className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 
                     px-2 py-1 text-xs rounded bg-black text-white opacity-0 
                     group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {openModal &&
        filteredConfigs.map(({ key, Component, onSave }) => (
          <Component
            key={key}
            open={openModal === key}
            onClose={() => setOpenModal(null)}
            data={data}
            onSave={onSave}
          />
        ))}
    </>
  );
};

export default ContentPanel;

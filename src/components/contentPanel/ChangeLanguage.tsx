import { useSearchParams } from "react-router-dom";
import { franceFlag, usaFlag } from "../../icons";
import SidebarDialog from "../ui/sidebarDialog/SidebarDialog";
import { RiExternalLinkLine } from "react-icons/ri";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLanguageCode } from "../../redux-toolkit/articleSlice";

type ChangeLanguageProps = {
  open: boolean;
  onClose: () => void;
};

const ChangeLanguage = ({ open, onClose }: ChangeLanguageProps) => {
  const [searchParams] = useSearchParams();
  const languageCode = searchParams.get("lang") || "en";
  const dispatch = useDispatch();


  const generateNewUrl = (newLang: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("lang", newLang);
    return `${window.location.pathname}?${params.toString()}`;
  };

  const handleChangeLanguage = (newLang: string) => {
    const newUrl = generateNewUrl(newLang);
    dispatch(setLanguageCode(newLang));
    window.open(newUrl, "_blank");
  };

  useEffect(() => {
    if (languageCode) {
      dispatch(setLanguageCode(languageCode));
    }
  }, [languageCode, dispatch]);

  return (
    <>
      <SidebarDialog open={open} onClose={onClose} title="Change Language">
        {languageCode === "en" && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleChangeLanguage("fr")}
          >
            <img src={franceFlag} alt="French Flag" className="w-6 h-6" />
            <span>French</span>
            <RiExternalLinkLine />
          </div>
        )}
        {languageCode === "fr" && (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleChangeLanguage("en")}
          >
            <img src={usaFlag} alt="USA Flag" className="w-6 h-6" />
            <span>English</span>
            <RiExternalLinkLine />
          </div>
        )}
      </SidebarDialog>
    </>
  );
};

export default ChangeLanguage;

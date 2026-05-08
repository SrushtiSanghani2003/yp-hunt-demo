import { useDispatch, useSelector } from "react-redux";
import { selectState } from "../redux-toolkit/disclosureSlice";
import {
  chevronDown,
  // notificationBellIcon,
  // questionMarkIcon,
  userImage,
} from "../icons";
import { useEffect, useRef, useState } from "react";
// import api from "../lib/api";
import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "../config/paths";
import { resetTabs } from "../redux-toolkit/tabSlice";
// import { useMutation } from "@tanstack/react-query";
import ConfirmLogoutModal from "../auth/ConfirmLogoutModal";
import { selectUser } from "../redux-toolkit/userDetailSlice";
import { capitalize, concatImgURL } from "../config/function";
import { useScroll } from "../hooks/ScrollContext";
import { Globe } from "lucide-react";
import {
  selectLanguage,
  selectTranslation,
  setLanguage,
  setTranslation,
} from "../redux-toolkit/languageSlice";
import ToggleSwitch from "./ui/switch/ToggleSwitch";
import { PiTranslateBold } from "react-icons/pi";
// import { resetToken } from "../redux-toolkit/tempTokenSlice";
import { useLogout } from "../hooks/useLogout";
import { showToast } from "../utils/toastUtils";
// import GoogleTranslate from "./GoogleTranslate";

const Navbar = () => {
  const params = useLocation();
  const location = useLocation();
  const hideNavbarItems =
    location.pathname === "/commonPartners" ||
    location.pathname === "/premierpredict";
  const language = useSelector(selectLanguage);
  const isTranslation = useSelector(selectTranslation);
  const { collapsed } = useSelector(selectState);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // const queryClient = useQueryClient();
  const [isLogout, setIsLogout] = useState(false);
  const user = useSelector(selectUser);
  const langRef = useRef<HTMLDivElement>(null);
  const { isHeaderFixed } = useScroll();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutMutation = useLogout();

  // const handleLogout = async () => {
  //   try {
  //     await api.post(
  //       "/auth/logout",
  //       {},
  //       { withCredentials: true }
  //     );
  //     queryClient.removeQueries({ queryKey: ["currentUser"], exact: false });
  //     navigate("/auth/login");
  //   } catch (error: any) {
  //     console.error(
  //       "Logout error:",
  //       error.response?.data?.message || error.message
  //     );
  //   }
  // };

  // const logOut = async () => {
  //   await api.post("/auth/logout", {}, { withCredentials: true });
  // };

  // const logoutMutation = useMutation({
  //   mutationFn: logOut,
  //   onSuccess: () => {
  //     // queryClient.removeQueries({ queryKey: ["currentUser"], exact: false });
  //     setIsLogout(false);
  //     dispatch(clearUserDetails());
  //     dispatch(resetToken());
  //     // navigate("/auth/login");
  //     navigate("/auth/login", { replace: true });
  //   },
  //   onError: (error: any) => {
  //     console.error(
  //       "Logout error:",
  //       error.response?.data?.message || error.message,
  //     );
  //   },
  // });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setShowLangDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAccount = () => {
    dispatch(resetTabs());
    navigate(paths.account.path);
  };
  const handleLanguageChange = (lang: string) => {
    dispatch(setLanguage(lang));
    setShowLangDropdown(false);
  };

  const handleConfitmLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setIsLogout(false);
        showToast("Logout Successfully", "success");
      },
    });
  };

  return (
    <>
      <div className={`${isHeaderFixed ? "sticky top-0 z-[99]" : ""} bg-white`}>
        <div className="flex justify-between items-center md:py-sp23 py-3 md:px-7 px-3 border border-b">
          <div
            className={`opacity-0 invisible ${
              collapsed ? "md:ms-20 ms-14" : "ms-60"
            } flex gap-2 transition-all duration-300 ease-in-out`}
          ></div>
          <div className="">
            <div className="flex items-center gap-4 ">
              {!hideNavbarItems && params.search === "" && (
                <div ref={langRef} className="relative">
                  {/* Trigger Button */}
                  <button
                    onClick={() => setShowLangDropdown((prev) => !prev)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl  
                 border border-gray-200 
                 hover:shadow-md hover:scale-[1.02] 
                 transition-all duration-200"
                  >
                    <Globe className="w-4 h-4 text-gray-600" />
                    <span className="font-semibold text-sm tracking-wide">
                      {language.toUpperCase()}
                    </span>
                    <img
                      src={chevronDown}
                      alt="chevron-down"
                      className={`w-3 h-3 transition-transform duration-200 ${
                        showLangDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  {showLangDropdown && (
                    <div
                      className="absolute right-0 mt-3 w-44 
                      bg-white/80 backdrop-blur-xl
                      rounded-2xl shadow-2xl 
                      border border-gray-200 
                      overflow-hidden z-[500]
                      animate-in fade-in zoom-in-95 duration-200"
                    >
                      <button
                        onClick={() => handleLanguageChange("en")}
                        className={`flex items-center justify-between w-full px-4 py-3 text-sm transition-all
                      hover:bg-blue-50 ${
                        language === "en"
                          ? "bg-blue-100 text-blue-600 font-semibold"
                          : "text-gray-700"
                      }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">EN</span>
                          English
                        </div>
                        {language === "en" && (
                          <span className="text-blue-600 text-xs">✓</span>
                        )}
                      </button>

                      <button
                        onClick={() => handleLanguageChange("es")}
                        className={`flex items-center justify-between w-full px-4 py-3 text-sm transition-all
                        hover:bg-blue-50 ${
                          language === "es"
                            ? "bg-blue-100 text-blue-600 font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">ES</span>
                          Spanish
                        </div>
                        {language === "es" && (
                          <span className="text-blue-600 text-xs">✓</span>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
              {/* //toggle */}

              <div
                className={`flex items-center gap-3 px-2 py-1 rounded-xl 
                border transition-all duration-300 ease-in-out
                ${
                  isTranslation
                    ? "bg-[#FFF9DB] border-[#FCD100] shadow-md shadow-[#FCD100]/30"
                    : "bg-white border-gray-200 hover:shadow-md hover:shadow-gray-200"
                }
                `}
              >
                {/* Globe Icon */}
                <div
                  className={`p-2 rounded-full transition-all duration-300
                  ${
                    isTranslation
                      ? "bg-[#FCD100] text-black rotate-12 shadow-sm"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <PiTranslateBold className="w-4 h-4 transition-transform duration-300" />
                </div>

                {/* Text Section */}
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-black">
                    Translation Mode
                  </span>

                  <span
                    className={`text-xs font-medium transition-all duration-300
                   ${isTranslation ? "text-[#C7A000] " : "text-gray-400"}`}
                  >
                    {isTranslation ? "Enabled" : "Disabled"}
                  </span>
                </div>

                {/* Toggle */}
                <div className="ml-2">
                  <ToggleSwitch
                    checked={isTranslation}
                    onChange={(value: boolean) =>
                      dispatch(setTranslation(value))
                    }
                  />
                </div>
              </div>

              {/* <SearchInput
              placeholder="Global Search"
              className="px-4 py-3 lg:w-[360px] md:w-52 "
              /> */}
              {/* <GoogleTranslate /> */}
              {/* <div>
                <img
                  src={notificationBellIcon}
                  alt="Notification"
                  className="h-[22px] w-[22px] md:h-[30px] md:w-[30px]"
                />
              </div> */}
              {/* <div className="relative border-1 rounded-full h-[30px] w-[30px] md:h-[40px] md:w-[40px]">
                <img
                  src={questionMarkIcon}
                  alt="question-mark"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[15px] w-[15px] md:h-[20px] md:w-[20px]"
                />
              </div> */}
              <div
                ref={dropdownRef}
                className="flex items-center gap-2 cursor-pointer relative"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <img
                  src={concatImgURL(user?.image) || userImage}
                  alt="panther-logo"
                  className="md:w-sp42 w-sp30 h-sp30 md:h-sp42 rounded-full"
                />
                <div className="hidden md:flex flex-col">
                  <p className="font-bold text-base">{user?.username}</p>
                  <p className="text-xs">
                    {capitalize(user?.role?.code) || "User"}
                  </p>
                </div>
                <img src={chevronDown} alt="chevron-down" />
                {showDropdown && (
                  <div className="absolute top-full mt-3 right-0 w-56 rounded-2xl bg-white shadow-xl border border-gray-200 z-[500]">
                    <div className="flex flex-col divide-y divide-gray-200">
                      <button
                        className="px-4 py-3 text-left text-sm font-medium hover:rounded-t-2xl text-gray-700 hover:bg-gray-100 "
                        onClick={handleAccount}
                      >
                        Account
                      </button>
                      <button
                        className="px-4 py-3 text-left text-sm font-medium text-red-600 hover:rounded-b-2xl hover:bg-red-50 transition-colors"
                        onClick={() => setIsLogout(true)}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLogout && (
        <ConfirmLogoutModal
          show={isLogout}
          onClose={() => setIsLogout(false)}
          onConfirm={() => handleConfitmLogout()}
          isLoading={logoutMutation.isPending}
        />
      )}
    </>
  );
};

export default Navbar;

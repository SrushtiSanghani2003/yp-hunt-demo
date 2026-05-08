import { useEffect, useState } from "react";
import { tabs, type Tab } from "./tabConfig";
import {
  changeCollapsed,
  selectState,
  toggleCollapse,
} from "../../redux-toolkit/disclosureSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  backIconLeft,
  chevronRight,
  Hunt_logo,
  PremierPadelLogo,
  toggleLeftIcon,
  toggleRightIcon,
} from "../../icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { paths } from "../../config/paths";
import { popToIndex } from "../../redux-toolkit/breadcrumbSlice";
import {
  selectTabState,
  setActiveSubTab,
  setActiveTab,
  setIsSubTab,
  setLastActiveSubTab,
  setLastActiveTab,
} from "../../redux-toolkit/tabSlice";
import api from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { buildSidebarFromApi, type SidebarTab } from "./sidebarMiddleware";
import { MENU_CONFIG } from "./sidebarConfig";
import { mapMenuPermissions } from "./menuPermissions";
import {
  setAdministrationPermissions,
  setMenuPermissions,
} from "../../redux-toolkit/menuPermissionsSlice";
// import PPLogo from '../../../public/padel-icon-yellow.svg'

const SidebarSkeleton = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <div className="space-y-3 md:mx-4 mx-2 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={`flex items-center gap-3 p-2 rounded-xl bg-f6f6f6`}
        >
          {/* Icon */}
          <div className="w-5 h-5 bg-gray-300 rounded" />

          {/* Text */}
          {!collapsed && <div className="h-4 w-32 bg-gray-300 rounded" />}
        </div>
      ))}
    </div>
  );
};

const Sidebar = () => {
  // const [isSubTab, setIsSubTab] = useState<TabLabel | null>(null);
  // const [activeTab, setActiveTab] = useState<TabLabel | null>(null);
  // const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  const { collapsed } = useSelector(selectState);
  const { isSubTab, activeTab, activeSubTab, lastActiveTab, lastActiveSubTab } =
    useSelector(selectTabState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [dynamicMenus, setDynamicMenus] = useState<SidebarTab[]>([]);

  const getDynamicSideMenu = async () => {
    return await api.get("/permissions/moduleList");
  };

  const { data: dynamicSideMenuData, isFetching } = useQuery({
    queryKey: ["dynamicSideMenu"],
    queryFn: getDynamicSideMenu,
    placeholderData: (prevData) => prevData,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (dynamicSideMenuData) {
      const tabStructure = buildSidebarFromApi(
        dynamicSideMenuData?.data,
        MENU_CONFIG,
      );
      const allPermissions = mapMenuPermissions(dynamicSideMenuData?.data);
      dispatch(setMenuPermissions(allPermissions));
      dispatch(setAdministrationPermissions(allPermissions));
      setDynamicMenus(tabStructure);
    }
  }, [dynamicSideMenuData]);

  const handleTabClick = (tab: Tab) => {
    if (tab.label === "Fixtures & Results") {
      return;
    }
    if (tab.label === "Content Library") {
      dispatch(popToIndex(0));
    }
    if (!tab.subTabs) {
      dispatch(setLastActiveTab(tab.path || null));
    }
    dispatch(setActiveTab(tab.label));
    if (tab.subTabs && tab.subTabs.length > 0) {
      dispatch(setIsSubTab(tab.label));
      dispatch(setActiveSubTab(tab.subTabs[0].label));
      navigate(tab?.subTabs[0].path);
    } else {
      dispatch(setIsSubTab(null));
      dispatch(setActiveSubTab(null));
      if (tab.path) {
        navigate(tab.path);
      }
    }
  };

  const handleSubTabClick = (label: string, path: string) => {
    dispatch(setActiveSubTab(label));
    navigate(path);
  };

  const handleBackClick = () => {
    if (lastActiveSubTab) {
      navigate(lastActiveSubTab);
      dispatch(setLastActiveSubTab(null));
    } else if (lastActiveTab) {
      navigate(lastActiveTab);
      dispatch(setIsSubTab(null));
      dispatch(setActiveSubTab(null));
    } else {
      navigate(paths.dashboard.getHref());
    }
  };

  useEffect(() => {
    if (dynamicMenus.length > 0) {
      const currentTab = dynamicMenus.find(
        (tab) =>
          location.pathname === tab.path ||
          location.pathname.includes(tab.path as string) ||
          tab.subTabs?.some((sub) => location.pathname === sub.path),
      );
      if (currentTab) {
        dispatch(setActiveTab(currentTab.label));
        if (currentTab.subTabs) {
          const currentSub = currentTab.subTabs.find(
            (sub) =>
              location.pathname === sub.path ||
              location.pathname.includes(sub.path),
          );
          if (currentSub) {
            dispatch(setActiveSubTab(currentSub.label));
          } else {
            const firstSub = currentTab.subTabs[0];
            dispatch(setActiveSubTab(firstSub.label));
            navigate(firstSub.path);
          }
          dispatch(setIsSubTab(currentTab.label));
        } else {
          dispatch(setIsSubTab(null));
          dispatch(setActiveSubTab(null));
        }
      }
    }
  }, [location.pathname, navigate, dynamicMenus]);

  useEffect(() => {
    // Automatically collapse sidebar when screen width is below 768px, expand when above
    function handleResize() {
      if (window.innerWidth < 768) {
        dispatch(changeCollapsed(true));
      } else {
        dispatch(changeCollapsed(false));
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <aside
      className={`fixed top-0 z-[100] ${collapsed ? "md:w-sp70 w-12" : "w-sp230"
        }  border-r border-f6f6f6 h-full bg-white text-black transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full">
        <div className=" relative md:mx-6 mx-3 flex items-center  justify-around md:py-sp21 py-sp11 border-b border-primary">
          {!collapsed ? (
            <>
              <Link to={paths.dashboard.getHref()}>
                <img src={Hunt_logo} alt="Panther_Logo" className="w-14" />
              </Link>
              <div className="h-12 w-sp1 bg-black"></div>
              <img
                src={PremierPadelLogo}
                alt="Premier_Padel_Icon"
                className="w-16"
              />
              {/* <img src={PPLogo} alt="Premier_Padel_Icon" className="w-10" /> */}
            </>
          ) : (
            <div className="w-full flex justify-center items-center h-sp56"></div>
          )}
          <button
            className="absolute md:top-1/2 top-1/3 -translate-y-1/2 md:-right-10 -right-7 text-white flex justify-center items-center w-sp30 h-sp30 bg-black rounded-lg self-end"
            onClick={() => dispatch(toggleCollapse())}
          >
            {collapsed ? (
              <img src={toggleRightIcon} alt="toggle" className="h-6 " />
            ) : (
              <img src={toggleLeftIcon} alt="toggle" className="h-6" />
            )}
          </button>
        </div>

        {/* Back Button if in sub-tab view */}
        {isSubTab && (
          <div className="mt-4 md:mx-4 mx-1 ">
            <button
              className={`text-base bg-dddddd text-black font-semibold py-sp10 flex items-center justify-center ${collapsed
                  ? "md:h-10 h-8 md:w-10  w-8 px-1 rounded-full"
                  : "rounded-3xl"
                } text-center w-full`}
              onClick={() => {
                handleBackClick();
                // dispatch(setIsSubTab(null));
                // dispatch(setActiveSubTab(null));
                // navigate(paths.dashboard.getHref());
                // window.history.back();
                // lastActiveTab ? navigate(lastActiveTab) : null;
              }}
            >
              {collapsed ? (
                <img src={backIconLeft} className="md:w-6 w-4 transform" />
              ) : (
                // "Back"
                <img src={backIconLeft} className="md:w-8 w-4 transform" />
              )}
            </button>
          </div>
        )}

        {/* Sidebar Content */}
        <div
          className={`flex-1 overflow-y-auto scrollbar-none  md:ps-0 ps-2 ${isSubTab ? "pt-sp20" : "md:pt-sp45 pt-sp20 "
            }`}
          style={{ scrollbarWidth: "none" }}
        >
          {!isSubTab &&
            tabs.map((tab) => {
              return (
                <div
                  key={tab.label}
                  onClick={() => handleTabClick(tab)}
                  className={`flex items-center justify-between md:p-3 p-2 md:ms-4  ms-0 rounded-3xl hover:bg-[#F6F6F6]  cursor-pointer relative ${activeTab === tab.label ? "bg-f6f6f6 curves" : ""
                    }`}
                  title={collapsed ? tab.label : undefined}
                >
                  <div className="flex items-center gap-3">
                    <div className="">
                      <img src={tab.icon} className="w-5 h-5" />
                    </div>
                    {!collapsed && (
                      <span className="text-base/4 font-medium">
                        {tab.label}
                      </span>
                    )}
                  </div>
                  {!collapsed && tab.subTabs && <img src={chevronRight} />}
                </div>
              );
            })}

          {/* {!isSubTab &&
            dynamicMenus.map((tab) => {
              return (
                <div
                  key={tab.label}
                  onClick={() => {
                    handleTabClick(tab as any);
                  }}
                  className={`flex items-center justify-between md:p-3 p-2 md:ms-4  ms-0 rounded-3xl hover:bg-[#F6F6F6]  cursor-pointer relative ${
                    activeTab === tab.label ? "bg-f6f6f6 curves" : ""
                  }`}
                  title={collapsed ? tab.label : undefined}
                >
                  <div className="flex items-center gap-3">
                    <div className="">
                      <img src={tab.icon} className="w-5 h-5" />
                    </div>
                    {!collapsed && (
                      <span className="text-base/4 font-medium">
                        {tab.label}
                      </span>
                    )}
                  </div>
                  {!collapsed && tab.subTabs && <img src={chevronRight} />}
                </div>
              );
            })} */}

          {isSubTab &&
            dynamicMenus
              .find((t) => t.label === isSubTab)
              ?.subTabs?.map((sub) => (
                <div
                  key={sub.label}
                  onClick={() => handleSubTabClick(sub.label, sub.path)}
                  className={`flex md:ms-4 ms-0 items-center gap-3 md:p-3 p-2 relative rounded-3xl cursor-pointer ${activeSubTab === sub.label ? "bg-f6f6f6 curves" : ""
                    }`}
                >
                  <div className="text-lg">{sub.icon}</div>
                  {!collapsed && (
                    <span className="text-base/4 font-medium">{sub.label}</span>
                  )}
                </div>
              ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

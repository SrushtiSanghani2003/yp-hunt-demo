import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  avatarIcon,
  avatarIconWhite,
  gridAddIcon,
  gridAddIconWhite,
  tagIcon,
  tagIconWhite,
  userIcon,
  userIconWhite,
} from "../../icons";
import Button from "../ui/button";
import { useSelector } from "react-redux";
import { selectAdministrationPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { useEffect, useMemo, useState } from "react";

const AccountLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabDate, setTabDate] = useState(null);
  const administrationTabs: any = useSelector(selectAdministrationPermissions);
  // const tabs = [
  //   {
  //     name: "Profile Settings",
  //     path: "/account",
  //     icon: avatarIcon,
  //     iconWhite: avatarIconWhite,
  //   },
  //   {
  //     name: "Tag Management",
  //     path: "/account/tags",
  //     icon: tagIcon,
  //     iconWhite: tagIconWhite,
  //   },
  //   {
  //     name: "Categories",
  //     path: "/account/categories",
  //     icon: gridAddIcon,
  //     iconWhite: gridAddIconWhite,
  //   },
  //   {
  //     name: "Account Management",
  //     path: "/account/manage",
  //     icon: userIcon,
  //     iconWhite: userIconWhite,
  //   },
  //   // {
  //   //   name: "Module",
  //   //   path: "/account/module",
  //   //   icon: userIcon,
  //   //   iconWhite: userIconWhite,
  //   // },
  //   {
  //     name: "Role Management",
  //     path: "/account/roles",
  //     icon: userIcon,
  //     iconWhite: userIconWhite,
  //   },
  // ];
  const moduleConfig: Record<
    string,
    { path: string; icon: any; iconWhite: any }
  > = {
    profile_settings: {
      path: "/account",
      icon: avatarIcon,
      iconWhite: avatarIconWhite,
    },
    tag_management: {
      path: "/account/tags",
      icon: tagIcon,
      iconWhite: tagIconWhite,
    },
    categories: {
      path: "/account/categories",
      icon: gridAddIcon,
      iconWhite: gridAddIconWhite,
    },
    account_management: {
      path: "/account/manage",
      icon: userIcon,
      iconWhite: userIconWhite,
    },
    roles: {
      path: "/account/roles",
      icon: userIcon,
      iconWhite: userIconWhite,
    },
  };

  const tabs = useMemo(() => {
    if (!tabDate) return [];

    return Object.entries(tabDate)
      .filter(([_, module]: any) => module.permissions?.list === true)
      .map(([moduleCode, module]: any) => {
        const config = moduleConfig[moduleCode];
        if (!config) return null;

        return {
          name: module.module_name,
          path: config.path,
          icon: config.icon,
          iconWhite: config.iconWhite,
        };
      })
      .filter(Boolean);
  }, [tabDate]);
  useEffect(() => {
    if (administrationTabs) {
      setTabDate(administrationTabs);
    }
  }, [administrationTabs]);
  return (
    <div className="grid grid-cols-1">
      <div className="md:mt-10 mt-4">
        {/* <h2 className="text-22 font-extrabold md:mb-10 mb-5 ps-2">Account Settings</h2> */}
        <div className="container flex overflow-x-auto lg:gap-6 gap-4  md:mb-8 pb-2   mb-2 scrollbar-none">
          {tabs?.map((tab: any, idx: number) => {
            const isActive =
              tab.path === "/account"
                ? location.pathname === "/account" ||
                  location.pathname === "/account/edit"
                : location.pathname.startsWith(tab.path);
            return (
              <Button
                key={idx}
                text={
                  window.innerWidth < 768
                    ? tab.name.length > 15
                      ? `${tab.name.slice(0, 12)}...`
                      : tab.name
                    : tab.name
                }
                icon={isActive ? tab.icon : tab.iconWhite}
                backgroundColor="transparent"
                onClick={() => navigate(tab.path)}
                className={` py-2  px-2 lg:w-60 border-0.5 ${
                  isActive
                    ? " bg-primary text-black font-semibold"
                    : " bg-black text-white "
                }`}
                textSize="lg:text-sm/3 md:text-xs md:w-30 w-44  "
              />
            );
          })}
        </div>

        <div className="grid grid-cols-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;

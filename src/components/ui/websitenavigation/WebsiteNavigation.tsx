// HeaderSettings.tsx
"use client";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NestedTree from "./NestedTree";
import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { selectLanguage } from "../../../redux-toolkit/languageSlice";
import { capitalize } from "../../../config/function";
import api from "../../../lib/api";
import { popToIndex } from "../../../redux-toolkit/breadcrumbSlice";
import { paths } from "../../../config/paths";
import ContentHeader from "../../Subnavbar";
import Button from "../button";
import { selectMenuPermissions } from "../../../redux-toolkit/menuPermissionsSlice";
import { getPermissionFlags } from "../../sidebar/menuPermissions";
import { useScroll } from "../../../hooks/ScrollContext";

type MenuItem = {
  id: number;
  title: string;
  display_on?: string;
  languages?: string[];
  children?: MenuItem[];
  sort_order?: number; // we will add this locally
};

export default function WebsiteNavigation() {
  const location = useLocation();
  const { isScrolled } = useScroll();
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuPermissions = useSelector(selectMenuPermissions);
  const { isCreate, isChangeOrder } = getPermissionFlags(
    menuPermissions.navigation,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadCrumbsItem = [
    { id: null, name: "Home" },
    ...pathParts.map((part, index) => ({
      id: "/" + pathParts.slice(0, index + 1).join("/"),
      name: capitalize(part),
    })),
  ];

  const getNavigationList = async ({
    queryKey,
  }: QueryFunctionContext<[string, string]>) => {
    const [, language] = queryKey;
    const params: Record<string, any> = {
      language_code: language,

      limit: 8,
    };

    return await api.get("/menu/getAllMenus", { params });
  };

  const { data: navigationList } = useQuery({
    queryKey: ["navigation", language],
    queryFn: getNavigationList,
    refetchOnWindowFocus: false,
  });

  // Local state copy of menus so we can mutate order locally without changing server data
  const [menus, setMenus] = useState<MenuItem[]>([]);

  // Convert API response to our local menus (add short_order)
  useEffect(() => {
    const payload = navigationList?.data ?? navigationList;
    if (!payload) return;

    const cloneAndAddOrder = (items: any[]): MenuItem[] => {
      return (items || []).map((it: any, idx: number) => {
        const children = cloneAndAddOrder(it.children || []);
        return {
          ...it,
          children,
          sort_order: idx + 1, // initial order per siblings
        } as MenuItem;
      });
    };

    setMenus(cloneAndAddOrder(payload));
  }, [navigationList?.data]);

  // Handler called by NestedTree when a sibling reorder occurs.
  // parentPath identifies location to update (list of ids to traverse)
  const handleUpdateChildrenForParent = (
    parentPath: number[],
    newChildren: MenuItem[],
  ) => {
    const newMenus = JSON.parse(JSON.stringify(menus)) as MenuItem[];

    const setAtPath = (list: MenuItem[], path: number[]): MenuItem[] => {
      if (path.length === 0) {
        // Update root children
        return newChildren.map((c, idx) => ({ ...c, sort_order: idx + 1 }));
      }

      const idToFind = path[0];
      const found = list.find((l) => l.id === idToFind);
      if (!found) return list;

      if (path.length === 1) {
        // We reached the parent → update its children
        found.children = newChildren.map((c, idx) => ({
          ...c,
          sort_order: idx + 1,
        }));
        return list;
      }

      // Go deeper
      found.children = setAtPath(found.children || [], path.slice(1));
      return list;
    };

    const updated = setAtPath(newMenus, parentPath);

    setMenus(updated);
    setIsDirty(true);
  };

  // Assign short_order recursively across whole menu structure (for sending to API)
  const buildPayloadWithOrders = (items: MenuItem[]) => {
    return items.map((it, idx) => {
      const copy: any = {
        ...it,
        sort_order: it.sort_order ?? idx,
      };
      if (it.children && it.children.length > 0) {
        copy.children = buildPayloadWithOrders(it.children);
      }
      return copy;
    });
  };

  const handleSaveOrder = async () => {
    try {
      setIsLoading(true);
      const payload = buildPayloadWithOrders(menus);
      await api.post("/menu/updateOrder", payload);
      toast.success("Order saved successfully");
      setIsDirty(false);
    } catch (err) {
      console.error("Failed to save order", err);
      alert("Failed to save order");
    } finally {
      setIsLoading(false); // ✅ loader stop (success / error both)
    }
  };

  const handleBreadcrumbClick = (id: string | null, index: number) => {
    dispatch(popToIndex(index));
    navigate(id ? `/dashboard` : `/dashboard`);
  };
  const handleCreate = () => {
    navigate(paths.navigation.create.getHref());
  };

  return (
    <div>
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <ContentHeader
          title="Navigation"
          breadCrumbsItem={breadCrumbsItem}
          onBreadCrumbClick={handleBreadcrumbClick}
          disableCreate={!isCreate}
          onCreate={handleCreate}
          searchbar={false}
          // searchInput={searchInput}
          // setSearchInput={setSearchInput}
          /** PROPS FOR FILTER VIEW **/
          // showDropdown={showDropdown}
          // toggleDropdown={toggleDropdown}
          // closeDropdown={closeDropdown}
          // columns={columns}
          // tempVisibleColumns={tempVisibleColumns}
          // handleTempToggle={handleTempToggle}
          // applyColumnChanges={applyColumnChanges}
          // defaultVisibleColumns={defaultVisibleColumns}
        />
      </div>
      <div className="container ">
        <div className="flex gap-2 justify-end">
          {/* <button
            disabled={!isDirty}
            onClick={handleSaveOrder}
            className={`
    px-4 py-2 rounded-md shadow-sm
    ${
      isDirty
        ? "flex items-center justify-center gap-2 px-6 py-2 rounded-xl font-medium text-sm md:text-base bg-gradient-to-r from-blue-800 to-blue-500 text-gray-100 shadow-md hover:shadow-lg hover:from-gray-700 hover:to-gray-600 active:scale-95 transition-all duration-200 ease-in-out"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }
  `}
          >
            Save Order
          </button> */}
          <div className="relative group inline-block">
            <Button
              text="Save Order"
              disabled={!isDirty || !isChangeOrder}
              onClick={handleSaveOrder}
              isLoading={isLoading}
              className={`border-fcd100 border-0.5 px-3 py-sp10 ${
                !isDirty
                  ? "bg-transparent border-primary opacity-25 cursor-not-allowed"
                  : !isChangeOrder && "opacity-50 cursor-not-allowed"
              }`}
            />

            {!isDirty && (
              <div
                className="
      absolute bottom-full -left-2/3 -translate-x-1/4 mb-1
      max-w-max
      rounded-md bg-black px-3 py-2 text-xs text-white text-center
      opacity-0 group-hover:opacity-100
      transition-opacity duration-200
      pointer-events-none
      whitespace-nowrap
    "
              >
                Change the order to activate this button
              </div>
            )}
          </div>
        </div>

        <div>
          {menus.map((menu) => (
            <NestedTree
              key={menu.id}
              data={menu}
              parentPath={[menu.id]} // parentPath points to this menu's id for children updates
              onUpdateChildren={handleUpdateChildrenForParent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

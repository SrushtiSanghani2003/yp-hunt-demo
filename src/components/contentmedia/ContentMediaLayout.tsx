import { useEffect, useState } from "react";
import MediaCreateModal from "./MediaCreateModal";
import FolderCreate from "./FolderCreate";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  popToIndex,
  selectBreadCrumbs,
  setCrumbs,
} from "../../redux-toolkit/breadcrumbSlice";
import ContentMediaHeader from "./ContentLibraryHeader";
import { useDebounce } from "../../hooks/useDebounce";
import { selectMenuPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { getPermissionFlags } from "../sidebar/menuPermissions";
import { useScroll } from "../../hooks/ScrollContext";

const ContentMediaLayout = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showFolderCreate, setShowFolderCreate] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isScrolled } = useScroll();
  const debouncedSearch = useDebounce(searchInput, 300);
  const menuPermissions = useSelector(selectMenuPermissions);
  const { isCreate } = getPermissionFlags(menuPermissions.content_library);
  // const location = useLocation();
  // const pathParts = location.pathname
  //   .split("/")
  //   .filter(Boolean)
  //   .map(capitalize);
  // const breadCrumbsItem = ["Home", "Contentmedia"];
  const { crumbs } = useSelector(selectBreadCrumbs);

  const handleBreadcrumbClick = (id: string | null, index: number) => {
    dispatch(popToIndex(index));
    navigate(id ? `/contentmedia/${id}` : `/contentmedia`);
  };

  useEffect(() => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    const currentId =
      pathParts.length > 1 ? pathParts[pathParts.length - 1] : null;

    if (!currentId) {
      // If path is just "/contentmedia", reset to Home
      dispatch(setCrumbs([{ id: null, name: "Home" }]));
      return;
    }

    const index = crumbs.findIndex((crumb: any) => crumb.id === currentId);

    if (index !== -1 && index < crumbs.length - 1) {
      // Truncate the crumbs to this index
      const updatedCrumbs = crumbs.slice(0, index + 1);
      dispatch(setCrumbs(updatedCrumbs));
    }
  }, [location.pathname]);

  const handleCreate = () => {
    setShowCreate(true);
  };

  return (
    <>
      <div className="pb-2">
        <div
          className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
            isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
          }`}
        >
          <ContentMediaHeader
            title="Content Library"
            breadCrumbsItem={crumbs}
            onBreadCrumbClick={handleBreadcrumbClick}
            buttonname="New Folder"
            createbuttonname="New"
            onTempelate={() => setShowFolderCreate(true)}
            onCreate={handleCreate}
            disableCreate={!isCreate}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </div>
        <div className="flex w-full justify-end items-center gap-4">
          {/* <div>
            <img src={homeIcon} alt="" />
          </div>
          <div>
            <img src={right_box} alt="" />
          </div>{" "}
          <div>
            <img src={filterIcon} alt="" />
          </div> */}
        </div>

        <MediaCreateModal
          show={showCreate}
          onClose={() => setShowCreate(false)}
        />
        <FolderCreate
          show={showFolderCreate}
          onClose={() => setShowFolderCreate(false)}
        />

        <div className="container mx-auto">
          <Outlet context={{ debouncedSearch, viewMode }} />
        </div>
      </div>
    </>
  );
};

export default ContentMediaLayout;

import SearchInput from "../ui/searchInput";
import { fileIcon, gridIcon, list, plusIcon } from "../../icons";
import Button from "../ui/button";
import BreadCrump, { type Crumb } from "../ui/breadCrumb";

type ContentMediaHeaderProps = {
  title: string;
  buttonname?: string;
  createbuttonname?: string;
  breadCrumbsItem: Crumb[];
  onBreadCrumbClick?: (id: string | null, index: number) => void;
  onTempelate?: () => void;
  onCreate?: () => void;
  disableCreate?: boolean;
  searchInput?: string;
  setSearchInput?: (value: string) => void;
  setSearchTitle?: (value: string) => void;
  viewMode?: "grid" | "list";
  setViewMode?: (mode: "grid" | "list") => void;
};

const ContentMediaHeader = ({
  title,
  buttonname,
  createbuttonname,
  breadCrumbsItem,
  onBreadCrumbClick,
  onTempelate,
  onCreate,
  disableCreate,
  searchInput,
  setSearchInput,
  setSearchTitle,
  viewMode = "grid",
  setViewMode,
}: ContentMediaHeaderProps) => {
  return (
    <div className="md:flex gap-2 justify-between">
      {/* Left Section */}
      <div className="flex-1">
        <h1 className="text-2xl font-extrabold text-black my-2">{title}</h1>
        <BreadCrump items={breadCrumbsItem} onItemClick={onBreadCrumbClick} />
      </div>

      {/* Right Section */}
      <div className="md:flex items-end gap-3 justify-end">
        <div className="flex justify-end items-center ">
          <div className="w-max rounded-xl border-primary border flex">
            <button
              type="button"
              className={`text-3xl md:p-2 p-2 rounded-xl ${
                viewMode === "grid"
                  ? "bg-white relative border-r border-gray-300"
                  : ""
              }`}
              onClick={() => setViewMode?.("grid")}
            >
              <img src={gridIcon} alt="" />
            </button>
            <button
              type="button"
              className={`text-3xl md:p-2 p-2 rounded-xl ${
                viewMode === "list"
                  ? "bg-white relative border-l border-gray-300"
                  : ""
              }`}
              onClick={() => setViewMode?.("list")}
            >
              <img src={list} alt="" />
            </button>
          </div>
        </div>

        <div className="items-center pt-3 md:pt-0">
          <div className="flex gap-3 justify-end md:justify-end pb-3">
            {/* Buttons */}
            {onTempelate && (
              <Button
                text={buttonname}
                icon={fileIcon}
                disabled={disableCreate}
                backgroundColor="transparent"
                onClick={onTempelate}
                className={`border border-primary text-black md:px-5 px-4 md:py-2 py-2 rounded-2xl text-sm font-medium transition ${
                  disableCreate ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
            )}
            <Button
              text={createbuttonname}
              icon={plusIcon}
              disabled={disableCreate}
              onClick={onCreate}
              className={`flex items-center gap-2 bg-primary  text-black md:px-5 px-4 md:py-2 py-2 rounded-2xl text-sm font-medium transition ${
                disableCreate ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>
          {/* Search */}
          <div className="relative">
            <SearchInput
              placeholder="Local Search"
              className="px-4 py-3 text-xs"
              value={searchInput}
              onChange={setSearchInput}
              onEnter={() => {
                if (setSearchTitle) setSearchTitle(searchInput ?? "");
              }}
              onClear={() => {
                if (setSearchTitle) setSearchTitle("");
              }}
            />
          </div>

          {/* Icons */}
          {/* <div className="flex items-center justify-end gap-2">
          <button className="p-2 rounded hover:bg-gray-200">
            <Folder size={18} />
          </button>
          <button className="p-2 rounded hover:bg-gray-200">
            <CheckSquare size={18} />
          </button>
          <button className="p-2 rounded hover:bg-gray-200">
            <Filter size={18} />
          </button>
          <div className="flex justify-end">
            <div className="w-max rounded-2xl border-primary border flex">
              <button
                type="button"
                className="text-3xl md:p-4 p-2 rounded-2xl bg-white relative border border-gray-300"
              >
              <img src={grid_image} alt="" />
              </button>
              <button type="button" className="text-3xl md:p-4 p-2 rounded-2xl ">
               <img src={list} alt="" />
              </button>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default ContentMediaHeader;

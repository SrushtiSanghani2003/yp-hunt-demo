import SearchInput from "./ui/searchInput";
import {
  correctIcon,
  // correctIcon,
  customViewIcon,
  fileIcon,
  filterIcon,
  plusIcon,
} from "../icons";
import Button from "./ui/button";
import BreadCrump, { type Crumb } from "./ui/breadCrumb";

type ContentHeaderProps = {
  title: string;
  breadCrumbsItem: Crumb[];
  searchbar?: boolean;
  showSearchInput?: boolean;
  onBreadCrumbClick?: (id: string | null, index: number) => void;
  onTempelate?: () => void;
  onCreate?: () => void;
  onCreateLoading?: boolean;
  disableCreate?: boolean;
  toggleFilter?: () => void;
  isFilterActive?: boolean;
  searchInput?: string;
  setSearchInput?: (value: string) => void;
  saveOnButtonTitle?: string;
  showDropdown?: boolean;
  toggleDropdown?: () => void;
  closeDropdown?: () => void;
  columns?: { title: string }[];
  tempVisibleColumns?: string[];
  handleTempToggle?: (title: string) => void;
  applyColumnChanges?: () => void;
  defaultVisibleColumns?: string[];
};

const ContentHeader = ({
  title,
  breadCrumbsItem,
  onBreadCrumbClick,
  searchbar: searchbar = true,
  showSearchInput,
  onTempelate,
  onCreate,
  onCreateLoading,
  disableCreate,
  saveOnButtonTitle,
  searchInput,
  setSearchInput,
  showDropdown,
  toggleDropdown,
  toggleFilter,
  isFilterActive,
  closeDropdown,
  columns,
  tempVisibleColumns,
  handleTempToggle,
  applyColumnChanges,
  defaultVisibleColumns,
}: ContentHeaderProps) => {
  return (
    <div className="lg:flex items-end justify-between">
      {/* Left Section */}
      <div>
        <h1 className=" text-2xl font-extrabold text-black md:mb-6 mb-3">
          {title}
        </h1>
        <BreadCrump items={breadCrumbsItem} onItemClick={onBreadCrumbClick} />
      </div>

      {/* Right Section */}
      {/* <div> */}
      <div>
        <div className="flex md:gap-4 gap-2 justify-end md:justify-end mb-3 md:mt-0 mt-3">
          {onTempelate && (
            <Button
              text="From Template"
              icon={fileIcon}
              backgroundColor="transparent"
              onClick={onTempelate}
              className="border border-primary text-black md:px-5 px-1 md:py-2 py-0 rounded-xl  text-sm font-medium hover:bg-primary transition"
            />
          )}
          {onCreate && (
            <Button
              text={saveOnButtonTitle ? saveOnButtonTitle : "Create"}
              icon={plusIcon}
              onClick={onCreate}
              disabled={onCreateLoading || disableCreate}
              className={`flex items-center gap-2 bg-primary text-black md:px-4 px-2 md:py-2 py-2 rounded-xl text-sm font-medium transition ${
                disableCreate ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          )}
        </div>

        <div className="flex justify-end gap-3 ">
          {toggleDropdown && (
            <div className="relative sm:order-1  order-2 flex md:gap-3 gap-2 items-center justify-end md:pr-3 pr-1">
              <Button
                icon={customViewIcon}
                backgroundColor="transparent"
                className="p-0"
                imageclassName="w-6 h-6"
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <>
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[400]"
                    onClick={closeDropdown}
                  ></div>

                  <div
                    className="absolute top-full mt-2  bg-white p-4 rounded-2xl shadow-md w-64 z-[500]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-base/4 font-bold mb-5">
                      Customize Your View
                    </h3>
                    <div
                      className={`flex flex-col gap-2 mb-6 ${
                        columns && columns?.length > 9 ? "h-80" : "h-auto"
                      } overflow-y-auto`}
                    >
                      {columns?.map((col) => (
                        <div
                          className="flex items-center gap-sp6"
                          key={col.title}
                        >
                          <input
                            type="checkbox"
                            id={`display-${col.title}`}
                            checked={tempVisibleColumns?.includes(col.title)}
                            onChange={() => handleTempToggle?.(col.title)}
                            disabled={defaultVisibleColumns?.includes(
                              col.title,
                            )}
                            className={`peer hidden ${
                              defaultVisibleColumns?.includes(col.title)
                                ? "opacity-50 "
                                : ""
                            }`}
                          />
                          <label
                            htmlFor={`display-${col.title}`}
                            className="w-5 h-5 m-0 flex items-center  justify-center border border-gray-400 rounded 
                        peer-checked:bg-black peer-checked:border-black"
                          >
                            {<img src={correctIcon} alt="Right" />}
                          </label>
                          <label
                            className={` text-black font-medium text-base ${
                              defaultVisibleColumns?.includes(col.title)
                                ? "opacity-50 text-gray-500 cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                            htmlFor={`display-${col.title}`}
                          >
                            {col.title}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-sp10 justify-end">
                      <Button
                        onClick={closeDropdown}
                        className="border-primary border-0.5 px-4 py-sp10"
                        text="Cancel"
                        backgroundColor="transparent"
                      />
                      <Button
                        onClick={applyColumnChanges}
                        className="border-fcd100 border-0.5 px-4 py-sp10"
                        text="Apply"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          {toggleFilter && (
            <div className="relative group">
              <Button
                icon={filterIcon}
                backgroundColor="transparent"
                className="p-0"
                imageclassName="w-6 h-6"
                onClick={toggleFilter}
              />

              {/* Red Dot */}
              {isFilterActive && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              )}

              {/* Tooltip */}
              <div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 
                      bg-black text-white text-xs px-2 py-1 rounded-md 
                      opacity-0 group-hover:opacity-100 
                      transition-opacity duration-200 
                      whitespace-nowrap pointer-events-none z-50"
              >
                {isFilterActive ? "Filter Applied" : "Filter Apply"}
              </div>
            </div>
          )}
          <div className=" flex justify-end md:mt-0 relative order-1 sm:order-2">
            {!showSearchInput && searchbar && (
              <SearchInput
                placeholder="Search by ..."
                className="sm:ps-4 px-2 pe-8 sm:py-3 py-2 text-xs md:w-[320px] w-max rounded-xl"
                value={searchInput}
                onChange={setSearchInput}
                onClear={() => {
                  if (setSearchInput) {
                    setSearchInput("");
                  }
                }}
              />
            )}
          </div>
        </div>
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
      {/* </div> */}
    </div>
  );
};

export default ContentHeader;

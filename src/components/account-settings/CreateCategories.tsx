import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../ui/button";
import { closeIcon } from "../../icons";
import Input from "../ui/input/Input";
import Select, {
  type CSSObjectWithLabel,
  type StylesConfig,
} from "react-select";
import { useEffect, useState } from "react";
import type { Category } from "./Categories";

type CreateCategoryType = {
  show: boolean;
  onClose: () => void;
  onCreate: (newCate: { name: string; module_ids: number[] }) => void;
  onUpdate: (updateCate: {
    id: string;
    name: string;
    module_ids: number[];
  }) => void;
  isLoading: boolean;
  editData: Category | null;
};

export const customStyles: StylesConfig<any, true> = {
  control: (base: CSSObjectWithLabel) => ({
    ...base,
    padding: "3px",
    borderRadius: "12px",
    borderColor: "#ACACAC",
    boxShadow: "none",
    "&:hover": { borderColor: "black" },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: "200px", 
    overflowY: "auto",
  }),
  multiValue: (base: CSSObjectWithLabel) => ({
    ...base,
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    padding: "2px 6px",
  }),
  option: (
    base: CSSObjectWithLabel,
    state: { isSelected: boolean; isFocused: boolean },
  ) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#000"
      : state.isFocused
        ? "#eee"
        : "#fff",
    color: state.isSelected ? "#fff" : "#000",
    cursor: "pointer",
  }),
};

const CreateCategories = ({
  show,
  onClose,
  onCreate,
  onUpdate,
  isLoading,
  editData,
}: CreateCategoryType) => {
  const rawModules = [
    {
      id: 1,
      name: "News",
      description: null,
      is_active: true,
      deleted_at: null,
    },
    // {
    //   id: 2,
    //   name: "Article",
    //   description: null,
    //   is_active: true,
    //   deleted_at: null,
    // },
    {
      id: 3,
      name: "Videos",
      description: null,
      is_active: true,
      deleted_at: null,
    },
    {
      id: 4,
      name: "Image",
      description: null,
      is_active: true,
      deleted_at: null,
    },
    {
      id: 5,
      name: "Page",
      description: null,
      is_active: true,
      deleted_at: null,
    },
    // {
    //   id: 6,
    //   name: "Shop",
    //   description: null,
    //   is_active: true,
    //   deleted_at: null,
    // },
    {
      id: 7,
      name: "Event",
      description: null,
      is_active: true,
      deleted_at: null,
    },
  ];

  const selectAllOption = { value: "*", label: "Select All" };
  const modulesOptions: any = [
    selectAllOption,
    ...rawModules.map((mod) => ({
      value: mod.id,
      label: mod.name,
    })),
  ];
  const [moduleIds, setModuleIds] = useState<number[]>([]);
  const [categoryName, setCategoryName] = useState("");

  const allModuleIds = rawModules.map((mod) => mod.id);
  const isAllSelected = allModuleIds.every((id) => moduleIds.includes(id));

  const handleModulesChange = (selectedOptions: any) => {
    if (!selectedOptions || selectedOptions.length === 0) {
      setModuleIds([]);
      return;
    }

    const isSelectAllSelected = selectedOptions.some(
      (opt: any) => opt.value === "*",
    );

    if (isSelectAllSelected) {
      setModuleIds(allModuleIds);
    } else {
      setModuleIds(selectedOptions.map((opt: any) => opt.value));
    }
  };

  const selectedValues = modulesOptions.filter(
    (opt: any) => opt.value !== "*" && moduleIds.includes(opt.value),
  );

  useEffect(() => {
    if (editData) {
      setCategoryName(editData.name);
      const moduleIdsFromEditData =
        editData.modules?.map((mod) => mod.id) || [];
      setModuleIds(moduleIdsFromEditData);
    } else {
      setCategoryName("");
      setModuleIds([]);
    }
  }, [editData, show]);

  const handleSubmit = () => {
    if (editData && onUpdate) {
      onUpdate({
        id: String(editData.id),
        name: categoryName,
        module_ids: moduleIds,
      });
    } else {
      onCreate({ name: categoryName, module_ids: moduleIds });
    }
  };

  return (
    <div>
      <Dialog
        open={show}
        onClose={() => {}}
        transition
        className="fixed inset-0 z-[500] flex items-center justify-center transition duration-300 ease-out data-closed:opacity-0"
      >
        <div className="fixed inset-0 bg-black/55" aria-hidden="true" />

        <DialogPanel className="max-w-lg relative z-10 bg-white rounded-2xl p-6 w-full border border-primary">
          <div className="flex items-center justify-between mb-6">
            <DialogTitle as="h2" className="text-2xl/6 font-extrabold">
              {editData ? "Edit Category" : "Create Category"}
            </DialogTitle>
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="p-0"
              onClick={onClose}
            />
          </div>

          <div>
            <Input
              placeholder="Categories Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category" className="block my-2">
              Allow Modules
            </label>
            <Select
              // options={modulesOptions}
              options={
                isAllSelected
                  ? modulesOptions.filter((opt: any) => opt.value !== "*")
                  : modulesOptions
              }
              isMulti
              styles={customStyles}
              // value={
              //   isAllSelected
              //     ? modulesOptions.filter((opt: any) => opt.value !== "*")
              //     : selectedValues
              // }
              value={selectedValues}
              onChange={handleModulesChange}
              placeholder="Select Modules"
            />
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button
              text="Cancel"
              onClick={onClose}
              className="px-5 border-primary border-0.5"
              backgroundColor="transparent"
            />
            <Button
              text={`${isLoading ? "Saving.." : "Save"}`}
              className="px-8 py-3"
              onClick={handleSubmit}
            />
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
};

export default CreateCategories;

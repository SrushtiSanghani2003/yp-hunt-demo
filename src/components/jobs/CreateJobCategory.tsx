import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../ui/button";
import { closeIcon } from "../../icons";
import Input from "../ui/input/Input";
import { useEffect, useState } from "react";
import { TreeSelect } from "primereact/treeselect";
import api from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { showToast } from "../../utils/toastUtils";

type CreateCategoryType = {
  show: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
  onUpdate: (data: any) => void;
  isLoading: boolean;
  editData: any;
};

const CreateJobCategory = ({
  show,
  onClose,
  onCreate,
  onUpdate,
  isLoading,
  editData,
}: CreateCategoryType) => {
  const [categoryName, setCategoryName] = useState("");
  const [parentId, setParentId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState<{
    value: string;
    label: string;
  } | null>(null);
  console.log("🚀 ~ CreateJobCategory ~ selectedCategory:", selectedCategory)

  const getCategories = async () => {
    return await api.get("/job/category-dropdown");
  };

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
  });

  const getParentCategory = async (id: string) => {
    return await api.get(`/job/category/${id}`);
  };

  const { data: parentCategoryData } = useQuery({
    queryKey: ["parentCategory"],
    queryFn: () => getParentCategory(editData?.parentId),
    refetchOnWindowFocus: false,
    enabled: !!editData?.parentId,
  });

  useEffect(() => {
    if (parentCategoryData) {
      const parentData = parentCategoryData?.data;
      setSelectedCategory({
        value: parentData?.id,
        label: parentData.translation?.title,
      });
    } else {
      setSelectedCategory(null);
    }
  }, [parentCategoryData]);

  interface TreeNode {
    key: string;
    label: string;
    data?: any;
    children?: TreeNode[];
    selectable?: boolean;
  }

  const transformCategoriesToTreeNodes = (
    categories: any[],
    excludeId: any,
  ): TreeNode[] => {
    return categories
      ?.filter((category) => category.id != excludeId)
      ?.map((category) => ({
        key: category.id,
        label: category.title,
        children: category?.children
          ? transformCategoriesToTreeNodes(category?.children, excludeId)
          : undefined,
      }));
  };

  const treeCategoryOptions: TreeNode[] = categoriesData
    ? transformCategoriesToTreeNodes(categoriesData.data, editData?.id)
    : [];

  const findLabelByKey = (
    key: string | null,
    nodes: TreeNode[],
  ): string | null => {
    if (!key) return null;

    for (const node of nodes) {
      if (node.key === key) return node.label;
      if (node.children) {
        const childLabel = findLabelByKey(key, node.children);
        if (childLabel) return childLabel;
      }
    }

    return null;
  };

  const handleParentCategoryChange = (e: any) => {
    const selectedKey = e.value;
    const selectedLabel = findLabelByKey(selectedKey, treeCategoryOptions);
    setSelectedCategory({ value: selectedKey, label: selectedLabel ?? "" });
    setParentId(selectedKey);
  };

  const handleSubmit = () => {
    if (categoryName.trim() === "") {
      showToast("Category name is required", "error");
      return;
    }
    let newData = {
      parent_id: parentId,
      translation: {
        language_code: editData?.language || "en",
        title: categoryName,
      },
    };
    if (editData) {
      onUpdate(newData);
    } else {
      onCreate(newData);
    }
  };

  useEffect(() => {
    if (editData) {
      setCategoryName(editData.title);
      setParentId(editData.parentId);
    }
  }, [editData]);
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
          <div className="flex items-center justify-between mb-3">
            <DialogTitle as="h2" className="text-2xl/6 font-extrabold">
              {/* {editData ? "Edit Category" : "Create Category"} */}
              Create Job Category
            </DialogTitle>
            <Button
              icon={closeIcon}
              backgroundColor="transparent"
              className="p-0"
              onClick={onClose}
            />
          </div>

          <div className="mb-4">
            <Input
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              inputCss="md:rounded-lg"
            />
          </div>
          <div className="w-full lg:my-0 my-2">
            <TreeSelect
              // value={selectedCategory?.value ?? ""}
              value={parentId ?? ""}
              options={treeCategoryOptions}
              onChange={handleParentCategoryChange}
              placeholder="Select Parent Category"
              className="w-full custom-tree-select shadow-none"
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

export default CreateJobCategory;

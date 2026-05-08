import { plusIcon, sortIcon } from "../../icons";
import CreateCategories from "./CreateCategories";
import { useState } from "react";
import SearchInput from "../ui/searchInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../utils/toastUtils";
import api from "../../lib/api";
import Button from "../ui/button";
import type { Category } from "./Categories";

interface CategoryHeaderProps {
  title: string;
  createButtonText?: string;
  sortButtonText?: string;
  searchPlaceholder?: string;
  apiEndpoint: string;
  queryKey: string;
  onCreateSuccess?: () => void;
  onUpdateSuccess?: () => void;
}

export default function CategoryHeader({
  title,
  createButtonText = "Create Categories",
  sortButtonText = "Sort By A - Z",
  searchPlaceholder = "Local search",
  apiEndpoint,
  queryKey,
  onCreateSuccess,
  onUpdateSuccess,
}: CategoryHeaderProps) {
  const [createShow, setCreateShow] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState<Category | null>(
    null
  );

  const queryClient = useQueryClient();

  const createCategory = async (newCate: {
    name: string;
    module_ids: number[];
  }) => {
    const response = await api.post(`${apiEndpoint}`, newCate);
    return response.data;
  };

  const updateCategory = async (updatedCate: {
    id: string;
    name: string;
    module_ids: number[];
  }) => {
    const { id, ...rest } = updatedCate;
    const response = await api.put(`${apiEndpoint}/${id}`, rest);
    return response.data;
  };

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      showToast("Category created successfully", "success");
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      setCreateShow(false);
      onCreateSuccess?.();
    },
    onError: () => {
      console.error("Failed to create category");
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      setCreateShow(false);
      setEditCategoryData(null);
      onUpdateSuccess?.();
    },
    onError: () => {
      console.error("Failed to update category");
    },
  });

  return (
    <>
      <div>
        <div className="lg:flex items-center justify-between lg:mb-8 mb-6">
          <h2 className="uppercase lg:text-xl/5 text-base font-bold">
            {title}
          </h2>
          <div className="flex flex-col lg:flex-row lg:items-center items-end lg:gap-3 gap-1">
            <Button
              text={createButtonText}
              icon={plusIcon}
              backgroundColor="transparent"
              className="rounded-lg border border-black px-4 py-2"
              onClick={() => setCreateShow(true)}
            />
            <Button
              text={sortButtonText}
              icon={sortIcon}
              className="px-4 py-2 rounded-lg border border-black"
              backgroundColor="transparent"
            />
            <SearchInput
              placeholder={searchPlaceholder}
              className="rounded-2xl px-4 py-2"
            />
          </div>
        </div>
      </div>
      <CreateCategories
        show={createShow}
        onClose={() => {
          setCreateShow(false);
          setEditCategoryData(null);
        }}
        onCreate={(obj) => createCategoryMutation.mutate(obj)}
        onUpdate={(obj) => updateCategoryMutation.mutate(obj)}
        isLoading={
          createCategoryMutation.isPending || updateCategoryMutation.isPending
        }
        editData={editCategoryData}
      />
    </>
  );
}

import { useEffect, useMemo, useState } from "react";
import {
  // correctIcon,
  deleteIcon,
  // eyeOpenIcon,
  penIcon,
  plusIcon,
  // short_white,
  // sortIcon,
} from "../../icons";
import SearchInput from "../ui/searchInput";
import CreateTagModal from "./CreateTagModal";
import DeleteTagModal from "./DeleteTagModal";
import api from "../../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../ui/button";
import { showToast } from "../../utils/toastUtils";
import Pagination from "../ui/pagination";
import { useSelector } from "react-redux";
import { selectAdministrationPermissions } from "../../redux-toolkit/menuPermissionsSlice";
import { getPermissionAdministrationFlags } from "../sidebar/menuPermissions";

export interface Tag {
  id: number;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  deleted_at: string | null;
}

const TagManagement = () => {
  const [createShow, setCreateShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  // const { isScrolled } = useScroll();
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedTagId, setSelectedTagId] = useState<string | number | null>(
    null,
  );
  const [tags, setTags] = useState<Tag[]>([]);
  const queryClient = useQueryClient();
  const selectedTag = tags.find((tag) => tag?.id === selectedTagId);
  const [page, setPage] = useState(1);
  const menuPermissions = useSelector(selectAdministrationPermissions);
  const { isUpdate, isDelete, isCreate } = getPermissionAdministrationFlags(
    menuPermissions.tag_management,
  );
  const getAllTags = async () => {
    const params: Record<string, any> = {
      page: page,
      limit: 10,
    };
    if (searchInput.trim()) {
      params.search = searchInput;
    }
    return await api.get("/tag/tags", { params });
  };

  const { data: allTagData } = useQuery({
    queryKey: ["tags", page, searchInput],
    queryFn: getAllTags,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return (allTagData as any)?.response?.data?.totalPages || 1;
  }, [(allTagData as any)?.response?.data?.totalPages]);

  const createTag = async (newTag: { name: string }) => {
    const response = await api.post("/tag/tags", newTag);
    return response.data;
  };

  const deleteTag = async (id: string) => {
    return await api.delete(`/tag/tags/${id}`);
  };

  const editTag = async ({ id, name }: { id: string; name: string }) => {
    const response = await api.put(`/tag/tags/${id}`, { name });
    return response.data;
  };

  const createTagMutation = useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      showToast("Tag Created Successfully", "success");
      setCreateShow(false);
    },
    onError: () => {
      showToast("Failed to create tag", "error");
    },
  });

  const deleteTagMutation = useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      showToast("Tag Deleted Successfully", "success");
      setDeleteShow(false);
      setSelectedTagId(null);
    },
    onError: () => {
      showToast("Failed to delete tag", "error");
    },
  });

  const editTagMutation = useMutation({
    mutationFn: editTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      showToast("Tag Updated Successfully", "success");
      setCreateShow(false);
      setSelectedTagId(null);
    },
    onError: () => {
      showToast("Failed to update tag", "error");
    },
  });

  useEffect(() => {
    if (
      allTagData &&
      typeof allTagData === "object" &&
      "response" in allTagData
    ) {
      const allTags = (allTagData as any).response?.data?.tags;
      setTags(allTags);
    }
  }, [allTagData]);

  return (
    <>
      <div className=" container relative pt-6 md:pt-0">
        {/* <div
          className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
            isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
          }`}
        > */}
          <div className="lg:flex items-center justify-between  ">
            <h2 className="uppercase lg:text-xl/5 text-base font-bold">Tags</h2>
            <div className="flex flex-col lg:flex-row lg:items-center items-end lg:gap-3 gap-1">
              <Button
                text="Create"
                icon={plusIcon}
                backgroundColor="transparent"
                className={`rounded-lg border border-black px-4 py-2 ${
                  !isCreate ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => setCreateShow(true)}
                textSize=" text-sm"
                disabled={!isCreate}
              />
              {/* <Button
              text="Sort By A - Z "
              icon={short_white}
              className="px-4 py-2 rounded-lg border border-black bg-black text-white"
              backgroundColor="transparent"
              imageclassName="text-white"
              textSize=" text-sm"
            /> */}
              <SearchInput
                placeholder="Local search"
                className="rounded-2xl px-4 py-2"
                value={searchInput}
                onChange={(value: string) => setSearchInput(value)}
                onClear={() => setSearchInput("")}
              />
            </div>
          </div>
        {/* </div> */}
        <div className=" overflow-x-auto">
          <table className="min-w-full leading-normal border-spacing-y-[6px]  border-separate">
            <thead>
              <tr>
                <th className="text-black opacity-40 py-3 text-center text-base font-normal w-[50px] min-w-[50px]">
                  ID
                </th>
                <th
                  style={{ width: "50%" }}
                  className="text-black opacity-40 text-base py-3 text-left  font-normal min-w-[488px] w-[488px] "
                >
                  Name
                </th>
                <th className="text-black opacity-40 py-3 text-start text-base font-normal w-[120px] min-w-[120px]">
                  Date Created
                </th>

                <th className="text-black opacity-40 pe-5 py-3 text-base font-normal w-[168px] min-w-[168px] text-end">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {!tags || tags.length === 0 ? (
                <tr>
                  <td colSpan={4}>
                    <p className="border border-primary bg-white rounded-xl text-center py-4 text-gray-500  text-base">
                      No data available
                    </p>
                  </td>
                </tr>
              ) : (
                tags.length > 0 &&
                tags.map((tag, index) => {
                  return (
                    <tr key={index}>
                      <td colSpan={4}>
                        <div className="text-sfpro_regular hover:bg-gray-100 transition bg-white border border-primary rounded-[15px] p-3">
                          <table className="w-full">
                            <thead>
                              <tr>
                                <th className="w-[50px] min-w-[50px]"></th>
                                <th className="min-w-[488px] w-1/2"></th>
                                <th className="w-[120px] min-w-[120px]"></th>
                                <th className="w-[168px] min-w-[168px] text-center"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div className=" text-center ">
                                    {index + 1}
                                  </div>
                                </td>
                                <td className=" text-center">
                                  <div className="flex items-center gap-4">
                                    {/* <div className="flex items-center gap-sp6">
                                      <input
                                        type="checkbox"
                                        id={`display-${tag?.id}`}
                                        className="peer hidden"
                                        checked={tag?.is_active}
                                        readOnly
                                      />
                                      <label
                                        htmlFor={`display-${tag?.id}`}
                                        className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded cursor-pointer peer-checked:bg-black peer-checked:border-black"
                                      >
                                        <img src={correctIcon} alt="Right" />
                                      </label>
                                    </div> */}
                                    <p className="font-semibold">{tag?.name}</p>
                                  </div>
                                </td>

                                <td className=" text-center ">
                                  <p className="w-max">17 Jan 2025, 16:48</p>
                                </td>

                                <td className="">
                                  <div className="flex gap-2 items-center justify-end">
                                    {/* <Button
                                      icon={eyeOpenIcon}
                                      backgroundColor="transparent"
                                      className="md:py-0"
                                    /> */}
                                    <Button
                                      icon={penIcon}
                                      backgroundColor="transparent"
                                      className={`md:py-0 ${
                                        !isUpdate
                                          ? "opacity-50 cursor-not-allowed"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        setSelectedTagId(tag?.id);
                                        setCreateShow(true);
                                      }}
                                      disabled={!isUpdate}
                                    />
                                    <Button
                                      icon={deleteIcon}
                                      backgroundColor="transparent"
                                      className={`md:py-0 ${
                                        !isDelete
                                          ? "opacity-50 cursor-not-allowed"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        setSelectedTagId(tag?.id);
                                        setDeleteShow(true);
                                      }}
                                      disabled={!isDelete}
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CreateTagModal
        show={createShow}
        onClose={() => {
          (setCreateShow(false), setSelectedTagId(null));
        }}
        onCreate={(newTagData) => createTagMutation.mutate(newTagData)}
        initialValue={selectedTag?.name || ""}
        onUpdate={(updatedName) =>
          editTagMutation.mutate({
            id: String(selectedTagId)!,
            name: updatedName,
          })
        }
        isLoading={editTagMutation.isPending || createTagMutation.isPending}
      />
      {/* <EditTagModal
        show={editShow}
        onClose={() => setEditShow(false)}
        initialValue={selectedTag?.name || ""}
        onUpdate={(updatedName) =>
          editTagMutation.mutate({ id: selectedTagId!, name: updatedName })
        }
        isLoading={editTagMutation.isPending}
      /> */}
      <DeleteTagModal
        show={deleteShow}
        onClose={() => setDeleteShow(false)}
        onDelete={() => {
          if (selectedTagId !== undefined && selectedTagId !== null) {
            deleteTagMutation.mutate(String(selectedTagId));
          }
        }}
        isLoading={deleteTagMutation.isPending}
      />
      {tags.length !== 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </>
  );
};

export default TagManagement;

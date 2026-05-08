import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import BuilderHeader from "../../ui/builderHeader/BuilderHeader";
import Input from "../../ui/input/Input";
import {
  selectModule,
  setModuleCode,
  setModuleTranslationField,
  setFullModule,
  resetModule,
  setModuleGroupId,
  setModulePath,
  setModuleIcon,
  setModuleParentId,
} from "../../../redux-toolkit/moduleSlice";
import {
  useCreateModule,
  useGetModuleById,
  useUpdateModule,
} from "../../../hooks/useModule";
import { normalizeModuleResponse } from "./normalizer/normalizerModule";
import { useQuery } from "@tanstack/react-query";
import api from "../../../lib/api";
import { chevronDown } from "../../../icons";
import { useScroll } from "../../../hooks/ScrollContext";

const CreateModule = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const module = useSelector(selectModule);
  const createModuleMutation = useCreateModule(module);
  const updateModuleMutation = useUpdateModule(module);
  const { data: moduleDataById } = useGetModuleById(id);
  const [moduleGroup, setModuleGroup] = useState([]);

  const useGetModuleGroups = () => {
    return useQuery({
      queryKey: ["module-groups"],
      queryFn: async () => {
        const res = await api.get("/module-groups");
        return res.data;
      },
    });
  };
  const { data: moduleGroups, isLoading } = useGetModuleGroups();

  const handleModuleSubmit = (id: string | number | undefined | any) => {
    if (isEditMode && id) {
      updateModuleMutation.mutate(id);
    } else {
      createModuleMutation.mutate();
    }
  };
  useEffect(() => {
    if (!isEditMode) {
      dispatch(resetModule());
    }
    if (isEditMode && moduleDataById) {
      const normalizedModule = normalizeModuleResponse(moduleDataById);
      dispatch(setFullModule(normalizedModule));
    }
  }, [moduleDataById]);

  useEffect(() => {
    if (moduleGroups?.moduleGroups) {
      setModuleGroup(moduleGroups?.moduleGroups);
    }
  }, [moduleGroups]);

  return (
    <div>
      <div
        className={`sticky top-0 z-[99] mb-6 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Module Builder"
          onSaveTemplateTitle="Back"
          onSaveTemplate={() => navigate("/account/module")}
          onSubmit={() => handleModuleSubmit(id)}
          isToggleVisible
          onSubmitLoading={
            createModuleMutation.isPending || updateModuleMutation.isPending
          }
          isEditMode={isEditMode}
          saveButtonText="Save"
        />
      </div>
      <div className="container grid grid-cols-12 xl:gap-sp30 lg:gap-sp16 gap-sp9">
        <div className="lg:col-span-12 md:col-span-10 col-span-10">
          <div className="bg-white border-0.5 border-primary rounded-15 md:p-5 p-3">
            {/* Code */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Code"
                value={module.code}
                placeholder="Enter Code ..."
                className={`!mb-4`}
                inputCss={`${isEditMode && "cursor-not-allowed"}`}
                disabled={isEditMode}
                readOnly={isEditMode}
                onChange={(e) => {
                  if (isEditMode) return;

                  const formattedValue = e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "_");

                  dispatch(setModuleCode(formattedValue));
                }}
              />

              <Input
                label="Title"
                value={module.translations.name}
                className="!mb-4"
                placeholder="Enter Title ..."
                onChange={(e) =>
                  dispatch(
                    setModuleTranslationField({
                      field: "name",
                      value: e.target.value,
                    }),
                  )
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="mb-2 block font-medium md:text-base text-sm">
                  Module Group
                </label>
                <div className="relative ">
                  <select
                    value={module.module_group_id ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value) {
                        dispatch(setModuleGroupId(Number(value)));
                      }
                    }}
                    className="appearance-none w-full md:p-[7px] p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
                  >
                    <option value="">Select Module Group</option>

                    {!isLoading &&
                      moduleGroup?.map((group: any) => (
                        <option key={group.id} value={group.id}>
                          {group.translations?.name}
                        </option>
                      ))}
                  </select>

                  <div className="absolute md:right-4 right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <img src={chevronDown} alt="dropdown" />
                  </div>
                </div>
              </div>
              <div className="relative">
                <label
                  htmlFor="module_parent_id"
                  className="mb-2 block font-medium md:text-base text-sm"
                >
                  Parent ID
                </label>
                <div className="relative">
                  <select
                    id="module_parent_id"
                    value={module.parent_id ?? ""}
                    onChange={(e) =>
                      dispatch(setModuleParentId(Number(e.target.value)))
                    }
                    className="appearance-none w-full md:p-[7px] p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
                  >
                    <option value={1}>Side Bar</option>
                    <option value={2}>Administration</option>
                  </select>
                  <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                    <img src={chevronDown} />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Path"
                value={module.path}
                placeholder="Enter Path ..."
                className="!mb-4"
                onChange={(e) => {
                  const value = e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "/") // space → /
                    .replace(/[^a-z0-9/]/g, ""); // special chars remove

                  dispatch(setModulePath(value));
                }}
              />

              <Input
                label="Icon"
                value={module.icon}
                className="!mb-4"
                placeholder="Enter icon name (React: FiHome, MdSettings, FaUser | Lucide: LayoutDashboard)"
                onChange={(e) => dispatch(setModuleIcon(e.target.value))}
              />
            </div>
            <label className="mb-2 block  font-medium md:text-base/4 text-sm">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Enter Description ..."
              value={module.translations.description || ""}
              onChange={(e) =>
                dispatch(
                  setModuleTranslationField({
                    field: "description",
                    value: e.target.value,
                  }),
                )
              }
              className="w-full p-3 border-0.5 border-primary rounded-2xl resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModule;

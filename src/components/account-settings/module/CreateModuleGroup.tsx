import { useNavigate, useParams } from "react-router-dom";
import BuilderHeader from "../../ui/builderHeader/BuilderHeader";
import Input from "../../ui/input/Input";
import {
  resetModuleGroup,
  selectModuleGroup,
  setFullModuleGroup,
  setModuleGroupCode,
  setModuleGroupIcon,
  setModuleGroupTranslationField,
} from "../../../redux-toolkit/moduleGroupSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateModuleGroup,
  useGetModuleGroupById,
  useUpdateModuleGroup,
} from "../../../hooks/useModuleGroup";
import { useEffect } from "react";
import { normalizeModuleGroupResponse } from "./normalizer/normalizesModuleGroup";
import { useScroll } from "../../../hooks/ScrollContext";

const CreateModuleGroup = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isScrolled } = useScroll();
  const isEditMode = Boolean(id);
  const moduleGroup = useSelector(selectModuleGroup);
  const dispatch = useDispatch();
  const createModuleGroupMutation = useCreateModuleGroup(moduleGroup);
  const updateModuleGroupMutation = useUpdateModuleGroup(moduleGroup);
  const { data: moduleGroupDataById } = useGetModuleGroupById(id);
  const handleModuleSubmit = (id: string | number | undefined | any) => {
    if (isEditMode && id) {
      updateModuleGroupMutation.mutate(id);
    } else {
      createModuleGroupMutation.mutate();
    }
  };
  useEffect(() => {
    if (!isEditMode) {
      dispatch(resetModuleGroup());
    }
    if (isEditMode && moduleGroupDataById) {
      const normalizedShop = normalizeModuleGroupResponse(moduleGroupDataById);
      dispatch(setFullModuleGroup(normalizedShop));
    }
  }, [moduleGroupDataById]);
  return (
    <div>
      <div
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Module Group Builder"
          onSaveTemplateTitle="Back"
          onSaveTemplate={() => navigate("/account/groupmodule")}
          onSubmit={() => handleModuleSubmit(id)}
          isToggleVisible
          onSubmitLoading={
            createModuleGroupMutation.isPending ||
            updateModuleGroupMutation.isPending
          }
          isEditMode={isEditMode}
          saveButtonText="Save"
        />
      </div>

      <div className="container grid grid-cols-12 xl:gap-sp30 lg:gap-sp16 gap-sp9">
        <div className="lg:col-span-11 md:col-span-10 col-span-10">
          <div className="bg-white border-0.5 border-primary rounded-15 md:p-5 p-3">
            {/* Code */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <Input
                label="Code"
                value={moduleGroup.code}
                placeholder="Enter Code ..."
                onChange={(e) => {
                  const formattedValue = e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "_");

                  dispatch(setModuleGroupCode(formattedValue));
                }}
              />

              <Input
                label="Title"
                value={moduleGroup.translations.name}
                placeholder="Enter Title ..."
                onChange={(e) =>
                  dispatch(
                    setModuleGroupTranslationField({
                      field: "name",
                      value: e.target.value,
                    }),
                  )
                }
              />
              <Input
                label="Icon"
                value={moduleGroup.icon}
                placeholder="Enter icon name (React: FiHome, MdSettings, FaUser | Lucide: LayoutDashboard)"
                onChange={(e) => dispatch(setModuleGroupIcon(e.target.value))}
              />
            </div>

            <label className="mb-2 block  font-medium md:text-base/4 text-sm">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Enter Description ..."
              value={moduleGroup.translations.description || ""}
              onChange={(e) =>
                dispatch(
                  setModuleGroupTranslationField({
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

export default CreateModuleGroup;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BuilderHeader from "../../ui/builderHeader/BuilderHeader";
import Input from "../../ui/input/Input";
import { closeIcon, plusIcon } from "../../../icons";
import Button from "../../ui/button";
import {
  useCreatePermissions,
  useGetModuleById,
  useGetPermissionsByModuleId,
} from "../../../hooks/useModule";
import { useScroll } from "../../../hooks/ScrollContext";

const emptyForm = {
  code: "",
  title: "",
  description: "",
  isExisting: false,
};

const CreatePermissions = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const moduleId = id;
  const { isScrolled } = useScroll();
  const createPermissions = useCreatePermissions();
  const { data } = useGetPermissionsByModuleId(moduleId);
  const { data: moduleDataById } = useGetModuleById(id);

  const [forms, setForms] = useState([emptyForm]);

  const handleChange = (
    index: number,
    field: keyof typeof emptyForm,
    value: string,
  ) => {
    const updatedForms = [...forms];
    updatedForms[index] = {
      ...updatedForms[index],
      [field]: value,
    };
    setForms(updatedForms);
  };

  const addForm = () => {
    setForms([...forms, { ...emptyForm, isExisting: false }]);
  };

  const removeForm = (index: number) => {
    setForms(forms.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const payload = forms
      .filter((f) => f.code && f.title)
      .map((form) => ({
        module_id: Number(moduleId),
        code: form.code,
        status: "published",
        published_at: new Date().toISOString(),
        translations: {
          language_code: "en",
          name: form.title,
          description: form.description,
        },
      }));

    const codes = payload.map((p) => p.code);
    if (new Set(codes).size !== codes.length) {
      alert("Duplicate permission codes are not allowed");
      return;
    }

    createPermissions.mutate(payload);
  };

  useEffect(() => {
    if (Array.isArray(data) && data.length) {
      const mappedForms = data.map((item: any) => ({
        code: item.code || "",
        title: item?.translations?.name || "",
        description: item?.translations?.description || "",
        isExisting: true,
      }));

      setForms(mappedForms);
    } else {
      // 👇 important: module ma permissions na hoy to blank form
      setForms([emptyForm]);
    }
  }, [data]);

  return (
    <div>
      <div
        className={`sticky top-0 z-[99] mb-6 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Permissions Builder"
          onSaveTemplateTitle="Back"
          onSaveTemplate={() => navigate("/account/module")}
          onSubmit={handleSubmit}
          isToggleVisible
          onSubmitLoading={createPermissions.isPending}
          saveButtonText="Save"
        />
      </div>
      <div className="container">
        <div className=" grid grid-cols-12 xl:gap-sp30 lg:gap-sp16 gap-sp9 mb-4">
          <div className="lg:col-span-12 md:col-span-10 col-span-10">
            <div className="bg-white mb-4 border-0.5 border-primary rounded-15 md:p-5 p-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-f6f6f6  border-0.5 border-primary rounded-15  p-3 flex justify-center items-center gap-2">
                  <h1 className="font-bold">Module Name :</h1>
                  <h1 className="font-medium">{moduleDataById?.name || "-"}</h1>
                </div>
                <div className="bg-f6f6f6  border-0.5 border-primary rounded-15  p-3 flex justify-center items-center gap-2">
                  <h1 className="font-bold">Module ID :</h1>
                  <h1 className="font-medium">{moduleDataById?.id || "-"}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        {forms.map((form, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-12 xl:gap-sp30 lg:gap-sp16 gap-sp9 mb-4"
            >
              <div className="lg:col-span-12 md:col-span-10 col-span-10">
                <div className="bg-white border-0.5 border-primary rounded-15 md:p-4 p-3 relative">
                  {/* Remove Button */}
                  {forms.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeForm(index)}
                      className="absolute top-3 right-3 text-red-500 text-sm"
                    >
                      <img src={closeIcon} alt="" />
                    </button>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Code"
                      value={form.code}
                      placeholder="Enter Code ..."
                      className="!mb-4 "
                      disabled={form.isExisting}
                      readOnly={form.isExisting}
                      inputCss={`${form.isExisting && "cursor-not-allowed"}`}
                      onChange={(e) => {
                        if (form.isExisting) return;
                        handleChange(
                          index,
                          "code",
                          e.target.value.toLowerCase().replace(/\s+/g, "_"),
                        );
                      }}
                    />
                    <Input
                      label="Title"
                      value={form.title}
                      className="!mb-4"
                      placeholder="Enter Title ..."
                      onChange={(e) =>
                        handleChange(index, "title", e.target.value)
                      }
                    />
                  </div>

                  <label className="mb-2 block font-medium md:text-base/4 text-sm">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter Description ..."
                    value={form.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    className="w-full p-3 border-0.5 border-primary rounded-2xl resize-none"
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Button */}
        <Button
          text="Add Permission"
          icon={plusIcon}
          type="button"
          onClick={addForm}
          className="my-4 px-4 bg-primary text-black rounded-xl"
        />
      </div>
    </div>
  );
};

export default CreatePermissions;

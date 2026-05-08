import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../config/paths";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import Input from "../ui/input/Input";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/button";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import { concatImgURL } from "../../config/function";
import AsyncSelect from "react-select/async";
import { customStyles } from "../account-settings/CreateCategories";

import {
  selectConversation,
  setConversationTitle,
  setConversationLogo,
  setConversationAppUsers,
  setFullConversation,
} from "../../redux-toolkit/conversationSlice";
import { useEffect, useMemo, useState } from "react";
import ContentLibrary from "../contentPanel/ContentLibrary";
import api from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  useConversationById,
  useCreateConversation,
  useUpdateConversation,
} from "../../hooks/useConversation";
import { normalizeConversationResponse } from "./normalizer/normalizerConversation";
import { useScroll } from "../../hooks/ScrollContext";
type AppUserOption = {
  value: number;
  label: string;
};
export default function CreateConversation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const [show, setShow] = useState(false);
  const isEditMode = Boolean(id);
  const [selectedAdmins, setSelectedAdmins] = useState<AppUserOption[]>([]);
  const conversation = useSelector(selectConversation);
  const { data: conversationDataById } = useConversationById(id);
  const [appuserIdsData, setAppuserIdsData] = useState([]);
  const createConversationMutation = useCreateConversation(conversation);
  const updateConversationMutation = useUpdateConversation(conversation);
  const getAllAdmins = async () => {
    return await api.get("/appuser/dropdown", {
      params: {
        page: 1,
        limit: 200,
      },
    });
  };

  const { data: allAdminData } = useQuery({
    queryKey: ["admins"],
    queryFn: getAllAdmins,
    refetchOnWindowFocus: false,
  });

  const adminOptions = useMemo(
    () =>
      allAdminData?.data?.appusers?.map((item: any) => ({
        value: item.id,
        label: item.full_name,
      })) || [],
    [allAdminData],
  );
  const loadAdminOptions = async (input: string) => {
    if (!input) {
      return adminOptions;
    }

    const res = await api.get("/appuser/dropdown", {
      params: {
        page: 1,
        limit: 50,
        search: input,
      },
    });

    return res.data.appusers?.map((u: any) => ({
      value: u.id,
      label: u.full_name,
    }));
  };
  const { data: adminsByIds } = useQuery({
    queryKey: ["adminsByIds", appuserIdsData],
    queryFn: () =>
      api.get("/appuser/dropdown", {
        params: { appuser_ids: appuserIdsData },
      }),
    enabled:
      isEditMode && Array.isArray(appuserIdsData) && appuserIdsData.length > 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isEditMode) return;
    if (!adminsByIds?.data?.appusers) return;

    const selected = adminsByIds?.data?.appusers.map((admin: any) => ({
      value: admin.id,
      label: admin.full_name,
    }));

    setSelectedAdmins(selected);
    dispatch(setConversationAppUsers(selected.map((a: any) => a.value)));
  }, [adminsByIds]);

  const handleConversationSubmit = () => {
    if (isEditMode && id) {
      updateConversationMutation.mutate(id);
    } else {
      createConversationMutation.mutate();
    }
  };
  useEffect(() => {
    if (isEditMode && conversationDataById) {
      const normalized = normalizeConversationResponse(
        conversationDataById.data,
      );

      dispatch(setFullConversation(normalized));

      // 🔑 aa trigger karse adminsByIds query
      setAppuserIdsData(conversationDataById.data.appuser_ids);
    }
  }, [conversationDataById, isEditMode]);

  return (
    <div>
      <div
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Conversation Builder"
          onSaveTemplate={() => navigate(paths.conversation.path)}
          onSaveTemplateTitle="Cancel"
          onSubmit={handleConversationSubmit}
          onSubmitLoading={
            createConversationMutation.isPending ||
            updateConversationMutation.isPending
          }
          isEditMode={isEditMode}
        />
      </div>
      <div className="container grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-11">
          <div className="bg-white border border-primary rounded-2xl p-5">
            {/* TITLE + MEMBERS */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Title"
                placeholder="Enter Title"
                value={conversation.title}
                onChange={(e) => dispatch(setConversationTitle(e.target.value))}
              />

              <div>
                <div>
                  <label className="block font-medium">Admin</label>
                  <AsyncSelect
                    isMulti
                    cacheOptions
                    styles={customStyles}
                    loadOptions={loadAdminOptions}
                    defaultOptions={adminOptions}
                    value={selectedAdmins}
                    onChange={(selected: any) => {
                      const value = selected || [];
                      setSelectedAdmins(value);
                      dispatch(
                        setConversationAppUsers(value.map((v: any) => v.value)),
                      );
                    }}
                  />
                </div>
              </div>
            </div>

            {/* LOGO SECTION */}
            <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 mt-3">
              <div className="md:w-sp170 w-20 h-full">
                {conversation.logo ? (
                  <img
                    src={concatImgURL(conversation.logo)}
                    alt="Uploaded"
                    className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary block align-middle"
                  />
                ) : (
                  <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                    <img src={mediaIcon} alt="Placeholder" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Input
                  label="Logo Image URL"
                  placeholder="https://www.example.com"
                  className="m-0"
                  value={concatImgURL(conversation.logo)}
                  readOnly
                />
                <div>
                  {conversation.logo ? (
                    <Button
                      text="Remove Image"
                      icon={closeIcon}
                      backgroundColor="transparent"
                      className="py-0"
                      imageclassName="md:w-5 w-3 md:h-5 h-3"
                      onClick={() => dispatch(setConversationLogo(null))}
                    />
                  ) : (
                    <Button
                      icon={plusIcon}
                      text="Add Image"
                      backgroundColor="transparent"
                      className="py-0"
                      imageclassName="md:w-5 w-3 md:h-5 h-3"
                      onClick={() => setShow(true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {show && (
        <ContentLibrary
          open={show}
          onClose={() => setShow(false)}
          uploadType="conversation"
          mediaFilter="image"
          onSelect={(value: string) => dispatch(setConversationLogo(value))}
        />
      )}
    </div>
  );
}

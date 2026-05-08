import { useNavigate, useParams } from "react-router-dom";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import Input from "../ui/input/Input";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/button";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import { concatImgURL } from "../../config/function";
import AsyncSelect from "react-select/async";
import { customStyles } from "../account-settings/CreateCategories";
import ContentLibrary from "../contentPanel/ContentLibrary";
import api from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  useConversationGroupById,
  useCreateConversationGroup,
  useUpdateConversationGroup,
} from "../../hooks/useConversation";

import {
  selectConversationGroup,
  setConversationGroupAdmins,
  setConversationGroupAppUsers,
  setConversationGroupField,
  setConversationGroupLogo,
  setFullConversationGroup,
  setParentCommunityId,
} from "../../redux-toolkit/conversationGroupSlice";
import { useEffect, useMemo, useState } from "react";
import { normalizeConversationGroupResponse } from "./normalizer/normalizerConversationGroup";
import type { MultiValue } from "react-select";
import { useScroll } from "../../hooks/ScrollContext";
type AppUserOption = {
  value: number;
  label: string;
};
export default function CreateConversationGroup() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const [show, setShow] = useState(false);
  const isEditMode = Boolean(id);
  const { groupId } = useParams<{ groupId: string | any }>();

  const conversationgroup = useSelector(selectConversationGroup);
  const [selectedMembers, setSelectedMembers] = useState<AppUserOption[]>([]);
  const [selectedAdmins, setSelectedAdmins] = useState<AppUserOption[]>([]);

  const { data: conversationGroupDataById } = useConversationGroupById(id);
  const [appuserIdsData, setAppuserIdsData] = useState([]);
  const [adminAppuserIdsData, setAdminAppuserIdsData] = useState([]);
  const createConversationGroupMutation = useCreateConversationGroup(
    conversationgroup,
    groupId,
  );
  const updateConversationGroupMutation = useUpdateConversationGroup(
    conversationgroup,
    groupId,
  );

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
  // member
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
  // admin
  const { data: adminsAppByIds } = useQuery({
    queryKey: ["adminsAppByIds", adminAppuserIdsData],
    queryFn: () =>
      api.get("/appuser/dropdown", {
        params: { appuser_ids: adminAppuserIdsData },
      }),
    enabled:
      isEditMode &&
      Array.isArray(adminAppuserIdsData) &&
      adminAppuserIdsData.length > 0,
    refetchOnWindowFocus: false,
  });

  // member
  useEffect(() => {
    if (!isEditMode) return;
    if (!adminsByIds?.data?.appusers) return;

    const selected = adminsByIds?.data?.appusers.map((u: any) => ({
      value: Number(u.id),
      label: u.full_name,
    }));

    setSelectedMembers(selected);
    dispatch(setConversationGroupAppUsers(selected.map((u: any) => u.value)));
  }, [adminsByIds, isEditMode]);

  // admin
  useEffect(() => {
    if (!isEditMode) return;
    if (!adminsAppByIds?.data?.appusers) return;

    const selected = adminsAppByIds?.data?.appusers.map((u: any) => ({
      value: Number(u.id),
      label: u.full_name,
    }));

    setSelectedAdmins(selected);
    dispatch(setConversationGroupAdmins(selected.map((u: any) => u.value)));
  }, [adminsAppByIds, isEditMode]);
  useEffect(() => {
    if (!isEditMode) {
      setSelectedMembers([]);
      setSelectedAdmins([]);
    }
  }, [isEditMode]);

  const handleConversationSubmit = () => {
    if (isEditMode && id) {
      updateConversationGroupMutation.mutate(id);
    } else {
      createConversationGroupMutation.mutate();
    }
  };

  useEffect(() => {
    if (groupId) {
      dispatch(setParentCommunityId(Number(groupId)));
    }
  }, [groupId, dispatch]);

  // Load edit data
  useEffect(() => {
    if (isEditMode && conversationGroupDataById) {
      const normalizerGroupData = normalizeConversationGroupResponse(
        conversationGroupDataById?.data,
      );
      dispatch(setFullConversationGroup(normalizerGroupData));
      setAppuserIdsData(conversationGroupDataById?.data?.appuser_ids);
      setAdminAppuserIdsData(
        conversationGroupDataById?.data?.admin_appuser_ids,
      );
    }
  }, [conversationGroupDataById, isEditMode]);

  return (
    <div>
      <div
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Conversation Group Builder"
          onSaveTemplate={() => navigate(`/conversation/group/${groupId}`)}
          onSaveTemplateTitle="Cancel"
          onSubmit={handleConversationSubmit}
          onSubmitLoading={
            createConversationGroupMutation.isPending ||
            updateConversationGroupMutation.isPending
          }
          isEditMode={isEditMode}
        />
      </div>
      <div className="container grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-11">
          <div className="bg-white border border-primary rounded-2xl p-5">
            <Input
              label="Title"
              placeholder="Enter Title"
              value={conversationgroup.title}
              onChange={(e) =>
                dispatch(
                  setConversationGroupField({
                    field: "title",
                    value: e.target.value,
                  }),
                )
              }
            />
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block font-medium">Members</label>

                <AsyncSelect
                  cacheOptions
                  isMulti
                  styles={customStyles}
                  placeholder="Type to search Members"
                  loadOptions={loadAdminOptions}
                  defaultOptions={adminOptions}
                  value={selectedMembers}
                  onChange={(newValue: MultiValue<AppUserOption>) => {
                    const newSelected: any = newValue || [];
                    setSelectedMembers(newSelected);

                    dispatch(
                      setConversationGroupAppUsers(
                        newSelected.map((item: any) => Number(item.value)), // ✅ number
                      ),
                    );
                  }}
                />
              </div>
              <div>
                <label className="block font-medium">Admin</label>
                <AsyncSelect
                  isMulti
                  cacheOptions
                  styles={customStyles}
                  loadOptions={loadAdminOptions}
                  defaultOptions={adminOptions}
                  value={selectedAdmins}
                  onChange={(selected: MultiValue<AppUserOption>) => {
                    const value: any = selected || [];
                    setSelectedAdmins(value);

                    dispatch(
                      setConversationGroupAdmins(
                        value.map((v: any) => Number(v.value)), // ✅ number
                      ),
                    );
                  }}
                />
              </div>
            </div>

            {/* LOGO SECTION */}
            <div className="flex md:h-sp100 h-20 md:gap-4 gap-2 mt-4">
              <div className="md:w-sp170 w-20 h-full">
                {conversationgroup.logo ? (
                  <img
                    src={concatImgURL(conversationgroup.logo)}
                    alt="Uploaded"
                    className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary"
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
                  value={conversationgroup.logo || ""}
                  readOnly
                />
                <div className="mt-1">
                  {conversationgroup.logo ? (
                    <Button
                      text="Remove Image"
                      icon={closeIcon}
                      backgroundColor="transparent"
                      className="py-0"
                      imageclassName="md:w-5 w-3 md:h-5 h-3"
                      onClick={() => dispatch(setConversationGroupLogo(null))}
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

      {/* MEDIA LIBRARY MODAL */}
      {show && (
        <ContentLibrary
          open={show}
          onClose={() => setShow(false)}
          uploadType="conversation"
          mediaFilter="image"
          onSelect={(value: string) =>
            dispatch(setConversationGroupLogo(value))
          }
        />
      )}
    </div>
  );
}

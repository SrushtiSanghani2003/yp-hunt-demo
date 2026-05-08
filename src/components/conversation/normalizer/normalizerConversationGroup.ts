export const normalizeConversationGroupResponse = (data: any) => {
  return {
  title: data.title ?? "",
  logo: data.logo ?? null,

  parent_community_id:
    data.parent_community_id !== null && data.parent_community_id !== undefined
      ? Number(data.parent_community_id)
      : null,

  appuser_ids: Array.isArray(data.appusers)
    ? data.appusers.map((u: any) => Number(u.id))
    : [],

  admin_appuser_ids: Array.isArray(data.admins)
    ? data.admins.map((u: any) => Number(u.id))
    : [],
};
};

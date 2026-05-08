import api from "../lib/api";
import type { MembershipState } from "../redux-toolkit/membershipSlice";

export const getMembershipList = async (currentPage: number, name?: string) => {
    const params: Record<string, any> = {
        page: currentPage,
        limit: 8,
    };
    if (name) {
        params.name = name;
    }

    const res = await api.get("/membership", { params });
    return res.data;
};

export const deleteMembershipItem = (id: string) =>
    api.delete(`/membership/${id}`);

export const fetchMembershipById = (id: string, languageCode?: string | null) => {
    return api.get(`/membership/${id}`, {
        params: languageCode ? { language_code: languageCode } : {},
    });
};

export const createMembershipAPI = (membership: MembershipState) => {
    return api.post("/membership", membership);
};

export const updatemembershipAPI = (id: string, membership:MembershipState) => {
    return api.put(`/membership/${id}`, membership);
};


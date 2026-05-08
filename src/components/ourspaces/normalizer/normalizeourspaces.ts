import type { OurSpacesState } from "../../../redux-toolkit/ourspacesSlice";

export const normalizeourspacesResponse = (data: any, languageCode: string | null): OurSpacesState => {
    return ({
        metadata: {
            seo_title: data.metadata?.seo_title || "",
            seo_tag: data.metadata?.seo_tag || "",
            seo_description: data.metadata?.seo_description || "",
        },
        image: data.image || null,
        translation: {
            title: data.translation?.title || "",
            description: data.translation?.description || "",
            button_label: data.translation?.button_label || "",
            button_url: data.translation?.button_url || "",
            language_code: languageCode || data.translation?.language_code || "en",
        },
        blocks: data.blocks || [],
    });
};

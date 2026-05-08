
export const normalizeNavigationResponse = (
    data: any,
    languageCode: string | null
): any => {
    return {
        status: "published",
        published_at: data.published_at ?? null,
        scheduled_at: data.scheduled_at ?? null,
        parent_id: data.parent_id ?? "",
        type: data.type ?? "",
        external_id: data.external_id ?? null,
        module_type: data.module_type ?? "",
        list_type: data.list_type ?? "individual",
        visible_on: data.list_type ??  "visible_on",
        display_on: data?.display_on ?? "",
        translation: {
            language_code: languageCode ?? "en",
            title: data.translation.title ?? "",
            icon_url: data.translation.icon_url ?? "",
            description: data.translation.description ?? "",
            menu_url: data.translation.menu_url ?? "",
            hero_image_url: data.translation.hero_image_url ?? "",
            content: data.translation.content,   // FIXED → object
        },
    };
};

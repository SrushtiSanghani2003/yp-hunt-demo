import { v4 as uuidv4 } from "uuid";

import type {
  AlbumsBlock,
  // ArticlesBlock,
  CTABlock,
  FaqBlock,
  GalleryBlock,
  ImageBlock,
  NewsBlock,
  PartnerBlock,
  PromotionBlock,
  QuoteBlock,
  ShopBlock,
  SocialBlock,
  TextBlock,
  VideoBlock,
  VideosBlock,
  VideosVerticalBlock,
} from "./blockTypes";

export type BlockType =
  | "text"
  | "image"
  | "video"
  | "cta"
  | "testimonials"
  | "promotions"
  | "gallery"
  | "faq"
  | "socialWall"
  | "partners"
  | "news"
  | "videos";
// | "bentoBox";

export const createEmptyBlock = (
  block_type: BlockType | string,
  sort_order: number,
) => {
  switch (block_type) {
    case "text":
      return {
        block_type: "text",
        block_id: 1,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          text: "",
          is_dynamic: false,
          is_active: true,
        },
      } as TextBlock;

    case "image":
      return {
        block_type: "image",
        block_id: 2,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          imgUrl: "",
          img_width: 0,
          img_height: 0,
          is_dynamic: false,
          is_active: true,
          more: {},
        },
      } as ImageBlock;

    case "video":
      return {
        block_type: "video",
        block_id: 3,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: false,
          is_active: true,
          video_type: "native",
          video_id: "",
          video_url: "",
          thumbnail_url: "",
          thumbnail_width: 0,
          thumbnail_height: 0,
          more: {},
        },
      } as VideoBlock;

    case "cta":
      return {
        block_type: "cta",
        block_id: 6,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: false,
          is_active: true,
          btns: [
            {
              id: uuidv4(),
              button_label: "",
              button_link: "",
              isnewtab: false,
            },
          ],
        },
      } as CTABlock;

    case "testimonials":
      return {
        block_type: "testimonials",
        block_id: 15,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: false,
          is_active: true,
          quotes: [
            {
              id: uuidv4(),
              quote_img_url: "",
              author: "",
              job_title: "",
              rating: "",
              quote_text: "",
              order: 1,
            },
          ],
        },
      } as QuoteBlock;

    case "promotions":
      return {
        block_type: "promotions",
        block_id: 5,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: false,
          is_active: true,
          // provider: "native",
          // network_code: "",
          // code: "",
          // display_on: [],
          // startTime: 0,
          // promotionType: "static",
          // endTime: 0,
          // location: "",
          // nativeImgUrl: "",
          banners: [
            {
              order: 1,
              nativeImgUrl: "",
              mobileImgUrl: "",
              redirectUrl: "",
            },
          ],
        },
      } as PromotionBlock;

    case "gallery":
      return {
        block_type: "gallery",
        block_id: 12,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: false,
          is_active: true,
          gridImages: [],
          carouselImages: [],
        },
      } as GalleryBlock;

    case "faq":
      return {
        block_type: "faq",
        block_id: 21,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: false,
          is_active: true,
          divisions: [
            {
              id: uuidv4(),
              title: "",
              faqs: [
                {
                  id: uuidv4(),
                  faq_question: "",
                  faq_answer: "",
                  order: 1,
                },
              ],
            },
          ],
        },
      } as FaqBlock;

    case "socialWall":
      return {
        block_type: "socialWall",
        block_id: 19,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
          platforms: [],
        },
      } as SocialBlock;

    case "partners":
      return {
        block_type: "partners",
        block_id: 20,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: false,
          is_active: true,
          is_carousel: true,
          type: "common",
          tiers: [],
        },
      } as PartnerBlock;

    case "news":
      return {
        block_type: "news",
        block_id: 17,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
          type: "",
          news_count: 1,
          category_id: null,
          preview_style: "list",
          bento_key: "",
        },
      } as NewsBlock;

    case "videos":
      return {
        block_type: "videos",
        block_id: 18,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
          type: "",
          title_position: "top",
          category_id: null,
          preview_style: "list",
          bento_key: "",
          module_type: "",
        },
      } as VideosBlock;

    // case "bentoBox":
    //   return {
    //     block_type: "bentoBox",
    //     block_id: 16,
    //     is_active: true,
    //     sort_order,
    //     block_schema: {
    //       title: null,
    //       sub_title: null,
    //       background_color: null,
    //       border_radius: null,
    //       blur: null,
    //       text_color: null,
    //       color_start: null,
    //       color_center: null,
    //       color_end: null,
    //     },
    //     content: {
    //       is_dynamic: false,
    //       is_active: true,
    //       bentoBoxes: [],
    //       bento_key: "1V2H",
    //     },
    //   } as BentoBoxBlock;

    // case "articles":
    //   return {
    //     block_type: "articles",
    //     block_id: 11,
    //     sort_order,
    //     block_schema: {
    //   title: null,
    //   sub_title: null,
    //   background_color: null,
    //   border_radius: null,
    //   blur: null,
    //   text_color: null,
    //   color_start: null,
    //   color_center: null,
    //   color_end: null,
    // },
    //     content: {
    //       is_dynamic: true,
    //       is_active: true,
    //       category_id: null,
    //       preview_style: "",
    //       bento_key: "",
    //     },
    //   } as ArticlesBlock;
    case "text_&_media":
      return {
        block_type: "text_&_media",
        block_id: 11,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: false,
          is_active: true,
          media_align: "right",
          text: "",
          text_bg_color: "dark",
          description_width: "70%",
          imgUrl: "",
        },
      };

    case "albums":
      return {
        block_type: "albums",
        block_id: 14,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
          type: "",
          album_id: "",
          player_id: "",
          preview_style: "",
          bento_key: "",
        },
      } as AlbumsBlock;

    case "shop":
      return {
        block_type: "shop",
        block_id: 13,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
          shop_id: null,
        },
      } as ShopBlock;

    case "advertisement":
      return {
        block_type: "advertisement",
        block_id: 4,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: false,
          is_active: true,
          ads: [
            {
              id: uuidv4(),
              display_on: [],
              isFullWidth: true,
              startTime: 0,
              promotionType: "static",
              endTime: 0,
              imageUrl: "",
              videoSource: "native",
              videoUrl: "",
              videoThumbnail: "",
              mediaType: null,
              mediaAlignment: "",
              order: 1,
            },
          ],
        },
      };

    case "team":
      return {
        block_type: "team",
        block_id: 22,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: false,
          is_active: true,
          teamMembers: [
            {
              id: uuidv4(),
              name: "",
              designation: "",
              short_bio: "",
              image_url: "",
              order: 1,
            },
          ],
        },
      };

    // case "contact":
    //   return {
    //     block_type: "contact",
    //     block_id: 23,
    // is_active: true,
    //     sort_order,
    //     block_schema: {
    //   title: null,
    //   sub_title: null,
    //   background_color: null,
    //   border_radius: null,
    //   blur: null,
    //   text_color: null,
    //   color_start: null,
    //   color_center: null,
    //   color_end: null,
    // },
    //     content: {
    //       is_dynamic: false,
    //       is_active: true,
    //       contacts: [
    //         {
    //           id: uuidv4(),
    //           title: "",
    //           description: "",
    //           email: [{ value: "" }],
    //           phone: [{ value: "" }],
    //           order: 1,
    //         },
    //       ],
    //     },
    //   };
    case "mix_media":
      return {
        block_type: "mix_media",
        block_id: 23,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
          media: [],
        },
      };

    // case "tCard":
    //   return {
    //     block_type: "tCard",
    //     block_id: 24,
    // is_active: true,
    //     sort_order,
    //     block_schema: {
    //   title: null,
    //   sub_title: null,
    //   background_color: null,
    //   border_radius: null,
    //   blur: null,
    //   text_color: null,
    //   color_start: null,
    //   color_center: null,
    //   color_end: null,
    // },
    //     content: {
    //       is_dynamic: false,
    //       is_active: true,
    //       layout: "3CARDS",
    //       cards: [
    //         {
    //           id: uuidv4(),
    //           title: "",
    //           description: "",
    //           image_url: "",
    //           order: 1,
    //         },
    //       ],
    //     },
    //   };
    case "tickets":
      return {
        block_type: "tickets",
        block_id: 24,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: false,
          is_active: true,
        },
      };

    case "quote":
      return {
        block_type: "quote",
        block_id: 25,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: false,
          is_active: true,
          is_feedback: false,
          quotes: [
            {
              id: uuidv4(),
              quote_text: "",
              author: "",
              order: 1,
            },
          ],
        },
      };

    // case "feedback":
    //   return {
    //     block_type: "feedback",
    //     block_id: 26,
    // is_active: true,
    //     sort_order,
    //     block_schema: {
    //   title: null,
    //   sub_title: null,
    //   background_color: null,
    //   border_radius: null,
    //   blur: null,
    //   text_color: null,
    //   color_start: null,
    //   color_center: null,
    //   color_end: null,
    // },
    //     content: {
    //       is_dynamic: false,
    //       is_active: true,
    //       feedbacks: [
    //         {
    //           id: uuidv4(),
    //           title: "",
    //           feedback_text: "",
    //           order: 1,
    //         },
    //       ],
    //     },
    //   };
    case "foryou":
      return {
        block_type: "foryou",
        block_id: 26,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
        },
      };

    case "timeline":
      return {
        block_type: "timeline",
        block_id: 27,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: false,
          is_active: true,
          timelines: [
            {
              id: uuidv4(),
              tagline_title: "",
              is_form: false,
              imageUrl: "",
              videoSource: "native",
              videoUrl: "",
              videoThumbnail: "",
              mediaType: null,
              mediaAlignment: "left",
              order: 1,
              more: {
                title: "",
              },
            },
          ],
        },
      };

    // case "document":
    //   return {
    //     block_type: "document",
    //     block_id: 28,
    // is_active: true,
    //     sort_order,
    //     block_schema: {
    //   title: null,
    //   sub_title: null,
    //   background_color: null,
    //   border_radius: null,
    //   blur: null,
    //   text_color: null,
    //   color_start: null,
    //   color_center: null,
    //   color_end: null,
    // },
    //     content: {
    //       is_dynamic: false,
    //       is_active: true,
    //       docs: [
    //         {
    //           title: "",
    //           description: "",
    //           sortOrder: 1,
    //           subDocs: [
    //             {
    //               id: uuidv4(),
    //               doc_name: "",
    //               doc_img: "",
    //               document_url: "",
    //               order: 1,
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   };
    case "race_to_finals":
      return {
        block_type: "race_to_finals",
        block_id: 28,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
        },
      };

    // case "meetings":
    //   return {
    //     block_type: "meetings",
    //     block_id: 29,
    // is_active: true,
    //     sort_order,
    //     block_schema: {
    //   title: null,
    //   sub_title: null,
    //   background_color: null,
    //   border_radius: null,
    //   blur: null,
    //   text_color: null,
    //   color_start: null,
    //   color_center: null,
    //   color_end: null,
    // },
    //     content: {
    //       is_dynamic: false,
    //       is_active: true,
    //       meetings: [
    //         {
    //           id: uuidv4(),
    //           title: "",
    //           is_description: false,
    //           description: "",
    //           meeting_at: "",
    //           order: 1,
    //         },
    //       ],
    //     },
    //   };

    case "padelzone":
      return {
        block_type: "padelzone",
        block_id: 29,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
        },
      };
    case "membership":
      return {
        block_type: "membership",
        block_id: 30,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
          membership_type: "hospitality",
        },
      };
    case "event":
      return {
        block_type: "event",
        block_id: 31,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
          event: [],
        },
      };

    case "quickLinks":
      return {
        block_type: "quickLinks",
        block_id: 32,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: false,
          is_active: true,
          quickLinks: [
            {
              id: uuidv4(),
              title: "",
              sub_title: "",
              icon: "",
              link: "",
              order: 1,
              type: "url",
            },
          ],
        },
      };

    // case "generation":
    //   return {
    //     block_type: "generation",
    //     block_id: 33,
    // is_active: true,
    //     sort_order,
    //     block_schema: {
    //   title: null,
    //   sub_title: null,
    //   background_color: null,
    //   border_radius: null,
    //   blur: null,
    //   text_color: null,
    //   color_start: null,
    //   color_center: null,
    //   color_end: null,
    // },
    //     content: {
    //       is_dynamic: false,
    //       is_active: true,
    //       is_feedback: false,
    //       generation: [
    //         {
    //           id: uuidv4(),
    //           description: "",
    //           rank: "",
    //           order: 1,
    //         },
    //       ],
    //     },
    //   };
    case "match_centre":
      return {
        block_type: "match_centre",
        block_id: 33,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
        },
      };

    case "tournaments":
      return {
        block_type: "tournaments",
        block_id: 34,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
          type: "upcoming",
        },
      };

    case "schedule":
      return {
        block_type: "schedule",
        block_id: 35,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
        },
      };

    case "players":
      return {
        block_type: "players",
        block_id: 36,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
          type: "",
        },
      };

    case "tournamentInfo":
      return {
        block_type: "tournamentInfo",
        block_id: 37,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
        },
      };

    case "officialApp":
      return {
        block_type: "officialApp",
        block_id: 38,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: false,
          is_active: true,
          title: "",
          sub_title: "",
          description: "",
          bg_img: "",
          qr_img: "",
          promo_img: "",
          google_play_url: "",
          app_store_url: "",
        },
      };

    case "playerDetails":
      return {
        block_type: "playerDetails",
        block_id: 39,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
        },
      };
    case "playerCareers":
      return {
        block_type: "playerCareers",
        block_id: 40,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
        },
      };

    case "match_stats":
      return {
        block_type: "match_stats",
        block_id: 41,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
        },
      };
    case "head_to_head":
      return {
        block_type: "head_to_head",
        block_id: 42,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
        },
      };
    case "premier_predict":
      return {
        block_type: "premier_predict",
        block_id: 43,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
        },
      };

    // case "match_highlights":
    //   return {
    //     block_type: "match_highlights",
    //     block_id: 44,
    //     is_active: true,
    //     sort_order,
    //     block_schema: {
    //       title: null,
    //       sub_title: null,
    //       background_color: null,
    //       border_radius: null,
    //       blur: null,
    //       text_color: null,
    //       color_start: null,
    //       color_center: null,
    //       color_end: null,
    //     },
    //     content: {
    //       is_dynamic: true,
    //       is_active: true,
    //     },
    //   };

    case "where_to_watch":
      return {
        block_type: "where_to_watch",
        block_id: 45,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
        },
      };

    case "where_to_watch_more":
      return {
        block_type: "where_to_watch_more",
        block_id: 46,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: false,
          is_active: true,
          sponser_image_1: "",
          description_1: "",
          sponser_image_2: "",
          description_2: "",
        },
      };

    case "all_jobs":
      return {
        block_type: "all_jobs",
        block_id: 47,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
        },
      };
    case "fullCalendar":
      return {
        block_type: "fullCalendar",
        block_id: 48,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: false,
          is_active: true,
          title: "",
          description: "",
          calender_url: "",
        },
      };
    case "player_info":
      return {
        block_type: "player_info",
        block_id: 49,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
        },
      };
    case "video_vertical":
      return {
        block_type: "video_vertical",
        block_id: 50,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
          type: "",
          title_position: "top",
          category_id: null,
          preview_style: "list",
          bento_key: "",
          module_type: "",
        },
      } as VideosVerticalBlock;
    case "about_info":
      return {
        block_type: "about_info",
        block_id: 51,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
        },
      };
    case "tournamenthero":
      return {
        block_type: "tournamenthero",
        block_id: 52,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
        },
      };
    case "player_seasons":
      return {
        block_type: "player_seasons",
        block_id: 53,
        is_active: true,
        sort_order,
        block_schema: {
          title: null,
          sub_title: null,
          background_color: null,
          border_radius: null,
          blur: null,
          text_color: null,
          color_start: null,
          color_center: null,
          color_end: null,
        },
        content: {
          is_dynamic: true,
          is_active: true,
        },
      };
    default:
      throw new Error(`Unknown block_type: ${block_type}`);
  }
};

export type MoreObjectTypes = {
  title: string;
  description: string;
  altText: string;
  thumbnailUrl: string;
  link: string;
  sponsor: {
    sponsor_url: string;
    sponsor_name: string;
    sponsor_img: string;
  };
  cta: {
    button_label: string;
    button_link: string;
  };
};

export const moreDefaultObjects = {
  title: "",
  description: "",
  altText: "",
  thumbnailUrl: "",
  link: "",
  sponsor: {
    sponsor_url: "",
    sponsor_name: "",
    sponsor_img: "",
  },
  cta: {
    button_icon: "",
    icon_color: "#000000",
    button_label: "",
    button_link: "",
    target_is_blank: true,
    module: "page",
    slug: "",
  },
} as MoreObjectTypes;

export const multipleAdsMoreDefaultObjects = {
  title: "",
  description: "",
  link: "",
  cta: [
    {
      button_icon: "",
      icon_color: "#000000",
      button_label: "",
      button_link: "",
      target_is_blank: true,
      module: "page",
      slug: "",
    },
  ],
  sponsor: [
    {
      sponsor_url: "",
      sponsor_name: "",
      sponsor_img: "",
    },
  ],
  bullet: [{ value: "" }],
  social: [
    {
      platform: "",
      link: "",
    },
  ],
};

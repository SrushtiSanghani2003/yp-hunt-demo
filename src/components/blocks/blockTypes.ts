interface BaseBlock {
  block_type: string;
  block_id: number;
  is_active: boolean;
  sort_order: number;
  // type:string;
}

interface BlockSchemaTypes {
  title: string | null;
  sub_title: string | null;
  background_color: string | null;
  border_radius: string | null;
  blur: string | null;
  text_color: string | null;
  color_start: string | null;
  color_center: string | null;
  color_end: string | null;
}

export type TextBlock = BaseBlock & {
  block_type: "text";
  content: {
    text: string;
  };
};

export type ImageBlock = BaseBlock & {
  block_type: "image";
  block_schema: BlockSchemaTypes;
  content: {
    imgUrl: string;
    img_width: number;
    img_height: number;
    is_dynamic: boolean;
    is_active: boolean;
    more: {
      title: string;
      description: string;
      alttext: string;
      thumbnailurl: string;
      link: string;
      sponsor: {
        sponsor_url: string;
        sponsor_name: string;
        sponsor_img: string;
      };
      cta: {
        button_label: string;
        button_name: string;
      };
    };
  };
};

export type VideoBlock = BaseBlock & {
  block_type: "video";
  block_schema: BlockSchemaTypes;
  content: {
    video_type: string;
    video_url: string;
    video_id: string;
    thumbnail_url: string;
    thumbnail_width: number;
    thumbnail_height: number;
    videofile_url: string;
    is_dynamic: boolean;
    is_active: boolean;
    more: {
      title: string;
      description: string;
      sponsor: {
        sponsor_url: string;
        sponsor_name: string;
        sponsor_img: string;
      };
    };
  };
};

export type CTABlock = BaseBlock & {
  block_type: "cta";
  block_schema: BlockSchemaTypes;
  content: {
    is_dynamic: boolean;
    is_active: boolean;
    btns: Array<{
      id: string;
      button_label: string;
      button_link: string;
      isnewtab: boolean;
    }>;
  };
};

export type QuoteBlock = BaseBlock & {
  block_type: "testimonials";
  content: {
    is_dynamic: boolean;
    is_active: boolean;
    quotes: Array<{
      id: string;
      quote_img_url: string;
      rating: number | string;
      quote_text: string;
      author: string;
      job_title: string;
      order: number;
    }>;
  };
};

export type PromotionBlock = BaseBlock & {
  block_type: "promotions";
  content: {
    is_dynamic: boolean;
    is_active: boolean;
    // provider: string;
    // network_code: string;
    // code: string;
    // display_on: string[];
    // promotionType: string;
    // startTime: number;
    // endTime: number;
    // location: string;
    // nativeImgUrl: string;
    banners: [
      {
        order: number;
        nativeImgUrl: string;
        mobileImgUrl: string;
        redirectUrl: string;
      }
    ];
  };
};

export type GalleryBlock = BaseBlock & {
  block_type: "gallery";
  content: {
    is_dynamic: boolean;
    is_active: boolean;
    gridImages: string[];
    carouselImages: string[];
  };
};

export type FaqBlock = BaseBlock & {
  block_type: "faq";
  content: {
    is_dynamic: boolean;
    is_active: boolean;
    divisions: Array<{
      id: string;
      title: string;
      faqs: Array<{
        id: string;
        faq_question: string;
        faq_answer: string;
        order: number | string;
      }>;
    }>;
  };
};

export type SocialBlock = BaseBlock & {
  block_type: "socialWall";
  content: {
    is_dynamic: boolean;
    is_active: boolean;
    platforms: Array<{
      platform_type: string;
      platform_url: string;
    }>;
  };
};

export type PartnerBlock = BaseBlock & {
  block_type: "partners";
  content: {
    is_dynamic: boolean;
    is_active: boolean;
    tiers: Array<{
      tier_name: string;
      partners: Array<{
        partner_url: string;
        partner_text: string;
      }>;
    }>;
  };
};

// export type BentoBoxBlock = BaseBlock & {
//   block_type: "bentoBox";
//   content: {
//     is_dynamic: boolean;
//     is_active: boolean;
//     bentoBoxes: any;
//     bento_key: string;
//   };
// };

export type NewsBlock = BaseBlock & {
  block_type: "news";
  content: {
    is_dynamic: boolean;
    is_active: boolean;
    type: string;
    news_count: number | string | null;
    category_id: number | string | null;
    preview_style: string;
    bento_key: string;
  };
};
export type ArticlesBlock = BaseBlock & {
  block_type: "articles";
  content: {
    is_dynamic: boolean;
    is_active: boolean;
    category_id: number | string | null;
    preview_style: string;
    bento_key: string;
  };
};
export type VideosBlock = BaseBlock & {
  block_type: "videos";
  content: {
    is_dynamic: boolean;
    is_active: boolean;
    category_id: number | string | null;
    preview_style: string;
    bento_key: string;
  };
};
export type VideosVerticalBlock = BaseBlock & {
  block_type: "video_vertical";
  content: {
    is_dynamic: boolean;
    is_active: boolean;
    category_id: number | string | null;
    preview_style: string;
    bento_key: string;
  };
};
export type AlbumsBlock = BaseBlock & {
  block_type: "albums";
  content: {
    is_dynamic: boolean;
    is_active: boolean;
    type: string;
    album_id: number | string | null;
    preview_style: string;
    bento_key: string;
  };
};

export type ShopBlock = BaseBlock & {
  block_type: "shop";
  content: {
    is_dynamic: boolean;
    is_active: boolean;
    shop_id: null | number | string;
  };
};

export type MembershipBlock = BaseBlock & {
  block_type: "membership";
  content: {
    is_dynamic: boolean;
    is_active: boolean;
    category_id: number | string | null;
    preview_style: string;
    bento_key: string;
  };
};

export type EventBlock = BaseBlock & {
  block_type: "event";
  content: {
    is_dynamic: boolean;
    is_active: boolean;
    category_id: number | string | null;
    preview_style: string;
    bento_key: string;
  };
};
export type OurspacesBlock = BaseBlock & {
  block_type: "ourspaces";
  content: {
    is_dynamic: boolean;
    is_active: boolean;
    category_id: number | string | null;
    preview_style: string;
    bento_key: string;
  };
};

export type GenerationBlock = BaseBlock & {
  block_type: "generation";
  content: {
    is_dynamic: boolean;
    is_active: boolean;
    generation: Array<{
      id: string;
      description: string;
      rank: number;
      order: number | string;
    }>;
  };
};
export type FullCalendarBlock = BaseBlock & {
  block_type: "fullCalendar";
  content: {
    is_dynamic: boolean;
    is_active: boolean;
    generation: Array<{
      id: string;
      description: string;
      rank: number;
      order: number | string;
    }>;
  };
};

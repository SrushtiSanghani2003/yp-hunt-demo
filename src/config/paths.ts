export const paths = {
  home: {
    path: "/dashboard",
    getHref: () => "/dashboard",
  },
  dashboard: {
    path: "/dashboard",
    getHref: () => "/dashboard",
  },
  navigation: {
    path: "/navigation",
    getHref: () => "/navigation",
    create: {
      path: "/navigation/create",
      getHref: () => "/navigation/create",
    },
    edit: {
      path: "/navigation/edit/:id",
      getHref: (id: number) => `/navigation/edit/${encodeURIComponent(id)}`,
    },
  },
  users: {
    path: "/users",
    getHref: () => "/users",

    allusers: {
      path: "/users/allusers",
      getHref: () => "/users/allusers",
      edit: {
        path: "/users/allusers/edit/:id",
        getHref: (id: number) =>
          `/users/allusers/edit/${encodeURIComponent(id)}`,
      },
      view: {
        path: "/users/allusers/view/:id",
        getHref: (id: number) =>
          `/users/allusers/view/${encodeURIComponent(id)}`,
      },
    },
    portaluser: {
      path: "/users/portaluser",
      getHref: () => "/users/portaluser",
      edit: {
        path: "/users/portaluser/edit/:id",
        getHref: (id: number) =>
          `/users/portaluser/edit/${encodeURIComponent(id)}`,
      },
      view: {
        path: "/users/portaluser/view/:id",
        getHref: (id: number) =>
          `/users/portaluser/view/${encodeURIComponent(id)}`,
      },
    },
    contactus: {
      path: "/users/contactus",
      getHref: () => "/users/contactus",
    },
    newsLetter: {
      path: "/users/newsletter",
      getHref: () => "/users/newsletter",
    },
  },

  media: {
    news: {
      path: "/media/news",
      getHref: () => "/media/news",
      create: {
        path: "/media/news/create",
        getHref: () => "/media/news/create",
      },
      edit: {
        path: "/media/news/edit/:id",
        getHref: (id: number) => `/media/news/edit/${encodeURIComponent(id)}`,
      },
    },
    articles: {
      path: "/media/articles",
      getHref: () => "/media/articles",
      create: {
        path: "/media/articles/create",
        getHref: () => "/media/articles/create",
      },
      edit: {
        path: "/media/articles/edit/:id",
        getHref: (id: number) =>
          `/media/articles/edit/${encodeURIComponent(id)}`,
      },
    },
    videos: {
      path: "/media/videos",
      getHref: () => "/media/videos",
      create: {
        path: "/media/videos/create",
        getHref: () => "/media/videos/create",
      },
      edit: {
        path: "/media/videos/edit/:id",
        getHref: (id: number) => `/media/videos/edit/${encodeURIComponent(id)}`,
      },
    },
    videoGroups: {
      path: "/media/videogroups",
      getHref: () => "/media/videogroups",
      videos: {
        path: "/media/videogroups/videos/:id",
        getHref: (id: number | string) =>
          `/media/videogroups/videos/${encodeURIComponent(id)}`,
      },
    },
    photos: {
      path: "/media/photos",
      getHref: () => "/media/photos",
      create: {
        path: "/media/photos/create",
        getHref: () => "/media/photos/create",
      },
      view: {
        path: "/media/photos/view/:id",
        getHref: (id: number | string) =>
          `/media/photos/view/${encodeURIComponent(id)}`,
      },
    },
  },

  ContentMedia: {
    path: "/contentmedia",
    getHref: () => "/contentmedia",
    folder: {
      path: "/contentmedia/:folderId",
      getHref: () => "/contentmedia/:folderId",
    },
  },

  commonPartners: {
    path: "/commonPartners",
    getHref: () => "/commonPartners",
  },
  account: {
    path: "/account",
    getHref: () => "/account",
    edit: {
      path: "/account/edit",
      getHref: () => "/account/edit",
    },
  },
  rolePermission: {
    path: "/account/roles/rolepermission/:id",
    getHref: (id: number) =>
      `/account/roles/rolepermission/${encodeURIComponent(id)}`,
  },
  module: {
    path: "/account/module",
    getHref: () => "/account/module",
    create: {
      path: "/account/module/create",
      getHref: () => "/account/module/create",
    },
    edit: {
      path: "/account/module/edit/:id",
      getHref: (id: number) => `/account/module/edit/${encodeURIComponent(id)}`,
    },
    permissions: {
      path: "/account/module/permissions/:id",
      getHref: (id: number) =>
        `/account/module/permissions/${encodeURIComponent(id)}`,
    },
  },
  groupmodule: {
    path: "/account/groupmodule",
    getHref: () => "/account/groupmodule",
    create: {
      path: "/account/groupmodule/create",
      getHref: () => "/account/groupmodule/create",
    },
    edit: {
      path: "/account/groupmodule/edit/:id",
      getHref: (id: number) =>
        `/account/groupmodule/edit/${encodeURIComponent(id)}`,
    },
  },
  conversation: {
    path: "/conversation",
    getHref: () => "/conversation",
    create: {
      path: "/conversation/create",
      getHref: () => "/conversation/create",
    },
    edit: {
      path: "/conversation/edit/:id",
      getHref: (id: number) => `/conversation/edit/${encodeURIComponent(id)}`,
    },
    group: {
      path: "/conversation/group/:groupId",
      getHref: (groupId: number) =>
        `/conversation/group/${encodeURIComponent(groupId)}`,

      create: {
        path: "/conversation/group/:groupId/create",
        getHref: (groupId: number) =>
          `/conversation/group/${encodeURIComponent(groupId)}/create`,
      },

      edit: {
        path: "/conversation/group/:groupId/edit/:id",
        getHref: (groupId: number, id: number) =>
          `/conversation/group/${encodeURIComponent(
            groupId,
          )}/edit/${encodeURIComponent(id)}`,
      },
    },
  },

  auth: {
    resetpassword: {
      path: "/auth/resetpassword",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/resetpassword${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
    login: {
      path: "/auth/login",
      getHref: (redirectTo?: string | null | undefined) => {
        if (!redirectTo || redirectTo === "/auth/login") {
          return "/auth/login";
        }
        return `/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`;
      },
    },
    verification: {
      path: "/auth/verification",
      getHref: () => "/auth/verification",
    },
    forgotPassword: {
      path: "/auth/forgot-password",
      getHref: () => "/auth/forgot-password",
    },
    resetPassword: {
      path: "/auth/reset-password",
      getHref: (token?: string) =>
        `/auth/reset-password${
          token ? `?token=${encodeURIComponent(token)}` : ""
        }`,
    },
  },
  pages: {
    path: "/pages",
    getHref: () => "/pages",
    create: {
      path: "/pages/create",
      getHref: () => "/pages/create",
    },
    edit: {
      path: "/pages/edit/:id",
      getHref: (id: number) => `/pages/edit/${encodeURIComponent(id)}`,
    },
  },
  gamezone: {
    path: "/gamezone",
    getHref: () => "/gamezone",
    quiz: {
      path: "/gamezone/quiz",
      getHref: () => "/gamezone/quiz",
      create: {
        path: "/gamezone/quiz/create",
        getHref: () => "/gamezone/quiz/create",
      },
      option: {
        create: {
          path: "/gamezone/quiz/create/option",
          getHref: () => "/gamezone/quiz/create/option",
        },
      },
      edit: {
        path: "/gamezone/quiz/edit/:id",
        getHref: (id: number) =>
          `/gamezone/quiz/edit/${encodeURIComponent(id)}`,
      },
    },
    predictor: {
      path: "/gamezone/predictor",
      getHref: () => "/gamezone/predictor",
      create: {
        path: "/gamezone/predictor/create",
        getHref: () => "/gamezone/predictor/create",
      },
      option: {
        create: {
          path: "/gamezone/predictor/create/option",
          getHref: () => "/gamezone/predictor/create/option",
        },
      },
      edit: {
        path: "/gamezone/predictor/edit/:id",
        getHref: (id: number) =>
          `/gamezone/predictor/edit/${encodeURIComponent(id)}`,
      },
    },
  },
  events: {
    path: "/events",
    getHref: () => "/events",
    type: {
      path: "/events/type",
      getHref: () => "/events/type",
      edit: {
        path: "/events/types/edit/:id",
        getHref: (id: number) => `/events/types/edit/${encodeURIComponent(id)}`,
      },
    },
    event: {
      path: "/events/event",
      getHref: () => "/events/event",
      create: {
        path: "/events/event/create",
        getHref: () => "/events/event/create",
      },
      edit: {
        path: "/events/event/edit/:id",
        getHref: (id: number) => `/events/event/edit/${encodeURIComponent(id)}`,
      },
    },
  },
  // shops: {
  //   path: "/shop",
  //   getHref: () => "/shop",
  //   shop: {
  //     path: "/shops/shop",
  //     getHref: () => "/shops/shop",
  //     create: {
  //       path: "/shops/shop/create",
  //       getHref: () => "/shops/shop/create",
  //     },
  //     edit: {
  //       path: "/shops/shop/edit/:id",
  //       getHref: (id: number) => `/shops/shop/edit/${encodeURIComponent(id)}`,
  //     },
  //   },
  //   product: {
  //     path: "/shops/product",
  //     getHref: () => "/shops/product",
  //     create: {
  //       path: "/shops/product/create",
  //       getHref: () => "/shops/product/create",
  //     },
  //     edit: {
  //       path: "/shops/product/edit/:id",
  //       getHref: (id: number) =>
  //         `/shops/product/edit/${encodeURIComponent(id)}`,
  //     },
  //   },
  // },
  shop: {
    path: "/shop",
    getHref: () => "/shop",
    create: {
      path: "/shop/create",
      getHref: () => "/shop/create",
    },
    edit: {
      path: "/shop/edit/:id",
      getHref: (id: number) => `/shop/edit/${encodeURIComponent(id)}`,
    },
  },

  airport: {
    path: "/airport",
    getHref: () => "/airport",
    create: {
      path: "/airport/create",
      getHref: () => "/airport/create",
    },
    edit: {
      path: "/airport/edit/:id",
      getHref: (id: number) => `/airport/edit/${encodeURIComponent(id)}`,
    },
  },

  players: {
    path: "/players",
    getHref: () => "/players",
    edit: {
      path: "/players/edit/:id",
      getHref: (id: number) => `/players/edit/${encodeURIComponent(id)}`,
    },
  },
  fixers: {
    path: "/fixers",
    getHref: () => "/fixers",
    tournaments: {
      path: "/fixers/tournaments",
      getHref: () => "/fixers/tournaments",
    },
    matches: {
      path: "/fixers/matches",
      getHref: () => "/fixers/matches",
    },
    teams: {
      path: "/fixers/teams",
      getHref: () => "/fixers/teams",
    },
  },
  tickets: {
    path: "/tickets",
    getHref: () => "/tickets",
  },
  membership: {
    path: "/membership",
    getHref: () => "/membership",
    create: {
      path: "/membership/create",
      getHref: () => "/membership/create",
    },
    edit: {
      path: "/membership/edit/:id",
      getHref: (id: number) => `/membership/edit/${encodeURIComponent(id)}`,
    },
  },
  ourspaces: {
    path: "/ourspaces",
    getHref: () => "/ourspaces",
    create: {
      path: "/ourspaces/create",
      getHref: () => "/ourspaces/create",
    },
    edit: {
      path: "/ourspaces/edit/:id",
      getHref: (id: number) => `/ourspaces/edit/${encodeURIComponent(id)}`,
    },
  },
  liveblog: {
    path: "/liveblog",
    getHref: () => "/liveblog",
  },
  templates: {
    path: "/templates",
    getHref: () => "/templates",
  },
  settings: {
    path: "/settings",
    getHref: () => "/settings",
  },
  languagelocalization: {
    path: "/languagelocalization",
    getHref: () => "/languagelocalization",
  },
  premierpredict: {
    path: "/premierpredict",
    getHref: () => "/premierpredict",
  },
  job: {
    path: "/jobs",
    getHref: () => "/jobs",
    allJobs: {
      path: "/jobs/allJobs",
      getHref: () => "/jobs/allJobs",
      create: {
        path: "/jobs/alljobs/create",
        getHref: () => "/jobs/alljobs/create",
      },
      edit: {
        path: "/jobs/alljobs/edit/:id",
        getHref: (id: number) => `/jobs/alljobs/edit/${encodeURIComponent(id)}`,
      },
    },
    categories: {
      path: "/jobs/categories",
      getHref: () => "/jobs/categories",
    },
    jobapplication: {
      path: "/jobs/jobapplications",
      getHref: () => "/jobs/jobapplications",
    },
  },
  travelrequest: {
    path: "/travelrequest",
    getHref: () => "/travelrequest",
    transportation: {
      path: "/travelrequest/transportation",
      getHref: () => "/travelrequest/transportation",
      edit: {
        path: "/travelrequest/transportation/edit/:id",
        getHref: (id: number) =>
          `/travelrequest/transportation/edit/${encodeURIComponent(id)}`,
      },
      uploadCsv: {
        path: "/travelrequest/transportation/upload-csv",
        getHref: () => "/travelrequest/transportation/upload-csv",
      },
    },
    accommodation: {
      path: "/travelrequest/accommodation",
      getHref: () => "/travelrequest/accommodation",
      edit: {
        path: "/travelrequest/accommodation/edit/:id",
        getHref: (id: number) =>
          `/travelrequest/accommodation/edit/${encodeURIComponent(id)}`,
      },
      uploadCsv: {
        path: "/travelrequest/accommodation/upload-csv",
        getHref: () => "/travelrequest/accommodation/upload-csv",
      },
    },
    accreditation: {
      path: "/travelrequest/accreditation",
      getHref: () => "/travelrequest/accreditation",
      edit: {
        path: "/travelrequest/accreditation/edit/:id",
        getHref: (id: number) =>
          `/travelrequest/accreditation/edit/${encodeURIComponent(id)}`,
      },
      uploadCsv: {
        path: "/travelrequest/accreditation/upload-csv",
        getHref: () => "/travelrequest/accreditation/upload-csv",
      },
    },
    flight: {
      path: "/travelrequest/flight",
      getHref: () => "/travelrequest/flight",
      edit: {
        path: "/travelrequest/flight/edit/:id",
        getHref: (id: number) =>
          `/travelrequest/flight/edit/${encodeURIComponent(id)}`,
      },
      uploadCsv: {
        path: "/travelrequest/flight/upload-csv",
        getHref: () => "/travelrequest/flight/upload-csv",
      },
    },
  },
  tournaments: {
    path: "/tournaments",
    getHref: () => "/tournaments",
    edit: {
      path: "/tournaments/edit/:id",
      getHref: (id: number) => `/tournaments/edit/${encodeURIComponent(id)}`,
    },
    transport: {
      path: "/tournaments/transport/:id",
      getHref: (id: number) =>
        `/tournaments/transport/${encodeURIComponent(id)}`,
    },
    info: {
      path: "/tournaments/info/edit/:id",
      getHref: (id: number) =>
        `/tournaments/info/edit/${encodeURIComponent(id)}`,
    },
  },
  wheretowatch: {
    path: "/wheretowatch",
    getHref: () => "/wheretowatch",
    create: {
      path: "/wheretowatch/create",
      getHref: () => "/wheretowatch/create",
    },
    edit: {
      path: "/wheretowatch/edit/:id",
      getHref: (id: number) =>
        `/gamezone/predictor/edit/${encodeURIComponent(id)}`,
    },
  },
  announcements: {
    path: "/announcements",
    getHref: () => "/announcements",
    create: {
      path: "/announcements/create",
      getHref: () => "/announcements/create",
    },
    edit: {
      path: "/announcements/edit/:id",
      getHref: (id: number) => `/announcements/edit/${encodeURIComponent(id)}`,
    },
  },
  documentation: {
    path: "/documentation",
    getHref: () => "/documentation",
    create: {
      path: "/documentation/create",
      getHref: () => "/documentation/create",
    },
    edit: {
      path: "/documentation/edit/:id",
      getHref: (id: number) => `/documentation/edit/${encodeURIComponent(id)}`,
    },
  },
  country: {
    path: "/country",
    getHref: () => "/country",
    create: {
      path: "/country/create",
      getHref: () => "/country/create",
    },
    edit: {
      path: "/country/edit/:id",
      getHref: (id: number) => `/country/edit/${encodeURIComponent(id)}`,
    },
  },
  matches: {
    path: "/matches",
    getHref: () => "/matches",
    // create: {
    //   path: "/matches/create",
    //   getHref: () => "/matches/create",
    // },
    // edit: {
    //   path: "/wheretowatch/edit/:id",
    //   getHref: (id: number) =>
    //     `/gamezone/predictor/edit/${encodeURIComponent(id)}`,
    // },
  },
};

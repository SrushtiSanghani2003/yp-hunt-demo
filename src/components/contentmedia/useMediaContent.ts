// import { useDispatch } from "react-redux";
// import api from "../../lib/api";
// import { useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";
// import {
//   setAllContentMedia,
// } from "../../redux-toolkit/contentLibrarySlice";

// export const useMediaContent = () => {
//   const dispatch = useDispatch();

//   const getAllFolders = async () => {
//     return await api.get("/content-library/folders");
//   };

//   const getAllFiles = async () => {
//     return await api.get("/content-library/files");
//   };

//   const { data: allFolders } = useQuery({
//     queryKey: ["folders"],
//     queryFn: getAllFolders,
//     refetchOnWindowFocus: false,
//   });

//   const { data: allFiles } = useQuery({
//     queryKey: ["files"],
//     queryFn: getAllFiles,
//     refetchOnWindowFocus: false,
//   });

//   useEffect(() => {
//     if (allFolders) {
//       dispatch(setFolder(allFolders?.data));
//     }
//   }, [allFolders]);

//   useEffect(() => {
//     if (allFiles) {
//       dispatch(setFile(allFiles?.data?.files));
//     }
//   }, [allFiles]);

//   useEffect(() => {
//     if (allFolders?.data && allFiles?.data?.files) {
//       const combined = [
//         ...allFolders?.data.map((f: any) => ({ ...f, mediaType: "folder" })),
//         ...allFiles?.data?.files.map((f: any) => ({ ...f, mediaType: "file" })),
//       ];
//       dispatch(setAllContentMedia(combined));
//     }
//   }, [allFolders, allFiles]);
// };

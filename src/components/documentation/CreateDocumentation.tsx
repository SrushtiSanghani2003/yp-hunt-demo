import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import AsyncSelect from "react-select/async";

import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import Input from "../ui/input/Input";

import { paths } from "../../config/paths";
import { customStyles } from "../account-settings/CreateCategories";
import api from "../../lib/api";

import {
  selectDocuments,
  setTournamentId,
  setDocuments,
  updateDocument,
  removeDocument,
} from "../../redux-toolkit/documentationSlice";

import {
  useCreateDocumentation,
  useGetDocumentsById,
  useUpdateDocumentation,
} from "../../hooks/useDocumentation";

import { closeIcon, plusIcon } from "../../icons";
import { normalizeDocumentsResponse } from "./normalizer/normalizerDocumentation";
import { showToast } from "../../utils/toastUtils";
import { useScroll } from "../../hooks/ScrollContext";

export default function CreateDocumentation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const documentsState = useSelector(selectDocuments);
  const { documents } = documentsState;
  const createDocumentationMutation = useCreateDocumentation(documentsState);
  const updateDocumentationMutation = useUpdateDocumentation(documentsState);
  const { data: documentsDataById } = useGetDocumentsById(id);
  const [selectedTournament, setSelectedTournament] = useState<any | null>(
    null,
  );
  const [isUploading, setIsUploading] = useState(false);
  console.log("🚀 ~ CreateDocumentation ~ isUploading:", isUploading);
  /* ---------------- Tournament Dropdown ---------------- */
  const getAllTournaments = async () => {
    const res = await api.get("/tournament/getDropdown");
    return res.data;
  };

  const { data: allTournaments = [] } = useQuery({
    queryKey: ["tournaments"],
    queryFn: getAllTournaments,
    refetchOnWindowFocus: false,
  });

  const tournamentOptions = useMemo(
    () =>
      allTournaments.map((item: any) => ({
        value: item.id,
        label: item.name,
      })),
    [allTournaments],
  );
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files[0], index);
    }
  };

  const processFiles = (file: File, index: number) => {
    uploadDocumentFile(file, index);
  };

  const uploadDocumentFile = async (file: File, index: number) => {
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);

    try {
      const res = await api.post("/articles/upload/documents", formData);

      const uploaded = res?.data?.[0];
      if (!uploaded?.url) {
        throw new Error("No URL returned");
      }

      dispatch(
        updateDocument({
          index,
          data: {
            files: uploaded?.url,
            extension: uploaded.extension || file.name.split(".").pop(),
            type: file.type,
          },
        }),
      );

      showToast("File uploaded successfully", "success");
    } catch (err) {
      console.error(err);
      showToast("Upload failed", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const loadOptionsTournaments = (
    inputValue: string,
    callback: (options: any[]) => void,
  ) => {
    const filtered = tournamentOptions.filter((t: any) =>
      t.label.toLowerCase().includes(inputValue.toLowerCase()),
    );

    callback((inputValue ? filtered : tournamentOptions).slice(0, 50));
  };

  const handleTournamentChange = (selected: any) => {
    setSelectedTournament(selected);
    dispatch(setTournamentId(selected?.value ?? null));
  };

  /* ---------------- Add Card ---------------- */
  const handleAddDocumentCard = () => {
    dispatch(
      setDocuments([
        ...documents,
        {
          title: "",
          files: "",
          type: "",
          extension: "",
          display_order: documents.length + 1,
        },
      ]),
    );
  };

  /* ---------------- Submit ---------------- */
  const handleDocumentationSubmit = () => {
    if (isEditMode && id) {
      updateDocumentationMutation.mutate(id);
    } else {
      createDocumentationMutation.mutate();
    }
  };
  useEffect(() => {
    if (isEditMode && documentsDataById) {
      const normalized = normalizeDocumentsResponse(documentsDataById);

      dispatch(setTournamentId(normalized.tournaments_id));
      dispatch(setDocuments(normalized.documents));

      const selected = tournamentOptions.find(
        (t: any) => t.value === normalized.tournaments_id,
      );

      setSelectedTournament(selected || null);
    }
  }, [isEditMode, documentsDataById, tournamentOptions, dispatch]);

  /* ---------------- UI ---------------- */
  return (
    <div>
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Documentation Builder"
          onSaveTemplate={() => navigate(paths.documentation.path)}
          onSaveTemplateTitle="Cancel"
          onSubmitLoading={
            createDocumentationMutation.isPending ||
            updateDocumentationMutation.isPending
          }
          onSubmit={handleDocumentationSubmit}
          isEditMode={isEditMode}
        />
      </div>
      <div className="container grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-11">
          <div className="bg-white border border-primary rounded-2xl p-5">
            {/* Tournament */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">Tournament</label>
              <AsyncSelect
                cacheOptions
                styles={customStyles}
                loadOptions={loadOptionsTournaments}
                defaultOptions={tournamentOptions.slice(0, 50)}
                placeholder="Type to search tournament"
                value={selectedTournament}
                onChange={handleTournamentChange}
              />
            </div>

            {/* Documents */}
            <h3 className="font-semibold mb-4">Documents</h3>

            {/* Cards */}
            <div className="space-y-4">
              {documents.map((doc: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="relative border border-primary rounded-xl p-4 bg-gray-50"
                  >
                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => dispatch(removeDocument(index))}
                      className="absolute top-3 right-3"
                    >
                      <img src={closeIcon} alt="Remove" />
                    </button>

                    <div className="grid gap-4">
                      {/* Title */}
                      <div className="col-span-6">
                        <Input
                          label="Title"
                          value={doc.title}
                          placeholder="Enter title"
                          onChange={(e) =>
                            dispatch(
                              updateDocument({
                                index,
                                data: { title: e.target.value },
                              }),
                            )
                          }
                        />
                      </div>

                      {/* File */}
                      <div className="col-span-6">
                        <Input
                          ref={inputRef}
                          label="File"
                          type="file"
                          value={doc.file}
                          inputCss="!pr-2"
                          onChange={(e) => handleFileChange(e, index)}
                        />
                        {doc.files && (
                          <p className="text-gray-600 text-sm  mt-2">
                            Current file: {doc.files}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Button */}
            <div className="mt-5">
              <button
                type="button"
                onClick={handleAddDocumentCard}
                className="px-4 py-2 bg-primary text-black rounded-lg flex justify-center gap-2"
              >
                <img src={plusIcon} alt="" /> Add Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import ContentPanel from "../contentPanel/ContentPanel";
import Button from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPrediction,
  selectPrediction,
  setFullPrediction,
  setPredictionAuthentication,
  setPredictionGeoBlockContent,
  setPredictionHierarchyContent,
  setPredictionPublishContent,
  setPredictionTranslationField,
  updatePredictionMetadataField,
} from "../../redux-toolkit/predictionSlice";
import MetaData from "../metaData";
import api from "../../lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { showToast } from "../../utils/toastUtils";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../config/paths";
import { normalizePredictionResponse } from "./normalizer/normalizePrediction";
import { resetTags, setTags } from "../../redux-toolkit/tagSlice";
import Input from "../ui/input/Input";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import ContentLibrary from "../contentPanel/ContentLibrary";
import { concatImgURL } from "../../config/function";

export default function PredictorCreate() {
  const prediction = useSelector(selectPrediction);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  // const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams();
  const isEditMode = Boolean(id);

  // const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
  //   null
  // );

  const fetchPredictionById = async (id: string) => {
    return await api.get(`/prediction/${id}`);
  };

  const { data: normalizePredictionData } = useQuery({
    queryKey: ["predictions", id],
    queryFn: () => fetchPredictionById(id as string),
    enabled: isEditMode,
    select: (response) => {
      const prediction = response.data;
      return {
        normalized: normalizePredictionResponse(prediction),
        tags: prediction.tags,
        closedAt: prediction.closed_at,
      };
    },
  });

  const createPrediction = async () => {
    // const updatePrediction = { ...prediction };

    const res = await api.post("/prediction", prediction);
    return res.data;
  };

  const createPredictionMutation = useMutation({
    mutationFn: createPrediction,
    onSuccess: () => {
      showToast("Prediction created successfully", "success");
      navigate(paths.gamezone.predictor.path);
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });

  const updatePredictionMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.put(`/prediction/${id}`, prediction);
    },
    onSuccess: () => {
      showToast("Prediction Updated", "success");
      dispatch(resetTags());
      dispatch(resetPrediction());
      navigate(paths.gamezone.predictor.path);
    },
    onError: () => {
      showToast("Error updating Prediction", "error");
    },
  });

  // MetaData Onchange Function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "seo_title" | "seo_tag" | "seo_description"
  ) => {
    dispatch(updatePredictionMetadataField({ field, value: e.target.value }));
  };

  const handlePrediction = (id: string) => {
    if (isEditMode) {
      updatePredictionMutation.mutate(id);
    } else {
      createPredictionMutation.mutate();
    }
  };

  // useEffect(() => {
  //   if (isEditMode && predictionDataById?.data) {
  //     const normalizePrediction = normalizePredictionResponse(
  //       predictionDataById?.data
  //     );
  //     dispatch(setFullPrediction(normalizePrediction));
  //     dispatch(setTags(predictionDataById?.data.tags || []));
  //     setOptions(normalizePrediction.options as any[]);
  //     setUtcDate(predictionDataById?.data?.closed_at || "");
  //   }
  // }, [predictionDataById]);
  useEffect(() => {
    if (isEditMode && normalizePredictionData) {
      dispatch(setFullPrediction(normalizePredictionData.normalized));
      dispatch(setTags(normalizePredictionData.tags));
      // setUtcDate(normalizePredictionData.closedAt);
    }
  }, [normalizePredictionData]);

  // useEffect(() => {
  //   console.log({ prediction });
  // }, [prediction]);

  return (
    <div className="mt-10">
      <BuilderHeader
        title="Predictor"
        saveButtonText="Save"
        onSubmitLoading={
          createPredictionMutation.isPending ||
          updatePredictionMutation.isPending
        }
        // onSaveTemplateTitle="Save Draft"
        // onSaveTemplate={() => console.log("Template saved")}
        onSubmit={() => handlePrediction(String(id))}
      />

      <div className="grid grid-cols-12 xl:gap-sp30 lg:gap-sp16 gap-sp9">
        <div className="lg:col-span-11 md:col-span-10 col-span-10 mb-5">
          <div className="bg-white md:mb-5 mb-3 border-0.5 border-primary rounded-15 md:p-5 p-3">
            <div className="md:mb-6 mb-2">
              <label
                htmlFor="title"
                className="block w-full font-medium md:text-base text-sm md:mb-3 mb-1"
              >
                Content Title<sup>*</sup>
              </label>
              <input
                type="text"
                id="title"
                value={prediction.translation.title || ""}
                onChange={(e) =>
                  dispatch(
                    setPredictionTranslationField({
                      field: "title",
                      value: e.target.value,
                    })
                  )
                }
                placeholder="Enter Title Here..."
                className="md:pb-4 pb-1 border-b-0.5 md:text-base text-sm border-primary w-full focus-within:outline-none"
              />
            </div>
            <div className="md:mb-5 mb-1">
              <label
                htmlFor="summary"
                className="block font-medium md:text-base text-sm  w-full md:mb-2 mb-1"
              >
                Overview
              </label>
              <textarea
                id="summary"
                value={prediction.translation.description || ""}
                onChange={(e) =>
                  dispatch(
                    setPredictionTranslationField({
                      field: "description",
                      value: e.target.value,
                    })
                  )
                }
                placeholder="Enter Overview Here..."
                className="md:p-4 p-2 border-0.5 border-primary rounded-2xl   h-sp70 md:text-base text-sm resize-none w-full focus-within:outline-none"
              ></textarea>
            </div>

            <div>
              <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
                <div className="md:w-sp170 w-20 h-full">
                  {prediction.translation.prediction_image_url ? (
                    <img
                      src={concatImgURL(prediction.translation.prediction_image_url) ?? ""}
                      loading="lazy"
                      alt="Uploaded"
                      className="w-full h-full rounded-2xl border-0.5 border-primary block align-middle object-cover"
                    />
                  ) : (
                    <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                      <img src={mediaIcon} alt="Placeholder" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    label="Image URL"
                    placeholder="https://www.example.com"
                    className="m-0"
                    value={concatImgURL(prediction.translation.prediction_image_url || "")}
                    readOnly
                  />
                  <div>
                    {prediction.translation.prediction_image_url ? (
                      <Button
                        text="Remove Image"
                        icon={closeIcon}
                        backgroundColor="transparent"
                        className="pb-0 "
                        imageclassName="md:w-5 w-3 md:h-5 h-3"
                        onClick={() =>
                          dispatch(
                            setPredictionTranslationField({
                              field: "prediction_image_url",
                              value: "",
                            })
                          )
                        }
                      />
                    ) : (
                      <Button
                        icon={plusIcon}
                        text="Add Image"
                        backgroundColor="transparent"
                        className="pb-0 pt-0"
                        imageclassName="md:w-5 w-3 md:h-5 h-3"
                        onClick={() => setShow(true)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <MetaData metadata={prediction.metadata} onChange={handleChange} />
        </div>
        <div className="lg:col-span-1 col-span-2">
          <ContentPanel
            data={prediction}
            onAuthsave={(payload) =>
              dispatch(setPredictionAuthentication(payload))
            }
            onGeoSave={(payload) =>
              dispatch(setPredictionGeoBlockContent(payload))
            }
            onPublishSave={(payload) =>
              dispatch(setPredictionPublishContent(payload))
            }
            onHierarchySave={(payload) =>
              dispatch(setPredictionHierarchyContent(payload))
            }
          />
        </div>
      </div>
      {show && (
        <ContentLibrary
          open={show}
          onClose={() => setShow(false)}
          mediaFilter="image"
          onSelect={(url: string) => {
            dispatch(
              setPredictionTranslationField({
                field: "prediction_image_url",
                value: url,
              })
            );
          }}
        />
      )}
    </div>
  );
}

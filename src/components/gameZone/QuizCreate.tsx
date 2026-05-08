import { useDispatch, useSelector } from "react-redux";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import {
  resetQuiz,
  selectQuiz,
  setFullQuiz,
  setQuizAuthentication,
  setQuizGeoBlockContent,
  setQuizHierarchyContent,
  setQuizPublishContent,
  setQuizTranslationField,
  updateQuizMetadataField,
} from "../../redux-toolkit/quizSlice";
import ContentPanel from "../contentPanel/ContentPanel";
import MetaData from "../metaData";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { showToast } from "../../utils/toastUtils";
import { useNavigate, useParams } from "react-router-dom";
import { normalizeQuizResponse } from "./normalizer/normalizeQuiz";
import { resetTags, setTags } from "../../redux-toolkit/tagSlice";
import { paths } from "../../config/paths";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import ContentLibrary from "../contentPanel/ContentLibrary";
import { concatImgURL } from "../../config/function";

const QuizCreate = () => {
  const quiz = useSelector(selectQuiz);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  // MetaData Onchange Function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "seo_title" | "seo_tag" | "seo_description"
  ) => {
    dispatch(updateQuizMetadataField({ field, value: e.target.value }));
  };

  const fetchQuizById = async (id: string) => {
    return await api.get(`/quiz/${id}`);
  };

  const { data: normalizedQuizData } = useQuery({
    queryKey: ["quizzes", id],
    queryFn: () => fetchQuizById(id as string),
    enabled: isEditMode,
    select: (response) => {
      const quiz = response.data;
      return {
        normalized: normalizeQuizResponse(quiz),
        tags: quiz.tags,
      };
    },
  });

  const createQuiz = async () => {
    const res = await api.post("/quiz/", quiz);
    return res.data;
  };

  const createQuizMutation = useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      showToast("Quiz Created", "success");
      navigate(paths.gamezone.quiz.path);
    },
    onError: () => {
      showToast("Error Creating Quiz", "error");
    },
  });

  const updateQuizMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.put(`/quiz/${id}`, quiz);
    },
    onSuccess: () => {
      showToast("Quiz Updated", "success");
      dispatch(resetTags());
      dispatch(resetQuiz());
      navigate(paths.gamezone.quiz.path);
    },
    onError: () => {
      showToast("Error updating Quiz", "error");
    },
  });

  const handleQuiz = (id: string) => {
    if (isEditMode) {
      updateQuizMutation.mutate(id);
    } else {
      createQuizMutation.mutate();
    }
  };

  // useEffect(() => {
  //   if (isEditMode && quizDataById?.data) {
  //     const normalizeQuiz = normalizeQuizResponse(quizDataById?.data);
  //     dispatch(setTags(quizDataById?.data?.tags));
  //     dispatch(setFullQuiz(normalizeQuiz));
  //   }
  // }, [quizDataById]);
  useEffect(() => {
    if (isEditMode && normalizedQuizData) {
      dispatch(setTags(normalizedQuizData.tags));
      dispatch(setFullQuiz(normalizedQuizData.normalized));
    }
  }, [normalizedQuizData]);

  // useEffect(() => {
  // }, [quiz]);

  return (
    <div className="mt-10">
      <BuilderHeader
        title="Quiz"
        saveButtonText="Save"
        onSubmitLoading={
          createQuizMutation.isPending || updateQuizMutation.isPending
        }
        // onSaveTemplateTitle="Save Draft"
        // onSaveTemplate={() => console.log("Template saved")}
        onSubmit={() => handleQuiz(String(id))}
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
                value={quiz.translation.title || ""}
                onChange={(e) =>
                  dispatch(
                    setQuizTranslationField({
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
                value={quiz.translation.description || ""}
                onChange={(e) =>
                  dispatch(
                    setQuizTranslationField({
                      field: "description",
                      value: e.target.value,
                    })
                  )
                }
                placeholder="Enter Overveiw Here..."
                className="md:p-4 p-2 border-0.5 border-primary rounded-2xl   h-sp70 md:text-base text-sm resize-none w-full focus-within:outline-none"
              ></textarea>
            </div>

            <div>
              <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
                <div className="md:w-sp170 w-20 h-full">
                  {quiz.translation.quiz_image_url ? (
                    <img
                      src={concatImgURL(quiz.translation.quiz_image_url) ?? ""}
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
                    value={concatImgURL(quiz.translation.quiz_image_url || "")}
                    readOnly
                  />
                  <div>
                    {quiz.translation.quiz_image_url ? (
                      <Button
                        text="Remove Image"
                        icon={closeIcon}
                        backgroundColor="transparent"
                        className="pb-0 "
                        imageclassName="md:w-5 w-3 md:h-5 h-3"
                        onClick={() =>
                          dispatch(
                            setQuizTranslationField({
                              field: "quiz_image_url",
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

          <MetaData metadata={quiz.metadata} onChange={handleChange} />
        </div>
        <div className="lg:col-span-1 col-span-2">
          <ContentPanel
            data={quiz}
            onAuthsave={(payload) => dispatch(setQuizAuthentication(payload))}
            onGeoSave={(payload) => dispatch(setQuizGeoBlockContent(payload))}
            onPublishSave={(payload) =>
              dispatch(setQuizPublishContent(payload))
            }
            onHierarchySave={(payload) =>
              dispatch(setQuizHierarchyContent(payload))
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
              setQuizTranslationField({
                field: "quiz_image_url",
                value: url,
              })
            );
          }}
        />
      )}
    </div>
  );
};

export default QuizCreate;

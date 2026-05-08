import { useEffect, useRef, useState } from "react";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
// import ContentPanel from "../contentPanel/ContentPanel";
import {
  arrowDownIcon,
  arrowUpIcon,
  chevronDown,
  closeIcon,
  deleteIconblack,
  mediaIcon,
  // minusIcon,
  plusIcon,
} from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import { useLocation, useNavigate } from "react-router-dom";
import ContentLibrary from "../contentPanel/ContentLibrary";
import {
  denormalizeQuizQuestionsFromAPI,
  normalizeQuizQuestionsForAPI,
} from "./normalizer/normalizeQuizQuestion";
import api from "../../lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { showToast } from "../../utils/toastUtils";
import { paths } from "../../config/paths";
import { v4 as uuidv4 } from "uuid";
import { concatImgURL } from "../../config/function";

export default function QuizOptionCreate() {
  // State for multiple questions
  // const [questions, setQuestions] = useState([
  //   {
  //     questionText: "",
  //     questionType: "text" as "text" | "image",
  //     options: [{ text: "", image: "", isCorrect: false }],
  //     isChoiceOpen: false,
  //   },
  // ]);

  const { state } = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      type: "single",
      question_mode: "text",
      question_text: "",
      timer: 0,
      points: null,
      order: 1,
      options: [
        {
          order: 1,
          is_correct: false,
          option_text: "",
          option_image_url: "",
        },
        {
          order: 2,
          is_correct: false,
          option_text: "",
          option_image_url: "",
        },
      ],
    },
  ]);
  const [choiceOpenMap, setChoiceOpenMap] = useState<Record<number, boolean>>(
    {}
  );
  const dropdownRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [timerOpenMap, setTimerOpenMap] = useState<Record<number, boolean>>({});
  const timerRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [show, setShow] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );
  const [_isEditMode, setIsEditMode] = useState(false);

  const getQuestionsByQuizId = async (quizId: string) => {
    const res = await api.get(`/quiz/${quizId}/questions/`);
    return res.data;
  };

  const { data: questionsDataByQuizId } = useQuery({
    queryKey: ["questionsDataByQuizId"],
    queryFn: () => getQuestionsByQuizId(state.quizId),
    enabled: !!state.quizId,
  });

  useEffect(() => {
    if (questionsDataByQuizId?.questions?.length > 0) {

      const gotQuestions: any = denormalizeQuizQuestionsFromAPI(
        questionsDataByQuizId?.questions
      );
      setIsEditMode(true);
      setQuestions(gotQuestions);
    } else {
      setIsEditMode(false);
      setQuestions([
        {
          id: uuidv4(),
          type: "single",
          question_mode: "text",
          question_text: "",
          timer: 0,
          points: null,
          order: 1,
          options: [
            {
              order: 1,
              is_correct: false,
              option_text: "",
              option_image_url: "",
            },
            {
              order: 2,
              is_correct: false,
              option_text: "",
              option_image_url: "",
            },
          ],
        },
      ]);
    }
  }, [questionsDataByQuizId]);

  // Add a new question
  const handleAddQuestion = () => {
    const nextOrder = questions.length + 1;
    setQuestions([
      ...questions,
      {
        id: uuidv4(),
        type: "single",
        question_mode: "text",
        question_text: "",
        timer: 0,
        points: null,
        order: nextOrder,
        options: [
          {
            order: 1,
            is_correct: false,
            option_text: "",
            option_image_url: "",
          },
          {
            order: 2,
            is_correct: false,
            option_text: "",
            option_image_url: "",
          },
        ],
      },
    ]);
  };

  // Update question text
  const handleQuestionChange = (
    index: number,
    field:
      | "type"
      | "question_mode"
      | "question_text"
      | "timer"
      | "points"
      | "order",
    value: string | number
  ) => {
    if (field === "timer") {
      value = Number(value);
    }
    const updatedQuestions: any = [...questions];
    if (field === "type") {
      // if switching from multiple to single
      if (updatedQuestions[index].type === "multiple" && value === "single") {
        updatedQuestions[index].options = updatedQuestions[index].options.map(
          (opt: any, i: number) => ({
            ...opt,
            is_correct: i === 0,
          })
        );
      }
    }

    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Update question type
  const handleQuestionTypeChange = (index: number, type: "text" | "image") => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question_mode = type;
    // updatedQuestions[index].options = updatedQuestions[index].options.map(
    //   (option) => ({
    //     ...option,
    //     option_image_url: option.option_image_url || "",
    //   })
    // );
    updatedQuestions[index].options = [
      {
        order: 1,
        is_correct: false,
        option_text: "",
        option_image_url: "",
      },
      {
        order: 2,
        is_correct: false,
        option_text: "",
        option_image_url: "",
      },
    ];
    setQuestions(updatedQuestions);
  };

  const handleToggleChoiceOpen = (index: number) => {
    setChoiceOpenMap((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleToggleTimerOpen = (index: number) => {
    setTimerOpenMap((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Add a new option to a specific question
  const handleAddOption = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    const currentOptions = updatedQuestions[questionIndex].options;
    const nextOrder = currentOptions.length + 1;
    updatedQuestions[questionIndex].options = [
      ...currentOptions,
      {
        order: nextOrder,
        is_correct: false,
        option_text: "",
        option_image_url: "",
      },
    ];
    setQuestions(updatedQuestions);
  };

  // Delete an option from a specific question
  const handleDeleteOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    const updatedOptions = updatedQuestions[questionIndex].options
      .filter((_, i) => i !== optionIndex)
      .map((option, i) => ({
        ...option,
        order: i + 1,
      }));
    updatedQuestions[questionIndex].options = updatedOptions;
    setQuestions(updatedQuestions);
  };

  // Update option text or image URL
  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    field: "option_text" | "option_image_url",
    value: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex][field] = value;
    setQuestions(updatedQuestions);
  };

  // Toggle correct option
  const handleToggleCorrect = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];
    const option = question.options[optionIndex];
    // updatedQuestions[questionIndex].options[optionIndex].is_correct =
    //   !updatedQuestions[questionIndex].options[optionIndex].is_correct;
    if (question.type === "single") {
      // If already selected → deselect it
      if (option.is_correct) {
        question.options[optionIndex].is_correct = false;
      } else {
        // Deselect others, select only this one
        question.options = question.options.map((opt, i) => ({
          ...opt,
          is_correct: i === optionIndex,
        }));
      }
    } else {
      // multiple — just toggle
      question.options[optionIndex].is_correct = !option.is_correct;
    }
    setQuestions(updatedQuestions);
  };

  // Delete a question
  const handleDeleteQuestion = (questionIndex: number) => {
    const updatedQuestions = questions
      .filter((_, i) => i !== questionIndex)
      .map((q, i) => ({
        ...q,
        order: i + 1,
      }));
    setQuestions(updatedQuestions);
  };

  // Move question up or down
  const moveQuestionUp = (index: number) => {
    if (index === 0) return; // can't move first question up

    const updated = [...questions];
    // swap with previous
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    // reset order
    const reordered = updated.map((q, i) => ({ ...q, order: i + 1 }));
    setQuestions(reordered);
  };

  const moveQuestionDown = (index: number) => {
    if (index === questions.length - 1) return; // can't move last question down

    const updated = [...questions];
    // swap with next
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    // reset order
    const reordered = updated.map((q, i) => ({ ...q, order: i + 1 }));
    setQuestions(reordered);
  };

  const addQuestion = async () => {
    const normalizedQuestions = normalizeQuizQuestionsForAPI(questions, false);

    const res = await api.post(
      `/quiz/${state.quizId}/questions`,
      normalizedQuestions
    );
    return res.data;
  };

  const addQuestionMutation = useMutation({
    mutationFn: addQuestion,
    onSuccess: () => {
      showToast("Questions added successfully", "success");
      navigate(paths.gamezone.quiz.path);
    },
    onError: () => {
      showToast("Failed to add questions", "error");
    },
  });

  const updatedQuestion = async () => {
    const normalizedQuestions = normalizeQuizQuestionsForAPI(questions, true);
  

    const res = await api.put(
      `/quiz/questions/${state.quizId}`,
      normalizedQuestions
    );
    return res.data;
  };

  const updateQuestionMutation = useMutation({
    mutationFn: updatedQuestion,
    onSuccess: () => {
      showToast("Questions Updated successfully", "success");
      navigate(paths.gamezone.quiz.path);
    },
    onError: () => {
      showToast("Failed to update questions", "error");
    },
  });

  const handleQuizQuestion = () => {
    // if (isEditMode) {
    updateQuestionMutation.mutate();
    // } else {
    //   addQuestionMutation.mutate();
    // }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.entries(dropdownRefs.current).forEach(([index, ref]) => {
        if (ref && !ref.contains(event.target as Node)) {
          setChoiceOpenMap((prev) => ({
            ...prev,
            [Number(index)]: false,
          }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.entries(timerRefs.current).forEach(([index, ref]) => {
        if (ref && !ref.contains(event.target as Node)) {
          setTimerOpenMap((prev) => ({
            ...prev,
            [Number(index)]: false,
          }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // useEffect(() => {
  //   console.log({ questions });
  // }, [questions]);

  return (
    <div className="mt-10">
      <BuilderHeader
        title="Quiz Questions"
        saveButtonText="Save"
        // onSaveTemplateTitle="Save Draft"
        // onSaveTemplate={() => console.log("Template saved")}
        onSubmit={() => handleQuizQuestion()}
        onSubmitLoading={
          addQuestionMutation.isPending || updateQuestionMutation.isPending
        }
      />

      <div className="grid grid-cols-12 xl:gap-sp30 lg:gap-sp16 gap-sp9">
        <div className="lg:col-span-12 md:col-span-12 col-span-12 mb-5">
          <div className="bg-white md:mb-5 mb-3 border-0.5 border-primary rounded-15 md:p-5 p-3">
            <p className="text-base font-medium">{state && state.quizTitle}</p>
          </div>

          {questions.map((question, questionIndex) => (
            <div
              key={questionIndex}
              className="bg-white md:mb-5 mb-3 border-0.5 border-primary rounded-15 md:p-5 p-3"
            >
              <div className="flex justify-end items-center">
                <div className="flex items-center md:gap-5 gap-2">
                  <Button
                    icon={arrowUpIcon}
                    backgroundColor="transparent"
                    className={`p-0 md:w-5 w-3 md:h-5 h-3 ${
                      questionIndex === 0
                        ? "opacity-30 cursor-not-allowed"
                        : "opacity-100"
                    }`}
                    onClick={() => moveQuestionUp(questionIndex)}
                    disabled={questionIndex === 0}
                  />
                  <Button
                    icon={arrowDownIcon}
                    backgroundColor="transparent"
                    className={`p-0 md:w-5 w-3 md:h-5 h-3 ${
                      questionIndex === questions.length - 1
                        ? "opacity-30 cursor-not-allowed"
                        : "opacity-100"
                    }`}
                    onClick={() => moveQuestionDown(questionIndex)}
                    disabled={questionIndex === questions.length - 1}
                  />
                  {/* <Button
                    icon={minusIcon}
                    backgroundColor="transparent"
                    className="p-0 md:w-5 w-3 md:h-5 h-3"
                  /> */}
                  <Button
                    icon={closeIcon}
                    backgroundColor="transparent"
                    className="p-0 md:w-5 w-3 md:h-5 h-3"
                    onClick={() => handleDeleteQuestion(questionIndex)}
                  />
                </div>
              </div>
              <div className="mt-3">
                <Input
                  label={`Question ${questionIndex + 1}`}
                  className="mb-2"
                  id={`question-${questionIndex}`}
                  value={question.question_text}
                  onChange={(e) =>
                    handleQuestionChange(
                      questionIndex,
                      "question_text",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="md:mt-5 mt-3 flex  border-0.5 w-max border-primary rounded-xl p-1">
                <Button
                  text="Text Based"
                  backgroundColor={
                    question.question_mode === "text"
                      ? "primary"
                      : "transparent"
                  }
                  className="md:p-3 p-1   md:rounded-lg rounded-md text-black"
                  onClick={() =>
                    handleQuestionTypeChange(questionIndex, "text")
                  }
                />
                <Button
                  text="Image based"
                  backgroundColor={
                    question.question_mode === "image"
                      ? "primary"
                      : "transparent"
                  }
                  className="md:p-3 p-1 md:py-3 md:rounded-lg rounded-md text-black"
                  onClick={() =>
                    handleQuestionTypeChange(questionIndex, "image")
                  }
                />
              </div>

              <div className="md:mt-5 mt-3">
                <div className="grid md:grid-cols-3 grid-cols-1 md:gap-5">
                  <div>
                    <label
                      htmlFor={`choice-${questionIndex}`}
                      className="block w-full font-medium md:text-base text-sm mb-0"
                    >
                      Choice
                    </label>
                    <div
                      ref={(el) => {
                        dropdownRefs.current[questionIndex] = el;
                      }}
                      className="relative ml-auto lg:my-0 my-2 w-full"
                    >
                      <div
                        className="border border-primary rounded-xl p-2 cursor-pointer flex justify-between items-center transition-all duration-200"
                        onClick={() => handleToggleChoiceOpen(questionIndex)}
                      >
                        <span className="mr-2">
                          {questions[questionIndex].type === "multiple"
                            ? "Multiple"
                            : "Single"}
                        </span>
                        <svg
                          className={`w-4 h-4 transform transition-transform duration-200 ${
                            choiceOpenMap[questionIndex]
                              ? "rotate-180"
                              : "rotate-0"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      {choiceOpenMap[questionIndex] && (
                        <ul className="p-1 absolute z-10 bg-white border border-primary rounded-2xl w-full mt-1">
                          <li
                            className="px-4 py-2 text-sm md:text-base cursor-pointer rounded-xl mb-1 hover:bg-primary hover:text-black transition-colors"
                            onClick={() => {
                              handleQuestionChange(
                                questionIndex,
                                "type",
                                "single"
                              );
                              handleToggleChoiceOpen(questionIndex);
                            }}
                          >
                            Single
                          </li>
                          <li
                            className="px-4 py-2 text-sm md:text-base cursor-pointer rounded-xl mb-1 hover:bg-primary hover:text-black transition-colors"
                            onClick={() => {
                              handleQuestionChange(
                                questionIndex,
                                "type",
                                "multiple"
                              );
                              handleToggleChoiceOpen(questionIndex);
                            }}
                          >
                            Multiple
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor={`timer-${questionIndex}`}
                      className="block w-full font-medium md:text-base text-sm mb-0"
                    >
                      Timer
                    </label>
                    <div
                      className="relative w-full"
                      ref={(el) => {
                        timerRefs.current[questionIndex] = el;
                      }}
                    >
                      <div
                        className="border border-primary rounded-xl p-2 cursor-pointer flex justify-between items-center transition-all duration-200"
                        onClick={() => handleToggleTimerOpen(questionIndex)}
                      >
                        <span className="mr-2">
                          {questions[questionIndex].timer
                            ? `${questions[questionIndex].timer} sec`
                            : "Select Timer"}
                        </span>
                        <img
                          src={chevronDown}
                          alt="Chevron Down"
                          className="w-4 h-4"
                        />
                      </div>

                      {timerOpenMap[questionIndex] && (
                        <ul className="max-h-60 overflow-y-auto p-1 absolute z-10 bg-white border border-primary rounded-2xl w-full mt-1">
                          {Array.from({ length: 60 }, (_, index) => (
                            <li
                              key={index}
                              className="px-4 py-2 text-sm md:text-base cursor-pointer rounded-xl mb-1 hover:bg-primary hover:text-black transition-colors"
                              onClick={() => {
                                handleQuestionChange(
                                  questionIndex,
                                  "timer",
                                  index + 1
                                );
                                handleToggleTimerOpen(questionIndex);
                              }}
                            >
                              {index + 1} sec
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div>
                    <Input
                      label="Points"
                      type="number"
                      id={`points-${questionIndex}`}
                      placeholder="0"
                      className=""
                      value={question.points ?? ""}
                      onChange={(e) =>
                        handleQuestionChange(
                          questionIndex,
                          "points",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="md:mt-5 mt-3">
                    <div className="flex  items-center md:gap-3 gap-2">
                      {question.question_mode === "text" ? (
                        <div className="w-full">
                          <Input
                            label={`Option ${optionIndex + 1}`}
                            id={`option-${questionIndex}-${optionIndex}`}
                            value={option.option_text}
                            onChange={(e) =>
                              handleOptionChange(
                                questionIndex,
                                optionIndex,
                                "option_text",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      ) : (
                        <div className="flex md:h-sp100 h-20 lg:gap-4 md:gap-3 w-full gap-2">
                          <div className="md:w-sp170 w-20 h-full">
                            {option.option_image_url ? (
                              <img
                                src={concatImgURL(option.option_image_url)}
                                alt="Uploaded"
                                className="w-full h-full rounded-2xl border-0.5 border-primary block align-middle object-contain p-2"
                              />
                            ) : (
                              <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                                <img src={mediaIcon} alt="Placeholder" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <Input
                              label={`Image URL`}
                              placeholder="https://www.example.com/image.jpg"
                              className="m-0"
                              value={concatImgURL(option.option_image_url) ?? ""}
                              readOnly
                              // onChange={(
                              //   e: React.ChangeEvent<HTMLInputElement>
                              // ) =>
                              //   handleOptionChange(
                              //     questionIndex,
                              //     optionIndex,
                              //     "option_image_url",
                              //     e.target.value
                              //   )
                              // }
                            />
                            <div className="flex gap-2 ">
                              {option.option_image_url ? (
                                <Button
                                  text="Remove Image"
                                  icon={closeIcon}
                                  backgroundColor="transparent"
                                  imageclassName="md:w-5 md:h-5 w-4 h-4"
                                  className="pb-0"
                                  onClick={() =>
                                    handleOptionChange(
                                      questionIndex,
                                      optionIndex,
                                      "option_image_url",
                                      ""
                                    )
                                  }
                                />
                              ) : (
                                <Button
                                  icon={plusIcon}
                                  text="Add Image"
                                  backgroundColor="transparent"
                                  imageclassName="md:w-5 md:h-5 w-4 h-4"
                                  className="pb-0"
                                  onClick={() => {
                                    setShow(true);
                                    setSelectedQuestionIndex(questionIndex);
                                    setSelectedOptionIndex(optionIndex);
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2 items-center mt-4">
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteOption(questionIndex, optionIndex)
                          }
                        >
                          <img
                            src={deleteIconblack}
                            alt="Delete"
                            className="w-5 h-5"
                          />
                        </button>
                        <div className="flex items-center">
                          <label
                            className={`relative inline-flex items-center cursor-pointer ${
                              question.type === "single" &&
                              !option.is_correct &&
                              question.options.some((opt) => opt.is_correct)
                                ? "opacity-50 cursor-not-allowed"
                                : "opacity-100"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={option.is_correct}
                              disabled={
                                question.type === "single" &&
                                !option.is_correct &&
                                question.options.some((opt) => opt.is_correct)
                              }
                              onChange={() =>
                                handleToggleCorrect(questionIndex, optionIndex)
                              }
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-transparent rounded-full peer dark:bg-gray-300 peer-checked:bg-primary"></div>
                            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-black border rounded-full transition-all peer-checked:translate-x-4"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  text="Add New Option"
                  icon={plusIcon}
                  backgroundColor="transparent"
                  className="addSideBarBtn relative p-0 mt-4 opacity-50 hover:opacity-100"
                  onClick={() => handleAddOption(questionIndex)}
                />
              </div>
            </div>
          ))}

          <Button
            text="Add New Question"
            icon={plusIcon}
            backgroundColor="transparent"
            className="addSideBarBtn relative p-0 mt-4 opacity-50 hover:opacity-100"
            onClick={handleAddQuestion}
          />
        </div>
      </div>
      {show && (
        <ContentLibrary
          open={show}
          onClose={() => {
            setShow(false);
            setSelectedQuestionIndex(null);
            setSelectedOptionIndex(null);
          }}
          mediaFilter="image"
          onSelect={(imageUrl: string) => {
            if (
              selectedQuestionIndex !== null &&
              selectedOptionIndex !== null
            ) {
              handleOptionChange(
                selectedQuestionIndex,
                selectedOptionIndex,
                "option_image_url",
                imageUrl
              );
            }
            setShow(false);
            setSelectedQuestionIndex(null);
            setSelectedOptionIndex(null);
          }}
        />
      )}
    </div>
  );
}

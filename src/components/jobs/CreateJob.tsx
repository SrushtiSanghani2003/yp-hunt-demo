import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import Input from "../ui/input/Input";
import { customStyles } from "../account-settings/CreateCategories";
import Select from "react-select";
import FroalaEditor from "../blocks/FroalaEditor";
import DatePickerField from "../ui/datePicker/DatePickerField";
import { useDispatch, useSelector } from "react-redux";
import {
  addJobQuestion,
  addJobRoles,
  removeJobQuestion,
  removeJobRoles,
  selectJob,
  setFullJob,
  setJobCategories,
  setJobClosingDate,
  setJobLanguage,
  setTranslationFields,
  updateJobQuestions,
  updateJobRoles,
  type JobQuestionType,
  type JobRoleType,
} from "../../redux-toolkit/jobSlice";
import { useEffect, useRef, useState } from "react";
import { chevronDown, closeIcon, plusIcon } from "../../icons";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../ui/button";
import api from "../../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../utils/toastUtils";
import { paths } from "../../config/paths";
import { normalizeJobresponse } from "./normalizeJob";
import { useScroll } from "../../hooks/ScrollContext";
import {
  selectLanguage,
  selectTranslation,
} from "../../redux-toolkit/languageSlice";

const CreateJob = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = useSelector(selectLanguage);
  const isTranslation = useSelector(selectTranslation);
  const { isScrolled } = useScroll();
  const isEditMode = Boolean(id);
  const languageCode = searchParams.get("lang") || language;
  const queryClient = useQueryClient();

  const job = useSelector(selectJob);
  const [selectedRole, setSelectedRole] = useState<number | null>(0);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(0);
  const questionsRef = useRef<HTMLDivElement | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getJobById = async (id: string, languageCode?: string) => {
    return await api.get(`/job/${id}`, {
      params: languageCode ? { language_code: languageCode } : {},
    });
  };

  const { data: jobDataById } = useQuery({
    queryKey: ["job", id, languageCode],
    queryFn: () => getJobById(id as string, languageCode || undefined),
    enabled: isEditMode,
  });

  useEffect(() => {
    if (isEditMode && jobDataById) {
      const normalizedData = normalizeJobresponse(
        jobDataById.data,
        languageCode,
      );
      dispatch(setFullJob(normalizedData));
    }
  }, [jobDataById]);

  const createJob = async () => {
    const payload = {
      ...job,
      translation: {
        ...job.translation,
        auto_translate: isTranslation,
      },
    };
    return api.post("/job", payload);
  };

  const createJobMutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      showToast("Job created successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["allJobs"], exact: false });
      navigate(paths.job.allJobs.path);
    },
    onError: (error: any) => {
      showToast(
        error?.response?.data?.message || "Failed to create job",
        "error",
      );
      console.error("Error creating job:", error);
    },
  });

  const updateJob = async (id: string) => {
    const payload = {
      ...job,
      translation: {
        ...job.translation,
        auto_translate: isTranslation,
      },
    };
    return api.put(`/job/${id}`, payload);
  };

  const updateJobMutation = useMutation({
    mutationFn: updateJob,
    onSuccess: () => {
      showToast("Job updated successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["allJobs"], exact: false });
      navigate(paths.job.allJobs.path);
    },
    onError: (error: any) => {
      showToast(
        error?.response?.data?.message || "Failed to update job",
        "error",
      );
      console.error("Error updating job:", error);
    },
  });

  const handleJobs = (id: string) => {
    if (job.translation.title === "")
      return showToast("Title is required", "error");
    if (job.translation.salary === "")
      return showToast("Salary is required", "error");
    if (job.translation.description === "")
      return showToast("Description is required", "error");
    if (job.translation.location === "")
      return showToast("Location is required", "error");
    if (job.closing_date === "")
      return showToast("Closing date is required", "error");

    if (isEditMode) {
      updateJobMutation.mutate(String(id));
    } else {
      const langToUse = languageCode || language;
      dispatch(setJobLanguage(langToUse));
      createJobMutation.mutate();
    }
  };

  const getJobcategories = async () => {
    const params: Record<string, string> = {
      isChild: "yes",
    };
    return api.get("/job/category-dropdown", { params });
  };

  const { data: jobCategoriesData } = useQuery({
    queryKey: ["jobCategories"],
    queryFn: getJobcategories,
    refetchOnWindowFocus: false,
  });

  // const categoryOptions = useMemo(
  //   () =>
  //     jobCategoriesData?.data?.map((category: any) => ({
  //       value: category.id,
  //       label: category.title,
  //     })),
  //   [jobCategoriesData]
  // );

  const handleChange = (field: any, value: any) => {
    dispatch(setTranslationFields({ field, value }));
  };

  const handleCategoryChange = (selected: any) => {
    const values = selected
      ? selected.map((opt: any) => Number(opt.value))
      : [];

    dispatch(setJobCategories(values));
    setSelectedCategories(selected || []);
  };

  const handleRoleClick = (roleIndex: number) => {
    setSelectedRole(roleIndex);
  };
  const handleQuestionClick = (questionIndex: number) => {
    setSelectedQuestion(questionIndex);
  };

  const validateClosingDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return "Enter valid date.";
    return null;
  };

  const minClosingDate = (() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate());
    return date;
  })();

  // Update job roles
  // const handleRoleChange = (
  //   index: number,
  //   field: keyof JobRoleType,
  //   value: any
  // ) => {
  //   const updatedJobRoles = { ...job.translation.job_role[index] };

  //   (updatedJobRoles as any)[field] = value;

  //   dispatch(updateJobRoles({ index, jobRoles: updatedJobRoles }));
  // };
  const handleRoleChange = (
    index: number,
    field: keyof JobRoleType,
    value: any,
  ) => {
    dispatch(updateJobRoles({ index, field, value }));
  };

  const handleAddJobRole = () => {
    const newJobRole = {
      title: "",
      description: "",
    };
    const newIndex = job.translation?.job_role?.length;
    dispatch(addJobRoles(newJobRole));
    setSelectedRole(newIndex);
  };

  const handleRemoveJobRole = (job_role_index: number) => {
    const totalJobRoles = job.translation?.job_role?.length;

    dispatch(removeJobRoles(job_role_index));

    // Use functional update to ensure you get the latest state
    setSelectedRole((prevSelected) => {
      if (prevSelected === null) return null;

      // If deleting the currently selected one
      if (prevSelected === job_role_index) {
        return totalJobRoles > 1
          ? job_role_index === 0
            ? 0 // If removing first one → stay at 0
            : job_role_index - 1 // Otherwise move to previous
          : null;
      }

      // If deleting a variant before the selected one → shift index
      if (prevSelected > job_role_index) {
        return prevSelected - 1;
      }

      // Else, keep selection as is
      return prevSelected;
    });
  };

  // Questions
  const handleRemoveQuestion = (questionIndex: number) => {
    const totalQuestions = job.translation?.job_form?.length;

    dispatch(removeJobQuestion(questionIndex));

    // Use functional update to ensure you get the latest state
    setSelectedQuestion((prevSelected) => {
      if (prevSelected === null) return null;

      // If deleting the currently selected one
      if (prevSelected === questionIndex) {
        return totalQuestions > 1
          ? questionIndex === 0
            ? 0 // If removing first one → stay at 0
            : questionIndex - 1 // Otherwise move to previous
          : null;
      }

      // If deleting a variant before the selected one → shift index
      if (prevSelected > questionIndex) {
        return prevSelected - 1;
      }

      // Else, keep selection as is
      return prevSelected;
    });
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      title: "",
      is_required: false,
      type: "text",
    };
    const newIndex = job.translation?.job_form?.length;
    dispatch(addJobQuestion(newQuestion));
    setSelectedQuestion(newIndex);
  };

  const handleQuestionChange = (
    index: number,
    field: keyof JobQuestionType,
    value: any,
  ) => {
    let updated = { ...job.translation.job_form[index] };

    updated[field] = value;

    if (field === "type") {
      if (["radio_button", "checkbox", "dropdown"].includes(value)) {
        updated.options = [{ value: "" }];
        delete updated.slider_title;
        delete updated.min;
        delete updated.max;
      } else if (value === "slider") {
        updated.slider_title = "";
        updated.min = 0;
        updated.max = 0;
        delete updated.options;
      } else {
        delete updated.options;
        delete updated.slider_title;
        delete updated.min;
        delete updated.max;
      }
    }

    if (field === "is_required") {
      updated.is_required = value === "yes";
    }

    dispatch(updateJobQuestions({ index, jobQuestions: updated }));
  };

  // Options
  const handleAddOption = (index: number) => {
    const updated = { ...job.translation.job_form[index] };

    updated.options = [...(updated.options || []), { value: "" }];

    dispatch(updateJobQuestions({ index, jobQuestions: updated }));
  };

  const handleOptionChange = (
    qIndex: number,
    optIndex: number,
    value: string,
  ) => {
    const updated = { ...job.translation.job_form[qIndex] };

    updated.options = updated.options.map((opt: any, i: number) =>
      i === optIndex ? { ...opt, value } : opt,
    );

    dispatch(updateJobQuestions({ index: qIndex, jobQuestions: updated }));
  };

  const handleDeleteOption = (qIndex: number, optIndex: number) => {
    const updated = { ...job.translation.job_form[qIndex] };

    updated.options = updated.options.filter(
      (_: any, i: number) => i !== optIndex,
    );

    dispatch(updateJobQuestions({ index: qIndex, jobQuestions: updated }));
  };

  useEffect(() => {
    if (isEditMode && jobCategoriesData?.data) {
      const selected = jobCategoriesData?.data
        ?.filter((cat: any) => job.category_ids.includes(cat.id)) // only categories of this job
        ?.map((cat: any) => ({
          value: cat.id,
          label: cat.title, // dropdown will show this
        }));
      setSelectedCategories(selected);
    }
  }, [jobCategoriesData, isEditMode, job.category_ids]);
  useEffect(() => {
    if (selectedQuestion !== null && questionsRef.current) {
      questionsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedQuestion]);

  useEffect(() => {
    if (selectedQuestion !== null && optionsRef.current) {
      optionsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [job.translation.job_form]);

  return (
    <div>
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Job Builder"
          isToggleVisible={true}
          onSaveTemplateTitle="Cancel"
          onSaveTemplate={() => window.history.back()}
          onSubmit={() => handleJobs(String(id))}
          onSubmitLoading={
            createJobMutation.isPending || updateJobMutation.isPending
          }
          isEditMode={isEditMode}
          isSubmitDisabled={
            job.translation.title === "" || job.translation.title === null
          }
        />
      </div>
      <div className="container">
        <div className=" bg-white md:mb-5 mb-3 border-0.5 border-primary rounded-15 md:p-5 p-3">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Input
              label="Title*"
              placeholder="Enter Job Title here..."
              value={job?.translation.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <Input
              label="Salary*"
              placeholder="Enter Salary here..."
              value={job?.translation.salary}
              onChange={(e) => handleChange("salary", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block md:text-base/4 text-base md:mb-2 mb-0 font-medium">
                Closing Date<sup>*</sup>
              </label>
              <DatePickerField
                value={job?.closing_date || ""}
                onChange={(value) => dispatch(setJobClosingDate(value))}
                validate={validateClosingDate}
                onInvalid={setError}
                minDate={minClosingDate}
                className="w-full"
                inputClassName="w-full md:p-2 p-2 md:text-base text-sm border-0.5 border-primary rounded-xl"
              />
              {error && <p className="text-red-600 text-xs">{error}</p>}
            </div>
            <Input
              label="Location*"
              placeholder="Enter Location here..."
              value={job?.translation.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
            <div className="md:mb-5 mb-2">
              <div className="relative z-50">
                <label className="block md:text-base/4 text-base md:mb-2 mb-0 font-medium">
                  Category
                </label>
                <Select
                  options={jobCategoriesData?.data?.map((cat: any) => ({
                    value: cat.id,
                    label: cat.title,
                  }))}
                  isMulti
                  styles={customStyles}
                  placeholder="Select Categories"
                  onChange={handleCategoryChange}
                  value={selectedCategories}
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <label className="block md:text-base/4 text-base mb-2 font-medium">
              Description<sup>*</sup>
            </label>
            <FroalaEditor
              model={job?.translation.description}
              onModelChange={(e) => handleChange("description", e)}
            />
          </div>
        </div>

        <div className="bg-white shadow-sm md:mb-5 mb-3 border border-primary rounded-2xl md:p-5 p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold tracking-tight">Job Roles</h3>
            <button
              onClick={handleAddJobRole}
              className="px-3 py-1.5 flex items-center gap-1 text-black border border-black rounded-lg text-sm"
            >
              <img src={plusIcon} className="w-4 h-4" />
              Add
            </button>
          </div>

          {/* Role Tabs */}
          <div className="flex gap-3 flex-wrap mb-4">
            {job.translation.job_role.map((_item: any, index: number) => (
              <div key={index} className="relative group">
                <button
                  onClick={() => handleRoleClick(index)}
                  className={`px-3 py-1 rounded-xl text-sm font-medium border transition ${
                    selectedRole === index
                      ? "bg-black text-white border-black shadow-sm"
                      : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  Role {index + 1}
                </button>

                {job.translation?.job_role?.length > 1 && (
                  <button
                    onClick={() => handleRemoveJobRole(index)}
                    className="absolute -top-2 -right-2 bg-white border rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition"
                  >
                    <img src={closeIcon} alt="Delete" className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Active Role Editor */}
          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              {selectedRole !== null &&
                job.translation.job_role[selectedRole] && (
                  <motion.div
                    key={selectedRole}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-4 bg-f6f6f6 border border-gray-200 rounded-xl space-y-2"
                  >
                    <Input
                      label="Title"
                      value={job.translation.job_role[selectedRole]?.title}
                      onChange={(e) =>
                        handleRoleChange(selectedRole, "title", e.target.value)
                      }
                    />

                    <div>
                      <label className="block text-base mb-2 font-medium text-gray-700">
                        Description
                      </label>
                      <div className="relative">
                        <FroalaEditor
                          key={selectedRole}
                          model={
                            job.translation.job_role[selectedRole]?.description
                          }
                          onModelChange={(value) =>
                            handleRoleChange(selectedRole, "description", value)
                          }
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>

        <div className="bg-white shadow-sm md:mb-5 mb-3 border border-primary rounded-2xl md:p-5 p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold tracking-tight">Questions</h3>
            <button
              onClick={handleAddQuestion}
              className="px-3 py-1.5 flex items-center gap-1 text-black border border-black rounded-lg text-sm"
            >
              <img src={plusIcon} className="w-4 h-4" />
              Add
            </button>
          </div>

          {job.translation?.job_form?.length > 0 && (
            <div className="flex gap-3 flex-wrap my-3">
              {job.translation.job_form.map((_item: any, index: number) => (
                <div key={index} className="relative group">
                  <button
                    onClick={() => handleQuestionClick(index)}
                    className={`px-3 py-1 rounded-xl text-sm font-medium border transition ${
                      selectedQuestion === index
                        ? "bg-black text-white border-black shadow-sm"
                        : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    Q. {index + 1}
                  </button>

                  {job.translation?.job_form?.length > 0 && (
                    <button
                      onClick={() => handleRemoveQuestion(index)}
                      className="absolute -top-2 -right-2 bg-white border rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition"
                    >
                      <img src={closeIcon} alt="Delete" className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          <div>
            <AnimatePresence mode="wait">
              {selectedQuestion !== null &&
                job.translation.job_form[selectedQuestion] && (
                  <motion.div
                    ref={questionsRef}
                    key={selectedQuestion}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-4 bg-f6f6f6 border border-gray-200 rounded-xl space-y-2"
                  >
                    <div className="grid grid-cols-3 gap-5">
                      <Input
                        label="Title"
                        value={
                          job.translation.job_form[selectedQuestion]?.title
                        }
                        onChange={(e) =>
                          handleQuestionChange(
                            selectedQuestion,
                            "title",
                            e.target.value,
                          )
                        }
                      />
                      <div>
                        <label
                          htmlFor="language"
                          className="block md:mb-2 mb-1 md:text-base/4 text-sm font-medium"
                        >
                          Type
                        </label>
                        <div className="relative">
                          <select
                            id="language"
                            value={
                              job.translation.job_form[selectedQuestion]?.type
                            }
                            onChange={(e) =>
                              handleQuestionChange(
                                selectedQuestion,
                                "type",
                                e.target.value,
                              )
                            }
                            className="appearance-none w-full md:p-[7px] p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
                          >
                            <option value="text">Text Box</option>
                            <option value="radio_button">
                              Single Selection
                            </option>
                            <option value="checkbox">Multiple Selection</option>
                            <option value="slider">Slider</option>
                            <option value="dropdown">Dropdown</option>
                          </select>
                          <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                            <img src={chevronDown} />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="required"
                          className="block md:mb-2 mb-1 md:text-base/4 text-sm font-medium"
                        >
                          Required
                        </label>
                        <div className="relative">
                          <select
                            id="required"
                            value={
                              job.translation.job_form[selectedQuestion]
                                ?.is_required
                                ? "yes"
                                : "no"
                            }
                            onChange={(e) =>
                              handleQuestionChange(
                                selectedQuestion,
                                "is_required",
                                e.target.value,
                              )
                            }
                            className="appearance-none w-full md:p-[7px] p-2 md:text-base text-xs focus-within:outline-none border-0.5 border-primary md:rounded-xl rounded-lg"
                          >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                          <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                            <img src={chevronDown} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {["radio_button", "checkbox", "dropdown"].includes(
                      job.translation.job_form[selectedQuestion]?.type,
                    ) && (
                      <div ref={optionsRef}>
                        <label className="block font-medium md:text-base/4 text-sm mb-2">
                          Options
                        </label>

                        {/* Render options */}
                        {job.translation.job_form[
                          selectedQuestion
                        ]?.options?.map((opt: any, optIndex: number) => (
                          <div
                            key={optIndex}
                            className="flex items-center gap-2 mb-2"
                          >
                            <input
                              className="w-full p-2 md:text-base text-sm border-0.5 border-primary rounded-lg"
                              value={opt.value}
                              onChange={(e) =>
                                handleOptionChange(
                                  selectedQuestion,
                                  optIndex,
                                  e.target.value,
                                )
                              }
                            />
                            {job.translation.job_form[selectedQuestion]?.options
                              ?.length > 1 && (
                              <Button
                                icon={closeIcon}
                                onClick={() =>
                                  handleDeleteOption(selectedQuestion, optIndex)
                                }
                                backgroundColor="transparent"
                              />
                            )}
                          </div>
                        ))}

                        {/* Add Option Button */}
                        <Button
                          text="Add "
                          icon={plusIcon}
                          backgroundColor="transparent"
                          className="addSideBarBtn relative"
                          onClick={() => handleAddOption(selectedQuestion)}
                        />
                      </div>
                    )}
                    {job.translation.job_form[selectedQuestion]?.type ==
                      "slider" && (
                      <div className="grid grid-cols-3 gap-5">
                        <Input
                          label="Slider Title"
                          value={
                            job.translation.job_form[selectedQuestion]
                              ?.slider_title
                          }
                          onChange={(e) =>
                            handleQuestionChange(
                              selectedQuestion,
                              "slider_title",
                              e.target.value,
                            )
                          }
                        />
                        <Input
                          label="Min Value"
                          type="number"
                          value={
                            job.translation.job_form[selectedQuestion]?.min
                          }
                          onChange={(e) =>
                            handleQuestionChange(
                              selectedQuestion,
                              "min",
                              e.target.value,
                            )
                          }
                        />
                        <Input
                          label="Max Value"
                          type="number"
                          value={
                            job.translation.job_form[selectedQuestion]?.max
                          }
                          onChange={(e) =>
                            handleQuestionChange(
                              selectedQuestion,
                              "max",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    )}
                  </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;

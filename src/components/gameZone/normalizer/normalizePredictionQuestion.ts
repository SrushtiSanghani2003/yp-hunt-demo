export const normalizePredictionQuestionsForAPI = (
  localQuestions: any,
  includeIds = false
) => {
  return localQuestions?.map((q: any) => ({
    ...(includeIds && typeof q.id == "number" && { id: q.id }),
    type: q.type,
    question_mode: q.question_mode,
    closed_at: q.closed_at,
    order: q.order,
    translations: [
      {
        language_code: "en",
        question_text: q.question_text,
        question_image_url: "",
      },
    ],
    options: q.options.map((opt: any) => ({
      order: opt.order,
      is_correct: opt.is_correct,
      translations: [
        {
          language_code: "en",
          option_text: opt.option_text,
          option_image_url: opt.option_image_url,
        },
      ],
    })),
  }));
};

// For edit in future
export const denormalizePredictionQuestionsFromAPI = (normalized: any) => {
  return normalized.map((q: any) => ({
    id: q.id,
    type: q.type,
    question_mode: q.question_mode,
    question_text: q.translations?.[0]?.question_text || "",
    closed_at: q.closed_at,
    order: q.order,
    options: q.options.map((opt: any) => ({
      order: opt.order,
      is_correct: opt.is_correct,
      option_text: opt.translations?.[0]?.option_text || "",
      option_image_url: opt.translations?.[0]?.option_image_url || "",
    })),
  }));
};

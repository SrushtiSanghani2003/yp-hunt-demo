export const normalizeQuizQuestionsForAPI = (
  localQuestions: any,
  includeIds = false
) => {
  return localQuestions.map((q: any) => ({
    ...(includeIds && typeof q.id == "number" && { id: q.id }),
    type: q.type,
    question_mode: q.question_mode,
    timer: q.timer ?? 0,
    points: Number(q.points),
    order: q.order,
    is_required: true,
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
export const denormalizeQuizQuestionsFromAPI = (normalized: any) => {
  return normalized.map((q: any) => ({
    id: q.id,
    type: q.type,
    question_mode: q.question_mode,
    question_text: q.translations?.[0]?.question_text || "",
    timer: q.timer,
    points: q.points,
    order: q.order,
    options: q.options.map((opt: any) => ({
      order: opt.order,
      is_correct: opt.is_correct,
      option_text: opt.translations?.[0]?.option_text || "",
      option_image_url: opt.translations?.[0]?.option_image_url || "",
    })),
  }));
};

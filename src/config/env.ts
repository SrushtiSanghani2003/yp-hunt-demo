import * as z from "zod";

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string(),
    APP_URL: z.string().optional().default("http://localhost:5000"),
    IMAGE_URL: z
      .string()
      .optional()
      .default(`${import.meta.env.VITE_IMAGE_URL}`),
    CROP_URL: z
      .string()
      .optional()
      .default(`${import.meta.env.VITE_CROP_URL}`),
    DAM_URL:z.string().optional().default(`${import.meta.env.VITE_DAM_URL}`),
    DAM_AUTHKEY:z.string().optional().default(`${import.meta.env.VITE_DAM_AUTHKEY}`)
  });

  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, [key, value]) => {
    if (key.startsWith("VITE_APP_")) {
      acc[key.replace("VITE_APP_", "")] = value;
    }
    return acc;
  }, {});

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided. The following variables are missing or invalid: ${Object.entries(
        parsedEnv.error.flatten().fieldErrors,
      )
        .map(([k, v]) => `- ${k}: ${v}`)
        .join("/n")}`,
    );
  }
  return parsedEnv.data;
};

export const env = createEnv();

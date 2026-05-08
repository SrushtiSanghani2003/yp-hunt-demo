import { useState, useCallback } from "react";
import axios from "axios";
import api from "../lib/api";

interface UseJsonS3UploadResult {
  isUploading: boolean;
  uploadError: string | null;
  uploadJsonToS3: (data: any, folder?: string) => Promise<string>;
}

/**
 * 🌐 Reusable hook for uploading any JSON payload to S3 via presigned URL.
 * Returns a `json_s3_key` that you can pass to backend APIs.
 *
 * Usage:
 * const { uploadJsonToS3, isUploading } = useJsonS3Upload();
 * const key = await uploadJsonToS3(pages, "pages/payloads");
 */
export function useJsonS3Upload(): UseJsonS3UploadResult {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadJsonToS3 = useCallback(async (jsonData: any, folder = "payloads/pages") => {
    setIsUploading(true);
    setUploadError(null);

    try {
      // 1️⃣ Ask backend for a presigned URL
      const presign :any = await api.post("/s3/presign/json", { folder });
    //   const { data: presign }: { data: PresignResponse } = await api.post("/page_service/s3/presign/json", { folder });
      if (!presign?.success) {
        throw new Error("Failed to get presigned URL");
      }

      // 2️⃣ PUT JSON to S3
      await axios.put(presign.url, JSON.stringify(jsonData), {
        headers: { "Content-Type": "application/json" },
      });

      // ✅ Return the S3 key for API call
      return presign.key;
    } catch (error: any) {
      console.error("❌ useJsonS3Upload error:", error);
      setUploadError(error.message || "Upload failed");
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return { isUploading, uploadError, uploadJsonToS3 };
}

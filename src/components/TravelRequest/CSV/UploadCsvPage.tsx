import { useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import CsvImportPreview from "./CsvImportPreview";
import { useMutation } from "@tanstack/react-query";
import api from "../../../lib/api";
import { showToast } from "../../../utils/toastUtils";
import { paths } from "../../../config/paths";

/* ================= MODULE CONFIG ================= */

const CSV_MODULE_CONFIG: Record<
  string,
  {
    check: string;
    upload: string;
    redirect: string;
  }
> = {
  transportation: {
    check: "/travel-request/transportation/check-csv",
    upload: "/travel-request/transportation/upload-csv",
    redirect: paths.travelrequest.transportation.path,
  },
  flight: {
    check: "/travel-request/flight/check-csv",
    upload: "/travel-request/flight/upload-csv",
    redirect: paths.travelrequest.flight.path,
  },
  accreditation: {
    check: "/travel-request/accreditation/check-csv",
    upload: "/travel-request/accreditation/upload-csv",
    redirect: paths.travelrequest.accreditation.path,
  },
  accommodation: {
    check: "/travel-request/accommodation/check-csv",
    upload: "/travel-request/accommodation/upload-csv",
    redirect: paths.travelrequest.accommodation.path,
  },
};

export default function UploadCsvPage() {
  const location = useLocation();
  const navigate = useNavigate();

  /* ================= DETECT MODULE FROM URL ================= */

  const module = useMemo(() => {
    return Object.keys(CSV_MODULE_CONFIG).find((key) =>
      location.pathname.includes(key),
    );
  }, [location.pathname]);

  const apiConfig = module ? CSV_MODULE_CONFIG[module] : null;

  /* ================= STATE ================= */

  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any>(null);

  /* ================= CHECK CSV ================= */

  const checkCsv = async (payload: FormData) => {
    try {
      const { data } = await api.post(apiConfig!.check, payload);
      return data;
    } catch (err: any) {
      return err?.response?.data;
    }
  };

  const { mutate: checkCsvMutate, isPending: isChecking } = useMutation({
    mutationFn: checkCsv,
  });

  /* ================= UPLOAD CSV ================= */

  const uploadCsv = async (payload: FormData) => {
    const { data } = await api.post(apiConfig!.upload, payload);
    return data;
  };

  const { mutate: uploadCsvMutate, isPending: isSaving } = useMutation({
    mutationFn: uploadCsv,
  });

  /* ================= NORMALIZER ================= */

  const normalizeCsvResponse = (res: any) => {
    if (res?.data) return res;

    return {
      status: true,
      message: "CSV validated successfully",
      data: {
        csvData: res?.csvData || [],
        errors: res?.errors || [],
        headerErrors: res?.headerErrors || [],
      },
    };
  };

  /* ================= HANDLERS ================= */

  const handleFileChange = (file: File | null) => {
    if (!file || !apiConfig) return;

    setFile(file);
    setResponse(null);

    const formData = new FormData();
    formData.append("csv_file", file);

    checkCsvMutate(formData, {
      onSuccess: (res: any) => {
        setResponse(normalizeCsvResponse(res));
        showToast("CSV validated successfully ✅", "success");
      },
      onError: (error: any) => {
        const message = error?.response?.data?.message || "CSV validation failed";
        showToast(message, "error");
      },
    });
  };

  const handleSaveCsv = () => {
    if (!file || !apiConfig) return;

    const formData = new FormData();
    formData.append("csv_file", file);

    uploadCsvMutate(formData, {
      onSuccess: () => {
        showToast("CSV saved successfully 🎉", "success");
        setFile(null);
        setResponse(null);
        navigate(apiConfig.redirect);
      },
      onError: (error: any) => {
        const message = error?.response?.data?.message || "Failed to save CSV";
        showToast(message, "error");
      },
    });
  };

  /* ================= INVALID MODULE ================= */

  if (!apiConfig) {
    return (
      <div className="mt-10 text-red-500 text-sm font-medium">
        Invalid or unsupported CSV upload module
      </div>
    );
  }

  /* ================= RENDER ================= */

  return (
    <div className="container mt-10 space-y-4">
      <CsvImportPreview
        file={file}
        response={response}
        onFileChange={handleFileChange}
        onClear={() => {
          setFile(null);
          setResponse(null);
        }}
        onSave={handleSaveCsv}
        isLoading={isChecking}
        isSaving={isSaving}
      />

      {/* {response?.data?.errors?.length === 0 &&
        response?.data?.headerErrors?.length === 0 && (
          <div className="flex justify-end">
            <button
              onClick={handleSaveCsv}
              disabled={isSaving}
              className="px-6 py-2 rounded-xl bg-primary text-black text-base font-medium
              hover:bg-primary/90 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save CSV"}
            </button>
          </div>
        )} */}
    </div>
  );
}

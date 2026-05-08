import React, { useMemo, useRef } from "react";

export interface CsvError {
  row: number;
  errors: {
    col: number;
    error: string;
  }[];
}

export interface HeaderError {
  header: string;
  type: "missing" | "unexpected";
}

export interface CsvImportResponse {
  status: boolean;
  message: string;
  data: {
    csvData: string[][];
    errors: CsvError[];
    headerErrors: HeaderError[];
  };
}

interface Props {
  response: CsvImportResponse | null;
  file: File | null;
  onFileChange: (file: File | null) => void;
  onClear: () => void;
  onSave?: () => void; // ✅ add
  isLoading: boolean;
  isSaving?: boolean; // ✅ add
}

const CsvImportPreview: React.FC<Props> = ({
  response,
  file,
  onFileChange,
  isLoading,
  onClear,
  onSave,
  isSaving,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const errorMap = useMemo(() => {
    const map: Record<string, string> = {};
    if (!response) return map;

    response?.data?.errors.forEach((rowErr) => {
      rowErr?.errors.forEach((err) => {
        map[`${rowErr.row}-${err.col}`] = err.error;
      });
    });

    return map;
  }, [response]);

  return (
    <>
      <div className="rounded-xl border border-primary bg-white shadow-sm p-6 mb-6">
        {/* Loader while checking CSV */}

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Upload CSV</h2>

        <p className="text-sm text-gray-500 mb-5">
          Upload your CSV file to validate and preview errors before import.
        </p>

        {/* File input */}
        <div className="flex items-center gap-3 mb-6">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            disabled={isLoading}
            className="block w-full text-sm text-gray-600
            file:mr-4 file:rounded-md file:border
            file:bg-primary/10 file:px-4 file:py-2
            file:text-sm file:font-medium file:text-primary
            hover:file:bg-primary/20 file:border-primary"
            onChange={(e) => onFileChange(e.target.files?.[0] || null)}
          />

          {file && (
            <button
              onClick={() => {
                onClear();
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              disabled={isLoading}
              className="text-sm px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary/10"
            >
              Clear
            </button>
          )}
          {response?.data?.errors?.length === 0 &&
            response?.data?.headerErrors?.length === 0 && (
              <button
                onClick={onSave}
                disabled={isSaving}
                style={{ minWidth: "max-content" }}
                className="text-sm px-4 py-2 min-w-max rounded-md bg-primary text-black font-medium hover:bg-primary/90 disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save CSV"}
              </button>
            )}
        </div>
        {isLoading && (
          <div className="overflow-x-auto rounded-lg animate-pulse">
            <table className="min-w-full text-left">
              <thead>
                <tr>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <th key={i} className="border  px-3 py-2">
                      <div className="h-10 w-24 bg-gray-200 rounded" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, rowIdx) => (
                  <tr key={rowIdx}>
                    {Array.from({ length: 6 }).map((_, colIdx) => (
                      <td key={colIdx} className="border px-3 py-2">
                        <div className="h-10 w-full bg-gray-200 rounded" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Global error banner */}
        {!isLoading && response?.status === false && (
          <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            One or more errors were found in your CSV file. Please review the
            highlighted fields, correct them, and re-upload the file.
          </div>
        )}

        {/* Header Issues */}
        {response?.data?.headerErrors?.length ? (
          <div className="mb-5 rounded-md border border-yellow-200 bg-yellow-50 p-4">
            <h4 className="text-sm font-semibold text-yellow-800 mb-2">
              Header Issues
            </h4>
            <ul className="list-disc ml-5 text-sm text-yellow-700">
              {response?.data?.headerErrors?.map((err, i) => (
                <li key={i}>
                  {err.header || "(Empty column)"} — {err.type}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* CSV Table */}
        {!isLoading && response && (
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full text-left">
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr>
                  {response.data.csvData[0].map((header, i) => {
                    const headerError = response.data.headerErrors.find(
                      (h) => h.header === header,
                    );

                    return (
                      <th
                        key={i}
                        className={`border border-primary px-3 py-2 text-xs font-semibold whitespace-nowrap ${
                          headerError
                            ? "text-red-500 underline cursor-help bg-red-200"
                            : "text-gray-700"
                        }`}
                      >
                        <span className="relative group">
                          {header || "-"}

                          {headerError && (
                            <span
                              className="absolute bottom left-1/2 -translate-x-1/2 mb-2
                            hidden group-hover:block whitespace-nowrap
                            bg-gray-900 text-white text-xs rounded px-3 py-1 shadow-lg z-50"
                            >
                              {headerError.type} header
                            </span>
                          )}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {response.data.csvData.slice(1).map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    {row.map((cell, colIndex) => {
                      const error = errorMap[`${rowIndex + 1}-${colIndex}`];

                      return (
                        <td
                          key={colIndex}
                          className={`border border-primary px-3 py-2 text-sm whitespace-nowrap ${
                            error
                              ? "text-red-500 bg-red-200 underline cursor-help"
                              : "text-gray-700"
                          }`}
                        >
                          <span className="relative group">
                            {cell || "-"}

                            {error && (
                              <span
                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                              hidden group-hover:block whitespace-nowrap
                              bg-gray-900 text-white text-xs rounded px-3 py-1 shadow-lg z-20"
                              >
                                {error}
                              </span>
                            )}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default CsvImportPreview;

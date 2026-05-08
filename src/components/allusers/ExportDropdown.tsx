import { useEffect, useRef, useState } from "react";
import {
  FaFileCsv,
  FaFilePdf,
  FaFileExcel,
  FaChevronDown,
} from "react-icons/fa";
import Swal from "sweetalert2";
import api from "../../lib/api";
import { saveAs } from "file-saver";

// ---------------- Types ----------------
interface ExportDropdownBase {
  saveFileName?: string;
  user_type?: string;
  isDisable?: boolean;
  exportUrl?: string;
}

interface ExportDropdownWithType extends ExportDropdownBase {
  model: string; // any model except CreateRequest
  type: string;
}

interface ExportDropdownWithoutType extends ExportDropdownBase {
  model: any;
  type?: never; // 👈 explicitly forbid passing type
}

type ExportDropdownProps = ExportDropdownWithType | ExportDropdownWithoutType;

// ---------------- Component ----------------
const ExportDropdown: React.FC<ExportDropdownProps> = ({
  model,
  type,
  saveFileName = "export",
  user_type,
  isDisable,
  exportUrl,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleExport = async (format: string) => {
    try {
      setLoading(true);
      const showProgress = format === "pdf"; // ✅ only show progress for non-PDF
      if (showProgress) {
        Swal.fire({
          title: "Exporting...",
          html: `
        <div style="text-align:center;">
          <div style="width:100%; background:#3085d6; border-radius:6px; overflow:hidden; margin-bottom:10px;">
            <div id="progress-bar" style="width:0%; background:#fcd100; height:20px; color:#3085d6; text-align:center; line-height:20px;">
              0%
            </div>
          </div>
          <div class="swal-spinner" style="margin-top:10px;"></div>
        </div>
      `,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      }

      let percent = 0;
      const interval = setInterval(() => {
        if (progressBar && percent < 100) {
          // stop at 95% until actual download completes
          percent += 1;
          progressBar.style.width = `${percent}%`;
          progressBar.textContent = `${percent}%`;
        }
      }, 50); // adjust speed (50ms per increment)

      const params: Record<string, string> = { format };
      if (model && model !== "user") {
        params.model = model;
      }

      if (type) {
        params.format = type;
      }
      if (user_type) {
        params.user_type = user_type;
      }
      const progressBar = document.getElementById("progress-bar");
      const url =
        exportUrl ??
        (model === "user" ? "/appuser/exportDocs" : "/media-center/exportDocs");

      const response = await api.get(url, {
        params,
        responseType: "blob",
        onDownloadProgress: (progressEvent: any) => {
          if (progressEvent.total && progressBar) {
            // Update real progress
            const realPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            if (realPercent > percent) {
              percent = realPercent;
              progressBar.style.width = `${percent}%`;
              progressBar.textContent = `${percent}%`;
            }
          }
        },
      });
      clearInterval(interval);

      // Ensure 100% at completion
      if (progressBar) {
        progressBar.style.width = "100%";
        progressBar.textContent = "100%";
      }

      // Ensure we finish at 100% when complete
      const el = document.getElementById("progress-value");
      if (el) el.innerText = "100%";

      const blob = response; // ✅ same thing, but shorter
      if (!(blob instanceof Blob)) {
        throw new Error("Response is not a Blob!");
      }
      saveAs(blob, `${saveFileName}.${format}`);

      Swal.fire({
        icon: "success",
        title: "Export Complete",
        text: "Your file has been exported successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error: any) {
      Swal.fire(
        "Error!",
        `Export failed! ${error.message || "Something went wrong"}`,
        "error"
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => !loading && setOpen(!open)}
        disabled={isDisable || loading}
        className={
          `bg-primary text-black px-5 py-2 rounded-lg font-semibold shadow-md flex items-center gap-2 ${
            isDisable ? "opacity-50 cursor-not-allowed" : ""
          }` +
          (loading
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-primary transition")
        }
      >
        {loading ? "Exporting..." : "Export"}{" "}
        <FaChevronDown className="text-sm" />
      </button>

      {open && !loading && (
        <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden">
          <div className="flex flex-col divide-y text-sm font-medium">
            <DropdownItem
              icon={<FaFileCsv className="text-green-600" />}
              label="CSV"
              onClick={() => handleExport("csv")}
            />
            <DropdownItem
              icon={<FaFileExcel className="text-green-800" />}
              label="Excel (.xlsx)"
              onClick={() => handleExport("xlsx")}
            />
            <DropdownItem
              icon={<FaFilePdf className="text-red-600" />}
              label="PDF"
              onClick={() => handleExport("pdf")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// ---------------- Sub Component ----------------
interface DropdownItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  icon,
  label,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="flex items-center px-4 py-3 hover:bg-gray-100 transition gap-3 text-left"
  >
    <span className="text-xl">{icon}</span>
    <span className="text-gray-800">{label}</span>
  </button>
);

export default ExportDropdown;

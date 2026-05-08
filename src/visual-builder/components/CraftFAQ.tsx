import { useNode } from "@craftjs/core";
import { useState } from "react";
import { useDeviceMode } from "../VisualBlockEditor";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CraftFAQProps {
  items?: string | FAQItem[];
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  gap?: number;
  questionFontSize?: number;
  answerFontSize?: number;
  padding?: number;
  width?: string;
  height?: string;
  /** Responsive overrides */
  tabletPadding?: number | "";
  mobilePadding?: number | "";
  tabletQuestionFontSize?: number | "";
  mobileQuestionFontSize?: number | "";
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
}

export const CraftFAQ = ({
  items = JSON.stringify([
    { question: "What is this?", answer: "A great product." },
    { question: "How does it work?", answer: "Very easily." },
  ]),
  accentColor = "#f59e0b",
  backgroundColor = "#ffffff",
  textColor = "#1f2937",
  borderRadius = 8,
  borderWidth = 1,
  borderColor = "#e5e7eb",
  gap = 8,
  questionFontSize = 16,
  answerFontSize = 14,
  padding = 16,
  width = "100%",
  height = "",
  tabletPadding = "",
  mobilePadding = "",
  tabletQuestionFontSize = "",
  mobileQuestionFontSize = "",
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
}: CraftFAQProps) => {
  const {
    connectors: { connect, drag },
    isActive,
  } = useNode((state) => ({
    isActive: state.events.selected,
  }));

  const [expandedItems, setExpandedItems] = useState<number[]>([0, 1]); // All expanded in editor

  // Device-aware overrides
  let device: "desktop" | "tablet" | "mobile" = "desktop";
  try {
    device = useDeviceMode();
  } catch {
    /* context may not exist */
  }

  // Visibility check
  if (device === "mobile" && hideOnMobile) return null;
  if (device === "tablet" && hideOnTablet) return null;
  if (device === "desktop" && hideOnDesktop) return null;

  let activePadding = padding;
  let activeQuestionFontSize = questionFontSize;

  if (device === "tablet") {
    if (tabletPadding !== "" && tabletPadding !== undefined)
      activePadding = Number(tabletPadding);
    if (tabletQuestionFontSize !== "" && tabletQuestionFontSize !== undefined)
      activeQuestionFontSize = Number(tabletQuestionFontSize);
  } else if (device === "mobile") {
    // Mobile: inherit tablet overrides first, then mobile-specific
    if (tabletPadding !== "" && tabletPadding !== undefined)
      activePadding = Number(tabletPadding);
    if (mobilePadding !== "" && mobilePadding !== undefined)
      activePadding = Number(mobilePadding);
    if (tabletQuestionFontSize !== "" && tabletQuestionFontSize !== undefined)
      activeQuestionFontSize = Number(tabletQuestionFontSize);
    if (mobileQuestionFontSize !== "" && mobileQuestionFontSize !== undefined)
      activeQuestionFontSize = Number(mobileQuestionFontSize);
  }

  const normalizeFaqItems = (raw: any[]): FAQItem[] =>
    raw.map((item) => ({
      question: typeof item?.question === "string" ? item.question : "",
      answer: typeof item?.answer === "string" ? item.answer : "",
    }));

  let faqItems: FAQItem[] = [];
  if (Array.isArray(items)) {
    faqItems = normalizeFaqItems(items);
  } else if (typeof items === "string") {
    try {
      const parsed = JSON.parse(items);
      faqItems = Array.isArray(parsed) ? normalizeFaqItems(parsed) : [];
    } catch {
      faqItems = [];
    }
  }

  const toggleItem = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const containerStyle: React.CSSProperties = {
    cursor: "grab",
    display: "flex",
    flexDirection: "column",
    gap: `${gap}px`,
    outline: isActive ? `2px solid #3b82f6` : "none",
    padding: "4px",
    boxSizing: "border-box",
    width: width || "100%",
    height: height || undefined,
  };

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={containerStyle}
    >
      {faqItems.map((item, index) => (
        <div
          key={index}
          style={{
            backgroundColor,
            border: borderWidth ? `${borderWidth}px solid ${borderColor}` : "none",
            borderRadius: `${borderRadius}px`,
            overflow: "hidden",
          }}
        >
          {/* Question */}
          <button
            onClick={() => toggleItem(index)}
            style={{
              width: "100%",
              padding: `${activePadding}px`,
              backgroundColor: expandedItems.includes(index)
                ? `${accentColor}15`
                : backgroundColor,
              border: "none",
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              transition: "all 0.15s ease",
              fontSize: `${activeQuestionFontSize}px`,
              fontWeight: "600",
              color: textColor,
            }}
          >
            <span>{item.question}</span>
            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: accentColor,
                transform: expandedItems.includes(index)
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            >
              v
            </span>
          </button>

          {/* Answer */}
          {expandedItems.includes(index) && (
            <div
              style={{
                padding: `${activePadding}px`,
                paddingTop: "0",
                backgroundColor: `${accentColor}08`,
                color: "#6b7280",
                fontSize: `${answerFontSize}px`,
                lineHeight: "1.6",
              }}
            >
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

CraftFAQ.craft = {
  displayName: "FAQ",
  props: {
    items: JSON.stringify([
      { question: "What is this?", answer: "A great product." },
      { question: "How does it work?", answer: "Very easily." },
    ]),
    accentColor: "#f59e0b",
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    gap: 8,
    questionFontSize: 16,
    answerFontSize: 14,
    padding: 16,
    width: "100%",
    height: "",
    tabletPadding: "",
    mobilePadding: "",
    tabletQuestionFontSize: "",
    mobileQuestionFontSize: "",
    hideOnMobile: false,
    hideOnTablet: false,
    hideOnDesktop: false,
  },
  rules: {
    canDrag: () => true,
  },
};

export default CraftFAQ;

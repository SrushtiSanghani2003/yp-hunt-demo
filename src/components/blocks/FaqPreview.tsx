import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = {
  id: string;
  order: number;
  faq_question: string;
  faq_answer: string;
};

type FaqPreviewProps = {
  data: FaqItem[];
};

const FaqPreview = ({ data }: FaqPreviewProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="my-3">
      <div className="space-y-3">
        {data?.map((item, index) => (
          <div
            key={item.id}
            className="border border-gray-300 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-medium bg-gray-100 hover:bg-gray-200 transition"
            >
              <span>{item.faq_question}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`px-4 overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index ? "max-h-96 py-3" : "max-h-0 py-0"
              }`}
            >
              <p className="text-gray-700">{item.faq_answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPreview;

import { useState } from "react";

type FaqPreviewProps = {
  data: any;
};

const FaqPreview = ({ data }: FaqPreviewProps) => {
  const sectionTitle = data?.content?.more?.title || "FAQ Section";
  const faqs = data?.content.faqs || [];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="my-4">
      <h2 className="text-2xl md:text-44 lg:text-54 xl:text-84 font-extrabold text-black font-plakatbold mb-4">
        {sectionTitle}
      </h2>
      <div className="space-y-6 md:space-y-8">
        {faqs.map((item: any, index: number) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="border-b border-primary pb-6 md:pb-6">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-lg md:text-2xl xl:text-36 font-bold font-plakatbold">
                  {item.faq_question}
                </span>
                <span className="ml-4">
                  {isOpen ? (
                    <svg
                      className="w-4 h-4 md:w-6 md:h-6"
                      width="24"
                      height="4"
                      viewBox="0 0 24 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 2H22"
                        stroke="black"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 md:w-6 md:h-6"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2V22"
                        stroke="black"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 12H22"
                        stroke="black"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </button>
              <div
                className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100 mt-4"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.faq_answer }}
                ></div>
                {/* <div className="overflow-hidden text-sm md:text-base text-black font-light">
                  {item.faq_answer}
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqPreview;

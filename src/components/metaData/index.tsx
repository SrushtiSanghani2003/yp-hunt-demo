import type React from "react";

interface MetadataProps {
  metadata: {
    seo_title: string;
    seo_tag: string;
    seo_description: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "seo_title" | "seo_tag" | "seo_description"
  ) => void;
}

const MetaData = ({ metadata, onChange }: MetadataProps) => {
  return (
    <div className="bg-white md:p-5 p-3 rounded-2xl border-0.5 border-primary">
      <div className="grid grid-cols-2 md:gap-5 gap-2">
        <div>
          <label htmlFor="metaTitle" className="block font-medium md:text-base text-sm w-full md:mb-2 mb-1">
            Meta Title
          </label>
          <input
            type="text"
            id="metaTitle"
            value={metadata.seo_title}
            onChange={(e) => onChange(e, "seo_title")}
            className="w-full md:rounded-2xl rounded-lg  md:text-base text-sm md:p-4 p-1 border-0.5 border-primary focus-within:outline-none"
            placeholder="Meta Title"
          />
        </div>
        <div>
          <label htmlFor="metaTag" className="block font-medium md:text-base text-sm w-full md:mb-2 mb-1">
            Meta Tag
          </label>
          <input
            type="text"
            id="metaTag"
            value={metadata.seo_tag}
            onChange={(e) => onChange(e, "seo_tag")}
            className="w-full md:rounded-2xl rounded-lg md:p-4 p-1 border-0.5 md:text-base text-sm border-primary focus-within:outline-none"
            placeholder="Meta Tag"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="metaDesc" className="block font-medium md:text-base text-sm w-full md:mb-2 mb-1">
            Meta Description
          </label>
          <textarea
            id="metaDesc"
            className="w-full md:rounded-2xl rounded-lg md:text-base text-sm md:p-4 p-1 border-0.5 border-primary focus-within:outline-none"
            value={metadata.seo_description}
            onChange={(e) => onChange(e, "seo_description")}
            placeholder="Meta Description ..."
          />
        </div>
      </div>
    </div>
  );
};

export default MetaData;

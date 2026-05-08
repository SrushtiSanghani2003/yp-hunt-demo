import { concatImgURL } from "../../../../config/function";
import { bentoLayouts } from "../../bentobox/bentoLayouts";

type BentosPreviewProps = {
  data: any;
};

const BentosPreview = ({ data }: BentosPreviewProps) => {
  const sectionTitle = data?.content?.more?.title || "Bento Section";
  const bentoBoxes = data?.content.bentoBoxes || [];
  const bentoKey = data?.content.bento_key || "1V2H";
  return (
    <div className="my-4">
      <h2 className="text-2xl md:text-44 lg:text-54 xl:text-84 font-extrabold text-black font-plakatbold mb-4 uppercase">
        {sectionTitle}
      </h2>
      <div className="grid md:grid-cols-12 grid-cols-1 gap-4 auto-rows-200 md:grid-flow-dense">
        {bentoLayouts[bentoKey].map((item, i) => {
          const box = bentoBoxes[i];
          return (
            <div
              key={i}
              className={`relative cursor-pointer rounded-2xl ${item.className}`}
            >
              {box?.imgUrl ? (
                <>
                  <img
                    src={concatImgURL(box.imgUrl)}
                    alt={`Bento ${i + 1}`}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 pointer-events-none rounded-2xl bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.5)_100%)]" />
                </>
              ) : (
                <div className="p-4 w-full h-full bg-f6f6f6 border border-primary flex justify-start items-end rounded-2xl text-dark text-base/4 font-bold">
                  Box {i + 1}
                </div>
              )}
              {box?.title && (
                <p className="absolute text-white bottom-2 left-2 md:text-lg text-base font-semibold uppercase">
                  {box.title}
                </p>
              )}
              {box?.sponsorImg && (
                <div className="absolute top-2 left-2 w-12 h-12 overflow-hidden">
                  <img
                    src={concatImgURL(box.sponsorImg)}
                    alt={`Sponsor ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BentosPreview;

import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShop,
  setFullShop,
  setLanguageCode,
  setShopDescription,
  setShopImageUrl,
  setShopMobileImageUrl,
  setShopPublishContent,
  setShopRedirectUrl,
  setShopSponsorContent,
  updateShopMetadataField,
} from "../../redux-toolkit/shopSlice";
import MetaData from "../metaData";
import ContentPanel from "../contentPanel/ContentPanel";
import { useCreateShop, useShopById, useUpdateShop } from "../../hooks/useShop";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { paths } from "../../config/paths";
import { concatImgURL } from "../../config/function";
import Input from "../ui/input/Input";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import Button from "../ui/button";
import { useEffect, useState } from "react";
import ContentLibrary from "../contentPanel/ContentLibrary";
import { normalizeShopResponse } from "./normalizer/normalizeShop";
import { showToast } from "../../utils/toastUtils";
import { useScroll } from "../../hooks/ScrollContext";
import {
  selectLanguage,
  selectTranslation,
} from "../../redux-toolkit/languageSlice";

export default function ShopCreate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isScrolled } = useScroll();
  const isEditMode = Boolean(id);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [show, setShow] = useState(false);
  const shop = useSelector(selectShop);
  const language = useSelector(selectLanguage);
  const isTranslation = useSelector(selectTranslation);
  const languageCode = searchParams.get("lang") || language;
  const { data: shopDataById } = useShopById(id, languageCode);
  const createShopMutation = useCreateShop(shop, isTranslation);
  const updateShopMutation = useUpdateShop(shop, isTranslation);
  const [imageType, setImageType] = useState<"desktop" | "mobile" | null>(null);

  const handleShopSubmit = (id: string | number | any) => {
    if (shop.translation.shop_image_url === null)
      return showToast("Please upload a shop image", "error");
    if (shop.translation.redirect_url === null)
      return showToast("Please add a redirect url", "error");
    if (shop.translation.shop_mobile_image_url === null)
      return showToast("Please upload a shop Mobile  image", "error");
    if (isEditMode && id) {
      updateShopMutation.mutate(id);
    } else {
      const langToUse = languageCode || language;
      dispatch(setLanguageCode(langToUse));
      createShopMutation.mutate();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "seo_title" | "seo_tag" | "seo_description",
  ) => {
    dispatch(updateShopMetadataField({ field, value: e.target.value }));
  };

  useEffect(() => {
    if (isEditMode && shopDataById) {
      const normalizedShop = normalizeShopResponse(
        shopDataById?.data,
        languageCode,
      );
      dispatch(setFullShop(normalizedShop));
    }
  }, [shopDataById]);

  return (
    <div>
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Shop Builder"
          onSaveTemplate={() => navigate(paths.shop.path)}
          onSaveTemplateTitle="Cancel"
          onSubmit={() => handleShopSubmit(String(id))}
          onSubmitLoading={
            createShopMutation.isPending || updateShopMutation.isPending
          }
          isEditMode={isEditMode}
        />
      </div>
      <div className="container grid grid-cols-12 xl:gap-sp30 lg:gap-sp16 gap-sp9">
        <div className="lg:col-span-11 md:col-span-10 col-span-10">
          <div className="bg-white md:mb-5 mb-3 border-0.5 border-primary rounded-15 md:p-5 p-3 ">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
                <div className="md:w-sp170 w-20 h-full">
                  {shop.translation.shop_image_url ? (
                    <img
                      src={concatImgURL(shop.translation.shop_image_url)}
                      alt="Uploaded"
                      className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary block align-middle"
                    />
                  ) : (
                    <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                      <img src={mediaIcon} alt="Placeholder" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    label="Shop Image URL (Portrait)"
                    placeholder="https://www.example.com"
                    className="m-0"
                    value={concatImgURL(shop.translation.shop_image_url)}
                    readOnly
                  />
                  <div>
                    {shop.translation.shop_image_url ? (
                      <Button
                        text="Remove Image"
                        icon={closeIcon}
                        backgroundColor="transparent"
                        className="py-0"
                        imageclassName="md:w-5 w-3 md:h-5 h-3"
                        onClick={() => dispatch(setShopImageUrl(null))}
                      />
                    ) : (
                      <Button
                        icon={plusIcon}
                        text="Add Image"
                        backgroundColor="transparent"
                        className="py-0"
                        imageclassName="md:w-5 w-3 md:h-5 h-3"
                        onClick={() => {
                          setImageType("desktop");
                          setShow(true);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex md:h-sp100 h-20 md:gap-4 gap-2">
                <div className="md:w-sp170 w-20 h-full">
                  {shop.translation.shop_mobile_image_url ? (
                    <img
                      src={concatImgURL(shop.translation.shop_mobile_image_url)}
                      alt="Uploaded"
                      className="w-full h-full object-contain p-2 rounded-2xl border-0.5 border-primary block align-middle"
                    />
                  ) : (
                    <div className="bg-f6f6f6 border-0.5 border-primary h-full rounded-2xl flex justify-center items-center">
                      <img src={mediaIcon} alt="Placeholder" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    label="Shop Mobile Image URL (Landscape)"
                    placeholder="https://www.example.com"
                    className="m-0"
                    value={concatImgURL(shop.translation.shop_mobile_image_url)}
                    readOnly
                  />
                  <div>
                    {shop.translation.shop_mobile_image_url ? (
                      <Button
                        text="Remove Image"
                        icon={closeIcon}
                        backgroundColor="transparent"
                        className="py-0"
                        imageclassName="md:w-5 w-3 md:h-5 h-3"
                        onClick={() => dispatch(setShopMobileImageUrl(null))}
                      />
                    ) : (
                      <Button
                        icon={plusIcon}
                        text="Add Image"
                        backgroundColor="transparent"
                        className="py-0"
                        imageclassName="md:w-5 w-3 md:h-5 h-3"
                        onClick={() => {
                          setImageType("mobile");
                          setShow(true);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Input
              label="Shop URL"
              className="mt-4"
              placeholder="Enter URL Here..."
              value={shop.translation?.redirect_url || ""}
              onChange={(e) => dispatch(setShopRedirectUrl(e.target.value))}
            />
            <div className="mt-4">
              <label
                htmlFor="description"
                className="block font-medium md:text-base text-sm w-full md:mb-2 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter Your description..."
                value={shop.translation.description || ""}
                onChange={(e) => dispatch(setShopDescription(e.target.value))}
                className="md:p-4 p-2 border-0.5 border-primary rounded-2xl h-sp70 md:text-base text-sm resize-none w-full focus-within:outline-none"
              ></textarea>
            </div>
          </div>

          <MetaData metadata={shop.metadata} onChange={handleChange} />
        </div>
        <div className="lg:col-span-1 col-span-2 ">
          <ContentPanel
            data={shop}
            onPublishSave={(payload) =>
              dispatch(setShopPublishContent(payload))
            }
            onSponsorSave={(payload) =>
              dispatch(setShopSponsorContent(payload))
            }
          />
        </div>
      </div>
      {show && (
        <ContentLibrary
          open={show}
          onClose={() => setShow(false)}
          uploadType="shop"
          mediaFilter="image"
          onSelect={(value: string) => {
            if (imageType === "desktop") {
              dispatch(setShopImageUrl(value));
            } else if (imageType === "mobile") {
              dispatch(setShopMobileImageUrl(value));
            }
            setShow(false);
            setImageType(null);
          }}
        />
      )}
    </div>
  );
}

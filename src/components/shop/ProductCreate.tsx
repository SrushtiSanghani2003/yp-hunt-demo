import { useEffect, useState } from "react";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import Input from "../ui/input/Input";
import { closeIcon, mediaIcon, plusIcon } from "../../icons";
import ContentLibrary from "../contentPanel/ContentLibrary";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProduct,
  setProductInfo,
  addProductVariant,
  updateProductField,
  addProductMedia,
  setProductDiscount,
  updateProductDiscounts,
  setShopId,
  type ProductDiscount,
  updateProductMetadataField,
  // setProductGeoBlockContent,
  // setProductAuthentication,
  setProductReadTime,
  setProductPublishContent,
  setProductHierarchyContent,
  removeProductMedia,
  setFullProduct,
  removeProductVariant,
  removeProductDiscount,
  type ProductVariant,
} from "../../redux-toolkit/productSlice";
import { useShoplist } from "../../hooks/useShop";
import ContentPanel from "../contentPanel/ContentPanel";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import MetaData from "../metaData";
import { useParams, useSearchParams } from "react-router-dom";
import {
  useCreateProduct,
  useProductById,
  useUpdateProduct,
} from "../../hooks/useProduct";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import { setTags } from "../../redux-toolkit/tagSlice";
import { normalizeProductResponse } from "./normalizer/normalizeProduct";
import dayjs from "dayjs";
import { concatImgURL } from "../../config/function";

export default function ProductCreate() {
  const product = useSelector(selectProduct);
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [productGallery, setProductGallery] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [activeMediaUrl, setActiveMediaUrl] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(0);
  const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null);
  const [showTaxPercent, setShowTaxPercent] = useState<boolean>(false);
  const createProductMutation = useCreateProduct(product);
  const updateProductMutation = useUpdateProduct(product);
  const [searchParams] = useSearchParams();
  const languageCode = searchParams.get("lang");
  const [activeTab, setActiveTab] = useState<"variants" | "discounts" | null>(
    null,
  );
  const [variantAttributes, setVariantAttributes] = useState<ProductVariant[]>([
    {
      attributes: {
        size: "",
        color: "",
        material: "",
      },
      sku: "",
      price: 0,
      stock_quantity: 0,
    },
  ]);
  const [discountAttributes, setDiscountAttributes] = useState<
    ProductDiscount[]
  >([
    {
      discount_type: "flat",
      value: 0,
      valid_from: "",
      valid_to: "",
    },
  ]);

  const { data: ProductDataById } = useProductById(id, languageCode);

  const uploadTypeMap: Record<string, "block" | "sponsor" | "thumbnail"> = {
    eventImgUrl: "block",
    sponsor_img: "sponsor",
    thumbnailUrl: "thumbnail",
  };
  const handleProductSubmit = (id: string | number | any) => {
    if (isEditMode && id) {
      updateProductMutation.mutate(id);
    } else {
      createProductMutation.mutate();
    }
  };
  // MetaData Onchange Function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "seo_title" | "seo_tag" | "seo_description",
  ) => {
    dispatch(updateProductMetadataField({ field, value: e.target.value }));
  };

  // Type the useShoplist hook response
  const { data: shopListData } = useShoplist(1, "", languageCode) as {
    data: any | undefined;
  };
  const shopAllData = shopListData?.shops || [];

  const handleAddVariant = () => {
    const newVariant: ProductVariant = {
      attributes: {
        size: "",
        color: "",
        material: "",
      },
      sku: "",
      price: 0,
      stock_quantity: 0,
    };

    const updatedVariants = [...variantAttributes, newVariant];
    setVariantAttributes(updatedVariants);
    dispatch(addProductVariant(newVariant));
    dispatch(updateProductField({ field: "variants", value: updatedVariants }));
    setActiveTab("variants");
  };

  const handleAddDiscount = () => {
    const newDiscount: ProductDiscount = {
      discount_type: "flat",
      value: 0,
      valid_from: "",
      valid_to: "",
    };
    const updatedDiscount = [...discountAttributes, newDiscount];
    setDiscountAttributes(updatedDiscount);
    dispatch(setProductDiscount(newDiscount));
    dispatch(updateProductDiscounts(updatedDiscount));
    setActiveTab("discounts");
  };

  const handleAddGalleryImage = (url: string) => {
    const updatedGallery = [...productGallery, url];
    setProductGallery(updatedGallery);
    dispatch(addProductMedia(url));
    if (productGallery.length === 0) {
      setMainImage(url);
    }
    setActiveMediaUrl(null);
  };
  const handleRemoveGalleryImage = (imageUrl: string) => {
    const updatedGallery = productGallery.filter(
      (img: string) => img !== imageUrl,
    );
    setProductGallery(updatedGallery);
    dispatch(removeProductMedia(imageUrl));
    if (mainImage === imageUrl) {
      setMainImage(updatedGallery.length > 0 ? updatedGallery[0] : null);
    }
  };
  const handleGalleryImageClick = (imageUrl: string) => {
    setMainImage(imageUrl);
  };
  // const handleMainImageClick = () => {
  //   setActiveMediaUrl("mainImage");
  // };
  const handleVariantClick = (variantIndex: number) => {
    setSelectedVariant(variantIndex);
    setSelectedDiscount(null);
    setActiveTab("variants");
  };
  const handleRemoveVariant = (variantIndex: number) => {
    const updatedVariants = variantAttributes.filter(
      (_, index) => index !== variantIndex,
    );
    setVariantAttributes(updatedVariants);
    dispatch(removeProductVariant(variantIndex));
    dispatch(updateProductField({ field: "variants", value: updatedVariants }));
    if (selectedVariant === variantIndex) {
      setSelectedVariant(updatedVariants.length > 0 ? 0 : null);
    }
  };

  const handleDiscountClick = (discountIndex: number) => {
    setSelectedDiscount(discountIndex);
    setSelectedVariant(null);
    setActiveTab("discounts");
  };
  const handleRemoveDiscount = (discountIndex: number) => {
    const updatedDiscounts = discountAttributes.filter(
      (_, index) => index !== discountIndex,
    );
    setDiscountAttributes(updatedDiscounts);
    dispatch(removeProductDiscount(discountIndex));
    dispatch(updateProductDiscounts(updatedDiscounts));
    if (selectedDiscount === discountIndex) {
      setSelectedDiscount(updatedDiscounts.length > 0 ? 0 : null);
    }
  };

  const handleVariantAttributeChange = (
    variantIndex: number,
    field: keyof ProductVariant | "attributes",
    value: string,
    subField?: keyof ProductVariant["attributes"],
  ) => {
    const updatedVariants = variantAttributes.map((variant, index) =>
      index === variantIndex
        ? subField
          ? {
              ...variant,
              attributes: { ...variant.attributes, [subField]: value },
            }
          : {
              ...variant,
              [field]:
                field === "price" || field === "stock_quantity"
                  ? Number(value) || 0
                  : value,
            }
        : variant,
    );
    setVariantAttributes(updatedVariants);
    dispatch(updateProductField({ field: "variants", value: updatedVariants }));
  };

  const handleDiscountAttributeChange = (
    discountIndex: number,
    field: keyof ProductDiscount,
    value: number | string,
  ) => {
    const updatedDiscounts = discountAttributes.map((discount, index) =>
      index === discountIndex
        ? {
            ...discount,
            [field]: field === "value" ? Number(value) || 0 : value,
          }
        : discount,
    );
    setDiscountAttributes(updatedDiscounts);
    dispatch(updateProductDiscounts(updatedDiscounts));
  };

  useEffect(() => {
    if (isEditMode && ProductDataById?.data) {
      const normalizedProduct = normalizeProductResponse(
        ProductDataById.data,
        languageCode,
      );
      dispatch(setTags(ProductDataById.data?.tags || []));
      dispatch(setFullProduct(normalizedProduct));
      const gallery = normalizedProduct.media
        .map((item) => item.media_url)
        .filter((url): url is string => url !== null);
      setProductGallery(gallery);
      setMainImage(gallery.length > 0 ? gallery[0] : null);
      if (normalizedProduct.variants.length > 0) {
        setVariantAttributes(normalizedProduct.variants);
      }
      if (normalizedProduct.discount.length > 0) {
        setDiscountAttributes(normalizedProduct.discount);
      }
      setShowTaxPercent(normalizedProduct.is_taxable);
    }
  }, [ProductDataById, isEditMode, languageCode, dispatch]);

  // Sync shop selection
  useEffect(() => {
    dispatch(
      updateProductField({ field: "is_taxable", value: showTaxPercent }),
    );
  }, [showTaxPercent, dispatch]);

  // useEffect(() => {
  // }, [product]);

  return (
    <div className="mt-10">
      <BuilderHeader
        title="Product Builder"
        isToggleVisible={true}
        isToggleEnabled={isEnabled}
        onToggleChange={setIsEnabled}
        onPinClick={() => console.log("Pin clicked")}
        onSaveTemplate={() => console.log("Template saved")}
        onSubmit={() => handleProductSubmit(String(id))}
        onSubmitLoading={
          createProductMutation.isPending || updateProductMutation.isPending
        }
      />
      <div className="grid grid-cols-12 xl:gap-sp30 lg:gap-sp16 gap-sp9">
        <div className="lg:col-span-11 md:col-span-10 col-span-10">
          <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-3 lg:gap-6 md:gap gap-3 bg-transparent ">
            {/* Left side */}
            <div className="lg:col-span-2">
              <div className="h-max bg-white border-0.5 border-primary rounded-15 md:p-5 p-3 shadow-sm">
                <div className="mb-4">
                  <Input
                    inputType="text"
                    label="Product Name"
                    placeholder="Enter Product Name"
                    value={product.translation?.name || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        setProductInfo({
                          field: "name",
                          value: e.target.value,
                        }),
                      );
                    }}
                  />
                </div>
                <div className="">
                  <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                    Description Product
                  </label>
                  <textarea
                    value={product.translation?.description || ""}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      dispatch(
                        setProductInfo({
                          field: "description",
                          value: e.target.value,
                        }),
                      );
                    }}
                    rows={5}
                    className="w-full p-2 md:text-base text-sm border-0.5 min-h-36 border-primary md:rounded-xl placeholder:font-normal rounded-lg md:pr-10 bg-white"
                  />
                </div>
              </div>
              <div className="bg-white row-span-2 rounded-2xl md:p-5 p-3 md:mt-6 mt-3 shadow-sm col-span-2 border-0.5 border-primary">
                {/* Variants and Discounts */}
                <div className="grid grid-cols-2 md:gap-6 pb-5 border-b-0.5 gap-2 mb-3">
                  <div
                    className={` rounded-lg ${
                      activeTab === "variants"
                        ? " "
                        : "bg-transparent border-gray-300"
                    } `}
                  >
                    {/* <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                      Variants
                    </label> */}
                    <div className="flex gap-2 flex-wrap">
                      {variantAttributes.map((_variant, index) => (
                        <div
                          key={index}
                          className="relative flex items-center group gap-1"
                        >
                          <button
                            key={index}
                            onClick={() => handleVariantClick(index)}
                            className={`md:px-2 px-1 py-1 text-sm  rounded-lg border border-primary ${
                              selectedVariant === index
                                ? "bg-primary border-primary"
                                : ""
                            }`}
                          >
                            {`Variant ${index + 1}`}
                          </button>
                          {variantAttributes.length > 1 && (
                            <button
                              onClick={() => handleRemoveVariant(index)}
                              className="p-1 absolute -top-2 group-hover:opacity-100 opacity-0 duration-300 -right-2 bg-white rounded-full"
                            >
                              <img
                                src={closeIcon}
                                alt="Delete Variant"
                                className="h-3"
                              />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={handleAddVariant}
                        className="px-4 py-1 bg-transparent border-[#fcd100] border text-black rounded-lg font-medium transition"
                      >
                        <img src={plusIcon} alt="Add Variant" />
                      </button>
                    </div>
                  </div>
                  <div
                    className={` ${
                      activeTab === "discounts"
                        ? ""
                        : "bg-transparent border-gray-300"
                    } `}
                  >
                    {/* <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                      Discounts
                    </label> */}
                    <div className="flex gap-2 flex-wrap">
                      {discountAttributes.map((_discount, index) => (
                        <div
                          key={index}
                          className="relative group flex  items-center gap-1"
                        >
                          <button
                            key={index}
                            onClick={() => handleDiscountClick(index)}
                            className={`md:px-2 px-1 py-1 rounded-lg text-sm  border-1 border-primary ${
                              selectedDiscount === index
                                ? "bg-primary border-black"
                                : ""
                            }`}
                          >
                            {`Discount ${index + 1}`}
                          </button>
                          {discountAttributes.length > 1 && (
                            <button
                              onClick={() => handleRemoveDiscount(index)}
                              className="p-1 absolute -top-2  -right-2 bg-white group-hover:opacity-100 opacity-0 duration-300 rounded-full"
                            >
                              <img
                                src={closeIcon}
                                alt="Delete Discount"
                                className="h-3"
                              />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={handleAddDiscount}
                        className="px-4 py-1 bg-transparent border-[#fcd100] border text-black rounded-lg font-medium transition"
                      >
                        <img src={plusIcon} alt="Add Discount" />
                      </button>
                    </div>
                  </div>
                </div>
                {selectedDiscount !== null ? (
                  <div className="grid grid-cols-2 gap-4 ">
                    <div>
                      <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                        Type D{selectedDiscount + 1}
                      </label>
                      <select
                        className="w-full p-2 md:text-base text-sm border-0.5 border-primary md:rounded-xl rounded-lg bg-white"
                        value={
                          discountAttributes[selectedDiscount]?.discount_type ||
                          "flat"
                        }
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          handleDiscountAttributeChange(
                            selectedDiscount,
                            "discount_type",
                            e.target.value,
                          )
                        }
                      >
                        <option value="flat">Flat</option>
                        <option value="percentage">Percentage</option>
                      </select>
                    </div>
                    <div>
                      <Input
                        inputType="number"
                        label={`Discount Value `}
                        placeholder="Enter discount value"
                        value={
                          discountAttributes[selectedDiscount]?.value || ""
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleDiscountAttributeChange(
                            selectedDiscount,
                            "value",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div>
                      <Input
                        inputType="date"
                        label={`Valid Start Date `}
                        inputCss="md:pr-2 pr-2"
                        placeholder="Select start date"
                        value={
                          discountAttributes[selectedDiscount]?.valid_from
                            ? dayjs(
                                discountAttributes[selectedDiscount].valid_from,
                              ).format("YYYY-MM-DD")
                            : ""
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleDiscountAttributeChange(
                            selectedDiscount,
                            "valid_from",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div>
                      <Input
                        inputType="date"
                        label={`Valid End Date `}
                        inputCss="md:pr-2 pr-2"
                        placeholder="Select end date"
                        value={
                          discountAttributes[selectedDiscount]?.valid_to
                            ? dayjs(
                                discountAttributes[selectedDiscount].valid_to,
                              ).format("YYYY-MM-DD")
                            : ""
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleDiscountAttributeChange(
                            selectedDiscount,
                            "valid_to",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                ) : selectedVariant !== null ? (
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-4 gap-2">
                    <div>
                      <Input
                        inputType="text"
                        label={`Size `}
                        placeholder={`Size `}
                        value={
                          variantAttributes[selectedVariant]?.attributes.size ||
                          ""
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleVariantAttributeChange(
                            selectedVariant,
                            "attributes",
                            e.target.value,
                            "size",
                          )
                        }
                      />
                    </div>
                    <div>
                      <Input
                        inputType="text"
                        label={`Color `}
                        placeholder={`Color `}
                        value={
                          variantAttributes[selectedVariant]?.attributes
                            .color || ""
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleVariantAttributeChange(
                            selectedVariant,
                            "attributes",
                            e.target.value,
                            "color",
                          )
                        }
                      />
                    </div>
                    <div>
                      <Input
                        inputType="text"
                        label={`Material `}
                        placeholder={`Material `}
                        value={
                          variantAttributes[selectedVariant]?.attributes
                            .material || ""
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleVariantAttributeChange(
                            selectedVariant,
                            "attributes",
                            e.target.value,
                            "material",
                          )
                        }
                      />
                    </div>
                    <div>
                      <Input
                        inputType="text"
                        label={`Sku`}
                        placeholder={`Sku`}
                        value={variantAttributes[selectedVariant]?.sku || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleVariantAttributeChange(
                            selectedVariant,
                            "sku",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div>
                      <Input
                        inputType="number"
                        label={`Price `}
                        placeholder={`Price`}
                        value={variantAttributes[selectedVariant]?.price || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleVariantAttributeChange(
                            selectedVariant,
                            "price",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div>
                      <Input
                        inputType="number"
                        label={`Stock Quantity `}
                        placeholder={`Stock Quantity`}
                        value={
                          variantAttributes[selectedVariant]?.stock_quantity ||
                          ""
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleVariantAttributeChange(
                            selectedVariant,
                            "stock_quantity",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    Select a variant or discount to edit attributes, pricing,
                    stock, or discount details.
                  </p>
                )}
              </div>
            </div>
            {/* right side */}
            <div>
              <div className="bg-white border-0.5 border-primary rounded-15 md:p-5 p-3 shadow-sm overflow-y-auto">
                <h2 className="text-lg font-semibold mb-2">Product Img</h2>
                <div
                  // onClick={handleMainImageClick}
                  className="border-0.5 flex items-center cursor-pointer border-primary bg-[#f6f6f6] h-56 w-full rounded-2xl overflow-hidden relative"
                >
                  {mainImage ? (
                    mainImage.match(/\.(mp4|webm|ogg)$/i) ? (
                      <video
                        src={concatImgURL(mainImage)}
                        controls
                        className="w-full h-52 object-cover"
                      />
                    ) : (
                      <img
                        src={concatImgURL(mainImage)}
                        alt="product"
                        className="w-full object-cover h-52"
                      />
                    )
                  ) : (
                    <img
                      src={mediaIcon}
                      alt="product"
                      className="w-full h-12"
                    />
                  )}
                </div>

                <div className="mt-4 relative">
                  <div className="flex gap-3 ps-2 items-center">
                    <Swiper
                      spaceBetween={10}
                      slidesPerView="auto"
                      navigation={
                        productGallery.length > 3
                          ? {
                              nextEl: ".swiper-button-next-custom",
                              prevEl: ".swiper-button-prev-custom",
                            }
                          : false
                      }
                      modules={[Navigation]}
                      className="pb-8 !w-full"
                      // onSwiper={(swiper) =>
                      // } // Debugging
                    >
                      {productGallery.map((img, index) => (
                        <SwiperSlide key={index} className="!w-14 group">
                          <div
                            className={`w-14 h-14 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                              mainImage === img
                                ? "border-yellow-400 shadow-lg"
                                : "border-gray-200 hover:border-yellow-400 hover:shadow-md"
                            }`}
                            onClick={() => handleGalleryImageClick(img)}
                          >
                            {img?.endsWith("mp4") ? (
                              <video
                                src={concatImgURL(img)}
                                className="w-full h-full object-cover"
                                muted
                                onMouseOver={(e) => e.currentTarget.play()}
                                onMouseOut={(e) => e.currentTarget.pause()}
                              />
                            ) : (
                              <img
                                src={concatImgURL(img)}
                                alt={`thumb-${index}`}
                                className="w-full h-full object-cover transition-transform hover:scale-110"
                              />
                            )}
                          </div>
                          <button
                            className="absolute z-30 -top-1 -right-1 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            onClick={() => handleRemoveGalleryImage(img)}
                          >
                            <img
                              src={closeIcon}
                              alt="Delete Image"
                              className="h-3"
                            />
                          </button>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <label
                      onClick={() => setActiveMediaUrl("ProductImgUrl")}
                      className="w-10 h-9 rounded-full my-2.5 border-2 border-dashed border-[#FCD100] flex items-center justify-center cursor-pointer hover:bg-yellow-50 transition-colors"
                    >
                      <img src={plusIcon} alt="Add Image" className="w-6 h-6" />
                    </label>
                  </div>
                  {productGallery.length > 3 && (
                    <>
                      <div className="swiper-button-prev-custom group absolute z-20 top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md  cursor-pointer">
                        <svg
                          className="w-5 h-5 text-white group-hover:text-black"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </div>
                      <div className="swiper-button-next-custom absolute group z-20 top-1/2 xl:right-10 lg:right-10 right-12 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md  cursor-pointer">
                        <svg
                          className="w-5 h-5 text-white  group-hover:text-black"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-white md:mt-6 mt-3 rounded-2xl md:p-5 p-3 shadow-sm border-0.5 border-primary">
                <div>
                  <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                    Shop
                  </label>
                  <select
                    className="w-full p-2 md:text-base text-sm border-0.5 border-primary md:rounded-xl placeholder:font-normal rounded-lg md:pr-10 bg-white"
                    value={product.shop_id ?? ""}
                    onChange={(e) => {
                      dispatch(setShopId(parseInt(e.target.value))); // dispatch to redux
                    }}
                  >
                    <option value="">Select a shop</option>
                    {shopAllData.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="lg:flex items-center gap-2 justify-between lg:mt-5 mt-4 mb-2">
                  <div className="flex py-2.5 items-center gap-1 lg:mb-0 mb-2">
                    <h2 className="text-base font-medium cursor-pointer">
                      Taxable
                    </h2>

                    <ToggleSwitch
                      checked={showTaxPercent}
                      onClick={() => {
                        setShowTaxPercent(!showTaxPercent);
                      }}
                      className="lg:flex"
                    />
                  </div>
                  {showTaxPercent && (
                    <div>
                      <Input
                        inputType="number"
                        placeholder="Tax Percent"
                        inputCss="md:p-2"
                        labelCss="hidden"
                        value={product.tax_percent || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          dispatch(
                            updateProductField({
                              field: "tax_percent",
                              value: e.target.value,
                            }),
                          );
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="md:mt-6 mt-3">
            <MetaData metadata={product.metadata} onChange={handleChange} />
          </div>
        </div>

        <div className="lg:col-span-1 col-span-2 ">
          <ContentPanel
            data={product}
            onPublishSave={(payload) =>
              dispatch(setProductPublishContent(payload))
            }
            // onGeoSave={(payload) =>
            //   dispatch(setProductGeoBlockContent(payload))
            // }
            // onAuthsave={(payload) =>
            //   dispatch(setProductAuthentication(payload))
            // }
            onReadSave={(payload) => dispatch(setProductReadTime(payload))}
            onHierarchySave={(payload) =>
              dispatch(setProductHierarchyContent(payload))
            }
            // onLanguageSave={() => {}}
          />
        </div>
      </div>
      {activeMediaUrl != null && (
        <ContentLibrary
          open={!!activeMediaUrl}
          onClose={() => setActiveMediaUrl(null)}
          uploadType={
            activeMediaUrl ? uploadTypeMap[activeMediaUrl] || "block" : "block"
          }
          onSelect={handleAddGalleryImage}
        />
      )}
    </div>
  );
}

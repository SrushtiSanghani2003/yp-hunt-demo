import React, { useEffect, useState } from "react";
import { chevronDown, mediaIcon } from "../../icons";
import ChangeBlockType from "./ChangeBlockType";
import type { BlockTypeProps } from "./changeBlockTypes";
import api from "../../lib/api";
import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";
import MoreFieldsEditor from "./MoreFieldsEditor";
import MoreFieldsRenderer from "./MoreFieldsRenderer";

const MembershipBlock = ({
    currentBlock,
    onChangeType,
    types,
    onChangeBlock,

}: BlockTypeProps) => {
    const [selectedCategoryName, setSelectedCategoryName] = useState("hospitality");
    const [AllmembershipData, setAllmembershipData] = useState([]);
    const [moreFields, setMoreFields] = useState<string[]>([]);
    const { id } = useParams();
    const isEditMode = Boolean(id);

    // ✅ Fetch data by selected category
    const getMembershipByType = async ({
        queryKey,
    }: QueryFunctionContext<[string, string | undefined]>) => {
        const [_key, category] = queryKey;
        const params: Record<string, any> = {};
        if (category) {
            params.type = category;
        }
        return await api.get("/membership/getByType", { params });
    };

    const { data: membershipData } = useQuery({
        queryKey: ["membershipByCategory", selectedCategoryName],
        queryFn: getMembershipByType,
        enabled: !!selectedCategoryName, // only fetch when a category is selected
        refetchOnWindowFocus: false,
        select: (res) => {
    return res.data.memberships;
},
    });

    // ✅ Update when data fetched
    useEffect(() => {
        if (membershipData) {
            setAllmembershipData(membershipData);
        }
    }, [membershipData]);

    // ✅ Handle static category change
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const updatedContent = { ...currentBlock.content };
        const { value } = e.target;
        setSelectedCategoryName(value);
        // updatedContent.type = value;
        updatedContent.membership_type = value;
        onChangeBlock?.({
            ...currentBlock,
            content: updatedContent,
        });
    };

    // ✅ If edit mode, load existing selected category and more fields
    useEffect(() => {
        if (isEditMode) {
            if (currentBlock.content?.membership_type) {
                setSelectedCategoryName(currentBlock.content?.membership_type);
            }
            if (currentBlock.content?.more) {
                const fields = Object.keys(currentBlock.content.more);
                setMoreFields(fields);
            }
        }
    }, [currentBlock]);

    return (
        <>
            <div className="pb-4 border-b-primary border-b-0.5">
                {/* ✅ Static Category Dropdown */}
                <div className="relative mb-5">
                    <select
                        className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl"
                        value={selectedCategoryName}
                        onChange={handleCategoryChange}
                    >
                        <option value="" disabled>
                            Please Select Category
                        </option>
                        <option value="hospitality">Hospitality</option>
                        <option value="club">Club</option>
                    </select>
                    <div className="absolute md:right-4 right-1 top-1/2 -translate-y-1/2">
                        <img src={chevronDown} />
                    </div>
                </div>

                {/* ✅ Always List View */}
                {AllmembershipData.length === 0 ? (
                    <div className="text-center text-sm text-gray-500 py-10">
                        No membership items available
                    </div>
                ) : (
                    <Swiper
                        spaceBetween={16}
                        slidesPerView={4}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                        className="!px-1"
                    >
                        {AllmembershipData.map((item: any) => (
                            <SwiperSlide key={item.id}>
                                <div className="border-primary border-0.5 rounded-2xl flex flex-col overflow-auto h-52">
                                    <div className="h-3/4 bg-f6f6f6 rounded-2xl border-primary border-b-0.5 flex justify-center items-center overflow-hidden">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title || "Media"}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <img src={mediaIcon} alt="Media" />
                                        )}
                                    </div>
                                    <p className="md:px-4 px-2 md:py-2 py-1 md:text-sm text-xs h-1/4 line-clamp-2">
                                        {item.translation?.title || "Untitled"}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}

                {/* ✅ More Fields */}
                <MoreFieldsRenderer
                    currentBlock={currentBlock}
                    onChangeBlock={onChangeBlock}
                    moreFields={moreFields}
                    setMoreFields={setMoreFields}
                />
            </div>

            <div className="flex items-center md:gap-8 gap-2 md:mt-5 mt-2">
                <ChangeBlockType
                    currentBlock={currentBlock}
                    onChangeType={onChangeType}
                    types={types}
                />
                <MoreFieldsEditor
                    currentBlock={currentBlock}
                    onChangeBlock={onChangeBlock}
                    moreFields={moreFields}
                    setMoreFields={setMoreFields}
                    fieldsToShow={["title", "description"]}
                />
            </div>
        </>
    );
};

export default MembershipBlock;

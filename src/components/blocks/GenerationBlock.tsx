import { useRef, useState } from "react";
import type { BlockTypeProps } from "./changeBlockTypes";
import { v4 as uuidv4 } from "uuid";
import Button from "../ui/button";
import {
    arrowDownIcon,
    arrowUpIcon,
    closeIcon,
    plusIcon,
} from "../../icons";
import Input from "../ui/input/Input";
import MoreFieldsRenderer from "./MoreFieldsRenderer";
import ChangeBlockType from "./ChangeBlockType";
import MoreFieldsEditor from "./MoreFieldsEditor";


const GenerationBlock = ({
    currentBlock,
    onChangeType,
    types,
    onChangeBlock,
}: BlockTypeProps) => {
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [moreFields, setMoreFields] = useState<string[]>([]);

    const handleAddGeneration = () => {
        const generation = currentBlock.content.generation ?? [];
        const nextOrder = Math.max(...generation.map((q: any) => q.order || 0), 0) + 1;
        const updatedQuotes = [
            ...generation,
            { id: uuidv4(), description: "", rank: "", order: nextOrder },
        ];
        onChangeBlock?.({
            ...currentBlock,
            content: {
                ...currentBlock.content,
                generation: updatedQuotes,
            },
        });
    };

    const handleChange = (
        index: number,
        field: "description" | "rank",
        value: string
    ) => {
        const updatedQuotes = [...currentBlock.content?.generation];

        const updatedQuote = {
            ...updatedQuotes[index], [field]: field === "rank" ? Number(value) : value, // convert rank to number
        };
        updatedQuotes[index] = updatedQuote;
        onChangeBlock?.({
            ...currentBlock,
            content: {
                ...currentBlock.content,
                generation: updatedQuotes,
            },
        });
    };

    const handleRemoveQuote = (index: number) => {
        const updatedQuotes = (currentBlock.content?.generation || [])
            .filter((_item: unknown, i: number) => i !== index)
            .map((generation: any, newIndex: number) => ({
                ...generation,
                order: newIndex + 1,
            }));

        onChangeBlock?.({
            ...currentBlock,
            content: {
                ...currentBlock.content,
                generation: updatedQuotes,
            },
        });
    };

    const reorderQuotes = (fromIndex: number, toIndex: number) => {
        if (!currentBlock?.content?.generation) return;

        const generationCopy = currentBlock.content.generation.map((generation: any) => ({
            ...generation,
        }));

        // Ensure the indices are valid
        if (toIndex < 0 || toIndex >= generationCopy.length) return;

        // Move the item
        const [movedQuote] = generationCopy.splice(fromIndex, 1);
        generationCopy.splice(toIndex, 0, movedQuote);

        // Reassign order values (if needed)
        const reorderedQuotes = generationCopy.map((generation: any, index: number) => ({
            ...generation,
            order: index + 1,
        }));

        // Send update
        onChangeBlock?.({
            ...currentBlock,
            content: {
                ...currentBlock.content,
                generation: reorderedQuotes,
            },
        });
    };

    return (
        <>
            <div className="border-b-0.5 border-b-primary">
                {currentBlock.content.generation &&
                    currentBlock.content?.generation?.map((generation: any, index: number) => {
                        const totalQuotes = currentBlock.content.generation.length;
                        const isFirst = index === 0;
                        const isLast = index === totalQuotes - 1;
                        return (
                            <div
                                key={index}
                                className="md:mb-4 mb-2 relative p-4 bg-f6f6f6 rounded-xl"
                            >
                                <div className="flex items-center gap-2 justify-end">
                                    {totalQuotes > 1 && !isFirst && (
                                        <Button
                                            icon={arrowUpIcon}
                                            backgroundColor="transparent"
                                            className="p-0 md:w-5 w-3 md:h-5 h-3"
                                            onClick={() => reorderQuotes(index, index - 1)}
                                        />
                                    )}
                                    {totalQuotes > 1 && !isLast && (
                                        <Button
                                            icon={arrowDownIcon}
                                            backgroundColor="transparent"
                                            className="p-0 md:w-5 w-3 md:h-5 h-3"
                                            onClick={() => reorderQuotes(index, index + 1)}
                                        />
                                    )}
                                    {totalQuotes > 1 && (
                                        <Button
                                            icon={closeIcon}
                                            backgroundColor="transparent"
                                            onClick={() => handleRemoveQuote(index)}
                                            className="p-0 w-5"
                                        />
                                    )}
                                </div>

                                <Input
                                    label=" Generation rank"
                                    type="number"
                                    value={generation.rank}
                                    className="md:mb-5 mb-2"
                                    onChange={(e) =>
                                        handleChange(index, "rank", e.target.value)
                                    }
                                />
                                <div>
                                    <label className="block md:text-base/4 text-sm mb-2 font-medium">
                                        Generation Description
                                    </label>
                                    <textarea
                                        rows={2}
                                        className="w-full p-3 text-base border-0.5 border-primary rounded-2xl resize-none"
                                        value={generation.description}
                                        onChange={(e) =>
                                            handleChange(index, "description", e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        );
                    })}

                <Button
                    text="Add More Generation"
                    icon={plusIcon}
                    backgroundColor="transparent"
                    className="addSideBarBtn relative p-0"
                    onClick={handleAddGeneration}
                />

                <MoreFieldsRenderer
                    currentBlock={currentBlock}
                    onChangeBlock={onChangeBlock}
                    moreFields={moreFields}
                    setMoreFields={setMoreFields}
                />
            </div>
            <div className="mt-5 md:gap-8 gap-2 flex items-center">
                <ChangeBlockType
                    currentBlock={currentBlock}
                    onChangeType={onChangeType}
                    types={types}
                />
            
                <div className="relative" ref={dropdownRef}>
                    <MoreFieldsEditor
                        currentBlock={currentBlock}
                        moreFields={moreFields}
                        setMoreFields={setMoreFields}
                        onChangeBlock={onChangeBlock}
                        fieldsToShow={["title", "description"]}
                    />
                </div>

            </div>
        </>
    );
};

export default GenerationBlock;

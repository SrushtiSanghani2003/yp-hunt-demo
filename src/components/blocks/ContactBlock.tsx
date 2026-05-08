import { useEffect, useRef, useState } from "react";
import {
  arrowDownIcon,
  arrowUpIcon,
  closeIcon,
  descIcon,
  moreIcon,
  plusIcon,
} from "../../icons";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import type { BlockTypeProps } from "./changeBlockTypes";
import MoreFieldsRenderer from "./MoreFieldsRenderer";
import ChangeBlockType from "./ChangeBlockType";
import MoreFieldsEditor from "./MoreFieldsEditor";
import { v4 as uuidv4 } from "uuid";

const ContactBlock = ({
  currentBlock,
  onChangeType,
  types,
  onChangeBlock,
}: BlockTypeProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [moreFields, setMoreFields] = useState<string[]>([]);
  const descDropdownRef = useRef<HTMLDivElement | null>(null);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const [descriptionActivated, setDescriptionActivated] = useState<{
    [key: number]: boolean;
  }>({});

  const handleChange = (index: number, label: string, value: string) => {
    const updatedContacts = [...currentBlock.content.contacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      [label]: value,
    };

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        contacts: updatedContacts,
      },
    });
  };

  const handleEmailChange = (
    index: number,
    emailIndex: number,
    value: string
  ) => {
    const updatedContacts = [...currentBlock.content.contacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      email: updatedContacts[index].email.map((email: any, i: number) => {
        if (i === emailIndex) {
          return { value };
        }
        return email;
      }),
    };
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        contacts: updatedContacts,
      },
    });
  };

  const handlePhoneChange = (
    index: number,
    phoneIndex: number,
    value: string
  ) => {
    const updatedContacts = [...currentBlock.content.contacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      phone: updatedContacts[index].phone.map((phone: any, i: number) => {
        if (i === phoneIndex) {
          return { value };
        }
        return phone;
      }),
    };
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        contacts: updatedContacts,
      },
    });
  };

  const handleRemoveField = (
    index: number,
    field: "email" | "phone",
    fieldIndex: number
  ) => {
    const updatedContacts = [...currentBlock.content.contacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      [field]: updatedContacts[index][field]
        .filter((_: any, i: number) => i !== fieldIndex)
        .map((item: any, i: number) => ({
          ...item,
          order: i + 1,
        })),
    };
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        contacts: updatedContacts,
      },
    });
  };

  const handleAddMoreContact = () => {
    const updatedContacts = [...currentBlock.content.contacts];
    const nextOrder =
      Math.max(...updatedContacts.map((c) => c.order || 0), 0) + 1;
    updatedContacts.push({
      id: uuidv4(),
      title: "",
      description: "",
      email: [{ value: "" }],
      phone: [{ value: "" }],
      order: nextOrder,
    });

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        contacts: updatedContacts,
      },
    });
  };

  const handleRemoveContact = (index: number) => {
    const updatedContacts = [...currentBlock.content.contacts];
    updatedContacts.splice(index, 1);
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        contacts: updatedContacts,
      },
    });
  };

  const handleContactFieldAdd = (index: number, field: "phone" | "email") => {
    const updatedContacts = currentBlock.content.contacts.map(
      (contact: any, i: number) =>
        i === index
          ? {
            ...contact,
            [field]: [...(contact[field] || []), { value: "" }],
          }
          : contact
    );

    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        contacts: updatedContacts,
      },
    });
  };

  const reorderContacts = (fromIndex: number, toIndex: number) => {
    if (!currentBlock?.content?.contacts) return;

    const contactsCopy = currentBlock.content.contacts.map((contact: any) => ({
      ...contact,
    }));

    // Ensure the indices are valid
    if (toIndex < 0 || toIndex >= contactsCopy.length) return;

    // Move the item
    const [movedContacts] = contactsCopy.splice(fromIndex, 1);
    contactsCopy.splice(toIndex, 0, movedContacts);

    // Reassign order values (if needed)
    const reorderedContacts = contactsCopy.map(
      (contacts: any, index: number) => ({
        ...contacts,
        order: index + 1,
      })
    );

    // Send update
    onChangeBlock?.({
      ...currentBlock,
      content: {
        ...currentBlock.content,
        contacts: reorderedContacts,
      },
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        descDropdownRef.current &&
        !descDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (currentBlock?.content?.contacts) {
      const newDescriptionActivated = currentBlock.content.contacts.map(
        (item: any) => item.description != ""
      );
      setDescriptionActivated(newDescriptionActivated);
    }
    if (currentBlock.content?.more) {
      setMoreFields(Object.keys(currentBlock.content.more));
    } else {
      setMoreFields([]);
    }
  }, [currentBlock]);

  return (
    <>
      {currentBlock?.content?.contacts.map((item: any, index: number) => {
        const allContacts = [...currentBlock.content.contacts];
        const isFirst = index === 0;
        const isLast = index === allContacts.length - 1;

        return (
          <div className="bg-f6f6f6 p-5 rounded-xl mb-5" key={item.id}>
            <div className="flex items-center justify-end gap-5">
              <div className="relative">
                <Button
                  backgroundColor="transparent"
                  icon={moreIcon}
                  onClick={() =>
                    setOpenDropdownIndex(
                      openDropdownIndex === index ? null : index
                    )
                  }
                />
                {openDropdownIndex === index && (
                  <div
                    ref={descDropdownRef}
                    className="absolute w-36 top-10 right-0 bg-white rounded-lg shadow-md p-2 z-10"
                  >
                    <div
                      className={`flex items-center gap-2 ${descriptionActivated[index]
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                        }`}
                      onClick={() => {
                        if (descriptionActivated[index]) return;

                        setDescriptionActivated((prev) => ({
                          ...prev,
                          [index]: true,
                        }));
                        setOpenDropdownIndex(null);
                      }}
                    >
                      <img src={descIcon} />
                      <span>Description</span>
                    </div>
                  </div>
                )}
              </div>
              {allContacts?.length > 1 && !isFirst && (
                <Button
                  icon={arrowUpIcon}
                  backgroundColor="transparent"
                  className="p-0 md:w-5 w-3 md:h-5 h-3"
                  onClick={() => reorderContacts(index, index - 1)}
                />
              )}
              {allContacts?.length > 1 && !isLast && (
                <Button
                  icon={arrowDownIcon}
                  backgroundColor="transparent"
                  className="p-0 md:w-5 w-3 md:h-5 h-3"
                  onClick={() => reorderContacts(index, index + 1)}
                />
              )}
              {allContacts?.length > 1 && (
                <Button
                  icon={closeIcon}
                  backgroundColor="transparent"
                  className="p-0 md:w-5 w-3 md:h-5 h-3"
                  onClick={() => {
                    handleRemoveContact(index);
                  }}
                />
              )}
            </div>
            <Input
              label="Title"
              className="md:mb-3"
              placeholder="Title here..."
              inputCss="py-3"
              value={item.title ?? ""}
              onChange={(e) => handleChange(index, "title", e.target.value)}
            />
            {descriptionActivated[index] && (
              <div className="relative my-3">
                <Input
                  label="Description"
                  placeholder="Enter description..."
                  inputCss="py-3"
                  value={item.description ?? ""}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                />
                <Button
                  backgroundColor="transparent"
                  icon={closeIcon}
                  className="absolute right-2 top-0 md:p-0"
                  onClick={() => {
                    handleChange(index, "description", "");
                    setDescriptionActivated((prev) => ({
                      ...prev,
                      [index]: false,
                    }));
                  }}
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                  Phone No.
                </p>
                {item.phone.map((phone: any, phoneIndex: number) => {
                  const totalPhones = item.phone.length;
                  return (
                    <div className="relative" key={phoneIndex}>
                      <Input
                        key={phoneIndex}
                        // type="number"
                        inputCss="py-3"
                        placeholder="Phone number here..."
                        value={phone.value ?? ""}
                        onChange={(e) =>
                          handlePhoneChange(index, phoneIndex, e.target.value)
                        }
                      />
                      {totalPhones > 1 && (
                        <Button
                          backgroundColor="transparent"
                          icon={closeIcon}
                          className="absolute right-2 top-1/2 transform -translate-y-1/3"
                          onClick={() =>
                            handleRemoveField(index, "phone", phoneIndex)
                          }
                        />
                      )}
                    </div>
                  );
                })}

                <Button
                  icon={plusIcon}
                  text="Add Phone No."
                  className="md:p-0 my-2"
                  backgroundColor="transparent"
                  onClick={() => handleContactFieldAdd(index, "phone")}
                />
              </div>
              <div>
                <p className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                  Email
                </p>
                {item.email.map((email: any, emailIndex: number) => {
                  const totalEmails = item.email.length;
                  return (
                    <div className="relative" key={emailIndex}>
                      <Input
                        key={emailIndex}
                        inputCss="py-3"
                        placeholder="Email here..."
                        value={email.value ?? ""}
                        onChange={(e) =>
                          handleEmailChange(index, emailIndex, e.target.value)
                        }
                      />
                      {totalEmails > 1 && (
                        <Button
                          backgroundColor="transparent"
                          icon={closeIcon}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() =>
                            handleRemoveField(index, "email", emailIndex)
                          }
                        />
                      )}
                    </div>
                  );
                })}
                <Button
                  icon={plusIcon}
                  text="Add Email"
                  className="md:p-0 my-2"
                  backgroundColor="transparent"
                  onClick={() => handleContactFieldAdd(index, "email")}
                />
              </div>
            </div>
          </div>
        );
      })}
      <Button
        text="Add More"
        icon={plusIcon}
        backgroundColor="transparent"
        className="addSideBarBtn relative p-0"
        onClick={handleAddMoreContact}
      />
      <MoreFieldsRenderer
        currentBlock={currentBlock}
        onChangeBlock={onChangeBlock}
        moreFields={moreFields}
        setMoreFields={setMoreFields}
      />
      <div className="mt-5  md:gap-8 gap-2 flex items-center">
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

export default ContactBlock;

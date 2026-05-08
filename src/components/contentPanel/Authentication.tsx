import { useEffect, useState } from "react";
import { chevronDown, correctIcon, infoIcon } from "../../icons";
import SidebarDialog from "../ui/sidebarDialog/SidebarDialog";
import Select from // type StylesConfig, // type CSSObjectWithLabel,
"react-select";
import { customStyles } from "../account-settings/CreateCategories";

type AuthenticationProps = {
  open: boolean;
  onClose: () => void;
  data: any;
  onSave?: (payload: {
    must_be_logged_in: boolean;
    must_be_verified: boolean;
    must_be_over_18: boolean;
    restriction_type: string;
    entitlements: string[];
  }) => void;
};

const Authentication = ({
  open,
  onClose,
  data,
  onSave,
}: AuthenticationProps) => {
  const initialRequirements = [
    {
      id: 1,
      label: "Must be logged in",
      value: "must_be_logged_in",
      checked: false,
    },
    {
      id: 2,
      label: "Must be verified",
      value: "must_be_verified",
      checked: false,
    },
    {
      id: 3,
      label: "Must be over 18",
      value: "must_be_over_18",
      checked: false,
    },
  ];

  const options = [
    { value: "vip_access", label: "Vip Access" },
    { value: "premium_user", label: "Premium User" },
  ];

  const [requirements, setRequirements] = useState(initialRequirements);
  const [restrictionType, setRestrictionType] = useState("");
  const [entitlements, setEntitlements] = useState<string[]>([]);

  const toggleCheckbox = (id: number) => {
    setRequirements((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleSubmit = () => {
    const payload = {
      must_be_logged_in:
        requirements.find((r) => r.value === "must_be_logged_in")?.checked ||
        false,
      must_be_verified:
        requirements.find((r) => r.value === "must_be_verified")?.checked ||
        false,
      must_be_over_18:
        requirements.find((r) => r.value === "must_be_over_18")?.checked ||
        false,
      entitlements: entitlements,
      restriction_type: restrictionType,
    };

    onSave?.(payload);
    onClose();
  };

  useEffect(() => {
    if (data) {
      setRestrictionType(data?.restriction_type);
      if (data?.entitlements) {
        setEntitlements(data?.entitlements);
      }
      const updatedRequirements = initialRequirements.map((req) => ({
        ...req,
        checked: data[req.value] || false,
      }));
      setRequirements(updatedRequirements);
    }
  }, [data]);

  return (
    <SidebarDialog
      title="Authentication"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div>
        <div className="flex items-start gap-2 md:mb-6 mb-3">
          <img src={infoIcon} />
          <p className="text-sm font-light">
            A user must be logged in before adding any authentication or
            entitlement
          </p>
        </div>

        <div className="flex flex-col gap-2 md:mb-8 mb-4">
          {requirements.map((item) => (
            <div key={item.id} className="flex items-center gap-sp6">
              <input
                type="checkbox"
                id={`req-${item.id}`}
                className="peer hidden"
                checked={item.checked}
                onChange={() => toggleCheckbox(item.id)}
              />
              <label
                htmlFor={`req-${item.id}`}
                className="w-5 h-5 m-0 flex items-center justify-center border border-gray-400 rounded cursor-pointer
              peer-checked:bg-black peer-checked:border-black"
              >
                <img src={correctIcon} alt="Right" />
              </label>
              <label
                htmlFor={`req-${item.id}`}
                className="md:text-base tetx-xs font-light "
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
        <div className="md:mb-5 mb-2">
          <label
            htmlFor="videoSource"
            className="block md:mb-2 mb-1 md:text-base text-sm font-medium"
          >
            Entitlements
          </label>
          <div className="relative">
            <select
              id="videoSource"
              className="appearance-none w-full md:p-3 p-2 md:text-base text-sm focus-within:outline-none border-0.5 border-primary rounded-2xl"
              value={restrictionType}
              onChange={(e) => setRestrictionType(e.target.value)}
            >
              <option value="" disabled>
                Please Select
              </option>
              <option value="free">Free</option>
              <option value="entitlement_based">Entitlement Based</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <img src={chevronDown} />
            </div>
          </div>
        </div>

        {restrictionType == "entitlement_based" && (
          <div className="mb-5">
            <label
              htmlFor="videoSource"
              className="block md:mb-2 mb-1 md:text-base text-sm font-medium"
            >
              Restriction Type
            </label>
            <Select
              isMulti
              options={options}
              value={options.filter((opt) => entitlements.includes(opt.value))}
              onChange={(selectedOptions) =>
                setEntitlements(selectedOptions.map((opt) => opt.value))
              }
              placeholder="Select entitlements"
              styles={customStyles}
            />
          </div>
        )}
      </div>
    </SidebarDialog>
  );
};

export default Authentication;

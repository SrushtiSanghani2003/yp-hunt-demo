import { useEffect, useState, type ChangeEvent } from "react";
import SidebarDialog from "../ui/sidebarDialog/SidebarDialog";
import ToggleSwitch from "../ui/switch/ToggleSwitch";
import Select from "react-select";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { customStyles } from "../account-settings/CreateCategories";

const GeoBlocking = ({
  open,
  onClose,
  data,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  data: any;
  onSave?: (payload: { permission: string; countries: string[] }) => void;
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [permission, setPermission] = useState("allow");
  const [selectedCountries, setSelectedCountries] = useState<
    { value: string; label: string }[]
  >([]);

  countries.registerLocale(enLocale);
  const countryOptions = Object.entries(
    countries.getNames("en", { select: "official" })
  ).map(([code, name]) => ({
    value: code,
    label: name,
  }));

  const handlePermissionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPermission(e.target.value);
  };

  const handleToggleChange = (enabled: boolean) => {
    setIsEnabled(enabled);

    if (!enabled) {
      setPermission("");
      setSelectedCountries([]);
    }
  };

  const handleSubmit = () => {
    const countryCodes = selectedCountries.map((country) => country.value);
    onSave?.({ permission, countries: countryCodes });
    onClose();
  };

  useEffect(() => {
    if (data) {
      const hasGeoBlockData =
        data?.geo_block_mode ||
        (Array.isArray(data?.geo_block_countries) &&
          data.geo_block_countries.length > 0);

      setIsEnabled(hasGeoBlockData);
      setPermission(data?.geo_block_mode);

      if (Array.isArray(data?.geo_block_countries)) {
        const preselected = data.geo_block_countries
          .map((code: string) => {
            const countryName = countries.getName(code, "en");
            return countryName ? { value: code, label: countryName } : null;
          })
          .filter(Boolean) as { value: string; label: string }[];

        setSelectedCountries(preselected);
      }
    }
  }, [data]);

  return (
    <SidebarDialog
      title="Geo Blocking"
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="md:mb-6 mb-3">
        <ToggleSwitch
          label={`${isEnabled ? "Enabled" : "Disabled"}`}
          labelPosition="right"
          onChange={handleToggleChange}
          checked={isEnabled}
        />
      </div>

      <div
        className={`transition-opacity duration-300 ${
          isEnabled
            ? "opacity-100"
            : "opacity-50 pointer-events-none select-none"
        }`}
      >
        <div className="flex gap-4 md:mb-6 mb-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="permission"
              value="allow"
              className="hover:bg-gray-300 h-4 w-4"
              style={{ accentColor: "#000000" }}
              checked={permission === "allow"}
              onChange={handlePermissionChange}
              required
            />
            <span className="md:text-base text-sm font-light">Allow</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="permission"
              value="deny"
              checked={permission === "deny"}
              onChange={handlePermissionChange}
              className="hover:bg-gray-300 h-4 w-4"
              style={{ accentColor: "#000000" }}
            />
            <span className="md:text-base text-sm font-light">Block</span>
          </label>
        </div>

        <div className="md:mb-5 mb-2">
          <label
            htmlFor="countries"
            className="block md:mb-2 mb-1 md:text-base text-sm font-medium"
          >
            Countries<sup>*</sup>
          </label>
          <Select
            options={countryOptions}
            placeholder="Select a country"
            isSearchable
            styles={customStyles}
            isMulti
            value={selectedCountries}
            onChange={(selected) => setSelectedCountries(selected as any)}
          />
        </div>
      </div>
    </SidebarDialog>
  );
};

export default GeoBlocking;

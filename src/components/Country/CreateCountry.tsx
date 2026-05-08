import { useNavigate, useParams } from "react-router-dom";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import { paths } from "../../config/paths";
import { useScroll } from "../../hooks/ScrollContext";
import {
  selectCountry,
  setCountryField,
  setFullCountry,
  type CountryState,
} from "../../redux-toolkit/countrySlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useCountryById,
  useCreateCountry,
  useUpdateCountry,
} from "../../hooks/useCountry";
import Input from "../ui/input/Input";
import { useEffect, useState } from "react";
import { normalizeCountryResponse } from "./normalizer/normalizeCountryResponse";

export default function CreateCountry() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { isScrolled } = useScroll();
  const country = useSelector(selectCountry);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CountryState, string>>
  >({});
  const { data: countryDataById } = useCountryById(id);
  const createCountryMutation = useCreateCountry(country);
  const updateCountryMutation = useUpdateCountry(country);
  const handleChange = (field: keyof CountryState, value: string) => {
    dispatch(
      setCountryField({
        field,
        value,
      }),
    );

    setErrors((prev) => {
      if (!prev[field]) return prev;

      const updatedErrors = { ...prev };
      delete updatedErrors[field];
      return updatedErrors;
    });
  };
  const validate = () => {
    const newErrors: Partial<Record<keyof CountryState, string>> = {};

    if (!country.name?.trim()) {
      newErrors.name = "Country name is required";
    }

    if (!country.phonecode?.trim()) {
      newErrors.phonecode = "Phone code is required";
    }

    if (!country.iso2?.trim()) {
      newErrors.iso2 = "ISO2 code is required";
    } else if (country.iso2.length !== 2) {
      newErrors.iso2 = "ISO2 must be 2 characters";
    }

    if (!country.iso3?.trim()) {
      newErrors.iso3 = "ISO3 code is required";
    } else if (country.iso3.length !== 3) {
      newErrors.iso3 = "ISO3 must be 3 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleCoutrySubmit = (id: string | number | any) => {
    const isValid = validate();
    if (!isValid) return;
    if (isEditMode && id) {
      updateCountryMutation.mutate(id);
    } else {
      createCountryMutation.mutate();
    }
  };
  useEffect(() => {
    if (isEditMode && countryDataById) {
      const normalizedCountry = normalizeCountryResponse(countryDataById?.data);
      dispatch(setFullCountry(normalizedCountry));
    }
  }, [countryDataById]);
  return (
    <div>
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Country Builder"
          onSaveTemplate={() => navigate(paths.country.path)}
          onSaveTemplateTitle="Cancel"
          onSubmit={() => handleCoutrySubmit(String(id))}
          onSubmitLoading={
            createCountryMutation.isPending || updateCountryMutation.isPending
          }
          isEditMode={isEditMode}
        />
      </div>
      <div className="container grid grid-cols-12 xl:gap-sp30 lg:gap-sp16 gap-sp9">
        <div className="lg:col-span-12 md:col-span-10 col-span-10">
          <div className="bg-white md:mb-5 mb-3 border-0.5 border-primary rounded-15 md:p-5 p-3 ">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Country Name"
                placeholder="Enter Country Name..."
                value={country?.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                error={errors.name}
              />
              <Input
                type="number"
                label="Phone Code"
                value={country.phonecode}
                onChange={(e) => handleChange("phonecode", e.target.value)}
                placeholder="93"
                error={errors.phonecode}
              />
              <Input
                label="ISO2 Code"
                value={country.iso2}
                onChange={(e) =>
                  handleChange("iso2", e.target.value.toUpperCase())
                }
                maxLength={2}
                error={errors.iso2}
                placeholder="IN"
              />

              <Input
                label="ISO3 Code"
                value={country.iso3}
                onChange={(e) =>
                  handleChange("iso3", e.target.value.toUpperCase())
                }
                maxLength={3}
                placeholder="IND"
                error={errors.iso3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

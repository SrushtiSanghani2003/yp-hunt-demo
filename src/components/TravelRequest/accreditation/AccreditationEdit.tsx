import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../config/paths";
import BuilderHeader from "../../ui/builderHeader/BuilderHeader";
import { useDispatch, useSelector } from "react-redux";

import AsyncSelect from "react-select/async";
import { customStyles } from "../../account-settings/CreateCategories";
import { useMemo, useState, useEffect } from "react";
import api from "../../../lib/api";
import { useQuery } from "@tanstack/react-query";
import Input from "../../ui/input/Input";
import PhoneInput from "react-phone-input-2";
import { normalizeAccreditationResponse } from "./normalizer/normalizerAccreditation";
import {
  selectAccreditation,
  setAccreditationField,
  setFullAccreditation,
} from "../../../redux-toolkit/accreditationSlice";
import {
  useGetAccreditationById,
  useUpdateAccreditation,
} from "../../../hooks/useAccreditation";
import { useScroll } from "../../../hooks/ScrollContext";

export default function AccreditationEdit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isScrolled } = useScroll();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const accreditation = useSelector(selectAccreditation);
  const updateAccreditationMutation = useUpdateAccreditation(accreditation);
  const { data: accreditationById } = useGetAccreditationById(id);

  const [selectedTournament, setSelectedTournament] = useState<any | null>(
    null,
  );
  /* ---------------------------------- */
  /* Tournaments */
  /* ---------------------------------- */
  const getAllTournaments = async () => {
    const res = await api.get("/tournament/getDropdown");
    return res.data;
  };

  const { data: allTournaments = [] } = useQuery({
    queryKey: ["tournaments"],
    queryFn: getAllTournaments,
    refetchOnWindowFocus: false,
  });

  const tournamentOptions = useMemo(
    () =>
      allTournaments.map((item: any) => ({
        value: item.id,
        label: item.name,
      })),
    [allTournaments],
  );

  const loadOptionsTournaments = (inputValue: string, callback: any) => {
    const filtered = tournamentOptions.filter((t: any) =>
      t.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
    callback(inputValue ? filtered : tournamentOptions.slice(0, 50));
  };

  const handleTournamentChange = (selected: any) => {
    setSelectedTournament(selected);
    dispatch(
      setAccreditationField({
        field: "tournament_id",
        value: selected?.value ?? null,
      }),
    );
  };

  const handleContactChange = (value: string, country: any) => {
    const dialCode = country?.dialCode || "";

    const localNumber = value.startsWith(dialCode)
      ? value.slice(dialCode.length)
      : value;

    dispatch(
      setAccreditationField({
        field: "contact_number",
        value: localNumber,
      }),
    );

    dispatch(
      setAccreditationField({
        field: "contact_phone_code",
        value: `+${dialCode}`,
      }),
    );
  };
  const handlePhoneChange = (value: string, country: any) => {
    const dialCode = country?.dialCode || "";

    const localNumber = value.startsWith(dialCode)
      ? value.slice(dialCode.length)
      : value;

    dispatch(
      setAccreditationField({
        field: "phone_number",
        value: localNumber,
      }),
    );

    dispatch(
      setAccreditationField({
        field: "phone_code",
        value: `+${dialCode}`,
      }),
    );
  };

  useEffect(() => {
    if (isEditMode && accreditation.tournament_id && allTournaments.length) {
      const selected = tournamentOptions.find(
        (t: any) => t.value == accreditation.tournament_id,
      );
      if (selected) setSelectedTournament(selected);
    }
  }, [isEditMode, accreditation.tournament_id, allTournaments]);

  useEffect(() => {
    if (isEditMode && accreditationById) {
      const normalized = normalizeAccreditationResponse(accreditationById);
      dispatch(setFullAccreditation(normalized));
    }
  }, [accreditationById]);

  const handleSubmit = (id: string) => {
    if (isEditMode && id) {
      updateAccreditationMutation.mutate(id);
    }
  };

  return (
    <div>
      <div
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Accreditation Builder"
          onSaveTemplate={() =>
            navigate(paths.travelrequest.accreditation.path)
          }
          onSaveTemplateTitle="Cancel"
          onSubmit={() => handleSubmit(String(id))}
          onSubmitLoading={updateAccreditationMutation.isPending}
          isEditMode={isEditMode}
        />
      </div>

      <div className="container grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <div className="bg-white border border-primary rounded-2xl p-5 mb-4">
            {/* Tournament & Contact */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium block">Tournament</label>
                <AsyncSelect
                  cacheOptions
                  styles={customStyles}
                  loadOptions={loadOptionsTournaments}
                  defaultOptions={tournamentOptions.slice(0, 50)}
                  placeholder="Select Tournament"
                  value={selectedTournament}
                  onChange={handleTournamentChange}
                />
              </div>

              <div>
                <label className="block text-base font-medium mb-1">
                  Contact Number
                </label>
                <PhoneInput
                  country="in"
                  value={
                    accreditation.contact_number
                      ? `${accreditation.contact_phone_code?.replace("+", "")}${
                          accreditation.contact_number
                        }`
                      : ""
                  }
                  onChange={handleContactChange}
                  countryCodeEditable={false}
                  inputStyle={{
                    width: "100%",
                    border: "1px solid #acacac",
                    borderRadius: "12px",
                    height: "40px",
                    fontSize: "14px",
                    paddingLeft: "48px",
                    backgroundColor: "#f9f9f9",
                  }}
                  buttonStyle={{
                    border: "1px solid #acacac",
                    borderTopLeftRadius: "12px",
                    borderBottomLeftRadius: "12px",
                    backgroundColor: "#f9f9f9",
                  }}
                  containerStyle={{ width: "100%" }}
                  dropdownStyle={{ zIndex: 9999 }}
                />
              </div>
              <Input
                label="First Name"
                value={accreditation.first_name}
                onChange={(e) =>
                  dispatch(
                    setAccreditationField({
                      field: "first_name",
                      value: e.target.value,
                    }),
                  )
                }
              />
              <Input
                label="Last Name"
                value={accreditation.last_name}
                onChange={(e) =>
                  dispatch(
                    setAccreditationField({
                      field: "last_name",
                      value: e.target.value,
                    }),
                  )
                }
              />
              <Input
                label="Email"
                type="email"
                value={accreditation.email}
                onChange={(e) =>
                  dispatch(
                    setAccreditationField({
                      field: "email",
                      value: e.target.value,
                    }),
                  )
                }
              />
              <div>
                <label className="block text-base font-medium mb-1">
                  Phone Number
                </label>
                <PhoneInput
                  country="in"
                  value={
                    accreditation.phone_number
                      ? `${accreditation.phone_code?.replace("+", "")}${
                          accreditation.phone_number
                        }`
                      : ""
                  }
                  onChange={handlePhoneChange}
                  countryCodeEditable={false}
                  inputStyle={{
                    width: "100%",
                    border: "1px solid #acacac",
                    borderRadius: "12px",
                    height: "40px",
                    fontSize: "14px",
                    paddingLeft: "48px",
                    backgroundColor: "#f9f9f9",
                  }}
                  buttonStyle={{
                    border: "1px solid #acacac",
                    borderTopLeftRadius: "12px",
                    borderBottomLeftRadius: "12px",
                    backgroundColor: "#f9f9f9",
                  }}
                  containerStyle={{ width: "100%" }}
                  dropdownStyle={{ zIndex: 9999 }}
                />
              </div>
              <div>
                <label className="mb-2 block font-medium">Admin Notes</label>
                <textarea
                  rows={3}
                  value={accreditation.admin_notes ?? ""}
                  placeholder="Enter Admin Notes"
                  onChange={(e) =>
                    dispatch(
                      setAccreditationField({
                        field: "admin_notes",
                        value: e.target.value,
                      }),
                    )
                  }
                  className="w-full p-3 border border-primary rounded-2xl resize-none"
                />
              </div>
              <div>
                <label className="mb-2 block font-medium">User Notes</label>
                <textarea
                  rows={3}
                  value={accreditation.decline_reason ?? ""}
                  placeholder="Enter User Notes"
                  onChange={(e) =>
                    dispatch(
                      setAccreditationField({
                        field: "decline_reason",
                        value: e.target.value,
                      }),
                    )
                  }
                  className="w-full p-3 border border-primary rounded-2xl resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

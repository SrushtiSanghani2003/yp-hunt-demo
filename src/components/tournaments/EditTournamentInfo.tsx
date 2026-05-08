import { useDispatch, useSelector } from "react-redux";
import {
  addTournamentContact,
  removeTournamentContact,
  selectTournament,
  setFullTournament,
  updateTournamentContact,
  updateTournamentTranslationField,
} from "../../redux-toolkit/tournamentSlice";
import Button from "../ui/button";
import { closeIcon, plusIcon } from "../../icons";
import Input from "../ui/input/Input";
import PhoneInput from "react-phone-input-2";
import { useEffect, useState } from "react";
import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import { paths } from "../../config/paths";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useScroll } from "../../hooks/ScrollContext";
import { showToast } from "../../utils/toastUtils";
import {
  useTournamentById,
  useUpdateTournamentInfo,
} from "../../hooks/useTournament";
import {
  selectLanguage,
  selectTranslation,
} from "../../redux-toolkit/languageSlice";
import { normalizeTournamentResponse } from "./normalizer/normalizerTournament";
import { playerOrderRows, SectionCard } from "./EditTournaments";
import TextareaField from "../ui/Textarea/TextareaField";

function EditTournamentInfo() {
  const { isScrolled } = useScroll();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tournament = useSelector(selectTournament);
  const language = useSelector(selectLanguage);
  const [searchParams] = useSearchParams();
  const languageCode = searchParams.get("lang") || language;
  const isTranslation = useSelector(selectTranslation);
  const updateTournamentsMutation = useUpdateTournamentInfo(
    tournament,
    isTranslation,
  );
  const { data: tournamentDataById } = useTournamentById(id, languageCode);
  const [contactErrors, setContactErrors] = useState<any>({});
  const clearContactError = (index: number, field: string) => {
    setContactErrors((prev: any) => {
      if (!prev[index]?.[field]) return prev;
      const updated = { ...prev };
      delete updated[index][field];
      if (Object.keys(updated[index]).length === 0) {
        delete updated[index];
      }
      return updated;
    });
  };
  const validateContacts = () => {
    const errors: any = {};
    tournament.tournament_contacts?.forEach((contact: any, index: number) => {
      const contactError: any = {};
      if (!contact?.name || contact?.name.trim().length < 2) {
        contactError.name = "Name is required";
      }
      if (!contact.designation || contact.designation.trim() === "") {
        contactError.designation = "Designation is required";
      }
      if (!contact.mobile_number) {
        contactError.mobile_number = "Mobile number is required";
      } else if (
        !/^\+?[1-9]\d{7,14}$/.test(contact.mobile_number.replace(/\s+/g, ""))
      ) {
        contactError.mobile_number = "Enter valid mobile number";
      }
      if (Object.keys(contactError).length > 0) {
        errors[index] = contactError;
      }
    });
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleTournamentsSubmit = (id: string | number | any) => {
    if (!validateContacts()) {
      showToast("Please fix contact validation errors", "error");
      return;
    }
    if (isEditMode && id) {
      updateTournamentsMutation.mutate(id);
    }
  };
  useEffect(() => {
    if (isEditMode && tournamentDataById) {
      const normalizedTournament = normalizeTournamentResponse(
        tournamentDataById?.data,
        languageCode,
      );
      if (!normalizedTournament.broadcast_type_redbull) {
        normalizedTournament.broadcast_type_redbull = "redbull";
      }
      dispatch(setFullTournament(normalizedTournament));
    }
  }, [tournamentDataById]);
  return (
    <div>
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
          }`}
      >
        <BuilderHeader
          title="Tournaments Info Builder"
          onSaveTemplate={() => navigate(paths.tournaments.path)}
          onSaveTemplateTitle="Cancel"
          onSubmit={() => handleTournamentsSubmit(String(id))}
          onSubmitLoading={updateTournamentsMutation.isPending}
          isEditMode={isEditMode}
        />
      </div>
      <div className="container grid grid-cols-12 xl:gap-sp30 lg:gap-sp16 gap-sp9">
        <div className="lg:col-span-12 md:col-span-10 col-span-10">
          <div className="p-4 bg-gray-100 border-0.5 border-primary rounded-2xl mb-4">
            {/* Tournament Contacts */}
            <div>
              <h2 className="lg:text-xl/4 text-xl font-extrabold   mb-4 ">
                Tournament Contacts
              </h2>
              {tournament.tournament_contacts?.map(
                (contact: any, index: number) => (
                  <div
                    key={index}
                    className="my-2 p-3 bg-white border border-primary rounded-xl"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">Contact {index + 1}</h3>
                      <Button
                        icon={closeIcon}
                        backgroundColor="transparent"
                        className="!py-0"
                        onClick={() => dispatch(removeTournamentContact(index))}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input
                          label="Name"
                          placeholder="Enter name"
                          value={contact.name || ""}
                          onChange={(e) => {
                            dispatch(
                              updateTournamentContact({
                                index,
                                field: "name",
                                value: e.target.value || null,
                              }),
                            );

                            clearContactError(index, "name");
                          }}
                        />
                        {contactErrors[index]?.name && (
                          <p className="text-red-500 text-xs mt-1">
                            {contactErrors[index].name}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input
                          label="Designation"
                          placeholder="Enter designation"
                          value={contact.designation || ""}
                          onChange={(e) => {
                            dispatch(
                              updateTournamentContact({
                                index,
                                field: "designation",
                                value: e.target.value || null,
                              }),
                            );
                            clearContactError(index, "designation");
                          }}
                        />
                        {contactErrors[index]?.designation && (
                          <p className="text-red-500 text-xs mt-1">
                            {contactErrors[index].designation}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block md:mb-2 mb-1 font-medium md:text-base/4 text-sm">
                          Mobile Number
                        </label>
                        <PhoneInput
                          country="in"
                          value={contact.mobile_number || ""}
                          onChange={(value) => {
                            dispatch(
                              updateTournamentContact({
                                index,
                                field: "mobile_number",
                                value: value
                                  ? `+${value.replace(/^\+/, "")}`
                                  : null,
                              }),
                            );
                            clearContactError(index, "mobile_number");
                          }}
                          countryCodeEditable={false}
                          enableSearch
                          placeholder="Enter mobile number"
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
                        {contactErrors[index]?.mobile_number && (
                          <p className="text-red-500 text-xs mt-1">
                            {contactErrors[index].mobile_number}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input
                          label="Email"
                          placeholder="Enter email"
                          value={contact.email || ""}
                          onChange={(e) => {
                            dispatch(
                              updateTournamentContact({
                                index,
                                field: "email",
                                value: e.target.value || null,
                              }),
                            );
                            clearContactError(index, "email");
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ),
              )}
              <div className="flex justify-between items-center">
                <Button
                  icon={plusIcon}
                  text="Add Contact"
                  backgroundColor="transparent"
                  className="py-0"
                  onClick={() => dispatch(addTournamentContact())}
                />
              </div>
            </div>
          </div>
          <SectionCard title="Tournament Structure">
            <div className="grid grid-cols-2 mt-4 gap-4">
              <Input
                label="Qualification Title"
                placeholder="Enter Qualification Title"
                value={tournament.translation.qualification_title || ""}
                onChange={(e) =>
                  dispatch(
                    updateTournamentTranslationField({
                      field: "qualification_title",
                      value:
                        e.target.value.trim() === "" ? null : e.target.value,
                    }),
                  )
                }
              />
              <Input
                label="Main Draw Title"
                placeholder="Enter Main Draw Title"
                value={tournament.translation.main_draw_title || ""}
                onChange={(e) =>
                  dispatch(
                    updateTournamentTranslationField({
                      field: "main_draw_title",
                      value:
                        e.target.value.trim() === "" ? null : e.target.value,
                    }),
                  )
                }
              />
              <TextareaField
                label="Qualification Info"
                placeholder="Press Enter for a new line..."
                value={tournament?.translation.qualification_info}
                rows={3}
                onChange={(value) =>
                  dispatch(
                    updateTournamentTranslationField({
                      field: "qualification_info",
                      value,
                    }),
                  )
                }
              />
              <TextareaField
                label="Main Draw Info"
                placeholder="Press Enter for a new line..."
                value={tournament?.translation.main_draw_info}
                rows={3}
                onChange={(value) =>
                  dispatch(
                    updateTournamentTranslationField({
                      field: "main_draw_info",
                      value,
                    }),
                  )
                }
              />
            </div>
          </SectionCard>
          <SectionCard title="Player Order">
            <div>
              {playerOrderRows.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-2 gap-4 mb-4">
                  {row.map((field) => {
                    if (field.titleField) {
                      return (
                        <Input
                          key={field.titleField}
                          label={field.title}
                          placeholder={`Enter ${field.title}`}
                          value={tournament.translation[field.titleField] || ""}
                          onChange={(e) =>
                            dispatch(
                              updateTournamentTranslationField({
                                field: field.titleField!,
                                value:
                                  e.target.value.trim() === ""
                                    ? null
                                    : e.target.value,
                              }),
                            )
                          }
                        />
                      );
                    }

                    if (field.infoField) {
                      return (
                        <div
                          key={field.infoField}
                          className={field.fullWidth ? "col-span-2" : ""}
                        >
                          <TextareaField
                            label={field.title}
                            placeholder="Press Enter for a new line..."
                            rows={3}
                            value={
                              tournament.translation[field.infoField] || ""
                            }
                            onChange={(value) =>
                              dispatch(
                                updateTournamentTranslationField({
                                  field: field.infoField!,
                                  value,
                                }),
                              )
                            }
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

export default EditTournamentInfo;

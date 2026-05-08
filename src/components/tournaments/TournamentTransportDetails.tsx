import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import { paths } from "../../config/paths";
import Button from "../ui/button";
import Input from "../ui/input/Input";
import { chevronDown, closeIcon, plusIcon } from "../../icons";

import {
  useGetTournamentTravel,
  useUpdateTournamentTravel,
} from "../../hooks/useTournament";

import {
  addTournamentTravel,
  removeTournamentTravel,
  updateTournamentTravelBlock,
  setFullTournamentTravel,
  selectTournamentTravel,
} from "../../redux-toolkit/tournamentTravelSlice";
import { normalizeTournamentTravelResponse } from "./normalizer/normalizerTournamentTravel";
import { useScroll } from "../../hooks/ScrollContext";

export default function TournamentTransportDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { isScrolled } = useScroll();
  const dispatch = useDispatch();
  const { travels: transports } = useSelector(selectTournamentTravel);

  const updateTravelMutation = useUpdateTournamentTravel();
  const { data } = useGetTournamentTravel(id);

  /* -------------------- ADD / REMOVE / UPDATE -------------------- */

  const addTransport = () => {
    dispatch(
      addTournamentTravel({
        type: "",
        title: "",
        hotel_address: "",
        hotel_address_map_url: "",
        contact_details: "",
      }),
    );
  };

  const removeTransport = (index: number) => {
    dispatch(removeTournamentTravel(index));
  };

  const updateTransport = (index: number, data: Partial<any>) => {
    dispatch(
      updateTournamentTravelBlock({
        index,
        data,
      }),
    );
  };

  /* -------------------- LOAD FROM API (EDIT MODE) -------------------- */

  useEffect(() => {
    if (data?.data) {
      dispatch(
        setFullTournamentTravel(normalizeTournamentTravelResponse(data.data)),
      );
    }
  }, [data, dispatch]);

  /* -------------------- SUBMIT -------------------- */

  const handleTournamentsSubmit = () => {
    if (!id) return;

    updateTravelMutation.mutate({
      id: String(id),
      payload: transports, // 🔥 DIRECT FROM REDUX
    });
  };

  /* -------------------- UI -------------------- */

  return (
    <div>
      <div
        className={`sticky mb-4 top-0 z-[99] md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Tournament Transport Details Builder"
          onSaveTemplate={() => navigate(paths.tournaments.path)}
          onSaveTemplateTitle="Cancel"
          onSubmit={handleTournamentsSubmit}
          onSubmitLoading={updateTravelMutation.isPending}
          isEditMode={isEditMode}
        />
      </div>
      <div className="container grid grid-cols-12 xl:gap-sp30 lg:gap-sp16 gap-sp9">
        <div className="lg:col-span-12 md:col-span-10 col-span-10">
          <div className="bg-white md:mb-5 mb-3 border-0.5 border-primary rounded-15 md:p-5 p-3">
            {transports.map((transport: any, index: number) => (
              <div
                key={index}
                className="bg-gray-50 border border-primary rounded-15 p-4 mb-4 relative"
              >
                <Button
                  icon={closeIcon}
                  backgroundColor="transperant"
                  type="button"
                  onClick={() => removeTransport(index)}
                  className="absolute top-2 right-2 !py-0"
                />

                <div className="grid grid-cols-2 gap-4 ">
                  {/* TYPE */}
                  <div>
                    <label className="block font-medium text-sm mb-2">
                      Type
                    </label>

                    <div className="relative mb-4">
                      <select
                        value={transport.type}
                        onChange={(e) =>
                          updateTransport(index, {
                            type: e.target.value,
                            title: "",
                            hotel_address: "",
                            hotel_address_map_url: "",
                            contact_details: "",
                          })
                        }
                        className="appearance-none w-full p-2 text-sm focus:outline-none border border-primary rounded-xl text-black"
                      >
                        <option value="">Select Type</option>
                        <option value="Airport">Airport</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Venue">Venue</option>
                        <option value="Train Station">Train Station</option>
                        <option value="Bus Station">Bus Station</option>
                        <option value="Practice Venue">Practice Venue</option>
                      </select>

                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <img src={chevronDown} />
                      </div>
                    </div>
                  </div>

                  {/* TITLE (NON-HOTEL) */}
                  {transport.type && transport.type !== "Hotel" && (
                    <Input
                      label="Title"
                      placeholder="Enter title"
                      value={transport.title || ""}
                      onChange={(e) =>
                        updateTransport(index, {
                          title: e.target.value,
                        })
                      }
                    />
                  )}
                </div>

                {/* HOTEL FIELDS */}
                {transport.type === "Hotel" && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Input
                      label="Hotel Title"
                      placeholder="Enter hotel name"
                      value={transport.title || ""}
                      onChange={(e) =>
                        updateTransport(index, {
                          title: e.target.value,
                        })
                      }
                    />

                    <Input
                      label="Hotel Address"
                      placeholder="Enter address"
                      value={transport.hotel_address || ""}
                      onChange={(e) =>
                        updateTransport(index, {
                          hotel_address: e.target.value,
                        })
                      }
                    />

                    <Input
                      label="Hotel Address Map URL"
                      placeholder="https://maps.google.com/..."
                      value={transport.hotel_address_map_url || ""}
                      onChange={(e) =>
                        updateTransport(index, {
                          hotel_address_map_url: e.target.value,
                        })
                      }
                    />

                    <Input
                      label="Contact Details"
                      placeholder="Phone / Email"
                      value={transport.contact_details || ""}
                      onChange={(e) =>
                        updateTransport(index, {
                          contact_details: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            ))}

            <Button
              icon={plusIcon}
              text="Add Transport"
              className="px-4"
              type="button"
              onClick={addTransport}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

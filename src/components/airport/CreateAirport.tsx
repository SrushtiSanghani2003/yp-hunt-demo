import BuilderHeader from "../ui/builderHeader/BuilderHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAirport,
  setAirportField,
  setFullAirport,
} from "../../redux-toolkit/airportSlice";
import Input from "../ui/input/Input";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAirportById,
  useCreateAirport,
  useUpdateAirport,
} from "../../hooks/useAirport";
import { paths } from "../../config/paths";
import { useEffect } from "react";
import { useScroll } from "../../hooks/ScrollContext";

export default function AirportUpdate() {
  const navigate = useNavigate();
  const { isScrolled } = useScroll();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const dispatch = useDispatch();
  const airport = useSelector(selectAirport);
  const { data: airportById } = useAirportById(id);
  const createShopMutation = useCreateAirport(airport);
  const updateAirportMutation = useUpdateAirport(airport);

  const handleSubmit = () => {
    if (isEditMode && id) {
      updateAirportMutation.mutate(id);
    } else {
      createShopMutation.mutate();
    }
    // updateAirportMutation.mutate(id);
  };

  useEffect(() => {
    if (isEditMode && airportById?.data) {
      dispatch(setFullAirport(airportById.data));
    }
  }, [airportById]);

  return (
    <div>
      <div
        className={`sticky top-0 z-[99] mb-4 md:py-6 py-2 md:px-7 px-3 transition-colors  ${
          isScrolled ? "bg-white  border-b shadow-lg" : "bg-transparent"
        }`}
      >
        <BuilderHeader
          title="Update Airport"
          onSaveTemplate={() => navigate(paths.airport.path)}
          onSaveTemplateTitle="Cancel"
          onSubmit={handleSubmit}
          onSubmitLoading={updateAirportMutation.isPending}
          isEditMode={isEditMode}
        />
      </div>
      <div className="container">
        <div className="bg-white border-0.5 border-primary rounded-15 md:p-5 p-3">
          <div className="grid grid-cols-12 md:gap-4 gap-3">
            <div className="col-span-12 md:col-span-8">
              <Input
                label="Airport Name"
                value={airport.airport_name}
                onChange={(e) =>
                  dispatch(
                    setAirportField({
                      field: "airport_name",
                      value: e.target.value,
                    }),
                  )
                }
              />
            </div>

            <div className="col-span-12 md:col-span-4">
              <Input
                label="Short Code"
                value={airport.short_code}
                onChange={(e) =>
                  dispatch(
                    setAirportField({
                      field: "short_code",
                      value: e.target.value,
                    }),
                  )
                }
              />
            </div>

            <div className="col-span-12 md:col-span-4">
              <Input
                label="City Name"
                value={airport.city_name}
                onChange={(e) =>
                  dispatch(
                    setAirportField({
                      field: "city_name",
                      value: e.target.value,
                    }),
                  )
                }
              />
            </div>

            <div className="col-span-12 md:col-span-4">
              <Input
                label="State Name"
                value={airport.state_name}
                onChange={(e) =>
                  dispatch(
                    setAirportField({
                      field: "state_name",
                      value: e.target.value,
                    }),
                  )
                }
              />
            </div>

            <div className="col-span-12 md:col-span-4">
              <Input
                label="Country Name"
                value={airport.country_name}
                onChange={(e) =>
                  dispatch(
                    setAirportField({
                      field: "country_name",
                      value: e.target.value,
                    }),
                  )
                }
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <Input
                label="Latitude"
                value={airport.latitude}
                onChange={(e) =>
                  dispatch(
                    setAirportField({
                      field: "latitude",
                      value: e.target.value,
                    }),
                  )
                }
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <Input
                label="Longitude"
                value={airport.longitude}
                onChange={(e) =>
                  dispatch(
                    setAirportField({
                      field: "longitude",
                      value: e.target.value,
                    }),
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

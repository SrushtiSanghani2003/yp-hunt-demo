import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../ui/button";
import { closeIcon } from "../../icons";
import Input from "../ui/input/Input";
import { useEffect, useMemo, useState } from "react";
import AsyncSelect from "react-select/async";
import { customStyles } from "../account-settings/CreateCategories";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

type TransportationFilterProps = {
  travelmodule: string;
  show: boolean;
  onClose: () => void;
  onApply: (filters: {
    fromDate: string;
    toDate: string;
    tournamentId: number | null;
  }) => void;
  defaultFromDate?: string;
  defaultToDate?: string;
  defaultTournamentId?: number | null;
};

const TravelFilterModal = ({
  travelmodule,
  show,
  onClose,
  onApply,
  defaultFromDate = "",
  defaultToDate = "",
  defaultTournamentId,
}: TransportationFilterProps) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedTournament, setSelectedTournament] = useState<any | null>(
    null,
  );

  useEffect(() => {
    setFromDate(defaultFromDate);
    setToDate(defaultToDate);
  }, [defaultFromDate, defaultToDate, show]);

  const handleApply = () => {
    onApply({
      fromDate,
      toDate,
      tournamentId: selectedTournament?.value ?? null,
    });
    onClose();
  };

  // tournament
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
  };
  useEffect(() => {
    if (defaultTournamentId && tournamentOptions.length) {
      const found = tournamentOptions.find(
        (t: any) => t.value === defaultTournamentId,
      );
      setSelectedTournament(found || null);
    }
  }, [defaultTournamentId, tournamentOptions]);
  return (
    <Dialog
      open={show}
      onClose={onClose}
      className="fixed inset-0 z-[500] flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/55" aria-hidden="true" />

      <DialogPanel className="max-w-xl relative z-10 bg-white rounded-2xl p-6 w-full border border-primary shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <DialogTitle className="text-2xl font-extrabold">
            Filter {travelmodule}
          </DialogTitle>

          <Button
            icon={closeIcon}
            backgroundColor="transparent"
            className="p-0"
            onClick={onClose}
          />
        </div>

        {/* ================= DATE FILTER BLOCK ================= */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-5">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">
            Date Range
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="From Date"
              type="date"
              inputCss="!pr-2"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />

            <Input
              label="To Date"
              type="date"
              inputCss="!pr-2"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>

        {/* ================= TOURNAMENT FILTER BLOCK ================= */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Tournament
          </h3>

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

        {/* ================= ACTION BUTTONS ================= */}
        <div className="mt-6 flex justify-end gap-4">
          <Button
            text="Reset"
            onClick={() => {
              setFromDate("");
              setToDate("");
              setSelectedTournament(null);
            }}
            backgroundColor="transparent"
            className="border-primary border-0.5 px-6 py-2"
          />

          <Button text="Apply" onClick={handleApply} className="px-6" />
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default TravelFilterModal;

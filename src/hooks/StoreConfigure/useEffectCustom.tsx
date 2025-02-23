import { useEffect } from "react";
import { SelectOption } from "../../models/SelectOptions";

export const useEffectCustom = (
  openingWeekDaySelect: SelectOption[],
  selectedTimesSelect: SelectOption[],
  setOpeningWeekDay: React.Dispatch<React.SetStateAction<string[]>>,
  generateTimeOptions: () => SelectOption[],
  setOptionsTime: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  setSelectedTimes: React.Dispatch<React.SetStateAction<string[]>>
) => {
  useEffect(() => {
    if (openingWeekDaySelect.length > 0) {
      setOpeningWeekDay(openingWeekDaySelect.map((item) => item.label));
    }
  }, [openingWeekDaySelect, setOpeningWeekDay]);

  useEffect(() => {
    const times = generateTimeOptions();
    setOptionsTime(times);
  }, [generateTimeOptions, setOptionsTime]);

  useEffect(() => {
    if (selectedTimesSelect.length > 0) {
      setSelectedTimes(selectedTimesSelect.map((item) => item.label));
    }
  }, [selectedTimesSelect, setSelectedTimes]);
  return {};
};

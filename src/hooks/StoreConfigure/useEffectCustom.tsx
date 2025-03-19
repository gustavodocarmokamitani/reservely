import { useEffect, useCallback } from "react";
import { SelectOption } from "../../models/SelectOptions";

export const useEffectCustom = (
  openingWeekDaySelect: SelectOption[],
  selectedTimesSelect: SelectOption[],
  setOpeningWeekDay: React.Dispatch<React.SetStateAction<string[]>>,
  generateTimeOptions: () => SelectOption[],
  setOptionsTime: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  setSelectedTimes: React.Dispatch<React.SetStateAction<string[]>>
) => {

  const memoizedGenerateTimeOptions = useCallback(generateTimeOptions, []);

  useEffect(() => {
    if (openingWeekDaySelect.length > 0) {
      setOpeningWeekDay((prev) => {
        const newWeekDays = openingWeekDaySelect.map((item) => item.label);
        if (JSON.stringify(prev) !== JSON.stringify(newWeekDays)) {
          return newWeekDays;
        }
        return prev;
      });
    }
  }, [openingWeekDaySelect, setOpeningWeekDay]);

  useEffect(() => {
    const times = memoizedGenerateTimeOptions();
    setOptionsTime((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(times)) {
        return times;
      }
      return prev;
    });
  }, [memoizedGenerateTimeOptions, setOptionsTime]);

  useEffect(() => {
    if (selectedTimesSelect.length > 0) {
      setSelectedTimes((prev) => {
        const newTimes = selectedTimesSelect.map((item) => item.label);
        if (JSON.stringify(prev) !== JSON.stringify(newTimes)) {
          return newTimes;
        }
        return prev;
      });
    }
  }, [selectedTimesSelect, setSelectedTimes]);

  return {};
};

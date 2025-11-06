import { useSnackbar } from "notistack";
import { Store } from "../../models/Store";
import { updateStore } from "../../services/StoreServices";
import { useNavigate } from "react-router-dom";

export const useAction = (
  store: Store | null,
  selectedTimes: string[],
  closingDates: Date[] | null,
  setClosingDates: React.Dispatch<React.SetStateAction<Date[] | null>>,
  openingWeekDay: string[],
  setOpeningWeekDay: React.Dispatch<React.SetStateAction<string[]>>,
  formValuesStore: {
    name: string;
    storeCode: string;
    active: boolean;
    multipleAppointments: boolean;
  },
  setFormValuesStore: React.Dispatch<
    React.SetStateAction<{
      name: string;
      storeCode: string;
      active: boolean;
      multipleAppointments: boolean;
    }>
  >,
  setStatusStore: React.Dispatch<React.SetStateAction<boolean>>,
  setMultipleAppointments: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const isValidStoreCode = (storeCode: string) => {
    const regex = /#\d{3}$/;
    return regex.test(storeCode || "");
  };

  const handleSubmit = async () => {
    if (!store) return;

    if (!isValidStoreCode(formValuesStore.storeCode)) {
      enqueueSnackbar(
        `O Código da Loja ("${formValuesStore.storeCode}") é inválido. Ele deve terminar com o padrão #001 (Ex: ${formValuesStore.storeCode}#001).`,
        { variant: "error", autoHideDuration: 6000 }
      );
      return;
    };

    setIsLoading(true);
    const storeMapped: Store = {
      ...store,
      name: formValuesStore.name,
      storeCode: formValuesStore.storeCode,
      status: formValuesStore.active,
      multipleAppointments: formValuesStore.multipleAppointments,
      operatingHours: selectedTimes.join(" - "),
      closingDays: closingDates
        ? closingDates
            .filter((data) => data instanceof Date && !isNaN(data.getTime()))
            .map((data) => data.toISOString())
        : [],
      operatingDays: openingWeekDay.map((option) => option),
    };

    try {
      await updateStore(storeMapped.id, storeMapped);
      enqueueSnackbar(`Store editado com sucesso!`, { variant: "success" });

      navigate("/store");
    } catch (error) {
      enqueueSnackbar(`Falha ao editar store com ID ${storeMapped.id}`, {
        variant: "error",
      });
    }
    setIsLoading(false);
  };

  const handleInputChangeStore = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, type, checked, value } = event.target;

    setFormValuesStore((prev) => {
      const updatedValues = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      setStatusStore(updatedValues.active);
      setMultipleAppointments(updatedValues.multipleAppointments);
      return updatedValues;
    });
  };

  const handleSetDatesFromPicker = (newDates: Date[]) => {
    setClosingDates((prevDates) => {
      const safePrev = prevDates ?? [];

      const allDates = [...safePrev, ...newDates];

      const uniqueDates = allDates.filter(
        (date, index, self) =>
          index === self.findIndex((d) => d.getTime() === date.getTime())
      );

      return uniqueDates;
    });
  };

  const handleRemoveDataClosed = (dateToRemove: Date) => {
    setClosingDates((closingDates) => {
      if (closingDates) {
        return closingDates.filter(
          (data) => data.getTime() !== dateToRemove.getTime()
        );
      } else {
        return [];
      }
    });
  };

  const handleRemoveDateClosed = (dayToRemove: string) => {
    setOpeningWeekDay((prevDays) =>
      prevDays.filter((day) => day !== dayToRemove)
    );
  };

  const handleButtonClick = () => {
    navigate("/store");
  };

  return {
    handleSubmit,
    handleInputChangeStore,
    handleSetDatesFromPicker,
    handleRemoveDataClosed,
    handleRemoveDateClosed,
    handleButtonClick,
  };
};

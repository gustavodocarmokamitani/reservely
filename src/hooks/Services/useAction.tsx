import { useSnackbar } from "notistack";
import { Service, ServiceServiceType } from "../../models/Service";
import {
  createServiceTypeByStoreId,
  deleteServiceType,
  getServiceTypeById,
  updateServiceType,
} from "../../services/ServiceTypeServices";
import { SelectOption } from "../../models/SelectOptions";
import { ServiceType } from "../../models/ServiceType";

export const useAction = (
  storeUser: number,
  fetchData: () => void,
  handleClose: () => void,
  formValuesService: Service,
  durationMinutes: SelectOption[],
  setFormValuesService: React.Dispatch<React.SetStateAction<Service>>,
  selectedServiceIds: number[],
  setSelectedServiceIds: React.Dispatch<React.SetStateAction<number[]>>,
  rows: ServiceType[],
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitAddService = async () => {
    setIsLoading(true);
    try {
      const newService = {
        id: 0,
        name: formValuesService.name,
        value: formValuesService.value,
        description: formValuesService.description,
        durationMinutes: String(durationMinutes[0].value),
        active: formValuesService.active,
        storeId: formValuesService.storeId,
      };

      if (!validateFormValues(newService)) {
        return;
      }

      const typeService: ServiceServiceType[] = [
        {
          id: formValuesService.id,
          name: formValuesService.name,
          description: formValuesService.description,
          value: parseFloat(formValuesService.value as string),
          active: formValuesService.active === "true",
          durationMinutes: durationMinutes[0].value,
          services: [
            {
              id: formValuesService.id,
              serviceTypeId: formValuesService.id,
              storeId: storeUser,
            },
          ],
        },
      ];

      const responsePost = await createServiceTypeByStoreId(
        storeUser,
        typeService
      );

      if (responsePost) {
        enqueueSnackbar("Serviço criado com sucesso!", { variant: "success" });
        fetchData();
      }
    } catch (error) {
      console.error("Erro durante o request:", error);
      enqueueSnackbar("Erro inesperado! Verifique os dados.", {
        variant: "error",
      });
    }
    setIsLoading(false);            
    handleClose();
  };

  const handleSubmitEditService = async () => {
    setIsLoading(true);
    try {
      const responseServiceType = await getServiceTypeById(
        formValuesService.id
      );

      if (responseServiceType && responseServiceType.data) {
        const responseServiceTypeData = responseServiceType.data;
        console.log(12312313132);

        const typeService: ServiceServiceType = {
          id: formValuesService.id,
          name: formValuesService.name,
          description: formValuesService.description,
          value: parseFloat(formValuesService.value as string),
          active: formValuesService.active === "true",
          durationMinutes: durationMinutes[0].value,
          services: responseServiceTypeData.services
            ? responseServiceTypeData.services
            : null,
        };
        console.log(typeService);

        const responseUpdate = await updateServiceType(
          formValuesService.id,
          typeService
        );
        if (responseUpdate) {
          enqueueSnackbar("Serviço criado com sucesso!", {
            variant: "success",
          });
          fetchData();
        }
      } else {
        enqueueSnackbar("Erro ao buscar tipo de serviço.", {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Erro durante o request:", error);
      enqueueSnackbar("Erro inesperado! Verifique os dados.", {
        variant: "error",
      });
    }
    setIsLoading(false);
    handleClose();
  };

  const handleInputChangeService = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, type, checked, value } = event.target;
    setFormValuesService((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "true" : "false") : value,
    }));
  };

  const validateFormValues = (formValues: Service): boolean => {
    const fieldValidations = [
      { field: "name", message: "O campo 'Nome' é obrigatório." },
      { field: "value", message: "O campo 'Valor' é obrigatório." },
      {
        field: "durationMinutes",
        message: "O campo 'Duração (minutos)' é obrigatório.",
      },
      { field: "description", message: "O campo 'Descrição' é obrigatório." },
    ];

    for (const { field, message } of fieldValidations) {
      if (!formValues[field as keyof Service]) {
        enqueueSnackbar(message, { variant: "error" });
        return false;
      }
    }

    return true;
  };

  const handleDeleteServices = async () => {
    setIsLoading(true);
    if (selectedServiceIds.length > 0) {
      try {
        await Promise.all(
          selectedServiceIds.map(async (serviceId) => {
            try {
              const servico = rows.find((s: ServiceType) => s.id === serviceId);

              if (servico) {
                await deleteServiceType(serviceId);
                enqueueSnackbar(
                  `Serviço ${servico.name} excluído com sucesso!`,
                  { variant: "success" }
                );
              } else {
                enqueueSnackbar(
                  `Nenhum serviço encontrado para o ID ${serviceId}`,
                  { variant: "error" }
                );
              }
            } catch (error) {
              console.error(`Erro ao remover o serviço ${serviceId}:`, error);
              enqueueSnackbar(`Erro ao remover o serviço ${serviceId}`, {
                variant: "error",
              });
            }
          })
        );

        setSelectedServiceIds([]);
      } catch (error) {
        console.error("Erro ao remover os serviços:", error);
        enqueueSnackbar("Erro inesperado ao remover os serviços.", {
          variant: "error",
        });
      }
      fetchData();
    } else {
      enqueueSnackbar(`Nenhum serviço selecionado`, { variant: "error" });
    }
    setIsLoading(false);
  };

  const handleRowSelect = (ids: number[]) => {
    setSelectedServiceIds(ids);
  };

  return {
    handleSubmitAddService,
    handleSubmitEditService,
    handleInputChangeService,
    validateFormValues,
    handleDeleteServices,
    handleRowSelect
  };
};

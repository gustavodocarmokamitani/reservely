// ServiceSelect.tsx
import React, { useEffect, useState } from "react";
import { SelectOption } from "../../models/SelectOptions";
import { ServiceType } from "../../models/ServiceType";
import { getEmployeeIdByUserId } from "../../services/EmployeeServices";
import { getServiceTypes, getServiceTypeById } from "../../services/ServiceTypeServices";
import customStyles from "./styles/customStyles";
import Select from "react-select";

interface ServiceSelectProps {
  setService: (option: SelectOption[] | null) => void;
  value?: number[] | undefined;
  selectedEmployee: SelectOption | null;
}

const ServiceSelect: React.FC<ServiceSelectProps> = ({ setService, value, selectedEmployee}) => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  
  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await getServiceTypes();
  
        if (response && response.data) {
          const serviceTypesActives = response.data.filter((serviceType: ServiceType) => serviceType.active === true);
  
          if (selectedEmployee) {
            try {
              const responseEmployee = await getEmployeeIdByUserId(selectedEmployee.value);
  
              if (responseEmployee && responseEmployee.servicosId) {
                const responseServiceNames = await Promise.all(
                  responseEmployee.servicosId.map(async (item: any) => {
                    try {
                      const resp = await getServiceTypeById(item);
                      return resp && resp.data ? resp.data : null;
                    } catch (error) {
                      console.error("Erro ao buscar serviço específico:", error);
                      return null;
                    }
                  })
                );
  
                const formattedOptions2 = responseServiceNames.filter(Boolean).map((item: any) => ({
                  value: item.id,
                  label: item.name
                }));
  
                setOptions(formattedOptions2);
              } else {
                const formattedOptions = serviceTypesActives.map((item: any) => ({
                  value: item.id,
                  label: item.name
                }));
  
                formattedOptions.unshift({ value: 0, label: "Selecione..." });
                setOptions(formattedOptions);
              }
            } catch (error) {
              console.error("Erro ao buscar serviços do funcionário:", error);
  
              const formattedOptions = serviceTypesActives.map((item: any) => ({
                value: item.id,
                label: item.name
              }));
  
              formattedOptions.unshift({ value: 0, label: "Selecione..." });
              setOptions(formattedOptions);
            }
          } else {
            const formattedOptions = serviceTypesActives.map((item: any) => ({
              value: item.id,
              label: item.name
            }));
  
            formattedOptions.unshift({ value: 0, label: "Selecione..." });
            setOptions(formattedOptions);
          }
        } else {
          console.error("Erro ao buscar todos os serviços: resposta inválida.");
        }
      } catch (error) {
        console.error("Erro ao buscar todos os serviços:", error);
      }
    };
  
    fetchServicos();
  }, [selectedEmployee]);
  
  
  
  const handleChange = (selectedOptions: any) => {
    const filteredOptions = selectedOptions?.filter((option: SelectOption) => option.value !== 0) || [];
    setService(filteredOptions.length > 0 ? filteredOptions : null);
  };

  return (
    <Select
      options={options}
      isMulti
      placeholder="Selecione um serviço"
      onChange={handleChange}
      styles={customStyles}
      value={options.filter(opt => value?.includes(opt.value))}
    />
  );
};

export default ServiceSelect;

import React, { useState, useEffect, useRef } from "react";
import * as S from "./Selected.styles";
import { getServiceTypeById, getServiceTypes } from '../services/ServiceTypeServices';
import { getEmployeeIdByUserId } from "../services/EmployeeServices";
import { getServices } from "../services/ServiceServices";

interface ServiceProps {
  id: number;
  name: string;
  description?: string;
  value?: string;
  durationMinutes?: number;
}

interface SelectedProps {
  onChange?: (selectedServices: number[]) => void;
  professionalServices?: number[];
  options?: {
    id: number;
    userId: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    active: string;
    serviceIds: number[];
  }[];
  userId?: number;
  infoProf?: boolean;
  addProf?: boolean;
  edit?: boolean;
  infoAppointmentService?: boolean;
}

const Selected: React.FC<SelectedProps> = ({
  onChange,
  professionalServices = [],
  options,
  userId,
  infoProf = false,
  addProf = false,
  edit = false,
  infoAppointmentService = false
}) => {
  const [selectedServices, setSelectedServices] = useState<number[]>(professionalServices);
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [dataOptions, setDataOptions] = useState<number[]>([]);

  useEffect(() => {
    if (edit && options) {
      setDataOptions(options[0]?.serviceIds || []);
    }
  }, [edit, options]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        let fetchedServices: ServiceProps[] = [];
        let initialSelected: number[] = [];

        if (edit) {
          const allServices = await getServiceTypes();

          fetchedServices = [...fetchedServices, ...allServices.data];

          const existingServiceIds = dataOptions;
          initialSelected = existingServiceIds;
        } else if (infoProf) {
          const userIdAlt = userId;

          if (userIdAlt) {
            const data = await getEmployeeIdByUserId(userIdAlt);
            
            if (data?.serviceIds?.length) {
              const serviceRequests = data.serviceIds.map((serviceId: number) =>
                getServiceTypeById(serviceId)
              );
              
              const serviceResponses = await Promise.all(serviceRequests);
              fetchedServices = serviceResponses.map((response) => {

                return response.data;
              });
            }
          }
        } else if (infoAppointmentService) {
          const userIdArray = userId;
          if (userIdArray && Array.isArray(userIdArray)) {
            try {
              const serviceRequests = userIdArray.map((id) => getServiceTypeById(id));

              const serviceResponses = await Promise.all(serviceRequests);

              fetchedServices = serviceResponses.map((response) => response?.data);

            } catch (error) {
              console.error("Error fetching services:", error);
            }
          }
        }

        if (addProf) {
          const serviceData = await getServices();

          if (serviceData) {
            //TODO: Change ( === 1 ) for the logged store ID    
            const filteredData = serviceData.filter((servico: any) => servico.storeId === 1);
            
            const serviceTypePromises = filteredData.map(async (servico: any) => {
              try {
                const serviceTypeData = await getServiceTypeById(servico.serviceTypeId);
                
                return serviceTypeData?.data || [];
              } catch (error) {
                console.error(`Error when searching for the type of service for the id ${servico.serviceTypeId}:`, error);
                return [];
              }
            });

            const serviceTypeData = await Promise.all(serviceTypePromises);
            fetchedServices = [...fetchedServices, ...serviceTypeData.flat()];
          }
        }

        const uniqueServices = Array.from(
          new Map(fetchedServices.map((service) => [service.id, service])).values()
        );
        setServices(uniqueServices);

        if (edit || infoProf) {
          setSelectedServices(initialSelected);
        }
      } catch (error) {
        console.error("Error when searching for employee and service information:", error);
      }
    };

    if (infoProf || addProf || edit || infoAppointmentService) {
      fetchEmployee();
    }
  }, [infoProf, addProf, edit, userId, infoAppointmentService, dataOptions]);

  const toggleService = (id: number) => {
    setSelectedServices((prev) => {
      const newSelectedServices = prev.includes(id)
        ? prev.filter((serviceId) => serviceId !== id)
        : [...prev, id];

      if (onChange) {
        onChange(newSelectedServices);
      }
      return newSelectedServices;
    });
  };

  return (
    <S.SelectedWrap>
      {services.length > 0 ? (
        services.map((service) => (
          <S.SelectedContent
            key={service.id}
            onClick={() => toggleService(service.id)}
            style={{
              background: selectedServices.includes(service.id) ? "#B6B6B6" : "white",
            }}
          >
            <p>{service.name}</p>
          </S.SelectedContent>
        ))
      ) : (
        <p style={{ marginLeft: '15px' }}>
          Funcionário não possui serviços disponíveis.
        </p>
      )}
    </S.SelectedWrap>
  );
};

export default Selected;

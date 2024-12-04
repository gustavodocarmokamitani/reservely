import React, { useState, useEffect, useRef } from "react";
import * as S from "./Selected.styles";
import api from "../axiosInstance";
import { Funcionario } from '../models/Funcionario';
import { Servico } from '../models/Servico';
import { getTipoServicoById, getTipoServicos } from '../services/TipoServicoService';
import { getFuncionarioIdByUsuarioId } from "../services/FuncionarioServices";

interface ServiceProps {
  id: number;
  nome: string;
  descricao?: string;
  valor?: string;
  duracaoMinutos?: number;
}

interface SelectedProps {
  onChange?: (selectedServices: number[]) => void;
  profissionalServices?: number[];
  options?: {
    id: number;
    usuarioId: number;
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    ativo: string;
    servicosId: number[];
  }[];
  usuarioId?: number;
  infoProf?: boolean;
  addProf?: boolean;
  edit?: boolean;
}

const Selected: React.FC<SelectedProps> = ({
  onChange,
  profissionalServices = [],
  options,
  usuarioId,
  infoProf = false,
  addProf = false,
  edit = false
}) => {
  const [selectedServices, setSelectedServices] = useState<number[]>(profissionalServices);
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [dataOptions, setDataOptions] = useState<number[]>([]);

  // Atualiza dataOptions somente quando options mudar
  useEffect(() => {
    if (edit && options) {
      setDataOptions(options[0]?.servicosId || []);
    }
  }, [edit, options]);


  useEffect(() => {
    const fetchFuncionario = async () => {
      try {
        let fetchedServices: ServiceProps[] = [];
        let initialSelected: number[] = [];

        if (edit) {
          // Buscar todos os serviços
          const allServices = await getTipoServicos();
          fetchedServices = [...fetchedServices, ...allServices]; 

          // Obter IDs dos serviços já associados no `options`
          const existingServiceIds = dataOptions;
          initialSelected = existingServiceIds;
        } else if (infoProf) {
          const userId = usuarioId;

          if (userId) {
            const data = await  getFuncionarioIdByUsuarioId(userId);
            if (data?.servicosId?.length) {
              const serviceRequests = data.servicosId.map((serviceId: number) =>
                getTipoServicoById(serviceId)
              );
              const serviceResponses = await Promise.all(serviceRequests);
              fetchedServices = serviceResponses.map((response) => {

                return response.data;
              });
            }
          }
        }

        if (addProf) {
          const data  = await getTipoServicos();
          fetchedServices = [...fetchedServices, ...data];
        }

        // Remover duplicatas
        const uniqueServices = Array.from(
          new Map(fetchedServices.map((service) => [service.id, service])).values()
        );

        setServices(uniqueServices);

        // Definir os serviços já selecionados somente na inicialização
        if (edit || infoProf) {
          setSelectedServices(initialSelected);
        }
      } catch (error) {
        console.error("Erro ao buscar informações do funcionário e serviços:", error);
      }
    };

    if (infoProf || addProf || edit) {
      fetchFuncionario();
    }
  }, [infoProf, addProf, edit, usuarioId, dataOptions]);

  const toggleService = (id: number) => {
    setSelectedServices((prev) => {
      const newSelectedServices = prev.includes(id)
        ? prev.filter((serviceId) => serviceId !== id)
        : [...prev, id];

      // Notifica o pai sobre a mudança
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
            <p>{service.nome}</p>
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

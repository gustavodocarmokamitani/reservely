import React, { useState, useEffect } from "react";
import * as S from "./Selected.styles";
import api from "../axiosInstance";
import { Funcionario } from '../models/Funcionario';
import { Servico } from '../models/Servico';

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
  options?: ServiceProps[]; // Corrigido para usar ServiceProps[]
  usuarioId?: number;
  infoProf?: boolean;
  addProf?: boolean;
}

const Selected: React.FC<SelectedProps> = ({
  onChange,
  profissionalServices = [],
  options = [],
  usuarioId,
  infoProf,
  addProf,
}) => {
  const [selectedServices, setSelectedServices] = useState<number[]>(profissionalServices);
  const [services, setServices] = useState<ServiceProps[]>([]);

  useEffect(() => {
    if (addProf && options) {
      setServices(options);
    }
  }, [addProf, options]);

  useEffect(() => {
    const fetchFuncionario = async () => {
      if (infoProf && usuarioId) {
        try {
          const { data } = await api.get<Funcionario>(`Funcionario/usuario/${usuarioId}`);
          
          if (data?.servicosId?.length) {
            const serviceRequests = data.servicosId.map((serviceId) =>
              api.get<Servico>(`TipoServico/${serviceId}`)
            );
            const serviceResponses = await Promise.all(serviceRequests);
            const servicesData = serviceResponses.map((response) => response.data);
            setServices(servicesData);
          } else {
            console.error("Funcionário não tem serviços associados.");
          }
        } catch (error) {
          console.error("Erro ao buscar informações do funcionário e serviços:", error);
        }
      }
    };

    fetchFuncionario();
  }, [infoProf, usuarioId]);

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
            <p>{service.nome}</p>
          </S.SelectedContent>
        ))
      ) : (
        <p>Não há serviços disponíveis.</p>
      )}
    </S.SelectedWrap>
  );
};

export default Selected;

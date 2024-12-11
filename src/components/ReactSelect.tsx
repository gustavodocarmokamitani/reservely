import React, { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./ReactSelect.styles";
import { Col, Row } from "react-bootstrap";
import { getTipoUsuarioIdById } from "../services/UsuarioServices";
import { getTipoServico } from "../services/TipoServicoServices";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Agendamento } from "../models/Agendamento";

interface ReactSelectProps {
  width: string;
  semana?: boolean;
  horario?: boolean;
  diasFechados?: boolean;
  pagamento?: boolean;
  funcionario?: boolean;
  cliente?: boolean;
  dataAgendamento?: boolean;
  servico?: boolean;
}

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    minWidth: "350px",
    minHeight: "40px",
    padding: "5px 25px",
    fontSize: "14px",
    border: "1px solid rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",
    boxShadow: "4px 4px 15px 0px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
    "&:hover": {
      borderColor: "#888",
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#007bff" : "#fff",
    color: state.isSelected ? "#fff" : "#333",
    "&:hover": {
      backgroundColor: "#e0e0e0",
      color: "#333",
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    borderRadius: "15px",
    padding: "0 5px",
    backgroundColor: "#616060",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#fff",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "#fff",
    "&:hover": {
      borderRadius: "15px",
      backgroundColor: "#616060",
      color: "#fff",
    },
  }),
};

const ReactSelect: React.FC<ReactSelectProps> = ({
  width,
  semana,
  horario,
  diasFechados,
  pagamento,
  funcionario,
  dataAgendamento,
  cliente,
  servico
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [optionsData, setOptionsData] = useState([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState<{ value: string; label: string } | null>(null);
  const [selectedCliente, setSelectedCliente] = useState<{ value: string; label: string } | null>(null);
  const [selectedServicos, setSelectedServicos] = useState<{ value: string; label: string }[]>([]);
  const [selectedDataAgendamento, setSelectedDataAgendamento] = useState<Date | null>(null);
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);

  const { setAgendamentoUpdateContext } = useContext(AppContext)!;

  const horarios = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ];

  const handleSelectChangeHorario = (selected: any) => {
    setSelectedHorario(selected?.value);
  };

  const handleSelectChangeFuncionario = (selected: any) => {
    setSelectedFuncionario(selected);
  };

  const handleSelectChangeCliente = (selected: any) => {
    setSelectedCliente(selected);
  };

  const handleSelectChangeServico = (selected: any) => {
    const updatedServicos = selected ? selected.map((item: any) => item.value) : [];
    setSelectedServicos(updatedServicos);
  };

  const handleSelectChangeDataAgendamento = (date: Date | null) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        let optionsFetched = [];
  
        if (funcionario) {
          const response = await getTipoUsuarioIdById(2);
          optionsFetched = response.map((item: any) => ({
            value: item.id,
            label: item.nome,
          }));
        } else if (cliente) {
          const response = await getTipoUsuarioIdById(3);
          optionsFetched = response.map((item: any) => ({
            value: item.id,
            label: item.nome,
          }));
        } else if (servico) {
          const response = await getTipoServico();
          optionsFetched = response.data.map((item: any) => ({
            value: item.id,
            label: item.nome,
          }));
        }
  
        setOptionsData(optionsFetched); 
      } catch (err) {
        console.error('Erro ao buscar os dados:', err);
      }
    };
  
    fetchOptions();
  }, [funcionario, cliente, servico]);
  

  useEffect(() => {
    if (selectedDate && selectedHorario && selectedCliente && selectedFuncionario) {
      console.log(2);
      const dataAgendamento = new Date(selectedDate);
      const [horarioHoras, horarioMinutos] = selectedHorario.split(":");
      dataAgendamento.setHours(parseInt(horarioHoras), parseInt(horarioMinutos));
  
      const agendamento: Agendamento = {
        id: 0,
        clienteId: parseInt(selectedCliente.value),
        funcionarioId: parseInt(selectedFuncionario.value),
        dataAgendamento: dataAgendamento,
        statusAgendamentoId: 1,
        servicosId: [],
        lojaId: 1
      };
  
      setAgendamentoUpdateContext(agendamento);
      console.log("Agendamento Context Atualizado:", agendamento);
    }
  }, [selectedDate, selectedHorario, selectedCliente, selectedFuncionario]);
  
  return (
    <div style={{ width: `${width}` }}>
      {diasFechados ? (
        <Row>
          <Col>
            <S.StyledDatePicker style={{ width: "35rem" }}>
              <DatePicker
                selected={null}
                onChange={(date) => handleSelectChangeDataAgendamento(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecione uma data..."
                className="custom-datepicker"
                inline
                filterDate={(date) => date > new Date()}
              />
              <div style={{ marginLeft: "40px", width: "250px" }}>
                {selectedDate && (
                  <S.TextList>
                    {selectedDate.toLocaleDateString("pt-BR", { day: '2-digit', month: 'short', year: "2-digit" }).replace('.', '')}
                  </S.TextList>
                )}
              </div>
            </S.StyledDatePicker>
          </Col>
        </Row>
      ) : dataAgendamento ? (
        <S.StyledDatePicker style={{ width: "25rem" }}>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => handleSelectChangeDataAgendamento(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Selecione a data de agendamento..."
            minDate={new Date()}
            className="custom-datepicker"
            inline
          />
        </S.StyledDatePicker>
      ) : (
        funcionario ? (
          <Select
            options={optionsData}
            onChange={handleSelectChangeFuncionario}
            placeholder="Selecione um funcionário"
            styles={customStyles}
          />
        ) : cliente ? (
          <Select
            options={optionsData}
            onChange={handleSelectChangeCliente}
            placeholder="Selecione um cliente"
            styles={customStyles}
          />
        ) : (
          servico ? (
            <Select
              options={optionsData}
              isMulti
              placeholder="Selecione um serviço"
              onChange={handleSelectChangeServico}
              styles={customStyles}
            />
          ) : (
            horario && (
              <Select
                options={horarios.map((horario) => ({
                  value: horario,
                  label: horario,
                }))}
                onChange={handleSelectChangeHorario}
                placeholder="Selecione um horário"
                styles={customStyles}
              />
            )
          )))}
    </div>
  );
};

export default ReactSelect;

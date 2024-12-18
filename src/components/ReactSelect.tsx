import React, { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./ReactSelect.styles";
import { Col, Row } from "react-bootstrap";
import { getUserTypeIdById } from "../services/UserServices";
import { getServiceTypes } from "../services/ServiceTypeServices";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Appointment } from "../models/Appointment";

interface ReactSelectProps {
  width: string;
  semana?: boolean;
  time?: boolean;
  closedDays?: boolean;
  pagamento?: boolean;
  employee?: boolean;
  client?: boolean;
  appointmentDate?: boolean;
  service?: boolean;
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
  time,
  closedDays,
  pagamento,
  employee,
  appointmentDate,
  client,
  service
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [optionsData, setOptionsData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState<{ value: string; label: string } | null>(null);
  const [selectedClient, setSelectedClient] = useState<{ value: string; label: string } | null>(null);
  const [selectedServices, setSelectedServices] = useState<{ value: string; label: string }[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const { setAppointmentUpdateContext } = useContext(AppContext)!;

  const times = [
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

  const handleSelectChangeTime = (selected: any) => {
    setSelectedTime(selected?.value);
  };

  const handleSelectChangeEmployee = (selected: any) => {
    setSelectedEmployee(selected);
  };

  const handleSelectChangeClient = (selected: any) => {
    setSelectedClient(selected);
  };

  const handleSelectChangeService = (selected: any) => {
    const updatedServices = selected ? selected.map((item: any) => item.value) : [];
    setSelectedServices(updatedServices);
  };

  const handleSelectChangeAppointmentDate = (date: Date | null) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        let optionsFetched = [];
  
        if (employee) {
          const response = await getUserTypeIdById(2);
          optionsFetched = response.map((item: any) => ({
            value: item.id,
            label: item.name,
          }));
        } else if (client) {
          const response = await getUserTypeIdById(3);
          optionsFetched = response.map((item: any) => ({
            value: item.id,
            label: item.name,
          }));
        } else if (service) {
          const response = await getServiceTypes();
          optionsFetched = response.data.map((item: any) => ({
            value: item.id,
            label: item.name,
          }));
        }
  
        setOptionsData(optionsFetched); 
      } catch (err) {
        console.error('Erro ao buscar os dados:', err);
      }
    };
  
    fetchOptions();
  }, [employee, client, service]);
  

  useEffect(() => {
    if (selectedDate && selectedTime && selectedClient && selectedEmployee) {
      console.log(2);
      const appointmentDate = new Date(selectedDate);
      const [timeHours, timeMinute] = selectedTime.split(":");
      appointmentDate.setHours(parseInt(timeHours), parseInt(timeMinute));
  
      const appointment: Appointment = {
        id: 0,
        clientId: parseInt(selectedClient.value),
        employeeId: parseInt(selectedEmployee.value),
        appointmentDate: appointmentDate,
        appointmentStatusId: 1,
        servicesId: [],
        storeId: 1
      };
  
      setAppointmentUpdateContext(appointment);
      console.log("Appointment Context Atualizado:", appointment);
    }
  }, [selectedDate, selectedTime, selectedClient, selectedEmployee]);
  
  return (
    <div style={{ width: `${width}` }}>
      {closedDays ? (
        <Row>
          <Col>
            <S.StyledDatePicker style={{ width: "35rem" }}>
              <DatePicker
                selected={null}
                onChange={(date) => handleSelectChangeAppointmentDate(date)}
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
      ) : appointmentDate ? (
        <S.StyledDatePicker style={{ width: "25rem" }}>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => handleSelectChangeAppointmentDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Selecione a data de appointment..."
            minDate={new Date()}
            className="custom-datepicker"
            inline
          />
        </S.StyledDatePicker>
      ) : (
        employee ? (
          <Select
            options={optionsData}
            onChange={handleSelectChangeEmployee}
            placeholder="Selecione um funcionário"
            styles={customStyles}
          />
        ) : client ? (
          <Select
            options={optionsData}
            onChange={handleSelectChangeClient}
            placeholder="Selecione um client"
            styles={customStyles}
          />
        ) : (
          service ? (
            <Select
              options={optionsData}
              isMulti
              placeholder="Selecione um serviço"
              onChange={handleSelectChangeService}
              styles={customStyles}
            />
          ) : (
            time && (
              <Select
                options={times.map((time) => ({
                  value: time,
                  label: time,
                }))}
                onChange={handleSelectChangeTime}
                placeholder="Selecione um horário"
                styles={customStyles}
              />
            )
          )))}
    </div>
  );
};

export default ReactSelect;

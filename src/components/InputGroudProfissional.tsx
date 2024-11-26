import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Input from "./Input";
import Selected from "./Selected";
import api from "../axiosInstance";  // Corrigido para importar a instância api

interface InputGroudProfissionalProps {
  title: string;
  subTitle: string;
  handleShow: () => void;
  handleClose: () => void;
  formValuesProfissional: {
    nome: string;
    sobrenome: string;
    telefone: string;
    ativo: string;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroudProfissional: React.FC<InputGroudProfissionalProps> = ({
  title,
  subTitle,
  handleClose,
  handleShow,
  handleInputChange,
  formValuesProfissional,
}) => {
  const [tiposServico, setTiposServico] = useState<any[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  useEffect(() => {
    const fetchTiposServico = async () => {
      try {
        const response = await api.get("http://localhost:5096/api/TipoServico"); 
        setTiposServico(response.data);
      } catch (error) {
        console.error("Erro ao carregar os tipos de serviço:", error);
      }
    };
    fetchTiposServico();
  }, []);

  // Atualiza os serviços selecionados
  const handleServiceSelection = (selectedServices: number[]) => {
    setSelectedServices(selectedServices);
  };

  return (
    <>
      <Row>
        <Col md={4} className="mt-3 mb-3">
          <div style={{ marginBottom: "20px" }}>
            <Input
              width="300"
              type="text"
              placeholder="Nome"
              name="nome"
              value={formValuesProfissional.nome}
              onChange={handleInputChange}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Input
              width="300"
              type="text"
              placeholder="Sobrenome"
              name="sobrenome"
              value={formValuesProfissional.sobrenome}
              onChange={handleInputChange}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Input
              width="300"
              type="text"
              placeholder="Telefone"
              name="telefone"
              value={formValuesProfissional.telefone}
              onChange={handleInputChange}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Input
              width="300"
              type="toggle"
              name="ativo"
              value={formValuesProfissional.ativo}
              onChange={handleInputChange}
            />
          </div>
        </Col>
        <Col md={8}>
          <Selected 
            options={tiposServico.map((tipoServico) => ({
              id: tipoServico.id,
              nome: tipoServico.nome
            }))}  
            onChange={handleServiceSelection}
          />
        </Col>
      </Row>
    </>
  );
};

export default InputGroudProfissional;


import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Input from "./Input";
import { Servico } from "../models/Servico";

interface InputGroudServicoProps {
  title: string;
  subTitle: string;
  handleShow: () => void;
  handleClose: () => void;
  editServico?: boolean;
  formValuesServico: {
    id: number;
    nome: string;
    descricao: string;
    valor: string;
    ativo: string;
    duracaoMinutos: string;
  };
  data?: Servico | Servico[];
  setFormValuesServico: React.Dispatch<React.SetStateAction<{
    id: number;
    nome: string;
    descricao: string;
    valor: string;
    ativo: string;
    duracaoMinutos: string;
}>>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroudServico: React.FC<InputGroudServicoProps> = ({
  title,
  subTitle,
  handleClose,
  handleShow,
  handleInputChange,
  formValuesServico,
  data,
  editServico = false,
  setFormValuesServico,
}) => {
  const [isInitialized, setIsInitialized] = React.useState(false);

  useEffect(() => {
    if (!isInitialized && editServico && Array.isArray(data) && data.length > 0) {
      const item = data[0];
      const newState = {
        id: item.id,
        nome: item.nome,
        descricao: item.descricao,
        valor: String(item.valor),
        ativo: item.ativo ? "true" : "false",
        duracaoMinutos: String(item.duracaoMinutos),
      };
      setFormValuesServico(newState);
      setIsInitialized(true); 
    }
  }, [data, editServico, isInitialized, setFormValuesServico]);

  return (
    <>
      <Row>
        <Col
          md={6}
          className="mt-3 mb-3 d-flex justify-content-center align-items-center"
        >
          <Input
            width="300"
            type="text"
            placeholder="Nome"
            name="nome"
            value={formValuesServico.nome}
            onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
          />
        </Col>
        <Col
          md={6}
          className="mt-3 mb-3 d-flex justify-content-center align-items-center"
        >
          <Input
            width="300"
            type="text"
            placeholder="Valor"
            name="valor"
            value={formValuesServico.valor}
            onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
          />
        </Col>
      </Row>
      <Row>
        <Col
          md={6}
          className="mt-3 mb-3 d-flex justify-content-center align-items-center"
        >
          <Input
            width="300"
            type="text"
            placeholder="Duração"
            name="duracaoMinutos"
            value={formValuesServico.duracaoMinutos}
            onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
          />
        </Col>
        <Col
          md={6}
          className="mt-3 mb-3 d-flex justify-content-center align-items-center"
        >
          <Input
            width="300"
            type="toggle"
            name="ativo"
            value={formValuesServico.ativo}
            onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
          />
        </Col>
      </Row>
      <Row>
        <Col
          md={12}
          className="mt-3 mb-3 d-flex justify-content-center align-items-center"
        >
          <Input
            width="600"
            type="text"
            placeholder="Descrição"
            name="descricao"
            value={formValuesServico.descricao}
            onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
          />
        </Col>
      </Row>
    </>
  );
};

export default InputGroudServico;

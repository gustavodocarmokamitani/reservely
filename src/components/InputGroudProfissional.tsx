import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Input from "./Input";
import Selected from "./Selected";
import { UsuarioFuncionario } from "../models/UsuarioFuncionario";

interface InputGroudProfissionalProps {
  edit?: boolean;
  addProf?: boolean;
  formValuesProfissional: {
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    ativo: string;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleServiceSelection: (selectedServices: number[]) => void;
  setFormValuesProfissional?: React.Dispatch<React.SetStateAction<UsuarioFuncionario>>;
  data?: {
    id: number;
    usuarioId: number;
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    ativo: string;
    servicosId: number[];
    senha: string;
    tipoUsuarioId: number;
  }[];
}
const InputGroudProfissional: React.FC<InputGroudProfissionalProps> = ({
  formValuesProfissional,
  handleInputChange,
  handleServiceSelection,
  setFormValuesProfissional,
  data,
  edit = false,
  addProf = false,
}) => {
  useEffect(() => {
    if (edit && data?.[0]) {
      const newState = {
        id: data[0].id,
        usuarioId: data[0].usuarioId,
        nome: data[0].nome,
        sobrenome: data[0].sobrenome,
        email: data[0].email,
        telefone: data[0].telefone,
        ativo: data[0].ativo,
        tipoUsuarioId: data[0].tipoUsuarioId,
        senha: data[0].senha,
        servicosId: data[0].servicosId,
      };
  
      setFormValuesProfissional?.(prevState => {
        if (newState.id !== prevState.id) {
          return newState;
        }
        return prevState;
      });
    }
  }, [edit, data, setFormValuesProfissional]);  

  const profissionalData = data?.[0] ?? null;

  return (
    <Row>
      <Col md={4} className="mt-3 mb-3">
        <Input
          width="300"
          type="text"
          placeholder="Nome"
          name="nome"
          value={formValuesProfissional.nome}
           onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
        />
        <Input
          width="300"
          type="text"
          placeholder="Sobrenome"
          name="sobrenome"
          value={formValuesProfissional.sobrenome}
           onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
        />
        <Input
          width="300"
          type="text"
          placeholder="Email"
          name="email"
          value={formValuesProfissional.email}
           onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
        />
        <Input
          width="300"
          type="text"
          placeholder="Telefone"
          name="telefone"
          value={formValuesProfissional.telefone}
           onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
        />
        <Input
          width="300"
          type="toggle"
          placeholder="Ativo"
          name="ativo"
          value={formValuesProfissional.ativo}
           onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
        />
      </Col>
      <Col md={8}>
      {edit &&
      //precisa passar o usuario Id para o formValuesProfissional
          <Selected
            options={profissionalData ? [profissionalData] : undefined}
            onChange={handleServiceSelection}
            edit
          />
        }
        {addProf &&
          <Selected
            options={profissionalData ? [profissionalData] : undefined}
            onChange={handleServiceSelection}
            addProf
          />
        }
      </Col>
    </Row>
  );
};

export default InputGroudProfissional;





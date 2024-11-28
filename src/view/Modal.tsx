import { useEffect, useState } from "react";
import { Servico } from "../models/Servico";
import { Usuario } from "../models/Profissional";
import api from "../axiosInstance";
import { Col, Row } from "react-bootstrap";
import Button from "../components/Button";
import * as S from "./Modal.styles";
import InputGroudServico from "../components/InputGroudServico";
import closeIcon from "../assets/remove.svg";
import InputGroudProfissional from "../components/InputGroudProfissional";
import Selected from "../components/Selected";
import ImagemUpload from "../components/ImagemUpload";
import { AxiosError } from 'axios';

interface ModalProps {
  title: string;
  subTitle?: string;
  servico?: boolean;
  profissional?: boolean;
  info?: boolean;
  imagem?: boolean;
  handleShow: () => void;
  handleClose: () => void;
  fetchData: () => void;
  size: "pequeno" | "medio" | "grande";
  usuarioId?: number;
}

const Modal: React.FC<ModalProps> = ({
  handleShow,
  handleClose,
  title,
  subTitle,
  servico,
  profissional,
  info,
  imagem,
  size,
  fetchData,
  usuarioId,
}) => {
  const [formValuesServico, setFormValuesServico] = useState<Servico>({
    id: 0,
    nome: "",
    valor: "",
    duracao: "",
    ativo: "false",
  });

  const [formValuesProfissional, setFormValuesProfissional] = useState<Usuario>({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    ativo: "false",
    servicosId: [] as number[],
  });

  const [tiposServico, setTiposServico] = useState([]);

  const sizeMap = {
    pequeno: "650px",
    medio: "850px",
    grande: "1050px",
  };

  useEffect(() => {
    if (profissional) {
      const fetchTiposServico = async () => {
        try {
          const response = await api.get("TipoServico");
          setTiposServico(response.data);
        } catch (error) {
          console.error("Erro ao buscar tipos de serviço", error);
        }
      };

      fetchTiposServico();
    }
  }, [profissional]);

  const handleServiceSelection = (servicosId: number[]) => {
    setFormValuesProfissional((prev) => ({
      ...prev,
      servicosId,
    }));
  };

  const handleInputChangeServico = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;
    setFormValuesServico((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "true" : "false") : value,
    }));
  };

  const handleInputChangeProfissional = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;
    setFormValuesProfissional((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "true" : "false") : value,
    }));
  };

  const validateServico = () => {
    if (!formValuesServico.nome || !formValuesServico.valor || !formValuesServico.duracao) {
      alert("Todos os campos de serviço devem ser preenchidos.");
      return false;
    }
    return true;
  };

  const validateProfissional = () => {
    if (!formValuesProfissional.nome || !formValuesProfissional.sobrenome || !formValuesProfissional.telefone) {
      alert("Todos os campos de profissional devem ser preenchidos.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (servico && !validateServico()) {
      return;
    }

    if (profissional && !validateProfissional()) {
      return;
    }

    try {
      if (servico) {
        const response = await api.post("/api/servicos", formValuesServico);
        console.log("Serviço criado com sucesso:", response.data);
      }

      if (profissional) {
        const profissionalData = {
          ...formValuesProfissional,
          servicosId: formValuesProfissional.servicosId,
        };
        console.log(profissionalData);

        const response = await api.post("http://localhost:5096/api/Funcionario/criarUsuarioFuncionario", profissionalData);
        console.log("Profissional criado com sucesso:", response.data);
      }

      fetchData();
      handleClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(`Erro ao criar ${servico ? "serviço" : "profissional"}: ${error.message}`);
      } else {
        alert("Erro inesperado.");
      }
    }
  };

  return (
    <S.Overlay>
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: sizeMap[size],
          width: "100%",
        }}
      >
        <Row>
          <Col md={10}>
            <h3>{title}</h3>
            <p>{subTitle}</p>
          </Col>
          <Col
            md={2}
            style={{ textAlign: "right", cursor: "pointer" }}
            onClick={handleClose}
          >
            <img
              src={closeIcon}
              alt="Close Icon"
              style={{ marginRight: "8px", verticalAlign: "middle" }}
              width={25}
            />
          </Col>
          <hr />
        </Row>

        {servico && (
          <InputGroudServico
            title={title}
            subTitle={subTitle!}
            handleShow={handleShow}
            handleClose={handleClose}
            formValuesServico={formValuesServico}
            handleInputChange={handleInputChangeServico}
          />
        )}

        {profissional && (
          <InputGroudProfissional
            formValuesProfissional={formValuesProfissional}
            handleInputChange={handleInputChangeProfissional}
            handleServiceSelection={handleServiceSelection}
            dataTipoServico={tiposServico}
          />
        )}

        {info && <Selected onChange={handleServiceSelection} usuarioId={usuarioId} infoProf />}

        {imagem && (
          <Row style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ImagemUpload />
          </Row>
        )}

        <hr />
        <Row>
          <Col
            md={12}
            className="d-flex flex-row justify-content-center align-items-center"
          >
            <Button $isFechar type="button" onClick={handleClose} />
            <Button $isConfirmar type="button" onClick={handleSubmit} />
          </Col>
        </Row>
      </div>
    </S.Overlay>
  );
};

export default Modal;

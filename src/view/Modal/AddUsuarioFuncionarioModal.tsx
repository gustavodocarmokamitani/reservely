import { useEffect, useState } from "react";
import { UsuarioFuncionario } from "../../models/UsuarioFuncionario";
import { Col, Row } from "react-bootstrap";
import Button from "../../components/Button";
import * as S from "../Modal.styles";
import closeIcon from "../../assets/remove.svg";
import InputGroudProfissional from "../../components/InputGroudProfissional";
import { getTipoServico } from "../../services/TipoServicoServices";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { getServicos } from "../../services/ServicoServices";

interface AddUsuarioFuncionarioModalProps {
  title: string;
  subTitle?: string;
  profissional?: boolean;
  handleShow: () => void;
  handleClose: () => void;
  fetchData: () => void;
  size: "pequeno" | "medio" | "grande";
  rowId?: number;
  setPost: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUsuarioFuncionarioModal: React.FC<AddUsuarioFuncionarioModalProps> = ({
  handleClose,
  title,
  subTitle,
  profissional,
  size,
  setPost,
}) => {
  const [formValuesProfissional, setFormValuesProfissional] = useState<UsuarioFuncionario>({
    id: 0,
    usuarioId: 0,
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    ativo: "false",
    senha: "",
    tipoUsuarioId: 0,
    servicosId: [] as number[],
  });

  const { setUsuarioFuncionarioContext } = useContext(AppContext)!;
  const [tipoServico, setTipoServico] = useState([]);

  const sizeMap = {
    pequeno: "650px",
    medio: "850px",
    grande: "1050px",
  };

  // useEffect(() => {

  //   if (profissional) {
  //     const fetchTiposServico = async () => {
  //       try {
  //         const response = await getServicos();
  //         setTipoServico(response.data);
  //       } catch (error) {
  //         console.error("Erro ao buscar tipos de serviço", error);
  //       }
  //     };
  //     fetchTiposServico();
  //   }
  // }, [profissional]);

  const handleSubmit = async () => {
    if (profissional) {
      const profissionalData = {
        ...formValuesProfissional,
        servicosId: formValuesProfissional.servicosId,
        lojaId: 1
      };
      setUsuarioFuncionarioContext(profissionalData);
      setPost(true);
    }
    handleClose();
  };

  const handleServiceSelection = (servicosId: number[]) => {
    setFormValuesProfissional((prev) => ({
      ...prev,
      servicosId,
    }));
  };
  const handleInputChangeProfissional = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;
    setFormValuesProfissional((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "true" : "false") : value,
    }));
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
        {profissional && (
          <InputGroudProfissional
            formValuesProfissional={formValuesProfissional}
            handleInputChange={handleInputChangeProfissional}
            handleServiceSelection={handleServiceSelection}
            data={tipoServico}
            addProf
          />
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

export default AddUsuarioFuncionarioModal;

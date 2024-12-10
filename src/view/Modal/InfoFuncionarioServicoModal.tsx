import { useState } from "react";
import { UsuarioFuncionario } from "../../models/UsuarioFuncionario";
import { Col, Row } from "react-bootstrap";
import Button from "../../components/Button";
import * as S from "../Modal.styles";
import closeIcon from "../../assets/remove.svg";
import Selected from "../../components/Selected";

interface InfoFuncionarioServicoModalProps {
  title: string;
  subTitle?: string;
  info?: boolean;
  handleShow: () => void;
  handleClose: () => void;
  fetchData: () => void;
  size: "pequeno" | "medio" | "grande";
  rowId?: number;
}

const InfoFuncionarioServicoModal: React.FC<InfoFuncionarioServicoModalProps> = ({
  handleClose,
  title,
  subTitle,
  info = false,
  size,
  rowId,
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

  const sizeMap = {
    pequeno: "650px",
    medio: "850px",
    grande: "1050px",
  };

  const handleSubmit = async () => {
    handleClose();
  };

  const handleServiceSelection = (servicosId: number[]) => {
    setFormValuesProfissional((prev) => ({
      ...prev,
      servicosId,
    }));
  };
  console.log(rowId);
  
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
        {info && <Selected onChange={handleServiceSelection} usuarioId={rowId} infoProf />}
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

export default InfoFuncionarioServicoModal;

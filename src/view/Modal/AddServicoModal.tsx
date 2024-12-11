import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "../../components/Button";
import * as S from "../Modal.styles";
import closeIcon from "../../assets/remove.svg";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import InputGroudServico from "../../components/InputGroudServico";
import { TipoServico } from "../../models/TipoServico";
import { Servico } from "../../models/Servico";

interface AddServicoModalProps {
  title: string;
  subTitle?: string;
  handleShow: () => void;
  handleClose: () => void;
  fetchData: () => void;
  size: "pequeno" | "medio" | "grande";
  setPost: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddServicoModal: React.FC<AddServicoModalProps> = ({
  handleShow,
  handleClose,
  title,
  subTitle,
  size,
  setPost,
}) => {
  const [formValuesServico, setFormValuesServico] = useState<Servico>({
    id: 0,
    nome: "",
    descricao: "",
    valor: "",
    duracaoMinutos: "",
    ativo: "false",
    lojaId: 0
  });

  const {
    setServicoContext
  } = useContext(AppContext)!;

  const sizeMap = {
    pequeno: "650px",
    medio: "850px",
    grande: "1050px",
  };

  const handleSubmit = async () => {
    if (formValuesServico) {
      const tipoServico: TipoServico = {
        ...formValuesServico,
        valor: parseFloat(formValuesServico.valor as string),
        duracaoMinutos: parseFloat(formValuesServico.duracaoMinutos as string),
        ativo: Boolean(formValuesServico.ativo as string),
      };

      setServicoContext(tipoServico);
    }
  
    setPost(true);
    handleClose();
  };
  

  const handleInputChangeServico = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = event.target;
    setFormValuesServico((prev) => ({
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
        <InputGroudServico
            title={title}
            subTitle={subTitle!}
            handleShow={handleShow}
            handleClose={handleClose}
            formValuesServico={formValuesServico}
            handleInputChange={handleInputChangeServico}
            setFormValuesServico={setFormValuesServico}
          />
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

export default AddServicoModal;

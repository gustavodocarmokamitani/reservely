import { useContext, useEffect, useState } from "react";
import { Servico } from "../../models/Servico";
import { Col, Row } from "react-bootstrap";
import Button from "../../components/Button";
import * as S from "../Modal.styles";
import InputGroudServico from "../../components/InputGroudServico";
import closeIcon from "../../assets/remove.svg";
import { getTipoServicoById } from "../../services/TipoServicoServices";
import { AppContext } from "../../context/AppContext";

interface EditServicoModalProps {
  title: string;
  subTitle?: string;
  editServico?: boolean;
  handleShow: () => void;
  handleClose: () => void;
  size: "pequeno" | "medio" | "grande";
  rowId?: number;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditServicoModal: React.FC<EditServicoModalProps> = ({
  handleShow,
  handleClose,
  title,
  subTitle,
  size,
  rowId,
  editServico = false,
  setUpdate
}) => {
  const [tipoServico, setTipoServico] = useState<Servico>();
  const {
    servicoUpdateContext,
    setServicoUpdateContext
  } = useContext(AppContext)!;

  const [formValuesServico, setFormValuesServico] = useState<Servico>({
    id: 0,
    nome: "",
    descricao: "",
    valor: "",
    duracaoMinutos: "",
    ativo: "false",
  });

  const sizeMap = {
    pequeno: "650px",
    medio: "850px",
    grande: "1050px",
  };

  useEffect(() => {
    if (editServico && rowId) {
      const fetchServico = async () => {
        try {
          const response = await getTipoServicoById(rowId);
          if (response) setTipoServico(response.data);
        } catch (error) {
          console.error("Erro ao buscar serviço:", error);
        }
      };

      fetchServico();
    }
  }, [editServico, rowId]);

  const handleSubmit = async () => {

    const updatedServico = {
      id: formValuesServico.id,
      nome:formValuesServico.nome,
      valor: parseFloat(formValuesServico.valor),
      duracaoMinutos: parseFloat(formValuesServico.duracaoMinutos),
      ativo:formValuesServico.ativo == "true" ? true : false,
      descricao:formValuesServico.descricao,
    };
    
    setServicoUpdateContext(updatedServico);
    setUpdate(true);
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
        {editServico && (
          <InputGroudServico
            title={title}
            subTitle={subTitle!}
            handleShow={handleShow}
            handleClose={handleClose}
            formValuesServico={formValuesServico}
            handleInputChange={handleInputChangeServico}
            data={tipoServico ? [tipoServico] : []}
            editServico
            setFormValuesServico={setFormValuesServico}
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

export default EditServicoModal;

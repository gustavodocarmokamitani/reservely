import { useEffect, useState } from "react";
import { Usuario } from "../../models/Usuario";
import { UsuarioFuncionario } from "../../models/UsuarioFuncionario";
import { Funcionario } from "../../models/Funcionario";
import { Col, Row } from "react-bootstrap";
import Button from "../../components/Button";
import * as S from "../Modal.styles";
import closeIcon from "../../assets/remove.svg";
import InputGroudProfissional from "../../components/InputGroudProfissional";
import { getFuncionarioIdByUsuarioId } from "../../services/FuncionarioServices";
import { getUsuarioById } from "../../services/UsuarioServices";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

interface EditUsuarioFuncionarioModal {
  title: string;
  subTitle?: string;
  edit?: boolean;
  handleShow: () => void;
  handleClose: () => void;
  size: "pequeno" | "medio" | "grande";
  rowId?: number;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CombinedData extends Funcionario, Usuario { };

const EditUsuarioFuncionarioModal: React.FC<EditUsuarioFuncionarioModal> = ({
  handleShow,
  handleClose,
  title,
  subTitle,
  size,
  rowId,
  edit = false,
  setUpdate,
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

  const { setUsuarioFuncionarioUpdateContext } = useContext(AppContext)!;
  const [funcionario, setFuncionario] = useState<UsuarioFuncionario[]>([]);
  const [usuario, setUsuario] = useState<Usuario[]>([]);
  const [combinedData, setCombinedData] = useState<CombinedData | null>(null);

  const sizeMap = {
    pequeno: "650px",
    medio: "850px",
    grande: "1050px",
  };

  useEffect(() => {
    if (edit) {
      const fetchFuncionario = async () => {
        try {
          const resFuncionario = await getFuncionarioIdByUsuarioId(rowId!);

          let funcionarioData = Array.isArray(resFuncionario)
            ? resFuncionario
            : [resFuncionario];

          const mappedFuncionario = funcionarioData.map((funcionario: UsuarioFuncionario) => ({
            id: funcionario.id,
            usuarioId: funcionario.usuarioId,
            nome: funcionario.nome,
            sobrenome: funcionario.sobrenome,
            email: funcionario.email,
            telefone: funcionario.telefone,
            senha: funcionario.senha,
            ativo: funcionario.ativo,
            tipoUsuarioId: funcionario.tipoUsuarioId,
            servicosId: funcionario.servicosId || [],
          }));

          setFuncionario(mappedFuncionario);

          if (mappedFuncionario.length > 0) {
            const resUsuario = await getUsuarioById(mappedFuncionario[0].usuarioId);

            let usuarioData = Array.isArray(resUsuario)
              ? resUsuario
              : [resUsuario];

            const mappedUsuario = usuarioData.map((usuario: Usuario) => ({
              id: usuario.id,
              nome: usuario.nome,
              sobrenome: usuario.sobrenome,
              email: usuario.email,
              telefone: usuario.telefone,
              senha: usuario.senha,
              tipoUsuarioId: usuario.tipoUsuarioId,
              lojaId: 1
            }));
            setUsuario(mappedUsuario);
            const combined = {
              ...mappedFuncionario[0],
              ...mappedUsuario[0],
            };
            setCombinedData(combined);
          }
        } catch (error) {
          console.error("Erro ao buscar tipos de serviço", error);
        }
      };
      fetchFuncionario();
    }

  }, [edit]);

  const handleSubmit = async () => {
    if (edit) {
      const updatedUserFunc = {
        id: formValuesProfissional.id,
        idFuncionario: 0,
        usuarioId: 0,
        tipoUsuarioId: 0,
        nome: formValuesProfissional.nome,
        sobrenome: formValuesProfissional.sobrenome,
        email: formValuesProfissional.email,
        telefone: formValuesProfissional.telefone,
        senha: formValuesProfissional.senha,
        ativo: formValuesProfissional.ativo,
        servicosId: formValuesProfissional.servicosId,
      };

      setUsuarioFuncionarioUpdateContext(updatedUserFunc);

      setUpdate(true);
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
        {edit && (
          <InputGroudProfissional
            setFormValuesProfissional={setFormValuesProfissional}
            formValuesProfissional={formValuesProfissional}
            handleInputChange={handleInputChangeProfissional}
            handleServiceSelection={handleServiceSelection}
            data={combinedData ? [combinedData] : undefined}
            edit
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

export default EditUsuarioFuncionarioModal;

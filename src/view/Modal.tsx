import { useEffect, useState } from "react";
import { Servico } from "../models/Servico";
import { Usuario } from "../models/Usuario";
import { UsuarioFuncionario } from "../models/UsuarioFuncionario";
import { Funcionario } from "../models/Funcionario";
import api from "../axiosInstance";
import { Col, Row } from "react-bootstrap";
import Button from "../components/Button";
import * as S from "./Modal.styles";
import InputGroudServico from "../components/InputGroudServico";
import closeIcon from "../assets/remove.svg";
import InputGroudProfissional from "../components/InputGroudProfissional";
import Selected from "../components/Selected";
import ImagemUpload from "../components/ImagemUpload";
import { getTipoServicos } from "../services/TipoServicoService";
import { createFuncionarioUsuario, getFuncionarioIdByUsuarioId, updateFuncionario, updateUsuarioFuncionario } from "../services/FuncionarioServices";
import { getUsuarioById } from "../services/UsuarioServices";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

interface ModalProps {
  title: string;
  subTitle?: string;
  servico?: boolean;
  addProf?: boolean;
  profissional?: boolean;
  info?: boolean;
  edit?: boolean;
  imagem?: boolean;
  handleShow: () => void;
  handleClose: () => void;
  fetchData: () => void;
  size: "pequeno" | "medio" | "grande";
  usuarioId?: number;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setPost: React.Dispatch<React.SetStateAction<boolean>>;
}


interface CombinedData extends Funcionario, Usuario { };

const Modal: React.FC<ModalProps> = ({
  handleShow,
  handleClose,
  title,
  subTitle,
  servico,
  profissional,
  info = false,
  imagem,
  size,
  usuarioId,
  edit = false,
  addProf = false,
  fetchData,
  setUpdate,
  setPost,
}) => {
  const [formValuesServico, setFormValuesServico] = useState<Servico>({
    id: 0,
    nome: "",
    valor: "",
    duracao: "",
    ativo: "false",
  });

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

  const [formValuesUsuario, setFormValuesUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    senha: "",
    tipoUsuarioId: 0,
  });

  const [formValuesFuncionario, setFormValuesFuncionario] = useState<Funcionario>({
    id: 0,
    usuarioId: 0,
    ativo: "false",
    servicosId: [] as number[],
  });

  const {
    setUsuarioContext,
    setFuncionarioContext,
    setUsuarioFuncionarioContext,
    setUsuarioFuncionarioUpdateContext
  } = useContext(AppContext)!;

  const [tiposServico, setTiposServico] = useState([]);
  const [funcionario, setFuncionario] = useState<UsuarioFuncionario[]>([]);
  const [usuario, setUsuario] = useState<Usuario[]>([]);
  const [combinedData, setCombinedData] = useState<CombinedData | null>(null);

  const sizeMap = {
    pequeno: "650px",
    medio: "850px",
    grande: "1050px",
  };

  useEffect(() => {
    if (profissional) {
      const fetchTiposServico = async () => {
        try {
          const response = await getTipoServicos();
          setTiposServico(response.data);
        } catch (error) {
          console.error("Erro ao buscar tipos de serviço", error);
        }
      };
      fetchTiposServico();
    }

    if (edit) {
      const fetchFuncionario = async () => {
        try {
          const resFuncionario = await getFuncionarioIdByUsuarioId(usuarioId!);

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
  }, [profissional, edit]);

  const handleSubmit = async () => {
    if (profissional) {
      const profissionalData = {
        ...formValuesProfissional,
        servicosId: formValuesProfissional.servicosId,
      };
      setUsuarioFuncionarioContext(profissionalData);
      setPost(true);
    }

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
            data={tiposServico}
            addProf
          />
        )}

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

        {info && <Selected onChange={handleServiceSelection} usuarioId={usuarioId} infoProf />}

        {addProf === true ?? <Selected onChange={handleServiceSelection} usuarioId={usuarioId} addProf />}

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

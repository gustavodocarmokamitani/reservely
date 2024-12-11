import React, { useState, useEffect } from "react";
import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import DataTable from "../view/DataTable";
import { Col, Row } from "react-bootstrap";
import Button from "../components/Button";
import Modal from "../view/Modal";
import { getUsuarios, deleteUsuario } from "../services/UsuarioServices";
import { getFuncionarios, deleteFuncionario, createFuncionarioUsuario, updateUsuarioFuncionario } from "../services/FuncionarioServices";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useSnackbar } from 'notistack';
import AddUsuarioFuncionarioModal from "../view/Modal/AddUsuarioFuncionarioModal";

interface Usuario {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  senha: string;
  tipoUsuarioId: number;
}

interface Funcionario {
  id: number;
  usuarioId: number;
  ativo: string;
  servicosId: number[];
}

interface Row {
  id: number;
  nome: string;
  sobrenome: string;
  telefone: string;
  email: string;
  servicos: number[];
}

function Profissional() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [show, setShow] = useState(false);
  const [post, setPost] = useState(false);
  const [update, setUpdate] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { 
    setUsuarioFuncionarioContext,
    usuarioFuncionarioContext,
    usuarioFuncionarioUpdateContext,
  } = useContext(AppContext)!;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    try {
      const usuariosData = await getUsuarios();
      const funcionariosData = await getFuncionarios();

      const mappedRows: Row[] = funcionariosData.map((funcionario: Funcionario) => {
        const usuario = usuariosData.find((u: any) => u.id === funcionario.usuarioId);

        if (usuario) {
          return {
            id: usuario.id,
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            telefone: usuario.telefone,
            email: usuario.email,
            ativo: funcionario.ativo,
            servicos: funcionario.servicosId || [],
          };
        }
        return null;
      }).filter(Boolean) as Row[];

      setUsuarios(usuariosData);
      setFuncionarios(funcionariosData);
      setRows(mappedRows);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const request = async () => {
    try {
      if (post) {
        if (!usuarioFuncionarioContext?.nome || !usuarioFuncionarioContext.sobrenome || !usuarioFuncionarioContext.telefone) {
          setPost(false);
          enqueueSnackbar("Por favor, preencha todos os dados obrigatórios antes de continuar.", { variant: "error" });
          return; 
        }
        await createFuncionarioUsuario(usuarioFuncionarioContext);
        
        enqueueSnackbar("Profissional criado com sucesso!", { variant: "success" });
        setUsuarioFuncionarioContext(null); 
        setPost(false);
      }
    } catch (error) {
      console.error("Erro durante o request:", error);
      enqueueSnackbar("Erro inesperado! Verifique os dados.", { variant: "error" });
    }
  };
  

  useEffect(() => {
    request();
    fetchData();
  }, [post]);

  const handleDeleteUsers = async () => {
    if (selectedUserIds.length > 0) {
      try {
        await Promise.all(
          selectedUserIds.map(async (usuarioId) => {
            try {
              const funcionarioResponse = await getFuncionarios(); 
              const funcionario = funcionarioResponse.find((f: Funcionario) => f.usuarioId === usuarioId);

              if (funcionario) {
                const funcionarioId = funcionario.id;

                await deleteFuncionario(funcionarioId);
                enqueueSnackbar(`Profissional excluido com sucesso!`, { variant: "success" });
              } else {
                console.log();
                enqueueSnackbar(`Nenhum funcionário encontrado para o usuário com ID ${usuarioId}`, { variant: "error" });
              }
              await deleteUsuario(usuarioId);
            } catch (error) {
              console.error(`Erro ao remover o usuário ${usuarioId}:`, error);
            }
          })
        );
        fetchData();
        setSelectedUserIds([]); 
      } catch (error) {
        console.error("Erro ao remover os usuários:", error);
      }
    } else {
      alert("Nenhum usuário selecionado!");
    }
  };

  const handleRowSelect = (ids: number[]) => {
    console.log("IDs selecionados na tabela: ", ids);
    setSelectedUserIds(ids);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ContainerPage style={{ height: "100vh" }}>
        <Row>
          <Col md={7} style={{ padding: "0px" }}>
            <HeaderTitle
              title="Profissional"
              subTitle="Área destinada para gerenciamento de profissionais."
            />
          </Col>

          <Col
            md={5}
            className="d-flex flex-row justify-content-end align-items-center"
          >
            <Button $isRemover type="button" onClick={handleDeleteUsers} />
            <Button $isAdicionar type="button" onClick={handleShow} />
          </Col>
        </Row>
        <DataTable
          profissional
          rowsProfissional={rows}
          onRowSelect={handleRowSelect} 
          setUpdate={setUpdate}
          update={update}
          fetchData={fetchData}
        />
        {show && (
          <AddUsuarioFuncionarioModal
            title="Adicionar profissional"
            subTitle="Preencha as informações abaixo para criar um novo profissional."
            profissional
            handleClose={handleClose}
            handleShow={handleShow}
            size="grande"
            fetchData={fetchData}
            setPost={setPost}
          />
        )}
      </ContainerPage>
    </>
  );
}

export default Profissional;

import React, { useState, useEffect } from "react";
import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import DataTable from "../view/DataTable";
import { Col, Row } from "react-bootstrap";
import Button from "../components/Button";
import Modal from "../view/Modal";
import api from "../axiosInstance";

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
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]); // Estado para armazenar IDs selecionados
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    try {
      const [usuariosResponse, funcionariosResponse] = await Promise.all([
        api.get<Usuario[]>("/usuario"),
        api.get<Funcionario[]>("/funcionario"),
      ]);

      const usuariosData = usuariosResponse.data;
      const funcionariosData = funcionariosResponse.data;

      const mappedRows: Row[] = funcionariosData.map((funcionario) => {
        const usuario = usuariosData.find((u) => u.id === funcionario.usuarioId);

        if (usuario) {
          return {
            id: usuario.id,
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            telefone: usuario.telefone,
            email: usuario.email,
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

  const handleDeleteUsers = async () => {
    console.log("IDs selecionados para exclusão: ", selectedUserIds); // Depuração para ver os IDs selecionados
    
    if (selectedUserIds.length > 0) {
      try {
        // Para cada ID de usuário selecionado, buscamos o ID do funcionário e deletamos o funcionário
        await Promise.all(
          selectedUserIds.map(async (usuarioId) => {
            try {
              // Buscar o funcionário associado ao usuário
              const response = await api.get(`/Funcionario?usuarioId=${usuarioId}`);
              
              if (response.data.length > 0) {
                const funcionarioId = response.data[0].id; // O ID do funcionário associado
  
                // Deletar o funcionário
                await api.delete(`/Funcionario/${funcionarioId}`);
                console.log(`Funcionário com ID ${funcionarioId} removido com sucesso!`);
              } else {
                console.log(`Nenhum funcionário encontrado para o usuário com ID ${usuarioId}`);
              }
  
              // Depois de deletar o funcionário, deletar o usuário
              await api.delete(`Usuario/${usuarioId}`);
              console.log(`Usuário com ID ${usuarioId} removido com sucesso!`);
  
            } catch (error) {
              console.error(`Erro ao remover o usuário ${usuarioId}:`, error);
            }
          })
        );
  
        alert("Usuários e funcionários removidos com sucesso!");
        fetchData(); // Recarregar os dados após exclusão
        setSelectedUserIds([]); // Limpar seleção após a exclusão
      } catch (error) {
        console.error("Erro ao remover os usuários:", error);
      }
    } else {
      alert("Nenhum usuário selecionado!");
    }
  };
  
  const handleRowSelect = (ids: number[]) => {
    console.log("IDs selecionados na tabela: ", ids); // Depuração para verificar se os IDs estão sendo passados corretamente
    setSelectedUserIds(ids); // Atualiza o estado de IDs selecionados
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
            <Button $isRemover type="button" onClick={handleDeleteUsers} /> {/* Botão para remover selecionados */}
            <Button $isAdicionar type="button" onClick={handleShow} />
          </Col>
        </Row>
        <DataTable
          profissional
          rowsProfissional={rows}
          onRowSelect={handleRowSelect} // Passa a função handleRowSelect para atualizar a seleção
        />
        {show && (
          <Modal
            title="Adicionar profissional"
            subTitle="Preencha as informações abaixo para criar um novo profissional."
            profissional
            handleClose={handleClose}
            handleShow={handleShow}
            size="grande"
            fetchData={fetchData} 
          />
        )}
        <Row>
          <Col
            md={12}
            className="mt-5 d-flex flex-row justify-content-end align-items-center"
          >
            <Button $isConfirmar type="button" />
          </Col>
        </Row>
      </ContainerPage>
    </>
  );
}

export default Profissional;

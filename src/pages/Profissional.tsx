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
  telefone: string;
  email: string;
  servicos: number[];
}

function Profissional() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
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
            <Button isRemover type="button" />
            <Button isAdicionar type="button" onClick={handleShow} />
          </Col>
        </Row>
        <DataTable profissional rowsProfissional={rows} />
        {show && (
          <Modal
            title="Adicionar profissional"
            subTitle="Preencha as informações abaixo para criar um novo profissional."
            profissional
            handleClose={handleClose}
            handleShow={handleShow}
            size="grande"
          />
        )}
        <Row>
          <Col
            md={12}
            className="mt-5 d-flex flex-row justify-content-end align-items-center"
          >
            <Button isConfirmar type="button" />
          </Col>
        </Row>
      </ContainerPage>
    </>
  );
}

export default Profissional;

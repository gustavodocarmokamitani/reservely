import React, { useEffect, useState } from "react";
import { ContainerPage } from "./_Page.styles";
import HeaderTitle from "../view/HeaderTitle";
import DataTable from "../view/DataTable";
import { Col, Row } from "react-bootstrap";
import Button from "../components/Button";
import { createTipoServico, deleteTipoServico, getTipoServico } from "../services/TipoServicoServices";
import { TipoServico } from "../models/TipoServico";
import Modal from "../view/Modal/AddServicoModal";
import AddServicoModal from "../view/Modal/AddServicoModal";
import { useSnackbar } from 'notistack';
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

interface Row {
  id: number;
  nome: string;
  sobrenome: string;
  telefone: string;
  email: string;
  servicos: number[];
}

function Servico() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [post, setPost] = useState(false);
  const [update, setUpdate] = useState(false);
  const [rows, setRows] = useState<TipoServico[]>([]);
  const [selectedServicoIds, setSelectedServicoIds] = useState<number[]>([]);

  const { enqueueSnackbar } = useSnackbar();
  const {
    servicoContext,
    setServicoContext
  } = useContext(AppContext)!;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const servicoData = await getTipoServico();
      setRows(servicoData?.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const request = async () => {
    try {
      if (post) {
        if (!servicoContext?.nome || !servicoContext.descricao || !servicoContext.valor || !servicoContext.duracaoMinutos) {
          setPost(false);
          enqueueSnackbar("Por favor, preencha todos os dados obrigatórios antes de continuar.", { variant: "error" });
          return;
        }
        const defaultServico = [
          {
            id: servicoContext?.id || 0,
            nome: servicoContext?.nome || "string",
            descricao: servicoContext?.descricao || "string",
            valor: servicoContext?.valor || 0,
            ativo: servicoContext?.ativo || true,
            duracaoMinutos: servicoContext?.duracaoMinutos || 0,
          },
        ];

        await createTipoServico(defaultServico);
        console.log("Serviço criado com sucesso!");
        enqueueSnackbar("Serviço criado com sucesso!", { variant: "success" });
        setServicoContext(null);
        setPost(false);
      }
    } catch (error) {
      console.error("Erro durante o request:", error);
      enqueueSnackbar("Erro inesperado! Verifique os dados.", { variant: "error" });
    }
  };

  const handleDeleteServicos = async () => {
    if (selectedServicoIds.length > 0) {
      try {
        await Promise.all(
          selectedServicoIds.map(async (servicoId) => {
            try {
              // Supondo que você tenha uma função getTipoServicoById ou similar
              const servico = rows.find((s: TipoServico) => s.id === servicoId);

              if (servico) {
                // Chame a função de exclusão de serviço aqui (supondo que exista uma função deleteTipoServico)
                await deleteTipoServico(servicoId);
                enqueueSnackbar(`Serviço ${servico.nome} excluído com sucesso!`, { variant: "success" });
              } else {
                enqueueSnackbar(`Nenhum serviço encontrado para o ID ${servicoId}`, { variant: "error" });
              }
            } catch (error) {
              console.error(`Erro ao remover o serviço ${servicoId}:`, error);
              enqueueSnackbar(`Erro ao remover o serviço ${servicoId}`, { variant: "error" });
            }
          })
        );
        fetchData();  // Recarrega os dados após a exclusão
        setSelectedServicoIds([]);  // Limpa a seleção
      } catch (error) {
        console.error("Erro ao remover os serviços:", error);
        enqueueSnackbar("Erro inesperado ao remover os serviços.", { variant: "error" });
      }
    } else {
      alert("Nenhum serviço selecionado!");
    }
  };

  const handleRowSelect = (ids: number[]) => {
    console.log("IDs selecionados na tabela: ", ids);
    setSelectedServicoIds(ids);
  };

  useEffect(() => {
    request();
    fetchData();
  }, [post]);

  return (
    <>
      <ContainerPage style={{ height: "100vh" }}>
        <Row>
          <Col md={7} style={{ padding: "0px" }}>
            <HeaderTitle
              title="Serviço"
              subTitle="Área destinada para gerenciamento de serviços."
            />
          </Col>

          <Col
            md={5}
            className="d-flex flex-row justify-content-end align-items-center"
          >
            <Button onClick={handleDeleteServicos} $isRemover type="button" />
            <Button
              $isAdicionar
              type="button"
              onClick={handleShow}
            />
          </Col>
        </Row>
        <DataTable
          servico
          rowsServico={rows}
          onRowSelect={handleRowSelect}
          setUpdate={setUpdate}
          fetchData={() => { }}
        />
        {show && (
          <AddServicoModal
            title="Adicionar serviço"
            subTitle="Preencha as informações abaixo para criar um novo serviço."
            handleClose={handleClose}
            handleShow={handleShow}
            size="pequeno"
            fetchData={fetchData}
            setPost={setPost}
          />
        )}
      </ContainerPage>
    </>
  );
}

export default Servico;

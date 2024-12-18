import React, { useEffect, useState } from "react";
import { ContainerPage } from "./_Page.styles";
import { Col, Row } from "react-bootstrap";
import { createServiceTypeByStoreId, deleteServiceType, getServiceTypes } from "../services/ServiceTypeServices";
import { ServiceType } from "../models/ServiceType";
import { useSnackbar } from 'notistack';
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import HeaderTitle from "../view/HeaderTitle";
import DataTable from "../view/DataTable";
import Button from "../components/Button";
import AddServiceModal from "../view/Modal/AddServiceModal";

interface Row {
  id: number;
  name: string;
  latname: string;
  phone: string;
  email: string;
  services: number[];
}

function Service() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [post, setPost] = useState(false);
  const [update, setUpdate] = useState(false);
  const [rows, setRows] = useState<ServiceType[]>([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>([]);

  const { enqueueSnackbar } = useSnackbar();
  const {
    serviceContext,
    setServiceContext
  } = useContext(AppContext)!;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const serviceData = await getServiceTypes();
      setRows(serviceData?.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const handleCreateServiceType = async () => {
    try {

      if (!serviceContext?.name || !serviceContext.description || !serviceContext.value || !serviceContext.durationMinutes) {
        setPost(false);
        enqueueSnackbar("Por favor, preencha todos os dados obrigatórios antes de continuar.", { variant: "error" });
        return;
      }
      const defaultService = [
        {
          id: serviceContext?.id || 0,
          name: serviceContext?.name || "string",
          description: serviceContext?.description || "string",
          value: serviceContext?.value || 0,
          active: serviceContext?.active || true,
          durationMinutes: serviceContext?.durationMinutes || 0,
        },
      ];

      await createServiceTypeByStoreId(1, defaultService);
      enqueueSnackbar("Serviço criado com sucesso!", { variant: "success" });
      setServiceContext(null);
      setPost(false);

    } catch (error) {
      console.error("Erro durante o request:", error);
      enqueueSnackbar("Erro inesperado! Verifique os dados.", { variant: "error" });
    }
  };

  const handleDeleteServices = async () => {
    if (selectedServiceIds.length > 0) {
      try {
        await Promise.all(
          selectedServiceIds.map(async (serviceId) => {
            try {
              const servico = rows.find((s: ServiceType) => s.id === serviceId);

              if (servico) {
                await deleteServiceType(serviceId);
                enqueueSnackbar(`Serviço ${servico.name} excluído com sucesso!`, { variant: "success" });
              } else {
                enqueueSnackbar(`Nenhum serviço encontrado para o ID ${serviceId}`, { variant: "error" });
              }
            } catch (error) {
              console.error(`Erro ao remover o serviço ${serviceId}:`, error);
              enqueueSnackbar(`Erro ao remover o serviço ${serviceId}`, { variant: "error" });
            }
          })
        );
        fetchData();
        setSelectedServiceIds([]);
      } catch (error) {
        console.error("Erro ao remover os serviços:", error);
        enqueueSnackbar("Erro inesperado ao remover os serviços.", { variant: "error" });
      }
    } else {
      alert("Nenhum serviço selecionado!");
    }
  };

  const handleRowSelect = (ids: number[]) => {
    setSelectedServiceIds(ids);
  };

  useEffect(() => {
    if (post) handleCreateServiceType();
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
            <Button onClick={handleDeleteServices} $isRemove type="button" />
            <Button
              $isAdd
              type="button"
              onClick={handleShow}
            />
          </Col>
        </Row>
        <DataTable
          service
          rowsService={rows}
          onRowSelect={handleRowSelect}
          setUpdate={setUpdate}
          update={update}
          fetchData={fetchData}
        />
        {show && (
          <AddServiceModal
            title="Adicionar serviço"
            subTitle="Preencha as informações abaixo para criar um novo serviço."
            handleClose={handleClose}
            handleShow={handleShow}
            size="small"
            fetchData={fetchData}
            setPost={setPost}
          />
        )}
      </ContainerPage>
    </>
  );
}

export default Service;

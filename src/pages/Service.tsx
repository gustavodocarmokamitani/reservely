import { useEffect, useState, useContext } from "react";
import { ContainerPage } from "./_Page.styles";
import { Col, Row } from "react-bootstrap";
import { deleteServiceType, getServiceTypes } from "../services/ServiceTypeServices";
import { decodeToken } from "../services/AuthService";
import { ServiceType } from "../models/ServiceType";
import { AppContext } from "../context/AppContext";
import { useSnackbar } from "notistack";
import HeaderTitle from "../view/HeaderTitle";
import Button from "../components/Button";
import AddServiceModal from "../view/Modal/AddServiceModal";
import ServiceDataTable from "../view/DataTable/ServiceDataTable";

interface Row {
  id: number;
  name: string;
  latname: string;
  phone: string;
  email: string;
  services: number[];
}

interface DecodedToken {
  userId: string;
  userEmail: string;
  userRole: string;
}

function Service() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [rows, setRows] = useState<ServiceType[]>([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>([]);

  const storedToken = localStorage.getItem("authToken");
  const [decodedData, setDecodedData] = useState<DecodedToken>();

  const { enqueueSnackbar } = useSnackbar();
  const { serviceContext, setServiceContext, userRoleContext } = useContext(AppContext)!;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (storedToken) {
      const data = await decodeToken(storedToken);
      setDecodedData(data);
    }
    try {
      const serviceData = await getServiceTypes();
      setRows(serviceData?.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
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
      enqueueSnackbar(`Nenhum serviço selecionado`, { variant: "error" });
    }
  };

  const handleRowSelect = (ids: number[]) => {
    setSelectedServiceIds(ids);
  };

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
            {decodedData?.userRole === "Admin" && (
              <>
                <Button onClick={handleDeleteServices} $isRemove type="button" />
                <Button $isAdd type="button" onClick={handleShow} />
              </>
            )}
          </Col>
        </Row>
        <ServiceDataTable
          service
          rowsService={rows}
          onRowSelect={handleRowSelect} 
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
          />
        )}
      </ContainerPage>
    </>
  );
}

export default Service;

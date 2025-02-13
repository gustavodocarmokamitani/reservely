import { useCallback, useEffect, useState } from "react";
import { ContainerPage } from "../Styles/_Page.styles";
import { Col, Row } from "react-bootstrap";
import {
  createServiceTypeByStoreId,
  deleteServiceType,
  getServiceTypesByStore,
} from "../../services/ServiceTypeServices";
import { decodeToken } from "../../services/AuthService";
import { ServiceType } from "../../models/ServiceType";
import { Service as ServiceModel, ServiceServiceType } from "../../models/Service";
import { useSnackbar } from "notistack";
import HeaderTitle from "../../view/HeaderTitle/HeaderTitle";
import Button from "../../components/Button/Button";
import AddServiceModal from "../../view/Modal/AddServiceModal";
import ServiceDataTable from "../../view/DataTable/ServiceDataTable";

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

  const [formValuesService, setFormValuesService] = useState<ServiceModel>({
    id: 0,
    name: "",
    description: "",
    value: "",
    durationMinutes: "",
    active: "false",
    storeId: 0,
  });

  const storedToken = localStorage.getItem("authToken");
  const [decodedData, setDecodedData] = useState<DecodedToken>();

  const storeUser = Number(localStorage.getItem("storeUser"));

  const { enqueueSnackbar } = useSnackbar();

  const fetchData = useCallback(async () => {
    if (storedToken) {
      const data = await decodeToken(storedToken);
      setDecodedData(data);
    }
    try {
      const serviceData = await getServiceTypesByStore(storeUser);
      setRows(serviceData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }, [storedToken, storeUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteServices = async () => {
    if (selectedServiceIds.length > 0) {
      try {
        await Promise.all(
          selectedServiceIds.map(async (serviceId) => {
            try {
              const servico = rows.find((s: ServiceType) => s.id === serviceId);

              if (servico) {
                await deleteServiceType(serviceId);
                enqueueSnackbar(
                  `Serviço ${servico.name} excluído com sucesso!`,
                  { variant: "success" }
                );
              } else {
                enqueueSnackbar(
                  `Nenhum serviço encontrado para o ID ${serviceId}`,
                  { variant: "error" }
                );
              }
            } catch (error) {
              console.error(`Erro ao remover o serviço ${serviceId}:`, error);
              enqueueSnackbar(`Erro ao remover o serviço ${serviceId}`, {
                variant: "error",
              });
            }
          })
        );

        setSelectedServiceIds([]);
      } catch (error) {
        console.error("Erro ao remover os serviços:", error);
        enqueueSnackbar("Erro inesperado ao remover os serviços.", {
          variant: "error",
        });
      }
      fetchData();
      console.log(123);
    } else {
      enqueueSnackbar(`Nenhum serviço selecionado`, { variant: "error" });
    }
  };

  const handleRowSelect = (ids: number[]) => {
    setSelectedServiceIds(ids);
  };

  const handleSubmit = async () => {
    try {
      if (!validateFormValues(formValuesService)) {
        return;
      }

      const typeService: ServiceServiceType[] = [
        {
          id: formValuesService.id,
          name: formValuesService.name,
          description: formValuesService.description,
          value: parseFloat(formValuesService.value as string),
          active: formValuesService.active === "true",
          durationMinutes: parseFloat(
            formValuesService.durationMinutes as string
          ),
          services: [
            {
              id: formValuesService.id,
              serviceTypeId: formValuesService.id,
              storeId: storeUser,
            },
          ],
        },
      ];

      const responsePost = await createServiceTypeByStoreId(
        storeUser,
        typeService
      );

      if (responsePost) {
        enqueueSnackbar("Serviço criado com sucesso!", { variant: "success" });
        fetchData();
      }
      handleClose();
    } catch (error) {
      console.error("Erro durante o request:", error);
      enqueueSnackbar("Erro inesperado! Verifique os dados.", {
        variant: "error",
      });
    }
  };

  const handleInputChangeService = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, type, checked, value } = event.target;
    setFormValuesService((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "true" : "false") : value,
    }));
  };

  const validateFormValues = (formValues: ServiceModel): boolean => {
    const fieldValidations = [
      { field: "name", message: "O campo 'Nome' é obrigatório." },
      { field: "value", message: "O campo 'Valor' é obrigatório." },
      {
        field: "durationMinutes",
        message: "O campo 'Duração (minutos)' é obrigatório.",
      },
      { field: "description", message: "O campo 'Descrição' é obrigatório." },
    ];
    console.log(formValuesService);
    
    for (const { field, message } of fieldValidations) {
      if (!formValues[field as keyof ServiceModel]) {
        enqueueSnackbar(message, { variant: "error" });
        return false;
      }
    }

    return true;
  };

  return (
    <>
      <ContainerPage style={{ height: "100vh" }}>
        <Row>
          <Col lg={12} xl={7} style={{ padding: "0px" }}>
            <HeaderTitle
              title="Serviço"
              subTitle="Área destinada para gerenciamento de serviços."
            />
          </Col>

          <Col
            lg={12}
            xl={5}
            className="d-flex flex-row justify-content-md-center justify-content-lg-end align-items-center  mt-md-3 mt-lg-5 mt-xl-0"
          >
            {decodedData?.userRole === "Admin" && (
              <>
                <Button
                  onClick={handleDeleteServices}
                  $isRemove
                  type="button"
                />
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
            setFormValuesService={setFormValuesService}
            handleInputChangeService={handleInputChangeService}
            handleSubmit={handleSubmit}
            formValuesService={formValuesService}
            size="small"
          />
        )}
      </ContainerPage>
    </>
  );
}

export default Service;

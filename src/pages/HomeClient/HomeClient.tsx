import * as S from "./HomeClient.styles";
import Card from "../../components/Card/Card";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { DecodedToken } from "../../models/DecodedToken";
import { decodeToken } from "../../services/AuthService";
import { Appointment } from "../../models/Appointment";
import { getAppointmentByClienteId } from "../../services/AppointmentServices";
import { getEmployeeById } from "../../services/EmployeeServices";
import { getUserById } from "../../services/UserServices";
import { getServiceTypeById } from "../../services/ServiceTypeServices";
import {
  getStoreById,
  getStoreByStoreCode,
} from "../../services/StoreServices";
import { capitalizeFirstLetter } from "../../services/system/globalService";
import Button from "../../components/Button/Button";
import {
  ContainerHeader,
  ContainerPage,
  ContentHeader,
  ContentHeaderImg,
  SubTitle,
  Title,
} from "../Styles/_Page.styles";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../../models/Store";
import UserMenu from "../../components/UserMenu/UserMenu";

export const HomeClient = () => {
  const { storeCodeParams } = useParams();
  const storeCode = storeCodeParams ? storeCodeParams.replace("_", "#") : "";

  const navigate = useNavigate();
  const context = useContext(AppContext);
  const authToken = context?.authToken;

  const [decodedData, setDecodedData] = useState<DecodedToken | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [storeActive, setStoreActive] = useState<Store>();

  useEffect(() => {
    const fetchDecodedToken = async () => {
      if (authToken) {
        try {
          const decoded = await decodeToken(authToken);
          setDecodedData(decoded);
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
        }
      }
    };

    fetchDecodedToken();
  }, [authToken]);

  useEffect(() => {
    const fetchData = async () => {
      if (!decodedData?.userId) {
        console.warn("decodedData.userId está ausente ou inválido.");
        return;
      }

      try {
        if (storeCode !== ":") {
          const responseStoreActive = await getStoreByStoreCode(storeCode);
          setStoreActive(responseStoreActive);
        }

        const userId = parseFloat(decodedData.userId);
        if (isNaN(userId)) {
          console.error("userId não é um número válido:", decodedData.userId);
          return;
        }

        const responseAppointments = await getAppointmentByClienteId(userId);

        if (!responseAppointments || responseAppointments.length === 0) {
          console.warn("Nenhum agendamento encontrado para o usuário:", userId);
          return;
        }

        const appointmentsWithDetails = (
          await Promise.all(
            responseAppointments.map(async (appointment: Appointment) => {
              try {
                if (!appointment.employeeId || !appointment.storeId) {
                  console.error(
                    "Dados de agendamento incompletos:",
                    appointment
                  );
                  return null;
                }

                const responseEmployee = await getEmployeeById(
                  appointment.employeeId
                );

                if (!responseEmployee) {
                  console.error(
                    "Funcionário não encontrado:",
                    appointment.employeeId
                  );
                  return null;
                }

                const responseUser = await getUserById(responseEmployee.id);

                if (!responseUser) {
                  console.error(
                    "Usuário não encontrado para o funcionário:",
                    responseEmployee.id
                  );
                  return null;
                }

                const responseStore = await getStoreById(appointment.storeId);

                if (!responseStore) {
                  console.error("Loja não encontrada:", appointment.storeId);
                  return null;
                }

                const services = await Promise.all(
                  appointment.serviceIds.map(async (serviceId) => {
                    try {
                      const service = await getServiceTypeById(serviceId);

                      return service;
                    } catch (error) {
                      console.error(
                        "Erro ao buscar serviceId:",
                        serviceId,
                        error
                      );
                      return null;
                    }
                  })
                );

                const filteredServices = services.filter((service) => service);
                const totalPrice = filteredServices.reduce(
                  (sum, service) => sum + (service?.data.value || 0),
                  0
                );

                return {
                  storeName: responseStore.name,
                  storeCode: responseStore.storeCode,
                  appointmentDate: appointment.appointmentDate,
                  appointmentTime: appointment.appointmentTime,
                  appointmentStatus: appointment.appointmentStatusId,
                  employeeName: `${capitalizeFirstLetter(
                    responseUser.name
                  )} ${capitalizeFirstLetter(responseUser.lastName)}`,
                  services: filteredServices.map((service) => ({
                    name: service?.data.name,
                  })),
                  totalPrice,
                };
              } catch (error) {
                console.error(
                  "Erro ao processar agendamento:",
                  appointment,
                  error
                );
                return null;
              }
            })
          )
        ).filter((appointment) => appointment);

        if (appointmentsWithDetails.length > 0) {
          setData(appointmentsWithDetails);
        } else {
          console.warn(
            "Nenhum agendamento válido encontrado após o processamento."
          );
        }
      } catch (error) {
        console.error("Erro geral ao buscar ou processar os dados:", error);
      }
    };

    fetchData();
  }, [decodedData]);

  const handleNavigateAppointmentClient = () => {
    if (storeCode === ":") {
      navigate(`/appointment-client/:`);
    } else {
      navigate(
        `/appointment-client/${storeCode.toUpperCase().replace("#", "_")}`
      );
    }
  };

  const handleNavigateAppointmentClientStoreCode = (storeCode: string) => {
    const encodedStoreCode = encodeURIComponent(storeCode);
    navigate(`/appointment-client/${encodedStoreCode}`);
  };

  return (
    <ContainerPage>
      <UserMenu />
      <ContainerHeader>
        <ContentHeader align="start">
          <Title>
            Bem Vindo! <br />
            {data.length > 0 && (
              <>
                {storeActive?.name} <span>{storeActive?.storeCode}</span>
              </>
            )}
          </Title>

          <SubTitle>
            Gerencie seus compromissos com facilidade! Aqui, você pode acessar
            seus históricos de agendamentos e avaliações, além de realizar novas
            avaliações e agendamentos sempre que precisar.
          </SubTitle>
        </ContentHeader>
        <ContentHeaderImg align="end">
          {storeCode.length > 6 ? (
            <Button
              type="button"
              $noIcon
              $isAppointment
              onClick={handleNavigateAppointmentClient}
            ></Button>
          ) : null}
        </ContentHeaderImg>
      </ContainerHeader>

      <div style={{ paddingLeft: "1.5rem" }}>
        <h3 style={{ color: "#2c2c2c", marginTop: "6.25rem" }}>
          Histórico de Agendamentos
        </h3>
        <S.ContainerClient>
          {data.length > 0 ? (
            data
              .sort(
                (a, b) =>
                  new Date(b.appointmentDate).getTime() -
                  new Date(a.appointmentDate).getTime()
              )
              .map((item, index) => (
                <S.WrapperHomeClient key={index}>
                  <Card
                    type="homeClient"
                    history
                    data={item}
                    handleNavigateAppointment={() =>
                      handleNavigateAppointmentClientStoreCode(item.storeCode)
                    }
                  />
                </S.WrapperHomeClient>
              ))
          ) : (
            <p>Sem agendamentos</p>
          )}
        </S.ContainerClient>
      </div>

      {/* <div style={{paddingLeft: "1.5rem"}}>
        <h2 style={{ color: "#2c2c2c", marginTop: "2.25rem" }}>
          Histórico de Avaliações
        </h2>
        <S.ContainerClient>
          {data.length > 0 ? (
            data.map((item, index) => (
              <S.WrapperHomeClient key={index}>
                <Card type="homeClient" rating data={item} />
              </S.WrapperHomeClient>
            ))
          ) : (
            <p>Sem Avaliações</p>
          )}
        </S.ContainerClient>
      </div> */}
    </ContainerPage>
  );
};

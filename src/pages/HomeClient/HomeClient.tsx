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
import { getStoreById } from "../../services/StoreServices";
import { capitalizeFirstLetter } from "../../services/system/globalService";
import Button from "../../components/Button/Button";
import homeClient from "../../assets/homeClient.svg";
import { ContainerHeader, ContainerPage, ContentHeader, ContentHeaderImg, SubTitle, Title } from "../Styles/_Page.styles";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const HomeClient = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const authToken = context?.authToken;

  const [decodedData, setDecodedData] = useState<DecodedToken | null>(null);
  const [data, setData] = useState<any[]>([]);

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
      if (decodedData?.userId) {
        try {
          const responseAppointments = await getAppointmentByClienteId(
            parseFloat(decodedData.userId)
          );

          if (!responseAppointments || responseAppointments.length === 0)
            return;
          const appointmentsWithDetails = await Promise.all(
            responseAppointments.map(async (appointment: Appointment) => {
              const responseEmployee = await getEmployeeById(
                appointment.employeeId
              );
              const responseUser = await getUserById(responseEmployee.id);
              const responseStore = await getStoreById(appointment.storeId);
              const services = await Promise.all(
                appointment.serviceIds.map(async (serviceId) => {
                  return await getServiceTypeById(serviceId);
                })
              );

              const totalPrice = services.reduce(
                (sum, service) => sum + (service?.data.value || 0),
                0
              );

              return {
                storeName: responseStore.name,
                storeCode: responseStore.storeCode,
                appointmentDate: appointment.appointmentDate,
                appointmentTime: appointment.appointmentTime,
                employeeName: `${capitalizeFirstLetter(
                  responseUser.name
                )} ${capitalizeFirstLetter(responseUser.lastName)}`,
                services: services.map((service) => ({
                  name: service?.data.name,
                })),
                totalPrice,
              };
            })
          );

          setData(appointmentsWithDetails);
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      }
    };

    fetchData();
  }, [decodedData]);

  const handleNavigateAppointmentClient = () => {
    navigate(`/appointment-client/:`);
  };

  const handleNavigateAppointmentClientStoreCode = (storeCode: string) => {
    const encodedStoreCode = encodeURIComponent(storeCode); 
    navigate(`/appointment-client/${encodedStoreCode}`);
  };

  return (
    <ContainerPage>
      <ContainerHeader>
        <ContentHeader align="start">
          <Title>
            Bem Vindo! <br />
            Store Name <span>#001</span>
          </Title>
          <SubTitle>
            Gerencie seus compromissos com facilidade! Aqui, você pode acessar
            seus históricos de agendamentos e avaliações, além de realizar novas
            avaliações e agendamentos sempre que precisar.
          </SubTitle>
          <Button
            type="button"
            $noIcon
            $isAppointment
            onClick={handleNavigateAppointmentClient}
          ></Button>
        </ContentHeader>
         <ContentHeaderImg  align="end">
          <img
            src={homeClient}
            alt="Home Cliente"
            width="400px"
            height="400px"
          />
        </ContentHeaderImg>
      </ContainerHeader>

      <S.ContainerCarouselHomeClient>
        <h2 style={{ color: "#2c2c2c" }}>Histórico de Agendamentos</h2>
        <S.StyledCarousel
          indicators={false}
          interval={null}
          controls={true}
          slide={false}
        >
          {data.map((_, index) => {
            if (index % 3 === 0) {
              return (
                <Carousel.Item key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "60px",
                    }}
                  >
                    {data.slice(index, index + 3).map((item, subIndex) => (
                      <S.WrapperHomeClient key={subIndex}>
                        <Card
                          type="homeClient"
                          history
                          data={item}
                          handleNavigateAppointment={() =>
                            handleNavigateAppointmentClientStoreCode(
                              item.storeCode
                            )
                          }
                        />
                      </S.WrapperHomeClient>
                    ))}
                  </div>
                </Carousel.Item>
              );
            }
            return null;
          })}
        </S.StyledCarousel>
      </S.ContainerCarouselHomeClient>

      <S.ContainerCarouselHomeClient>
        <h2 style={{ color: "#2c2c2c" }}>Histórico de Avaliações</h2>
        <S.StyledCarousel
          indicators={false}
          interval={null}
          controls={true}
          slide={false}
        >
          {data.map((_, index) => {
            if (index % 3 === 0) {
              return (
                <Carousel.Item key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "67px",
                    }}
                  >
                    {data.map((item, index) => (
                      <S.WrapperHomeClient key={index}>
                        <Card type="homeClient" rating data={item} />
                      </S.WrapperHomeClient>
                    ))}
                  </div>
                </Carousel.Item>
              );
            }
            return null;
          })}
        </S.StyledCarousel>
      </S.ContainerCarouselHomeClient>
    </ContainerPage>
  );
};

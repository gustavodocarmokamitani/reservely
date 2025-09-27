import * as S from "./HomeClient.styles";
import Card from "../../components/Card/Card";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { DecodedToken } from "../../models/DecodedToken";
import { decodeToken } from "../../services/AuthService";
import { Appointment } from "../../models/Appointment";
import {
  getAppointmentByClienteId,
  getAppointmentHistoryById,
} from "../../services/AppointmentServices";
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
import { ClientAppointmentHistoryDTO } from "../../models/ClientAppointmentHistoryDTO";

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
      // Validação inicial do ID do usuário
      if (!decodedData?.userId) {
        console.warn("decodedData.userId está ausente ou inválido.");
        return;
      }

      try {
        const userId = parseFloat(decodedData.userId);

        if (isNaN(userId)) {
          console.error("userId não é um número válido:", decodedData.userId);
          return;
        }

        // 1. CHAME APENAS O NOVO ENDPOINT OTIMIZADO!
        // O getAppointmentHistoryById faz uma única chamada para buscar todos os detalhes.
        const response = await getAppointmentHistoryById(userId); 
        
        // Certifique-se de que a resposta é um array e tem dados
        if (!response || response.length === 0) {
          console.warn(
            "Nenhum histórico de agendamento detalhado encontrado para o usuário:",
            userId
          );
          setData([]); // Limpa os dados, se necessário
          return;
        }

        // Os dados já vêm prontos e agregados, basta atribuí-los
        // O backend já fez:
        // - Busca de todos os agendamentos
        // - Agregação de dados do Cliente/Funcionário/Loja/Status
        // - Cálculo do Preço Total
        // - Inclusão dos nomes dos serviços

        // Se você precisa que o nome do funcionário esteja capitalizado (Primeira Letra Maiúscula),
        // você deve fazer isso no frontend, pois a resposta do backend é apenas a string.

        const appointmentsReady = response.map(
          (appointment: ClientAppointmentHistoryDTO) => {
            // Se a capitalização de nome/sobrenome for necessária, faça aqui:
            // Ex: Se o nome vier como "maria silva" e você quer "Maria Silva"
            // O backend já retornou EmployeeName no formato "Nome Sobrenome"

            // O backend também já retornou o campo appointmentStatus como string (ex: "Finalizado")

            return {
              storeName: appointment.storeName,
              storeCode: appointment.storeCode,
              appointmentDate: appointment.appointmentDate,
              appointmentTime: appointment.appointmentTime,
              appointmentStatus: appointment.appointmentStatus, // Já é o nome do status
              employeeName: appointment.employeeName, // Já está no formato "Nome Sobrenome"
              services: appointment.services.map((s) => ({ name: s.name })), // Mapeia para o formato que você usava antes
              professionalNumber: appointment.professionalPhoneNumber,
              totalPrice: appointment.totalPrice,
            };
          }
        );

        setData(appointmentsReady);

        // Se você ainda precisa do storeCode para outra lógica,
        // pode buscar a Store Active no bloco try acima se for o caso:
        if (storeCode && storeCode !== ":") {
          const responseStoreActive = await getStoreByStoreCode(storeCode);
          setStoreActive(responseStoreActive);
        }
      } catch (error) {
        console.error(
          "Erro geral ao buscar o histórico de agendamentos:",
          error
        );
        // Dependendo da necessidade, você pode lançar o erro novamente ou apenas logar.
      }
    };

    fetchData();
  }, [decodedData, storeCode, getStoreByStoreCode, setData, setStoreActive]); // Adicione as dependências do useState

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

      <div style={{ paddingLeft: "1.5rem", marginBottom: "5rem" }}>
        <h3 style={{ color: "#2c2c2c", marginTop: "1.25rem" }}>
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

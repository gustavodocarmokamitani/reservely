import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Col, Row } from "react-bootstrap";

import { decodeToken } from "../services/AuthService";
import { getStoreById } from "../services/StoreServices";

import { Store as StoreModel } from "../models/Store";

import HeaderTitle from "../view/HeaderTitle";
import Button from "../components/Button";
import CardStatus from "../components/Card/StatusCard";
import CardHorario from "../components/Card/TimeCard";
import CardDiaSemana from "../components/Card/WeekDayCard";
import CardDiaFechamento from "../components/Card/ClosingDateCard";

import * as S from "./Store.styles";

import { ContainerPage } from "./_Page.styles";

interface DecodedToken {
  userId: string;
  userEmail: string;
  userRole: string;
}

function Store() {
  const navigate = useNavigate();
  const [store, setStore] = useState<StoreModel | undefined>();
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const storedToken = localStorage.getItem("authToken");
  const [decodedData, setDecodedData] = useState<DecodedToken>();

  const storeUser = Number(localStorage.getItem("storeUser"));

  const fetchData = async () => {
    try {
      if (storedToken) {
        const data = await decodeToken(storedToken);
        setDecodedData(data);
      }
      const response = await getStoreById(storeUser);
      if (response) {
        setStore(response);
        const horariosArray = response.operatingHours
          ? response.operatingHours.split(" - ")
          : [];
        setSelectedTimes(horariosArray);
      }
    } catch (error) {
      console.error("Erro ao buscar dados da loja:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleButtonClick = () => {
    navigate("/store-configure");
  };

  return (
    <ContainerPage style={{ height: "100vh" }}>
      <Row>
        <Col md={7} style={{ padding: "0px" }}>
          <HeaderTitle
            title="Store"
            subTitle="Área destinada para gerenciamento da store."
          />
        </Col>

        <Col
          md={5}
          className="d-flex flex-row justify-content-end align-items-center"
        >
          {decodedData?.userRole === "Admin" && (
            <Button $isConfigure onClick={handleButtonClick} type="button" />
          )}
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h3 style={{ margin: "20px 0 25px 0" }}>Dados da store</h3>
          <S.CardStoreWrapper className="d-flex justify-content-start align-items-center">
            <CardStatus data={store} title="Status" icon="confirm" />
            {store?.operatingHours && store.operatingHours.length > 0 ? (
              <>
                <CardHorario
                  selectedTimes={selectedTimes}
                  title="Hora de abertura"
                  icon="calendar"
                />
                <CardHorario
                  selectedTimes={selectedTimes}
                  title="Hora de fechamento"
                  icon="calendar"
                />
              </>
            ) : (
              <p>Não há dias de funcionamento cadastrados.</p>
            )}
          </S.CardStoreWrapper>

          {store?.operatingDays && store.operatingDays.length > 0 ? (
            <>
              <h3 style={{ margin: "20px 0 25px 0" }}>Dias de funcionamento</h3>
              <S.CardStoreWrapper className="d-flex justify-content-start align-items-center flex-wrap">
                {store.operatingDays.map((day, index) => (
                  <CardDiaSemana key={index} text={day} icon="confirm" />
                ))}
              </S.CardStoreWrapper>
            </>
          ) : (
            <p>Não há dias de funcionamento cadastrados.</p>
          )}

          {store?.closingDays && store.closingDays.length > 0 ? (
            <>
              <h3 style={{ margin: "20px 0 25px 0" }}>Dias de fechamento</h3>
              <S.CardStoreWrapper className="d-flex justify-content-start align-items-center flex-wrap">
                {store.closingDays
                  .sort(
                    (a: string, b: string) =>
                      new Date(a).getTime() - new Date(b).getTime()
                  ) // Ordena as datas
                  .map((day, index) => {
                    const formattedData = new Date(day).toLocaleDateString(
                      "pt-BR",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    );
                    return (
                      <CardDiaFechamento
                        key={index}
                        text={formattedData}
                        icon="confirm"
                      />
                    );
                  })}
              </S.CardStoreWrapper>
            </>
          ) : (
            <p>Não há dias de fechamento cadastrados.</p>
          )}
        </Col>
      </Row>
    </ContainerPage>
  );
}

export default Store;

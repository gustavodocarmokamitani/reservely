import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import HeaderTitle from "../../view/HeaderTitle/HeaderTitle";
import Button from "../../components/Button/Button";
import * as S from "./Store.styles";
import { ContainerPage } from "../Styles/_Page.styles";
import Card from "../../components/Card/Card";
import { useStateCustom } from "../../hooks/Store/useStateCustom";
import { useFetch } from "../../hooks/Store/useFetch";
import Loading from "../../components/Loading/loading";

function Store() {
  const navigate = useNavigate();
  const storeUser = Number(localStorage.getItem("storeUser"));

  const {
    store,
    setStore,
    selectedTimes,
    setSelectedTimes,
    decodedData,
    setDecodedData,
    isLoading,
    setIsLoading,
  } = useStateCustom();

  useFetch(storeUser, setDecodedData, setStore, setSelectedTimes, setIsLoading);

  const handleButtonClick = () => {
    navigate("/store-configure");
  };

  return (
    <>
      {isLoading && <Loading />}
      <ContainerPage style={{ height: "100vh" }}>
        <Row>
          <Col lg={12} xl={7} style={{ padding: "0px" }}>
            <HeaderTitle
              title={`${store?.name}`}
              subTitle="Área destinada para gerenciamento da loja."
            />
          </Col>

          <Col
            lg={12}
            xl={5}
            className="d-flex flex-row justify-content-md-center justify-content-lg-end align-items-center mt-md-3 mt-lg-5 mt-xl-0"
          >
            {decodedData?.userRole === "Admin" && (
              <Button $isConfigure onClick={handleButtonClick} type="button" />
            )}
          </Col>         
        </Row>
        <Row>
          <Col md={12}>
            <h3 style={{ margin: "20px 0 25px 0" }}>Dados da loja</h3>
            <S.CardStoreWrapper className="d-flex justify-content-start align-items-center">
              <Card
                type="status"
                statusStore={store?.status}
                title="Status"
                icon="confirm"
              />
              {store?.operatingHours && store.operatingHours.length > 0 ? (
                <>
                  <Card
                    type="time"
                    selectedTimes={selectedTimes}
                    title="Hora de abertura"
                    icon="calendar"
                  />
                  <Card
                    type="time"
                    selectedTimes={selectedTimes}
                    title="Hora de fechamento"
                    icon="calendar"
                  />
                </>
              ) : (
                <p></p>
              )}
            </S.CardStoreWrapper>

            {store?.operatingDays &&
            store.operatingDays.length > 0 &&
            store.operatingDays[0] !== "" ? (
              <>
                <h3 style={{ margin: "20px 0 25px 0" }}>
                  Dias de funcionamento
                </h3>
                <S.CardStoreWrapper className="d-flex justify-content-start align-items-center flex-wrap">
                  {store.operatingDays.map((day, index) => (
                    <Card
                      type="weekDay"
                      key={index}
                      text={day}
                      icon="confirm"
                    />
                  ))}
                </S.CardStoreWrapper>
              </>
            ) : (
              <p></p>
            )}

            {store?.closingDays &&
            store.closingDays.length > 0 &&
            store.closingDays[0] !== "" ? (
              <>
                <h3 style={{ margin: "20px 0 25px 0" }}>Dias de fechamento</h3>
                <S.CardStoreWrapper className="d-flex justify-content-start align-items-center flex-wrap">
                  {store.closingDays
                    .sort(
                      (a: string, b: string) =>
                        new Date(a).getTime() - new Date(b).getTime()
                    )
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
                        <Card
                          type="closingDate"
                          key={index}
                          text={formattedData}
                          icon="confirm"
                        />
                      );
                    })}
                </S.CardStoreWrapper>
              </>
            ) : (
              <p></p>
            )}
          </Col>
        </Row>
      </ContainerPage>
    </>
  );
}

export default Store;

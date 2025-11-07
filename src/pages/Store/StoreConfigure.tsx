import * as S from "./Store.styles";
import * as P from "../Styles/_Page.styles";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import SelectDataPicker from "../../components/Select/SelectDataPicker";
import Select from "../../components/Select/Select";
import Card from "../../components/Card/Card";
import { useStateCustom } from "../../hooks/StoreConfigure/useStateCustom";
import { useFetch } from "../../hooks/StoreConfigure/useFetch";
import { useAction } from "../../hooks/StoreConfigure/useAction";
import { useEffectCustom } from "../../hooks/StoreConfigure/useEffectCustom";
import Loading from "../../components/Loading/loading";

import homeClient from "../../assets/homeClient.svg";
import { Row } from "react-bootstrap";
import UserMenu from "../../components/UserMenu/UserMenu";

function StoreConfigure() {
  const storeUser = Number(localStorage.getItem("storeUser"));

  const {
    formValuesStore,
    setFormValuesStore,
    store,
    setStore,
    selectedTimes,
    setSelectedTimes,
    selectedTimesSelect,
    setSelectedTimesSelect,
    openingWeekDay,
    setOpeningWeekDay,
    openingWeekDaySelect,
    setOpeningWeekDaySelect,
    closingDates,
    setClosingDates,
    statusStore,
    setStatusStore,
    multipleAppointments,
    setMultipleAppointments,
    optionsTime,
    setOptionsTime,
    isLoading,
    setIsLoading,
    optionsWeekDay,
  } = useStateCustom();

  const { generateTimeOptions } = useFetch(
    storeUser,
    setStore,
    setFormValuesStore,
    setStatusStore,
    setMultipleAppointments,
    selectedTimes,
    setSelectedTimes,
    openingWeekDay,
    setOpeningWeekDay,
    closingDates,
    setClosingDates,
    setIsLoading
  );

  const {
    handleSubmit,
    handleInputChangeStore,
    handleSetDatesFromPicker,
    handleRemoveDataClosed,
    handleRemoveDateClosed,
    handleButtonClick,
  } = useAction(
    store,
    selectedTimes,
    closingDates,
    setClosingDates,
    openingWeekDay,
    setOpeningWeekDay,
    formValuesStore,
    setFormValuesStore,
    setStatusStore,
    setMultipleAppointments,
    setIsLoading
  );

  useEffectCustom(
    openingWeekDaySelect,
    selectedTimesSelect,
    setOpeningWeekDay,
    generateTimeOptions,
    setOptionsTime,
    setSelectedTimes
  );

  return (
    <>
      {isLoading && <Loading />}
      <P.ContainerPage style={{ height: "100%" }}>
        <UserMenu />
        <P.ContainerHeader>
          <P.ContentHeader align="start">
            <P.Title>Configuração da Loja</P.Title>
            <P.SubTitle>Área destinada para gerenciamento da loja.</P.SubTitle>
          </P.ContentHeader>
          <P.ContentHeaderImg align="end">
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                flexDirection: `${window.innerWidth <= 768 ? "column" : "row"}`,
                margin: "25px 0 0 0",
              }}
            >
              {window.innerWidth <= 768 ? (
                <>
                  <div style={{ marginBottom: "15px" }}>
                    <Button $isConfirm onClick={handleSubmit} type="button" />
                  </div>
                  <Button $isBack onClick={handleButtonClick} type="button" />
                </>
              ) : (
                <>
                  <div style={{ marginBottom: "15px" }}>
                    <Button $isBack onClick={handleButtonClick} type="button" />
                  </div>
                  <Button $isConfirm onClick={handleSubmit} type="button" />
                </>
              )}
            </div>
          </P.ContentHeaderImg>
        </P.ContainerHeader>
        <Row>
          <S.Store>
            <S.StoreSectionOne>
              <S.StoreContainer>
                <S.StoreContent>
                  <p>Name</p>
                  <Input
                    type="text"
                    name="name"
                    value={formValuesStore.name}
                    onChange={handleInputChangeStore}
                  />
                </S.StoreContent>
                <S.StoreContent>
                  <p>Código da Loja</p>
                  <Input
                    type="text"
                    name="storeCode"
                    value={formValuesStore.storeCode}
                    onChange={handleInputChangeStore}
                  />
                </S.StoreContent>
                <S.StoreContent>
                  <p>Loja</p>
                  <Input
                    type="toggle"
                    name="active"
                    value={formValuesStore.active.toString()}
                    onChange={handleInputChangeStore}
                  />
                </S.StoreContent>
                <S.StoreContent>
                  <p>Múltiplos agendamentos </p>
                  {multipleAppointments === true && (
                    <div style={{ padding: "0 0 15px 0" }}>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "red",
                        }}
                      >
                        * Habilitar "Múltiplos Agendamentos" permitirá que
                        vários <br />
                        agendamentos sejam feitos para o mesmo horário.
                      </span>
                    </div>
                  )}
                  <Input
                    type="toggle"
                    name="multipleAppointments"
                    value={formValuesStore.multipleAppointments.toString()}
                    onChange={handleInputChangeStore}
                  />
                </S.StoreContent>
                <S.StoreContent>
                  <p>Horários de funcionamento</p>
                  <Select
                    setData={setSelectedTimesSelect}
                    value={selectedTimesSelect}
                    options={optionsTime}
                    placeholder={`Selecione até 2 horários`}
                    isMulti
                    maxSelections={2}
                  />
                </S.StoreContent>
                <S.StoreContent>
                  <p>Dias de funcionamento</p>
                  <Select
                    setData={setOpeningWeekDaySelect}
                    value={openingWeekDaySelect}
                    options={optionsWeekDay}
                    placeholder={`Selecione até ${optionsWeekDay.length} dias`}
                    isMulti
                  />
                </S.StoreContent>
                <S.StoreContent>
                  <p>Dias sem atendimento</p>
                  <SelectDataPicker
                    type="store"
                    setDate={handleSetDatesFromPicker}
                    isClearable
                    operatingDays={[]}
                    closedDates={(closingDates ?? []).map(
                      (date) => date.toISOString().split("T")[0]
                    )}
                  />
                </S.StoreContent>
              </S.StoreContainer>
            </S.StoreSectionOne>

            <S.StoreSectionTwo>
              {window.innerWidth > 768 ? (
                <>
                  <h3 style={{ margin: "50px 0 25px 0" }}>Dados da loja</h3>
                  <S.CardStoreWrapper className="d-flex justify-content-start align-items-center">
                    <Card
                      type="status"
                      statusStore={statusStore}
                      title="Status"
                      icon="confirm"
                    />
                    <Card
                      type="status"
                      statusStore={multipleAppointments}
                      title="Múltiplos Agendamentos"
                      icon="confirm"
                    />
                    {store?.operatingHours &&
                    store?.operatingHours.length > 0 ? (
                      <>
                        <Card
                          type="time"
                          selectedTimes={selectedTimes}
                          title="Abertura"
                          icon="confirm"
                        />
                        {selectedTimes[1] !== undefined && (
                          <Card
                            type="time"
                            selectedTimes={selectedTimes}
                            title="Fechamento"
                            icon="confirm"
                          />
                        )}
                      </>
                    ) : (
                      <p></p>
                    )}
                  </S.CardStoreWrapper>

                  <h3 style={{ margin: "50px 0 25px 0" }}>
                    Dias de funcionamento
                  </h3>
                  {store?.operatingDays?.some(
                    (day) => day.toString().trim() !== ""
                  ) ||
                  openingWeekDay?.some(
                    (day) => day && day.trim().length > 0
                  ) ? (
                    <>
                      <S.CardStoreWrapper className="d-flex justify-content-start align-items-center flex-wrap">
                        {openingWeekDay.map((item: any) => (
                          <div style={{ margin: "0 10px 0 0" }}>
                            <Card
                              type="weekDay"
                              key={item}
                              text={item}
                              icon="remove"
                              onRemove={() => handleRemoveDateClosed(item)}
                            />
                          </div>
                        ))}
                      </S.CardStoreWrapper>
                    </>
                  ) : (
                    <p></p>
                  )}
                </>
              ) : null}
              <h3
                style={{
                  margin:
                    window.innerWidth < 768 ? "0 0 25px 0" : "50px 0 25px 0",
                }}
              >
                Dias de fechamento
              </h3>
              <S.CardStoreWrapper className="mb-5 d-flex justify-content-start align-items-center flex-wrap">
                {closingDates && closingDates.length > 0 ? (
                  closingDates.map((item: Date) => (
                    <div style={{ width: "290px", marginRight: "25px" }}>
                      <Card
                        type="closingDate"
                        key={item.toISOString()}
                        text={item.toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                        icon="remove"
                        onRemove={() => handleRemoveDataClosed(item)}
                      />
                    </div>
                  ))
                ) : (
                  <p></p>
                )}
              </S.CardStoreWrapper>
            </S.StoreSectionTwo>
          </S.Store>
        </Row>
      </P.ContainerPage>
    </>
  );
}

export default StoreConfigure;

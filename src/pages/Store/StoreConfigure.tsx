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
      <P.ContainerPage style={{ height: "100vh" }}>
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
                margin: "25px 0 0 0",
              }}
            >
              <Button $isBack onClick={handleButtonClick} type="button" />
              <Button $isConfirm onClick={handleSubmit} type="button" />
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
                    width={`${window.innerWidth > 1680 ? "350" : "285"}`}
                  />
                </S.StoreContent>
                <S.StoreContent>
                  <p>Loja</p>
                  <Input
                    type="toggle"
                    name="active"
                    value={formValuesStore.active.toString()}
                    onChange={handleInputChangeStore}
                    width={`${window.innerWidth > 1680 ? "350" : "285"}`}
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
                  <p>Datas de fechamento</p>
                  <SelectDataPicker
                    type="store"
                    setDate={setClosingDates}
                    isClearable
                    operatingDays={[]}
                    closedDates={[]}
                  />
                </S.StoreContent>
              </S.StoreContainer>
            </S.StoreSectionOne>

            <S.StoreSectionTwo>
              <h3 style={{ margin: "50px 0 25px 0" }}>Dados da loja</h3>
              <S.CardStoreWrapper className="d-flex justify-content-start align-items-center">
                <Card
                  type="status"
                  statusStore={statusStore}
                  title="Status"
                  icon="confirm"
                />
                {store?.operatingHours && store?.operatingHours.length > 0 ? (
                  <>
                    <Card
                      type="time"
                      selectedTimes={selectedTimes}
                      title="Hora de abertura"
                      icon="confirm"
                    />
                    <Card
                      type="time"
                      selectedTimes={selectedTimes}
                      title="Hora de fechamento"
                      icon="confirm"
                    />
                  </>
                ) : (
                  <p></p>
                )}
              </S.CardStoreWrapper>

              <h3 style={{ margin: "50px 0 25px 0" }}>Dias de funcionamento</h3>
              {store?.operatingDays?.some(
                (day) => day.toString().trim() !== ""
              ) ||
              openingWeekDay?.some((day) => day && day.trim().length > 0) ? (
                <>
                  <S.CardStoreWrapper className="d-flex justify-content-start align-items-center flex-wrap">
                    {openingWeekDay.map((item: any) => (
                      <Card
                        type="weekDay"
                        key={item}
                        text={item}
                        icon="remove"
                        onRemove={() => handleRemoveDateClosed(item)}
                      />
                    ))}
                  </S.CardStoreWrapper>
                </>
              ) : (
                <p></p>
              )}

              <h3 style={{ margin: "50px 0 25px 0" }}>Dias de fechamento</h3>
              <S.CardStoreWrapper className="d-flex justify-content-start align-items-center flex-wrap">
                {closingDates && closingDates.length > 0 ? (
                  closingDates.map((item: Date) => (
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

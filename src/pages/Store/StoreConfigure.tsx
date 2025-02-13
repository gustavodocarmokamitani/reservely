import React, { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { Col, Row } from "react-bootstrap";

import { getStoreById, updateStore } from "../../services/StoreServices";
import { Store, Store as StoreModel } from "../../models/Store";

import * as S from "./Store.styles";
import { ContainerPage } from "../Styles/_Page.styles";

import HeaderTitle from "../../view/HeaderTitle/HeaderTitle";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import CardStatus from "../../components/Card/StatusCard";
import TimeCard from "../../components/Card/TimeCard"; 
import WeekDayCard from "../../components/Card/WeekDayCard";
import ClosingDateCard from "../../components/Card/ClosingDateCard";
import SelectDataPicker from "../../components/Select/SelectDataPicker";
import Select from "../../components/Select/Select";
import { SelectOption } from "../../models/SelectOptions";

function StoreConfigure() {
  const navigate = useNavigate();
  const [formValuesStore, setFormValuesStore] = useState<{
    name: string;
    active: boolean;
  }>({
    name: "",
    active: false,
  });
  const [store, setStore] = useState<StoreModel | undefined>();
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [selectedTimesSelect, setSelectedTimesSelect] = useState<SelectOption[]>([]);
  const [openingWeekDay, setOpeningWeekDay] = useState<string[]>([]);  
  const [openingWeekDaySelect, setOpeningWeekDaySelect] = useState<SelectOption[]>([]);
  const [closingDates, setClosingDates] = useState<Date[] | null>([]);
  const [statusStore, setStatusStore] = useState<boolean>();

  const [optionsWeekDay] = useState<SelectOption[]>([
    {
      value: 1,
      label: "Segunda",
    },
    {
      value: 2,
      label: "Terça",
    },
    {
      value: 3,
      label: "Quarta",
    },
    {
      value: 4,
      label: "Quinta",
    },
    {
      value: 5,
      label: "Sexta",
    },
    {
      value: 6,
      label: "Sábado",
    },
    {
      value: 7,
      label: "Domingo",
    },
  ]);
  const [optionsTime, setOptionsTime] = useState<SelectOption[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const storeUser = Number(localStorage.getItem("storeUser"));

  const handleInputChangeStore = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, type, checked, value } = event.target;

    setFormValuesStore((prev) => {
      const updatedValues = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      setStatusStore(updatedValues.active);
      return updatedValues;
    });
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await getStoreById(storeUser);
      if (response) {
        setStore(response);

        setFormValuesStore((prev) => ({
          ...prev,
          name: response.name,
          active: response.status,
        }));

        setStatusStore(response.status);

        if (selectedTimes.length === 0 && response.operatingHours) {
          const timeArray = response.operatingHours.split(" - ");
          setSelectedTimes(timeArray);
        }

        if (!openingWeekDay || openingWeekDay.length === 0) {
          const OpeningWeekDayArray = response.operatingDays
            ? response.operatingDays
            : [];
          setOpeningWeekDay(OpeningWeekDayArray);
        }

        if (!closingDates || closingDates.length === 0) {
          const ClosingDatesArray = response.closingDays
            ? response.closingDays
                .map((data: string) => {
                  const date = new Date(data);
                  return isNaN(date.getTime()) ? null : date;
                })
                .filter((date: any) => date !== null)
            : [];

          setClosingDates(
            ClosingDatesArray.sort(
              (a: Date, b: Date) => a.getTime() - b.getTime()
            )
          );
        }
      }
    } catch (error) {
      console.error("Erro na requisição da store", error);
    }
  }, [storeUser, closingDates, openingWeekDay, selectedTimes.length]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async () => {
    if (store) {
      const storeMapped: Store = {
        ...store,
        name: formValuesStore.name,
        status: formValuesStore.active,
        operatingHours: selectedTimes.join(" - "),
        closingDays: closingDates
          ? closingDates
              .filter((data) => data instanceof Date && !isNaN(data.getTime()))
              .map((data) => data.toISOString())
          : [],
        operatingDays: openingWeekDay.map((option) => option),
      };

      try {
        await updateStore(storeMapped.id, storeMapped);
        enqueueSnackbar(`Store editado com sucesso!`, { variant: "success" });

        navigate("/store");
      } catch (error) {
        enqueueSnackbar(`Falha ao editar store com ID ${storeMapped.id}`, {
          variant: "error",
        });
      }
    }
  };

  const handleRemoveDataClosed = (dateToRemove: Date) => {
    setClosingDates((closingDates) => {
      if (closingDates) {
        return closingDates.filter(
          (data) => data.getTime() !== dateToRemove.getTime()
        );
      } else {
        return [];
      }
    });
  };

  const handleRemoveDateClosed = (dayToRemove: string) => {
    setOpeningWeekDay((prevDays) =>
      prevDays.filter((day) => day !== dayToRemove)
    );
  };

  const handleButtonClick = () => {
    navigate("/store");
  };

    useEffect(() => {
      if (openingWeekDaySelect.length > 0) {
        setOpeningWeekDay(openingWeekDaySelect.map(item => item.label))
      }
    }, [openingWeekDaySelect]);

    const generateTimeOptions = () => {
      const times = [];
      for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
          const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
          const time = `${formattedHour}:${formattedMinute}`;
          times.push({ value: parseFloat(time), label: time });
        }
      }
      return times;
    };
  
    useEffect(() => {
      const times = generateTimeOptions();
      setOptionsTime(times);
    }, []);

    useEffect(() => {
      if (selectedTimesSelect.length > 0) {
        setSelectedTimes(selectedTimesSelect.map(item => item.label))
      }
    }, [selectedTimesSelect]);

  return (
    <ContainerPage style={{ height: "100%" }}>
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
          className="d-flex flex-row justify-content-md-center justify-content-lg-end align-items-center  mt-md-3 mt-lg-5 mt-xl-0"
        >
          <Button $isBack onClick={handleButtonClick} type="button" />
          <Button $isConfirm onClick={handleSubmit} type="button" />
        </Col>
      </Row>
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
                  width="300"
                />
              </S.StoreContent>
              <S.StoreContent>
                <p>Loja</p>
                <Input
                  type="toggle"
                  name="active"
                  value={formValuesStore.active.toString()}
                  onChange={handleInputChangeStore}
                  width="300"
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
                {/* <OpeningHoursSelect setTime={setSelectedTimes} /> */}
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
                {/* <OpeningWeekDaysSelect setOpeningWeekDay={setOpeningWeekDay} /> */}
              </S.StoreContent>
              <S.StoreContent>
                <p>Datas de fechamento</p>
                <SelectDataPicker setDate={setClosingDates} isClearable />
              </S.StoreContent>
            </S.StoreContainer>
          </S.StoreSectionOne>

          <S.StoreSectionTwo>
            <h3 style={{ margin: "50px 0 25px 0" }}>Dados da loja</h3>
            <S.CardStoreWrapper className="d-flex justify-content-start align-items-center">
              <CardStatus
                statusStore={statusStore}
                data={store}
                title="Status"
                icon="confirm"
              />
              {store?.operatingHours && store?.operatingHours.length > 0 ? (
                <>
                  <TimeCard
                    selectedTimes={selectedTimes}
                    title="Hora de abertura"
                    icon="confirm"
                  />
                  <TimeCard
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
            openingWeekDay?.some(
              (day) => day && day.trim().length > 0
            ) ? (
              <>
                <S.CardStoreWrapper className="d-flex justify-content-start align-items-center flex-wrap">
                  {openingWeekDay.map((item: any) => (
                    <WeekDayCard
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
                closingDates.map((item: Date, index: number) => (
                  <ClosingDateCard
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
    </ContainerPage>
  );
}

export default StoreConfigure;
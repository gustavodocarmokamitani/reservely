import React, { useRef, useEffect, useState } from "react";
import { Appointment } from "../../models/Appointment";
import { capitalizeFirstLetter } from "../../services/system/globalService";
import * as S from "./TimeAppointment.styles";
import { Store } from "../../models/Store";
import { getServiceTypeById } from "../../services/ServiceTypeServices";

interface TimeAppointmentProps {
  storeData?: Store;
  appointmentData: Record<string, Appointment[]>;
  selectedTime: { date: string; time: string } | null;
  setSelectedTime: (time: { date: string; time: string }) => void;
}

export default function TimeAppointment({
  storeData,
  appointmentData,
  selectedTime,
  setSelectedTime,
}: TimeAppointmentProps) {
  const closingDays = storeData?.closingDays;
  const operatingHours = storeData?.operatingHours;
  const operatingDays = storeData?.operatingDays;
  const [slotsByDate, setSlotsByDate] = useState<
    Record<string, string[]>
  >({});  
  
  const normalizeDayName = (day: string) => {
    day = day.toLowerCase();
    if (day.includes("terça")) return "terça";
    if (day.includes("quinta")) return "quinta";
    if (day.includes("segunda")) return "segunda";
    if (day.includes("quarta")) return "quarta";
    if (day.includes("sexta")) return "sexta";
    if (day.includes("sábado")) return "sábado";
    if (day.includes("domingo")) return "domingo";
    return day;
  };

  function generateNextDays(weeks = 4): Date[] {
    const days: Date[] = [];
    const today = new Date();
    
    const mappedOperatingDays =
      operatingDays?.map((d) => normalizeDayName(d)) || [];

    for (let i = 0; i < weeks * 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const formattedDate = date.toISOString().split("T")[0];

      const mappedClosingDays =
        closingDays?.map((d) => new Date(d).toISOString().split("T")[0]) || [];

      const weekday = normalizeDayName(
        date.toLocaleDateString("pt-BR", { weekday: "long" })
      );

      if (
        mappedOperatingDays.includes(weekday) &&
        !mappedClosingDays.includes(formattedDate)
      ) {
        days.push(date);
      }
    }

    return days;
  }

  async function fetchServiceDuration(serviceId: number): Promise<number> {
    const serviceData = await getServiceTypeById(serviceId);
    return serviceData?.data.durationMinutes || 0;
  }

  async function getOccupiedTimeSlots(
    appointments: Appointment[]
  ): Promise<Set<string>> {
    const occupiedSlots = new Set<string>();

    for (const appointment of appointments) {
      const serviceId = appointment.serviceIds[0];
      const durationMinutes = await fetchServiceDuration(serviceId);

      let remainingMinutes = durationMinutes;
      const startTime = parseTimeToDate(appointment.appointmentTime);
      const current = new Date(startTime);

      while (remainingMinutes > 0) {
        occupiedSlots.add(formatTime(current));
        current.setMinutes(current.getMinutes() + 30);
        remainingMinutes -= 30;
      }
    }

    return occupiedSlots;
  }

  async function generateTimeSlots(
    operatingHours: string,
    appointments: Appointment[]
  ): Promise<string[]> {
    const [start, end] = operatingHours.split(" - ");
    
    const startHour = parseTimeToDate(start);
    var endHour = startHour;
    if(end !== undefined) {
      endHour = parseTimeToDate(end);
    }

    const slots: string[] = [];
    const current = new Date(startHour);

    const occupiedSlots =
      !storeData?.multipleAppointments === true
        ? await getOccupiedTimeSlots(appointments)
        : new Set<string>();

    while (current <= endHour) {
      const timeString = formatTime(current);
      if (!occupiedSlots.has(timeString)) {
        slots.push(timeString);
      }
      current.setMinutes(current.getMinutes() + 30);
    }

    return slots;
  }

  function parseTimeToDate(time: string): Date {
    const [h, m] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(h, m, 0, 0);
    return date;
  }

  function formatTime(date: Date): string {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  const days = generateNextDays(4);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 450;
      container.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    async function calculateAllSlots() {
      const result: Record<string, string[]> = {};
      const todayFormatted = new Date().toISOString().split("T")[0];
      const now = new Date();

      for (const day of days) {
        const formattedDate = day.toISOString().split("T")[0];
        const appointments = appointmentData?.[formattedDate] || [];
        console.log(appointmentData);
        
        let slots = await generateTimeSlots(
          operatingHours ? operatingHours : "",
          appointments
        );

        // Se o dia processado for hoje, filtre os horários
        if (formattedDate === todayFormatted) {
          slots = slots.filter((slot) => {
            const [hours, minutes] = slot.split(":").map(Number);
            const slotDateTime = new Date();
            slotDateTime.setHours(hours, minutes, 0, 0);

            // Retorna apenas os horários que ainda não passaram
            return slotDateTime > now;
          });
        }
        result[formattedDate] = slots;
      }
      setSlotsByDate(result);
    }

    calculateAllSlots();
  }, [appointmentData, operatingHours]);

  return (
    <>
      <h2 className="mt-5 mb-3 px-3">Horários</h2>
      <S.TimeContainer>
        <S.LeftButton onClick={() => scroll("left")}>◀</S.LeftButton>
        <S.RightButton onClick={() => scroll("right")}>▶</S.RightButton>
        <S.TimeContent ref={scrollContainerRef}>
          {days.map((day) => {
            const formattedDate = day.toISOString().split("T")[0];
            const timeSlots = slotsByDate[formattedDate] || [];

            return (
              <S.HeaderColumns
                key={formattedDate}
                selected={selectedTime?.date === formattedDate}
              >
                <S.HeaderTime>
                  <span style={{ color: "white" }}>
                    {capitalizeFirstLetter(
                      day.toLocaleDateString("pt-BR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })
                    )}
                  </span>
                </S.HeaderTime>
                {timeSlots.map((slot) => (
                  <S.TimeSlot
                    key={slot}
                    onClick={() => {
                      setSelectedTime({ date: formattedDate, time: slot });
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",  
                      });
                    }}
                    selected={
                      selectedTime?.date === formattedDate &&
                      selectedTime?.time === slot
                    }
                  >
                    {slot}
                  </S.TimeSlot>
                ))}
              </S.HeaderColumns>
            );
          })}
        </S.TimeContent>
      </S.TimeContainer>
    </>
  );
}
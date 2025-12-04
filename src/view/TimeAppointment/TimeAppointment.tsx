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

  selectedProfessional: number[];
}

export default function TimeAppointment({
  storeData,
  appointmentData,
  selectedTime,
  setSelectedTime,
  selectedProfessional,
}: TimeAppointmentProps) {
  const closingDays = storeData?.closingDays;
  const operatingHours = storeData?.operatingHours;
  const operatingDays = storeData?.operatingDays;
  const [slotsByDate, setSlotsByDate] = useState<Record<string, string[]>>({}); 

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

  function formatLocalISODate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function generateNextDays(weeks = 4): Date[] {
    const days: Date[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const mappedOperatingDays =
      operatingDays?.map((d) => normalizeDayName(d)) || [];

    for (let i = 0; i < weeks * 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const formattedDate = formatLocalISODate(date);

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
    const duration = serviceData?.data.durationMinutes;
    const finalDuration = duration && duration > 0 ? duration : 30;
    return finalDuration;
  }

  async function getOccupiedTimeSlots(
    appointments: Appointment[],
    selectedProfessional: number[]
  ): Promise<Set<string>> {
    const occupiedSlots = new Set<string>();
    
    const activeAppointments = appointments.filter((appointment) => appointment.appointmentStatusId !== 3);
    
    const appointmentsToConsider =
      selectedProfessional.length > 0
        ? activeAppointments.filter((app) =>
            selectedProfessional.includes(app.employeeId || -1)
          )
        : activeAppointments;

    for (const appointment of appointmentsToConsider) {
      if (!appointment.serviceIds || appointment.serviceIds.length === 0)
        continue;

      const serviceId = appointment.serviceIds[0];
      const durationMinutes = await fetchServiceDuration(serviceId);

      let remainingMinutes = durationMinutes;
      const startTime = parseTimeToDate(appointment.appointmentTime);
      const current = new Date(startTime);
      const blockedSlots: string[] = [];

      while (remainingMinutes > 0) {
        const slot = formatTime(current);
        occupiedSlots.add(slot);
        blockedSlots.push(slot);
        current.setMinutes(current.getMinutes() + 30);
        remainingMinutes -= 30;
      }
    }

    return occupiedSlots;
  }

  async function generateTimeSlots(
    operatingHours: string,
    appointments: Appointment[],
    selectedProfessional: number[]
  ): Promise<string[]> {
    const [start, end] = operatingHours.split(" - ");

    const startHour = parseTimeToDate(start);
    var endHour = startHour;
    if (end !== undefined) {
      endHour = parseTimeToDate(end);
    }

    const slots: string[] = [];
    const current = new Date(startHour);

    const occupiedSlots =
      !storeData?.multipleAppointments === true
        ? await getOccupiedTimeSlots(appointments, selectedProfessional)
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

      const todayFormatted = formatLocalISODate(new Date());
      const now = new Date();

      const professionalIds = Array.isArray(selectedProfessional)
        ? selectedProfessional
        : [selectedProfessional].filter(
            (id) => id !== undefined && id !== null
          );

      for (const day of days) {
        const formattedDate = formatLocalISODate(day);

        const appointments: Appointment[] =
          appointmentData?.[formattedDate] || [];

        let slots = await generateTimeSlots(
          operatingHours ? operatingHours : "",
          appointments,
          professionalIds
        );

        if (formattedDate === todayFormatted) {
          slots = slots.filter((slot) => {
            const [hours, minutes] = slot.split(":").map(Number);
            const slotDateTime = new Date();
            slotDateTime.setHours(hours, minutes, 0, 0);

            return slotDateTime > now;
          });
        }
        result[formattedDate] = slots;
      } 
      
      setSlotsByDate(result);
    }

    calculateAllSlots();
  }, [
    JSON.stringify(selectedProfessional),
    appointmentData,
    operatingHours,
    operatingDays,
    closingDays,
  ]);

  return (
    <>
      <h2 className="mt-5 mb-3 px-3">Horários</h2>
      <S.TimeContainer>
        <S.LeftButton onClick={() => scroll("left")}>◀</S.LeftButton>
        <S.RightButton onClick={() => scroll("right")}>▶</S.RightButton>
        <S.TimeContent ref={scrollContainerRef}>
          {days.map((day) => {
            const formattedDate = formatLocalISODate(day);
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

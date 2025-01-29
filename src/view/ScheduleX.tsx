import React, { useEffect, useState, useCallback } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";
import "./ScheduleX.styles.css";
import { getAppointmentByStoreId } from "../services/AppointmentServices";
import { Appointment } from "../models/Appointment";
import moment from "moment";

const ScheduleX = () => {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const storeUser = Number(localStorage.getItem("storeUser"));

  const [events, setEvents] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await getAppointmentByStoreId(storeUser);
      console.log("API Response: ", response);
      const fetchedEvents = response.map((appointment: Appointment) => ({
        id: appointment.id.toString(),
        title: `Serviços: ${appointment.serviceIds.join(", ")}`,
        start: moment(appointment.appointmentDate).format("YYYY-MM-DD"),
        end: moment(appointment.appointmentDate).format("YYYY-MM-DD"),
      }));
      console.log("Mapped Events: ", fetchedEvents);
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  }, [storeUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    console.log("Events State: ", events); 
  }, [events]);

  

  const calendar = useCalendarApp({
    views: [
      createViewMonthGrid(),
      createViewDay(),
      createViewWeek(),
      createViewMonthAgenda(),
    ],
    events: events, 
    plugins: [eventsService],
    locale: "pt-BR",
    defaultView: "monthGrid",
  });

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
};

export default ScheduleX;


// import React, { useEffect, useState } from "react";
// import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
// import {
//   createViewDay,
//   createViewWeek,
//   createViewMonthGrid,
//   createViewMonthAgenda,
// } from "@schedule-x/calendar";
// import { createEventsServicePlugin } from "@schedule-x/events-service";
// import { mergeLocales, translations } from "@schedule-x/translations";
// import "@schedule-x/theme-default/dist/index.css";
// import "./ScheduleX.styles.css";

// const ScheduleX = () => {
//   const eventsService = useState(() => createEventsServicePlugin())[0];

//   const [events, setEvents] = useState([
//     {
//       id: "1",
//       title: "Tarefa 1",
//       start: "2025-02-01",
//       end: "2025-02-01",
//     },
//     {
//       id: "2",
//       title: "Tarefa 2",
//       start: "2025-02-01",
//       end: "2025-02-02",
//     },
//     {
//       id: "3",
//       title: "Tarefa 3",
//       start: "2025-02-02",
//       end: "2025-02-03",
//     },
//   ]);

//   const calendar = useCalendarApp({
//     views: [
//       createViewMonthGrid(),
//       createViewDay(),
//       createViewWeek(),
//       createViewMonthAgenda(),
//     ],
//     events: events,
//     plugins: [eventsService],
//     locale: "pt-BR",
    
//   });

//   useEffect(() => {
//     setTimeout(() => {
//       const fetchedEvents = [
//         {
//           id: "1",
//           title: "Tarefa 1",
//           start: "2025-02-01",
//           end: "2025-02-01",
//         },
//         {
//           id: "2",
//           title: "Tarefa 2",
//           start: "2025-02-02",
//           end: "2025-02-02",
//         },
//       ];

//       setEvents(fetchedEvents);
//     }, 2000);
//   }, []);

//   return (
//     <div style={{ width: "100%", height: "100%" }}>
//       <ScheduleXCalendar calendarApp={calendar} />
//     </div>
//   );
// };

// export default ScheduleX;

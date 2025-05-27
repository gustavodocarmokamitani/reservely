import { useState, useEffect } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
  CalendarEvent,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";
import "@schedule-x/theme-default/dist/index.css";
import "./ScheduleX.styles.css";
import "@schedule-x/theme-shadcn/dist/index.css";

interface ScheduleXProps {
  events: CalendarEvent[];
}

export function ScheduleX({ events }: ScheduleXProps) {
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const [calendarControls] = useState(() => createCalendarControlsPlugin());
  
  const calendar = useCalendarApp({
    views: [
      createViewMonthGrid(),
      createViewWeek(),
      createViewDay(),
      createViewMonthAgenda(),
    ],
    events: events,
    plugins: [eventsService, calendarControls],
    locale: "pt-BR",
    defaultView: "monthGrid",
    theme: "shadcn",
    callbacks: {
      onEventClick: (event) => {
        calendarControls.setDate(event.start.split(" ")[0]);
        calendarControls.setView("day");
      },
    },
  });

  useEffect(() => {}, [calendar]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

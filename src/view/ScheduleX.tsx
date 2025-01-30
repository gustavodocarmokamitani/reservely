import React, { useState } from "react";
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
import "@schedule-x/theme-shadcn/dist/index.css"; 

interface ScheduleXProps {
  events: {
    id: string;
    title: string;
    start: string;
    end: string;
  }[];
}

export function ScheduleX({ events }: ScheduleXProps) {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    views: [
      createViewMonthGrid(),
      createViewWeek(),
      createViewDay(),
      createViewMonthAgenda(),
    ],
    events: events,
    plugins: [eventsService],
    locale: "pt-BR",
    defaultView: "monthGrid",
    theme: 'shadcn',
  });

  console.log("props events", events);  

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

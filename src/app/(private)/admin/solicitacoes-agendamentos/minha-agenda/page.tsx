"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

import { getAulaPersonal } from "@/app/http/agenda/get-aulas";

import PopupModal from "./popup";

type NovoEvento = {
  title: string;
  start: any;
  end: any;
};

export default function Agenda() {
  const [events, setEvents] = useState<NovoEvento[]>([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    async function getAulasAgendada() {
      const idPersonal = localStorage.getItem("id");
      if (!idPersonal) return;

      const response = await getAulaPersonal(idPersonal);
      if (!response) return;

      // Aulas aceitas pelo personal
      const aulasAceitas =
        response.AulaAgendas?.filter((a) => a.status === "aceita").map((a) => ({
          title: a.endereco,
          start: dayjs(a.date_init).toDate(), // corrigido
          end: dayjs(a.date_end).toDate(),   // corrigido
        })) ?? [];

      // Horários desabilitados (PersonalAgendas)
      const horariosDesmarcados =
        response.PersonalAgendas?.map((h) => ({
          title: h.title,
          start: dayjs(h.date_init).toDate(), // corrigido
          end: dayjs(h.date_end).toDate(),   // corrigido
        })) ?? [];

      // Une tudo
      setEvents([...aulasAceitas, ...horariosDesmarcados]);
    }

    getAulasAgendada();
  }, []);

  const onDateClick = (info: { dateStr: string }) => {
    setSelectedDate(info.dateStr);
    setPopupModal(true);
  };

  const addEvento = (evento: NovoEvento) => {

    setEvents((prev) => [
      ...prev,
      {
        title: evento.title,
        start: dayjs(evento.start).toDate(),
        end: dayjs(evento.end).toDate(),
      },
    ]);
  };

  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center text-2xl font-semibold text-text-web">
        Minha Agenda
      </div>

      <span>Selecione os horários que deseja desabilitar</span>

      <div className="overflow-x-auto">
        <div className="h-[500px] min-w-[600px] rounded-[8px] bg-white p-3 text-black shadow-lg">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            allDaySlot={false}
            events={events}
            dateClick={onDateClick}
            locale="pt-br"
            nowIndicator={true}
            editable={false}
            height="460px"
            headerToolbar={{
              right: "today prev,next",
              center: "title",
              left: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
          />

          {popupModal && selectedDate && (
            <PopupModal
              onClose={() => setPopupModal(false)}
              addEvent={addEvento}
              dateTime={selectedDate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

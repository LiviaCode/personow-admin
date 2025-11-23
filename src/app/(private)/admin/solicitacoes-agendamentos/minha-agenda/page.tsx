"use client";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useEffect, useState } from "react";

import { getAulaPersonal } from "@/app/http/agenda/get-aulas";

import PopupModal from "./popup";

type NovoEvento = {
  title: string;
  start: string;
  end: string;
};

export default function Agenda() {
  const [events, setEvents] = useState<NovoEvento[]>([]);

  useEffect(() => {
    async function getAulasAgendada() {
      const idPersonal = localStorage.getItem("id");
      if (!idPersonal) return;

      const response = await getAulaPersonal(idPersonal);
      if (!response) return;

      // Mapeia e filtra os dois tipos de eventos
      const aulasAceitas =
        response.AulaAgendas?.filter((a) => a.status === "aceita").map((a) => ({
          title: a.endereco,
          start: a.date_init,
          end: a.date_end,
        })) ?? [];

      const horariosDesmarcados =
        response.PersonalAgendas?.map((h) => ({
          title: h.title,
          start: h.date_init,
          end: h.date_end,
        })) ?? [];

      // Une todos os eventos de uma vez só
      setEvents([...aulasAceitas, ...horariosDesmarcados]);
    }

    getAulasAgendada();
  }, []);

  const [popupModal, setPopupModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const onDateClick = (info: { dateStr: string }) => {
    console.log("Data clicada:", info.dateStr);
    setSelectedDate(info.dateStr);
    setPopupModal(true);
  };

  const addEvento = (evento: NovoEvento) => {
    console.log("Adicionando evento:", evento);
    setEvents((prev) => [...prev, evento]);
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
            editable={true}
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

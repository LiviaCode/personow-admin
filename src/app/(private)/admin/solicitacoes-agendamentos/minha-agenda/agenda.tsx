'use client'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import React, { useState } from 'react'

import PopupModal from './popup'

type novoEvento = {
  title: string
  start: string
  end: string
}

export default function Agenda() {
  const [events, setEvents] = useState(evento)

  const [popupModal, setPopupModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const onDateClick = (info: { dateStr: string }) => {
    setSelectedDate(info.dateStr)
    setPopupModal(true)
  }

  const addEvento = (evento: novoEvento) => {
    setEvents([evento])
  }

  // const onEventClick = (info) => {
  //   console.log(info);
  // };

  return (
    <div className="space-y-4 p-6">
      <div className="justify- flex items-center text-2xl font-semibold text-text-web">
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
            // eventClick={onEventClick}
            dateClick={onDateClick}
            locale="pt-br"
            nowIndicator={true}
            editable={true}
            height="460px"
            headerToolbar={{
              right: 'today prev,next',
              center: 'title',
              left: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
          />
          {popupModal && (
            <PopupModal
              onClose={() => setPopupModal(false)}
              addEvent={addEvento}
              dateTime={selectedDate}
            ></PopupModal>
          )}
        </div>
      </div>
    </div>
  )
}

// TESTEEE - APAGAR DEPOIS - colocar dados retornado da API
const evento = [{}]

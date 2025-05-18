"use client";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function PersonalAgenda(props: {
  setAgenda: Dispatch<SetStateAction<boolean>>;
}) {
  const [events, setEvents] = useState(evento);
  const [dataSelect, setDataSelect] = useState(
    new Date().toISOString().split("T")[0],
  );

  const onDateClick = (info: { dateStr: string }) => {
    setDataSelect(info.dateStr);
    setEvents([
      {
        title: "",
        start: info.dateStr,
        color: "#f97316", // Laranja (bg e borda)
        textColor: "#ffffff", // Texto branco
      },
    ]);
    console.log(events);
    console.log(dataSelect);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-65">
      <div className="m-5 flex w-full max-w-md flex-col gap-1 rounded-xl bg-white p-6">
        <div className="flex justify-end">
          <button onClick={() => props.setAgenda(false)}>
            <X className="text-orange-500 transition-colors hover:text-orange-600" />
          </button>
        </div>
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <h1 className="text-center text-xl font-semibold text-orange-400">
                Escolha uma data
              </h1>
              <div
                id="calendarAluno"
                className="rounded-lg p-3 text-black shadow-lg"
              >
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  validRange={{
                    start: new Date().toISOString().split("T")[0], // bloqueia dias antes de hoje
                  }}
                  fixedWeekCount={false}
                  events={events}
                  height="auto"
                  dateClick={onDateClick}
                  dayCellClassNames={(arg) =>
                    arg.dateStr === dataSelect ? ["selected-date"] : []
                  }
                  locale="pt-br"
                  nowIndicator={true}
                  editable={true}
                  headerToolbar={{
                    right: "next",
                    center: "title",
                    left: "prev",
                  }}
                />
              </div>
            </CarouselItem>

            <CarouselItem>
              <h1 className="text-center text-xl font-semibold text-orange-400">
                Escolha um horário
              </h1>
              <div className="rounded-lg p-3 text-black shadow-lg">
                <h1 className="text-center text-2xl font-semibold text-orange-500">
                  {dataSelect}
                </h1>
                <div className="grid grid-cols-4 gap-2">
                  {horarios.map((hora) => (
                    <button
                      key={hora}
                      className="rounded px-2 py-1 text-sm font-medium text-gray-800 transition hover:bg-gray-100"
                    >
                      {hora}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex justify-center gap-4 font-bold">
                <button className="rounded-lg bg-purple-900 px-4 py-2 text-white transition hover:bg-purple-800">
                  Confirmar
                </button>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}

const evento = [{}];
const horarios = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
];

// const horariosDisponiveis = ["10:30", "15:00"]; // apenas esses podem ser clicados

"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { getCookie } from "cookies-next";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { createAgenda } from "@/app/http/agenda/create-agenda";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function PersonalAgenda(props: {
  setAgenda: Dispatch<SetStateAction<boolean>>;
  personalId: number;
}) {
  const [events, setEvents] = useState(evento);
  const [dataSelect, setDataSelect] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [horaSelect, setHoraSelect] = useState<string>("");

  // ---------------------------------------------------------
  // CONSOLE LOGS NO INÍCIO PARA DEBUG
  // ---------------------------------------------------------
  useEffect(() => {
    console.log("============== DEBUG AGENDA ==============");
    console.log("Cookie aluno_id:", getCookie("aluno_id"));
    console.log("Cookie aluno_nome:", getCookie("aluno_nome"));
    console.log("Props.personalId RECEBIDO:", props.personalId);
    console.log("==========================================");
  }, []);
  // ---------------------------------------------------------

  const onDateClick = (info: { dateStr: string }) => {
    setDataSelect(info.dateStr);
    setEvents([
      {
        title: "",
        start: info.dateStr,
        color: "#f97316",
        textColor: "#ffffff",
      },
    ]);
  };

  async function confirmarAgendamento() {
    console.log("---- DEBUG CONFIRMAR ----");

    const aluno_id = Number(getCookie("aluno_id"));
    const personal_id = props.personalId;

    console.log("dataSelect:", dataSelect);
    console.log("horaSelect:", horaSelect);
    console.log("aluno_id (cookie):", aluno_id);
    console.log("personal_id (props):", personal_id);

    if (!dataSelect || !horaSelect) {
      alert("Selecione a data e o horário.");
      return;
    }

    if (!aluno_id || !personal_id) {
      console.log("❌ ERRO: aluno_id ou personal_id inválido");
      alert("Erro ao recuperar dados do usuário.");
      return;
    }

    const date_init = `${dataSelect} ${horaSelect}:00`;
    const date_end = calcularFim(horaSelect);

    console.log("date_init:", date_init);
    console.log("date_end:", date_end);

    const payload = {
      title: "Aula",
      date_init,
      date_end,
      aluno_id,
      personal_id,
      status: "pendente",
    };

    console.log("Payload enviado:", payload);

    try {
      const response = await createAgenda(payload);
      console.log("RESPOSTA createAgenda:", response);

      alert("Solicitação enviada!");
      props.setAgenda(false);
    } catch (error) {
      console.log("❌ ERRO AO ENVIAR AGENDAMENTO:", error);
      alert("Erro ao solicitar agendamento");
    }
  }

  function calcularFim(hora: string) {
    const [h, m] = hora.split(":");
    const endHour = String(Number(h) + 1).padStart(2, "0");
    return `${dataSelect} ${endHour}:${m}:00`;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-65">
      <div className="m-5 flex w-full max-w-md flex-col gap-1 rounded-xl bg-white p-6">
        <div className="flex justify-end">
          <button onClick={() => props.setAgenda(false)}>
            <X className="text-orange-500 transition hover:text-orange-600" />
          </button>
        </div>

        <Carousel>
          <CarouselContent>
            {/* SELECT DATE */}
            <CarouselItem>
              <h1 className="text-center text-xl font-semibold text-orange-400">
                Escolha uma data
              </h1>

              <div className="rounded-lg p-3 text-black shadow-lg">
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  validRange={{
                    start: new Date().toISOString().split("T")[0],
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

            {/* SELECT HOUR */}
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
                      onClick={() => setHoraSelect(hora)}
                      className={`rounded px-2 py-1 text-sm font-medium transition ${
                        horaSelect === hora
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-100 text-gray-800"
                      }`}
                    >
                      {hora}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex justify-center">
                <button
                  onClick={confirmarAgendamento}
                  className="rounded-lg bg-purple-900 px-4 py-2 text-white transition hover:bg-purple-800"
                >
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
  "08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30",
  "16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30",
  "20:00","20:30","21:00","21:30",
];

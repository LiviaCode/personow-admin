import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
dayjs.locale("pt-br");

type novoEvento = {
  title: string;
  start: string;
  end: string;
};

type PopupModalProps = {
  onClose: () => void;
  addEvent: (evento: novoEvento) => void;
  dateTime: string | null;
};

export default function PopupModal({
  onClose,
  addEvent,
  dateTime,
}: PopupModalProps) {
  // ESTADOS para inputs
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [diaTodo, setDiaTodo] = useState(false);

  // Atualiza os horários de início e fim quando o dateTime mudar
  useEffect(() => {
    if (dateTime) {
      const data = dayjs(dateTime);
      setHoraInicio(data.format("HH:mm"));
      setHoraFim(data.add(1, "hour").format("HH:mm"));
    }
  }, [dateTime]);

  const data = dayjs(dateTime);
  const dataStr = data.format("D [de] MMMM [de] YYYY");

  const formataData = (hora: string) => {
    const [h, m] = hora.split(":");
    return data.hour(parseInt(h)).minute(parseInt(m)).second(0);
  };

  const confirmarEvento = () => {
    const start = formataData(diaTodo ? "00:00" : horaInicio);
    const end = formataData(diaTodo ? "23:59" : horaFim);

    addEvent({
      title: "Desabilitado",
      start: start.toISOString(),
      end: end.toISOString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-55">
      <div className="m-2 flex w-full max-w-md flex-col gap-1 rounded-xl bg-white p-6 shadow-lg">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <X className="text-orange-500 transition-colors hover:text-orange-600" />
          </button>
        </div>

        <h1 className="text-center text-xl font-semibold text-orange-500">
          {dataStr}
        </h1>
        <p className="text-center text-sm text-gray-500">
          Confirme o horário que deseja desabilitar
        </p>

        <div className="flex flex-col items-center gap-2 p-4">
          <label htmlFor="inicio" className="text-sm font-medium text-gray-700">
            Horário de início:
          </label>
          <input
            id="inicio"
            type="time"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
            disabled={diaTodo}
            className="w-2/3 rounded-md border border-orange-300 p-2 text-center text-gray-700 md:w-1/3"
          />

          <label htmlFor="fim" className="text-sm font-medium text-gray-700">
            Até:
          </label>
          <input
            id="fim"
            type="time"
            value={horaFim}
            onChange={(e) => setHoraFim(e.target.value)}
            disabled={diaTodo}
            className="w-2/3 rounded-md border border-orange-300 p-2 text-center text-gray-700 md:w-1/3"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="allDay"
            type="checkbox"
            checked={diaTodo}
            onChange={(e) => setDiaTodo(e.target.checked)}
            className="accent-orange-500"
          />
          <label htmlFor="allDay" className="text-sm text-gray-700">
            O dia todo
          </label>
        </div>

        <Button
          onClick={confirmarEvento} // Agora chama confirmarEvento para adicionar o evento
          className="mt-2 w-full bg-purple-800 font-semibold text-white transition-colors hover:bg-purple-900"
        >
          Confirmar
        </Button>
      </div>
    </div>
  );
}

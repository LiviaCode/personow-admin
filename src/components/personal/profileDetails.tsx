import { Calendar, ChevronLeft, MessageCircleMore } from "lucide-react";
import Image from "next/image";

export type PersonalProps = {
  nome: string;
  cidade: string;
  profissao: string;
  formacao: string;
  experiencia: string;
  areaAtuacao: string;
  modeloAtendimento: string;
  descricao: string;
  fotoUrl: string; // Pode ser um caminho local ou uma URL externa
};

type ProfileDetailsProps = {
  personal: PersonalProps;
};

export function ProfileDetails({ personal }: ProfileDetailsProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-white">
        <div className="text-center text-xs">
          <Image
            src={personal.fotoUrl}
            alt={`Foto de ${personal.nome}`}
            width={120}
            height={120}
            className="-translate-y-10 rounded-full border-4 border-orange-500 object-cover"
          />
        </div>

        <div className="grid grid-cols-3 items-center text-center text-xs">
          <a href="/alunos/home">
            <ChevronLeft className="h-5 w-5 text-white" />
          </a>
          <div>
            <h1 className="font-bold">{personal.nome}</h1>
            <h2 className="font-semibold text-gray-300">
              {personal.profissao}
            </h2>
            <span>{personal.cidade}</span>
          </div>
        </div>
      </div>
      <div className="mt-5 items-center justify-center text-white">
        <h1>Sobre mim</h1>
        <span>{personal.descricao}</span>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <h2>Formação</h2>
            <span>{personal.formacao}</span>
          </div>
          <div>
            <h2>Experiencia</h2>
            <span>{personal.experiencia}</span>
          </div>
          <div>
            <h2>Área de atuação</h2>
            <span>{personal.areaAtuacao}</span>
          </div>
          <div>
            <h2>Modelo de atendimento</h2>
            <span>{personal.modeloAtendimento}</span>
          </div>
        </div>
        <div className="mt-5 flex w-full flex-col items-center justify-center gap-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-orange-500 p-2 text-orange-500 transition hover:bg-orange-500 hover:text-white">
            <MessageCircleMore size={20} />
            Enviar mensagem
          </button>

          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 p-2 text-white transition hover:bg-orange-600">
            <Calendar size={20} />
            Marcar Reunião
          </button>
        </div>
      </div>
    </>
  );
}

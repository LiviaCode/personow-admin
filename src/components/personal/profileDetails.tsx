"use client";
import { Calendar, ChevronLeft, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import PersonalAgenda from "@/app/(private)/alunos/personal/agenda";
import createChat from "@/app/http/create-chat";
import { getPersonalResponse } from "@/app/http/get-personal";
import { useAlunoContext } from "@/context/AlunoContext";

type ProfileDetailsProps = {
  personal: getPersonalResponse;
};

export function ProfileDetails({ personal }: ProfileDetailsProps) {
  const [openAgenda, setOpenAgenda] = useState(false);
  const { state } = useAlunoContext();
  const router = useRouter();

  async function onSubmit() {
    const NewChat = {
      usuario1_id: Number(state.id),
      tipo_usuario1: "aluno",
      usuario2_id: personal.id,
      tipo_usuario2: "personal",
    };
    try {
      const response = await createChat(NewChat);
      console.log(response);
      // router.push(`/alunos/mensagens/${response.id}`);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col items-center justify-center text-white">
        <div className="text-center text-xs">
          <Image
            src={
              Array.isArray(personal.PersonalFotos) &&
              personal.PersonalFotos.length > 0
                ? `http://localhost:3018/images/${personal.PersonalFotos.at(-1)?.filename}`
                : "/perfil-sem-foto.png"
            }
            alt={`Foto de ${personal.nome}`}
            width={120}
            height={120}
            priority
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
      <div className="mx-auto max-w-sm flex-1 px-4 py-6 text-white">
        <div className="flex-1 overflow-auto">
          <h1>Sobre mim</h1>
          <span className="break-words">{personal.descricao}</span>
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
        </div>
      </div>
      <div className="mx-auto flex w-full flex-col gap-4 md:w-1/3">
        <button
          onClick={onSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-orange-500 p-2 text-orange-500 transition hover:bg-orange-500 hover:text-white"
        >
          <MessageCircleMore size={20} />
          Enviar mensagem
        </button>

        <button
          onClick={() => setOpenAgenda(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 p-2 text-white transition hover:bg-orange-600"
        >
          <Calendar size={20} />
          Marcar Reunião
        </button>
      </div>

      {openAgenda && (
        <PersonalAgenda setAgenda={setOpenAgenda}></PersonalAgenda>
      )}
    </div>
  );
}

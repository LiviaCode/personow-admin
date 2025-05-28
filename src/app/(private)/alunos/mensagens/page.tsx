"use client";
import { useEffect, useState } from "react";

// import getChat from "@/app/http/get-all-chat";
import getAllChat, { GetAllChatResponse } from "@/app/http/get-all-chat";
import { ChatList } from "@/components/chat/chatList";
import { MobileFiltroContainer } from "@/components/FiltroContainer";
import { useAlunoContext } from "@/context/AlunoContext";

export default function PageMensagem() {
  const [chatss, setChats] = useState<GetAllChatResponse[]>([]);
  const { state } = useAlunoContext();
  const id = Number(state.id);
  const tipoUsuario = "aluno";

  useEffect(() => {
    async function fetchPersonals() {
      try {
        const response = (await getAllChat(
          id,
          tipoUsuario,
        )) as GetAllChatResponse[];
        console.log(response);
        setChats(response);
      } catch (error) {
        console.error("Erro ao listar:", error);
      }
    }

    fetchPersonals();
  }, []);
  return (
    <div className="absolute left-0 top-0 z-20 grid h-screen w-full grid-rows-[1fr_6fr] bg-purple-800 md:relative md:z-auto">
      <header className="flex flex-col items-start justify-center px-10 py-5">
        <div className="text-left text-white">
          <p className="text-xs">
            Encontre o melhor profissional que se encaixe com você!
          </p>
        </div>
      </header>
      <div className="overflow-visible rounded-t-[25px] bg-purple-900 p-4">
        <MobileFiltroContainer title="Mensagens">
          <ChatList chats={chats} url="/alunos/mensagens/" />
        </MobileFiltroContainer>
      </div>
    </div>
  );
}

// TESTE - EXCLUIR
const chats = [
  {
    id: "2",
    nome: "Renatinha",
    ultimaMsg:
      "Lorem ipsum dolor sit ametaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.",
  },
  {
    id: "1",
    nome: "Helena ferreira",
    ultimaMsg: "Lorem ipsum dolor sit amet.",
  },
];

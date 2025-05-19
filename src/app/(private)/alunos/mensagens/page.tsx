"use client";
import { useEffect, useState } from "react";

// import getChat from "@/app/http/get-all-chat";
import getAllChat, { GetAllChatResponse } from "@/app/http/get-all-chat";
import { ChatList } from "@/components/chat/chatList";
import { MobileFiltroContainer } from "@/components/FiltroContainer";

export default function PageMensagem() {
  const [chatss, setChats] = useState<GetAllChatResponse[]>([]);
  const id = 1;
  const tipoUsuario = "aluno";

  useEffect(() => {
    async function fetchPersonals() {
      try {
        const response = (await getAllChat(
          id,
          tipoUsuario,
        )) as GetAllChatResponse[];
        setChats(response);
      } catch (error) {
        console.error("Erro ao listar:", error);
      }
    }

    fetchPersonals();
  }, []);
  return (
    <MobileFiltroContainer title="Mensagens">
      <ChatList chats={chats} url="/alunos/mensagens/" />
    </MobileFiltroContainer>
  );
}

// TESTE - EXCLUIR
const chats = [
  {
    id: "2",
    nome: "Renatinha",
    ultimaMsg: "Lorem ipsum dolor sit amet.",
  },
  {
    id: "1",
    nome: "Helena ferreira",
    ultimaMsg: "Lorem ipsum dolor sit amet.",
  },
];

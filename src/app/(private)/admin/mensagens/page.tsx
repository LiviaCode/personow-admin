"use client";
import { useEffect, useState } from "react";

// import getChat from "@/app/http/get-all-chat";
import getAllChat from "@/app/http/chat/get-all-chat";
import { ChatList, chatUsuario } from "@/components/chat/chatList";
import { MobileFiltroContainer } from "@/components/FiltroContainer";
import { usePersonalContext } from "@/context/PersonalContext";

export default function PageMensagem() {
  const [chats, setChats] = useState<chatUsuario[]>([]);
  const { state } = usePersonalContext();
  const tipoUsuario = 2;

  useEffect(() => {
    if (state.id == 0) return;
    async function fetchChats() {
      try {
        const response = await getAllChat(String(state.id), tipoUsuario);
        const responseFormat = response.map((dado) => {
          const mensagem = dado.mensagens[0];
          return {
            id_chat: Number(dado.id),
            ultimaMensagem: mensagem,
            usuario: {
              usuarioFotos: dado.aluno_1.AlunoFotos,
              nome: dado.aluno_1.nome,
            },
            aluno_id: dado.aluno_1.id,
            personal_id: dado.personal_1.id,
            updated_at: dado.updated_at,
            created_at: dado.created_at,
          };
        });
        setChats(responseFormat);
      } catch (error) {
        console.error("Erro ao listar:", error);
      }
    }

    fetchChats();
  }, [state.id]);

  return (
    <MobileFiltroContainer title="Mensagens">
      <ChatList chats={chats} url="/admin/mensagens/" />
    </MobileFiltroContainer>
  );
}

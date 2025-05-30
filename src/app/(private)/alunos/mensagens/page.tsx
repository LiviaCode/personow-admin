"use client";
import { useEffect, useState } from "react";

// import getChat from "@/app/http/get-all-chat";
import getAllChat from "@/app/http/get-all-chat";
import { ChatList, chatUsuario } from "@/components/chat/chatList";
import { MobileFiltroContainer } from "@/components/FiltroContainer";
import { useAlunoContext } from "@/context/AlunoContext";

export default function PageMensagem() {
  const [chats, setChats] = useState<chatUsuario[]>([]);
  const { state } = useAlunoContext();
  const tipoUsuario = 1;

  useEffect(() => {
    if (!state.id) return;
    async function fetchChats() {
      try {
        const response = await getAllChat(state.id, tipoUsuario);
        const responseFormat = response.map((dado) => {
          const mensagem = dado.mensagens[0];

          return {
            id_chat: Number(dado.id),
            ultimaMensagem: mensagem,
            usuario: {
              usuarioFotos: dado.personal_1.PersonalFotos,
              nome: dado.personal_1.nome,
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
    <div className="absolute left-0 top-0 z-20 grid h-screen w-full grid-rows-[1fr_8fr] bg-purple-800 md:relative md:z-auto">
      <header className="flex flex-col items-start justify-center px-10 py-5">
        <h1 className="text-left text-lg font-semibold text-white">
          Mensagens
        </h1>
      </header>
      <div className="overflow-visible rounded-t-[25px] bg-purple-900">
        <MobileFiltroContainer title="">
          <ChatList chats={chats} url="/alunos/mensagens/" />
        </MobileFiltroContainer>
      </div>
    </div>
  );
}

"use client";
import { ChevronLeft, ImageIcon } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

import createMessage, {
  createMessageResponse,
} from "@/app/http/create-message";

import { Mensagem } from "./mensagem";

type ChatScreenProps = {
  messages: createMessageResponse[];
  tipo_usuario: "personal" | "aluno";
  backUrl: string;
};

export function ChatScreen({
  messages,
  tipo_usuario,
  backUrl,
}: ChatScreenProps) {
  // Ordena o vetor pela data, da mais antiga para a mais recente
  const sortedMessages = [...messages].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );
  const [mensagens, setmensagens] = useState(sortedMessages);
  const messageInput = useRef<HTMLInputElement>(null);

  async function handleCreateMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (messageInput.current === null) return;

    const NewMessage = {
      conversa_id: "1",
      remetente_id: "1",
      tipo_remetente: tipo_usuario,
      conteudo: messageInput.current.value,
    };

    try {
      const response = await createMessage(NewMessage);
      setmensagens((prev) => [...prev, response]);

      if (messageInput.current) messageInput.current.value = "";
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  }
  return (
    <div className="flex h-full flex-col justify-between rounded-t-[20px] bg-purple-900 text-white">
      <div className="flex items-center rounded-[20px]">
        <div className="row-span-2 flex w-20 items-center justify-center space-x-2 p-2">
          <Link href={backUrl}>
            <ChevronLeft className="size-5 text-orange-500" />
          </Link>
          <ImageIcon className="size-10 text-gray-300" />
        </div>
        <h2 className="w-60 font-bold">Teste</h2>
      </div>

      <div className="flex-1 overflow-y-auto bg-purple-800 p-3">
        {mensagens.map((msg) => {
          const tipo =
            msg.tipo_remetente === tipo_usuario ? "enviada" : "recebida";
          return (
            <Mensagem
              key={msg.id}
              conteudo={msg.conteudo}
              data={msg.created_at}
              tipo={tipo}
            />
          );
        })}
      </div>

      <div className="rounded-[10px] p-3">
        <form onSubmit={handleCreateMessage}>
          <input
            type="text"
            className="w-full rounded-[8px] border border-secondary-web p-2 text-black focus:outline-none"
            placeholder="Escreva uma mensagem"
            ref={messageInput}
          ></input>
        </form>
      </div>
    </div>
  );
}

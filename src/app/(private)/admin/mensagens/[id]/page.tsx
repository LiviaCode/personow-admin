import { notFound } from "next/navigation";

import getAllmessage from "@/app/http/get-all-message";
import { ChatScreen } from "@/components/chat/chatScreen";

type PageChatProps = {
  params: Promise<{ id: string }>;
};

export default async function PageChat({ params }: PageChatProps) {
  const { id } = await params;
  const [usuarioId, personalId] = id.split("-").map(Number);
  let chat;
  try {
    const response = await getAllmessage(usuarioId, personalId);
    const responseFormat = response[0];
    chat = {
      id_chat: responseFormat.id,
      mensagens: responseFormat.mensagens,
      usuario: {
        id: responseFormat.aluno_1.id,
        nome: responseFormat.aluno_1.nome,
        usuarioFotos: responseFormat.aluno_1.AlunoFotos,
      },
      remetende_id: responseFormat.personal_1.id,
      tipo_rementente: "personal",
      backUrl: "/admin/mensagens/",
      updated_at: responseFormat.updated_at,
      created_at: responseFormat.created_at,
    };
  } catch {
    chat = undefined;
  }
  if (!chat) notFound();

  return <ChatScreen chat={chat} />;
}

import { notFound } from "next/navigation";

import getAllmessage from "@/app/http/get-all-message";
import { ChatScreen } from "@/components/chat/chatScreen";

type PageChatProps = {
  params: Promise<{ id: string }>;
};

export default async function PageChat({ params }: PageChatProps) {
  const { id } = await params;
  let chat;
  try {
    chat = await getAllmessage(id);
  } catch {
    chat = undefined;
  }
  if (!chat || chat?.length === 0) notFound();

  return (
    <ChatScreen
      id={"1"}
      messages={chat}
      tipo_usuario="aluno"
      backUrl="/alunos/mensagens/"
      conversa_id={id}
      remetente_id={"1"}
    ></ChatScreen>
  );
}

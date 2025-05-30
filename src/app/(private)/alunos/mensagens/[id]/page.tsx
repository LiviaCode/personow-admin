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
        id: responseFormat.personal_1.id,
        nome: responseFormat.personal_1.nome,
        usuarioFotos: responseFormat.personal_1.PersonalFotos,
      },
      remetende_id: responseFormat.aluno_1.id,
      tipo_rementente: "aluno",
      backUrl: "/alunos/mensagens/",
      updated_at: responseFormat.updated_at,
      created_at: responseFormat.created_at,
    };
  } catch {
    chat = undefined;
  }
  if (!chat) notFound();

  return (
    <div className="absolute left-0 top-0 z-20 grid h-screen w-full grid-rows-[1fr_8fr] bg-purple-800 md:relative md:z-auto">
      <header className="flex flex-col items-center justify-center px-10 py-5"></header>
      <div className="overflow-visible rounded-t-[25px] bg-purple-900 p-4">
        <ChatScreen chat={chat} />
      </div>
    </div>
  );
}

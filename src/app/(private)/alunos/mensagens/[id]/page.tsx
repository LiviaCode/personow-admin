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
    <div className="absolute left-0 top-0 z-20 grid h-screen w-full grid-rows-[1fr_6fr] bg-purple-800 md:relative md:z-auto">
      <header className="flex flex-col items-start justify-center px-10 py-5">
        <div className="text-left text-white">
          <p className="text-xs">
            Encontre o melhor profissional que se encaixe com você!
          </p>
        </div>
      </header>
      <div className="overflow-visible rounded-t-[25px] bg-purple-900 p-4">
        <ChatScreen
          id={"1"}
          messages={chat}
          tipo_usuario="aluno"
          backUrl="/alunos/mensagens/"
          conversa_id={id}
          remetente_id={"1"}
        ></ChatScreen>
      </div>
    </div>
  );
}

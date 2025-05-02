import { ChatData, ChatScreen } from "@/components/chat/chatScreen";
import { MensagemProps } from "@/components/chat/mensagem";

//Teste --- puxar da api
const mensagen: MensagemProps[] = [
  { texto: "Olá, como vai?", hora: "22:50", tipo: "enviada" },
  { texto: "Estou bem tbm", hora: "22:55", tipo: "recebida" },
];

const chatsData: Record<string, ChatData> = {
  "1235": {
    nome: "Renatinha",
    mensagens: mensagen,
  },
};

export default function PageChat({ params }: { params: { id: string } }) {
  const chat = chatsData[params.id];
  return <ChatScreen chatData={chat} backUrl="/admin/mensagens/" />;
}

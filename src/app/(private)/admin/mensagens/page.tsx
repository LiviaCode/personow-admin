import { ChatList } from "@/components/chat/chatList";
import { MobileFiltroContainer } from "@/components/FiltroContainer";

export default function PageMensagem() {
  return (
    <MobileFiltroContainer title="Mensagens">
      <ChatList chats={chats} url="/alunos/mensagens/" />
    </MobileFiltroContainer>
  );
}

const chats = [
  {
    id: "1235",
    nome: "Renatinha",
    ultimaMsg: "Lorem ipsum dolor sit amet.",
  },
  {
    id: "12346",
    nome: "Helena ferreira",
    ultimaMsg: "Lorem ipsum dolor sit amet.",
  },
];

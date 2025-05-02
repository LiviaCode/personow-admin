"use client";

import { useState } from "react";

import { MobileFiltroContainer } from "@/components/FiltroContainer";
import { useIsMobile } from "@/components/isMobile";

import { MessageInput } from "./mensageInput";
import { MensageList } from "./mensageList";
import { MensagemProps } from "./mensagem";

// const selectOptions = [
//   { label: "Todas", value: "msgTodas" },
//   { label: "Lidas", value: "msgLidas" },
//   { label: "Não lidas", value: "msgNaoLidas" },
// ];

export function ChatBox() {
  const isMobile = useIsMobile();
  const [openChat, setOpenChat] = useState(false);
  const [historyChat, setHistoryChat] = useState(true);

  const handleOpenChat = (e: React.MouseEvent) => {
    e.preventDefault();
    setHistoryChat(false);
    setOpenChat(true);
  };

  const handleHistoryChat = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenChat(false);
    setHistoryChat(true);
  };

  return isMobile ? (
    <MobileLayout
      handleOpenChat={handleOpenChat}
      handleHistoryChat={handleHistoryChat}
      openChat={openChat}
      historyChat={historyChat}
    />
  ) : (
    <DesktopLayout
      handleOpenChat={handleOpenChat}
      handleHistoryChat={handleHistoryChat}
      openChat={openChat}
    />
  );
}

function DesktopLayout({
  handleOpenChat,
  handleHistoryChat,
  openChat,
}: {
  handleOpenChat: (e: React.MouseEvent) => void;
  handleHistoryChat: (e: React.MouseEvent) => void;
  openChat: boolean;
}) {
  return (
    <MobileFiltroContainer title="Mensagens">
      <div className="flex h-[28rem] w-full rounded-[8px] bg-purple-900 p-2">
        <div className="flex flex-col">
          <MensageList
            mensagens={previaMensagens}
            handleOpenChat={handleOpenChat}
          />
        </div>

        <div className="w-full">
          {openChat && (
            <MessageInput
              usuario="stefanie"
              mensagens={mensagens}
              handleClickBack={handleHistoryChat}
            ></MessageInput>
          )}
        </div>
      </div>
    </MobileFiltroContainer>
  );
}

function MobileLayout({
  handleOpenChat,
  handleHistoryChat,
  openChat,
  historyChat,
}: {
  handleOpenChat: (e: React.MouseEvent) => void;
  handleHistoryChat: (e: React.MouseEvent) => void;
  openChat: boolean;
  historyChat: boolean;
}) {
  return (
    <>
      {historyChat && (
        <MobileFiltroContainer title="Mensagens">
          <MensageList
            mensagens={previaMensagens}
            handleOpenChat={handleOpenChat}
          />
        </MobileFiltroContainer>
      )}
      {openChat && (
        <MessageInput
          usuario="stefanie"
          mensagens={mensagens}
          handleClickBack={handleHistoryChat}
        />
      )}
    </>
  );
}

const previaMensagens = [
  { nome: "Stefanie Rodrigies", mensagem: "Lorem ipsum dolor sit amet." },
  { nome: "Helena ferreira", mensagem: "Lorem ipsum dolor sit amet." },
];

const mensagens: MensagemProps[] = [
  { texto: "Olá, como vai?", hora: "22:50", tipo: "enviada" },
  { texto: "Estou bem tbm", hora: "22:55", tipo: "recebida" },
];

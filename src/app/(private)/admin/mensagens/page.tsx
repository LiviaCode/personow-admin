'use client'

import { useState } from 'react'

import {
  FiltroContainer,
  MobileFiltroContainer,
} from '@/components/FiltroContainer'
import { useIsMobile } from '@/components/isMobile'

import { ChatMensagem } from './chat-mensagem'
import { MobilePreviaMensagem, PreviaMensagem } from './previa-mensagem'

const selectOptions = [
  { label: 'Todas', value: 'msgTodas' },
  { label: 'Lidas', value: 'msgLidas' },
  { label: 'Não lidas', value: 'msgNaoLidas' },
]

export default function PageMensagem() {
  const isMobile = useIsMobile()
  const [openChat, setOpenChat] = useState(false)
  const [historyChat, setHistoryChat] = useState(true)

  const handleOpenChat = (e: React.MouseEvent) => {
    e.preventDefault()
    setHistoryChat(false)
    setOpenChat(true)
  }

  const handleHistoryChat = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpenChat(false)
    setHistoryChat(true)
  }

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
  )
}

function DesktopLayout({
  handleOpenChat,
  handleHistoryChat,
  openChat,
}: {
  handleOpenChat: (e: React.MouseEvent) => void
  handleHistoryChat: (e: React.MouseEvent) => void
  openChat: boolean
}) {
  return (
    <FiltroContainer title="Mensagens" selectOptions={selectOptions}>
      <div className="flex h-[26rem] rounded-[8px] bg-purple-900 p-2">
        <div className="flex w-1/3 flex-col">
          {previaMensagens.map((msg, index) => (
            <PreviaMensagem
              handleOpenChat={handleOpenChat}
              key={index}
              {...msg}
            />
          ))}
        </div>

        <div className="w-2/3">
          {openChat && (
            <ChatMensagem handleClickBack={handleHistoryChat}></ChatMensagem>
          )}
        </div>
      </div>
    </FiltroContainer>
  )
}

function MobileLayout({
  handleOpenChat,
  handleHistoryChat,
  openChat,
  historyChat,
}: {
  handleOpenChat: (e: React.MouseEvent) => void
  handleHistoryChat: (e: React.MouseEvent) => void
  openChat: boolean
  historyChat: boolean
}) {
  return (
    <>
      {historyChat && (
        <MobileFiltroContainer title="Mensagens">
          {previaMensagens.map((msg, index) => (
            <MobilePreviaMensagem
              handleOpenChat={handleOpenChat}
              key={index}
              {...msg}
            />
          ))}
        </MobileFiltroContainer>
      )}
      {openChat && <ChatMensagem handleClickBack={handleHistoryChat} />}
    </>
  )
}

const previaMensagens = [
  { nome: 'Stefanie Rodrigies', mensagem: 'Lorem ipsum dolor sit amet.' },
  { nome: 'Helena ferreira', mensagem: 'Lorem ipsum dolor sit amet.' },
]

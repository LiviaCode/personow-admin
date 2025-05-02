import { ChevronLeft, ImageIcon } from "lucide-react";

import { Mensagem, MensagemProps } from "./mensagem";
import Link from "next/link";

export type ChatData = {
  nome: string;
  mensagens: MensagemProps[];
};

type ChatScreenProps = {
  chatData: ChatData;
  backUrl: string;
};

export function ChatScreen({ chatData, backUrl }: ChatScreenProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-t-[20px] bg-purple-900 text-white">
      <div className="flex items-center rounded-[20px]">
        <div className="row-span-2 flex w-20 items-center justify-center space-x-2 p-2">
          <Link href={backUrl}>
            <ChevronLeft className="size-5 text-orange-500" />
          </Link>
          <ImageIcon className="size-10 text-gray-300" />
        </div>
        <h2 className="w-60 font-bold">{chatData.nome}</h2>
      </div>

      <div className="flex-1 overflow-y-auto bg-purple-800 p-3">
        {chatData.mensagens.map((msg, index) => (
          <Mensagem key={index} {...msg} />
        ))}
      </div>

      <div className="rounded-[10px] p-3">
        <input
          type="text"
          className="w-full rounded-[8px] border border-secondary-web p-2 text-black focus:outline-none"
          placeholder="Escreva uma mensagem"
        ></input>
      </div>
    </div>
  );
}

import { ChevronLeft, ImageIcon } from "lucide-react";

import { Mensagem, MensagemProps } from "./mensagem";

type ChatMensagemProps = {
  usuario: string;
  mensagens: MensagemProps[];
  handleClickBack: (e: React.MouseEvent) => void;
};

export function MessageInput({
  usuario,
  mensagens,
  handleClickBack,
}: ChatMensagemProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-t-[20px] bg-purple-900 text-white">
      <div className="flex items-center rounded-[20px]">
        <div className="row-span-2 flex w-20 items-center justify-center space-x-2 p-2">
          <a onClick={handleClickBack} href="#">
            <ChevronLeft className="size-5 text-orange-500" />
          </a>
          <ImageIcon className="size-10 text-gray-300" />
        </div>
        <h2 className="w-60 font-bold">{usuario}</h2>
      </div>

      <div className="flex-1 overflow-y-auto bg-purple-800 p-3">
        {mensagens.map((msg, index) => (
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

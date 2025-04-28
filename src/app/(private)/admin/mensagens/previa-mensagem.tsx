import { ChevronRightIcon, ImageIcon } from "lucide-react";

type PreviaMensagemProps = {
  nome: string;
  mensagem: string;
  handleOpenChat: (e: React.MouseEvent) => void;
};

export function PreviaMensagem({
  nome,
  mensagem,
  handleOpenChat,
}: PreviaMensagemProps) {
  return (
    <div className="m-1 grid h-20 grid-flow-col grid-rows-2 items-center justify-items-center border-b border-gray-300 text-gray-200">
      <div className="row-span-2 flex w-20 justify-center">
        <ImageIcon className="size-10"></ImageIcon>
      </div>
      <h2 className="line-clamp-1 w-60 break-words">{nome}</h2>
      <span className="line-clamp-1 w-60 break-words pb-3 text-gray-400">
        {mensagem}
      </span>
      <a
        onClick={handleOpenChat}
        href="#"
        className="row-span-2 flex w-10 justify-center"
      >
        <ChevronRightIcon className="size-10" />
      </a>
    </div>
  );
}

export function MobilePreviaMensagem({
  nome,
  mensagem,
  handleOpenChat,
}: PreviaMensagemProps) {
  return (
    <div className="grid h-20 grid-flow-col grid-rows-1 items-center rounded-[15px] bg-purple-900 p-1">
      <div className="row-span-2 flex justify-center text-orange-500">
        <ImageIcon className="size-10 md:size-9"></ImageIcon>
      </div>
      <div className="mx-2">
        <h2 className="line-clamp-1 break-words text-base text-gray-200">
          {nome}
        </h2>
        <span className="line-clamp-1 break-words pb-3 text-sm text-gray-400">
          {mensagem}
        </span>
      </div>
      <a
        onClick={handleOpenChat}
        href="#"
        className="row-span-2 flex justify-center text-orange-500"
      >
        <ChevronRightIcon className="size-10" />
      </a>
    </div>
  );
}

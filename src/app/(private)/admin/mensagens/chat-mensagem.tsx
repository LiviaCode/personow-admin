import { ImageIcon, ChevronLeft } from "lucide-react";
import { MensagemProps, Mensagem } from "../../../../components/mensagem";

type ChatMensagemProps = {
  handleClickBack: (e: React.MouseEvent) => void;
};

const mensagens: MensagemProps[] = [
  { texto: "Olá, como vai?", hora: "22:50", tipo: "enviada" },
  { texto: "Estou bem tbm", hora: "22:55", tipo: "recebida" },
];

export function ChatMensagem({ handleClickBack }: ChatMensagemProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-t-[20px] bg-purple-900 text-white">
      <div className="flex items-center rounded-[20px]">
        <div className="row-span-2 flex w-20 items-center justify-center space-x-2 p-2">
          <a onClick={handleClickBack} href="#">
            <ChevronLeft className="size-5 text-orange-500" />
          </a>
          <ImageIcon className="size-10 text-gray-300" />
        </div>
        <h2 className="w-60 font-bold">Nome Sobrenome</h2>
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

import { ImageIcon } from "lucide-react";
import { MensagemProps, Mensagem } from "../../../../components/mensagem";

const mensagens: MensagemProps[] = [
  { texto: "Olá, como vai?", hora: "22:50", tipo: "enviada" },
  { texto: "Estou bem tbm", hora: "22:55", tipo: "recebida" },
];

export function ChatMensagem() {
  return (
    <div className="flex h-full flex-col justify-between text-white">
      <div className="flex items-center bg-purple-900">
        <div className="row-span-2 flex w-20 justify-center">
          <ImageIcon className="size-10 text-gray-300" />
        </div>
        <h2 className="w-60 font-bold">Nome Sobrenome</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {mensagens.map((msg, index) => (
          <Mensagem key={index} {...msg} />
        ))}
      </div>

      <div className="bg-purple-900 p-3">
        <input
          type="text"
          className="w-full rounded-[8px] p-1"
          placeholder="Escreva uma mensagem"
        ></input>
      </div>
    </div>
  );
}

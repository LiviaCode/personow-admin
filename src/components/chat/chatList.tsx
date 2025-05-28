import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Chat = {
  id: string;
  nome: string;
  ultimaMsg: string;
};

type ChatListProps = {
  chats: Chat[];
  url: string;
};

export function ChatList({ chats, url }: ChatListProps) {
  return (
    <>
      {chats.map((chat, index) => (
        <>
          <div
            key={index}
            className="grid h-20 grid-flow-col grid-rows-1 items-center rounded-[15px] bg-purple-800 text-gray-200 md:m-1 md:w-1/3 md:grid-rows-2 md:justify-items-center md:bg-purple-900"
          >
            <div className="row-span-2 flex justify-center text-orange-500 md:w-20">
              <Image
                src="/imagens/professores/joao-silva.jpg"
                alt="Foto"
                width={80}
                height={80}
                className="rounded-full border-2 border-orange-500"
              />
            </div>
            <div className="row-span-2">
              <h2 className="line-clamp-1 break-words text-base text-gray-200 md:w-60">
                {chat.nome}
              </h2>
              <span className="line-clamp-1 break-words pb-3 text-sm text-gray-400 md:w-60">
                {chat.ultimaMsg.length > 15
                  ? chat.ultimaMsg.slice(0, 15) + "..."
                  : chat.ultimaMsg}
              </span>
            </div>
            <Link
              href={`${url}${chat.id}`}
              className="row-span-2 flex justify-center text-orange-500"
              aria-label="Abrir chat"
            >
              <ChevronRightIcon className="size-10" />
            </Link>
          </div>
          {/* <hr className="mt-6 border-gray-400" /> */}
        </>
      ))}
    </>
  );
}

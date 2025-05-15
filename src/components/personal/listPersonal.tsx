import { ChevronRightIcon, ImageIcon } from "lucide-react";
import Link from "next/link";

type Personal = {
  id: string;
  nome: string;
  profissao: string;
  foto: string;
  avaliacao: string;
};

type ListPersonalProps = {
  personals: Personal[];
};

export function ListPersonal({ personals }: ListPersonalProps) {
  return (
    <>
      {personals.map((personal) => (
        <Link key={personal.id} href={`/alunos/personal/${personal.id}`}>
          <div className="my-2 grid h-20 grid-flow-col grid-rows-1 items-center rounded-[15px] bg-purple-800 text-gray-200 md:w-1/2">
            <div className="row-span-2 flex justify-center text-orange-500 md:w-20">
              <ImageIcon className="size-10 md:size-9"></ImageIcon>
            </div>

            <div className="col-span-2 flex flex-col items-start md:w-60">
              <h2 className="line-clamp-1 break-words text-base text-gray-200">
                {personal.nome}
              </h2>
              <span className="line-clamp-1 break-words text-sm text-gray-400">
                {personal.profissao}
              </span>
              <span className="line-clamp-1 break-words text-sm text-gray-400">
                {personal.avaliacao}
              </span>
            </div>

            <div className="row-span-2 flex justify-center text-orange-500">
              <ChevronRightIcon className="size-10" />
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getAllPersonalResponse } from "@/app/http/get-all-personal";

type ListPersonalProps = {
  personals: getAllPersonalResponse[];
};

export function ListPersonal({ personals }: ListPersonalProps) {
  return (
    <>
      {personals.map((personal) => (
        <Link key={personal.id} href={`/alunos/personal/${personal.id}`}>
          <div className="my-3 grid h-20 grid-flow-col grid-rows-1 items-center rounded-[15px] bg-purple-800 text-gray-200 md:w-1/2">
            <div className="row-span-2 flex justify-center text-sm text-orange-500">
              <Image
                src={`http://localhost:3017/images/${personal.PersonalFotos.at(-1)?.filename ?? ""}`}
                alt={`Foto Personal`}
                width={80}
                height={80}
                className="rounded-full border-2 border-orange-500"
              />
            </div>

            <div className="col-span-2 flex flex-col items-start md:w-60">
              <h2 className="line-clamp-1 break-words text-base text-gray-200">
                {personal.nome}
              </h2>
              <span className="line-clamp-1 break-words text-sm text-gray-400">
                {personal.profissao}
              </span>
              <span className="line-clamp-1 break-words text-sm text-gray-400">
                {personal.cidade}
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

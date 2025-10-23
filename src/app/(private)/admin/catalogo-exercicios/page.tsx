"use client";

import { Separator } from "@radix-ui/react-separator";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type RowData = {
  id: number;
  nome: string;
  grupoMuscular: string;
  descricao: string;
  video: string;
};

type Column = {
  key: keyof RowData;
  label: string;
};

const columns: Column[] = [
  { key: "id", label: "Id" },
  { key: "nome", label: "Nome" },
  { key: "grupoMuscular", label: "Grupo muscular" },
  { key: "descricao", label: "Descrição" },
];

const datas: RowData[] = [
  {
    id: 1,
    nome: "Supino Reto",
    grupoMuscular: "Peito",
    descricao:
      "Deite-se no banco reto e empurre a barra para cima, trabalhando o peitoral, tríceps e ombros.",
    video: "https://www.youtube.com/watch?v=rT7DgCr-3pg",
  },
  {
    id: 2,
    nome: "Agachamento Livre",
    grupoMuscular: "Pernas / Glúteos",
    descricao:
      "Com a barra sobre os ombros, flexione os joelhos essssssssssssssssssssssssssssssssssssssssssssssssssss desça o corpo mantendo as costas retas.",
    video: "https://www.youtube.com/watch?v=Dy28eq2PjcM",
  },
];

export default function Catalogo() {
  const router = useRouter();
  return (
    <div className="space-y-4 p-4 md:p-6">
      <div className="flex flex-col items-start justify-between gap-2 text-2xl font-semibold text-text-web md:flex-row md:items-center md:gap-0">
        <h1>Catálogo de exercícios</h1>
        <Button
          className="hover:text-purple-800"
          onClick={() => router.push("catalogo-exercicios/cadastrar")}
        >
          Cadastrar exercício
        </Button>
      </div>

      <Separator />

      {/* Tabela para desktop */}
      <div className="hidden overflow-x-auto md:block">
        <Table
          className="w-full border-collapse overflow-hidden rounded-lg bg-purple-800 shadow-xl"
          style={{ tableLayout: "fixed" }}
        >
          <TableHeader>
            <TableRow className="h-12">
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className="overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2 text-center text-sm font-medium text-white md:text-base"
                >
                  {col.label}
                </TableHead>
              ))}
              <TableHead className="px-4 py-2 text-center font-medium text-white">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas.map((row, index) => (
              <TableRow className="h-12" key={index}>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    className="overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2 text-center text-sm font-light text-gray-300 md:text-base"
                  >
                    {row[col.key]}
                  </TableCell>
                ))}
                <TableCell className="px-4 py-2">
                  <div className="flex justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="h-8 w-8 p-0 text-white">
                          <span className="sr-only">Abrir ações</span>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="flex w-36 flex-col items-center justify-center bg-background-web md:w-40">
                        <Button className="w-full hover:text-purple-800">
                          Ver vídeo
                        </Button>
                        <Button
                          className="w-full hover:text-purple-800"
                          onClick={() =>
                            router.push("catalogo-exercicios/atualizar")
                          }
                        >
                          Editar exercício
                        </Button>
                        <Button className="w-full hover:text-purple-800">
                          Excluir exercício
                        </Button>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Cards para mobile */}
      <div className="flex flex-col gap-4 md:hidden">
        {datas.map((row, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-lg bg-purple-800 p-4 text-white shadow-xl"
          >
            {columns.map((col) => (
              <div
                key={col.key}
                className="flex justify-between text-sm md:text-base"
              >
                <span className="font-medium">{col.label}:</span>
                <span className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {row[col.key]}
                </span>
              </div>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button
                className="w-full hover:text-purple-800"
                onClick={() => window.open(row.video, "_blank")}
              >
                Ver vídeo
              </Button>
              <Button
                className="w-full hover:text-purple-800"
                onClick={() => router.push("catalogo-exercicios/atualizar")}
              >
                Editar exercício
              </Button>
              <Button className="w-full hover:text-purple-800">
                Excluir exercício
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

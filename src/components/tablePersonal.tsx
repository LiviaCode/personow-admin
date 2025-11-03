"use client";

import { Separator } from "@radix-ui/react-separator";
import { MoreHorizontal, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Column = {
  key: string;
  label: string;
  searchable?: boolean;
};

type Action<T> = {
  label: string;
  onClick: (item: T) => void;
  visible?: (item: T) => boolean;
};

interface DataTableProps<T> {
  title?: string;
  columns: Column[];
  data: T[];
  onAdd?: () => void;
  addLabel?: string;
  actions?: Action<T>[];
  emptyMessage?: string;
  searchPlaceholder?: string;
}

export function TablePersonal<T>({
  title,
  columns,
  data,
  onAdd,
  addLabel = "Adicionar",
  actions = [],
  emptyMessage = "Nenhum registro encontrado.",
  searchPlaceholder = "Pesquisar...",
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtro de pesquisa (busca em colunas com `searchable: true`)
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const lower = searchTerm.toLowerCase();

    const searchableCols = columns.filter((c) => c.searchable);
    if (searchableCols.length === 0) return data;

    return data.filter((row) =>
      searchableCols.some((col) => {
        const value = String(row[col.key as keyof T] ?? "").toLowerCase();
        return value.includes(lower);
      }),
    );
  }, [searchTerm, data, columns]);

  return (
    <div className="space-y-4 p-4 md:p-6">
      {/* Cabeçalho */}
      {(title || onAdd) && (
        <div className="flex flex-col items-start justify-between gap-2 text-2xl font-semibold text-text-web md:flex-row md:items-center md:gap-0">
          {title && <h1>{title}</h1>}
          {onAdd && (
            <Button className="hover:text-purple-800" onClick={onAdd}>
              {addLabel}
            </Button>
          )}
        </div>
      )}

      {/* Barra de pesquisa */}
      <div className="flex items-center gap-2">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            className="bg-white pl-8 text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Separator />

      {/* Tabela desktop */}
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
              {actions.length > 0 && (
                <TableHead className="px-4 py-2 text-center font-medium text-white">
                  Ações
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow className="h-12">
                <TableCell
                  colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                  className="overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2 text-center text-sm font-light text-gray-300 md:text-base"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row, index) => (
                <TableRow key={index} className="h-12">
                  {columns.map((col) => (
                    <TableCell
                      key={String(col.key)}
                      className="overflow-hidden text-ellipsis whitespace-nowrap px-4 py-2 text-center text-sm font-light text-gray-300 md:text-base"
                    >
                      {String(row[col.key as keyof T] ?? "")}
                    </TableCell>
                  ))}
                  {actions.length > 0 && (
                    <TableCell className="px-4 py-2">
                      <div className="flex justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button className="h-8 w-8 bg-orange-800 p-0 text-white">
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="flex w-40 flex-col bg-background-web">
                            {actions
                              .filter((a) => a.visible?.(row) ?? true)
                              .map((action, i) => (
                                <Button
                                  key={i}
                                  className="mb-1 w-full bg-orange-800 hover:bg-purple-800"
                                  onClick={() => action.onClick(row)}
                                >
                                  {action.label}
                                </Button>
                              ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Cards mobile */}
      <div className="flex flex-col gap-4 md:hidden">
        {filteredData.map((row, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-lg bg-purple-800 p-4 text-white shadow-xl"
          >
            {columns.map((col) => (
              <div
                key={String(col.key)}
                className="flex justify-between text-sm md:text-base"
              >
                <span className="font-medium">{col.label}:</span>
                <span className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {String(row[col.key as keyof T] ?? "")}
                </span>
              </div>
            ))}
            {actions.length > 0 && (
              <div className="mt-2 flex flex-col gap-2">
                {actions
                  .filter((a) => a.visible?.(row) ?? true)
                  .map((action, i) => (
                    <Button
                      key={i}
                      className="w-full hover:text-purple-800"
                      onClick={() => action.onClick(row)}
                    >
                      {action.label}
                    </Button>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

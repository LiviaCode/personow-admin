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
import { MoreHorizontal, NotebookText } from "lucide-react";

type Column = {
  key: string;
  label: string;
};

type RowData = Record<string, string | number | boolean>;

type TabelaProps = {
  columns: Column[];
  datas: RowData[];
};

export default function TablePersonal({ columns, datas }: TabelaProps) {
  return (
    <Table className="w-full border-collapse shadow-xl">
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.key}
              className="px-4 py-2 text-center font-medium text-white"
            >
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {datas.map((row, index) => (
          <TableRow key={index}>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                className="h-5 px-4 py-2 text-center font-light text-gray-300"
              >
                {row[col.key]}
              </TableCell>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <td>
                  <Button variant="icon" className="h-8 w-8 p-0 text-white">
                    <span className="sr-only">Abrir ações</span>
                    <MoreHorizontal />
                  </Button>
                </td>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col items-center justify-center bg-background-web">
                <Button variant="icon" className="hover:text-purple-800">
                  <NotebookText className="size-6" />
                  Ver mais informações
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

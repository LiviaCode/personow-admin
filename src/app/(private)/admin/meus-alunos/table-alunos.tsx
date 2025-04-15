// import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, NotebookText } from "lucide-react";


export function TableAlunos(){
    return(
        <div className="space-y-4 p-6">
            <div className="flex items-center justify- text-2xl font-semibold text-text-web">Meus Alunos</div>
                <Separator />
                    <Table className="w-full overflow-hidden rounded-lg shadow-xl border-collapse bg-purple-800">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="px-4 py-2 text-center font-medium text-white">NOME</TableHead>
                                <TableHead className="px-4 py-2 text-center font-medium text-white">E-MAIL</TableHead>
                                <TableHead className="px-4 py-2 text-center font-medium text-white">CELULAR</TableHead>
                                <TableHead className="px-4 py-2 text-center font-medium text-white">AÇÕES</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                            <TableCell className="h-5 px-4 py-2 text-center font-light text-white">Buscar da api</TableCell>
                            <TableCell className="h-5 px-4 py-2 text-center font-light text-white">Buscar da api</TableCell>
                            <TableCell className="h-5 px-4 py-2 text-center font-light text-white">Buscar da api</TableCell>
                            <TableCell className="h-5 px-4 py-2 text-center font-light text-white">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                 <Button 
                                     variant="icon" className="h-8 w-8 p-0 text-white">
                                    <span className="sr-only">Abrir ações</span>
                                    <MoreHorizontal />
                                </Button>
                                </DropdownMenuTrigger>
                                    <DropdownMenuContent className="flex flex-col items-center justify-center bg-background-web">
                                        <Button
                                        variant="icon"
                                        className="hover:text-purple-800">
                                        <NotebookText className="size-6" />
                                        Ver mais informações
                                        </Button>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
        </div>
    )
}
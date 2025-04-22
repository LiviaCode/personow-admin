import TablePersonal from "@/components/tablePersonal";
import { FiltroContainer } from "../../../../components/FiltroContainer";

const Column = [
  { key: "nome", label: "Nome" },
  { key: "email", label: "E-mail" },
  { key: "celular", label: "Celular" },
];

export function TableAlunos() {
  return (
    <FiltroContainer title="Meus Alunos" selectOptions={selectOptions}>
 
        <TablePersonal columns={Column} datas={dados} />

    </FiltroContainer>
  );
}

// APAGAR DEPOIS - APENAS PARA TESTE
const selectOptions = [{ label: "todas  ", value: "cidade" }];
const dados = [
  {
    nome: "Stefanie",
    email: "aluno@gmail",
    celular: "8999999999",
  },
  {
    nome: "Carlos",
    email: "aluno@gmail",
    celular: "8999999999",
  },
  {
    nome: "Julia",
    email: "aluno@gmail",
    celular: "8999999999",
  },
  {
    nome: "Julia",
    email: "aluno@gmail",
    celular: "8999999999",
  },
  {
    nome: "Julia",
    email: "aluno@gmail",
    celular: "8999999999",
  },
];

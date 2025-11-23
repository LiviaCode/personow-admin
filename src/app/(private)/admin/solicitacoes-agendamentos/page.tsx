"use client";

import { useEffect, useState } from "react";

import { getAulaPersonal } from "@/app/http/agenda/get-aulas";
import { updateAgenda } from "@/app/http/agenda/update-agenda";
import { alertError, alertSuccess } from "@/components/alert";
import { TablePersonal } from "@/components/tablePersonal";

const columns = [
  { key: "id", label: "Id" },
  { key: "nome", label: "Nome", searchable: true },
  { key: "data", label: "Data", searchable: true },
  { key: "hora", label: "Hora" },
  { key: "status", label: "Status", searchable: true },
];

interface AulaTabela {
  id: string;
  nome: string;
  status: string;
  data: string;
  hora: string;
}

export default function Solicitacao() {
  const [dados, setDados] = useState<AulaTabela[]>([]);

  useEffect(() => {
    async function getAlunos() {
      const idPersonal = localStorage.getItem("id");
      if (idPersonal !== null) {
        const response = await getAulaPersonal(idPersonal);
        const aulasMarcadas =
          response?.AulaAgendas?.map((dado) => {
            const dataObj = new Date(dado.date_init);

            return {
              id: dado.id,
              nome: dado.Aluno?.nome ?? "",
              status: dado.status,
              data: dataObj.toLocaleDateString("pt-BR"), // só a data
              hora: dataObj.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            };
          }) ?? [];

        setDados(aulasMarcadas);
      }
    }

    getAlunos();
  }, []);

  async function responderSolicitacao(id: string, status: string) {
    try {
      await updateAgenda({ id, status });

      // atualiza apenas o item alterado no estado
      setDados((prev) =>
        prev.map((aula) => (aula.id === id ? { ...aula, status } : aula)),
      );
      alertSuccess(`Solicitação ${status} com sucesso!`);
    } catch (error) {
      alertError(
        `Falha ao tentar ${status} solicitação, tente novamente mais tarde.`,
      );
    }
  }

  return (
    <TablePersonal
      title="Solicitações de agendamento"
      addLabel="Catálogo de exercícios"
      columns={columns}
      data={dados}
      actions={[
        {
          label: "Aceitar",
          onClick: (a) => responderSolicitacao(a.id, "aceita"), // ou "Em andamento"
        },
        {
          label: "Recusar",
          onClick: (a) => responderSolicitacao(a.id, "recusada"),
        },
      ]}
    />
  );
}

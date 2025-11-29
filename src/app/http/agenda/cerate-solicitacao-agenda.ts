import { api } from "../../api-client";

export interface SolicitacaoAgenda {
  date_init: string;
  date_end: string;
  personal_id: number;
  aluno_id: number;
  endereco: string;
  status: string;
}

export async function createSolicitacaoAgenda({
  endereco,
  status,
  date_init,
  date_end,
  personal_id,
  aluno_id,
}: SolicitacaoAgenda) {
  await api
    .post("agenda", {
      json: {
        endereco,
        status,
        date_init,
        date_end,
        personal_id,
         aluno_id,
      },
    })
    .json();
}

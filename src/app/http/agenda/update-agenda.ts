import { api } from "../../api-client";

export interface updateAgendaResponse {
  id: string;
  aluno_id: string;
  personal_id: number;
  date_init: string;
  date_end: string;
  endereco: string;
  status: string;
  created_at: string;
  updatedAt: string;
}

export interface updateAgendaRequest {
  id: string;
  status: string;
}

export async function updateAgenda({ id, status }: updateAgendaRequest) {
  const response = await api
    .put(`agenda/${id}`, {
      json: { status },
    })
    .json<updateAgendaResponse>();

  return response;
}

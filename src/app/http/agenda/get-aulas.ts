import { api } from "../../api-client";

export interface getAulaResponse {
  id: string;
  AulaAgendas: AulaAgenda[];
}

export interface AulaAgenda {
  id: string;
  aluno_id: string;
  status: string;
  endereco: string;
  date_init: string;
  date_end: string;
  Aluno: {
    id: string;
    nome: string;
    email: string;
  };
}

export interface getAulaRequest {
  id: string;
}

export async function getAulaPersonal({ id }: getAulaRequest) {
  const response = await api
    .get(`personal/${id}?$select=id&$expand=aulas`)
    .json<getAulaResponse>();

  return response;
}

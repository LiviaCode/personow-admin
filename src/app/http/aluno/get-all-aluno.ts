import { api } from "../../api-client";

export interface Aluno {
  id: string;
  nome: string;
  email: string;
  password: string;
  dateNascimento: string;
  genero: "Masculino" | "Feminino" | "Outro";
  celular: string;
  altura: string;
  objetivo: string;
  peso: string;
  condicaoMedica: string;
  historicoLesao: string;
  nivelAtividade: "Sedentário" | "Moderado" | "Ativo";
  AlunoFotos: [{ url: string; filename: string }];
  AulaAgendas: [AulaAgendas];
}

interface AulaAgendas {
  id: string;
  personal_id: string;
  endereco: string;
  date_init: string;
  date_end: string;
}

export interface GetAllAlunosResponse {
  alunos: Aluno[];
}

export default async function getAllAlunos() {
  try {
    const response = await api.get("alunos/").json<Aluno[]>();
    return response;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const body = await error.response.text();
      console.error(`Erro ${status}:`, body);
    } else {
      console.error("Erro inesperado:", error);
    }

    throw error;
  }
}

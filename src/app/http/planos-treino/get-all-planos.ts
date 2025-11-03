import { api } from "@/app/api-client";

import { dadosExercicio } from "../exercicios/get-all-exercicio";

export interface getAllPlanoResponse {
  result: dadosPlano[];
}

export interface dadosPlano {
  id: number;
  personal_id: string;
  aluno_id: string;
  data_inicio: string;
  data_fim: string;
  nome: string;
  status: string;
  observacoes_gerais: string;
  created_at: string;
  updated_at: string;
  SessaoTreinos: dadosSessao[];
}

export interface dadosSessao {
  id: number;
  identificador: string;
  titulo: string;
  ordem: number;
  itemExercicios: dadosDetalhesExercicios[];
}

export interface dadosDetalhesExercicios {
  id: number;
  sessao_treino_id: number;
  exercicio_personal_id: number;
  ordem: number;
  series: number;
  repeticoes: string;
  tempo_descanso_segundos: number;
  observacoes: string;
  ExercicioPersonal: dadosExercicio;
}

// Retorna todos os planos do aluno com o personal logado
export async function getAllPlano(idAluno: number) {
  try {
    const response = await api
      .get(`plano/personal/aluno/planos/${idAluno}`)
      .json<getAllPlanoResponse>();
    return response.result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const body = await error.response.text();

      // Caso o backend retorne "planos de treino não encontrado"
      if (status === 400 && body.includes("planos de treino não encontrado")) {
        console.warn("Nenhum plano encontrado para este aluno.");
        return [];
      }

      console.error(`Erro ${status}:`, body);
    } else {
      console.error("Erro inesperado:", error);
    }

    // Para outros erros, relança o erro
    throw error;
  }
}

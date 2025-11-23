import { api } from "../../api-client";

export interface getAlunoResponse {
  id: number;
  nome: string;
  email: string;
  dateNascimento?: string;
  genero?: string
  celular?: string;
  altura?: string;
  peso?: string;
  condicaoMedica?: string;
  historicoLesao?: string;
  nivelAtividade?: string;
  objetivo?: string;
  Endereco?: string;
  AlunoFotos?: [{ url: string; filename: string }];
}

export default async function getAluno(id: number) {
  try {
    const response = await api
      .get(
        `alunos/${id}?$select=id,nome,email,dateNascimento,genero,celular,altura,peso,condicaoMedica,historicoLesao,nivelAtividade,objetivo&$expand=aulas,endereco,foto,agenda`,
      )
      .json<getAlunoResponse>();

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
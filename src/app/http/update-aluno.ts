import { api } from "../api-client";

export interface UpdateAlunoRequest {
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
}

export interface UpdateAlunoResponse {
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
}

export default async function updateAluno(data: UpdateAlunoRequest) {
  const token = localStorage.getItem("token");
  try {
    const response = await api
      .put(`alunos/${data.id}`, {
        json: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<UpdateAlunoResponse>();

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const body = await error.response.text(); // ou .json() se for JSON
      console.error(`Erro ${status}:`, body);
    } else {
      console.error("Erro inesperado:", error);
    }

    throw error; // relança o erro para o componente lidar, se quiser
  }
}

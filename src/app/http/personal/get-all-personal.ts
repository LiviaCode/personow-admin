import { api } from "../../api-client";

export interface getAllPersonalResponse {
  id: number;
  nome: string;
  email: string;
  cidade: string;
  profissao: string;
  PersonalFotos: [{ url: string; filename: string }];
}

export default async function getAllPersonal() {
  try {
    const response = await api
      .get("personal/?$select=id,nome,email,cidade,profissao&$expand=foto")
      .json<getAllPersonalResponse[]>();

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

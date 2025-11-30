import { api } from "@/app/api-client";

export interface GetAllPlanoResponse {
  id: string;
  personal_id: string;
  tipo_plano: "Avulsa" | "Experimental" | "Mensal" | "Bimestral" | "Trimestral";
  valor: number;
  updated_at: string;
  created_at: string;
}

export default async function getAllPlanoPagamento(id: string) {
  try {
    const response = await api
      .get(`personal/planos/${id}`)
      .json<GetAllPlanoResponse[]>();

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

import { api } from "@/app/api-client";

// Essa rota é para o personal criar os tipos de planos com o valor que ele cobra as aulas
// O personal precisa ter criado uma subconta para o aluno efetuar a cobrança
export interface CreatePlanoRequest {
  personal_id: string;
  tipo_plano: "Avulsa" | "Experimental" | "Mensal" | "Bimestral" | "Trimestral";
  valor: number;
}

export interface CreatePlanoResponse {
  message: string;
  data: {
    id: string;
    personal_id: string;
    tipo_plano:
      | "Avulsa"
      | "Experimental"
      | "Mensal"
      | "Bimestral"
      | "Trimestral";
    valor: number;
    updated_at: string;
    created_at: string;
  };
}

export default async function createPlanoPagamento(data: CreatePlanoRequest) {
  try {
    const response = await api
      .post("personal/planos/", {
        json: data,
      })
      .json<CreatePlanoResponse>();

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

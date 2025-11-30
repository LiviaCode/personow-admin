import { api } from "@/app/api-client";

export interface CreateClienteResponse {
  id: string;
  dateCreated: string;
  value: string;
  description: string;
  status: string;
  invoiceUrl: string; // Link para o pagamento
}

export default async function createCliente(id: string) {
  try {
    const response = await api
      .post(`cobranca/${id}`)
      .json<CreateClienteResponse>();

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

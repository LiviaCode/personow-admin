import { api } from "@/app/api-client";

export default async function deletePlano(id: string) {
  try {
    const response = await api.delete(`personal/planos/${id}`).json();
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

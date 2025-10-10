import { api } from "../../api-client";

export interface CreateFotoRequest {
  aluno_id: string;
  foto: FileList;
}
export default async function createFoto(data: CreateFotoRequest) {
  try {
    const formData = new FormData();
    formData.append("aluno_id", data.aluno_id);
    if (data.foto && data.foto.length > 0) {
      formData.append("foto", data.foto[0]); // Adiciona o primeiro arquivo da lista
    }
    console.log(formData);

    const response = await api
      .post("alunos/foto", {
        body: formData, // Envia como FormData (multipart/form-data)
      })
      .json();

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

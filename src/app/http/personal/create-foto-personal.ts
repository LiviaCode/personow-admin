import { api } from "../../api-client";

interface CreatePersonalFotoRequest {
  personal_id: number;
  foto: FileList;
}
export default async function createPersonalFoto(data: CreatePersonalFotoRequest) {
  try {
    const formData = new FormData();
    formData.append("personal_id", String(data.personal_id));
    formData.append("foto", data.foto[0]);

    const response = await api.post("personal/foto", {
      body: formData,
    }).json();

    return response;
  } catch (error) {
    console.error("Erro ao criar foto do personal:", error);
    throw error;
  }
}

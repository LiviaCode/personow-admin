import { api } from "../../api-client";

interface createVideoExercicioRequest {
  exercicio_personal_id: number;
  video: FileList;
}
export default async function createVideoExercicio(
  data: createVideoExercicioRequest,
) {
  try {
    const formData = new FormData();
    formData.append(
      "exercicio_personal_id",
      String(data.exercicio_personal_id),
    );
    formData.append("video", data.video[0]);

    const response = await api
      .post("exercicios/video", {
        body: formData,
      })
      .json();

    return response;
  } catch (error) {
    console.error("Erro ao salvar video do exercicio", error);
    throw error;
  }
}

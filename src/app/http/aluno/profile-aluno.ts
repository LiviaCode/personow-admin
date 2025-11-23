import { api } from "../../api-client";

interface ProfileAlunoRequest {
  email: string;
  password: string;
}

interface ProfileAlunoResponse {
  id: string;
  token: string;
}

export async function profileAluno({
  email,
  password,
}: ProfileAlunoRequest): Promise<ProfileAlunoResponse> {
  try {
    const response = await api
      .post("alunos/token/", {
        json: { email, password },
      })
      .json<ProfileAlunoResponse>();

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

import { api } from "../../api-client";

export interface Agenda {
  title: string;
  date_init: string;
  date_end: string;
  personal_id: number;
  aluno_id?: number;  

}

export async function createAgenda({
  title,
  date_init,
  date_end,
  personal_id,
  aluno_id,
}: Agenda) {
  await api
    .post("personal/agenda", {
      json: {
        title,
        date_init,
        date_end,
        personal_id,
         aluno_id,
      },
    })
    .json();
}

import {
  PersonalProps,
  ProfileDetails,
} from "@/components/personal/profileDetails";

//Teste --- puxar da api os objetos
const personals: Record<string, PersonalProps> = {
  "1235": {
    nome: "João Silva",
    cidade: "Sertãozinho, SP",
    profissao: "Personal Trainer",
    formacao: "Educação Física",
    experiencia: "1 ano",
    areaAtuacao: "Hipertrofia e Emagrecimento",
    modeloAtendimento: "Presencial ou remoto",
    descricao: "Especialista em fisiologia animal com 10 anos de experiência.",
    fotoUrl: "/imagens/professores/joao-silva.jpg",
  },
  "1237": {
    nome: "Renatinha",
    cidade: "Riberão, SP",
    profissao: "Personal Trainer",
    formacao: "Educação Física",
    experiencia: "1 ano",
    areaAtuacao: "Hipertrofia e Emagrecimento",
    modeloAtendimento: "Presencial ou remoto",
    descricao: "Especialista em fisiologia animal com 10 anos de experiência.",
    fotoUrl: "/imagens/professores/joao-silva.jpg",
  },
};

export default function ProfilePersonal({
  params,
}: {
  params: { id: string };
}) {
  const personal = personals[params.id];
  return (
    <>
      <ProfileDetails personal={personal}></ProfileDetails>
    </>
  );
}

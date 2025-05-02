import { MobileFiltroContainer } from "@/components/FiltroContainer";
import { ListPersonal } from "@/components/personal/listPersonal";

export default function Home() {
  return (
    <>
      <MobileFiltroContainer title="Profissionais">
        <ListPersonal personals={personals}></ListPersonal>
      </MobileFiltroContainer>
    </>
  );
}

// Teste -- puxar da api
const personals = [
  {
    id: "1235",
    nome: "João Silva",
    profissao: "Personal Trainer",
    foto: "/imagens/professores/joao-silva.jpg",
    avaliacao: "5",
  },
  {
    id: "1237",
    nome: "Renatinha",
    profissao: "Personal Trainer",
    foto: "/imagens/professores/joao-silva.jpg",
    avaliacao: "5",
  },
];

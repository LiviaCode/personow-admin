"use client";
import { useEffect, useState } from "react";

import getAllPersonal, {
  getAllPersonalResponse,
} from "@/app/http/get-all-personal";
import { MobileFiltroContainer } from "@/components/FiltroContainer";
import { ListPersonal } from "@/components/personal/listPersonal";

export default function Home() {
  const [personals, setPersonals] = useState<getAllPersonalResponse[]>([]);

  useEffect(() => {
    async function fetchPersonals() {
      try {
        const response = await getAllPersonal();
        setPersonals(response);
      } catch (error) {
        console.error("Erro ao listar:", error);
      }
    }
    fetchPersonals();
  }, []);

  return (
    <MobileFiltroContainer title="Profissionais">
      <ListPersonal personals={personals}></ListPersonal>
    </MobileFiltroContainer>
  );
}

"use client";
import { Suspense, useEffect, useState } from "react";

import getAllPersonal, {
  getAllPersonalResponse,
} from "@/app/http/personal/get-all-personal";
import { MobileFiltroContainer } from "@/components/FiltroContainer";
import { ListPersonal } from "@/components/personal/listPersonal";
import { useAlunoContext } from "@/context/AlunoContext";

export default function Home() {
  const { state } = useAlunoContext();
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
    <div className="absolute left-0 top-0 z-20 grid h-full min-h-screen w-full grid-rows-[1fr_8fr] md:relative md:z-auto">
      <header className="flex flex-col items-start justify-center px-10 py-8 text-gray-50">
        <div className="text-left">
          <h1 className="font-semibold">Olá, {state.nome}!</h1>
          <span className="text-xs">
            Encontre o melhor profissional que se encaixe com você
          </span>
        </div>
      </header>

      <div className="overflow-visible rounded-t-[25px] bg-purple-900 p-4">
        <Suspense>
          <MobileFiltroContainer title="Profissionais">
            <ListPersonal personals={personals}></ListPersonal>
          </MobileFiltroContainer>
        </Suspense>
      </div>
    </div>
  );
}

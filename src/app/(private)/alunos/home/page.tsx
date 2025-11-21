"use client";
import { getCookie } from "cookies-next";
import { Suspense, useEffect, useState } from "react";

import getAllPersonal, {
  getAllPersonalResponse,
} from "@/app/http/personal/get-all-personal";
import { MobileFiltroContainer } from "@/components/FiltroContainer";
import { ListPersonal } from "@/components/personal/listPersonal";
import { useAlunoContext } from "@/context/AlunoContext";

export default function Home() {

   useEffect(() => {
    const token = getCookie("token");


    console.log("🏁 LOGIN DETECTADO:");
    console.log("Token:", token);

  }, []);
  
  const { state } = useAlunoContext();
  const [personals, setPersonals] = useState<getAllPersonalResponse[]>([]);
  const [filteredPersonals, setFilteredPersonals] = useState<
    getAllPersonalResponse[]
  >([]);
  const [filterCity, setFilterCity] = useState("");

  useEffect(() => {
    async function fetchPersonals() {
      try {
        const response = await getAllPersonal();
        setPersonals(response);
        setFilteredPersonals(response); // lista inicial
      } catch (error) {
        console.error("Erro ao listar:", error);
      }
    }
    fetchPersonals();
  }, []);

  // 🔍 Função para aplicar o filtro de cidade
  function handleFilter() {
    if (!filterCity) {
      setFilteredPersonals(personals);
      return;
    }

    const filtrados = personals.filter((p) =>
      p.cidade.toLowerCase().includes(filterCity.toLowerCase())
    );

    setFilteredPersonals(filtrados);
  }

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
          <MobileFiltroContainer
            title="Profissionais"
            filterValue={filterCity}
            onFilterChange={setFilterCity}
            onFilterClick={handleFilter}
          >
            <ListPersonal personals={filteredPersonals} />
          </MobileFiltroContainer>
        </Suspense>
      </div>
    </div>
  );
}

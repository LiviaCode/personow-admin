"use client";

import { CalendarDays, ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { dadosPlano, getAllPlano } from "@/app/http/planos-treino/get-all-planos";

export default function PlanoDetalhes() {
  const params = useParams();
   const router = useRouter();
  const planoId = Number(params.id);

  const [plano, setPlano] = useState<dadosPlano | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    const fetchPlano = async () => {
      try {
        const planos = await getAllPlano(4); // id do aluno logado
        const encontrado = planos.find((p) => p.id === planoId);
        setPlano(encontrado || null);
      } catch (error) {
        console.error("Erro ao carregar plano:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlano();
  }, [planoId]);

  if (isLoading) {
    return <div className="text-white text-center mt-10">Carregando...</div>;
  }

  if (!plano) {
    return <div className="text-white text-center mt-10">Plano não encontrado.</div>;
  }

  const groupExercisesByMuscle = (sessao: any) => {
    return sessao.itemExercicios.reduce((groups: any, item: any) => {
      const muscleGroup = item.ExercicioPersonal.grupo_muscular;
      if (!groups[muscleGroup]) {
        groups[muscleGroup] = [];
      }
      groups[muscleGroup].push(item);
      return groups;
    }, {});
  };

  return (
    <div className="min-h-screen bg-purple-900 text-white p-4">
      {/* Header */}
      <header className="flex items-center gap-4 mb-4">
          <button onClick={() => router.back()} className="text-orange-400">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-lg font-semibold flex-1">
          Treinos 
        </h1>
        <CalendarDays className="text-orange-400 size-6" />
      </header>

      {/* Dias da semana */}
      <div className="flex justify-between text-center mb-6">
        {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((dia, index) => (
          <div key={index} onClick={() => setSelectedDay(index)} className="flex flex-col items-center cursor-pointer">
            <span className="text-xs">{dia}</span>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                selectedDay === index ? "bg-orange-400 text-purple-900 font-bold" : "bg-purple-800"
              }`}
            >
              {10 + index}
            </div>
          </div>
        ))}
      </div>

      {/* Grupo muscular e exercícios */}
      <div className="bg-purple-800 rounded-2xl p-4 space-y-4">
        {plano.SessaoTreinos.length > 0 ? (
          plano.SessaoTreinos.map((sessao) => {
            const groupedExercises = groupExercisesByMuscle(sessao);

            return Object.keys(groupedExercises).map((grupoMuscular) => (
              <div key={grupoMuscular} className="space-y-4">
                <h2 className="text-white font-semibold mb-4">{grupoMuscular}</h2>

                <div className="grid gap-4">
                  {groupedExercises[grupoMuscular].map((item) => (
                    <div
                      key={item.id}
                      className="bg-yellow-400 text-purple-900 rounded-2xl p-3 grid grid-cols-[1fr_auto] items-center cursor-pointer hover:opacity-90 transition"
                       onClick={() => router.push(
                      `exercicio/${item.ExercicioPersonal.id}?dados=${encodeURIComponent(JSON.stringify(item.ExercicioPersonal))}`)}
                    >
                      <div>
                        <h3 className="font-semibold text-sm">
                          {item.ExercicioPersonal.nome}
                        </h3>
                        <p className="text-xs">Repetições: {item.repeticoes} </p>
                      </div>
                      <div className="row-span-2 flex justify-center text-orange-500">
                        <ChevronLeft className="rotate-180 size-6 sm:size-10" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ));
          })
        ) : (
          <p className="text-gray-400 text-sm">Nenhum exercício encontrado.</p>
        )}
      </div>
    </div>
  );
}

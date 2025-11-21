"use client";

import { ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { dadosPlano } from "@/app/http/planos-treino/get-all-planos";
import { MobileFiltroContainer } from "@/components/FiltroContainer";
import { useAlunoContext } from "@/context/AlunoContext";

export default function MinhasAulas() {
  const { state } = useAlunoContext();
  const router = useRouter();

  const [planos, setPlanos] = useState<dadosPlano[]>([
    {
      id: 1,
      personal_id: "10",
      aluno_id: "5",
      data_inicio: "2025-01-10T00:00:00Z",
      data_fim: "2025-03-10T00:00:00Z",
      nome: "Plano de Hipertrofia",
      status: "ativo",
      observacoes_gerais: "Foco em ganho de massa e força.",
      created_at: "2025-01-05T12:00:00Z",
      updated_at: "2025-01-05T12:00:00Z",
      SessaoTreinos: [],
      personal_nome: "Carlos Silva",
    },
    {
      id: 2,
      personal_id: "11",
      aluno_id: "5",
      data_inicio: "2025-02-15T00:00:00Z",
      data_fim: "2025-04-15T00:00:00Z",
      nome: "Plano de Emagrecimento",
      status: "ativo",
      observacoes_gerais: "Treinos leves e aeróbicos.",
      created_at: "2025-02-10T12:00:00Z",
      updated_at: "2025-02-10T12:00:00Z",
      SessaoTreinos: [],
      personal_nome: "Mariana Rocha",
    },
  ]);

  const handleCardClick = (planoId: number) => {
    router.push(`/minhas-aulas/${planoId}`);
  };

  return (
    <div className="absolute left-0 top-0 z-20 grid h-full min-h-screen w-full grid-rows-[1fr_8fr] md:relative md:z-auto">
      <header className="flex flex-col items-start justify-center px-10 py-8 text-gray-50">
        <div className="text-left">
          <h1 className="font-semibold">Olá, {state?.nome ?? "Aluno"}!</h1>
          <span className="text-xs">
            Confira as aulas que seus personais deixaram pra você
          </span>
        </div>
      </header>

      <div className="overflow-visible rounded-t-[25px] bg-purple-900 p-4">
        <Suspense>
          <MobileFiltroContainer title="Minhas Aulas">
            <ul className="space-y-3">
              {planos.map((plano) => (
                <li
                  key={plano.id}
                  onClick={() => handleCardClick(plano.id)}
                  className="rounded-2xl bg-purple-800 p-4 text-white shadow cursor-pointer transition-all duration-200 hover:bg-purple-700 active:scale-[0.98] grid grid-cols-[1fr_auto] items-center"
                >
                  <div>
                    <h2 className="font-semibold text-base">
                      Plano: {plano.nome}
                    </h2>
                    <p className="text-sm text-gray-300">
                      Personal: {plano.personal_nome}
                    </p>
                    <p className="text-xs text-gray-400">
                      Início: {new Date(plano.data_inicio).toLocaleDateString("pt-BR")}
                    </p>
                    <p className="text-xs text-gray-400">
                      Fim: {new Date(plano.data_fim).toLocaleDateString("pt-BR")}
                    </p>
                  </div>

                  <div className="row-span-2 flex justify-center text-orange-500">
                    <ChevronRightIcon className="size-6 sm:size-10" />
                  </div>
                </li>
              ))}
            </ul>
          </MobileFiltroContainer>
        </Suspense>
      </div>
    </div>
  );
}

// com api
// "use client";

// import { Suspense, useEffect, useState } from "react";

// import { api } from "@/app/api-client";
// import { dadosPlano, getAllPlano } from "@/app/http/planos-treino/get-all-planos";
// import { MobileFiltroContainer } from "@/components/FiltroContainer";
// import { useAlunoContext } from "@/context/AlunoContext";

// export default function MinhasAulas() {
//   const { state } = useAlunoContext(); 
//   const [planos, setPlanos] = useState<dadosPlano[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function fetchPlanos() {
//       if (!state?.id) return;
//       try {
//         setIsLoading(true);
//         const response = await getAllPlano(Number(state.id));


//         const planosComPersonal = await Promise.all(
//           response.map(async (plano) => {
//             try {
//               const personalResponse = await api
//                 .get(`personal/${plano.personal_id}`)
//                 .json<{ nome: string }>();
//               return { ...plano, personal_nome: personalResponse.nome };
//             } catch {
//               return { ...plano, personal_nome: "Personal desconhecido" };
//             }
//           })
//         );

//         setPlanos(planosComPersonal);
//       } catch (error) {
//         console.error("Erro ao listar planos:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchPlanos();
//   }, [state]);

//   return (
//      <div className="absolute left-0 top-0 z-20 grid h-full min-h-screen w-full grid-rows-[1fr_8fr] md:relative md:z-auto">
//         <header className="flex flex-col items-start justify-center px-10 py-8 text-gray-50">
//             <div className="text-left">
//                 <h1 className="font-semibold">Olá, {state.nome}!</h1>
//                 <span className="text-xs">
//                     Confira as aulas que seus personais deixaram pra você
//                 </span>
//             </div>
//         </header>
        
//       <div className="overflow-visible rounded-t-[25px] bg-purple-900 p-4">
//         <Suspense>
//         <MobileFiltroContainer title="Minhas Aulas">
//             {isLoading ? (
//               <p className="text-white text-center py-4">Carregando...</p>
//             ) : planos.length > 0 ? (
//               <ul className="space-y-3">
//                 {planos.map((plano) => (
//                   <li
//                     key={plano.id}
//                     className="rounded-2xl bg-purple-800 p-4 text-white shadow"
//                   >
//                     <h2 className="font-semibold text-base">
//                       Plano: {plano.nome}
//                     </h2>
//                     <p className="text-sm text-gray-300">
//                       Personal: {plano.personal_nome}
//                     </p>
//                     <p className="text-xs text-gray-400">
//                       Início: {new Date(plano.data_inicio).toLocaleDateString()}
//                     </p>
//                     <p className="text-xs text-gray-400">
//                       Fim: {new Date(plano.data_fim).toLocaleDateString()}
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-white text-center py-4">
//                 Nenhum plano encontrado.
//               </p>
//             )}
//           </MobileFiltroContainer> 
//         </Suspense>
//       </div>
//     </div>
//   );
// }

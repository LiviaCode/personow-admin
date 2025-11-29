"use client";

import { ChevronLeft } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { dadosExercicio } from "@/app/http/exercicios/get-all-exercicio";

export default function ExercicioDetalhes() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const id = Number(params.id);
  const dadosUrl = searchParams.get("dados");

  const [exercicio, setExercicio] = useState<dadosExercicio | null>(null);
  
  useEffect(() => {
  console.log("EXERCICIO RECEBIDO:", exercicio);
}, [exercicio]);


  useEffect(() => {
    // Se veio pela URL → usar diretamente
    if (dadosUrl) {
      try {
        const exercicioObj = JSON.parse(dadosUrl);
        setExercicio(exercicioObj);
        return;
      } catch (err) {
        console.error("Erro ao converter dados da URL:", err);
      }
    }

    // Se quiser depois implementar GET por ID:
    // fetchExercicioById(id);

  }, [id, dadosUrl]);

  if (!exercicio) {
    return (
      <div className="text-center text-white mt-10">
        Exercício não encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-900 text-white p-4">
      <header className="flex items-center gap-4 mb-4">
        <button onClick={() => router.back()} className="text-orange-400">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-lg font-semibold flex-1">
          {exercicio.grupo_muscular} - {exercicio.nome}
        </h1>
      </header>

      <div className="bg-purple-800 rounded-2xl p-4 space-y-4">
        <video controls className="w-full h-64 rounded-md">
          <source
            src={exercicio.videoExercicios?.[0]?.url}
            type="video/mp4"
          />
        </video>

        <p>{exercicio.descricao}</p>
      </div>
    </div>
  );
}

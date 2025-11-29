import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router'; // Correção: useRouter deve ser importado de next/router
import { useEffect, useState } from 'react';

import { dadosExercicio, getAllExercicio } from '@/app/http/exercicios/get-all-exercicio';

export default function ExercicioDetalhes() {
  const router = useRouter();  // Correção: useRouter deve ser utilizado
  const { id } = router.query;  // Pega o id da URL
  const [exercicio, setExercicio] = useState<dadosExercicio | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExercicio = async () => {
      try {
        const exercicios = await getAllExercicio();
        const encontrado = exercicios.find((ex) => ex.id === Number(id)); // Encontra o exercício específico
        setExercicio(encontrado || null);
      } catch (error) {
        console.error('Erro ao carregar o exercício:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchExercicio();
    }
  }, [id]);

  if (isLoading) {
    return <div className="text-white text-center mt-10">Carregando...</div>;
  }

  if (!exercicio) {
    return <div className="text-white text-center mt-10">Exercício não encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-purple-900 text-white p-4">
      <header className="flex items-center gap-4 mb-4">
        <button onClick={() => router.back()} className="text-orange-400">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-lg font-semibold flex-1">{exercicio.grupo_muscular} - {exercicio.nome}</h1>
      </header>

      <div className="bg-purple-800 rounded-2xl p-4 space-y-4">
        <video controls className="w-full h-64">
          <source src={exercicio.videoExercicios[0].url} type="video/mp4" />
          Seu navegador não suporta o formato de vídeo.
        </video>

        <p className="text-white">{exercicio.descricao}</p>
      </div>
    </div>
  );
}

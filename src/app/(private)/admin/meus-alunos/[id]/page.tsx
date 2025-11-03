"use client";

import { useEffect, useState } from "react";

import getAluno from "@/app/http/aluno/get-aluno";
import {
  createExercicioDetalhe,
  createExercicioDetalheRequest,
} from "@/app/http/exercicios/create-detalhes";
import {
  dadosExercicio,
  getAllExercicio,
} from "@/app/http/exercicios/get-all-exercicio";
import {
  createPlano,
  createPlanoRequest,
} from "@/app/http/planos-treino/create-plano";
import {
  createSessao,
  createSessaoRequest,
} from "@/app/http/planos-treino/create-sessao";
import {
  dadosPlano,
  dadosSessao,
  getAllPlano,
} from "@/app/http/planos-treino/get-all-planos";
import { alertError, alertSuccess } from "@/components/alert";
import { CampoForm, DynamicForm } from "@/components/form";
import { Button } from "@/components/ui/button";

import PlanoList from "./listPlanos";
import DynamicModal from "./modalForm";

// ======= Tipos =======
type ProfilePersonalProps = {
  params: Promise<{ id: string }>;
};

// ======= Componente Principal =======
export default function Sessaos({ params }: ProfilePersonalProps) {
  const [id, setId] = useState<number | null>(null);
  const [aluno, setAluno] = useState<{ nome: string } | null>(null);
  const [planos, setPlanos] = useState<dadosPlano[]>([]);
  const [exercicios, setExercicios] = useState<dadosExercicio[]>([]);
  const [loading, setLoading] = useState(false);

  // ======= Dados do formulário =======
  const [formPlanoData, setFormPlanoData] = useState<createPlanoRequest>({
    nome: "",
    data_inicio: "",
    data_fim: "",
    status: "",
    observacoes_gerais: "",
  });

  const [formSessaoData, setFormSessaoData] = useState<createSessaoRequest>({
    id: "",
    identificador: "",
    ordem: "",
    titulo: "",
  });

  const [formExercicioData, setFormExercicioData] =
    useState<createExercicioDetalheRequest>({
      id_sessao: "",
      exercicio_personal_id: "",
      ordem: 0,
      series: 0,
      repeticoes: 0,
      tempo_descanso_segundos: 0,
      observacoes: "",
    });

  // ======= Controle de Modal =======
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "VerExercicios" | "CriarPlano" | "CriarSessao" | null
  >(null);
  const [sessaoSelecionada, setSessaoSelecionada] =
    useState<dadosSessao | null>(null);

  // ======= Função genérica para mudança =======
  const handleChange = <T,>(
    setter: React.Dispatch<React.SetStateAction<T>>,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = e.target;
    setter((prev) => ({ ...prev, [id]: value }));
  };

  // ======= Busca inicial de dados =======
  // ======= Busca aluno e planos =======
  useEffect(() => {
    const fetchAluno = async () => {
      const { id } = await params;
      setId(Number(id));
      try {
        const data = await getAluno(Number(id));
        setAluno(data);

        const response = await getAllPlano(Number(id));
        setPlanos(response);

        const exercicios = await getAllExercicio();
        setExercicios(exercicios);
      } catch {
        alertError(
          "Falha ao carregar dados do aluno, tente novamente mais tarde",
        );
      }
    };

    fetchAluno();
  }, [params]);

  // ======= Recarregar planos =======
  const fetchPlanos = async () => {
    if (!id) return;
    const response = await getAllPlano(id);
    setPlanos(response);
  };

  // ======= Manipulação de formulários =======
  const handleSubmitPlano = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      setLoading(true);
      await createPlano(id, formPlanoData);
      await fetchPlanos();
      closeModal();
      alertSuccess("Plano criado com sucesso!");
    } catch {
      alertError("Erro ao criar o plano.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSessao = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createSessao(formSessaoData);
      await fetchPlanos();
      closeModal();
      alertSuccess("Sessão criada com sucesso!");
    } catch {
      alertError("Erro ao criar a sessão.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitExercicio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createExercicioDetalhe(formExercicioData);
      await fetchPlanos();
      alertSuccess("Exercício adicionado com sucesso!");
    } catch {
      alertError("Erro ao adicionar exercício.");
    } finally {
      setLoading(false);
    }
  };

  // ======= Modal =======
  const openModal = (
    type: "VerExercicios" | "CriarPlano" | "CriarSessao",
    sessao?: dadosSessao,
  ) => {
    setModalType(type);
    setModalOpen(true);
    if (sessao) setSessaoSelecionada(sessao);
  };

  const closeModal = () => {
    setModalType(null);
    setModalOpen(false);
    setSessaoSelecionada(null);
  };

  // ======= Estrutura de formulários =======
  const formPlano: CampoForm[] = [
    { key: "nome", label: "Nome do treino", type: "text" },
    { key: "data_inicio", label: "Data de início", type: "date" },
    { key: "data_fim", label: "Data final", type: "date" },
    {
      key: "observacoes_gerais",
      label: "Informações adicionais",
      type: "text",
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "", value: "" },
        { label: "Ativo", value: "Ativo" },
        { label: "Concluído", value: "Concluido" },
        { label: "Futuro", value: "Futuro" },
      ],
    },
  ];

  const formSessao: CampoForm[] = [
    {
      key: "identificador",
      label: "Dia da semana",
      type: "select",
      options: [
        { label: "", value: "" },
        { label: "Segunda", value: "Segunda" },
        { label: "Terça", value: "Terca" },
        { label: "Quarta", value: "Quarta" },
        { label: "Quinta", value: "Quinta" },
        { label: "Sexta", value: "Sexta" },
        { label: "Sábado", value: "Sabado" },
        { label: "Domingo", value: "Domingo" },
      ],
    },
    {
      key: "id",
      label: "Escolha o plano de treino",
      type: "select",
      options: [
        { label: "", value: "" },
        ...planos.map((p) => ({ label: p.nome, value: String(p.id) })),
      ],
    },
    { key: "titulo", label: "Título", type: "text" },
    { key: "ordem", label: "Ordem", type: "number" },
  ];

  const todasSessoes = planos.flatMap((p) => p.SessaoTreinos || []);

  const formExercicio: CampoForm[] = [
    {
      key: "id_sessao",
      label: "Escolha a sessão",
      type: "select",
      options: [
        { label: "", value: "" },
        ...todasSessoes.map((s) => ({ label: s.titulo, value: String(s.id) })),
      ],
    },
    {
      key: "exercicio_personal_id",
      label: "Escolha o exercício",
      type: "select",
      options: [
        { label: "", value: "" },
        ...exercicios.map((e) => ({ label: e.nome, value: String(e.id) })),
      ],
    },
    { key: "series", label: "Séries", type: "number" },
    { key: "repeticoes", label: "Repetições", type: "number" },
    { key: "tempo_descanso_segundos", label: "Descanso (s)", type: "number" },
    { key: "ordem", label: "Ordem", type: "number" },
    { key: "observacoes", label: "Informação adicional", type: "text" },
  ];

  // ======= Renderização =======
  if (!aluno) return null;

  return (
    <>
      <div className="space-y-4 p-4 md:p-6">
        <h1 className="text-2xl font-semibold">{aluno.nome}</h1>

        <div className="flex flex-col gap-5 md:flex-row">
          <PlanoList planos={planos} onOpenModal={openModal} />

          <div className="w-full">
            <div className="mb-2 flex justify-between">
              <h2 className="text-xl font-semibold text-text-web">
                Adicionar exercício
              </h2>
              <div>
                <Button
                  onClick={() => openModal("CriarPlano")}
                  className="mr-2 border border-purple-800 bg-transparent text-xs text-purple-800 hover:bg-purple-900"
                >
                  Criar plano
                </Button>
                <Button
                  onClick={() => openModal("CriarSessao")}
                  className="border border-purple-800 bg-transparent text-xs text-purple-800 hover:bg-purple-900"
                >
                  Criar sessão
                </Button>
              </div>
            </div>

            <DynamicForm
              campos={formExercicio}
              valores={{ ...formExercicioData }}
              onChange={(e) => handleChange(setFormExercicioData, e)}
              onSubmit={handleSubmitExercicio}
              loading={loading}
              submitLabel="Adicionar exercício"
            />
          </div>
        </div>
      </div>

      <DynamicModal
        isOpen={modalOpen}
        onClose={closeModal}
        modalType={modalType}
        formPlano={formPlano}
        formPlanoData={formPlanoData}
        formSessao={formSessao}
        formSessaoData={formSessaoData}
        handleChange={(formType, e) => {
          if (formType === "plano") handleChange(setFormPlanoData, e);
          else if (formType === "sessao") handleChange(setFormSessaoData, e);
          else handleChange(setFormExercicioData, e);
        }}
        handleSubmitPlano={handleSubmitPlano}
        handleSubmitSessao={handleSubmitSessao}
        loading={loading}
        sessaoSelecionada={sessaoSelecionada}
      />
    </>
  );
}

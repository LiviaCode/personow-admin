"use client";

import { useEffect, useState } from "react";

import {
  createExercicio,
  createExercicioRequest,
} from "@/app/http/exercicios/create-exercicio";
import { deleteExercicio } from "@/app/http/exercicios/delete-exercicio";
import {
  dadosExercicio,
  getAllExercicio,
} from "@/app/http/exercicios/get-all-exercicio";
import { updateExercicio } from "@/app/http/exercicios/update-exercicio";
import { alertError, alertSuccess } from "@/components/alert";
import { CampoForm, DynamicForm } from "@/components/form";
import { TablePersonal } from "@/components/tablePersonal";
import Modal from "@/components/ui/modal";

const columns = [
  { key: "id", label: "Id" },
  { key: "nome", label: "Nome", searchable: true },
  { key: "grupo_muscular", label: "Grupo muscular" },
  { key: "descricao", label: "Descrição" },
];

const camposFormExercicio: CampoForm[] = [
  {
    key: "nome",
    label: "Nome do exercício:",
    type: "text",
    placeholder: "Rosca Direta",
  },
  {
    key: "descricao",
    label: "Descrição do exercício:",
    type: "textarea",
    placeholder: "Em pé, segure a barra...",
  },
  {
    key: "grupo_muscular",
    label: "Grupo muscular:",
    type: "text",
    placeholder: "Superiores",
  },
  {
    key: "video",
    label: "Upload de vídeo:",
    type: "file",
  },
];

export default function Catalogo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "Cadastrar" | "Editar" | "Video" | null
  >(null);
  const [dados, setDados] = useState<dadosExercicio[]>([]);
  const [formExercicio, setFormExercicio] = useState<createExercicioRequest>({
    nome: "",
    grupo_muscular: "",
    descricao: "",
  });
  const [loading, setLoading] = useState(false);
  const [exercicioId, setExercicioId] = useState<number | null>(null);

  // ======= Busca inicial =======
  useEffect(() => {
    getExercicios();
  }, []);

  async function getExercicios() {
    try {
      const response = await getAllExercicio();
      setDados(response);
    } catch (error) {
      console.error("Erro ao buscar exercícios:", error);
    }
  }

  // ======= Funções de formulário =======
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormExercicio((prev) => ({ ...prev, [id]: value }));
  };

  // Função que envia o formulario (Criando o exercicio ou atualizando)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formExercicio).some((v) => !v)) {
      alertError("Preencha todos os campos!");
      return;
    }

    try {
      setLoading(true);
      if (modalType === "Editar" && exercicioId != null) {
        await updateExercicio(exercicioId, formExercicio);
        setDados((prev) =>
          prev.map((item) =>
            item.id === exercicioId ? { ...item, ...formExercicio } : item,
          ),
        );
      } else {
        const novo = await createExercicio(formExercicio);
        setDados((prev) => [...prev, novo]);
      }
      alertSuccess("Seu catálogo de exercicios foi atualizado com sucesso");
      setModalOpen(false);
      closeModal();
    } catch {
      alertError(
        "Falha ao atualizar o catálogo, tente novamente mais tarde...",
      );
    } finally {
      setLoading(false);
    }
  };

  async function excluirExercicio(id: number) {
    try {
      await deleteExercicio(id);
      setDados((prev) => prev.filter((item) => item.id !== id));
      alertSuccess("Exercicio deletado com sucesso");
    } catch {
      alertError("Falha ao deletar o exercicio, tente novamente mais tarde.");
    }
  }

  // ======= Modal =======
  const openModal = (
    type: "Cadastrar" | "Editar" | "Video",
    exercicio?: dadosExercicio,
  ) => {
    setModalType(type);
    setModalOpen(true);

    if (type === "Editar" && exercicio) {
      setExercicioId(exercicio.id);
      setFormExercicio({
        nome: exercicio.nome,
        grupo_muscular: exercicio.grupo_muscular,
        descricao: exercicio.descricao,
      });
    }
  };

  const closeModal = () => {
    setFormExercicio({
      nome: "",
      grupo_muscular: "",
      descricao: "",
    });
    setModalType(null);
    setModalOpen(false);
    setExercicioId(null);
  };

  return (
    <>
      <TablePersonal
        title="Catálogo de Exercícios"
        addLabel="Cadastrar exercício"
        columns={columns}
        data={dados}
        onAdd={() => openModal("Cadastrar")}
        actions={[
          {
            label: "Ver vídeo",
            onClick: (x) => openModal("Video", x),
          },
          {
            label: "Editar",
            onClick: (x) => openModal("Editar", x),
          },
          { label: "Excluir", onClick: (x) => excluirExercicio(x.id) },
        ]}
      />

      {/* ======= Modal Dinâmico ======= */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={
          modalType === "Cadastrar" ? "Cadastrar Exercício" : "Editar Exercício"
        }
      >
        <DynamicForm
          campos={camposFormExercicio}
          valores={{ ...formExercicio }}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel={
            modalType === "Cadastrar"
              ? "Cadastrar exercício"
              : "Salvar alterações"
          }
        />
      </Modal>
    </>
  );
}

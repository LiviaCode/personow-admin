"use client";

import { useEffect, useState } from "react";

import { createExercicio } from "@/app/http/exercicios/create-exercicio";
import createVideoExercicio from "@/app/http/exercicios/create-video";
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

type createExercicioRequest = {
  nome: string;
  grupo_muscular: string;
  descricao: string;
  video: FileList;
};

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
    video: {} as FileList,
  });
  const [loading, setLoading] = useState(false);
  const [exercicioSelecionado, setExercicioSelecionado] =
    useState<dadosExercicio | null>(null);

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
    const { id, value, files, type } = e.target as HTMLInputElement;

    if (type === "file" && files) {
      setFormExercicio((prev) => ({ ...prev, [id]: files }));
    } else {
      setFormExercicio((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formExercicio).some((v) => !v)) {
      alertError("Preencha todos os campos!");
      return;
    }

    try {
      setLoading(true);
      if (modalType === "Editar" && exercicioSelecionado) {
        await updateExercicio(exercicioSelecionado.id, formExercicio);
        setDados((prev) =>
          prev.map((item) =>
            item.id === exercicioSelecionado.id
              ? { ...item, ...formExercicio }
              : item,
          ),
        );
        if (formExercicio.video && formExercicio.video.length > 0) {
          const videoRequests = {
            exercicio_personal_id: exercicioSelecionado.id,
            video: formExercicio.video,
          };
          await createVideoExercicio(videoRequests);
        }
      } else {
        const novo = await createExercicio(formExercicio);
        setDados((prev) => [...prev, novo]);

        if (formExercicio.video && formExercicio.video.length > 0) {
          const videoRequests = {
            exercicio_personal_id: novo.id,
            video: formExercicio.video,
          };
          await createVideoExercicio(videoRequests);
        }
      }
      alertSuccess("Seu catálogo de exercicios foi atualizado com sucesso");
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
    setExercicioSelecionado(exercicio ?? null);

    if (type === "Editar" && exercicio) {
      setFormExercicio({
        nome: exercicio.nome,
        grupo_muscular: exercicio.grupo_muscular,
        descricao: exercicio.descricao,
        video: {} as FileList,
      });
    }
  };

  const closeModal = () => {
    setFormExercicio({
      nome: "",
      grupo_muscular: "",
      descricao: "",
      video: {} as FileList,
    });
    setModalType(null);
    setModalOpen(false);
    setExercicioSelecionado(null);
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

      {/* ======= Modal de Cadastro/Edição ======= */}
      {(modalType === "Cadastrar" || modalType === "Editar") && (
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          title={
            modalType === "Cadastrar"
              ? "Cadastrar Exercício"
              : "Editar Exercício"
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
      )}

      {/* ======= Modal de Vídeo ======= */}
      {modalType === "Video" && exercicioSelecionado && (
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          title={`Vídeo - ${exercicioSelecionado.nome}`}
        >
          {exercicioSelecionado.videoExercicios?.length > 0 ? (
            <video
              controls
              className="w-full rounded-lg"
              src={exercicioSelecionado.videoExercicios[0].url}
            />
          ) : (
            <p className="text-center text-gray-500">
              Nenhum vídeo disponível para este exercício.
            </p>
          )}
        </Modal>
      )}
    </>
  );
}

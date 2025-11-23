"use client";

import { useEffect, useState } from "react";

import { alertError, alertSuccess } from "@/components/alert";
import { CampoForm, DynamicForm } from "@/components/form";
import { TablePersonal } from "@/components/tablePersonal";
import Modal from "@/components/ui/modal";

const columns = [
  { key: "tipo", label: "Tipo" },
  { key: "valor", label: "Valor" },
  { key: "status", label: "Status", searchable: true },
];

const camposFormPlanos: CampoForm[] = [
  {
    key: "tipo",
    label: "Tipo de plano:",
    type: "select",
    options: ["Aula avulsa", "Mensal", "Semestral", "Anual"],
  },
  {
    key: "Valor",
    label: "Digite o preço do plano:",
    type: "number",
  },
  {
    key: "status",
    label: "Status:",
    type: "select",
    options: ["ativo", "inativo"],
  },
];

type createPlanoRequest = {
  tipo: string;
  valor: number;
  status: string;
};

export default function Planos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "Cadastrar" | "Editar" | "Video" | null
  >(null);
  const [dados, setDados] = useState<createPlanoRequest[]>([]);
  const [formPlano, setFormPlano] = useState<createPlanoRequest>({
    tipo: "",
    valor: 0,
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] =
    useState<createPlanoRequest | null>(null);

  // ======= Busca inicial =======
  useEffect(() => {
    getPlanos();
  }, []);

  async function getPlanos() {
    try {
      //puxar da api os planos
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
    const { id, value } = e.target as HTMLInputElement;

    setFormPlano((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      alertSuccess("Seu catálogo de planos foi atualizado com sucesso");
      closeModal();
    } catch {
      alertError("Falha ao atualizar planos, tente novamente mais tarde...");
    } finally {
      setLoading(false);
    }
  };

  async function excluirPlano() {
    try {
      alertSuccess("Plano deletado com sucesso");
    } catch {
      alertError("Falha ao deletar o plano, tente novamente mais tarde.");
    }
  }

  // ======= Modal =======
  const openModal = (
    type: "Cadastrar" | "Editar",
    plano?: createPlanoRequest,
  ) => {
    setModalType(type);
    setModalOpen(true);
    setPlanoSelecionado(plano ?? null);

    if (type === "Editar" && plano) {
      setFormPlano({
        tipo: plano.tipo,
        valor: plano.valor,
        status: plano.status,
      });
    }
  };

  const closeModal = () => {
    setModalType(null);
    setModalOpen(false);
    setPlanoSelecionado(null);
  };

  return (
    <>
      <TablePersonal
        title="Planos"
        addLabel="Adicionar plano"
        columns={columns}
        data={dados}
        onAdd={() => openModal("Cadastrar")}
        actions={[
          {
            label: "Editar",
            onClick: (x) => openModal("Editar", x),
          },
          { label: "Excluir", onClick: () => excluirPlano() },
        ]}
      />

      {/* ======= Modal de Cadastro/Edição ======= */}
      {(modalType === "Cadastrar" || modalType === "Editar") && (
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          title={modalType === "Cadastrar" ? "Cadastrar plano" : "Editar plano"}
        >
          <DynamicForm
            campos={camposFormPlanos}
            valores={{ ...formPlano }}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel={
              modalType === "Cadastrar"
                ? "Cadastrar plano"
                : "Salvar alterações"
            }
          />
        </Modal>
      )}
    </>
  );
}

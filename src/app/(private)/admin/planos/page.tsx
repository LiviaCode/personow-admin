"use client";

import { useEffect, useState } from "react";

import createPlano from "@/app/http/personal/create-plano";
import deletePlano from "@/app/http/personal/delete-plano";
import getAllPlano, {
  GetAllPlanoResponse,
} from "@/app/http/personal/get-all-planos";
import updatePlano from "@/app/http/personal/update-plano";
import { alertError, alertSuccess } from "@/components/alert";
import { CampoForm, DynamicForm } from "@/components/form";
import { TablePersonal } from "@/components/tablePersonal";
import Modal from "@/components/ui/modal";

const columns = [
  { key: "id", label: "Id" },
  { key: "tipo_plano", label: "Tipo" },
  { key: "valor", label: "Valor" },
  { key: "updated_at", label: "Data de atualização" },
];

const camposFormPlanos: CampoForm[] = [
  {
    key: "tipo_plano",
    label: "Tipo de plano:",
    type: "select",
    options: ["Avulsa", "Experimental", "Mensal", "Bimestral", "Trimestral"],
  },
  {
    key: "valor",
    label: "Digite o preço do plano:",
    type: "number",
  },
];

type createPlanoRequest = {
  tipo_plano: "Avulsa" | "Experimental" | "Mensal" | "Bimestral" | "Trimestral";
  valor: number;
};

export default function Planos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"Cadastrar" | "Editar" | null>(
    null,
  );
  const [dados, setDados] = useState<GetAllPlanoResponse[]>([]);
  const [formPlano, setFormPlano] = useState<createPlanoRequest>({
    tipo_plano: "Avulsa",
    valor: 0,
  });
  const [loading, setLoading] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] =
    useState<GetAllPlanoResponse | null>(null);

  // ======= Busca inicial =======
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    setId(storedId);
    if (!id) return;
    getPlanos(id);
  }, [id]);

  async function getPlanos(id: string) {
    try {
      //puxar da api os planos
      const response = await getAllPlano(id);

      const formatado = response.map((item) => ({
        ...item,
        updated_at: new Date(item.updated_at).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      setDados(formatado);
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
    if (Object.values(formPlano).some((v) => !v)) {
      console.log(formPlano);
      alertError("Preencha todos os campos!");
      return;
    }

    try {
      setLoading(true);

      if (modalType === "Editar" && planoSelecionado) {
        await updatePlano(planoSelecionado.id, formPlano);
        setDados((prev) =>
          prev.map((item) =>
            item.id === planoSelecionado.id ? { ...item, ...formPlano } : item,
          ),
        );
      } else {
        if (!id) return;
        const body = {
          personal_id: id,
          ...formPlano,
        };
        const novo = await createPlano(body);
        const formatado = {
          ...novo.data,
          updated_at: new Date(novo.data.updated_at).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setDados((prev) => [...prev, formatado]);
      }
      alertSuccess("Seu catálogo de planos foi atualizado com sucesso");
      closeModal();
    } catch {
      alertError("Falha ao atualizar planos, tente novamente mais tarde...");
    } finally {
      setLoading(false);
    }
  };

  async function excluirPlano(id: string) {
    try {
      await deletePlano(id);
      alertSuccess("Plano deletado com sucesso");
      setDados((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alertError("Falha ao deletar o plano, tente novamente mais tarde.");
    }
  }

  // ======= Modal =======
  const openModal = (
    type: "Cadastrar" | "Editar",
    plano?: GetAllPlanoResponse,
  ) => {
    setModalType(type);
    setModalOpen(true);
    setPlanoSelecionado(plano ?? null);

    if (type === "Editar" && plano) {
      setFormPlano({
        tipo_plano: plano.tipo_plano,
        valor: plano.valor,
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
          { label: "Excluir", onClick: (x) => excluirPlano(x.id) },
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

import { createPlanoRequest } from "@/app/http/planos-treino/create-plano";
import { createSessaoRequest } from "@/app/http/planos-treino/create-sessao";
import { dadosSessao } from "@/app/http/planos-treino/get-all-planos";
import { DynamicForm } from "@/components/form";
import { CampoForm } from "@/components/form";
import Modal from "@/components/ui/modal";

type DynamicModalProps = {
  isOpen: boolean;
  onClose: () => void;
  modalType: "VerExercicios" | "CriarPlano" | "CriarSessao" | null;
  formPlano: CampoForm[];
  formPlanoData: createPlanoRequest;
  formSessao: CampoForm[];
  formSessaoData: createSessaoRequest;
  handleChange: (
    formType: "plano" | "sessao" | "exercicio",
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  handleSubmitPlano: (e: React.FormEvent) => Promise<void>;
  handleSubmitSessao: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
  sessaoSelecionada: dadosSessao | null;
};

export default function DynamicModal(props: DynamicModalProps) {
  const {
    isOpen,
    onClose,
    modalType,
    formPlano,
    formPlanoData,
    formSessao,
    formSessaoData,
    handleChange,
    handleSubmitPlano,
    handleSubmitSessao,
    loading,
    sessaoSelecionada,
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        modalType === "VerExercicios"
          ? sessaoSelecionada
            ? `Exercícios — ${sessaoSelecionada.titulo}`
            : "Exercícios da sessão"
          : modalType === "CriarSessao"
            ? "Crie a aula do seu aluno"
            : "Crie um plano de treino para o seu aluno"
      }
    >
      {modalType === "CriarSessao" && (
        <DynamicForm
          campos={formSessao}
          valores={{ ...formSessaoData }}
          onChange={(e) => handleChange("sessao", e)}
          onSubmit={handleSubmitSessao}
          loading={loading}
          submitLabel="Criar Sessão"
        />
      )}

      {modalType === "CriarPlano" && (
        <DynamicForm
          campos={formPlano}
          valores={{ ...formPlanoData }}
          onChange={(e) => handleChange("plano", e)}
          onSubmit={handleSubmitPlano}
          loading={loading}
          submitLabel="Criar Plano"
        />
      )}

      {modalType === "VerExercicios" && sessaoSelecionada && (
        <div className="space-y-2">
          {sessaoSelecionada.itemExercicios.length > 0 ? (
            sessaoSelecionada.itemExercicios.map((ex) => (
              <div
                key={ex.id}
                className="rounded border border-gray-200 p-2 text-sm"
              >
                <b>{ex.ExercicioPersonal.nome}</b>
                <p>
                  {ex.series} séries de {ex.repeticoes} repetições — descanso:{" "}
                  {ex.tempo_descanso_segundos}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm italic text-gray-500">
              Nenhum exercício cadastrado nesta sessão.
            </p>
          )}
        </div>
      )}
    </Modal>
  );
}

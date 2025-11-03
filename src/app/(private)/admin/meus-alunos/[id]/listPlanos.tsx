import {
  dadosPlano,
  dadosSessao,
} from "@/app/http/planos-treino/get-all-planos";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type PlanoListProps = {
  planos: dadosPlano[];
  onOpenModal: (
    type: "VerExercicios" | "CriarPlano" | "CriarSessao",
    sessao?: dadosSessao,
  ) => void;
};

export default function PlanoList({ planos, onOpenModal }: PlanoListProps) {
  return (
    <div className="max-h-[75vh] w-full overflow-y-auto rounded-lg bg-purple-800">
      <div className="flex items-center p-5 text-white">
        <Label>Lista dos planos</Label>
        {/* <input
          type="date"
          className="w-32 rounded border border-white bg-transparent p-2 focus:outline-none"
        /> */}
      </div>

      <div className="flex flex-col gap-4 px-5">
        {planos.length > 0 ? (
          planos.map((plano) => (
            <div
              key={`plano-${plano.id}-${plano.nome}`}
              className="flex flex-col gap-2 rounded-lg bg-[#FFEE58] p-3 text-gray-700 shadow-xl"
            >
              <div className="flex justify-between md:text-base">
                <span className="text-md font-medium">{plano.nome}</span>
                <span className="text-md">{plano.status}</span>
              </div>
              <span className="text-xs">
                {new Date(plano.data_inicio).toLocaleDateString("pt-BR")} →{" "}
                {new Date(plano.data_fim).toLocaleDateString("pt-BR")}
              </span>

              {/* ======= Sessões ======= */}
              <div className="mt-2 rounded p-1 text-sm">
                {plano.SessaoTreinos.length > 0 ? (
                  plano.SessaoTreinos.map((sessao) => (
                    <div
                      key={`sessao-${sessao.id}-${sessao.titulo}`}
                      className="flex items-center justify-between border-b border-gray-700 py-1"
                    >
                      <span className="text-xs">
                        {sessao.titulo}: {sessao.identificador}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => onOpenModal("VerExercicios", sessao)}
                        className="border border-gray-700 bg-transparent text-xs text-gray-700 hover:bg-orange-800"
                      >
                        Ver exercícios
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs italic text-gray-700">
                    Ainda não há sessões criadas.
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-white opacity-80">
            Nenhum plano de treino cadastrado.
          </p>
        )}
      </div>
    </div>
  );
}

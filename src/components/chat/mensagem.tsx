export type MensagemProps = {
  conteudo: string;
  data: string;
  tipo: "enviada" | "recebida";
};

export function Mensagem({ conteudo, data, tipo }: MensagemProps) {
  const isEnviada = tipo === "enviada";

  function formatTime(data: string) {
    const date = new Date(data);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }); // "14:32"
  }
  return (
    <div className={`flex ${isEnviada ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`flex min-w-[10%] max-w-[70%] flex-col rounded-lg p-2 text-sm ${isEnviada ? "bg-orange-800 text-white" : "bg-purple-900 text-white"}`}
      >
        <span>{conteudo}</span>
        <span className="text-end text-xs text-gray-300">
          {formatTime(data)}
        </span>
      </div>
    </div>
  );
}

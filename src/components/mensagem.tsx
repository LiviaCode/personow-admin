export type MensagemProps = {
  texto: string;
  hora: string;
  tipo: 'enviada' | 'recebida';
};

export function Mensagem({ texto, hora, tipo }: MensagemProps) {
  const isEnviada = tipo === 'enviada';
  return (
    <div className={`flex ${isEnviada ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`flex max-w-[70%] flex-col rounded-lg p-2 text-sm ${isEnviada ? 'bg-orange-800 text-white' : 'bg-purple-900 text-white'}`}
      >
        <span>{texto}</span>
        <span className='text-end text-xs text-gray-300'>{hora}</span>
      </div>
    </div>
  );
}

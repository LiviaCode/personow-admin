import { ChevronRightIcon, ImageIcon } from 'lucide-react';

type PreviaMensagemProps = {
  nome: string;
  mensagem: string;
};

export function PreviaMensagem({ nome, mensagem }: PreviaMensagemProps) {
  return (
    <div className='m-1 grid h-20 grid-flow-col grid-rows-2 items-center justify-items-center border-b border-gray-300 text-gray-200'>
      <div className='row-span-2 flex w-20 justify-center'>
        <ImageIcon className='size-10'></ImageIcon>
      </div>
      <h2 className='w-60'>{nome}</h2>
      <span className='w-60 pb-3 text-gray-400'>{mensagem}</span>
      <a href='#' className='row-span-2 flex w-10 justify-center'>
        <ChevronRightIcon className='size-10' />
      </a>
    </div>
  );
}

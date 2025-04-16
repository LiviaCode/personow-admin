import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChatMensagem } from './chat-mensagem';
import { PreviaMensagem } from './previa-mensagem';
import { Filtrar } from './filtrar';

const previaMensagens = [
  { nome: 'Stefanie Rodrigies', mensagem: 'Lorem ipsum dolor sit amet.' },
  { nome: 'Helena ferreira', mensagem: 'Lorem ipsum dolor sit amet.' },
];

export default function PageMensagens() {
  return (
    <div className='space-y-4 p-6'>
      <div className='flex items-center justify-between text-2xl font-semibold text-text-web'>
        <h1>Mensagens</h1>
        <Button className='mx-1'>Minha agenda </Button>
      </div>
      <Separator />

      <div className='flex items-center justify-start'>
        <Filtrar />
      </div>

      <div className='flex h-[26rem] rounded-[8px] bg-purple-900 p-2'>
        <div className='flex w-1/3 flex-col'>
          {previaMensagens.map((msg, index) => (
            <PreviaMensagem key={index} {...msg} />
          ))}
        </div>

        <div className='w-2/3 bg-purple-800'>
          <ChatMensagem />
        </div>
      </div>
    </div>
  );
}

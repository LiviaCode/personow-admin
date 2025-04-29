import { FiltroContainer } from '../../../../components/FiltroContainer'
import { ChatMensagem } from './chat-mensagem'
import { PreviaMensagem } from './previa-mensagem'

const previaMensagens = [
  { nome: 'Stefanie Rodrigies', mensagem: 'Lorem ipsum dolor sit amet.' },
  { nome: 'Helena ferreira', mensagem: 'Lorem ipsum dolor sit amet.' },
]

const selectOptions = [
  { label: 'Todas', value: 'msgTodas' },
  { label: 'Lidas', value: 'msgLidas' },
  { label: 'Não lidas', value: 'msgNaoLidas' },
]

export default function PageMensagens() {
  return (
    <FiltroContainer title="Mensagens" selectOptions={selectOptions}>
      <div className="flex h-[26rem] rounded-[8px] bg-purple-900 p-2">
        <div className="flex w-1/3 flex-col">
          {previaMensagens.map((msg, index) => (
            <PreviaMensagem key={index} {...msg} />
          ))}
        </div>

        <div className="w-2/3 bg-purple-800">
          <ChatMensagem />
        </div>
      </div>
    </FiltroContainer>
  )
}

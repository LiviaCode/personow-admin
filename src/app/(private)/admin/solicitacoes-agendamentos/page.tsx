import { FiltroContainer } from '../../../../components/FiltroContainer'
import TablePersonal from '../../../../components/tablePersonal'

const Column = [
  { key: 'nome', label: 'Nome' },
  { key: 'data', label: 'Data' },
  { key: 'hora', label: 'Hora' },
  { key: 'status', label: 'Status' },
]

const selectOptions = [
  { label: 'Pendente', value: 'pendente' },
  { label: 'Aprovado', value: 'aprovada' },
  { label: 'Negado', value: 'negada' },
]

export default function MeusAlunos() {
  return (
    <FiltroContainer
      title="Solicitações de Agendamento"
      selectOptions={selectOptions}
    >
      <TablePersonal columns={Column} datas={dados} />
    </FiltroContainer>
  )
}

// TESTE -- APAGAR DEPOIS
const dados = [
  {
    nome: 'Stefanie',
    data: '2025-04-16',
    hora: '08:30',
    status: true,
    acao: 'Login',
  },
  {
    nome: 'Carlos',
    data: '2025-04-15',
    hora: '09:45',
    status: false,
    acao: 'Logout',
  },
  {
    nome: 'Julia',
    data: '2025-04-14',
    hora: '10:15',
    status: true,
    acao: 'Cadastro',
  },
]

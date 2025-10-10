'use client'

import { useEffect, useState } from 'react'

import getAllAlunos, { Aluno } from '@/app/http/aluno/get-all-aluno'
import TablePersonal from '@/components/tablePersonal'

import { FiltroContainer } from '../../../../components/FiltroContainer'

const Column = [
  { key: 'nome', label: 'Nome' },
  { key: 'email', label: 'E-mail' },
  { key: 'celular', label: 'Celular' },
]

const selectOptions = [{ label: 'todas', value: 'cidade' }]

export function TableAlunos() {
  const [dados, setDados] = useState<
    { nome: string; email: string; celular: string }[]
  >([])

  useEffect(() => {
    async function fetchAlunos() {
      try {
        const response = await getAllAlunos()
  
        const alunosFormatados = response.map((aluno: Aluno) => ({
          nome: aluno.nome,
          email: aluno.email,
          celular: aluno.celular,
        }))
        
        setDados(alunosFormatados)
      } catch (error) {
        console.error('Erro ao buscar alunos:', error)
      }
    }

    fetchAlunos()
  }, [])

  return (
    <FiltroContainer title="Meus Alunos" selectOptions={selectOptions}>
      <TablePersonal columns={Column} datas={dados} />
    </FiltroContainer>
  )
}

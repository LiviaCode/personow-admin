'use client'

import 'dayjs/locale/pt-br'

import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createAgenda } from '@/app/http/agenda/create-agenda'
import { Button } from '@/components/ui/button'


dayjs.locale('pt-br')

type NovoEvento = {
  title: string
  start: string
  end: string
}

type PopupModalProps = {
  onClose: () => void
  addEvent: (evento: NovoEvento) => void
  dateTime: string | null
}

const formSchema = z.object({
  horaInicio: z.string().min(1, 'Obrigatório'),
  horaFim: z.string().min(1, 'Obrigatório'),
  diaTodo: z.boolean(),
})

type FormData = z.infer<typeof formSchema>

export default function PopupModal({ onClose, addEvent, dateTime }: PopupModalProps) {
  const data = dayjs(dateTime)
  const dataStr = data.format('D [de] MMMM [de] YYYY')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      horaInicio: data.format('HH:mm'),
      horaFim: data.add(1, 'hour').format('HH:mm'),
      diaTodo: false,
    },
  })

  const diaTodo = watch('diaTodo')

  const formataData = (hora: string) => {
    const [h, m] = hora.split(':')
    return data.hour(parseInt(h)).minute(parseInt(m)).second(0)
  }

  const onSubmit = async (form: FormData) => {
    const start = formataData(form.diaTodo ? '00:00' : form.horaInicio)
    const end = formataData(form.diaTodo ? '23:59' : form.horaFim)

    const personal_id = Number(localStorage.getItem('id'));

    const payload = {
      title: 'Desabilitado',
      date_init: start.format('YYYY-MM-DD HH:mm:ss'),
      date_end: end.format('YYYY-MM-DD HH:mm:ss'),
      personal_id: personal_id,
    }

    console.log('Payload enviado à API:', payload)

    try {
      await createAgenda(payload)
      console.log('Restrição cadastrada com sucesso!')
    } catch (error) {
      console.error('Erro ao cadastrar restrição:', error)
    }

    addEvent({
      title: 'Desabilitado',
      start: start.toISOString(),
      end: end.toISOString(),
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-55">
      <div className="m-2 flex w-full max-w-md flex-col gap-1 rounded-xl bg-white p-6 shadow-lg">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <X className="text-orange-500 transition-colors hover:text-orange-600" />
          </button>
        </div>

        <h1 className="text-center text-xl font-semibold text-orange-500">{dataStr}</h1>
        <p className="text-center text-sm text-gray-500">Confirme o horário que deseja desabilitar</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col items-center gap-2 p-4">
            <label htmlFor="horaInicio" className="text-sm font-medium text-gray-700">
              Início:
            </label>
            <input
              id="horaInicio"
              type="time"
              {...register('horaInicio')}
              disabled={diaTodo}
              className="w-2/3 rounded-md border border-orange-300 p-2 text-center text-gray-700 md:w-1/3"
            />
            {errors.horaInicio && <p className="text-sm text-red-500">{errors.horaInicio.message}</p>}

            <label htmlFor="horaFim" className="text-sm font-medium text-gray-700">
              Até:
            </label>
            <input
              id="horaFim"
              type="time"
              {...register('horaFim')}
              disabled={diaTodo}
              className="w-2/3 rounded-md border border-orange-300 p-2 text-center text-gray-700 md:w-1/3"
            />
            {errors.horaFim && <p className="text-sm text-red-500">{errors.horaFim.message}</p>}
          </div>

          <div className="flex items-center gap-2">
            <input
              id="diaTodo"
              type="checkbox"
              {...register('diaTodo')}
              className="accent-orange-500"
            />
            <label htmlFor="diaTodo" className="text-sm text-gray-700">
              O dia todo
            </label>
          </div>

          <Button type="submit" className="w-full bg-purple-800 text-white hover:bg-purple-900">
            Confirmar
          </Button>
        </form>
      </div>
    </div>
  )
}

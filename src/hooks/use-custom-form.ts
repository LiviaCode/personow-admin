import { zodResolver } from '@hookform/resolvers/zod'
import {
  type DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { ZodType, ZodTypeDef } from 'zod'

type UseCustomFormOptions<T extends FieldValues> = {
  schema: ZodType<T, ZodTypeDef>
  onSubmit: SubmitHandler<T>
  defaultValues?: DefaultValues<T>
}

export function useCustomForm<T extends FieldValues>({
  schema,
  onSubmit,
  defaultValues,
}: UseCustomFormOptions<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const { handleSubmit, ...methods } = form

  const submitHandler = handleSubmit(onSubmit)

  return {
    ...methods,
    submitHandler,
  }
}

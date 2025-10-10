import { z } from 'zod'

export const signInForm = z.object({
  email: z.string().email({ message: 'Por favor, digite um e-mail válido.' }),
password: z.string().min(6, "A senha deve ter pelo menos 3 caracteres"),
})

export type SignInForm = z.infer<typeof signInForm>

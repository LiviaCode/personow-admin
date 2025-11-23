"use client";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { profileAluno } from "@/app/http/aluno/profile-aluno";
import { Label } from "@/components/label";
import { Background } from "@/components/svg/background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginAluno() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>();

  async function onSubmit(data: LoginFormData) {
    setErrorMessage(null);

    try {
      const response = await profileAluno({
        email: data.email,
        password: data.password,
      });

      console.log("Login bem-sucedido:", response);

      // Token
      setCookie("token", response.token, {
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      localStorage.setItem("id", response.id);

      // Redireciona para home do aluno
      router.push("/alunos/home");
    } catch (err) {
      console.log("ERRO LOGIN:", err);
      setErrorMessage("E-mail ou senha inválidos. Tente novamente.");
    }
  }

  return (
    <div className="flex h-screen">
      <div className="relative flex-1 overflow-hidden bg-purple-800">
        <Background className="h-full" />
        <div className="absolute inset-0 bg-purple-800/50" />
      </div>

      <div className="flex w-full max-w-md flex-col justify-center bg-purple-900 p-10 text-white">
        <h2 className="mb-2 text-2xl font-bold">ENTRAR</h2>
        <p className="mb-6 text-sm">
          Faça login inserindo as suas informações abaixo.
        </p>
        <hr className="mb-6 border-gray-400" />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label>E-mail</Label>
            <Input
              {...register("email")}
              type="email"
              placeholder="Digite seu e-mail"
              className="w-full rounded border border-orange-400 bg-transparent p-2 text-white"
            />
          </div>

          <div>
            <Label>Senha</Label>
            <Input
              {...register("password")}
              type="password"
              placeholder="Digite sua senha"
              className="w-full rounded border border-orange-400 bg-transparent p-2 text-white"
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-400">{errorMessage}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full rounded bg-orange-400 p-3 font-semibold text-white"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs">
          Não possui conta?{" "}
          <a href="/registrar-aluno" className="font-bold text-white">
            Cadastrar-se
          </a>
        </p>
      </div>
    </div>
  );
}

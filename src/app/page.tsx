'use client'

import { useRouter } from "next/navigation";

import { Background } from "@/components/svg/background";
import { LogoIcon } from "@/components/svg/logo";
import { Button } from "@/components/ui/button"

export default function WelcomeScreen() {
	const router = useRouter()

	return (
	<div className="flex h-screen">
					<div className="flex-1 relative overflow-hidden bg-purple-800">
					<Background
					className="h-full" />
					<div className="absolute inset-0 bg-purple-800/50" />
				  </div>	
			<div className="flex items-center w-full max-w-md justify-center flex-col  bg-purple-900 p-10 text-white">
				<div className="mb-6">
					<div className=" flex items-center justify-center">
					<LogoIcon />
					</div>
				</div>
				<h1 className="text-3xl font-bold mb-2">Bem vindo!</h1>
				<p className="text-center text-lg mb-6">
					Transformando metas em conquistas.
				</p>
				<div className="flex flex-col gap-4 w-full max-w-xs">
					<Button 
					onClick={() => router.push("/entrar-aluno")}
					className="bg-orange-800 text-white font-semibold py-2 rounded-md hover:bg-orange-900 transition">
						Sou Aluno
					</Button>
					<Button
					 
					onClick={() => {
						console.log("Navegando para a rota /entrar-personal");
					router.push("/entrar-personal")}}
					className="bg-purple-900 border border-orange-800 text-orange-800 font-semibold py-2 rounded-md hover:bg-orange-900 hover:text-white transition">
						Sou Personal Treiner
					</Button>
				</div>
			</div>
	</div>
	)
}

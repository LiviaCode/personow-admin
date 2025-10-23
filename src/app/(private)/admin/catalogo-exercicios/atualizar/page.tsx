"use client";

import { Label } from "@/components/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AtualizarExercicio() {
  return (
    <div className="flex w-full max-w-md flex-col p-10 text-2xl font-semibold text-text-web">
      <h2 className="mb-2 text-2xl font-semibold">Atualizar exercicio</h2>
      <form className="flex flex-col gap-4">
        <div>
          <Label htmlFor="name" className="text-black">
            Nome do exercicio:
          </Label>
          <Input
            type="text"
            id="name"
            placeholder="Rosca Direta"
            className="w-full rounded border border-orange-400 bg-transparent p-2 placeholder:text-xs placeholder:text-gray-400"
          />
        </div>
        <div>
          <Label htmlFor="descricao" className="text-black">
            Descrição do exercicio
          </Label>
          <Input
            type="text"
            id="descricao"
            placeholder="Em pé, segure a barra..."
            className="w-full rounded border border-orange-400 bg-transparent p-2 placeholder:text-xs placeholder:text-gray-400"
          />
        </div>
        <div>
          <Label htmlFor="genero" className="text-black">
            Grupo muscular
          </Label>
          <select
            id="grupo"
            className="w-full rounded border border-orange-400 bg-transparent p-2 text-sm text-gray-400"
          >
            <option value="">Selecione</option>
            <option value="Feminino">Pernas</option>
            <option value="Masculino">Ombros</option>
            <option value="Outro">Biceps</option>
            <option value="Outro">Triceps</option>
            <option value="Outro">Gluteos</option>
          </select>
        </div>
        <div>
          <Label htmlFor="video" className="text-black">
            Upload de video
          </Label>
          <Input
            type="file"
            accept="video/*"
            className="mt-4 rounded border border-orange-400 bg-transparent p-2 text-gray-400"
          />
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            type="submit"
            className="w-full rounded bg-orange-400 p-3 font-semibold text-white hover:bg-orange-500"
          >
            Atualizar
          </Button>
        </div>
      </form>
    </div>
  );
}

import Image from "next/image";

import { getAlunoResponse } from "@/app/http/get-aluno";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PagePerfil(props: getAlunoResponse) {
  const dadosPessoais = [
    { id: "nome", label: "Nome Completo", type: "text", value: props.nome },
    {
      id: "dataNasc",
      label: "Data de nascimento",
      type: "text",
      value: props.dateNascimento,
    },
    { id: "email", label: "Email", type: "email", value: props.email },
    { id: "celular", label: "Celular", type: "text", value: props.celular },
  ];

  const dadosSaude = [
    { id: "altura", label: "Altura", type: "number", value: props.altura },
    { id: "peso", label: "Peso", type: "number", value: props.peso },
    {
      id: "condMedica",
      label: "Condição médica",
      type: "text",
      value: props.condicaoMedica,
    },
    {
      id: "historico",
      label: "Histórico de lesão",
      type: "text",
      value: props.historicoLesao,
    },
    {
      id: "objetivo",
      label: "Objetivos",
      type: "text",
      value: props.objetivo,
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="text-center text-xs">
        <Image
          src="/imagens/professores/joao-silva.jpg"
          alt="imagem"
          width={120}
          height={120}
          className="-translate-y-10 rounded-full border-4 border-orange-500 object-cover"
        />
      </div>
      <div className="space-y-5">
        <form className="space-y-5flex flex-col" action="#">
          <h1>Informações Pessoais</h1>
          <div>
            <input type="file" accept="image/*"></input>
          </div>
          {dadosPessoais.map((dado) => (
            <div key={dado.id} className="flex flex-col">
              <label htmlFor={dado.id} defaultValue={dado.value}>
                {dado.label}
              </label>
              <Input id={dado.id} type={dado.type}></Input>
            </div>
          ))}

          <div>
            <label htmlFor="genero">Genero:</label>
            <select name="genero" defaultValue={props.genero}>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <Button>Salvar</Button>
        </form>
        <form className="space-y-5" action="#">
          <h1>Informações de Saúde e Condicionamento</h1>

          {dadosSaude.map((campo) => (
            <div key={campo.id} className="flex flex-col">
              <label htmlFor={campo.id}>{campo.label}</label>
              <Input
                id={campo.id}
                type={campo.type}
                defaultValue={campo.value}
              />
            </div>
          ))}

          <div>
            <label htmlFor="nivel">Nivel atual de atividade física:</label>
            <select name="nivel" defaultValue={props.nivelAtividade}>
              <option value="sedentário">Sedentário</option>
              <option value="moderado">Moderado</option>
              <option value="ativo">Ativo</option>
            </select>
          </div>

          <Button>Salvar</Button>
        </form>
      </div>
    </div>
  );
}

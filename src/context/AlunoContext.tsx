import { createContext, useContext, useEffect, useState } from "react";

import getAluno from "@/app/http/aluno/get-aluno";

type logonAluno = {
  id: string;
  nome: string;
  email: string;
};

const inicialAluno: logonAluno = {
  id: "",
  nome: "",
  email: "",
};

type AlunoContextProps = {
  state: logonAluno;
  setState: React.Dispatch<React.SetStateAction<logonAluno>>;
};

const inicialContextValue = {
  state: inicialAluno,
  setState: () => {},
};

export const AlunoContext =
  createContext<AlunoContextProps>(inicialContextValue);

type AlunoContextProviderProps = {
  children: React.ReactNode;
};

export function AlunoContextProvider({ children }: AlunoContextProviderProps) {
  const [state, setState] = useState(inicialAluno);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id !== null) {
      async function fetchPersonals() {
        try {
          const response = await getAluno(Number(id));

          const alunoLogado = {
            id: String(response.id),
            nome: response.nome,
            email: response.email,
          };

          if (alunoLogado) {
            setState(alunoLogado);
          }
        } catch (error) {
          console.error("Erro ao listar:", error);
        }
      }
      fetchPersonals();
    }
  }, []);

  return (
    <AlunoContext.Provider value={{ state, setState }}>
      {children}
    </AlunoContext.Provider>
  );
}

export function useAlunoContext() {
  return useContext(AlunoContext);
}

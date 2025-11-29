import { createContext, useContext, useEffect, useState } from "react";

import getPersonal from "@/app/http/personal/get-personal";

type logonPersonal = {
  id: number;
  nome: string;
  email: string;
};

const inicialPersonal: logonPersonal = {
  id: 0,
  nome: "",
  email: "",
};

type PersonalContextProps = {
  state: logonPersonal;
  setState: React.Dispatch<React.SetStateAction<logonPersonal>>;
};

const inicialContextValue = {
  state: inicialPersonal,
  setState: () => {},
};

export const PersonalContext =
  createContext<PersonalContextProps>(inicialContextValue);

type PersonalContextProviderProps = {
  children: React.ReactNode;
};

export function PersonalContextProvider({
  children,
}: PersonalContextProviderProps) {
  const [state, setState] = useState(inicialPersonal);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      async function fetchPersonals() {
        try {
          const response = await getPersonal(String(id));
          setState(response);
        } catch (error) {
          console.error("Erro ao listar:", error);
        }
      }
      fetchPersonals();
    }
  }, []);

  return (
    <PersonalContext.Provider value={{ state, setState }}>
      {children}
    </PersonalContext.Provider>
  );
}

export function usePersonalContext() {
  return useContext(PersonalContext);
}

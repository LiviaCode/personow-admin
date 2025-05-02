import type { Metadata } from "next";

import ProvidersAlunos from "./providers";

export const metadata: Metadata = {
  title: "Personow | Aluno",
};

export default function AlunoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ProvidersAlunos>{children}</ProvidersAlunos>;
}

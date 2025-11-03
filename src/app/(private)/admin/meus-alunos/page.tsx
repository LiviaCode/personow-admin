"use client";

import { useEffect, useState } from "react";

import getAllAlunos, { Aluno } from "@/app/http/aluno/get-all-aluno";
import getAluno, { getAlunoResponse } from "@/app/http/aluno/get-aluno";
import { TablePersonal } from "@/components/tablePersonal";
import Modal from "@/components/ui/modal";

const Column = [
  { key: "id", label: "Id", searchable: true },
  { key: "nome", label: "Nome", searchable: true },
  { key: "email", label: "E-mail" },
  { key: "plano", label: "plano" },
];

export default function MeusAlunos() {
  const [dados, setDados] = useState<
    { id: string; nome: string; email: string; celular: string }[]
  >([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [alunoDetalhe, setAlunoDetalhe] = useState<getAlunoResponse | null>(
    null,
  );
  const [loadingDetalhe, setLoadingDetalhe] = useState(false);

  useEffect(() => {
    async function fetchAlunos() {
      try {
        const response = await getAllAlunos();

        const alunosFormatados = response.map((aluno: Aluno) => ({
          id: aluno.id,
          nome: aluno.nome,
          email: aluno.email,
          celular: aluno.celular,
        }));

        setDados(alunosFormatados);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    }

    fetchAlunos();
  }, []);

  const abrirModal = async (id: string) => {
    setModalOpen(true);
    setLoadingDetalhe(true);
    try {
      const detalhe = await getAluno(Number(id));
      setAlunoDetalhe(detalhe);
    } catch (error) {
      console.error("Erro ao buscar detalhes do aluno:", error);
    } finally {
      setLoadingDetalhe(false);
    }
  };

  const fecharModal = () => {
    setAlunoDetalhe(null);
    setModalOpen(false);
  };

  return (
    <>
      <TablePersonal
        title="Lista de Alunos"
        addLabel="Catálogo de exercícios"
        columns={Column}
        data={dados}
        onAdd={() => (window.location.href = "/admin/catalogo-exercicios")}
        actions={[
          {
            label: "Aulas",
            onClick: (row) => (window.location.href = `meus-alunos/${row.id}`),
          },
          {
            label: "Ver mais informações",
            onClick: (row) => abrirModal(row.id),
          },
        ]}
      />

      {/* ======= Modal ======= */}
      <Modal
        isOpen={modalOpen}
        onClose={fecharModal}
        title={alunoDetalhe ? `${alunoDetalhe.nome}` : "Carregando..."}
      >
        {loadingDetalhe ? (
          <p>Carregando informações do aluno...</p>
        ) : alunoDetalhe ? (
          <div className="space-y-2 text-sm">
            <p>
              <b>Nome:</b> {alunoDetalhe.nome}
            </p>
            {alunoDetalhe.dateNascimento && (
              <p>
                <b>Data de Nascimento:</b> {alunoDetalhe.dateNascimento}
              </p>
            )}
            {alunoDetalhe.genero && (
              <p>
                <b>Gênero:</b> {alunoDetalhe.genero}
              </p>
            )}
            {alunoDetalhe.altura && (
              <p>
                <b>Altura:</b> {alunoDetalhe.altura}
              </p>
            )}
            {alunoDetalhe.peso && (
              <p>
                <b>Peso:</b> {alunoDetalhe.peso}
              </p>
            )}
            {alunoDetalhe.condicaoMedica && (
              <p>
                <b>Condição Médica:</b> {alunoDetalhe.condicaoMedica}
              </p>
            )}
            {alunoDetalhe.historicoLesao && (
              <p>
                <b>Histórico de Lesões:</b> {alunoDetalhe.historicoLesao}
              </p>
            )}
            {alunoDetalhe.nivelAtividade && (
              <p>
                <b>Nível de Atividade:</b> {alunoDetalhe.nivelAtividade}
              </p>
            )}
            {alunoDetalhe.objetivo && (
              <p>
                <b>Objetivo:</b> {alunoDetalhe.objetivo}
              </p>
            )}
            {alunoDetalhe.Endereco && (
              <p>
                <b>Endereço:</b> {alunoDetalhe.Endereco}
              </p>
            )}
          </div>
        ) : (
          <p>Não foi possível carregar os dados do aluno.</p>
        )}
      </Modal>
    </>
  );
}

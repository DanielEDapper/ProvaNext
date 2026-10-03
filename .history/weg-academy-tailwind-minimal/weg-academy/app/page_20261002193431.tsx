"use client"

import { useState, useEffect, useMemo } from "react";
import CardCurso from "./components/CardCurso";

const URL_BASE = "https://dynamic-events-api.onrender.com/api/eventos";

interface CursoAPI {
  id: string; 
  nome: string; 
  descricao: string; 
  preco: number | string; 
  categoria: string; 
  imagem:string;
}

export default function Home() {
  const [cursos, setCurso] = useState<CursoAPI[]>([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState<boolean>(true)
  const [erro, setErro] = useState("")
  const [categoria, setCategoria] = useState("todas")

  useEffect(() => {
    async function carregarDados()
    {
      try{
        const resposta = await fetch(URL_BASE);

        if(!resposta.ok)
        {
          throw new Error("Erro na requisição");
        }

        const dados = await resposta.json();

        setCurso(
          dados.filter((c : CursoAPI) => {
            const cursos = c.categoria.toLowerCase().includes("Cursos")
          })
        );
      }
      catch{
        setErro("Erro ao carregar os produtos. Tente novamente.");
      }
      finally{
        setCarregando(false);
      }
    }
    carregarDados()
  }, []);

  const cursosFiltrados = useMemo(() => {
    const texto = busca.toLowerCase().trim();

    return cursos.filter((curso) => {
      const correspondePesquisa =
        curso.nome.toLowerCase().includes(texto) ||
        curso.descricao.toLowerCase().includes(texto);

      return correspondePesquisa;

    });
  }, [cursos, busca]);
 
  return (
    <main className="p-8">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center
        sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-600">Catálogo de Cursos</h1>
            <p className="mt-1 text-sm text-slate-500">Treinamentos e capacitações técnicas exclusivas</p>
          </div>
          
          {/* CAMPO DE BUSCA */}
          <div className="relative w-full sm:w-72">
            <input
            type="text"
            placeholder="Buscar curso..."
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm
            text-slate-800 outline-none transition-all focus:border-blue-600 focus:ring-2
            focus:ring-blue-100"
            onChange={(e) => setBusca(e.target.value)}
            />

            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400
            hover:text-slate-600"
            disabled={busca === ""}>
              ✕
            </button>
          </div>
        </section>

        {/* MENSAGEM DE ERRO */}

        {erro && (
          <p className="text-center text-red-400 py-10">{erro}</p>
        )}

        {/* MENSAGEM DE CARREGAMENTO */}
      
        {!carregando && (
          <p className="text-center text-slate-400 py-10">
            Carregando catálogo...
          </p>
        )}


        {/* GRID DE CURSOS */}

        {!carregando && !erro && cursosFiltrados.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cursosFiltrados.map((curso) => (
                <CardCurso
                  key={curso.id}
                  id={curso.id}
                  title={curso.nome}
                  description={curso.descricao}
                  category={curso.categoria}
                  price={curso.preco}
                  image={curso.imagem}
                  
                />
              ))}
          </div>
        )}
      </div>
    </main>
  );
}
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import CardCurso from "./components/CardCurso";

const URL_BASE = "https://dynamic-events-api.onrender.com/api/eventos";

interface CursoAPI {
  id: string; 
  title: string; 
  description: string; 
  price: number | string; 
  category: string; 
  image:string;
}

export default function Home() {
  const [cursos, setCurso] = useState<CursoAPI[]>([]);
  const [busca, setBuscar] = useState("");
  const [carregando, setCarregando] = useState<boolean>(true)
  const [erro, setErro] = useState("")

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
            const cursos = c.category.toLowerCase().includes("Cursos")
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
  }, []);

  const titulo = useMemo(() => {
    return Array.from(new Set(cursos.map((curso) => curso.category)));
  }, [cursos]);

  const produtosFiltrados = useMemo(() => {
    const texto = busca.toLowerCase().trim();

    return cursos.filter((curso) => {
      const correspondePesquisa =
        curso.title.toLowerCase().includes(texto) ||
        curso.description.toLowerCase().includes(texto);

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
          {/* PASSO HOME 10: Vincular a variável de estado 'busca' ao valor do input e
          atualizar com onChange */}
          <input
          type="text"
          placeholder="Buscar curso..."
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm
          text-slate-800 outline-none transition-all focus:border-blue-600 focus:ring-2
          focus:ring-blue-100"
          onChange={(e) => setPesquisa(e.target.value)}
          />
          {/* PASSO HOME 11: Renderizar o botão de limpar campo apenas quando houver
          algo digitado na busca */}
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400
          hover:text-slate-600">
          ✕
          </button>
          </div>
        </section>
      {/* MENSAGEM DE ERRO */}
      {/* PASSO HOME 12: Exibir mensagem de erro caso o estado 'erro' não seja nulo */}
      {/* MENSAGEM DE CARREGAMENTO */}
      {/* PASSO HOME 13: Exibir a mensagem "Carregando catálogo..." caso o estado
      'carregando' seja true */}
      {/* GRID DE CURSOS */}
      {/* PASSO HOME 14: Caso 'carregando' seja false e existam itens, utilizar o método
      .map() na lista filtrada */}
      {/* PASSO HOME 15: Retornar o componente <CardCurso /> passando as props (id,
      title, description, category, price, image) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Exemplo de onde o map() irá renderizar os cards */}
      </div>
      </div>
    </main>
  );
}

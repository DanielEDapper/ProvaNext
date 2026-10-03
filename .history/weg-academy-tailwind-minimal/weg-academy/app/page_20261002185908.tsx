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
      // Verifica se o texto pesquisado aparece no nome OU na descrição.
      const correspondePesquisa =
        curso.title.toLowerCase().includes(texto) ||
        curso.description.toLowerCase().includes(texto);

      // Verifica se o produto pertence à categoria selecionada.
      // Se "todas" estiver selecionado, qualquer categoria é aceita.
      const correspondeCategoria =
        category === "todas" || produto.category === categoria;

      // O produto só aparece se passar nos dois filtros.
      return correspondePesquisa && correspondeCategoria;
    });
  }, [cursos, pesquisa, categoria]);
 
  return (
    
  );
}

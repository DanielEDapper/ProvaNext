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
    });
  }, [cursos, busca, categoria]);
 
  return (
    
  );
}

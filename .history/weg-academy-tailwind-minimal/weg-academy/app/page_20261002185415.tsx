import Image from "next/image";
import { useState, useEffect } from "react";
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
  const [erro, setErro] = useState(null)

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

        setCarregando(false);
      }
      catch
    }
  })
 
  return (
    
  );
}

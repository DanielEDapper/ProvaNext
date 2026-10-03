"use client";

import { useState, useEffect, use} from "react";
import Link from "next/link";
import Image from "next/image";

interface CursoDetalhe {
    id: string; 
    title: string; 
    description: string; 
    price: number | string; 
    category: string; 
    image:string;
    data:string;
    local:string;
    vagas_disponivel:number;
    destaque:boolean
}

export default function DetalhesCurso({ params }: { params: Promise<{ id: string }> }) 
{
    const id = use(params);

    const [curso, setCurso] = useState<CursoDetalhe>();
    const [carregando, setCarregando] = useState<boolean>(true)
    const [erro, setErro] = useState("")

    useEffect(() => {
        async function carregar()
        {

            const resposta = await fetch(`https://dynamic-events-api.onrender.com/api/eventos/${id}`);

            const dado = await resposta.json();

            setCurso(dado);
            setCarregando(false);
        }
        carregar();
    })
    // PASSO DETALHES 11: Tratar exibição da mensagem de "Curso não encontrado" caso ocorra erro ou o estado 'curso' seja null
    
    if(curso == null)
    {
        return(
            <main>
                <div>
                    <p className="text-center text-slate-400 py-10">Algo deu errado</p>
                </div>
                <div className="mt-8 border-t border-slate-100 pt-6">                
                        <Link
                        href="/"
                        className="inline-flex items-center text-sm font-semibold text-blue-600
                        hover:text-blue-800">← Voltar para a lista de cursos</Link>
                    </div>
            </main>
        )
    }
    else(

    )
    
}
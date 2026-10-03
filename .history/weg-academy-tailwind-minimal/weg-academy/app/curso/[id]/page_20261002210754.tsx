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
        
    };
    
}
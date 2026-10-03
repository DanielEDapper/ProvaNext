"use client";

import { useState, useEffect, use} from "react";
import Link from "next/link";
import Image from "next/image";

const URL_BASE = "https://dynamic-events-api.onrender.com/api/eventos";

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

            const resposta = await fetch(`${URL_BASE}${id}`, 
            {
                cache: "no-store",
            });

            const dado = await resposta.json();

            setCurso(dado);
            setCarregando(false);
        }
        carregar();
    })
    // PASSO DETALHES 11: Tratar exibição da mensagem de "Curso não encontrado" caso ocorra erro ou o estado 'curso' seja null
    

    return (
        <main className="p-8">
            {carregando && (
                <p className="text-center text-slate-400 py-10">Carregando informações...</p>
            )}

            {!carregando && !erro && (
                <p className="text-center text-slate-400 py-10">
                    Curso não encontrado
                </p>
            )}
            {carregando && (

            )}
            
        </main>

        
    );
}
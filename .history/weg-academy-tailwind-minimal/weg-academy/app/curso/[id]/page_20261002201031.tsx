"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";

const URL_BASE = "https://dynamic-events-api.onrender.com/api/eventos/";

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

export default async function DetalhesCurso({ params }: { params: Promise<{ id: string }> }) 
{
    const { id } = await params;

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
    // PASSO DETALHES 10: Tratar exibição da mensagem de "Carregando informações..."caso 'carregando' seja true
    // PASSO DETALHES 11: Tratar exibição da mensagem de "Curso não encontrado" caso ocorra erro ou o estado 'curso' seja null

    return (
        <main className="p-8">
            <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border
            border-slate-200 bg-white shadow-sm">
            {/* IMAGEM DO CURSO */}
                <div className="relative h-72 w-full bg-slate-100">
                    <Image
                    src={curso.image}
                    alt={curso.title}
                    />
                    
                </div>
                <div className="p-8">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase
                        tracking-wider text-blue-600">
                        {curso?.category}
                        </span>
                        
                        <span className="text-2xl font-extrabold text-slate-900">R$ {curso?.price}</span>
                    </div>
                
                    {/* PASSO DETALHES 15: Exibir o título do curso */}
                    <h1 className="text-3xl font-bold text-slate-800">{curso?.title}</h1>
                    
                    {/* PASSO DETALHES 16: Exibir a descrição do curso */}
                    <p className="mt-4 leading-relaxed text-slate-600">
                    {curso?.description}
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 text-sm">
                        <div>
                            <span className="block font-medium text-slate-400">📍 Localização</span>
                            {/* PASSO DETALHES 17: Exibir o local retornado pela API ou texto padrão */}
                            <span className="font-semibold text-slate-700">{curso?.local}</span>
                        </div>
                        <div>
                            <span className="block font-medium text-slate-400">🎓 Modalidade</span>
                            <span className="font-semibold text-slate-700">Presencial / Prática</span>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-slate-100 pt-6">
                    {/* PASSO DETALHES 18: Usar <Link href="/"> para o botão de voltar */}
                    <a
                    href="/"
                    className="inline-flex items-center text-sm font-semibold text-blue-600
                    hover:text-blue-800"
                    >
                    ← Voltar para a lista de cursos
                    </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
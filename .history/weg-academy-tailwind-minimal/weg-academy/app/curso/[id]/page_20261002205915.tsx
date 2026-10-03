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
            
            <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border
            border-slate-200 bg-white shadow-sm">
            {/* IMAGEM DO CURSO */}
                <div className="relative h-72 w-full bg-slate-100">
                    {/* <Image
                    src={curso.image}
                    alt={curso.title}
                    fill
                    /> */}
                    
                </div>
                <div className="p-8">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase
                        tracking-wider text-blue-600">
                        {curso?.category}
                        </span>
                        
                        <span className="text-2xl font-extrabold text-slate-900">R$ {curso?.price}</span>
                    </div>
                
                    <h1 className="text-3xl font-bold text-slate-800">{curso?.title}</h1>
                    
                    <p className="mt-4 leading-relaxed text-slate-600">
                    {curso?.description}
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 text-sm">
                        <div>
                            <span className="block font-medium text-slate-400">📍 Localização</span>
                            <span className="font-semibold text-slate-700">{curso?.local}</span>
                        </div>
                        <div>
                            <span className="block font-medium text-slate-400">🎓 Modalidade</span>
                            <span className="font-semibold text-slate-700">Presencial / Prática</span>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-slate-100 pt-6">                
                        <Link
                        href="/"
                        className="inline-flex items-center text-sm font-semibold text-blue-600
                        hover:text-blue-800">← Voltar para a lista de cursos</Link>
                    </div>
                </div>
            </div>
        </main>

        
    );
}
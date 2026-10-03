import Image from "next/image";
import { useState, useEffect } from "react";
import CardCurso from "./components/CardCurso";

interface CursoAPI {
  id: string; 
  title: string; 
  description: string; 
  price: number | string; 
  category: string; 
  image:string;
}

export default function Home() {
  const [cursos, setCurso] = useState<CursoAPI[]>([])

  return (
    
  );
}

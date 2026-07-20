"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const name = "CARLOS LOPEZ".split("");

  return (
    <div className="flex flex-col items-center justify-center">
      
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-12 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
          Disponível para Projetos
        </span>
      </div>

      <h1 className="flex justify-center text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black tracking-tighter text-white mb-8 cursor-default">
        {name.map((char, index) => (
          <motion.span
            key={index}
            className={char === " " ? "w-4 md:w-8" : "inline-block text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500"}
            whileHover={{
              scale: 1.3,
              y: -15,
              color: "#34d399", // emerald-400
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            style={{
              display: "inline-block",
            }}
          >
            {char}
          </motion.span>
        ))}
      </h1>
      
      <h2 className="text-xl sm:text-2xl font-medium text-zinc-300 mb-8">
        Engenheiro de Software & Desenvolvedor Full Stack
      </h2>
      
      <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed mb-12">
        Construindo experiências digitais de ponta e produtos reais. Focado na interseção entre <strong className="text-white">Código Premium</strong> e <strong className="text-white">Inteligência Artificial</strong>.
      </p>

      <ul className="flex items-center justify-center gap-8">
        <li>
          <a href="https://github.com/Carloslopez11" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/carlos-lopez-a54044423/" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </li>
      </ul>
    </div>
  );
}

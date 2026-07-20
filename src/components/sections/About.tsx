"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto text-left">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-16 text-center">
          Sobre Mim
        </h2>
        
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          
          {/* Columna Izquierda: Foto de Perfil */}
          <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 relative group">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-500/40 transition-all duration-500"></div>
            <img 
              src="https://github.com/Carloslopez11.png" 
              alt="Carlos Lopez" 
              className="w-full h-full object-cover rounded-full border-2 border-white/10 relative z-10 shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Columna Derecha: Nueva Narrativa */}
          <div className="space-y-6 text-xl text-zinc-400 font-light leading-relaxed flex-1">
            <p>
              Sou do tipo de pessoa que, quando coloca uma ideia na cabeça, <strong className="text-white">não para até fazer acontecer</strong>. Movido por desafios, proatividade extrema e uma fome constante de construir negócios reais.
            </p>
            <p>
              Como aluno da formação <strong className="text-white">Full Stack Pro (DevClub)</strong>, minha filosofia não é apenas escrever código bonito, mas criar <em className="text-zinc-300">soluções que resolvam problemas de mercado</em>.
            </p>
            <p>
              Estou constantemente explorando o limite das tecnologias modernas (Next.js, React, Node) e integrando <strong className="text-white">Inteligência Artificial</strong> para automatizar e otimizar produtos desde o dia zero.
            </p>
          </div>

        </div>
      </motion.div>
    </section>
  );
}

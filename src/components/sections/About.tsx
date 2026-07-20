"use client";

import { motion } from "framer-motion";

export default function About() {
  const skills = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "IA & Automação",
    "Framer Motion"
  ];

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
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16">
          
          {/* Columna Izquierda: Foto de Perfil */}
          <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 relative group mt-2">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-500/40 transition-all duration-500"></div>
            <img 
              src="/profile.png" 
              alt="Carlos Lopez" 
              className="w-full h-full object-cover rounded-full border-2 border-white/10 relative z-10 shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Columna Derecha: Narrativa Definitiva + Skills */}
          <div className="flex-1 flex flex-col gap-10">
            <div className="space-y-6 text-xl text-zinc-400 font-light leading-relaxed">
              <p>
                Sou um construtor de produtos focado em <strong className="text-white">execução rápida</strong>. Quando coloco uma ideia na cabeça, não paro até vê-la funcionando e gerando valor real para os usuários.
              </p>
              <p>
                Como aluno da formação <strong className="text-white">Full Stack Pro (DevClub)</strong>, minha especialidade é unir engenharia de software sólida com inteligência de negócios para criar soluções escaláveis, desde o front-end visual até a arquitetura do servidor.
              </p>
              <p className="text-emerald-400 font-medium italic">
                "Não assisto ao mercado, eu construo para ele."
              </p>
            </div>

            {/* Habilidades (Skills) */}
            <div className="border-t border-white/10 pt-8">
              <h3 className="text-sm font-bold tracking-widest text-zinc-500 uppercase mb-6">
                Stack & Ferramentas
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-zinc-300 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}

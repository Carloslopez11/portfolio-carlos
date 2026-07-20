"use client";

import { motion } from "framer-motion";
import { projectsData } from "@/data/projects";

export default function ProjectsGrid() {
  return (
    <section className="w-full">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-16 text-center">
        Trabalho Recente
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left mb-16">
        {projectsData.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md flex flex-col justify-between"
          >
            {/* Borde Neón Auto-Iluminado */}
            <motion.div 
              className="absolute inset-0 rounded-3xl border-2 border-emerald-500/30 pointer-events-none"
              animate={{
                borderColor: ["rgba(16, 185, 129, 0.1)", "rgba(16, 185, 129, 0.6)", "rgba(16, 185, 129, 0.1)"],
                boxShadow: ["0 0 10px rgba(16, 185, 129, 0)", "0 0 30px rgba(16, 185, 129, 0.2)", "0 0 10px rgba(16, 185, 129, 0)"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
            
            <div className="relative z-10 p-8 sm:p-10 flex flex-col h-full">
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-12">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-sm font-medium text-zinc-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-6 mt-auto">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white font-semibold hover:text-emerald-400 transition-colors"
                >
                  Ver Projeto <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                </a>
                
                {project.repo && (
                  <a 
                    href={project.repo} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-zinc-400 font-semibold hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> Repo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <a 
          href="https://github.com/Carloslopez11" 
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-emerald-400 hover:text-black transition-all duration-300 hover:scale-105"
        >
          Ver Todos os Projetos
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </section>
  );
}

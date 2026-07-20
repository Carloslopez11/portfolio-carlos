"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="relative z-10 w-full max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-12">
          Sobre Mim
        </h2>
        
        <div className="space-y-8 text-xl text-zinc-400 font-light leading-relaxed mx-auto">
          <p>
            Encontro-me em uma fase de imersão total na Engenharia de Software. Como aluno da formação <strong className="text-white">Full Stack Pro (DevClub)</strong>, minha filosofia é simples: <em className="text-zinc-300">"Não assista. Construa."</em>
          </p>
          <p>
            Tenho uma facilidade enorme para gerar ideias e tirá-las do papel. Construo projetos reais por conta própria utilizando a <strong className="text-white">Inteligência Artificial</strong> como minha dupla de pair-programming. Isso me permite aprender 10x mais rápido, resolver problemas arquitetônicos complexos e entregar produtos funcionais que já estão entrando no mercado.
          </p>
          
          <div className="mt-12 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">🏆 Missão Programação com IA</h3>
            <p className="text-lg">
              Certificado oficial pelo DevClub com aproveitamento máximo (Nota 10). Comprova minha capacidade de desenvolver aplicações web integradas com IA a partir do zero.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

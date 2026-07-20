export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  repo?: string;
  inProgress?: boolean;
}

export const projectsData: Project[] = [
  {
    id: "structa",
    title: "Structa SaaS",
    description: "Plataforma escalável construída do zero. Integração de Inteligência Artificial para otimização de processos arquitetônicos.",
    tags: ["Next.js", "React", "AI", "TailwindCSS"],
    link: "https://github.com/Carloslopez11/structa",
    repo: "https://github.com/Carloslopez11/structa",
    inProgress: true,
  },
  {
    id: "abdobot",
    title: "Abdobot",
    description: "Software avançado focado em automação e eficiência de processos, preparado para lançamento em larga escala no mercado.",
    tags: ["Node.js", "Automação", "Arquitetura"],
    link: "https://github.com/Carloslopez11/abdobot",
    repo: "https://github.com/Carloslopez11/abdobot",
    inProgress: true,
  },
  {
    id: "devclub-landing",
    title: "Elite Landing Page",
    description: "Aplicação web desenvolvida como Desafio Técnico. Design focado em conversão, animações físicas (Framer Motion) e Glassmorphism.",
    tags: ["Next.js", "Framer Motion", "UI/UX"],
    link: "https://devclub-landing-six.vercel.app",
    repo: "https://github.com/Carloslopez11/-devclub-landing",
  }
];

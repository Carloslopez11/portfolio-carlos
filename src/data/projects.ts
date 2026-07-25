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
    link: "https://structa3d.co/",
    inProgress: true,
  },
  {
    id: "abdbot",
    title: "Abdbot",
    description: "Software avançado focado em automação e eficiência de processos, preparado para lançamento em larga escala no mercado.",
    tags: ["Node.js", "Automação", "Arquitetura"],
    link: "https://abdbot-academy.vercel.app/",
    inProgress: true,
  },
  {
    id: "devclub-landing",
    title: "Elite Landing Page",
    description: "Aplicação web desenvolvida como Desafio Técnico. Design focado em conversão, animações físicas (Framer Motion) e Glassmorphism.",
    tags: ["Next.js", "Framer Motion", "UI/UX"],
    link: "https://devclub-landing-six.vercel.app",
    repo: "https://github.com/Carloslopez11/-devclub-landing",
  },
  {
    id: "live-translator",
    title: "LiveTranslator AI",
    description: "Tradução em tempo real de áudio do sistema com IA (OpenAI Whisper + GPT-4o). Interface 3D nativa com Parallax e UI Glassmorphism.",
    tags: ["Next.js", "OpenAI", "WebRTC", "Framer Motion"],
    link: "https://video-dubber-app.vercel.app",
    repo: "https://github.com/Carloslopez11/video-dubber-app",
  }
];

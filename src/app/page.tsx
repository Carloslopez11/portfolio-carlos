import Scene3D from "@/components/ui/Scene3D";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ProjectsGrid from "@/components/sections/ProjectsGrid";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Scene3D />
      
      <div className="mx-auto max-w-5xl px-6 py-24 md:px-12 flex flex-col items-center justify-center text-center space-y-40">
        
        {/* Sección Hero: Centrada y majestuosa */}
        <div className="w-full">
          <Hero />
        </div>

        {/* Sección About: Centrada, márgenes amplios */}
        <div className="w-full">
          <About />
        </div>

        {/* Proyectos: Grid simétrico */}
        <div className="w-full">
          <ProjectsGrid />
        </div>

      </div>
    </main>
  );
}

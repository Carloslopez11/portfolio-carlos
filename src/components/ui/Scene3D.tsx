"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
import { useState, useRef, Suspense } from "react";

function ParticleCloud({ ...props }) {
  const ref = useRef<any>();
  // Generate random points in a sphere
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

import * as THREE from "three";

function MeteoritesAndExplosions() {
  const meteorsCount = 10;
  const explosionsCount = 5;
  
  const meteors = useRef(
    Array.from({ length: meteorsCount }).map(() => ({
      active: true,
      position: new THREE.Vector3(2 + Math.random() * 4, 2 + Math.random() * 4, -1 - Math.random() * 2),
      velocity: new THREE.Vector3(-1 - Math.random() * 2, -1 - Math.random() * 2, 0),
      rotationSpeed: new THREE.Vector3(Math.random() * 5, Math.random() * 5, Math.random() * 5),
      scale: 0.02 + Math.random() * 0.03
    }))
  );

  const explosions = useRef(
    Array.from({ length: explosionsCount }).map(() => ({
      active: false,
      position: new THREE.Vector3(0, 0, 0),
      life: 0
    }))
  );

  const meteorMeshes = useRef<(THREE.Mesh | null)[]>([]);
  const explosionMeshes = useRef<(THREE.Mesh | null)[]>([]);
  const explosionMaterials = useRef<(THREE.MeshBasicMaterial | null)[]>([]);

  useFrame((state, delta) => {
    const mList = meteors.current;
    const eList = explosions.current;

    // Mover rocas y rotarlas
    mList.forEach((m, i) => {
      const mesh = meteorMeshes.current[i];
      if (!mesh) return;

      if (!m.active) {
        mesh.visible = false;
        return;
      }
      mesh.visible = true;
      m.position.addScaledVector(m.velocity, delta);
      mesh.position.copy(m.position);
      mesh.rotation.x += m.rotationSpeed.x * delta;
      mesh.rotation.y += m.rotationSpeed.y * delta;

      // Resetear si salen de pantalla
      if (m.position.x < -3 || m.position.y < -3) {
        m.position.set(2 + Math.random() * 4, 2 + Math.random() * 4, -1 - Math.random() * 2);
      }
    });

    // Calcular colisiones (O(N^2))
    for (let i = 0; i < mList.length; i++) {
      if (!mList[i].active) continue;
      for (let j = i + 1; j < mList.length; j++) {
        if (!mList[j].active) continue;
        
        if (mList[i].position.distanceTo(mList[j].position) < 0.15) {
          // ¡Impacto!
          mList[i].active = false;
          mList[j].active = false;
          
          // Activar explosión
          const exp = eList.find(e => !e.active);
          if (exp) {
            exp.active = true;
            exp.position.copy(mList[i].position);
            exp.life = 1.0; // Dura 1 segundo
          }
          
          // Revivir las rocas después de 2 segundos
          setTimeout(() => { mList[i].active = true; mList[i].position.set(2 + Math.random() * 4, 2 + Math.random() * 4, -1 - Math.random() * 2); }, 2000);
          setTimeout(() => { mList[j].active = true; mList[j].position.set(2 + Math.random() * 4, 2 + Math.random() * 4, -1 - Math.random() * 2); }, 2000);
        }
      }
    }

    // Animar explosiones (crecimiento y desvanecimiento)
    eList.forEach((e, i) => {
      const mesh = explosionMeshes.current[i];
      const mat = explosionMaterials.current[i];
      if (!mesh || !mat) return;

      if (!e.active) {
        mesh.visible = false;
        return;
      }
      mesh.visible = true;
      mesh.position.copy(e.position);
      
      e.life -= delta * 1.5;
      if (e.life <= 0) {
        e.active = false;
      } else {
        // Crece y se hace transparente
        const scale = 0.5 - (e.life * 0.5); 
        mesh.scale.set(scale, scale, scale);
        mat.opacity = e.life;
      }
    });
  });

  return (
    <group>
      {/* Rocas de Magma (Icosaedros) */}
      {meteors.current.map((m, i) => (
        <mesh key={`meteor-${i}`} ref={(el) => (meteorMeshes.current[i] = el)} scale={m.scale}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#ff4500" emissive="#ff8c00" emissiveIntensity={2} wireframe={true} />
        </mesh>
      ))}

      {/* Explosiones (Esferas brillantes que crecen) */}
      {explosions.current.map((e, i) => (
        <mesh key={`exp-${i}`} ref={(el) => (explosionMeshes.current[i] = el)}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial ref={(el) => (explosionMaterials.current[i] = el)} color="#ffaa00" transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-[-1] bg-black">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <ParticleCloud />
          <MeteoritesAndExplosions />
        </Suspense>
      </Canvas>
    </div>
  );
}

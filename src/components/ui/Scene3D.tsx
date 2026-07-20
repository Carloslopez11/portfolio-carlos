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

// Choques Coreografiados y Explosiones Caóticas (Fuego Realista)
function ChoreographedExplosions() {
  const meteorsCount = 6;
  const sparksCount = 200;
  
  const pairs = useRef(
    Array.from({ length: meteorsCount / 2 }).map(() => ({
      active: false,
      timer: Math.random() * 4,
      mA: { position: new THREE.Vector3(), velocity: new THREE.Vector3(), scale: 0.05 },
      mB: { position: new THREE.Vector3(), velocity: new THREE.Vector3(), scale: 0.05 },
      collisionPoint: new THREE.Vector3(),
      life: 0
    }))
  );

  const sparks = useRef(
    Array.from({ length: sparksCount }).map(() => ({
      active: false,
      position: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
      scale: 0,
      life: 0,
      color: new THREE.Color()
    }))
  );
  
  // Destellos de explosión (Flash)
  const flashes = useRef(
    Array.from({ length: 3 }).map(() => ({
      active: false,
      position: new THREE.Vector3(),
      scale: 0,
      life: 0
    }))
  );

  const mMeshesA = useRef<(THREE.Mesh | null)[]>([]);
  const mMeshesB = useRef<(THREE.Mesh | null)[]>([]);
  const sparkMeshes = useRef<(THREE.Mesh | null)[]>([]);
  const sparkMats = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const flashMeshes = useRef<(THREE.Mesh | null)[]>([]);
  const flashMats = useRef<(THREE.MeshBasicMaterial | null)[]>([]);

  const fireColors = ["#ffcc00", "#ff6600", "#ff3300", "#ffffff"];

  const startCollisionSequence = (pair: any) => {
    pair.active = true;
    pair.life = 1.5;
    
    pair.collisionPoint.set(
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 8,
      -2 - Math.random() * 4
    );
    
    pair.mA.position.set(
      pair.collisionPoint.x - 6 - Math.random() * 3,
      pair.collisionPoint.y + 6 + Math.random() * 3,
      pair.collisionPoint.z
    );
    
    pair.mB.position.set(
      pair.collisionPoint.x + 6 + Math.random() * 3,
      pair.collisionPoint.y - 6 - Math.random() * 3,
      pair.collisionPoint.z
    );
    
    pair.mA.velocity.subVectors(pair.collisionPoint, pair.mA.position).divideScalar(pair.life);
    pair.mB.velocity.subVectors(pair.collisionPoint, pair.mB.position).divideScalar(pair.life);
  };

  const triggerExplosion = (point: THREE.Vector3) => {
    // 1. Crear el destello gigante (Flash)
    const flash = flashes.current.find(f => !f.active);
    if (flash) {
      flash.active = true;
      flash.position.copy(point);
      flash.scale = 0.1;
      flash.life = 0.3; // Dura solo 0.3 segundos
    }

    // 2. Chispas caóticas de fuego
    let spawned = 0;
    const numSparks = 50 + Math.random() * 30; // Entre 50 y 80 chispas por choque
    
    for (let i = 0; i < sparks.current.length; i++) {
      const s = sparks.current[i];
      if (!s.active) {
        s.active = true;
        s.position.copy(point);
        
        // Direcciones completamente caóticas
        const speed = 5 + Math.random() * 25; // Algunas lentas, otras como balas
        s.velocity.set(
          (Math.random() - 0.5) * speed,
          (Math.random() - 0.5) * speed,
          (Math.random() - 0.5) * speed
        );
        
        s.scale = 0.01 + Math.random() * 0.04; // Tamaños de escombros muy variados
        s.life = 0.3 + Math.random() * 0.7;
        
        // Color aleatorio de fuego
        s.color.set(fireColors[Math.floor(Math.random() * fireColors.length)]);
        
        if (sparkMats.current[i]) {
          sparkMats.current[i]!.color.copy(s.color);
        }

        spawned++;
        if (spawned > numSparks) break;
      }
    }
  };

  useFrame((state, delta) => {
    // Vuelo y Choque
    pairs.current.forEach((p, i) => {
      const meshA = mMeshesA.current[i];
      const meshB = mMeshesB.current[i];
      if (!meshA || !meshB) return;

      if (!p.active) {
        meshA.visible = false;
        meshB.visible = false;
        p.timer -= delta;
        if (p.timer <= 0) startCollisionSequence(p);
        return;
      }

      meshA.visible = true;
      meshB.visible = true;
      p.mA.position.addScaledVector(p.mA.velocity, delta);
      p.mB.position.addScaledVector(p.mB.velocity, delta);
      meshA.position.copy(p.mA.position);
      meshB.position.copy(p.mB.position);
      
      meshA.rotation.x += delta * 20;
      meshB.rotation.y += delta * 20;

      p.life -= delta;
      if (p.life <= 0) {
        p.active = false;
        p.timer = 2 + Math.random() * 4;
        triggerExplosion(p.collisionPoint);
      }
    });

    // Animar Destellos (Onda expansiva)
    flashes.current.forEach((f, i) => {
      const mesh = flashMeshes.current[i];
      const mat = flashMats.current[i];
      if (!mesh || !mat) return;

      if (!f.active) {
        mesh.visible = false;
        return;
      }
      mesh.visible = true;
      mesh.position.copy(f.position);
      
      f.life -= delta;
      f.scale += delta * 15; // Expansión violenta
      mesh.scale.setScalar(f.scale);
      
      if (f.life <= 0) {
        f.active = false;
      } else {
        mat.opacity = f.life * 3; // Fade out rapidísimo
      }
    });

    // Lluvia de fuego caótico (Chispas)
    sparks.current.forEach((s, i) => {
      const mesh = sparkMeshes.current[i];
      const mat = sparkMats.current[i];
      if (!mesh || !mat) return;

      if (!s.active) {
        mesh.visible = false;
        return;
      }
      mesh.visible = true;
      
      s.position.addScaledVector(s.velocity, delta);
      s.velocity.multiplyScalar(0.85); // Fricción violenta (frenan rápido tras estallar)
      s.velocity.y -= delta * 5; // Gravedad: las ascuas caen hacia abajo
      
      mesh.position.copy(s.position);
      
      s.life -= delta;
      s.scale = Math.max(0, s.scale - delta * 0.02); // Las brasas se encogen
      mesh.scale.setScalar(s.scale);

      if (s.life <= 0) {
        s.active = false;
      } else {
        mat.opacity = s.life * 2;
      }
    });
  });

  return (
    <group>
      {/* Meteoritos de Fuego */}
      {pairs.current.map((p, i) => (
        <group key={`pair-${i}`}>
          <mesh ref={(el) => (mMeshesA.current[i] = el)} scale={p.mA.scale}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#ff0000" emissive="#ff4500" emissiveIntensity={5} wireframe={true} />
          </mesh>
          <mesh ref={(el) => (mMeshesB.current[i] = el)} scale={p.mB.scale}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#ff0000" emissive="#ff4500" emissiveIntensity={5} wireframe={true} />
          </mesh>
        </group>
      ))}

      {/* Destellos de Explosión (Onda Expansiva) */}
      {flashes.current.map((f, i) => (
        <mesh key={`flash-${i}`} ref={(el) => (flashMeshes.current[i] = el)}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial ref={(el) => (flashMats.current[i] = el)} color="#ffeedd" transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}

      {/* Chispas de Explosión (Brasas) */}
      {sparks.current.map((s, i) => (
        <mesh key={`spark-${i}`} ref={(el) => (sparkMeshes.current[i] = el)}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial ref={(el) => (sparkMats.current[i] = el)} transparent opacity={0} depthWrite={false} />
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
          <ChoreographedExplosions />
        </Suspense>
      </Canvas>
    </div>
  );
}

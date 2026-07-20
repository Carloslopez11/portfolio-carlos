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

// Choques Coreografiados y Chispas de Fuego
function ChoreographedExplosions() {
  const meteorsCount = 6; // 3 pares chocando
  const sparksCount = 150; // Pool de partículas de fuego
  
  const pairs = useRef(
    Array.from({ length: meteorsCount / 2 }).map(() => ({
      active: false,
      timer: Math.random() * 4,
      mA: { position: new THREE.Vector3(), velocity: new THREE.Vector3(), scale: 0.04 },
      mB: { position: new THREE.Vector3(), velocity: new THREE.Vector3(), scale: 0.04 },
      collisionPoint: new THREE.Vector3(),
      life: 0
    }))
  );

  const sparks = useRef(
    Array.from({ length: sparksCount }).map(() => ({
      active: false,
      position: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
      life: 0
    }))
  );
  
  const mMeshesA = useRef<(THREE.Mesh | null)[]>([]);
  const mMeshesB = useRef<(THREE.Mesh | null)[]>([]);
  const sparkMeshes = useRef<(THREE.Mesh | null)[]>([]);
  const sparkMats = useRef<(THREE.MeshBasicMaterial | null)[]>([]);

  const startCollisionSequence = (pair: any) => {
    pair.active = true;
    pair.life = 1.5; // 1.5 segundos de vuelo hasta impactar
    
    // Punto de impacto amplio para separarlos bien
    pair.collisionPoint.set(
      (Math.random() - 0.5) * 12, // x más disperso
      (Math.random() - 0.5) * 8,  // y más disperso
      -2 - Math.random() * 4      // z más profundo
    );
    
    // Roca A sale desde lejos
    pair.mA.position.set(
      pair.collisionPoint.x - 6 - Math.random() * 3,
      pair.collisionPoint.y + 6 + Math.random() * 3,
      pair.collisionPoint.z
    );
    
    // Roca B sale del lado opuesto
    pair.mB.position.set(
      pair.collisionPoint.x + 6 + Math.random() * 3,
      pair.collisionPoint.y - 6 - Math.random() * 3,
      pair.collisionPoint.z
    );
    
    // Matemáticas para choque exacto
    pair.mA.velocity.subVectors(pair.collisionPoint, pair.mA.position).divideScalar(pair.life);
    pair.mB.velocity.subVectors(pair.collisionPoint, pair.mB.position).divideScalar(pair.life);
  };

  const triggerExplosion = (point: THREE.Vector3) => {
    let spawned = 0;
    for (let i = 0; i < sparks.current.length; i++) {
      const s = sparks.current[i];
      if (!s.active) {
        s.active = true;
        s.position.copy(point);
        // Explosión de chispas en todas las direcciones
        s.velocity.set(
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15
        );
        s.life = 0.5 + Math.random() * 0.8;
        spawned++;
        if (spawned > 40) break; // 40 chispas de fuego por explosión
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
      
      meshA.rotation.x += delta * 15;
      meshB.rotation.y += delta * 15;

      p.life -= delta;
      if (p.life <= 0) {
        // ¡BOOM!
        p.active = false;
        p.timer = 2 + Math.random() * 4; // Esperar para el siguiente choque
        triggerExplosion(p.collisionPoint);
      }
    });

    // Lluvia de fuego (Chispas)
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
      s.velocity.multiplyScalar(0.92); // Fricción
      mesh.position.copy(s.position);
      
      s.life -= delta;
      if (s.life <= 0) {
        s.active = false;
      } else {
        mat.opacity = s.life * 1.5;
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
            <meshStandardMaterial color="#ff0000" emissive="#ff4500" emissiveIntensity={4} wireframe={true} />
          </mesh>
          <mesh ref={(el) => (mMeshesB.current[i] = el)} scale={p.mB.scale}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#ff0000" emissive="#ff4500" emissiveIntensity={4} wireframe={true} />
          </mesh>
        </group>
      ))}

      {/* Chispas de Explosión */}
      {sparks.current.map((s, i) => (
        <mesh key={`spark-${i}`} ref={(el) => (sparkMeshes.current[i] = el)} scale={0.015}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial ref={(el) => (sparkMats.current[i] = el)} color="#ffaa00" transparent opacity={0} depthWrite={false} />
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

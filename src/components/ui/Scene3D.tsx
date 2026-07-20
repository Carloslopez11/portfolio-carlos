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

function ShootingStars() {
  const count = 7;
  const starsRef = useRef<any[]>([]);

  useFrame((state, delta) => {
    starsRef.current.forEach((star) => {
      if (star) {
        star.position.x -= delta * star.userData.speed;
        star.position.y -= delta * star.userData.speed;
        
        if (star.position.x < -2 || star.position.y < -2) {
          star.position.x = 2 + Math.random() * 3;
          star.position.y = 2 + Math.random() * 3;
          star.userData.speed = 1.5 + Math.random() * 2;
        }
      }
    });
  });

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (starsRef.current[i] = el)}
          position={[2 + Math.random() * 3, 2 + Math.random() * 3, -1 - Math.random() * 2]}
          userData={{ speed: 1.5 + Math.random() * 2 }}
          rotation={[0, 0, Math.PI / 4]} 
        >
          <capsuleGeometry args={[0.003, 0.3, 4, 8]} />
          <meshBasicMaterial color="#34d399" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-[-1] bg-black">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <ParticleCloud />
          <ShootingStars />
        </Suspense>
      </Canvas>
    </div>
  );
}

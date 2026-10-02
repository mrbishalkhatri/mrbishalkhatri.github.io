import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Environment, Lightformer, Float } from "@react-three/drei";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";

/**
 * "QA Lab" hero scene — an abstract holographic testing rig.
 * Procedural geometry only (no external model/font fetches) so it can never
 * hang behind Suspense. Motion is delta-timed and pointer-driven.
 */

type Vec3 = [number, number, number];

const TEAL = "#00E5FF";
const TEAL_DEEP = "#070A0F";
const GOLD = "#A3FF12";
const RED = "#7C3AED";

function useParallax(strength = 1) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame(({ pointer }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    target.current.x = pointer.x * 0.28 * strength;
    target.current.y = -pointer.y * 0.18 * strength;
    const g = group.current;
    if (!g) return;
    const k = 1 - Math.exp(-4 * delta);
    g.rotation.y += (target.current.x - g.rotation.y) * k;
    g.rotation.x += (target.current.y - g.rotation.x) * k;
  });

  return group;
}

/** Wireframe dashboard panel with scanning highlight bars. */
function DashboardPanel(props: ThreeElements["group"]) {
  const bars = useMemo(
    () => [0.62, 0.44, 0.78, 0.33, 0.55].map((w, i) => ({ w, y: 0.52 - i * 0.26 })),
    [],
  );
  const scan = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (scan.current) {
      const t = (clock.elapsedTime * 0.35) % 1;
      scan.current.position.y = 0.85 - t * 1.85;
    }
  });

  return (
    <group {...props}>
      {/* glass body */}
      <mesh>
        <boxGeometry args={[2.6, 1.85, 0.06]} />
        <meshStandardMaterial
          color={TEAL_DEEP}
          transparent
          opacity={0.32}
          roughness={0.15}
          metalness={0.5}
        />
      </mesh>
      {/* frame */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(2.6, 1.85, 0.06)]} />
        <lineBasicMaterial color={TEAL} transparent opacity={0.8} />
      </lineSegments>
      {/* data bars */}
      {bars.map((bar, i) => (
        <mesh key={i} position={[-1.05 + bar.w / 2, bar.y, 0.05]}>
          <planeGeometry args={[bar.w, 0.07]} />
          <meshBasicMaterial color={i % 3 === 0 ? GOLD : TEAL} transparent opacity={0.75} />
        </mesh>
      ))}
      {/* pass/fail dots */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <mesh key={`d${i}`} position={[0.72 + (i % 4) * 0.16, 0.5 - Math.floor(i / 4) * 0.2, 0.05]}>
          <circleGeometry args={[0.045, 16]} />
          <meshBasicMaterial color={i === 5 ? RED : TEAL} transparent opacity={0.85} />
        </mesh>
      ))}
      {/* scan line */}
      <mesh ref={scan} position={[0, 0.85, 0.06]}>
        <planeGeometry args={[2.5, 0.035]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/** Rotating test node — a run in the pipeline. */
function TestNode({
  position,
  color = TEAL,
  size = 0.17,
  speed = 0.5,
}: {
  position: Vec3;
  color?: string;
  size?: number;
  speed?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (mesh.current) {
      mesh.current.rotation.x += delta * speed;
      mesh.current.rotation.y += delta * speed * 1.4;
    }
  });
  return (
    <mesh ref={mesh} position={position}>
      <icosahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.45}
        roughness={0.25}
        metalness={0.4}
        flatShading
      />
    </mesh>
  );
}

/** Thin connecting beams between pipeline nodes. */
function Pipeline({ points }: { points: Vec3[] }) {
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setFromPoints(points.map((p) => new THREE.Vector3(...p)));
    return g;
  }, [points]);
  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial color={TEAL} transparent opacity={0.45} />
    </line>
  );
}

/** Slow drifting particle field. */
function Particles({ count = 240 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
    }
    return arr;
  }, [count]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (points.current) points.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color={TEAL} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

/** Scroll-driven journey: the rig rotates, recedes and drifts as the page scrolls. */
function ScrollJourney({ children }: { children: ReactNode }) {
  const g = useRef<THREE.Group>(null);
  const p = useRef(0);
  useFrame(({ camera }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const target = window.scrollY / max;
    p.current += (target - p.current) * (1 - Math.exp(-5 * delta));
    const t = p.current;
    if (g.current) {
      g.current.rotation.y = t * Math.PI * 2.2;
      g.current.rotation.z = Math.sin(t * Math.PI * 2) * 0.15;
      g.current.position.x = Math.sin(t * Math.PI * 3) * 1.6;
      g.current.position.y = t * 1.2;
      const s = 1 - Math.sin(t * Math.PI) * 0.3;
      g.current.scale.setScalar(s);
    }
    camera.position.z = 6.2 + Math.sin(t * Math.PI) * 2.5;
    camera.position.y = 0.3 - t * 0.8;
    camera.lookAt(0, 0, 0);
  });
  return <group ref={g}>{children}</group>;
}

function Rig() {
  const group = useParallax();
  const pipeline: Vec3[] = [
    [-2.6, -0.9, 0.4],
    [-1.4, -0.45, 0.6],
    [0, -1.15, 0.5],
    [1.5, -0.5, 0.6],
    [2.7, -1.0, 0.3],
  ];

  return (
    <group ref={group}>
      {/* luminous depth rings keep the rig legible against black sections */}
      <group rotation={[1.1, 0.15, 0.35]}>
        {[2.15, 2.75, 3.35].map((radius, index) => (
          <mesh key={radius} rotation={[0, 0, index * 0.65]}>
            <torusGeometry args={[radius, 0.012 + index * 0.004, 8, 128]} />
            <meshBasicMaterial
              color={index === 1 ? RED : index === 2 ? GOLD : TEAL}
              transparent
              opacity={0.4 - index * 0.07}
            />
          </mesh>
        ))}
      </group>
      <Float speed={1.1} rotationIntensity={0.14} floatIntensity={0.5}>
        <DashboardPanel position={[0, 0.25, 0]} />
      </Float>

      {/* side terminals */}
      <Float speed={0.9} rotationIntensity={0.2} floatIntensity={0.7}>
        <group position={[-2.35, 0.75, -0.6]} rotation={[0, 0.5, 0.05]}>
          <mesh>
            <boxGeometry args={[1.1, 0.72, 0.05]} />
            <meshStandardMaterial color={TEAL_DEEP} transparent opacity={0.4} metalness={0.5} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.1, 0.72, 0.05)]} />
            <lineBasicMaterial color={GOLD} transparent opacity={0.7} />
          </lineSegments>
        </group>
      </Float>

      <Float speed={1.25} rotationIntensity={0.25} floatIntensity={0.8}>
        <group position={[2.4, 0.95, -0.5]} rotation={[0, -0.5, -0.05]}>
          <mesh>
            <boxGeometry args={[1.0, 0.64, 0.05]} />
            <meshStandardMaterial color={TEAL_DEEP} transparent opacity={0.4} metalness={0.5} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.0, 0.64, 0.05)]} />
            <lineBasicMaterial color={TEAL} transparent opacity={0.8} />
          </lineSegments>
        </group>
      </Float>

      {/* pipeline of test runs */}
      <Pipeline points={pipeline} />
      {pipeline.map((p, i) => (
        <TestNode
          key={i}
          position={p}
          color={i === 2 ? RED : i === 4 ? GOLD : TEAL}
          size={i === 2 ? 0.2 : 0.15}
          speed={0.4 + i * 0.12}
        />
      ))}

      {/* orbiting satellites */}
      <Float speed={1.6} floatIntensity={1.2} rotationIntensity={0.6}>
        <TestNode position={[-1.9, 1.7, 0.8]} size={0.12} color={GOLD} speed={0.9} />
      </Float>
      <Float speed={1.4} floatIntensity={1.1} rotationIntensity={0.5}>
        <TestNode position={[2.0, -1.7, 0.9]} size={0.13} speed={0.7} />
      </Float>

      <Particles count={320} />
    </group>
  );
}

export default function LabScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.3, 6.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 5]} intensity={1.35} />
      <pointLight position={[-4, -2, 3]} intensity={24} color={TEAL} distance={14} />
      <Environment>
        <Lightformer intensity={1.6} position={[0, 4, 2]} scale={[8, 8, 1]} />
        <Lightformer
          intensity={1.1}
          color={TEAL}
          position={[-5, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[14, 2, 1]}
        />
        <Lightformer
          intensity={0.8}
          color={GOLD}
          position={[5, -1, 1]}
          rotation-y={-Math.PI / 2}
          scale={[12, 2, 1]}
        />
      </Environment>
      <ScrollJourney>
        <Rig />
      </ScrollJourney>
    </Canvas>
  );
}

/**
 * OMNI-NODE / Light Industrial Enterprise Dashboard
 * Renders a recessed, metallic spindle target with a pulsing active-bearing identifier in the locked HUD viewport.
 */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import type { MachineState } from "@/hooks/useMachineSimulation";

function Assembly({ state }: { state: MachineState }) {
  const group = useRef<THREE.Group>(null!);
  const ring = useRef<THREE.MeshStandardMaterial>(null!);
  const { size } = useThree();
  const elapsed = useRef(0);
  useFrame((_state, delta) => { elapsed.current += delta; if (state !== "critical") group.current.rotation.x += delta * 0.18; if (ring.current && state === "critical") ring.current.emissiveIntensity = 0.8 + Math.sin(elapsed.current * 8) * 0.7; });
  const ringColor = state === "critical" ? "#ef4444" : state === "warning" ? "#f59e0b" : "#10b981";
  const housing = state === "critical" ? "#7f1d1d" : state === "warning" ? "#92400e" : "#334155";
  return <group ref={group} rotation={[0.22, -0.28, 0.14]} scale={size.width < 500 ? 1.28 : 1.16}><mesh position={[-1, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.4, 0.4, 4.1, 64]} /><meshPhysicalMaterial color="#e2e8f0" metalness={1} roughness={0.1} clearcoat={1} /></mesh><mesh position={[-1.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.82, 0.82, 1.04, 64]} /><meshPhysicalMaterial color={housing} metalness={0.83} roughness={0.26} /></mesh><mesh position={[-1.55, 0, 0]} rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[0.87, 0.06, 32, 64]} /><meshStandardMaterial ref={ring} color={ringColor} emissive={ringColor} emissiveIntensity={1.2} toneMapped={false} /></mesh><mesh position={[-3.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.28, 0.4, 0.55, 64]} /><meshPhysicalMaterial color="#64748b" metalness={0.8} roughness={0.2} /></mesh><group position={[1.45, 0, 0]}><mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[1.22, 1.22, 0.86, 64]} /><meshPhysicalMaterial color={housing} metalness={0.85} roughness={0.28} /></mesh><mesh position={[0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.83, 0.83, 0.3, 64]} /><meshPhysicalMaterial color="#cbd5e1" metalness={1} roughness={0.15} /></mesh>{[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle) => <group key={angle} rotation={[angle, 0, 0]}><mesh position={[0.72, 0.88, 0]}><boxGeometry args={[0.3, 0.8, 0.3]} /><meshPhysicalMaterial color="#94a3b8" metalness={0.9} roughness={0.18} /></mesh></group>)}</group></group>;
}

export function MachineSpindle({ state }: { state: MachineState }) {
  return <div className="relative h-full min-h-0 w-full overflow-hidden rounded-lg border border-slate-200 bg-[#f8fafc] shadow-inner"><div className="absolute inset-0 opacity-65 [background-image:linear-gradient(rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.16)_1px,transparent_1px)] [background-size:20px_20px] md:[background-size:26px_26px]" /><Canvas resize={{ scroll: false }} className="!absolute !inset-0 !min-h-0" camera={{ position: [0, 0.1, 7.1], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}><ambientLight intensity={0.75} /><directionalLight position={[8, 8, 8]} intensity={2.2} /><pointLight position={[-5, 3, 4]} color="#e0f2fe" intensity={2.4} /><Suspense fallback={<Assembly state={state} />}><Environment preset="city" /><Assembly state={state} /></Suspense><ContactShadows position={[0, -1.5, 0]} opacity={0.42} scale={10} blur={2.2} resolution={1024} /><OrbitControls autoRotate={state !== "critical"} autoRotateSpeed={0.75} enablePan={false} minDistance={5.6} maxDistance={10.5} /></Canvas><div className="absolute left-2 top-2 flex items-center gap-1.5 border border-slate-200 bg-white/90 px-1.5 py-0.5 font-mono text-[7px] font-bold uppercase tracking-[0.07em] text-slate-500 md:left-3 md:top-3 md:gap-2 md:px-2 md:py-1 md:text-[9px] md:tracking-[0.1em]"><span className={`h-2 w-2 rounded-full animate-pulse ${state === "critical" ? "bg-red-500" : state === "warning" ? "bg-amber-500" : "bg-emerald-500"}`} />Active bearing / MPU6050</div></div>;
}

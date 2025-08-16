import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

export default function Experience() {
  const cube = useRef();
  useFrame((_, dt) => {
    if (cube.current) cube.current.rotation.y += dt * 0.5;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} intensity={1} castShadow />
      <mesh ref={cube} castShadow position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial />
      </mesh>
      <OrbitControls enableDamping />
      <Environment preset="city" />
    </>
  );
}

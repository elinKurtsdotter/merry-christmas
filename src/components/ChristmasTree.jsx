import { ScrollControls, useScroll } from "@react-three/drei";
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Ornaments from "./Ornaments";

const ChristmasTree = ({ position, onClick }) => {
  const treeRef = useRef();
  const scroll = useScroll();
  const [initialPosition] = useState(position);

useFrame(() => {
  if (!treeRef.current) return;

  // Gentle rotation
  treeRef.current.rotation.y += 0.003;

  // Scroll-controlled vertical movement
  treeRef.current.position.y =
    initialPosition[1] + scroll.offset * 4;

  // Optional: add scroll-based tilt
  treeRef.current.rotation.x = scroll.offset * Math.PI * 0.25;
});
  return (
    
    <group ref={treeRef} position={position} onClick={onClick}>
      {/* --- Tree Layers (3 stacked cones) --- */}
      <mesh position={[0, 1.7, 0]}>
        <coneGeometry args={[1.2, 1.6, 12]} />
        <meshStandardMaterial color="#0d7a21" />
      </mesh>

      <mesh position={[0, 1, 0]}>
        <coneGeometry args={[1.6, 1.6, 12]} />
        <meshStandardMaterial color="#0b6a1d" />
      </mesh>

      <mesh position={[0, 0.3, 0]}>
        <coneGeometry args={[2, 1.6, 12]} />
        <meshStandardMaterial color="#0a5518" />
      </mesh>

      {/* --- Tree trunk --- */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 1, 12]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* --- Golden star on top --- */}
      <mesh position={[0, 2.5, 0]} rotation={[0, Math.PI / 4, 0]}>
        <octahedronGeometry args={[0.25]} />
        <meshStandardMaterial
          color="gold"
          emissive="gold"
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* --- Three layers of ornaments in different colors --- */}
      <Ornaments />
    </group>
    
  );
};

export default ChristmasTree;

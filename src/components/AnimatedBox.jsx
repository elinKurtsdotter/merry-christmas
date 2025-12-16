import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const AnimatedBox = ({ onClick }) => {
  const ribbonColor = "#ffd700";

  const BOX = 1;
  const HALF = BOX / 2;
  const THICK = 0.01;
  const STRIP = 0.2;

  // Ribbon sits directly on the surface
  const OFFSET = HALF + THICK / 2;

  const boxRef = useRef();

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.003;
      boxRef.current.rotation.y += 0.003;
      boxRef.current.rotation.z += 0.003;
    }
  });

  return (
    <group ref={boxRef} position={[0, -0.5, 1]} onClick={onClick}>
      {/* BOX */}
      <mesh>
        <boxGeometry args={[BOX, BOX, BOX]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Top (horizontal strip) */}
      <mesh position={[0, OFFSET, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[BOX, STRIP, THICK]} />
        <meshStandardMaterial
          color={"#ffd700"} // gold
          envMapIntensity={1.5}
          metalness={1}
          roughness={0.15}
        />
      </mesh>

      {/* Bottom (horizontal strip) */}
      <mesh position={[0, -OFFSET, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[BOX, STRIP, THICK]} />
        <meshStandardMaterial
          color={"#ffd700"} // gold
          envMapIntensity={1.5}
          metalness={1}
          roughness={0.15}
        />
      </mesh>

      {/* ============================
          VERTICAL RIBBON LOOP
         ============================ */}

      {/* Front */}
      <mesh position={[0, 0, OFFSET]}>
        <boxGeometry args={[STRIP, BOX, THICK]} />
        <meshStandardMaterial
          color={ribbonColor}
          envMapIntensity={1.5}
          metalness={1}
          roughness={0.15}
        />
      </mesh>

      {/* Back */}
      <mesh position={[0, 0, -OFFSET]}>
        <boxGeometry args={[STRIP, BOX, THICK]} />
        <meshStandardMaterial
          color={ribbonColor}
          envMapIntensity={1.5}
          metalness={1}
          roughness={0.15}
        />
      </mesh>

      {/* Right */}
      <mesh position={[OFFSET, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[STRIP, BOX, THICK]} />
        <meshStandardMaterial
          color={ribbonColor}
          envMapIntensity={1.5}
          metalness={1}
          roughness={0.15}
        />
      </mesh>

      {/* Left */}
      <mesh position={[-OFFSET, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[STRIP, BOX, THICK]} />
        <meshStandardMaterial
          color={ribbonColor}
          envMapIntensity={1.5}
          metalness={1}
          roughness={0.15}
        />
      </mesh>

      {/* Top (vertical strip) */}
      <mesh position={[0, OFFSET, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <boxGeometry args={[BOX, STRIP, THICK]} />
        <meshStandardMaterial
          color={ribbonColor}
          envMapIntensity={1.5}
          metalness={1}
          roughness={0.15}
        />
      </mesh>

      {/* Bottom (vertical strip) */}
      <mesh position={[0, -OFFSET, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <boxGeometry args={[BOX, STRIP, THICK]} />
        <meshStandardMaterial
          color={ribbonColor}
          envMapIntensity={1.5}
          metalness={1}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
};

export default AnimatedBox;

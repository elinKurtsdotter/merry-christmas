const GlowingBow = () => {
  const glowColor = "#ff3366"; // pinkish red glow (Christmas style)
  const y = 1.11; // slightly above top surface

  return (
    <group position={[0, y, 0]}>
      {/* Left bow loop */}
      <mesh position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[0.35, 0.12, 16, 32]} />
        <meshBasicMaterial color={glowColor} />
      </mesh>

      {/* Right bow loop */}
      <mesh position={[0.4, 0, 0]} rotation={[0, 0, -Math.PI / 3]}>
        <torusGeometry args={[0.35, 0.12, 16, 32]} />
        <meshBasicMaterial color={glowColor} />
      </mesh>

      {/* Left ribbon tail */}
      <mesh position={[-0.2, -0.35, 0]}>
        <boxGeometry args={[0.12, 0.45, 0.12]} />
        <meshBasicMaterial color={glowColor} />
      </mesh>

      {/* Right ribbon tail */}
      <mesh position={[0.2, -0.35, 0]}>
        <boxGeometry args={[0.12, 0.45, 0.12]} />
        <meshBasicMaterial color={glowColor} />
      </mesh>

      {/* Center knot */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={glowColor} />
      </mesh>
    </group>
  );
};

export default GlowingBow
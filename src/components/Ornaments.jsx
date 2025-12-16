export default function Ornaments({
  count = 24,
  levels = 3,
  radius = 1.1,
//   isPlaying = false, // unused for now, but ready for music-reactive glow
}) {
  const colors = [
    { base: "red", emissive: "#550000" },
    { base: "gold", emissive: "#553300" },
    { base: "blue", emissive: "#001155" },
    { base: "green", emissive: "#003300" },
    { base: "white", emissive: "#666666" },
  ];

  const perLevel = Math.floor(count / levels);
  const ornaments = [];

  for (let level = 0; level < levels; level++) {
    const y = 1.2 - level * 0.6;      // height layer
    const r = radius - level * -0.2;   // reduce radius higher up

    for (let i = 0; i < perLevel; i++) {
      const angle = (i / perLevel) * Math.PI * 2;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;

      const color = colors[(level * perLevel + i) % colors.length];

      ornaments.push(
        <mesh key={`orn-${level}-${i}`} position={[x, y, z]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color={color.base}
            emissive={color.emissive}
            emissiveIntensity={0.9}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
      );
    }
  }

  return <group>{ornaments}</group>;
}
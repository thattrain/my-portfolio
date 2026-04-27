import * as THREE from "three";

const HeroLights = () => (
  <>
    {/* lamp's light */}
    <spotLight
      position={[2, 5, 6]}
      angle={0.15}
      penumbra={0.2}
      intensity={100}
      color="white"
    />
    {/* AO blue overhead lamp */}
    <spotLight
      position={[4, 5, 4]}
      angle={0.3}
      penumbra={0.5}
      intensity={40}
      color="#0057A8"
    />
    {/* AO light blue side fill */}
    <spotLight
      position={[-3, 5, 5]}
      angle={0.4}
      penumbra={1}
      intensity={60}
      color="#4A90D9"
    />
    {/* AO blue area light */}
    <primitive
      object={new THREE.RectAreaLight("#0057A8", 8, 3, 2)}
      position={[1, 3, 4]}
      rotation={[-Math.PI / 4, Math.PI / 4, 0]}
      intensity={15}
    />
    {/* gold tennis ball accent point light */}
    <pointLight position={[0, 1, 0]} intensity={10} color="#FFD700" />
    {/* dark navy atmospheric point light */}
    <pointLight position={[1, 2, -2]} intensity={10} color="#003580" />
  </>
);

export default HeroLights;

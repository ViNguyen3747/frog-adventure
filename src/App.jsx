import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { ScrollControls, Scroll } from "@react-three/drei";
function App() {
  return (
    <>
      <Canvas camera={{ fov: 55 }}>
        <ambientLight intensity={1} />
        <hemisphereLight intensity={1} position={[-2, -1, -1]} />
        <directionalLight intensity={1} position={[-3, 3, 3]} />
        <ScrollControls pages={4} damping={0.4}>
          <Scroll>
            <Scene />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default App;

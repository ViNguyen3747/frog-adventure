import { useGLTF, MeshPortalMaterial, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import font from "./assets/CormorantUpright.ttf";
export default () => {
  const { nodes } = useGLTF("./models.glb");
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();
  const group = useRef();
  useFrame(() => {
    camera.position.lerp(
      vec.set(mouse.x * 0.7, mouse.y * 0.6, camera.position.z),
      0.01
    );
  });
  return (
    <group ref={group}>
      <Intro frog={nodes.frog} />
      <Scene1 nodes={nodes} />
      <Scene2 nodes={nodes} />
      <Ending />
    </group>
  );
};

const Intro = ({ frog }) => {
  const { width: w } = useThree((state) => state.viewport);
  const frogRef = useRef();

  useFrame((_, delta) => {
    if (!frogRef.current) return;
    frogRef.current.rotation.y += delta * 0.2;
  });
  return (
    <>
      <Text font={font} position={[0, 0.5, 0]} scale={w / 8} color={"#000000"}>
        Frog's Adventure
      </Text>
      <group scale={w / 10} position={[0, -0.7, 0]}>
        <Text font={font} position={[0, -0.1, 0]} color={"#000000"} scale={0.2}>
          This is FROG
        </Text>
        <Text
          font={font}
          position={[0, -0.3, 0]}
          color={"#000000"}
          scale={0.15}
        >
          He has nothing but his free spirit
        </Text>
        <primitive
          object={frog}
          ref={frogRef}
          position={[0, 0.05, 0]}
          scale={2}
        />
      </group>
    </>
  );
};
const Ending = () => {
  const { width: w, height: h } = useThree((state) => state.viewport);

  return (
    <Text
      font={font}
      position={[0, -h * 3, 0]}
      scale={w / 11}
      color={"#000000"}
    >
      To be continued...
    </Text>
  );
};
const Scene1 = ({ nodes }) => {
  const { width: w, height: h } = useThree((state) => state.viewport);

  return (
    <>
      <mesh position={[0, -h * 1.01, 0]}>
        <planeGeometry args={[w / 2, w / 2]} />
        <MeshPortalMaterial>
          <color attach="background" args={["#1b1a28"]} />
          <ambientLight intensity={1} />
          <hemisphereLight intensity={1} position={[-2, -1, -1]} />
          <directionalLight intensity={1} position={[-3, 3, 3]} />
          <group scale={w / 6} position={[0, -5, -1.5]}>
            <Text font={font} position={[0.3, 4, 1]} scale={0.12}>
              Frog has a balloon-like body that {`\n`}can make him float in
              space
            </Text>
            <primitive object={nodes.moon} />
            <group position={[0, 1, 0]}>
              <primitive object={nodes.frog_astro} />
              <primitive object={nodes.helmet_base} />
              <mesh geometry={nodes.helmet_glass.geometry}>
                <meshStandardMaterial
                  color={"#c8f4fb"}
                  transparent
                  opacity={0.3}
                />
              </mesh>
            </group>
            <primitive object={nodes.rocket} />
            <primitive object={nodes.planets} />
            <mesh geometry={nodes.stars.geometry}>
              <meshStandardMaterial color={"#f9f1ac"} />
            </mesh>
          </group>
        </MeshPortalMaterial>
      </mesh>
      <mesh position={[0, -h * 1.01, -0.001]} scale={1.02}>
        <planeGeometry args={[w / 2, w / 2]} />
        <meshStandardMaterial color={"#000000"} />
      </mesh>
    </>
  );
};
const Scene2 = ({ nodes }) => {
  const { width: w, height: h } = useThree((state) => state.viewport);

  return (
    <>
      <mesh position={[0, -h * 2.1, 0]}>
        <planeGeometry args={[w / 2, w / 2]} />
        <MeshPortalMaterial>
          <color attach="background" args={["#9bcdff"]} />
          <ambientLight intensity={1} />
          <hemisphereLight intensity={1} position={[-2, -1, 1]} />
          <directionalLight intensity={1} position={[-3, 3, 3]} />
          <group scale={w / 6} position={[-1.2, -5, 0]}>
            <Text
              font={font}
              position={[0.5, 3.5, 1]}
              scale={0.07}
              color={"#000000"}
            >
              He also uses his chubby body to float to wherever he likes{`\n`}
              bdcause Frog doesn't know how to swim.
            </Text>
            <group rotation={[0, -Math.PI / 6, 0]}>
              <primitive object={nodes.frog_island} />
              <mesh geometry={nodes.black.geometry}>
                <meshStandardMaterial color={"#000000"} />
              </mesh>
              <mesh geometry={nodes.cream.geometry}>
                <meshStandardMaterial color={"#faf0ca"} />
              </mesh>
              <mesh geometry={nodes.dark_brown.geometry}>
                <meshStandardMaterial color={"#7f5539"} />
              </mesh>
              <mesh geometry={nodes.dark_green.geometry}>
                <meshStandardMaterial color={"#608040"} />
              </mesh>
              <mesh geometry={nodes.light_brown.geometry}>
                <meshStandardMaterial color={"#9c6644"} />
              </mesh>
              <mesh geometry={nodes.light_green.geometry}>
                <meshStandardMaterial color={"#90a955"} />
              </mesh>
              <mesh geometry={nodes.red.geometry}>
                <meshStandardMaterial color={"#fc9e4f"} />
              </mesh>
              <mesh geometry={nodes.sand.geometry}>
                <meshStandardMaterial color={"#ffe6a7"} />
              </mesh>
              <mesh geometry={nodes.water.geometry}>
                <meshStandardMaterial
                  color={"#73d2de"}
                  transparent
                  opacity={0.6}
                />
              </mesh>
            </group>
            <group>
              <mesh geometry={nodes.cloud.geometry}>
                <meshToonMaterial color={"#ffffff"} />
              </mesh>
              <mesh geometry={nodes.sun.geometry}>
                <meshBasicMaterial color={"#ffb627"} toneMapped={false} />
              </mesh>
              <mesh geometry={nodes.sunray.geometry}>
                <meshBasicMaterial color={"#ff9505"} toneMapped={false} />
              </mesh>
            </group>
          </group>
        </MeshPortalMaterial>
      </mesh>
      <mesh position={[0, -h * 2.1, -0.001]} scale={1.02}>
        <planeGeometry args={[w / 2, w / 2]} />
        <meshStandardMaterial color={"#000000"} />
      </mesh>
    </>
  );
};
const Scene3 = ({ nodes }) => {
  return (
    <>
      <mesh geometry={nodes.portal.geometry}>
        <MeshPortalMaterial>
          <color attach="background" args={["#1b1a28"]} />
          <ambientLight intensity={1} />
          <hemisphereLight intensity={1} position={[-2, -1, -1]} />
          <directionalLight intensity={1} position={[-3, 3, 3]} />
          <mesh geometry={nodes.stars.geometry}>
            <meshStandardMaterial color={"#f9f1ac"} />
          </mesh>
        </MeshPortalMaterial>
      </mesh>
    </>
  );
};

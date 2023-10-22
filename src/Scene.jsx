import { useGLTF, MeshPortalMaterial, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import font from "./assets/CormorantUpright.ttf";
export default () => {
  const { nodes } = useGLTF("./models.glb");
  const { width: w, height: h } = useThree((state) => state.viewport);
  const group = useRef();
  return (
    <group ref={group}>
      <Intro frog={nodes.frog} />
      <Astronaut nodes={nodes} w={w} positionY={-h} />
      <Sweet nodes={nodes} w={w} positionY={-h * 2.1} />
      <Island nodes={nodes} w={w} positionY={-h * 3.2} />
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
      <Text font={font} position={[0, 0.5, 0]} scale={w / 8} color={"#faf6ce"}>
        Frog's Adventure
      </Text>
      <group scale={w / 10} position={[0, -0.7, 0]}>
        <Text font={font} position={[0, -0.1, 0]} color={"#faf6ce"} scale={0.2}>
          This is FROG
        </Text>
        <Text
          font={font}
          position={[0, -0.3, 0]}
          color={"#faf6ce"}
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
      position={[0, -h * 4, 0]}
      scale={w / 11}
      color={"#faf6ce"}
    >
      To be continued...
    </Text>
  );
};
const Astronaut = ({ nodes, w, positionY }) => {
  return (
    <>
      <mesh
        position={[0, positionY, 0]}
        rotation={[0, Math.PI / 15, -Math.PI / 20]}
      >
        <planeGeometry args={[w / 2, w / 2]} />
        <MeshPortalMaterial>
          <color attach="background" args={["#1b1a28"]} />
          <ambientLight intensity={1} />
          <hemisphereLight intensity={1} position={[-2, -1, -1]} />
          <directionalLight intensity={1} position={[-3, 3, 3]} />
          <group scale={w / 6} position={[0, -5, -1.5]}>
            <Text
              font={font}
              color={"#f1f2e3"}
              position={[0.3, 4, 1]}
              scale={0.12}
            >
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
      <mesh
        position={[0, positionY, -0.001]}
        rotation={[0, Math.PI / 15, -Math.PI / 20]}
        scale={1.02}
      >
        <planeGeometry args={[w / 2, w / 2]} />
        <meshStandardMaterial color={"#000000"} />
      </mesh>
    </>
  );
};

const Sweet = ({ nodes, w, positionY }) => {
  return (
    <>
      <mesh
        position={[0, positionY, 0]}
        rotation={[0, -Math.PI / 30, Math.PI / 20]}
      >
        <planeGeometry args={[w / 2, w / 2]} />
        <MeshPortalMaterial>
          <color attach="background" args={["#d7e3fc"]} />
          <ambientLight intensity={1} />
          <hemisphereLight intensity={1} position={[1, 5, 1.5]} />
          <directionalLight intensity={1} position={[1, 5, 1.5]} />
          <group
            scale={w / 14}
            position={[0, -1, -0.5]}
            rotation={[Math.PI / 6, -Math.PI / 8, 0]}
          >
            <Picnic_in nodes={nodes} />
          </group>
        </MeshPortalMaterial>
      </mesh>
      <mesh
        position={[0, positionY, -0.001]}
        rotation={[0, -Math.PI / 30, Math.PI / 20]}
        scale={1.02}
      >
        <planeGeometry args={[w / 2, w / 2]} />
        <meshStandardMaterial color={"#000000"} />
      </mesh>
      <group
        position={[0, positionY, 0]}
        rotation={[0, -Math.PI / 30, Math.PI / 20]}
      >
        <group
          scale={w / 14}
          position={[0, -1, -0.5]}
          rotation={[Math.PI / 6, -Math.PI / 8, 0]}
        >
          <Picnic_out nodes={nodes} />
        </group>
      </group>
    </>
  );
};
const zPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const yPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 1);

const PICNIC_COLORS = {
  white: "#fefae0",
  red1: "#e76f51",
  black: "#001219",
  blueberry: "#b8c0ff",
  blueberry_cream: "#dee2ff",
  brown: "#d4a373",
  cream2: "#ffdea2",
  cream1: "#fdfcdc",
  dark_brown: "#7f5539",
  green1: "#bfcc94",
  green2: "#d9e0a3",
  green3: "#e2f8aa",
  orange: "#ffb262",
  pink: "#f7a4b2",
  pinkLight: "#f6cdd4",
};
const Picnic_in = ({ nodes }) => {
  return (
    <>
      <mesh geometry={nodes.white.geometry}>
        <meshStandardMaterial
          color={PICNIC_COLORS.white}
          side={THREE.DoubleSide}
          clippingPlanes={[zPlane, yPlane]}
        />
      </mesh>
      <mesh geometry={nodes.red1_clip.geometry}>
        <meshStandardMaterial
          color={PICNIC_COLORS.red1}
          side={THREE.DoubleSide}
          clippingPlanes={[zPlane, yPlane]}
        />
      </mesh>
      <mesh geometry={nodes.black_in.geometry}>
        <meshStandardMaterial color={PICNIC_COLORS.black} />
      </mesh>
      <mesh geometry={nodes.blueberry.geometry}>
        <meshStandardMaterial color={PICNIC_COLORS.blueberry} />
      </mesh>
      <mesh geometry={nodes.brown.geometry}>
        <meshStandardMaterial color={PICNIC_COLORS.brown} />
      </mesh>
      <mesh geometry={nodes.cream1_in.geometry}>
        <meshToonMaterial color={PICNIC_COLORS.cream1} />
      </mesh>
      <mesh geometry={nodes.cream2_in.geometry}>
        <meshToonMaterial color={PICNIC_COLORS.cream2} />
      </mesh>
      <mesh geometry={nodes.cream_blue.geometry}>
        <meshToonMaterial color={PICNIC_COLORS.blueberry_cream} />
      </mesh>
      <mesh geometry={nodes.dark_brown_sweet.geometry}>
        <meshStandardMaterial color={PICNIC_COLORS.dark_brown} />
      </mesh>
      <mesh geometry={nodes.glass.geometry}>
        <meshStandardMaterial
          color={"#b8c0ff"}
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={nodes.green1_in.geometry}>
        <meshStandardMaterial color={PICNIC_COLORS.green1} />
      </mesh>
      <mesh geometry={nodes.liquid.geometry}>
        <meshStandardMaterial
          color={"#ffafcc"}
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={nodes.orange_in.geometry}>
        <meshToonMaterial color={PICNIC_COLORS.orange} />
      </mesh>
      <mesh geometry={nodes.green3_in.geometry}>
        <meshToonMaterial color={PICNIC_COLORS.green3} />
      </mesh>
      <mesh geometry={nodes.red1.geometry}>
        <meshStandardMaterial color={PICNIC_COLORS.red1} />
      </mesh>
      <mesh geometry={nodes.white_in.geometry}>
        <meshToonMaterial color={PICNIC_COLORS.white} />
      </mesh>
      <mesh geometry={nodes.pink_in.geometry}>
        <meshToonMaterial color={PICNIC_COLORS.pink} />
      </mesh>
      <mesh geometry={nodes.pinkLight_in.geometry}>
        <meshToonMaterial color={PICNIC_COLORS.pinkLight} />
      </mesh>
    </>
  );
};

const Picnic_out = ({ nodes }) => {
  return (
    <>
      <mesh geometry={nodes.white.geometry}>
        <meshStandardMaterial color={PICNIC_COLORS.white} />
      </mesh>
      <mesh geometry={nodes.red1_clip.geometry}>
        <meshStandardMaterial color={PICNIC_COLORS.red1} />
      </mesh>
      <mesh geometry={nodes.black_out.geometry}>
        <meshStandardMaterial color={PICNIC_COLORS.black} />
      </mesh>
      <mesh geometry={nodes.cream1_out.geometry}>
        <meshStandardMaterial color={PICNIC_COLORS.cream1} />
      </mesh>
      <mesh geometry={nodes.cream2_out.geometry}>
        <meshStandardMaterial color={PICNIC_COLORS.cream2} />
      </mesh>
      <mesh geometry={nodes.green1_out.geometry}>
        <meshStandardMaterial color={PICNIC_COLORS.green1} />
      </mesh>
      <mesh geometry={nodes.green2.geometry}>
        <meshStandardMaterial color={PICNIC_COLORS.green2} />
      </mesh>
      <mesh geometry={nodes.green3_out.geometry}>
        <meshStandardMaterial color={PICNIC_COLORS.green3} />
      </mesh>
      <mesh geometry={nodes.boba_cup.geometry}>
        <meshStandardMaterial
          color={"#f7f8e1"}
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={nodes.milk.geometry}>
        <meshStandardMaterial
          color={"#ccd5ae"}
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={nodes.orange_out.geometry}>
        <meshStandardMaterial color={PICNIC_COLORS.orange} />
      </mesh>
      <mesh geometry={nodes.pink_out.geometry}>
        <meshToonMaterial color={PICNIC_COLORS.pink} />
      </mesh>
      <mesh geometry={nodes.white_out.geometry}>
        <meshStandardMaterial color={PICNIC_COLORS.white} />
      </mesh>
    </>
  );
};

const Island = ({ nodes, w, positionY }) => {
  return (
    <>
      <mesh
        position={[0, positionY, 0]}
        rotation={[-Math.PI / 20, 0, 0]}
        scale={1.02}
      >
        <planeGeometry args={[w / 2, w / 2]} />
        <MeshPortalMaterial>
          <color attach="background" args={["#9bcdff"]} />
          <ambientLight intensity={1} />
          <hemisphereLight intensity={1} position={[-2, -1, 1]} />
          <directionalLight intensity={1} position={[-3, 3, 3]} />
          <group scale={w / 6} position={[-1.2, -5, 0]}>
            <Text
              font={font}
              position={[0.6, 3.5, 1]}
              scale={0.07}
              color={"#000000"}
            >
              He also uses his chubby body to float to wherever he likes{`\n`}
              because Frog doesn't know how to swim.
            </Text>
            <group rotation={[0, -Math.PI / 6, 0]}>
              <primitive object={nodes.frog_island} />
              <mesh geometry={nodes.black_island.geometry}>
                <meshStandardMaterial color={"#000000"} />
              </mesh>
              <mesh geometry={nodes.cream.geometry}>
                <meshStandardMaterial color={"#faf0ca"} />
              </mesh>
              <mesh geometry={nodes.dark_brown_island.geometry}>
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
      <mesh
        position={[0, positionY, -0.001]}
        rotation={[-Math.PI / 20, 0, 0]}
        scale={1.04}
      >
        <planeGeometry args={[w / 2, w / 2]} />
        <meshStandardMaterial color={"#000000"} />
      </mesh>
    </>
  );
};

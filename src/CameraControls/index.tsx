import { useThree, extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controls = useRef<typeof OrbitControls>();
  // @ts-ignore
  useFrame((state) => controls.current?.update());
  // @ts-ignore
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

export default CameraControls;

import { useFrame, MeshProps } from "@react-three/fiber";
import { useState, useCallback } from "react";
import { OrbitControls } from "@react-three/drei";

interface RotationProps extends MeshProps {
  x?: number | boolean;
  y?: number | boolean;
  z?: number | boolean;
  frequency?: number;
}

const defaultRotationProps: RotationProps = {
  x: 0,
  y: 0,
  z: 0,
  frequency: 20,
};

interface UseRotationOptions extends RotationProps {
  freeze?: boolean;
}

const defaultUseRotationOptions = {
  ...defaultRotationProps,
  freeze: false,
};

export const RotatingMesh: React.FC<RotationProps> = ({
  children,
  x,
  y,
  z,
  frequency,
  ...props
}) => {
  const [freezeRotation, setFreezeRotation] = useState(false);
  const rotation = useRotation({ x, y, z, frequency, freeze: freezeRotation });

  const handleOrbitStart = useCallback(() => setFreezeRotation(true), []);
  const handleOrbitEnd = useCallback(() => setFreezeRotation(false), []);

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        onStart={handleOrbitStart}
        onEnd={handleOrbitEnd}
      />
      <mesh {...props} rotation={rotation}>
        {children}
      </mesh>
    </>
  );
};

export const useRotation = (
  options: UseRotationOptions = defaultUseRotationOptions
) => {
  options = { ...defaultRotationProps, ...options };

  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const speeds = [options.x, options.y, options.z].map((scalar) =>
    typeof scalar === "number" ? scalar : Boolean(scalar) ? 0.01 : 0
  );

  useFrame(() =>
    setRotation(
      (oldRotation) =>
        oldRotation.map(
          (scalar, index) => (scalar += options.freeze ? 0 : speeds[index])
        ) as [number, number, number]
    )
  );

  return rotation;
};

export default useRotation;

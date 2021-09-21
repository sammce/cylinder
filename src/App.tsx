import { Canvas } from "@react-three/fiber";
import classes from "./App.module.scss";
import { Suspense, useState } from "react";
import { RotatingMesh } from "./rotation";
import SliderControl from "./SliderControl";

enum Scalars {
  RadiusTop,
  RadiusBottom,
  Length,
  Sides,
}

type Cylinder = [number, number, number, number];

const calculateVolume = (cylinder: Cylinder) => {
  const radius = cylinder[Scalars.RadiusBottom];
  const length = cylinder[Scalars.Length];

  // Calculate volume
  return (Math.PI * radius ** 2 * length).toFixed(2);
};

const App = () => {
  const [cylinder, setCylinder] = useState<Cylinder>([6.9, 6.9, 4.2, 50]);

  const handleRadiusChange = (event: Event, value: number) => {
    setCylinder((prevState) => [
      value,
      value,
      prevState[Scalars.Length],
      prevState[Scalars.Sides],
    ]);
  };

  const handleLengthChange = (event: Event, value: number) => {
    setCylinder((prevState) => [
      prevState[Scalars.RadiusTop],
      prevState[Scalars.RadiusBottom],
      value,
      prevState[Scalars.Sides],
    ]);
  };

  return (
    <div className={classes.main}>
      <Canvas frameloop="demand" camera={{ position: [0, 0, 30] }}>
        <color attach="background" args={["#4b4c52"]} />
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 10, 10]} intensity={2} color="white" />
        <directionalLight
          position={[0, -10, -10]}
          intensity={1}
          color="white"
        />
        <Suspense fallback={null}>
          <RotatingMesh x y>
            <cylinderGeometry args={cylinder} />
            <meshStandardMaterial
              attach="material"
              color="#adadad"
              opacity={1}
              roughness={0.5}
              metalness={0.7}
            />
          </RotatingMesh>
        </Suspense>
      </Canvas>
      <div className={classes.output}>
        <p>
          Volume:{" "}
          <b style={{ color: "darkblue" }}>{calculateVolume(cylinder)}</b> cm
          <sup>3</sup> <br />
          (π • {cylinder[Scalars.RadiusTop]}
          <sup>2</sup> • {cylinder[Scalars.Length]})
        </p>
      </div>
      <SliderControl
        value={cylinder[Scalars.RadiusBottom]}
        onChange={handleRadiusChange}
        options={{ ariaLabel: "Radius" }}
      />

      <SliderControl
        value={cylinder[Scalars.Length]}
        onChange={handleLengthChange}
        options={{ ariaLabel: "Length" }}
      />
    </div>
  );
};

export default App;

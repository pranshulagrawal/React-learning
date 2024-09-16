import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

const ThreeDBackground = () => {
  return (
    <Canvas>
      <Suspense fallback={null}>{/* 3D Model can be imported here */}</Suspense>
    </Canvas>
  );
};

export default ThreeDBackground;
